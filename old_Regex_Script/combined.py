import os
import glob
from PIL import Image
from PIL.PngImagePlugin import PngInfo
import base64
import json
import re


"""# Define the function to format text with proper spacing
def format_text_with_proper_spacing(text):
    return "Hi"""

def format_string_custom_v4(text):
    # Split the text into lines
    lines = text.split('\n')

    # Markers to be removed and then reinserted
    markers = ['<START>', '{{user}}:', '{{char}}:']

    # Keep track of the markers and their positions
    marker_positions = []

    # Remove markers and store their positions
    for i, line in enumerate(lines):
        for marker in markers:
            if line.startswith(marker):
                marker_positions.append((i, marker))
                lines[i] = line.replace(marker, '', 1).strip()
                break

    # Perform the normal string formatting
    def format_line(line):
        line = line.replace('\"', '~')
        parts = re.split(r'~(.*?)~', line)
        formatted_parts = []
        for i, part in enumerate(parts):
            if i % 2 == 0:  # Action
                if part.strip():
                    formatted_parts.append(f'*{part.strip()}*')
            else:  # Speech
                formatted_parts.append(part)
        return ' '.join(formatted_parts).strip()

    formatted_lines = [format_line(line) for line in lines]

    # Reinsert the markers
    for position, marker in marker_positions:
        formatted_lines[position] = marker + ' ' + formatted_lines[position]

    return '\n'.join(formatted_lines)

# Applying the new custom function to the provided text


def format_string_v4(text):
    # Split the text into paragraphs
    paragraphs = text.split('\n')

    # Process each paragraph
    formatted_paragraphs = []
    for paragraph in paragraphs:
        # Skip empty paragraphs
        if not paragraph.strip():
            formatted_paragraphs.append('')
            continue

        # Replace escaped quotes with a unique marker
        paragraph = paragraph.replace('\"', '~')

        # Split the paragraph into parts: speech and actions
        parts = re.split(r'~(.*?)~', paragraph)

        # Check if there is speech in the paragraph
        has_speech = any(i % 2 != 0 for i in range(len(parts)))

        # Iterate over the parts to reformat
        formatted_parts = []
        for i, part in enumerate(parts):
            if i % 2 == 0:
                # Action parts (even indices) - encapsulate with * if there is speech
                if part.strip():  # Only add if the part is not empty
                    formatted_parts.append(f'*{part.strip()}*' if has_speech else part.strip())
            else:
                # Speech parts (odd indices) - keep as is
                formatted_parts.append(part)

        # Join the parts back into a single string
        formatted_paragraph = ' '.join(formatted_parts).strip()

        # Encapsulate entire paragraph with * if there is no speech
        if not has_speech:
            formatted_paragraph = f'*{formatted_paragraph}*'

        formatted_paragraphs.append(formatted_paragraph)

    # Join the paragraphs back into a single string
    return '\n'.join(formatted_paragraphs)


def format_json_story(json_string):
    # Parse the JSON string
    data = json.loads(json_string)

    # Apply format_string_v4 to specific keys

    if 'first_mes' in data:
            data['first_mes'] = format_string_v4(data['first_mes'])
    if 'mes_example' in data:
        data['mes_example'] = format_string_custom_v4(data['mes_example'])


    if 'data' in data:
        if 'first_mes' in data['data']:
            data['data']['first_mes'] = format_string_v4(data['data']['first_mes'])
        if 'mes_example' in data['data']:
            data['data']['mes_example'] = format_string_custom_v4(data['data']['mes_example'])

    # Convert back to JSON string
    return json.dumps(data, indent=4)


# Define a function to process PNG metadata
def process_png_metadata(image_path):
    # Open the image and read existing metadata
    with Image.open(image_path) as image:
        existing_info = image.info

        image.load()

        # Check if 'chara' metadata field exists and process it
        if "chara" in existing_info:
            # Decode the 'chara' metadata field from Base64
            character_crypted = existing_info["chara"]
            character_decrypted = base64.b64decode(character_crypted).decode("utf-8")

            #print(character_decrypted)
            # Format the decoded text based on the provided scenarios
            character_formatted = format_json_story(character_decrypted)

            # Re-encode the modified text back to Base64
            character_crypted = base64.b64encode(character_formatted.encode("utf-8")).decode("utf-8")

            # Create a new PngInfo object to store new metadata
            metadata = PngInfo()

            # Copy all existing metadata except 'chara'
            for key, value in existing_info.items():
                if key != "chara":
                    metadata.add_text(key, value)

            # Update the 'chara' field with the modified message
            metadata.add_text("chara", character_crypted)

            # Define the save path in a new folder
            new_folder = 'updated_images'
            if not os.path.exists(new_folder):
                os.makedirs(new_folder)
            save_path = os.path.join(new_folder, os.path.basename(image_path))

            # Save the image with updated metadata
            image.save(save_path, pnginfo=metadata)
            print(f"Updated metadata for {image_path} and saved to {save_path}")
        else:
            print(f"The 'chara' metadata field does not exist in {image_path}.")

# Example usage: process all PNG images in the current directory
for png_image in glob.glob('*.png'):
    process_png_metadata(png_image)

# The actual function calls and file operations are commented out to prevent accidental execution.
# You can uncomment and run the process on your actual PNG files.
