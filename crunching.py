import simplejson
import urllib

x = urllib.urlopen("http://api.crunchbase.com/v/1/company/pinterest.js")
z = x.read()
y = simplejson.loads(z)
print y