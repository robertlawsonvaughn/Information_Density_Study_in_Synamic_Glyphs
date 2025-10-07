# Information_Density_Study_in_Synamic_Glyphs
Discussion and code on theories related to increasing information density of characters represented with custom glyphs.

# Glyph Headline Renderer
Visual system that encodes text headlines as stacked circular glyphs, each representing one or two words in a circular layout.  

## ✨ Overview
Each glyph is rendered as a circular ring of letters, producing a vertical stack of visualized headlines with a terminal-style aesthetic.

## 🧠 Key Features
- Circular word glyphs with outer and optional inner rings  
- Automatic grouping of adjacent short words  
- Triangle (`▼`) separator between words for readability  
- Neon-style color palette (lime, cyan, magenta, yellow, etc.)  
- Fully DOM-based — no external libraries  

## 💡 Example
See `/index.html` for a working demo. Headlines are hard-coded for now, but you can modify the `headlines` array in `glyphs.js` to try your own.

## 🧩 Future Ideas
- Animated rotation / glow effects  
- SVG export  
- Canvas rendering for performance  
- Tooltip on hover  

## 📄 License
MIT (see LICENSE file)
