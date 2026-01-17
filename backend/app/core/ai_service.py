import requests
from app.core.config import settings  # 👈 This was missing!

def generate_image_caption(image_bytes):
    # Get the URL from the .env file
    colab_url = settings.COLAB_AI_URL

    # Safety Check: Did you update the .env file?
    if not colab_url or "placeholder" in colab_url:
        print("❌ ERROR: Please paste the active Ngrok URL into your backend/.env file!")
        print("   Example: COLAB_AI_URL=https://1234-56.ngrok-free.app/analyze")
        return "Item image uploaded (Config Error)"

    try:
        print(f"    👉 Sending image to Cloud GPU: {colab_url}...")
        
        # Prepare the file upload
        files = {'file': ('image.jpg', image_bytes, 'image/jpeg')}
        
        # Send POST request
        response = requests.post(colab_url, files=files, timeout=30) 

        if response.status_code == 200:
            result = response.json()
            description = result.get('description', "Object detected")
            print(f"    ✅ AI Says: {description}")
            return description
        else:
            print(f"    ❌ Colab Error: {response.status_code} - {response.text}")
            return "Item image uploaded (AI Error)"

    except Exception as e:
        print(f"    ❌ Connection Failed: {e}")
        return "Item image uploaded (Colab Offline)"