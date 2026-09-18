from PIL import Image, ImageDraw, ImageFont


width, height = 200, 200
img = Image.new('RGB', (width, height), color='#EF0107')
draw = ImageDraw.Draw(img)


circle_radius = 60
circle_x = width // 2
circle_y = height // 2
draw.ellipse([circle_x - circle_radius, circle_y - circle_radius, 
              circle_x + circle_radius, circle_y + circle_radius], 
             fill='white', outline='gold', width=3)


try:
    font = ImageFont.truetype('C:\\Windows\\Fonts\\arial.ttf', 80)
except:
    font = ImageFont.load_default()

text = 'A'
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
text_x = (width - text_width) // 2
text_y = (height - text_height) // 2 - 5

draw.text((text_x, text_y), text, fill='#EF0107', font=font)


output_path = r'assets/img/logo-placeholder.png'
img.save(output_path)
print(f'Logo created: {output_path}')
