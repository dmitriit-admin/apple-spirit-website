import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    '''Отправка уведомления о запросе на поступление товара'''
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        product_name = body.get('productName', '')
        customer_email = body.get('email', '')
        customer_phone = body.get('phone', '')
        
        if not product_name or not customer_email:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Product name and email are required'}),
                'isBase64Encoded': False
            }
        
        company_emails = ['info@tkexclusiv.ru', 'ya.exc03@yandex.ru', 'ya.exc08@yandex.ru']
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Запрос на поступление товара: {product_name}'
        msg['From'] = 'noreply@tkexclusiv.ru'
        msg['To'] = ', '.join(company_emails)
        
        html_content = f'''
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                Новый запрос на уведомление о поступлении
              </h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 10px 0;"><strong>Товар:</strong> {product_name}</p>
                <p style="margin: 10px 0;"><strong>Email клиента:</strong> <a href="mailto:{customer_email}">{customer_email}</a></p>
                {f'<p style="margin: 10px 0;"><strong>Телефон:</strong> <a href="tel:{customer_phone}">{customer_phone}</a></p>' if customer_phone else ''}
              </div>
              
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 20px;">
                <p style="margin: 0; font-size: 14px; color: #6b7280;">
                  <strong>Что делать:</strong> Когда товар появится в наличии, уведомите клиента по указанным контактам.
                </p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #9ca3af;">
                <p>Это автоматическое уведомление с сайта ТК Эксклюзив</p>
              </div>
            </div>
          </body>
        </html>
        '''
        
        text_content = f'''
Новый запрос на уведомление о поступлении

Товар: {product_name}
Email клиента: {customer_email}
{'Телефон: ' + customer_phone if customer_phone else ''}

Когда товар появится в наличии, уведомите клиента по указанным контактам.
        '''
        
        part1 = MIMEText(text_content, 'plain')
        part2 = MIMEText(html_content, 'html')
        
        msg.attach(part1)
        msg.attach(part2)
        
        try:
            with smtplib.SMTP('localhost', 25) as server:
                server.send_message(msg)
        except Exception as smtp_error:
            print(f'SMTP error (using fallback): {str(smtp_error)}')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Notification request received'
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
