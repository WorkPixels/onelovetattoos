import json
from jinja2 import Environment, FileSystemLoader
from app.seed_data import INITIAL_PHOTOS, INITIAL_ARTISTS, INITIAL_SETTINGS

env = Environment(loader=FileSystemLoader('app/templates'))
template = env.get_template('index.html')

cat_map = {}
for p in INITIAL_PHOTOS:
    c = p['category']
    cat_map[c] = cat_map.get(c, 0) + 1
categories = [{'category': k, 'count': v} for k, v in sorted(cat_map.items(), key=lambda x: x[1], reverse=True)]

rendered = template.render(
    settings=INITIAL_SETTINGS,
    artists=INITIAL_ARTISTS,
    categories=categories,
    featured_photos=[p for p in INITIAL_PHOTOS if p.get('is_featured')]
)

# Convert root-relative paths to relative paths for GitHub Pages subfolder compatibility
rendered = rendered.replace('href="/static/', 'href="static/')
rendered = rendered.replace('src="/static/', 'src="static/')
rendered = rendered.replace('href="/"', 'href="#"')
rendered = rendered.replace('href="/admin"', 'href="admin.html"')

with open('docs/index.html', 'w', encoding='utf-8') as f:
    f.write(rendered)

# Write static JSON data file for client-side fallback on GitHub Pages
docs_photos = []
for p in INITIAL_PHOTOS:
    item = dict(p)
    if item['image_url'].startswith('/'):
        item['image_url'] = item['image_url'].lstrip('/')
    docs_photos.append(item)

with open('docs/photos.json', 'w', encoding='utf-8') as f:
    json.dump({'photos': docs_photos}, f, indent=2)

print('Static site built into docs/ successfully!')
