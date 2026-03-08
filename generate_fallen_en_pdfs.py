#!/usr/bin/env python3
"""Generate Fallen-themed English PDFs — dark blue, white text, gothic aesthetic."""

import markdown
import weasyprint
from pathlib import Path

BASE = Path(__file__).parent / "data" / "import"
OUT = BASE

# ─── Fallen Album Color Scheme ───────────────────────────────
# Deep navy/midnight blue background, white text, purple accents
# Gothic serif fonts, italic commentary, textured feel

CSS = """
@page {
    size: A4;
    margin: 2.5cm 2cm 2.5cm 2cm;
    background: #0a1628;
    @bottom-center {
        content: counter(page);
        font-family: 'Georgia', serif;
        font-size: 9pt;
        color: #5a6d8a;
    }
}

body {
    font-family: 'Georgia', serif;
    font-size: 11pt;
    line-height: 1.7;
    color: #d8dfe8;
    background: #0a1628;
    max-width: 100%;
}

h1 {
    font-family: 'Palatino Linotype', 'Book Antiqua', 'Palatino', serif;
    font-size: 28pt;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 1.5em;
    margin-bottom: 0.3em;
    border-bottom: 2px solid #3a5a8a;
    padding-bottom: 0.4em;
    text-shadow: 0 0 20px rgba(100, 140, 200, 0.3);
}

h1:first-of-type {
    font-size: 36pt;
    text-align: center;
    border-bottom: 3px solid #4a7ab5;
    margin-top: 2em;
    margin-bottom: 0.5em;
    letter-spacing: 4px;
}

h2 {
    font-family: 'Palatino Linotype', 'Book Antiqua', 'Palatino', serif;
    font-size: 16pt;
    font-weight: 700;
    color: #8ab4e8;
    margin-top: 1.8em;
    margin-bottom: 0.4em;
    border-left: 3px solid #4a7ab5;
    padding-left: 12px;
    letter-spacing: 1px;
}

h3 {
    font-family: 'Palatino Linotype', 'Book Antiqua', 'Palatino', serif;
    font-size: 13pt;
    font-weight: 700;
    color: #9fc5f0;
    margin-top: 1.5em;
    margin-bottom: 0.3em;
}

p {
    margin-bottom: 0.6em;
    text-align: justify;
    hyphens: auto;
}

strong {
    color: #ffffff;
    font-weight: 700;
}

/* Commentary in italic — the defining style choice */
em {
    font-style: italic;
    color: #7a9ec4;
    display: inline;
}

blockquote {
    border-left: 2px solid #4a7ab5;
    margin: 1em 0;
    padding: 0.5em 1em;
    background: rgba(74, 122, 181, 0.08);
    font-style: italic;
    color: #8ab4e8;
}

code {
    font-family: 'Courier New', monospace;
    background: rgba(255, 255, 255, 0.06);
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 10pt;
    color: #9fc5f0;
}

pre {
    background: #060e1a;
    color: #8ab4e8;
    padding: 1em;
    border-radius: 6px;
    border: 1px solid #1a2a42;
    font-size: 9.5pt;
    line-height: 1.5;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    page-break-inside: avoid;
}

pre code {
    background: none;
    padding: 0;
    color: inherit;
}

hr {
    border: none;
    border-top: 1px solid #1a2a42;
    margin: 2em 0;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: 10pt;
    page-break-inside: avoid;
}

th {
    background: #142240;
    color: #9fc5f0;
    padding: 8px 12px;
    text-align: left;
    font-family: 'Palatino Linotype', 'Book Antiqua', 'Palatino', serif;
    font-weight: 600;
    border-bottom: 2px solid #4a7ab5;
}

td {
    padding: 6px 12px;
    border-bottom: 1px solid #1a2a42;
    color: #d8dfe8;
}

tr:nth-child(even) td {
    background: rgba(74, 122, 181, 0.05);
}

ul, ol {
    margin-bottom: 0.8em;
    padding-left: 1.5em;
}

li {
    margin-bottom: 0.3em;
    color: #d8dfe8;
}

li::marker {
    color: #4a7ab5;
}

/* Timestamp annotations — bright white on dark */
p strong:first-child {
    color: #ffffff;
    letter-spacing: 0.5px;
}

/* Links */
a {
    color: #6a9fd8;
    text-decoration: none;
}
"""


def md_to_pdf(md_path: Path, pdf_path: Path, title: str):
    """Convert a markdown file to a Fallen-themed PDF."""
    md_text = md_path.read_text(encoding="utf-8")

    html_body = markdown.markdown(
        md_text,
        extensions=["tables", "fenced_code", "codehilite", "smarty"],
    )

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{title}</title>
    <style>{CSS}</style>
</head>
<body>
{html_body}
</body>
</html>"""

    doc = weasyprint.HTML(string=html)
    doc.write_pdf(str(pdf_path))
    print(f"Generated: {pdf_path} ({pdf_path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    md_to_pdf(
        BASE / "fallen_listening_guide_en.md",
        OUT / "fallen_listening_guide_en.pdf",
        "FALLEN — Annotated Listening Guide",
    )
    md_to_pdf(
        BASE / "fallen_analysis_en.md",
        OUT / "fallen_analysis_en.pdf",
        "FALLEN — Psychic Cartography of Amy Lee",
    )
