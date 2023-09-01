# wikipedia-web-app 
A web app the that uses the mediawiki API to display snippets of related articles on each search
## Stack
HTML, CSS, JS, and mediawiki API.  
## Live demo
https://wikipedia-app-lynxdev.netlify.app/
## API DOCS

- [wiki docs](https://www.mediawiki.org/wiki/API:Main_page)

- ready to go url's
## Extra Features
1. Theme toggle button: Taking advantage of the checked input type in HTML and some CSS styling.
2. Theme recovery: Your theme preferences are saved on the on the localstorage, so a reload simply recovers and applies theme settings
3. Suggestions on focus: Clicking on the text input presents(if any), your previous searches. You can click on them to re-search. Subsequent typing in the text input, filters your history to provide the most related(if any) search.
4. History limit: A limit of 5 past searches has been plaaced on the history function to avoid convolution.
