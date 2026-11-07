"""
Diwali Asset Generator using Python Pillow
Generates:
1. assets/diwali_greeting_banner.webp (1672x941)
2. assets/diwali_diya_icon.webp (1254x1254)
3. assets/diwali_run_icon.webp (1254x1254)
4. assets/diwali_promo_poster.webp (1080x1440)
"""
import os
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

random.seed(42)

ASSETS_DIR = r"c:\Users\rsubh\Downloads\video ai\SW AJ Restaurant & Cafe\assets"
os.makedirs(ASSETS_DIR, exist_ok=True)

def get_font(size, bold=False):
    # Try system fonts
    font_paths = [
        "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf",
        "C:\\Windows\\Fonts\\arialbd.ttf" if bold else "C:\\Windows\\Fonts\\arial.ttf",
        "C:\\Windows\\Fonts\\georgiab.ttf" if bold else "C:\\Windows\\Fonts\\georgia.ttf",
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

def draw_radial_gradient(draw, width, height, center_x, center_y, max_r, inner_color, outer_color):
    steps = 40
    for i in range(steps, 0, -1):
        r = (i / steps) * max_r
        t = i / steps
        # interpolate
        r_c = int(inner_color[0] * (1 - t) + outer_color[0] * t)
        g_c = int(inner_color[1] * (1 - t) + outer_color[1] * t)
        b_c = int(inner_color[2] * (1 - t) + outer_color[2] * t)
        a_c = int(inner_color[3] * (1 - t) + outer_color[3] * t) if len(inner_color) > 3 else 255
        draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], fill=(r_c, g_c, b_c, a_c))

def draw_ornate_diya(draw, cx, cy, scale=1.0):
    # Base diya body
    # Base bowl width ~ 200 * scale, height ~ 80 * scale
    w = 120 * scale
    h = 50 * scale
    
    # Outer glow
    for g_r in range(int(100 * scale), int(20 * scale), -int(10 * scale)):
        alpha = int(40 * (1 - (g_r / (100 * scale))))
        draw.ellipse([cx - g_r*1.5, cy - g_r*0.6, cx + g_r*1.5, cy + g_r*0.6], fill=(255, 170, 0, alpha))
        
    # Diya Clay body (deep terracotta to golden bronze)
    bowl_poly = [
        (cx - w, cy - h*0.2),
        (cx - w*0.85, cy + h),
        (cx - w*0.4, cy + h*1.4),
        (cx, cy + h*1.5),
        (cx + w*0.4, cy + h*1.4),
        (cx + w*0.85, cy + h),
        (cx + w, cy - h*0.2),
        (cx + w*0.6, cy + h*0.2),
        (cx, cy + h*0.35),
        (cx - w*0.6, cy + h*0.2),
    ]
    draw.polygon(bowl_poly, fill=(190, 75, 15, 255), outline=(255, 205, 75, 255))
    
    # Inner rim highlight
    rim_poly = [
        (cx - w*0.9, cy - h*0.2),
        (cx, cy + h*0.3),
        (cx + w*0.9, cy - h*0.2),
        (cx, cy - h*0.4),
    ]
    draw.polygon(rim_poly, fill=(240, 140, 30, 255), outline=(255, 220, 110, 255))
    
    # Diya Rim Carvings (dots)
    for i in range(-7, 8):
        dx = cx + (i * w * 0.11)
        dy = cy + (h * 0.15) - (abs(i) * h * 0.05)
        draw.ellipse([dx - 3*scale, dy - 3*scale, dx + 3*scale, dy + 3*scale], fill=(255, 235, 150, 255))
        
    # Diya Flame
    flame_cx = cx
    flame_base_y = cy - h*0.25
    flame_h = 95 * scale
    flame_w = 32 * scale
    
    # Flame outer aura
    for f_r in range(int(flame_h * 1.3), int(flame_h * 0.3), -int(12 * scale)):
        draw.ellipse([flame_cx - f_r*0.7, flame_base_y - f_r - flame_h*0.2, flame_cx + f_r*0.7, flame_base_y + f_r*0.3], fill=(255, 140, 0, 15))

    # Flame outer body (Golden yellow to orange teardrop)
    flame_poly = [
        (flame_cx, flame_base_y - flame_h),
        (flame_cx + flame_w*0.8, flame_base_y - flame_h*0.6),
        (flame_cx + flame_w, flame_base_y - flame_h*0.3),
        (flame_cx + flame_w*0.6, flame_base_y),
        (flame_cx, flame_base_y + flame_h*0.1),
        (flame_cx - flame_w*0.6, flame_base_y),
        (flame_cx - flame_w, flame_base_y - flame_h*0.3),
        (flame_cx - flame_w*0.8, flame_base_y - flame_h*0.6),
    ]
    draw.polygon(flame_poly, fill=(255, 180, 20, 240))
    
    # Inner Flame (Brilliant white-yellow core)
    inner_h = flame_h * 0.65
    inner_w = flame_w * 0.5
    inner_poly = [
        (flame_cx, flame_base_y - inner_h),
        (flame_cx + inner_w, flame_base_y - inner_h*0.4),
        (flame_cx + inner_w*0.5, flame_base_y),
        (flame_cx, flame_base_y + inner_h*0.05),
        (flame_cx - inner_w*0.5, flame_base_y),
        (flame_cx - inner_w, flame_base_y - inner_h*0.4),
    ]
    draw.polygon(inner_poly, fill=(255, 255, 220, 255))
    
    # Blue flame root
    draw.ellipse([flame_cx - 8*scale, flame_base_y - 12*scale, flame_cx + 8*scale, flame_base_y + 4*scale], fill=(80, 140, 255, 200))


def draw_firework_burst(draw, cx, cy, radius, color, particle_count=35):
    for i in range(particle_count):
        angle = (2 * math.pi / particle_count) * i + random.uniform(-0.1, 0.1)
        dist = random.uniform(radius * 0.3, radius)
        px = cx + math.cos(angle) * dist
        py = cy + math.sin(angle) * dist
        p_size = random.uniform(2, 5)
        # Spark line
        draw.line([(cx + math.cos(angle)*(dist*0.7), cy + math.sin(angle)*(dist*0.7)), (px, py)], fill=color + (140,), width=max(1, int(p_size/2)))
        draw.ellipse([px - p_size, py - p_size, px + p_size, py + p_size], fill=color + (230,))
        # Sparkling dot at tip
        draw.ellipse([px - 1, py - 1, px + 1, py + 1], fill=(255, 255, 255, 255))


def draw_rangoli_mandala(draw, cx, cy, radius, color=(255, 215, 0, 70)):
    # Draw ornate geometric rings and petals
    for r in [radius * 0.3, radius * 0.6, radius * 0.9, radius]:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=2)
    # Radial spokes
    petals = 16
    for i in range(petals):
        angle = (2 * math.pi / petals) * i
        x1 = cx + math.cos(angle) * (radius * 0.25)
        y1 = cy + math.sin(angle) * (radius * 0.25)
        x2 = cx + math.cos(angle) * radius
        y2 = cy + math.sin(angle) * radius
        draw.line([(x1, y1), (x2, y2)], fill=color, width=1)
        # Small circle at vertex
        draw.ellipse([x2 - 4, y2 - 4, x2 + 4, y2 + 4], fill=(255, 230, 100, 160))


def generate_diwali_banner():
    width, height = 1672, 941
    # Deep royal festival night background: dark burgundy to navy to golden glow
    img = Image.new("RGBA", (width, height), (15, 6, 28, 255))
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Ambient golden-purple radial background glow
    for r in range(width, 200, -50):
        alpha = int(45 * (1 - (r / width)))
        draw.ellipse([width//2 - r, height//2 - r*0.7, width//2 + r, height//2 + r*0.7], fill=(70, 15, 75, alpha))
    for r in range(800, 100, -30):
        alpha = int(35 * (1 - (r / 800)))
        draw.ellipse([width//2 - r, height - r*0.8, width//2 + r, height + r*0.8], fill=(160, 60, 10, alpha))

    # Rangoli Mandalas in background
    draw_rangoli_mandala(draw, width // 2, height // 2 + 30, radius=380, color=(255, 200, 50, 45))
    draw_rangoli_mandala(draw, 180, 220, radius=180, color=(255, 170, 40, 35))
    draw_rangoli_mandala(draw, width - 180, 220, radius=180, color=(255, 170, 40, 35))

    # Fireworks in night sky
    fw_colors = [(255, 80, 80), (255, 215, 0), (80, 220, 255), (255, 130, 220), (120, 255, 120), (255, 165, 0)]
    fireworks = [
        (260, 200, 130, fw_colors[1]),
        (480, 150, 90, fw_colors[0]),
        (width - 280, 180, 140, fw_colors[2]),
        (width - 490, 140, 95, fw_colors[3]),
        (width // 2, 130, 80, fw_colors[4]),
        (130, 420, 75, fw_colors[5]),
        (width - 120, 430, 85, fw_colors[0]),
    ]
    for fx, fy, fr, fc in fireworks:
        draw_firework_burst(draw, fx, fy, fr, fc, particle_count=32)

    # Golden Sparkles / bokeh dots across sky
    for _ in range(160):
        sx = random.randint(30, width - 30)
        sy = random.randint(30, height - 200)
        s_rad = random.uniform(1.5, 4.0)
        s_alpha = random.randint(90, 230)
        draw.ellipse([sx - s_rad, sy - s_rad, sx + s_rad, sy + s_rad], fill=(255, 235, 160, s_alpha))

    # Hanging Festive Toran / Marigold Garlands with Diyas at Top
    garland_y = 35
    for x in range(40, width, 55):
        # Marigold orange/yellow flower
        draw.ellipse([x - 14, garland_y - 12, x + 14, garland_y + 12], fill=(255, 140, 0, 220))
        draw.ellipse([x - 9, garland_y - 8, x + 9, garland_y + 8], fill=(255, 215, 0, 240))
        draw.ellipse([x - 3, garland_y - 3, x + 3, garland_y + 3], fill=(180, 40, 10, 255))
    # Hanging Diya strings
    for hang_x in [160, 380, width - 380, width - 160]:
        draw.line([(hang_x, 35), (hang_x, 140)], fill=(255, 215, 80, 200), width=2)
        draw_ornate_diya(draw, hang_x, 155, scale=0.35)

    # Central Grand Ornate Diya on bottom
    draw_ornate_diya(draw, width // 2, height - 150, scale=1.45)

    # Flanking Diyas
    draw_ornate_diya(draw, width // 2 - 280, height - 130, scale=0.95)
    draw_ornate_diya(draw, width // 2 + 280, height - 130, scale=0.95)
    draw_ornate_diya(draw, width // 2 - 500, height - 110, scale=0.7)
    draw_ornate_diya(draw, width // 2 + 500, height - 110, scale=0.7)

    # Composite overlay
    img = Image.alpha_composite(img, overlay)
    draw_text = ImageDraw.Draw(img)

    # Texts
    font_large = get_font(74, bold=True)
    font_sub = get_font(38, bold=True)
    font_brand = get_font(46, bold=True)
    font_tag = get_font(26, bold=False)

    # Golden text with dark shadow for clarity
    def draw_shadowed_text(cx, y, text, font, fill_color, shadow_color=(0, 0, 0, 230), offset=3):
        bbox = font.getbbox(text)
        w = bbox[2] - bbox[0]
        x = cx - w // 2
        for ox, oy in [(-offset, 0), (offset, 0), (0, -offset), (0, offset), (offset, offset)]:
            draw_text.text((x + ox, y + oy), text, font=font, fill=shadow_color)
        draw_text.text((x, y), text, font=font, fill=fill_color)

    # Brand Title Header
    draw_shadowed_text(width // 2, 220, "AJ RESTAURANT & CAFE", font_brand, (255, 235, 160, 255), offset=4)
    draw_shadowed_text(width // 2, 285, "~ FESTIVAL OF LIGHTS CELEBRATION ~", font_tag, (255, 200, 100, 255), offset=2)

    # Happy Diwali Main Headline
    draw_shadowed_text(width // 2, 335, "HAPPY DIWALI", font_large, (255, 215, 0, 255), offset=5)
    draw_shadowed_text(width // 2, 420, "শুভ দীপাবলি ও কালীপূজার আন্তরিক প্রীতি ও শুভেচ্ছা", font_sub, (255, 245, 220, 255), offset=3)

    # Offer Badge / Subtitle
    offer_text = "✨ Enjoy Festive Royal Delicacies, Special Combos & Authentic Flavors! ✨"
    draw_shadowed_text(width // 2, 485, offer_text, font_tag, (255, 220, 130, 240), offset=2)

    banner_path = os.path.join(ASSETS_DIR, "diwali_greeting_banner.webp")
    img.save(banner_path, "WEBP", quality=90)
    print("Saved:", banner_path)


def generate_diwali_icons():
    # 1254 x 1254 Diya Icon & Run Icon with alpha background
    size = 1254
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    cx, cy = size // 2, size // 2

    # Glowing aura
    for r in range(540, 180, -25):
        alpha = int(55 * (1 - (r / 540)))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 140, 20, alpha))

    # Ornate Golden Ring
    ring_r = 450
    draw.ellipse([cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r], outline=(255, 215, 0, 220), width=16)
    draw.ellipse([cx - ring_r + 20, cy - ring_r + 20, cx + ring_r - 20, cy + ring_r - 20], outline=(255, 170, 0, 150), width=6)

    # Sparkle beads on ring
    for i in range(24):
        ang = (2 * math.pi / 24) * i
        bx = cx + math.cos(ang) * ring_r
        by = cy + math.sin(ang) * ring_r
        draw.ellipse([bx - 12, by - 12, bx + 12, by + 12], fill=(255, 245, 160, 255), outline=(220, 120, 0, 255), width=3)

    # Rangoli Pattern inside
    draw_rangoli_mandala(draw, cx, cy + 40, radius=290, color=(255, 215, 0, 90))

    # Floating sparks
    for _ in range(60):
        angle = random.uniform(0, 2 * math.pi)
        dist = random.uniform(200, 520)
        px = cx + math.cos(angle) * dist
        py = cy + math.sin(angle) * dist
        rad = random.uniform(3, 8)
        draw.ellipse([px - rad, py - rad, px + rad, py + rad], fill=(255, 230, 100, random.randint(140, 255)))

    # Large Center Ornate Diya
    draw_ornate_diya(draw, cx, cy + 90, scale=3.2)

    img = Image.alpha_composite(img, overlay)

    # Save as diwali_diya_icon.webp
    icon_path = os.path.join(ASSETS_DIR, "diwali_diya_icon.webp")
    img.save(icon_path, "WEBP", quality=92)
    print("Saved:", icon_path)

    # Run icon is also saved (1254x1254)
    run_icon_path = os.path.join(ASSETS_DIR, "diwali_run_icon.webp")
    img.save(run_icon_path, "WEBP", quality=92)
    print("Saved:", run_icon_path)


def generate_diwali_promo_poster():
    # 1080 x 1440 Portrait Poster for Modal Popup
    width, height = 1080, 1440
    img = Image.new("RGBA", (width, height), (16, 8, 30, 255))
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Gradient border frame
    for b in range(16):
        draw.rectangle([b, b, width - b - 1, height - b - 1], outline=(255, 185 - b*6, 30, 255 - b*12), width=2)

    # Corner Mandalas
    for cor_x, cor_y in [(120, 120), (width - 120, 120), (120, height - 120), (width - 120, height - 120)]:
        draw_rangoli_mandala(draw, cor_x, cor_y, radius=100, color=(255, 200, 50, 70))

    # Background ambient glows
    draw_radial_gradient(draw, width, height, width//2, 380, 500, (140, 30, 50, 90), (0, 0, 0, 0))
    draw_radial_gradient(draw, width, height, width//2, 1150, 450, (180, 80, 10, 80), (0, 0, 0, 0))

    # Fireworks
    draw_firework_burst(draw, 180, 240, 110, (255, 100, 100), 28)
    draw_firework_burst(draw, width - 180, 240, 110, (255, 215, 0), 28)
    draw_firework_burst(draw, width // 2, 160, 90, (80, 220, 255), 24)

    # Stars/Sparks
    for _ in range(120):
        sx = random.randint(40, width - 40)
        sy = random.randint(40, height - 40)
        s_r = random.uniform(1.5, 3.5)
        draw.ellipse([sx - s_r, sy - s_r, sx + s_r, sy + s_r], fill=(255, 240, 180, random.randint(80, 220)))

    # Central Diya in poster
    draw_ornate_diya(draw, width // 2, 770, scale=1.9)
    # Side Diyas
    draw_ornate_diya(draw, 220, 800, scale=1.1)
    draw_ornate_diya(draw, width - 220, 800, scale=1.1)

    # Composite overlay
    img = Image.alpha_composite(img, overlay)
    draw_text = ImageDraw.Draw(img)

    f_title = get_font(52, bold=True)
    f_huge = get_font(84, bold=True)
    f_sub = get_font(40, bold=True)
    f_bengali = get_font(42, bold=True)
    f_body = get_font(32, bold=True)
    f_call = get_font(38, bold=True)

    def draw_centered_text(y, text, font, fill_color, shadow_color=(0, 0, 0, 230), offset=3):
        bbox = font.getbbox(text)
        w = bbox[2] - bbox[0]
        x = (width - w) // 2
        for ox, oy in [(-offset, 0), (offset, 0), (0, -offset), (0, offset), (offset, offset)]:
            draw_text.text((x + ox, y + oy), text, font=font, fill=shadow_color)
        draw_text.text((x, y), text, font=font, fill=fill_color)

    # Headers
    draw_centered_text(130, "AJ RESTAURANT & CAFE", f_title, (255, 230, 150, 255), offset=4)
    draw_centered_text(200, "🪔 DIWALI DHAMAKA CELEBRATION 🪔", get_font(28, bold=True), (255, 180, 50, 255), offset=2)
    draw_centered_text(260, "HAPPY DIWALI", f_huge, (255, 215, 0, 255), offset=5)
    draw_centered_text(360, "শুভ দীপাবলি ও কালীপূজা", f_bengali, (255, 245, 220, 255), offset=3)

    # Offer Banner Box
    box_top, box_bottom = 440, 620
    box_left, box_right = 100, width - 100
    draw_text.rounded_rectangle([box_left, box_top, box_right, box_bottom], radius=20, fill=(45, 12, 60, 220), outline=(255, 215, 0, 255), width=3)
    draw_centered_text(465, "🎉 SPECIAL FESTIVE OFFERS 🎉", f_sub, (255, 215, 0, 255), offset=2)
    draw_centered_text(520, "• 10% OFF on Special Thali & Combos •", f_body, (255, 255, 255, 255), offset=2)
    draw_centered_text(565, "• Free Special Sweet with Festive Orders! •", f_body, (255, 235, 140, 255), offset=2)

    # Menu Highlights Box
    m_top, m_bottom = 900, 1140
    draw_text.rounded_rectangle([box_left, m_top, box_right, m_bottom], radius=20, fill=(30, 10, 45, 220), outline=(255, 170, 0, 200), width=2)
    draw_centered_text(925, "✨ FESTIVE MENU HIGHLIGHTS ✨", f_sub, (255, 215, 80, 255), offset=2)
    draw_centered_text(980, "Chicken / Mutton / Fish / Veg Thali", f_body, (255, 255, 255, 255), offset=2)
    draw_centered_text(1025, "Special Dahi Lassi (Sweet) & Paneer Pakoda", f_body, (255, 240, 180, 255), offset=2)
    draw_centered_text(1070, "Bhuna Khichuri, Butter Dal Fry & Hot Teas", f_body, (255, 255, 255, 255), offset=2)

    # Order Call To Action
    draw_text.rounded_rectangle([140, 1180, width - 140, 1280], radius=30, fill=(210, 40, 30, 255), outline=(255, 215, 0, 255), width=3)
    draw_centered_text(1205, "📞 Call: 6295982636 / WhatsApp Order", f_call, (255, 255, 255, 255), offset=3)

    draw_centered_text(1310, "Warmest Festive Wishes to You & Your Family!", get_font(26, bold=False), (255, 220, 150, 240), offset=1)

    poster_path = os.path.join(ASSETS_DIR, "diwali_promo_poster.webp")
    # Also save as promo_poster.webp so any legacy references work seamlessly!
    legacy_poster_path = os.path.join(ASSETS_DIR, "promo_poster.webp")
    img.save(poster_path, "WEBP", quality=90)
    img.save(legacy_poster_path, "WEBP", quality=90)
    print("Saved:", poster_path)
    print("Saved:", legacy_poster_path)

if __name__ == "__main__":
    generate_diwali_banner()
    generate_diwali_icons()
    generate_diwali_promo_poster()
    print("All Diwali assets successfully generated!")

