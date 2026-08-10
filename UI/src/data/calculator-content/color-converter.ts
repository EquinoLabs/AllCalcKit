import type { CalculatorContent } from './types';

export const colorConverterContent: CalculatorContent = {
  id: 'color-converter',

  intro: {
    title: 'What is a Color Code Converter?',
    paragraphs: [
      'A Color Code Converter is an interactive graphic design and web development tool that translates color values across standard digital color models: HEX (Hexadecimal), RGB (Red, Green, Blue), and HSL (Hue, Saturation, Lightness).',
      'Whether you are styling a website with CSS, building UI design systems in Figma or Adobe XD, creating brand palettes, adjusting color brightness for dark mode themes, or converting digital artwork values, accurate color conversion ensures consistent visual rendering across screens. All formats and the live color swatch synchronize in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the Color Code Converter',
    description: 'Convert between digital color codes in three simple steps:',
    steps: [
      'Click the visual color picker swatch to select any color graphically, or type a 6-digit HEX code (such as #0070F3 or #FF5733) into the HEX input box.',
      'Instantly view the synchronized RGB value rgb(r, g, b) and HSL value hsl(h, s%, l%).',
      'Inspect the live visual preview swatch and copy any formatted color code directly into your CSS stylesheet or design tool.'
    ]
  },

  howItWorks: {
    title: 'How Color Space Conversion Works',
    paragraphs: [
      'Digital screens produce colors by mixing Red, Green, and Blue light channels (the additive RGB model).',
      'HEX notation represents these three channels as three 2-digit hexadecimal numbers ranging from 00 (0) to FF (255) prefixed by a hash (#RRGGBB). HSL represents the same color in a cylindrical coordinate space: Hue (the color angle around a 360° color wheel), Saturation (the intensity and purity of the color from 0% gray to 100% full color), and Lightness (the luminance from 0% pure black to 100% pure white).'
    ],
    formula: 'HEX: #RRGGBB  |  RGB: rgb(R, G, B)  |  HSL: hsl(Hue°, Saturation%, Lightness%)',
    formulaExplanation: 'Where R, G, B are integers from 0 to 255, Hue is an angle (0–360°), Saturation is a percentage (0–100%), and Lightness is a percentage (0–100%).',
    variables: [
      {
        symbol: 'HEX Code',
        name: 'Hexadecimal Color',
        description: 'Compact 6-character base-16 code used across web HTML and CSS styling (e.g. #0070F3).'
      },
      {
        symbol: 'RGB',
        name: 'Red Green Blue',
        description: 'Additive color model specifying red, green, and blue light channel intensities from 0 to 255.'
      },
      {
        symbol: 'HSL',
        name: 'Hue Saturation Lightness',
        description: 'Human-friendly cylindrical color model: Hue (0–360°), Saturation (0–100%), and Lightness (0–100%).'
      },
      {
        symbol: 'Live Preview',
        name: 'Color Swatch',
        description: 'Real-time visual swatch rendering the exact computed color output.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Web Colors Reference Palette',
    description: 'Fundamental primary, secondary, and neutral colors compared across HEX, RGB, and HSL formats:',
    headers: ['Color Name', 'HEX Code', 'RGB Value', 'HSL Value', 'Visual Description'],
    rows: [
      ['Pure Black', '#000000', 'rgb(0, 0, 0)', 'hsl(0, 0%, 0%)', 'Total absence of light'],
      ['Pure White', '#FFFFFF', 'rgb(255, 255, 255)', 'hsl(0, 0%, 100%)', 'Maximum light intensity across all channels'],
      ['Pure Red', '#FF0000', 'rgb(255, 0, 0)', 'hsl(0, 100%, 50%)', '0° Hue on the color wheel'],
      ['Pure Green (Lime)', '#00FF00', 'rgb(0, 255, 0)', 'hsl(120, 100%, 50%)', '120° Hue on the color wheel'],
      ['Pure Blue', '#0000FF', 'rgb(0, 0, 255)', 'hsl(240, 100%, 50%)', '240° Hue on the color wheel'],
      ['Yellow', '#FFFF00', 'rgb(255, 255, 0)', 'hsl(60, 100%, 50%)', '60° Hue (Red + Green light)'],
      ['Cyan', '#00FFFF', 'rgb(0, 255, 255)', 'hsl(180, 100%, 50%)', '180° Hue (Green + Blue light)'],
      ['Magenta', '#FF00FF', 'rgb(255, 0, 255)', 'hsl(300, 100%, 50%)', '300° Hue (Red + Blue light)'],
      ['Neutral Gray', '#808080', 'rgb(128, 128, 128)', 'hsl(0, 0%, 50%)', 'Midpoint luminance with 0% saturation'],
      ['Electric Blue', '#0070F3', 'rgb(0, 112, 243)', 'hsl(212, 100%, 48%)', 'Modern UI accent color']
    ]
  },

  example: {
    title: 'Example: Converting Brand Blue (#0070F3) to RGB and HSL',
    description: 'Suppose you have the brand accent color #0070F3 and need its RGB and HSL values for CSS variables.',
    inputs: [
      { label: 'HEX Code', value: '#0070F3' }
    ],
    steps: [
      'Step 1: Convert HEX to RGB by parsing two-digit byte pairs: R = 00₁₆ = 0, G = 70₁₆ = 112, B = F3₁₆ = 243. RGB is rgb(0, 112, 243).',
      'Step 2: Normalize RGB to decimals: R = 0/255 = 0, G = 112/255 = 0.439, B = 243/255 = 0.953.',
      'Step 3: Compute Lightness: (max + min) ÷ 2 = (0.953 + 0) ÷ 2 = 0.476 (48%).',
      'Step 4: Compute Saturation: (max − min) ÷ (1 − |2L − 1|) = 0.953 ÷ 0.953 = 1.0 (100%).',
      'Step 5: Compute Hue: Since Blue is maximum, Hue = 60° × [(0 − 0.439)/0.953 + 4] ≈ 212°.'
    ],
    calculation: '#0070F3 → rgb(0, 112, 243) → hsl(212, 100%, 48%)',
    result: 'HEX: #0070F3 | RGB: rgb(0, 112, 243) | HSL: hsl(212, 100%, 48%)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'HSL is exceptionally valuable in modern CSS design because it allows developers to create cohesive color schemes by keeping Hue and Saturation constant while simply tweaking the Lightness percentage for hover states, borders, and dark modes.',
      'HEX codes provide the most compact notation for stylesheets, while RGB is standard when configuring alpha transparency via rgba(r, g, b, a).'
    ]
  },

  faqs: [
    {
      question: 'What is the difference between HEX, RGB, and HSL?',
      answer: 'HEX is a 6-character hexadecimal string (#RRGGBB). RGB specifies the exact numeric intensity of Red, Green, and Blue light channels (0–255). HSL expresses color in human-intuitive terms: Hue (color angle 0–360°), Saturation (vibrancy 0–100%), and Lightness (brightness 0–100%).'
    },
    {
      question: 'Why do UI designers and developers prefer HSL in CSS?',
      answer: 'HSL separates a color\'s base identity (Hue) from its brightness (Lightness). This makes generating lighter hover states, darker active states, and dark mode theme variations easy without changing the underlying hue.'
    },
    {
      question: 'How do the 6 digits in a HEX code work?',
      answer: 'A HEX code divides into three 2-digit pairs: the first two represent Red (00 to FF), the middle two represent Green (00 to FF), and the last two represent Blue (00 to FF).'
    },
    {
      question: 'What happens when Saturation is set to 0% in HSL?',
      answer: 'When Saturation is 0%, the color has no chrominance and becomes a neutral grayscale value determined solely by the Lightness percentage (0% = Black, 50% = Gray, 100% = White).'
    },
    {
      question: 'Are the converted color codes compatible with standard CSS?',
      answer: 'Yes. All generated strings adhere to official W3C CSS Color Module specifications and can be pasted directly into CSS declarations, inline styles, or Tailwind configurations.'
    }
  ],

  notes: {
    title: 'Important Notes & Color Standards',
    items: [
      'W3C Standards: All generated color codes conform to CSS Color Module Level 3 and 4 specifications.',
      '8-Bit Channel Range: Red, Green, and Blue channels scale from 0 (minimum intensity) to 255 (maximum intensity).',
      'Real-Time Sync: Updating the color picker or typing a valid 6-digit hex code immediately synchronizes all format fields and the visual preview swatch.'
    ]
  }
};
