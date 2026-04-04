import http.server
import socketserver
import json
import sqlite3
import os

PORT = 8000

# Initialize Database
def init_db():
    conn = sqlite3.connect('ishva.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (email TEXT UNIQUE, phone TEXT, password TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, payload TEXT, total_amount INTEGER)''')
    conn.commit()
    conn.close()

init_db()

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS just in case
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        data = {}
        if post_data:
            data = json.loads(post_data)

        if self.path == '/api/login':
            conn = sqlite3.connect('ishva.db')
            c = conn.cursor()
            c.execute('INSERT OR REPLACE INTO users (email, phone, password) VALUES (?, ?, ?)',
                      (data.get('email'), data.get('phone'), data.get('password')))
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success", "user": data.get('email')}).encode())
        
        elif self.path == '/api/save':
            email = data.get('email')
            payload = data.get('payload')
            
            if isinstance(payload, str):
                payload = json.loads(payload)
                
            total = payload.get('calculatedTotal', 0) if payload else 0
            
            conn = sqlite3.connect('ishva.db')
            c = conn.cursor()
            c.execute('INSERT INTO quotes (email, payload, total_amount) VALUES (?, ?, ?)',
                      (email, json.dumps(payload), total))
            conn.commit()
            conn.close()
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success"}).encode())
            
        else:
            self.send_response(404)
            self.end_headers()

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Ishva Backend running! Open your browser and navigate to: http://localhost:{PORT}")
    httpd.serve_forever()
