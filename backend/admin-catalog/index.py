"""
Админ-панель: CRUD операции для категорий и товаров каталога.
Роутинг через query-параметр: ?resource=categories|products&id=123
Требует заголовок X-Admin-Key для авторизации.
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def resp(status, data):
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, ensure_ascii=False, default=str),
    }


def check_auth(event):
    key = event.get('headers', {}).get('X-Admin-Key', '')
    return key == os.environ.get('ADMIN_SECRET_KEY', '')


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    if not check_auth(event):
        return resp(401, {'error': 'Unauthorized'})

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    resource = params.get('resource', '')
    item_id = params.get('id')

    body = {}
    if event.get('body'):
        body = json.loads(event['body'])

    # --- Categories ---
    if resource == 'categories':
        if method == 'GET':
            return get_categories()
        elif method == 'POST':
            return create_category(body)
        elif method in ('PUT', 'PATCH') and item_id:
            return patch_category(item_id, body) if method == 'PATCH' else update_category(item_id, body)

    # --- Products ---
    if resource == 'products':
        if method == 'GET':
            return get_products()
        elif method == 'POST':
            return create_product(body)
        elif method in ('PUT', 'PATCH') and item_id:
            return patch_product(item_id, body) if method == 'PATCH' else update_product(item_id, body)

    return resp(404, {'error': 'Not found'})


# ---- Categories ----

def get_categories():
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT c.*, COUNT(p.id) AS product_count
                FROM categories c
                LEFT JOIN products p ON p.category_slug = c.slug AND p.is_active = TRUE
                GROUP BY c.id
                ORDER BY c.sort_order, c.id
            """)
            rows = cur.fetchall()
    return resp(200, {'categories': [dict(r) for r in rows]})


def create_category(body):
    slug = body.get('slug', '').strip()
    name = body.get('name', '').strip()
    if not slug or not name:
        return resp(400, {'error': 'slug и name обязательны'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                INSERT INTO categories (slug, name, icon, image_url, sort_order, is_active)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING *
            """, (
                slug, name,
                body.get('icon', 'Package'),
                body.get('image_url'),
                body.get('sort_order', 0),
                body.get('is_active', True),
            ))
            row = dict(cur.fetchone())
        conn.commit()
    return resp(201, {'category': row})


def update_category(cat_id, body):
    slug = body.get('slug', '').strip()
    name = body.get('name', '').strip()
    if not slug or not name:
        return resp(400, {'error': 'slug и name обязательны'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                UPDATE categories
                SET slug=%s, name=%s, icon=%s, image_url=%s, sort_order=%s, is_active=%s
                WHERE id=%s RETURNING *
            """, (
                slug, name,
                body.get('icon', 'Package'),
                body.get('image_url'),
                body.get('sort_order', 0),
                body.get('is_active', True),
                cat_id,
            ))
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Категория не найдена'})
    return resp(200, {'category': dict(row)})


def patch_category(cat_id, body):
    fields, values = [], []
    for k in ['name', 'slug', 'icon', 'image_url', 'sort_order', 'is_active']:
        if k in body:
            fields.append(f"{k} = %s")
            values.append(body[k])
    if not fields:
        return resp(400, {'error': 'Нет полей для обновления'})
    values.append(cat_id)
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"UPDATE categories SET {', '.join(fields)} WHERE id=%s RETURNING *", values)
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Категория не найдена'})
    return resp(200, {'category': dict(row)})


# ---- Products ----

def get_products():
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT p.*, c.name AS category_name
                FROM products p
                LEFT JOIN categories c ON c.slug = p.category_slug
                ORDER BY p.category_slug, p.sort_order, p.id
            """)
            rows = cur.fetchall()
    return resp(200, {'products': [dict(r) for r in rows]})


def create_product(body):
    name = body.get('name', '').strip()
    if not name:
        return resp(400, {'error': 'name обязателен'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                INSERT INTO products (name, category_slug, price, description, image_url, in_stock, sort_order, is_active)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
            """, (
                name,
                body.get('category_slug'),
                body.get('price', 0),
                body.get('description'),
                body.get('image_url'),
                body.get('in_stock', True),
                body.get('sort_order', 0),
                body.get('is_active', True),
            ))
            row = dict(cur.fetchone())
        conn.commit()
    return resp(201, {'product': row})


def update_product(prod_id, body):
    name = body.get('name', '').strip()
    if not name:
        return resp(400, {'error': 'name обязателен'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                UPDATE products
                SET name=%s, category_slug=%s, price=%s, description=%s,
                    image_url=%s, in_stock=%s, sort_order=%s, is_active=%s,
                    updated_at=NOW()
                WHERE id=%s RETURNING *
            """, (
                name,
                body.get('category_slug'),
                body.get('price', 0),
                body.get('description'),
                body.get('image_url'),
                body.get('in_stock', True),
                body.get('sort_order', 0),
                body.get('is_active', True),
                prod_id,
            ))
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Товар не найден'})
    return resp(200, {'product': dict(row)})


def patch_product(prod_id, body):
    fields, values = [], []
    for k in ['name', 'category_slug', 'price', 'description', 'image_url', 'in_stock', 'sort_order', 'is_active']:
        if k in body:
            fields.append(f"{k} = %s")
            values.append(body[k])
    if not fields:
        return resp(400, {'error': 'Нет полей для обновления'})
    fields.append("updated_at = NOW()")
    values.append(prod_id)
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"UPDATE products SET {', '.join(fields)} WHERE id=%s RETURNING *", values)
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Товар не найден'})
    return resp(200, {'product': dict(row)})
