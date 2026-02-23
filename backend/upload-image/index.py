"""
Загрузка изображений товаров и категорий в S3.
Принимает base64-файл, сохраняет в S3, возвращает CDN URL.
Требует заголовок X-Admin-Key.
"""
import json
import os
import base64
import uuid
import boto3

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
}

ALLOWED_TYPES = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
}


def resp(status, data):
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, ensure_ascii=False),
    }


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    key = event.get('headers', {}).get('X-Admin-Key', '')
    if key != os.environ.get('ADMIN_SECRET_KEY', ''):
        return resp(401, {'error': 'Unauthorized'})

    if event.get('httpMethod') != 'POST':
        return resp(405, {'error': 'Method not allowed'})

    body = json.loads(event.get('body') or '{}')
    file_data = body.get('file')
    content_type = body.get('content_type', 'image/jpeg')
    folder = body.get('folder', 'products')

    if not file_data:
        return resp(400, {'error': 'file обязателен (base64)'})

    if content_type not in ALLOWED_TYPES:
        return resp(400, {'error': f'Неподдерживаемый тип: {content_type}'})

    if ',' in file_data:
        file_data = file_data.split(',', 1)[1]

    image_bytes = base64.b64decode(file_data)

    if len(image_bytes) > 5 * 1024 * 1024:
        return resp(400, {'error': 'Файл слишком большой (макс. 5MB)'})

    ext = ALLOWED_TYPES[content_type]
    filename = f"catalog/{folder}/{uuid.uuid4().hex}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    s3.put_object(
        Bucket='files',
        Key=filename,
        Body=image_bytes,
        ContentType=content_type,
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{filename}"

    return resp(200, {'url': cdn_url})
