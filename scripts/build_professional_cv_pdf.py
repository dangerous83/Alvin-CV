from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Alvin_Jampazar_Professional_CV.pdf"
PUBLIC = ROOT / "public" / "Alvin_Jampazar_Web_CV.pdf"
PORTRAIT = ROOT / "public" / "alvin-profile.jpg"

W, H = A4
INK = HexColor("#080808")
INK_SOFT = HexColor("#121010")
PANEL = HexColor("#191515")
MAROON = HexColor("#701C2B")
MAROON_DARK = HexColor("#3C0B16")
RED = HexColor("#A63145")
PAPER = HexColor("#F3EEE7")
PAPER_SOFT = HexColor("#D8D0C7")
MUTED = HexColor("#756B65")
LINE = HexColor("#D2C8C1")
WHITE = HexColor("#FFFFFF")


def wrap(text, font, size, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = word if not current else current + " " + word
        if stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def paragraph(c, text, x, y, width, font="Helvetica", size=9.5, leading=13, color=INK, max_lines=None):
    lines = wrap(text, font, size, width)
    if max_lines:
        lines = lines[:max_lines]
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def bullets(c, items, x, y, width, size=8.7, leading=11.5, color=INK):
    for item in items:
        lines = wrap(item, "Helvetica", size, width - 13)
        c.setFillColor(RED)
        c.rect(x, y - 2, 4, 4, fill=1, stroke=0)
        c.setFillColor(color)
        c.setFont("Helvetica", size)
        for index, line in enumerate(lines):
            c.drawString(x + 13, y - index * leading, line)
        y -= max(1, len(lines)) * leading + 5
    return y


def footer(c, page_number, section, dark=False):
    color = HexColor("#8C827C") if dark else MUTED
    line_color = HexColor("#332B2B") if dark else LINE
    c.setStrokeColor(line_color)
    c.setLineWidth(0.55)
    c.line(40, 29, W - 40, 29)
    c.setFillColor(color)
    c.setFont("Courier", 6.5)
    c.drawString(40, 17, f"ALVIN JAMPAZAR / {section.upper()}")
    c.drawRightString(W - 40, 17, f"{page_number:02d}")


def section_label(c, text, x, y, dark=False):
    c.setFillColor(RED if not dark else HexColor("#D75A70"))
    c.setFont("Courier-Bold", 7.2)
    c.drawString(x, y, text.upper())


def cover_photo(c, x, y, width, height):
    image = ImageReader(str(PORTRAIT))
    image_w, image_h = image.getSize()
    scale = max(width / image_w, height / image_h)
    draw_w = image_w * scale
    draw_h = image_h * scale
    draw_x = x + (width - draw_w) / 2
    draw_y = y + (height - draw_h) / 2
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.saveState()
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(image, draw_x, draw_y, draw_w, draw_h, mask="auto")
    c.setFillColor(HexColor("#11080B"))
    c.setFillAlpha(0.14)
    c.rect(x, y, width, height, fill=1, stroke=0)
    c.restoreState()


def contact_link(c, label, value, url, x, y, width, dark=True):
    fill = PAPER if dark else INK
    muted = HexColor("#C98D99") if dark else RED
    c.setFillColor(muted)
    c.setFont("Courier-Bold", 6.5)
    c.drawString(x, y, label.upper())
    c.setFillColor(fill)
    c.setFont("Helvetica-Bold", 9.1)
    c.drawRightString(x + width, y - 1, value)
    c.linkURL(url, (x, y - 6, x + width, y + 10), relative=0)


def page_one(c):
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    photo_x = 365
    cover_photo(c, photo_x, 0, W - photo_x, H)
    c.setFillColor(MAROON)
    c.rect(0, 0, 12, H, fill=1, stroke=0)
    c.rect(photo_x - 10, 0, 10, H, fill=1, stroke=0)

    # Monogram
    c.setFillColor(MAROON)
    c.rect(45, H - 102, 54, 54, fill=1, stroke=0)
    c.setStrokeColor(PAPER)
    c.setLineWidth(0.7)
    c.rect(51, H - 96, 42, 42, fill=0, stroke=1)
    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 23)
    c.drawString(56, H - 82, "A")
    c.setFont("Helvetica-Bold", 18)
    c.drawRightString(89, H - 91, "J")

    section_label(c, "Dubai / Creative Leadership / 2026", 45, H - 132, dark=True)
    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 39)
    c.drawString(45, H - 198, "ALVIN")
    c.drawString(45, H - 243, "JAMPAZAR")
    c.setFillColor(RED)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(47, H - 274, "GRAPHIC DESIGN x AI SYSTEMS")

    summary = (
        "Senior Graphic Designer, Marketing Manager, and AI Specialist with 12+ years "
        "of UAE experience connecting strategy, brand craft, motion, digital products, "
        "performance marketing, and emerging technology."
    )
    paragraph(c, summary, 47, H - 322, 284, size=10.4, leading=15, color=PAPER_SOFT)

    c.setStrokeColor(HexColor("#3B3032"))
    c.line(47, H - 410, 330, H - 410)
    section_label(c, "Career Snapshot", 47, H - 432, dark=True)
    metrics = [("12+", "YEARS IN UAE"), ("700+", "PROJECTS DELIVERED"), ("150+", "CLIENTS & BRANDS")]
    metric_x = [47, 145, 245]
    for x, (value, label) in zip(metric_x, metrics):
        c.setFillColor(PAPER)
        c.setFont("Helvetica-Bold", 23)
        c.drawString(x, H - 468, value)
        c.setFillColor(HexColor("#A89E98"))
        c.setFont("Courier", 5.8)
        for index, line in enumerate(wrap(label, "Courier", 5.8, 80)):
            c.drawString(x, H - 483 - index * 8, line)

    section_label(c, "Core Positioning", 47, H - 540, dark=True)
    positions = [
        "Creative Direction", "Graphic Design", "AI Marketing",
        "Web & Platforms", "Motion & Video", "Brand Growth",
    ]
    for index, item in enumerate(positions):
        col = index % 2
        row = index // 2
        x = 47 + col * 145
        y = H - 569 - row * 34
        c.setFillColor(PANEL)
        c.roundRect(x, y - 17, 136, 25, 4, fill=1, stroke=0)
        c.setFillColor(PAPER)
        c.setFont("Helvetica-Bold", 8.2)
        c.drawString(x + 10, y - 2, item)
        c.setFillColor(RED)
        c.circle(x + 125, y, 2.2, fill=1, stroke=0)

    c.setFillColor(MAROON_DARK)
    c.roundRect(45, 65, 286, 90, 5, fill=1, stroke=0)
    section_label(c, "Contact", 61, 135, dark=True)
    contact_link(c, "Email", "alvinjampazar1983@gmail.com", "mailto:alvinjampazar1983@gmail.com", 61, 111, 252)
    contact_link(c, "WhatsApp", "+971 52 223 5776", "https://wa.me/971522235776", 61, 84, 252)
    footer(c, 1, "Professional CV", dark=True)
    c.showPage()


def page_two(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(MAROON)
    c.rect(0, 0, 12, H, fill=1, stroke=0)
    section_label(c, "01 / Professional Experience", 40, H - 48)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 23)
    c.drawString(40, H - 88, "CREATIVE LEADERSHIP")
    c.drawString(40, H - 121, "BUILT ON PRODUCTION DEPTH.")

    timeline_x = 62
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.line(timeline_x, 92, timeline_x, H - 164)
    experiences = [
        {
            "role": "Marketing Manager, Senior Designer & AI Specialist",
            "company": "SecureVisa Group / ITSEC Cybersecurity",
            "place": "Dubai, UAE / Present",
            "bullets": [
                "Lead integrated marketing, brand identity, websites, UI/UX, motion, AI campaigns, and performance optimization.",
                "Direct cross-functional content and campaign delivery across consultancy, cybersecurity, and emerging-technology brands.",
            ],
        },
        {
            "role": "Senior Graphic Designer & Photographer/Videographer",
            "company": "Cabilo Advertising",
            "place": "Dubai, UAE",
            "bullets": [
                "Expanded a senior design practice into campaign photography, videography, editing, motion, and creative direction.",
                "Delivered platform-ready brand assets from concept and production through final post-production.",
            ],
        },
        {
            "role": "Senior Graphic Designer, 3D Artist & UI/UX Designer",
            "company": "Excel Pixel",
            "place": "Abu Dhabi, UAE",
            "bullets": [
                "Delivered senior graphic design, 3D visualization, interface design, and client-facing creative direction.",
                "Built visual systems across print, digital, environmental, and interactive project requirements.",
            ],
        },
        {
            "role": "Creative Production Foundation",
            "company": "Target Car Care / Molten Me / Afaneen / Diamond Lines",
            "place": "Abu Dhabi, UAE",
            "bullets": [
                "Built hands-on expertise in large-format print, vehicle and marine graphics, identity, social media, and 2D animation.",
                "Developed the production discipline that now supports senior strategy and creative leadership.",
            ],
        },
    ]
    y_positions = [H - 178, H - 322, H - 466, H - 610]
    for index, (experience, y) in enumerate(zip(experiences, y_positions), start=1):
        c.setFillColor(MAROON if index == 1 else INK)
        c.circle(timeline_x, y + 5, 13, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Courier-Bold", 6.5)
        c.drawCentredString(timeline_x, y + 2.5, f"{index:02d}")
        x = 88
        c.setFillColor(RED)
        c.setFont("Courier-Bold", 6.8)
        c.drawString(x, y + 18, experience["place"].upper())
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 11.4)
        role_lines = wrap(experience["role"], "Helvetica-Bold", 11.4, 300)
        role_y = y
        for line in role_lines:
            c.drawString(x, role_y, line)
            role_y -= 13
        c.setFillColor(MAROON)
        c.setFont("Helvetica-Bold", 8.2)
        c.drawString(x, role_y - 1, experience["company"])
        bullets(c, experience["bullets"], x, role_y - 22, 300, size=8.1, leading=10, color=MUTED)

    # Right-side impact panel
    panel_x = 414
    c.setFillColor(MAROON_DARK)
    c.rect(panel_x, 62, W - panel_x, H - 104, fill=1, stroke=0)
    section_label(c, "Selected Impact", panel_x + 18, H - 72, dark=True)
    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(panel_x + 18, H - 108, "BUILT FOR")
    c.drawString(panel_x + 18, H - 129, "THE REAL WORLD.")
    c.setFillColor(PAPER_SOFT)
    paragraph(c, "Six years of Abu Dhabi experience supporting complex government and enterprise communication.", panel_x + 18, H - 165, 145, size=8.4, leading=11, color=PAPER_SOFT)

    impact_items = [
        ("PUBLIC SECTOR", "ADNOC, Ministry of Education, ADSSC, Tadweer, Environment Agency"),
        ("SECTORS", "Cybersecurity, finance, consultancy, real estate, hospitality, food, fashion, technology"),
        ("DELIVERY", "Campaigns, identity systems, websites, interfaces, films, photography, animation, print"),
        ("WORKING STYLE", "Strategy-led, collaborative, practical, and production-ready"),
    ]
    impact_y = H - 248
    for heading, detail in impact_items:
        c.setStrokeColor(HexColor("#6C3140"))
        c.line(panel_x + 18, impact_y + 16, W - 18, impact_y + 16)
        c.setFillColor(HexColor("#D57487"))
        c.setFont("Courier-Bold", 6.5)
        c.drawString(panel_x + 18, impact_y, heading)
        impact_y = paragraph(c, detail, panel_x + 18, impact_y - 17, 145, size=8.1, leading=10.5, color=PAPER)
        impact_y -= 28

    footer(c, 2, "Experience", dark=False)
    c.showPage()


def capability_card(c, x, y, width, height, index, title, items):
    c.setFillColor(PANEL)
    c.roundRect(x, y, width, height, 7, fill=1, stroke=0)
    c.setFillColor(MAROON)
    c.rect(x, y + height - 7, width, 7, fill=1, stroke=0)
    c.setFillColor(HexColor("#D57487"))
    c.setFont("Courier-Bold", 6.5)
    c.drawString(x + 16, y + height - 27, f"0{index} / CAPABILITY")
    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x + 16, y + height - 51, title)
    item_y = y + height - 77
    for item in items:
        c.setFillColor(RED)
        c.rect(x + 17, item_y - 2, 4, 4, fill=1, stroke=0)
        c.setFillColor(PAPER_SOFT)
        c.setFont("Helvetica", 8.2)
        c.drawString(x + 30, item_y - 2, item)
        item_y -= 21


def page_three(c):
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(MAROON)
    c.rect(0, 0, 12, H, fill=1, stroke=0)
    section_label(c, "02 / Expertise & Capability", 40, H - 48, dark=True)
    c.setFillColor(PAPER)
    c.setFont("Helvetica-Bold", 29)
    c.drawString(40, H - 88, "FOUR DISCIPLINES.")
    c.drawString(40, H - 122, "ONE COHERENT PRACTICE.")
    paragraph(c, "A multidisciplinary offer organized around outcomes: recognized brands, useful systems, engaging stories, and measurable growth.", 40, H - 151, 510, size=9.4, leading=13, color=PAPER_SOFT)

    cards = [
        (1, "BRAND & DESIGN", ["Creative direction", "Graphic design", "Brand identity systems", "Campaign design", "Print & production", "Social content systems"]),
        (2, "AI & GROWTH", ["AI creative production", "AI marketing automation", "Paid media strategy", "Content personalization", "Performance analysis", "Social media management"]),
        (3, "DIGITAL PRODUCT", ["Web design & development", "UI/UX product design", "Webflow implementation", "Responsive systems", "Conversion landing pages", "Digital platforms"]),
        (4, "MOTION & CONTENT", ["Motion design", "2D animation", "3D visualization", "AI video & storyboards", "Photography", "Videography & editing"]),
    ]
    positions = [(40, 430), (306, 430), (40, 226), (306, 226)]
    for card, (x, y) in zip(cards, positions):
        capability_card(c, x, y, 249, 184, *card)

    section_label(c, "Selected Toolkit", 40, 194, dark=True)
    tool_groups = [
        ("DESIGN", "Photoshop / Illustrator / InDesign / Lightroom / Acrobat"),
        ("MOTION", "After Effects / Premiere Pro / Media Encoder / Audition / Cinema 4D / Lumion"),
        ("AI", "ChatGPT / Claude AI / Midjourney / Leonardo AI / Runway / Kling AI / Sora"),
        ("DIGITAL", "Figma / Webflow / Visual Studio / VS Code / Claude Code / Codex"),
    ]
    tool_y = 166
    for heading, tools in tool_groups:
        c.setFillColor(HexColor("#D57487"))
        c.setFont("Courier-Bold", 6.5)
        c.drawString(40, tool_y, heading)
        c.setFillColor(PAPER_SOFT)
        c.setFont("Helvetica", 7.8)
        c.drawString(102, tool_y, tools)
        tool_y -= 27
    footer(c, 3, "Expertise", dark=True)
    c.showPage()


def page_four(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(MAROON)
    c.rect(0, 0, 12, H, fill=1, stroke=0)
    section_label(c, "03 / Delivery & Contact", 40, H - 48)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 29)
    c.drawString(40, H - 88, "CLEAR THINKING.")
    c.drawString(40, H - 122, "PRECISE MAKING.")
    paragraph(c, "Senior creative judgment applied through a disciplined process - from business objective to production-ready delivery.", 40, H - 151, 510, size=9.4, leading=13, color=MUTED)

    # Workflow
    section_label(c, "Four-stage workflow", 40, H - 202)
    workflow = [
        ("01", "DEFINE", "Align audience, business goal, message, scope, and success criteria."),
        ("02", "DESIGN", "Build the visual system, narrative, interface, campaign, or storyboard."),
        ("03", "PRODUCE", "Direct design, AI, motion, development, photography, and finishing."),
        ("04", "REFINE", "Review, test, optimize, and deliver clean production-ready assets."),
    ]
    workflow_positions = [(40, 514), (306, 514), (40, 390), (306, 390)]
    for (number, title, detail), (x, y) in zip(workflow, workflow_positions):
        c.setFillColor(WHITE)
        c.roundRect(x, y, 249, 104, 6, fill=1, stroke=0)
        c.setFillColor(MAROON)
        c.setFont("Courier-Bold", 7)
        c.drawString(x + 16, y + 78, number)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(x + 16, y + 56, title)
        paragraph(c, detail, x + 16, y + 35, 215, size=8.1, leading=10.5, color=MUTED)

    # Complete expertise index
    section_label(c, "Complete Expertise", 40, 352)
    expertise = [
        "Graphic Design & Marketing", "AI Creative & Marketing", "Motion Design", "2D Animation",
        "3D Animation & Visualization", "Web Design & Development", "UI/UX Product Design",
        "Professional Photography", "Videography & Production", "Photo & Video Editing",
        "Social Media Management", "Digital Platform Builder", "Brand Identity & Guidelines", "AI Video & Storyboards",
    ]
    for index, item in enumerate(expertise):
        col = index // 7
        row = index % 7
        x = 40 + col * 266
        y = 326 - row * 27
        c.setFillColor(RED)
        c.setFont("Courier-Bold", 6.4)
        c.drawString(x, y, f"{index + 1:02d}")
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 8.3)
        c.drawString(x + 32, y, item)
        c.setStrokeColor(LINE)
        c.line(x, y - 10, x + 239, y - 10)

    # Contact block
    c.setFillColor(MAROON_DARK)
    c.roundRect(40, 46, W - 80, 92, 6, fill=1, stroke=0)
    section_label(c, "Available for select projects / Dubai & worldwide", 58, 118, dark=True)
    contact_link(c, "Email", "alvinjampazar1983@gmail.com", "mailto:alvinjampazar1983@gmail.com", 58, 92, 220)
    contact_link(c, "Phone", "+971 52 223 5776", "tel:+971522235776", 58, 67, 220)
    contact_link(c, "Services", "alvinjampazar.com", "https://www.alvinjampazar.com", 307, 92, 230)
    contact_link(c, "Portfolio", "alcon-online.site", "https://www.alcon-online.site", 307, 67, 230)
    footer(c, 4, "Delivery & Contact", dark=False)
    c.showPage()


def build(output_path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(output_path), pagesize=A4, pageCompression=1)
    c.setTitle("Alvin Jampazar - Professional CV")
    c.setAuthor("Alvin Jampazar")
    c.setSubject("Senior Graphic Designer, Marketing Manager, and AI Specialist")
    c.setKeywords("Graphic Design, AI Specialist, Marketing Manager, Motion Design, Web Design, Dubai")
    page_one(c)
    page_two(c)
    page_three(c)
    page_four(c)
    c.save()


if __name__ == "__main__":
    build(OUTPUT)
    PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC.write_bytes(OUTPUT.read_bytes())
    print(OUTPUT)
    print(PUBLIC)
