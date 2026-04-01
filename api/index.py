import os
import json
import requests
from bs4 import BeautifulSoup
import telebot
from flask import Flask, request
import firebase_admin
from firebase_admin import credentials, firestore

# 1. 初始化 Firebase (使用環境變數開門)
if not firebase_admin._apps:
    cred_json = os.environ.get('FIREBASE_SERVICE_ACCOUNT')
    if cred_json:
        cred_dict = json.loads(cred_json)
        cred = credentials.Certificate(cred_dict)
        firebase_admin.initialize_app(cred)

db = firestore.client()

# 2. 初始化 Telegram Bot
TOKEN = os.environ.get('TELEGRAM_TOKEN')
bot = telebot.TeleBot(TOKEN, threaded=False)
app = Flask(__name__)

# 3. 爬蟲功能：去 Snkrdunk 捉價錢
def get_snkrdunk_price(snkrdunk_id):
    try:
        url = f"https://snkrdunk.com/en/products/{snkrdunk_id}"
        headers = {"User-Agent": "Mozilla/5.0"}
        res = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(res.text, 'html.parser')
        # 呢度假設搵第一個價錢標籤，具體位置可能隨網頁更新調整
        price_tag = soup.find("div", {"class": "money"}) 
        return price_tag.text if price_tag else "N/A"
    except:
        return "Error"

# 4. Telegram 指令：/update 
@bot.message_handler(commands=['update'])
def update_prices(message):
    bot.reply_to(message, "🚀 小龍蝦開始搬數，請稍候...")
    # 喺 Firestore 拎返你嗰 20 張卡
    docs = db.collection('products').stream()
    for doc in docs:
        data = doc.to_dict()
        sid = data.get('snkrdunk_id')
        if sid:
            new_price = get_snkrdunk_price(sid)
            db.collection('products').document(doc.id).update({
                'market_data.snkrdunk_price': new_price
            })
    bot.send_message(message.chat.id, "✅ 搬數完成！你個網頁應該閃緊綠燈喇。")

# 5. Vercel 必備：處理 Telegram 傳嚟嘅訊息 (Webhook)
@app.route('/api/index', methods=['POST'])
def webhook():
    json_string = request.get_data().decode('utf-8')
    update = telebot.types.Update.de_json(json_string)
    bot.process_new_updates([update])
    return "OK", 200

@app.route('/')
def index():
    return "小龍蝦伺服器運行中！"
