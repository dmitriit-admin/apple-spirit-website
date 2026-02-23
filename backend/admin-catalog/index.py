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
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
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

    # --- Banners ---
    if resource == 'banners':
        if method == 'GET':
            return get_banners()
        elif method == 'POST':
            return create_banner(body)
        elif method == 'PUT' and item_id:
            return update_banner(item_id, body)
        elif method == 'PATCH' and item_id:
            return patch_banner(item_id, body)
        elif method == 'DELETE' and item_id:
            return delete_banner(item_id)

    # --- Promotions ---
    if resource == 'promotions':
        if method == 'GET':
            return get_promotions()
        elif method == 'POST':
            return create_promotion(body)
        elif method == 'PUT' and item_id:
            return update_promotion(item_id, body)
        elif method == 'PATCH' and item_id:
            return patch_promotion(item_id, body)
        elif method == 'DELETE' and item_id:
            return delete_promotion(item_id)

    # --- Articles ---
    if resource == 'articles':
        if method == 'GET':
            return get_articles()
        elif method == 'POST':
            return create_article(body)
        elif method == 'PUT' and item_id:
            return update_article(item_id, body)
        elif method == 'PATCH' and item_id:
            return patch_article(item_id, body)
        elif method == 'DELETE' and item_id:
            return delete_article(item_id)

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
    import json as _json
    specs = body.get('specifications', {})
    if isinstance(specs, str):
        try:
            specs = _json.loads(specs)
        except Exception:
            specs = {}
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                INSERT INTO products (name, category_slug, price, description, image_url, in_stock, sort_order, is_active, sku, specifications)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                body.get('sku') or None,
                _json.dumps(specs, ensure_ascii=False),
            ))
            row = dict(cur.fetchone())
        conn.commit()
    return resp(201, {'product': row})


def update_product(prod_id, body):
    name = body.get('name', '').strip()
    if not name:
        return resp(400, {'error': 'name обязателен'})
    import json as _json
    specs = body.get('specifications', {})
    if isinstance(specs, str):
        try:
            specs = _json.loads(specs)
        except Exception:
            specs = {}
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                UPDATE products
                SET name=%s, category_slug=%s, price=%s, description=%s,
                    image_url=%s, in_stock=%s, sort_order=%s, is_active=%s,
                    sku=%s, specifications=%s, updated_at=NOW()
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
                body.get('sku') or None,
                _json.dumps(specs, ensure_ascii=False),
                prod_id,
            ))
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Товар не найден'})
    return resp(200, {'product': dict(row)})


# ---- Banners ----

def get_banners():
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM banners ORDER BY sort_order, id")
            rows = cur.fetchall()
    return resp(200, {'banners': [dict(r) for r in rows]})


def create_banner(body):
    title = body.get('title', '').strip()
    if not title:
        return resp(400, {'error': 'title обязателен'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                INSERT INTO banners (title, description, image_url, badge, button_text, button_url, gradient, is_active, sort_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *
            """, (
                title,
                body.get('description'),
                body.get('image_url'),
                body.get('badge', 'Новость'),
                body.get('button_text', 'Подробнее'),
                body.get('button_url', '/catalog'),
                body.get('gradient', 'from-secondary/95 to-muted/90'),
                body.get('is_active', True),
                body.get('sort_order', 0),
            ))
            row = dict(cur.fetchone())
        conn.commit()
    return resp(201, {'banner': row})


def update_banner(ban_id, body):
    title = body.get('title', '').strip()
    if not title:
        return resp(400, {'error': 'title обязателен'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                UPDATE banners SET title=%s, description=%s, image_url=%s, badge=%s,
                    button_text=%s, button_url=%s, gradient=%s, is_active=%s, sort_order=%s
                WHERE id=%s RETURNING *
            """, (
                title,
                body.get('description'),
                body.get('image_url'),
                body.get('badge', 'Новость'),
                body.get('button_text', 'Подробнее'),
                body.get('button_url', '/catalog'),
                body.get('gradient', 'from-secondary/95 to-muted/90'),
                body.get('is_active', True),
                body.get('sort_order', 0),
                ban_id,
            ))
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Баннер не найден'})
    return resp(200, {'banner': dict(row)})


def patch_banner(ban_id, body):
    fields, values = [], []
    for k in ['title', 'description', 'image_url', 'badge', 'button_text', 'button_url', 'gradient', 'is_active', 'sort_order']:
        if k in body:
            fields.append(f"{k} = %s")
            values.append(body[k])
    if not fields:
        return resp(400, {'error': 'Нет полей для обновления'})
    values.append(ban_id)
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"UPDATE banners SET {', '.join(fields)} WHERE id=%s RETURNING *", values)
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Баннер не найден'})
    return resp(200, {'banner': dict(row)})


def delete_banner(ban_id):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM banners WHERE id=%s RETURNING id", (ban_id,))
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Баннер не найден'})
    return resp(200, {'deleted': ban_id})


# ---- Articles ----

def get_articles():
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM articles ORDER BY sort_order, created_at DESC")
            rows = cur.fetchall()
    return resp(200, {'articles': [dict(r) for r in rows]})


def create_article(body):
    title = body.get('title', '').strip()
    slug = body.get('slug', '').strip()
    if not title or not slug:
        return resp(400, {'error': 'title и slug обязательны'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                INSERT INTO articles (slug, title, excerpt, content, image_url, category, read_time, is_published, sort_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *
            """, (
                slug, title,
                body.get('excerpt'),
                body.get('content'),
                body.get('image_url'),
                body.get('category', 'Статья'),
                body.get('read_time', '5 мин'),
                body.get('is_published', True),
                body.get('sort_order', 0),
            ))
            row = dict(cur.fetchone())
        conn.commit()
    return resp(201, {'article': row})


def update_article(art_id, body):
    title = body.get('title', '').strip()
    slug = body.get('slug', '').strip()
    if not title or not slug:
        return resp(400, {'error': 'title и slug обязательны'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                UPDATE articles SET slug=%s, title=%s, excerpt=%s, content=%s,
                    image_url=%s, category=%s, read_time=%s, is_published=%s,
                    sort_order=%s, updated_at=NOW()
                WHERE id=%s RETURNING *
            """, (
                slug, title,
                body.get('excerpt'),
                body.get('content'),
                body.get('image_url'),
                body.get('category', 'Статья'),
                body.get('read_time', '5 мин'),
                body.get('is_published', True),
                body.get('sort_order', 0),
                art_id,
            ))
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Статья не найдена'})
    return resp(200, {'article': dict(row)})


def patch_article(art_id, body):
    fields, values = [], []
    for k in ['slug', 'title', 'excerpt', 'content', 'image_url', 'category', 'read_time', 'is_published', 'sort_order']:
        if k in body:
            fields.append(f"{k} = %s")
            values.append(body[k])
    if not fields:
        return resp(400, {'error': 'Нет полей для обновления'})
    fields.append("updated_at = NOW()")
    values.append(art_id)
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"UPDATE articles SET {', '.join(fields)} WHERE id=%s RETURNING *", values)
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Статья не найдена'})
    return resp(200, {'article': dict(row)})


def delete_article(art_id):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM articles WHERE id=%s RETURNING id", (art_id,))
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Статья не найдена'})
    return resp(200, {'deleted': art_id})


# ---- Promotions ----

def get_promotions():
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM promotions ORDER BY sort_order, id")
            rows = cur.fetchall()
    return resp(200, {'promotions': [dict(r) for r in rows]})


def create_promotion(body):
    title = body.get('title', '').strip()
    if not title:
        return resp(400, {'error': 'title обязателен'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                INSERT INTO promotions (title, description, badge, badge_value, button_text, button_url, expires_at, is_active, sort_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *
            """, (
                title,
                body.get('description'),
                body.get('badge', 'СКИДКА'),
                body.get('badge_value', ''),
                body.get('button_text', 'Смотреть товары'),
                body.get('button_url', '/catalog'),
                body.get('expires_at', ''),
                body.get('is_active', True),
                body.get('sort_order', 0),
            ))
            row = dict(cur.fetchone())
        conn.commit()
    return resp(201, {'promotion': row})


def update_promotion(promo_id, body):
    title = body.get('title', '').strip()
    if not title:
        return resp(400, {'error': 'title обязателен'})
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                UPDATE promotions SET title=%s, description=%s, badge=%s, badge_value=%s,
                    button_text=%s, button_url=%s, expires_at=%s, is_active=%s, sort_order=%s
                WHERE id=%s RETURNING *
            """, (
                title,
                body.get('description'),
                body.get('badge', 'СКИДКА'),
                body.get('badge_value', ''),
                body.get('button_text', 'Смотреть товары'),
                body.get('button_url', '/catalog'),
                body.get('expires_at', ''),
                body.get('is_active', True),
                body.get('sort_order', 0),
                promo_id,
            ))
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Акция не найдена'})
    return resp(200, {'promotion': dict(row)})


def patch_promotion(promo_id, body):
    fields, values = [], []
    for k in ['title', 'description', 'badge', 'badge_value', 'button_text', 'button_url', 'expires_at', 'is_active', 'sort_order']:
        if k in body:
            fields.append(f"{k} = %s")
            values.append(body[k])
    if not fields:
        return resp(400, {'error': 'Нет полей для обновления'})
    values.append(promo_id)
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"UPDATE promotions SET {', '.join(fields)} WHERE id=%s RETURNING *", values)
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Акция не найдена'})
    return resp(200, {'promotion': dict(row)})


def delete_promotion(promo_id):
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM promotions WHERE id=%s RETURNING id", (promo_id,))
            row = cur.fetchone()
        conn.commit()
    if not row:
        return resp(404, {'error': 'Акция не найдена'})
    return resp(200, {'deleted': promo_id})

def patch_product(prod_id, body):
    fields, values = [], []
    for k in ['name', 'category_slug', 'price', 'description', 'image_url', 'in_stock', 'sort_order', 'is_active', 'sku', 'specifications']:
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