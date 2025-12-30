import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta
import psycopg2

def handler(event: dict, context) -> dict:
    '''Регистрация, авторизация и управление пользователями'''
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('action', 'login')
    
    try:
        if path == 'register':
            return handle_register(event)
        elif path == 'login':
            return handle_login(event)
        elif path == 'logout':
            return handle_logout(event)
        elif path == 'me':
            return handle_get_user(event)
        else:
            return error_response(400, 'Invalid action')
    except Exception as e:
        return error_response(500, str(e))

def handle_register(event: dict) -> dict:
    body = json.loads(event.get('body', '{}'))
    email = body.get('email', '').strip().lower()
    password = body.get('password', '')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    
    if not email or not password or not name:
        return error_response(400, 'Email, password and name are required')
    
    if len(password) < 6:
        return error_response(400, 'Password must be at least 6 characters')
    
    password_hash = hash_password(password)
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return error_response(400, 'Email already registered')
        
        cursor.execute(
            "INSERT INTO users (email, password_hash, name, phone) VALUES (%s, %s, %s, %s) RETURNING id",
            (email, password_hash, name, phone)
        )
        user_id = cursor.fetchone()[0]
        
        session_token = create_session(cursor, user_id)
        
        conn.commit()
        
        return success_response({
            'sessionToken': session_token,
            'user': {
                'id': user_id,
                'email': email,
                'name': name,
                'phone': phone
            }
        })
    finally:
        conn.close()

def handle_login(event: dict) -> dict:
    body = json.loads(event.get('body', '{}'))
    email = body.get('email', '').strip().lower()
    password = body.get('password', '')
    
    if not email or not password:
        return error_response(400, 'Email and password are required')
    
    password_hash = hash_password(password)
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute(
            "SELECT id, email, name, phone, password_hash FROM users WHERE email = %s",
            (email,)
        )
        user = cursor.fetchone()
        
        if not user or user[4] != password_hash:
            return error_response(401, 'Invalid email or password')
        
        session_token = create_session(cursor, user[0])
        
        conn.commit()
        
        return success_response({
            'sessionToken': session_token,
            'user': {
                'id': user[0],
                'email': user[1],
                'name': user[2],
                'phone': user[3]
            }
        })
    finally:
        conn.close()

def handle_logout(event: dict) -> dict:
    session_token = event.get('headers', {}).get('x-session-token') or event.get('headers', {}).get('X-Session-Token')
    
    if not session_token:
        return error_response(400, 'Session token required')
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("UPDATE user_sessions SET expires_at = NOW() WHERE session_token = %s", (session_token,))
        conn.commit()
        
        return success_response({'message': 'Logged out successfully'})
    finally:
        conn.close()

def handle_get_user(event: dict) -> dict:
    session_token = event.get('headers', {}).get('x-session-token') or event.get('headers', {}).get('X-Session-Token')
    
    if not session_token:
        return error_response(401, 'Session token required')
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute(
            """
            SELECT u.id, u.email, u.name, u.phone 
            FROM users u
            JOIN user_sessions s ON u.id = s.user_id
            WHERE s.session_token = %s AND s.expires_at > NOW()
            """,
            (session_token,)
        )
        user = cursor.fetchone()
        
        if not user:
            return error_response(401, 'Invalid or expired session')
        
        return success_response({
            'user': {
                'id': user[0],
                'email': user[1],
                'name': user[2],
                'phone': user[3]
            }
        })
    finally:
        conn.close()

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def create_session(cursor, user_id: int) -> str:
    session_token = secrets.token_urlsafe(32)
    expires_at = datetime.now() + timedelta(days=30)
    
    cursor.execute(
        "INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (%s, %s, %s)",
        (user_id, session_token, expires_at)
    )
    
    return session_token

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def success_response(data: dict) -> dict:
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(data),
        'isBase64Encoded': False
    }

def error_response(status: int, message: str) -> dict:
    return {
        'statusCode': status,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': message}),
        'isBase64Encoded': False
    }
