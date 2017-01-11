from indeed import IndeedClient

client = IndeedClient('9876703242051712')

params = {
    'q' : "python",
    'l' : "austin",
    'userip' : "1.2.3.4",
    'useragent' : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)"
}

search_response = client.search(**params)
