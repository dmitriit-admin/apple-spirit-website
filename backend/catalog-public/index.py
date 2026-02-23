"""
Публичное API каталога: список категорий и товаров для отображения на сайте.
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def resp(status, data):
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, ensure_ascii=False, default=str),
    }


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    resource = params.get('resource', '')

    if resource == 'categories':
        return get_categories()

    if resource == 'products':
        category = params.get('category')
        search = params.get('search', '').strip()
        return get_products(category, search)

    if resource == 'articles':
        article_id = params.get('id')
        return get_article(article_id) if article_id else get_articles()

    return resp(404, {'error': 'Not found'})


def get_categories():
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT c.id, c.slug, c.name, c.icon, c.image_url,
                       COUNT(p.id) AS product_count
                FROM categories c
                LEFT JOIN products p ON p.category_slug = c.slug
                    AND p.is_active = TRUE
                WHERE c.is_active = TRUE
                GROUP BY c.id
                ORDER BY c.sort_order, c.id
            """)
            rows = cur.fetchall()
    return resp(200, {'categories': [dict(r) for r in rows]})


def get_products(category=None, search=None):
    conditions = ["p.is_active = TRUE"]
    values = []

    if category:
        conditions.append("p.category_slug = %s")
        values.append(category)

    if search:
        conditions.append("p.name ILIKE %s")
        values.append(f'%{search}%')

    where = ' AND '.join(conditions)

    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(f"""
                SELECT p.id, p.name, p.category_slug, p.price,
                       p.description, p.image_url, p.in_stock,
                       p.sku, p.specifications,
                       c.name AS category_name
                FROM products p
                LEFT JOIN categories c ON c.slug = p.category_slug
                WHERE {where}
                ORDER BY p.category_slug, p.sort_order, p.id
            """, values)
            rows = cur.fetchall()
    return resp(200, {'products': [dict(r) for r in rows]})


def get_articles():
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("""
                SELECT id, slug, title, excerpt, image_url, category, read_time, created_at
                FROM articles WHERE is_published = TRUE
                ORDER BY sort_order, created_at DESC
            """)
            rows = cur.fetchall()
    return resp(200, {'articles': [dict(r) for r in rows]})


def get_article(article_id):
    with get_conn() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM articles WHERE id=%s AND is_published=TRUE", (article_id,))
            row = cur.fetchone()
    if not row:
        return resp(404, {'error': 'Статья не найдена'})
    return resp(200, {'article': dict(row)})