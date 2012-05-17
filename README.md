README

mac wrote this

Crunch-Off lets you compare company information side by side. (info from CrunchBase)

TO DO List:

1.read more button in company description that takes you to a page with large centered text of description with back button below

2.choose which categories to have

3.TC posts count not working

5.message saying "company not found" if the request doesnt return anything
    currently works for certain fails but not others
        if the company returns an empty json object (works) vs. 404(doesnt work)

6.media query so when the company name and picture cant fit on the same line
    the picture is centered above the name
    width < 960px
    
COMPLETED List:
Founders doesnt register
hyperlinking blog names
hyperlinking twitter handles
    still need to make it go to twitter.com/facebook instead of localhost/crunch/www.twitter.com/facebook
company name drop down list
grabbing correct thumbnail
    assets/images/resized/0000/4561/4561v1-max-150x150.png
css bug where title is not vertically aligned with the logo
resizing title so it fits with the image in the box
investor list function doesnt work.. have to go through api and figure out patterns
mozilla css
website link should be hyperlinked
highlight in blue investors that are the same
    make each display as a vertical list with no decoration except blue if matching
    needs to be triggered every time a new request is fired and change both investor lists
    when you have the 2nd company and then fire the first company, it doesn't re-match them
blur focus after a company has been entered in it ie when the value is not "Company Name"
4.if company has a picture then the next company in that coloumn requested doesnt-- the picture doesn't go away