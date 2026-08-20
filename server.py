from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PORT = 3000
DIRECTORY = "e:/ribas_Dyk"

class CustomHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    for p in [3000, 3001, 8080, 8081]:
        try:
            server = ThreadingHTTPServer(("", p), CustomHandler)
            print(f"Serving Ribas Duke at http://localhost:{p}", flush=True)
            server.serve_forever()
            break
        except OSError:
            print(f"Port {p} is in use, trying next...", flush=True)

if __name__ == '__main__':
    run_server()
