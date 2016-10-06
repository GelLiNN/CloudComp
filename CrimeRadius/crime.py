import requests

url = "https://data.seattle.gov/resource/pu5n-trf4.json"

response = requests.get(url)
if response.status_code == 200:
    data = response.json()
