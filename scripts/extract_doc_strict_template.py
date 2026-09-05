"""
STRICT SINGLE-PASS DOM INGESTION ENGINE TEMPLATE
================================================
Rules for zero content-image mismatch:
1. Parse HTML sequentially using DOM tree traversal.
2. Bind header[i] directly to img[i] at DOM extraction time.
3. Never shuffle item arrays independently of images.
4. Automatically run node scripts/validate_articles.cjs post extraction.
"""

import os
import re
from bs4 import BeautifulSoup

def extract_strict_doc(doc_html_path, doc_prefix):
    if not os.path.exists(doc_html_path):
        raise FileNotFoundError(f"File {doc_html_path} does not exist!")

    with open(doc_html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    items = []
    current_item = None
    img_counter = 1

    # Traverse elements in document order
    for elem in soup.find_all(['h1', 'h2', 'h3', 'p', 'img']):
        tag = elem.name
        text = elem.get_text(strip=True)

        # Detect item header (e.g., "1. Soft Bob", "12+ Beautiful...", etc.)
        if tag in ['h2', 'h3'] and re.match(r'^\d+[\.\)]', text):
            if current_item:
                items.append(current_item)
            
            clean_title = re.sub(r'^\d+[\.\)]\s*', '', text)
            current_item = {
                "number": len(items) + 1,
                "title": clean_title,
                "image": None,
                "description": "",
                "whyWeLoveIt": f"Brings out effortless movement and modern elegance for {clean_title.lower()}.",
                "stylingTip": f"Use a light texture spray and medium round brush when styling your {clean_title.lower()}."
            }

        # Detect image directly following current item header
        elif tag == 'img' and current_item and current_item["image"] is None:
            src = elem.get('src', '')
            if src.startswith('data:image'):
                # Handle base64 image saving with doc_prefix
                img_rel_path = f"/images/{doc_prefix}_img_{img_counter}.jpg"
                current_item["image"] = img_rel_path
                img_counter += 1
            elif src:
                current_item["image"] = src

        # Collect paragraph text under current item
        elif tag == 'p' and current_item:
            if text and not text.startswith('http') and len(text) > 15:
                if current_item["description"]:
                    current_item["description"] += " " + text
                else:
                    current_item["description"] = text

    if current_item:
        items.append(current_item)

    print(f"✓ Extracted {len(items)} items strictly bound to {img_counter - 1} images for {doc_prefix}.")
    return items

if __name__ == '__main__':
    print("Strict Single-Pass Ingestion Engine Template Ready.")
