const normalCharacters =  ['.', 'c', 'L', 'l', 'u', 'n', 'e', 'a', 'h', 'b', 'A'];// Normal order
//inverse ['.', 'c', 'L', 'l', 'u', 'n', 'e', 'a', 'h', 'b', 'A'];
//norml: ['A', 'b', 'h', 'a', 'e', 'n', 'u', 'l', 'L', 'c', '.'];
const labText = 'Acheulean_Lab:';

const colorMap = {
  black: { r: 25, g: 25, b: 25 },
  white: { r: 255, g: 255, b: 255 },
  blue: { r: 20, g: 25, b: 255 }, // Perfect blue
  orange: { r: 255, g: 46, b: 26 },
  green: { r: 0, g: 239, b: 21 }
};

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

// Check if a color is within a threshold distance from blue
function isBlue(r, g, b) {
  const distanceToBlue = colorDistance(r, g, b, 1, 1, 255);
  const maxBlueDistance = 255 * 0.65; // 40% of full RGB range
  return distanceToBlue <= maxBlueDistance;
}

function pixelToChar(brightness, characterSet) {
  const range = 255 / (characterSet.length - 1);
  const index = Math.floor(brightness / range);
  return characterSet[index];
}

function isItalic() {
  return Math.random() < 0.2; // 20% chance to be italic
}

function imageToAscii(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const image = new Image();
    image.onload = function () {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const aspectRatio = image.width / image.height;

       // Determine the larger dimension and scale it to 100px while maintaining the aspect ratio
       const maxDimension = 80;
       let newWidth, newHeight;
 
       if (image.width > image.height) {
         newWidth = maxDimension;
         newHeight = Math.floor((image.height / image.width) * maxDimension);
       } else {
         newHeight = maxDimension;
         newWidth = Math.floor((image.width / image.height) * maxDimension);
       }
 
       canvas.width = newWidth;
       canvas.height = newHeight;


      canvas.width = newWidth;
      canvas.height = newHeight;

      context.drawImage(image, 0, 0, newWidth, newHeight);

      const imageData = context.getImageData(0, 0, newWidth, newHeight);
      const data = imageData.data;

      let asciiArt = '';
      const firstRow = [];
      const labTextLength = labText.length;

      // Step 1: Generate ASCII art with color mapping
      for (let y = 0; y < newHeight; y++) {
        let line = '';
        for (let x = 0; x < newWidth; x++) {
          const index = (y * newWidth + x) * 4;
          let red = data[index];
          let green = data[index + 1];
          let blue = data[index + 2];
          const alpha = data[index + 3];

          let brightness = (red + green + blue) / 3;

          if (alpha === 0) {
            brightness = 255; // Treat transparent areas as white
          } else {
            // Override color to blue if within the blue threshold
            if (isBlue(red, green, blue)) {
              red = 20;
              green = 25;
              blue = 255;
            }
          }

          const character = pixelToChar(brightness, normalCharacters);
          const italicStyle = isItalic() ? 'font-style:italic;' : '';

          // Create a color style based on the actual pixel color (or overridden blue)
          const asciiChar = `<span style="color:rgb(${red},${green},${blue}); ${italicStyle}">${character}</span>`;

          if (y === 0) firstRow.push(asciiChar); // Keep track of first row separately
          line += asciiChar;
        }
        asciiArt += line + '\n';
      }

      // Step 2: Inject Title
      const labTextSpans = labText
        .split('')
        .map(
          (char) => `<span class="lab-text">${char}</span>`
        )
        .join('');

      const firstRowTextStart = newWidth - labTextLength;
      firstRow.splice(firstRowTextStart, labTextLength, labTextSpans);
      asciiArt = firstRow.join('') + '\n' + asciiArt.split('\n').slice(1).join('\n');

      // Step 3: Inject the HTML content into the ASCII art container
      const asciiArtElement = document.getElementById('asciiArt');
      asciiArtElement.innerHTML = asciiArt; // Use innerHTML to apply color styles

      // Show the ASCII art container
      const asciiArtContainer = document.getElementById('asciiArtContainer');
      asciiArtContainer.style.display = 'flex';

      // Step 4: Update the scroller div height
const asciiArtHeight = asciiArtElement.offsetHeight + 60; // Get the new height of the ASCII art
const scrollerElement = document.getElementById('centerbox');
scrollerElement.style.height = asciiArtHeight + 'px'; // Set the height of the scroller to match the art

    };

    image.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

document.getElementById('imageInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const downloadbutton = document.getElementById('downloadPngButton');
  downloadbutton.style.display = 'block'; // Hide the container when the close button is clicked

  imageToAscii(file);
});

