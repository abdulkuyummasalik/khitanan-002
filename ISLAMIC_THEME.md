# Islamic Theme Design Documentation

## Overview

Folder 002 telah diupdate dengan **Tema Islamic** yang professional dan elegan dengan color palette hijau yang dominan.

---

## Color Palette

### Primary Colors
- **Deep Islamic Green** (#1b5e20) - Warna utama untuk headings dan accents
- **Medium Green** (#2e7d32) - Untuk hover states dan secondary elements
- **Light Green** (#4caf50) - Untuk backgrounds dan borders
- **Teal Green** (#00695c) - Warna sekunder untuk variasi

### Accent Colors
- **Islamic Gold** (#d4af37) - Untuk touches of elegance
- **Light Gold** (#f0e68c) - Untuk subtle highlights

### Backgrounds
- **Very Light Green** (#f1f8e9) - Main background color
- **White** (#ffffff) - Card backgrounds
- **Accent Light** (#c8e6c9) - Light green tint

---

## Typography System

### Fonts Used

1. **Crimson Text** (Serif)
   - Used for: Headings (h1-h6), titles, verse-like content
   - Style: Elegant, classical, perfect for Islamic design
   - Sizes: 28px-48px for headings

2. **Poppins** (Sans-serif)
   - Used for: Body text, labels, buttons
   - Style: Modern, clean, highly readable
   - Sizes: 12px-16px for body content

### Font Hierarchy
```
Headings:           Crimson Text 600-700 weight
Titles:             Crimson Text 600 weight
Body Text:          Poppins 400-500 weight
Labels/Tags:        Poppins 700 weight uppercase
```

---

## Islamic Decorations

### Top & Bottom Assets
Every card uses decorative elements from:
- **top.png** - Placed at top of cards
- **bottom.png** - Placed at bottom of cards

These create a cohesive Islamic aesthetic throughout the design.

### Implementation
```css
.floral.top {
    background-image: url('../assets/top.png');
}

.floral.bottom {
    background-image: url('../assets/bottom.png');
}
```

---

## Component Design

### Cards
- Border: 2px solid light green (#c8e6c9)
- Border Radius: 16px
- Background: White with subtle green gradient
- Shadows: Soft, professional shadow
- Hover: Lift effect + border color change

### Buttons
- Style: Solid green background
- Radius: 10px (not pill-shaped)
- Color: White text on green background
- Hover: Subtle lift with enhanced shadow

### Navigation
- Bottom Nav: Semi-transparent white with green accent
- Floating Sidebar: Green buttons with proper shadows
- Active State: Green background with white icons

### Event Items
- Style: Minimal with icon + content layout
- Icon Background: Subtle green tint
- Hover: Smooth translation with updated background

---

## Layout & Spacing

### Card Spacing
- Margin Between Cards: 40px
- Padding Inside Cards: 52px top/bottom, 28px left/right
- Border: 2px for definition

### Grid Layouts
- Gallery: 2 columns on desktop, 1 on mobile
- Countdown: 4 items on desktop, 2 on mobile
- Photo Gallery: 3 columns on desktop, 2 on tablet, 1 on mobile

---

## Animation Effects

### Entrance Animations
- Fade In Up: Main card entrance
- Slide In: From sides for list items
- Scale In: For photos and emphasized elements
- Staggered Delays: 0.1s - 0.5s between elements

### Micro-interactions
- Hover Lift: translateY(-3px) or (-6px)
- Shadow Enhancement: On hover
- Color Transitions: Smooth 0.3s transitions
- Border Color Change: On hover states

---

## Key Features

1. **Cohesive Green Theme**
   - All UI elements use green color palette
   - Professional Islamic aesthetic
   - Calming and elegant appearance

2. **Islamic Decorations**
   - Top and bottom PNG assets on every card
   - Creates unified visual language
   - Adds elegance without being overwhelming

3. **Professional Typography**
   - Crimson Text for elegant headings
   - Poppins for modern body text
   - Proper hierarchy and readability

4. **Smooth Interactions**
   - All transitions use cubic-bezier curves
   - 60fps animations
   - Proper hover states on all interactive elements

5. **Responsive Design**
   - Mobile-first approach
   - Proper breakpoints for all devices
   - Touch-friendly button sizes

---

## File Structure

```
css/
├── base.css                 - Root colors, card base, decorations
├── typography.css           - Font system & text styles
├── animations.css          - Animation definitions
├── cover.css              - Splash screen
├── ui-controls.css        - Navigation & buttons
├── section1-8.css         - Individual section styles
└── index.html             - Main HTML file

assets/
├── top.png               - Islamic decoration (top)
└── bottom.png            - Islamic decoration (bottom)
```

---

## Color Reference

```
Primary Green:     #1b5e20
Primary Light:     #2e7d32
Primary Lighter:   #4caf50
Secondary Teal:    #00695c
Accent Light:      #c8e6c9
Border Light:      #c8e6c9
Border Dark:       #81c784
Background:        #f1f8e9
White:            #ffffff
Gold Accent:      #d4af37
```

---

## Implementation Notes

- All colors defined in `:root` CSS variables
- Easy to customize by changing variable values
- Consistent shadow system for depth
- Proper contrast ratios for accessibility
- Green theme applied consistently across all components

---

## Customization

### To Change Primary Color
Edit `css/base.css`:
```css
:root {
    --primary: #1b5e20;           /* Change this value */
    --primary-light: #2e7d32;     /* And this */
}
```

### To Change Typography
Edit `index.html` Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

### To Use Different Decorations
Replace or swap:
- `assets/top.png`
- `assets/bottom.png`

---

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile Browsers: Full support

All features use standard CSS3 and are cross-browser compatible.

---

**Theme Version: 1.0 - Islamic Green**
**Last Updated: 2026**
