import urllib2, sys
from BeautifulSoup import BeautifulSoup

url = "http://api.glassdoor.com/api/api.htm?t.p=114236&t.k=j1ERnurd9SI&userip=0.0.0.0&useragent=&format=json&v=1&action=employers&q="
hdr = {'User-Agent': ''}
req = urllib2.Request(url,headers=hdr)
response = urllib2.urlopen(req)
soup = BeautifulSoup(response)
print(response)
