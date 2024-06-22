import frappe
from bs4 import BeautifulSoup

def before_save(doc, handler=None):
    if doc.yprint:
        cleaned_html = convert_to_jinja(doc.yprint)
        doc.html = cleaned_html
        
        
        
        
        
        
        
        
def convert_to_jinja(html_input):
    # Define header and footer HTML
    header_html = """
    <div id="header-html" class="hidden-pdf">
        {{ letter_head or "" }}
    </div>
    """

    footer_html = """
    <div id="footer-html">
        {{ footer or "" }}
    </div>
    """
    soup = BeautifulSoup(html_input, 'html.parser')
    # Identify and remove surrounding <tr> and <td> tags around Jinja2 blocks
    for tag in soup.find_all('td'):
        if '{%' in tag.text:
            tag.unwrap()

    for tag in soup.find_all('tr'):
        if '{%' in tag.text:
            tag.unwrap()
    
    for tag in soup.find_all('p'):
        if '{%' in tag.text:
            tag.unwrap()
    
    for tag in soup.find_all('li'):
        if '{%' in tag.text:
            tag.unwrap()
    
      

    # Convert the cleaned HTML back to a string
    cleaned_html = str(soup)
    
    cleaned_html = header_html + cleaned_html + footer_html
    
   
    
    return cleaned_html
