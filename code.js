// Array of sample headlines to display as circular glyphs
const headlines = [
  "Robert Vaughn",
  "Language",
  "Robert Lawson Vaughn",
  "Overland Artifacts",
  "Technology",
  "Technologies",
  "Pickles",
  "Free burgers",
  "Helloooooooo",
  "AI Breakthroughs in Language Processing",
  "City Council Approves New Transit Line",
  "Tech Sector Sees Record Gains",
  "Unexpected Snowstorm Hits Midwest",
  "The Technology Sector is Experiencing Growth Today",
  "NASA launches mission to the moon",
  "Stock Market Takes a Steep Downward Turn",
  "Bitcoin looks to be crashing due to new economic policy",
  "AiWerkz introduces a cool new LANGUAGE But it is actually roller characters that you can try yourself",
  "Intel is a tech company"
];

// Color palette for the glyphs - cycles through these colors
const colors = ["lime", "deepskyblue", "magenta", "yellow", "cyan", "orange"];

// Maximum characters allowed per circular glyph
const MAX_CHARS = 12;

// Angular spacing between characters in degrees
const FIXED_ANGLE_STEP = 30;

/**
 * Groups words into chunks that fit within MAX_CHARS limit
 * Combines short adjacent words when possible, otherwise splits long words
 * @param {Array} words - Array of words to group
 * @returns {Array} - Array of word groups (strings)
 */
function groupWords(words) {
  const groups = [];
  for (let i = 0; i < words.length; i++) {
    const current = words[i];
    const next = words[i + 1] || '';
    const combo = `${current} ${next}`.trim();
    
    // If current and next word fit together, combine them
    if ((current.length + next.length) <= MAX_CHARS && next.length > 0) {
      groups.push(combo);
      i++; // Skip the next word since we combined it
    } else if (current.length <= MAX_CHARS) {
      groups.push(current);
    } else {
      // Truncate long words that exceed MAX_CHARS
      groups.push(current.slice(0, MAX_CHARS));
    }
  }
  return groups;
}

/**
 * Creates a circular glyph from a word or word group
 * Letters are arranged in a circle with optional inner decoration for short words
 * @param {string} wordGroup - The text to display in circular format
 * @param {string} color - CSS color for the text
 * @returns {HTMLElement} - The complete glyph container element
 */
function createGlyph(wordGroup, color) {
  const container = document.createElement("div");
  container.className = "circle-container";

  // Split multiple words and join with a down-pointing triangle separator
  const words = wordGroup.split(" ");
  const joined = words.join('DOWN'); // Using DOWN as separator placeholder
  
  // Get individual characters up to the max limit
  const letters = joined.split('').slice(0, MAX_CHARS);
  const radius = 14; // Distance from center for outer ring of letters

  // Create outer ring of letters arranged in a circle
  for (let i = 0; i < letters.length; i++) {
    // Calculate position angle (starting from top, going clockwise)
    const angle = -90 + FIXED_ANGLE_STEP * i;
    
    // Convert polar coordinates to cartesian (x, y)
    const x = radius * Math.cos(angle * Math.PI / 180) + 50;
    const y = radius * Math.sin(angle * Math.PI / 180) + 50;

    // Create letter element
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = letters[i];
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    // Rotate letter to be tangent to the circle
    span.style.transform = `rotate(${angle + 90}deg)`;
    span.style.color = color;

    container.appendChild(span);
  }

  // Add inner ring of pipe characters for short words (decorative)
  if (letters.length <= 7) {
    const innerDots = "|||||".split('');
    const innerRadius = 7; // Smaller radius for inner ring
    const innerStep = 360 / innerDots.length; // Even spacing

    for (let i = 0; i < innerDots.length; i++) {
      const angle = -90 + innerStep * i;
      const x = innerRadius * Math.cos(angle * Math.PI / 180) + 50;
      const y = innerRadius * Math.sin(angle * Math.PI / 180) + 50;

      const dot = document.createElement("span");
      dot.className = "letter";
      dot.textContent = innerDots[i];
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.transform = `rotate(${angle + 90}deg)`;
      dot.style.color = "white";
      dot.style.opacity = "0.7";

      container.appendChild(dot);
    }
  }

  return container;
}

// Main execution: Process all headlines and create glyphs
const column = document.getElementById("glyphColumn");

headlines.forEach((headline, index) => {
  // Cycle through colors based on headline index
  const color = colors[index % colors.length];
  
  // Split headline into words and group them appropriately
  const words = groupWords(headline.split(" "));
  
  // Create a glyph for each word group
  words.forEach(word => {
    const glyph = createGlyph(word, color);
    column.appendChild(glyph);
  });
});
