import requests
import json
# post request test
url_post = "http://127.0.0.1:8001/bfhl"
payload = {
     
   
    "data": ["M", "1", "334", "4", "B", "Z", "a"],
  "file_b64": "JVBERi0xLjQKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwvTGluZWFyaXplZCAxL0wgNzYwOC9PIDIvRSAxMjMzL04gMS9UIDc2NTQvSCBbIDM1MiAwIF0KPj4KZW5kb2JqCjIgMCBvYmoKPDwvQ3JlYXRvciAoQWRvYmUgQWNyb2JhdCBGb3JtYXR0aW5nKS9Qcm9kdWNlciAoQWRvYmUgUGxheWVyIDIuMSBVcGdyYWRlKS9DcmVhdGlvbkRhdGUgKEQ6MjAyNDAzMDMxMjEyNTYrMDAwMCcpL0ZpbHRlciAoRmxhdGVEZWNvZGUpL1R5cGUgL1hSZWYvU2l6ZSAzPj4KZW5kb2JqCjMgMCBvYmoKPDwvVHlwZSAvQ2F0YWxvZy9QYWdlcyA0IDAgUi9PcGVuQWN0aW9uIFswIDAgMF0vUGFnZUxheW91dCBJZGVudGlmaWVyIC9Tb25nMS9Gb3JtYXQgL1BEEJPLf0EBAAAAAAAAAAAAAAAAAAAAAAAAAAAAENDw0MDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0lERFByCg=="


    
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url_post, json=payload, headers=headers)

print(json.loads(response.text))
