import os
from PIL import Image

MAX_SIZE = 700 * 1024  # 700 KB
IMG_DIR = r"c:\AI Premium\Volta sports website\img"

def compress_image(filepath):
    try:
        size = os.path.getsize(filepath)
        if size <= MAX_SIZE:
            return
            
        print(f"Compressing {os.path.basename(filepath)} (Original: {size / 1024 / 1024:.2f} MB)")
        
        max_dim = 1600
        quality = 85
        
        while True:
            with Image.open(filepath) as img:
                file_format = img.format if img.format else filepath.split('.')[-1].upper()
                if file_format == 'JPG': file_format = 'JPEG'
                
                # Thumbnail preserves aspect ratio and modifies in-place
                working_img = img.copy()
                working_img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
                
                save_kwargs = {'optimize': True}
                if file_format == 'JPEG':
                    save_kwargs['quality'] = quality
                    if working_img.mode in ('RGBA', 'P'):
                        working_img = working_img.convert('RGB')
                
                # We need to save to a temp file, check size, if good we replace original.
                # If we overwrite directly, we lose original quality for further testing (though we are shrinking).
                # Overwriting directly is fine since we are going step by step down.
                temp_path = filepath + ".tmp"
                working_img.save(temp_path, format=file_format, **save_kwargs)
            
            new_size = os.path.getsize(temp_path)
            
            if new_size <= MAX_SIZE or max_dim <= 400:
                # We found a good size or hit the lower limit
                os.replace(temp_path, filepath)
                print(f"  -> New size: {new_size / 1024:.2f} KB (Dim: {max_dim}, Qual: {quality})")
                break
            else:
                # Need to compress more
                os.remove(temp_path)
                
                if file_format == 'JPEG':
                    if quality > 60:
                        quality -= 10
                    else:
                        max_dim = int(max_dim * 0.8)
                else:
                    max_dim = int(max_dim * 0.8)

    except Exception as e:
        print(f"Error compressing {filepath}: {e}")

if __name__ == "__main__":
    count = 0
    for filename in os.listdir(IMG_DIR):
        filepath = os.path.join(IMG_DIR, filename)
        if os.path.isfile(filepath) and filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            size = os.path.getsize(filepath)
            if size > MAX_SIZE:
                compress_image(filepath)
                count += 1
    
    if count == 0:
        print("No images found that are larger than 700 KB.")
    else:
        print("Compression complete.")
