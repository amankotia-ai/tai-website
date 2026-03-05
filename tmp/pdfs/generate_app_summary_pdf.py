from pathlib import Path
import textwrap

OUT = Path('output/pdf/theatre_ai_app_summary.pdf')
OUT.parent.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = 612, 792  # Letter size in points
LEFT = 48
TOP = 752
LINE = 13

content = []
y = TOP


def esc(s: str) -> str:
    return s.replace('\\', r'\\').replace('(', r'\(').replace(')', r'\)')


def write_line(text: str, font='F1', size=10):
    global y
    content.append(f"BT /{font} {size} Tf {LEFT} {y} Td ({esc(text)}) Tj ET")
    y -= LINE


def write_heading(text: str):
    global y
    write_line(text, font='F2', size=12)
    y -= 1


def write_paragraph(text: str, width=96):
    for line in textwrap.wrap(text, width=width):
        write_line(line)


def write_bullet(text: str, width=92):
    lines = textwrap.wrap(text, width=width)
    if not lines:
        write_line('-')
        return
    write_line(f"- {lines[0]}")
    for line in lines[1:]:
        write_line(f"  {line}")


write_line('Theatre AI App Summary (Repo Evidence)', font='F2', size=18)
y -= 4

write_heading('What It Is')
write_paragraph(
    'Theatre AI is a Vite + React single-page web app for protecting voice and likeness rights in the entertainment industry. '
    'It combines a marketing landing page, animated feature demos, and a research/blog reading experience.'
)
y -= 4

write_heading('Who It Is For')
write_paragraph(
    'Primary persona: actors/talent and studio teams handling AI usage rights and licensing workflows. '
    'The hero copy explicitly references the Indian entertainment industry.'
)
y -= 4

write_heading('What It Does')
feature_bullets = [
    'Presents rights/consent positioning with registration and demo calls-to-action (src/components/Hero.tsx).',
    'Shows a 3-step flow: Verify -> License -> Generate, including CastID and usage token concepts (src/components/Workflow.tsx).',
    'Runs an animated card scanner demo with moving cards, canvas light bar, and ASCII scan overlay (src/components/CardScanner.tsx).',
    'Displays four scanner capability callouts (identity, audit/compliance, licensing, usage tokens) (src/components/ScannerFeatures.tsx).',
    'Provides a research page with article cards and route links (src/pages/ResearchPage.tsx).',
    'Renders article detail pages via route param and hardcoded mock HTML content (src/pages/ArticlePage.tsx).',
]
for b in feature_bullets:
    write_bullet(b)

y -= 4
write_heading('How It Works (Architecture)')
arch_bullets = [
    'Client shell: React 18 app bootstrapped in src/main.tsx with BrowserRouter; App composes Navbar + routed pages + Footer.',
    'Routing: /, /new-hero, /portfolio-shader, /research, /research/:id, and wildcard redirect to /.',
    'Data flow: UI content is mostly local static arrays/objects in components/pages; no state store found in repo.',
    'External service: Hero dynamically injects UnicornStudio script from jsDelivr CDN at runtime.',
    'Backend/API/database/auth wiring: Not found in repo (package.json includes Supabase dependency, but no src usage found).',
]
for b in arch_bullets:
    write_bullet(b)

y -= 4
write_heading('How To Run (Minimal)')
run_bullets = [
    'Prerequisite Node.js version: Not found in repo.',
    'Install dependencies: npm install',
    'Start local dev server: npm run dev',
    'Optional production check: npm run build && npm run preview',
]
for b in run_bullets:
    write_bullet(b)

if y < 40:
    raise SystemExit(f'Content overflowed one page. Final y={y}')

stream = ('\n'.join(content)).encode('latin-1', errors='replace')

objects = []
objects.append('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')
objects.append('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n')
objects.append(
    f'3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] '
    '/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n'
)
objects.append('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n')
objects.append('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n')
objects.append(
    f'6 0 obj\n<< /Length {len(stream)} >>\nstream\n'.encode('ascii') + stream + b'\nendstream\nendobj\n'
)

pdf = b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n'
offsets = [0]
for obj in objects:
    offsets.append(len(pdf))
    if isinstance(obj, str):
        pdf += obj.encode('latin-1')
    else:
        pdf += obj

xref_start = len(pdf)
count = len(objects) + 1
pdf += f'xref\n0 {count}\n'.encode('ascii')
pdf += b'0000000000 65535 f \n'
for i in range(1, count):
    pdf += f'{offsets[i]:010d} 00000 n \n'.encode('ascii')
pdf += (
    f'trailer\n<< /Size {count} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n'.encode('ascii')
)

OUT.write_bytes(pdf)
print(f'Wrote {OUT} ({OUT.stat().st_size} bytes)')
