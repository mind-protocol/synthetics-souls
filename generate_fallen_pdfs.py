#!/usr/bin/env python3
"""Generate beautiful PDFs from Fallen listening guide and analysis."""

import markdown
import weasyprint
from pathlib import Path

BASE = Path(__file__).parent / "data" / "import"
OUT = Path(__file__).parent / "data" / "import"

CSS = """
@page {
    size: A4;
    margin: 2.5cm 2cm 2.5cm 2cm;
    @bottom-center {
        content: counter(page);
        font-family: 'Georgia', serif;
        font-size: 9pt;
        color: #666;
    }
}

body {
    font-family: 'Georgia', serif;
    font-size: 11pt;
    line-height: 1.65;
    color: #1a1a1a;
    max-width: 100%;
}

h1 {
    font-family: 'Helvetica Neue', 'Arial', sans-serif;
    font-size: 28pt;
    font-weight: 800;
    color: #1a0a2e;
    letter-spacing: -0.5px;
    margin-top: 1.5em;
    margin-bottom: 0.3em;
    border-bottom: 3px solid #5c2d91;
    padding-bottom: 0.3em;
    page-break-before: auto;
}

h1:first-of-type {
    font-size: 36pt;
    text-align: center;
    border-bottom: 4px solid #5c2d91;
    margin-top: 2em;
    margin-bottom: 0.5em;
}

h2 {
    font-family: 'Helvetica Neue', 'Arial', sans-serif;
    font-size: 16pt;
    font-weight: 700;
    color: #3d1a6e;
    margin-top: 1.8em;
    margin-bottom: 0.4em;
    border-left: 4px solid #8b5cf6;
    padding-left: 12px;
}

h3 {
    font-family: 'Helvetica Neue', 'Arial', sans-serif;
    font-size: 13pt;
    font-weight: 700;
    color: #4a2580;
    margin-top: 1.5em;
    margin-bottom: 0.3em;
}

p {
    margin-bottom: 0.6em;
    text-align: justify;
    hyphens: auto;
}

strong {
    color: #2d1050;
}

em {
    font-style: italic;
    color: #555;
}

blockquote {
    border-left: 3px solid #8b5cf6;
    margin: 1em 0;
    padding: 0.5em 1em;
    background: #f8f5ff;
    font-style: italic;
    color: #444;
}

code {
    font-family: 'Courier New', monospace;
    background: #f3f0ff;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 10pt;
}

pre {
    background: #1a0a2e;
    color: #e0d4f5;
    padding: 1em;
    border-radius: 6px;
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
    border-top: 1px solid #d4c5f0;
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
    background: #3d1a6e;
    color: white;
    padding: 8px 12px;
    text-align: left;
    font-family: 'Helvetica Neue', 'Arial', sans-serif;
    font-weight: 600;
}

td {
    padding: 6px 12px;
    border-bottom: 1px solid #e0d4f5;
}

tr:nth-child(even) td {
    background: #f8f5ff;
}

ul, ol {
    margin-bottom: 0.8em;
    padding-left: 1.5em;
}

li {
    margin-bottom: 0.3em;
}

/* Timestamp annotations */
p strong:first-child {
    color: #5c2d91;
}
"""

def md_to_pdf(md_path: Path, pdf_path: Path, title: str):
    """Convert a markdown file to a styled PDF."""
    md_text = md_path.read_text(encoding="utf-8")

    html_body = markdown.markdown(
        md_text,
        extensions=["tables", "fenced_code", "codehilite", "smarty"],
    )

    html = f"""<!DOCTYPE html>
<html lang="fr">
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
        BASE / "fallen_ecoute_commentee.md",
        OUT / "fallen_ecoute_commentee.pdf",
        "FALLEN — Guide d'Ecoute Commente",
    )
    md_to_pdf(
        BASE / "fallen_analysis.md",
        OUT / "fallen_analysis.pdf",
        "FALLEN — Cartographie Psychique d'Amy Lee",
    )
