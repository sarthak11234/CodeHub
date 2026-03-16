export const cssProblems = [
    {
        title: 'Center a Div',
        description: '# Center a Div\n\nYour task is to center a `div` both horizontally and vertically within its parent container.\n\n## Requirements\n- The inner div should be perfectly centered\n- Use CSS Flexbox or Grid\n- The parent container has a fixed height of 400px\n\n## Starter Code\nYou are given an HTML structure with a parent container and a child box. Write the CSS to center the box.',
        difficulty: 'easy',
        category: 'css',
        starterCode: '.container {\n  height: 400px;\n  background: #1e293b;\n  /* Add your styles here */\n}\n\n.box {\n  width: 100px;\n  height: 100px;\n  background: #06b6d4;\n}',
        solutionCode: '.container {\n  height: 400px;\n  background: #1e293b;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.box {\n  width: 100px;\n  height: 100px;\n  background: #06b6d4;\n}',
        testCases: [
            { input: 'check display', expectedOutput: 'flex', description: 'Container uses flexbox' },
            { input: 'check justify-content', expectedOutput: 'center', description: 'Horizontal centering' },
            { input: 'check align-items', expectedOutput: 'center', description: 'Vertical centering' }
        ],
        points: 10
    },
    {
        title: 'CSS Grid Layout 3x3',
        description: '# CSS Grid layout 3x3\n\nCreate a 3x3 grid layout using CSS Grid where every cell has an equal width and height filling the container.',
        difficulty: 'easy',
        category: 'css',
        starterCode: '.grid-container {\n  /* Your code here */\n}',
        solutionCode: '.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(3, 1fr);\n  gap: 10px;\n  height: 100%;\n}',
        testCases: [
            { input: 'display check', expectedOutput: 'grid', description: 'Uses Grid' },
            { input: 'columns', expectedOutput: 'repeat(3, 1fr)', description: '3 equal columns' }
        ],
        points: 10
    },
    {
        title: 'Sticky Header Navbar',
        description: '# Sticky Navbar\n\nMake the `<nav>` element stick to the top of the viewport when scrolling past it.',
        difficulty: 'easy',
        category: 'css',
        starterCode: 'nav {\n  background: white;\n  padding: 1rem;\n  /* Add your styles here */\n}',
        solutionCode: 'nav {\n  background: white;\n  padding: 1rem;\n  position: sticky;\n  top: 0;\n  z-index: 50;\n}',
        testCases: [
            { input: 'position property', expectedOutput: 'sticky', description: 'Uses sticky positioning' },
            { input: 'top constraint', expectedOutput: '0', description: 'Sticks to top 0 boundary' }
        ],
        points: 15
    },
    {
        title: 'Responsive Three Column Footer',
        description: '# Responsive Footer\n\nCreate a footer with 3 columns evenly spaced on desktop. On mobile screens (<= 768px), they should stack vertically.',
        difficulty: 'medium',
        category: 'css',
        starterCode: 'footer {\n  /* Your code here */\n}\n\n/* Add media queries */',
        solutionCode: 'footer {\n  display: flex;\n  justify-content: space-between;\n  flex-direction: row;\n  gap: 2rem;\n}\n\n@media (max-width: 768px) {\n  footer {\n    flex-direction: column;\n  }\n}',
        testCases: [
            { input: 'Desktop alignment', expectedOutput: 'row space-between', description: 'Side by side layout' },
            { input: 'Mobile media breakpoint flex-dir', expectedOutput: 'column', description: 'Vertical stacked correctly' }
        ],
        points: 20
    },
    {
        title: 'Zebra Striping Table Rows',
        description: '# Zebra Table Styles\n\nStyle a standard HTML `<table>` so that every even `<tr>` row has a background of `#f1f5f9` and every odd row has `#ffffff`.',
        difficulty: 'easy',
        category: 'css',
        starterCode: 'table {\n  width: 100%;\n}\n\n/* Add your nth-child logic here */',
        solutionCode: 'table {\n  width: 100%;\n  border-collapse: collapse;\n}\n\ntr:nth-child(even) {\n  background-color: #f1f5f9;\n}\n\ntr:nth-child(odd) {\n  background-color: #ffffff;\n}',
        testCases: [
            { input: 'nth-child selectors', expectedOutput: 'even: f1f5f9', description: 'Alternating row colors' }
        ],
        points: 15
    },
    {
        title: 'Button Hover Ripple Effect',
        description: '# Button Ripple (Transform & Translate)\n\nCreate a smooth CSS transition where a button scales up by 1.05 and the background darkens when hovered.',
        difficulty: 'easy',
        category: 'css',
        starterCode: '.btn {\n  background: blue;\n  color: white;\n  /* Code... */\n}',
        solutionCode: '.btn {\n  background: blue;\n  color: white;\n  padding: 10px 20px;\n  transition: all 0.3s ease;\n}\n\n.btn:hover {\n  transform: scale(1.05);\n  background: darkblue;\n}',
        testCases: [
            { input: 'transition prop', expectedOutput: 'all 0.3s', description: 'Animation timing definition' },
            { input: 'hover transform', expectedOutput: 'scale(1.05)', description: 'Transform scaling requirement' }
        ],
        points: 15
    },
    {
        title: 'CSS Masonry Grid Fallback',
        description: '# Masonry layout using Columns\n\nImplement a Pinterest-style masonry layout without JS using CSS multi-columns layout.',
        difficulty: 'medium',
        category: 'css',
        starterCode: '.masonry {\n  /* Your code here */\n}\n\n.item {\n  /* Ensure items dont break mid-column */\n}',
        solutionCode: '.masonry {\n  column-count: 3;\n  column-gap: 1rem;\n}\n\n.item {\n  break-inside: avoid;\n  margin-bottom: 1rem;\n}\n\n@media (max-width: 768px) {\n  .masonry { column-count: 2; }\n}\n@media (max-width: 480px) {\n  .masonry { column-count: 1; }\n}',
        testCases: [
            { input: 'column-count mapping', expectedOutput: '3', description: 'Base 3 columns layout' },
            { input: 'item breaks', expectedOutput: 'break-inside: avoid', description: 'Prevents clipping chunks' }
        ],
        points: 20
    },
    {
        title: 'Pulsing Indicator Dot',
        description: '# CSS Keyframes Pulse\n\nCreate an infinite pulsing animation for an "online" indicator dot. It should scale up to 1.5x and fade out.',
        difficulty: 'medium',
        category: 'css',
        starterCode: '.dot {\n  width: 10px;\n  height: 10px;\n  background: green;\n  border-radius: 50%;\n}\n\n/* Define @keyframes here */',
        solutionCode: '.dot {\n  width: 10px;\n  height: 10px;\n  background: green;\n  border-radius: 50%;\n  animation: pulse 2s infinite ease-out;\n}\n\n@keyframes pulse {\n  0% {\n    transform: scale(1);\n    opacity: 1;\n    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);\n  }\n  70% {\n    transform: scale(1.5);\n    opacity: 0;\n    box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);\n  }\n  100% {\n    transform: scale(1);\n    opacity: 0;\n  }\n}',
        testCases: [
            { input: 'animation binding', expectedOutput: 'pulse infinite', description: 'Binds animation iteration' },
            { input: 'keyframes shape', expectedOutput: 'transform scale 1 to 1.5', description: 'Keyframe transformation execution' }
        ],
        points: 25
    },
    {
        title: 'CSS Only Tooltip',
        description: '# Data-Attribute Tooltip\n\nCreate a tooltip that displays the contents of `data-tooltip` attribute using `::before` or `::after` pseudo-elements when hovering an element.',
        difficulty: 'medium',
        category: 'css',
        starterCode: '[data-tooltip] {\n  position: relative;\n}\n\n/* Create tooltip pseudo elements */',
        solutionCode: '[data-tooltip] {\n  position: relative;\n  cursor: pointer;\n}\n\n[data-tooltip]::before {\n  content: attr(data-tooltip);\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  background-color: rgba(0,0,0,0.8);\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n  white-space: nowrap;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.2s;\n}\n\n[data-tooltip]:hover::before {\n  opacity: 1;\n  visibility: visible;\n  bottom: 110%;\n}',
        testCases: [
            { input: 'content getter syntax', expectedOutput: 'attr(data-tooltip)', description: 'Pulls data from HTML attribute correctly.' }
        ],
        points: 25
    },
    {
        title: 'Glassmorphism Card Effect',
        description: '# Glassmorphism Box\n\nDesign a card with a frosted glass effect over a background image using backdrop filter.',
        difficulty: 'medium',
        category: 'css',
        starterCode: '.glass-card {\n  /* Your code here */\n}',
        solutionCode: '.glass-card {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 16px;\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  padding: 2rem;\n  color: white;\n}',
        testCases: [
            { input: 'backdrop filter property', expectedOutput: 'blur()', description: 'Applies UI blur correctly.' },
            { input: 'translucent background', expectedOutput: 'rgba(...)', description: 'Color overlay opacity set correctly' }
        ],
        points: 20
    },
    {
        title: 'Truncate Multi-line Text',
        description: '# Line Clamp Truncation\n\nUse CSS to truncate a long paragraph of text so it only displays a maximum of 3 lines, adding an ellipsis (`...`) at the end.',
        difficulty: 'medium',
        category: 'css',
        starterCode: '.truncate-3-lines {\n  /* Your code here */\n}',
        solutionCode: '.truncate-3-lines {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}',
        testCases: [
            { input: 'line clamp syntax', expectedOutput: '-webkit-line-clamp: 3', description: 'Trims at the 3rd line text node' }
        ],
        points: 20
    },
    {
        title: 'Styling Custom Scrollbars',
        description: '# Custom Scrollbar Theme\n\nStyle the webkit scrollbar for a specific `.scroller` div so the track is light gray and the thumb is dark blue with rounded edges.',
        difficulty: 'medium',
        category: 'css',
        starterCode: '.scroller {\n  height: 300px;\n  overflow-y: scroll;\n}\n\n/* Add scrollbar pseudo elements */',
        solutionCode: '.scroller {\n  height: 300px;\n  overflow-y: auto;\n}\n\n.scroller::-webkit-scrollbar {\n  width: 10px;\n}\n\n.scroller::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 8px;\n}\n\n.scroller::-webkit-scrollbar-thumb {\n  background: #1e3a8a;\n  border-radius: 8px;\n}\n\n.scroller::-webkit-scrollbar-thumb:hover {\n  background: #1e40af;\n}',
        testCases: [
            { input: 'thumb selector', expectedOutput: '::-webkit-scrollbar-thumb', description: 'Targets the dragger correctly' }
        ],
        points: 20
    },
    {
        title: 'CSS Triangle Arrow',
        description: '# Pure CSS Triangle\n\nCreate a pointing-down triangle arrow that is 10px wide using only CSS borders (no SVGs or images).',
        difficulty: 'hard',
        category: 'css',
        starterCode: '.arrow-down {\n  width: 0;\n  height: 0;\n  /* Code... */\n}',
        solutionCode: '.arrow-down {\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-top: 10px solid #000;\n}',
        testCases: [
            { input: 'border coloring techniques', expectedOutput: 'transparent', description: 'Hides perpendicular borders' },
            { input: 'directional arrow border', expectedOutput: 'border-top solid black', description: 'Creates down pointing triangle' }
        ],
        points: 30
    },
    {
        title: 'Holy Grail Layout',
        description: '# Holy Grail Flexbox Layout\n\nImplement the classic Holy Grail layout (Header, Footer, Left Sidebar, Right Sidebar, Main content area in center) using CSS Grid.',
        difficulty: 'hard',
        category: 'css',
        starterCode: '.layout {\n  display: grid;\n  /* Define areas */\n}',
        solutionCode: '.layout {\n  display: grid;\n  height: 100vh;\n  grid-template-rows: auto 1fr auto;\n  grid-template-columns: 200px 1fr 200px;\n  grid-template-areas:\n    "header header header"\n    "left main right"\n    "footer footer footer";\n}\n\n.header { grid-area: header; }\n.left { grid-area: left; }\n.main { grid-area: main; }\n.right { grid-area: right; }\n.footer { grid-area: footer; }',
        testCases: [
            { input: 'template areas structure', expectedOutput: '"left main right"', description: '3 column body structural syntax' },
            { input: 'header column span', expectedOutput: '"header header header"', description: 'Header overlaps entire section top' }
        ],
        points: 35
    },
    {
        title: 'Fluid Typography scaling',
        description: '# Fluid Font Sizes using clamp()\n\nUse the `clamp()` function so that a heading is 2rem on small screens, 5vw dynamically in between, and caps out at a maximum of 4rem on ultra-wide screens.',
        difficulty: 'medium',
        category: 'css',
        starterCode: 'h1 {\n  /* Set font size */\n}',
        solutionCode: 'h1 {\n  font-size: clamp(2rem, 5vw, 4rem);\n}',
        testCases: [
            { input: 'Responsive clamp syntax args', expectedOutput: 'clamp(2rem, 5vw, 4rem)', description: 'Correct bound declarations' }
        ],
        points: 20
    },
    {
        title: 'Card Flip Animation',
        description: '# 3D Card Flip (TranslateZ)\n\nCreate a 3D flipping card that shows the `.front` face initially, and flips on the Y axis 180deg to show the `.back` face when hovered.',
        difficulty: 'hard',
        category: 'css',
        starterCode: '.card {\n  /* your code here */\n}',
        solutionCode: '.card {\n  perspective: 1000px;\n  width: 300px;\n  height: 400px;\n}\n\n.card-inner {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  transition: transform 0.8s;\n  transform-style: preserve-3d;\n}\n\n.card:hover .card-inner {\n  transform: rotateY(180deg);\n}\n\n.front, .back {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  backface-visibility: hidden;\n}\n\n.back {\n  transform: rotateY(180deg);\n}',
        testCases: [
            { input: 'preserve-3d property', expectedOutput: 'transform-style', description: 'Keeps 3d rendering hierarchy child bounds' },
            { input: 'backface visibility', expectedOutput: 'hidden', description: 'Hides reverse content overlap' }
        ],
        points: 40
    },
    {
        title: 'Aspect Ratio Image Container',
        description: '# Pre-calculate Aspect Ratios (Old & New)\n\nCreate a container that maintains a strictly 16:9 aspect ratio regardless of its absolute width. Use the modern `aspect-ratio` property.',
        difficulty: 'easy',
        category: 'css',
        starterCode: '.video-wrapper {\n  width: 100%;\n  /* Add aspect ratio trick */\n}',
        solutionCode: '.video-wrapper {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  background: black;\n  position: relative;\n  overflow: hidden;\n}\n\n.video-wrapper img, .video-wrapper iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}',
        testCases: [
            { input: 'aspect ratio prop', expectedOutput: '16 / 9', description: 'Sets correct 1.777 aspect calculation' }
        ],
        points: 15
    },
    {
        title: 'Dark Mode CSS Variables',
        description: '# CSS Custom Properties (Theme)\n\nDefine base CSS variables for `--bg-color` and `--text-color` on `:root`. Add a `.dark-theme` class that overwrites these CSS variables to dark mode equivalents.',
        difficulty: 'medium',
        category: 'css',
        starterCode: ':root {\n  /* Light theme default */\n}\n\n/* Dark theme overrides */',
        solutionCode: ':root {\n  --bg-color: #ffffff;\n  --text-color: #111827;\n  --primary: #3b82f6;\n}\n\n.dark-theme {\n  --bg-color: #0f172a;\n  --text-color: #f8fafc;\n  --primary: #60a5fa;\n}\n\nbody {\n  background-color: var(--bg-color);\n  color: var(--text-color);\n  transition: background-color 0.3s, color 0.3s;\n}',
        testCases: [
            { input: 'CSS variables scope execution on root', expectedOutput: '--bg-color', description: 'Defined at document level cascade properly.' }
        ],
        points: 20
    },
    {
        title: 'Glowing Input Border',
        description: '# Glowing Focus Ring\n\nStyle an input field so that when focused, it loses its default outline and gains a glowing drop shadow (`box-shadow`) of a cyan color.',
        difficulty: 'easy',
        category: 'css',
        starterCode: 'input:focus {\n  /* Your code here */\n}',
        solutionCode: 'input:focus {\n  outline: none;\n  border-color: #06b6d4;\n  box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.2);\n  transition: all 0.2s;\n}',
        testCases: [
            { input: 'outline property removal', expectedOutput: 'none', description: 'Override default browser style outline correctly' },
            { input: 'box shadow blur', expectedOutput: 'rgba(', description: 'Creates glowing edge radius spread' }
        ],
        points: 15
    },
    {
        title: 'Pixel Art with Box Shadow',
        description: '# Drawing with Box Shadow\n\nUse a single `1px` div and a large, multi-comma separated `box-shadow` declaration to draw a 3x3 checkerboard pattern using only CSS.',
        difficulty: 'hard',
        category: 'css',
        starterCode: '.pixel-art {\n  width: 10px;\n  height: 10px;\n  /* Use box shadow */\n}',
        solutionCode: '.pixel-art {\n  width: 10px;\n  height: 10px;\n  background: black;\n  box-shadow: \n    10px 0 white,\n    20px 0 black,\n    0 10px white,\n    10px 10px black,\n    20px 10px white,\n    0 20px black,\n    10px 20px white,\n    20px 20px black;\n}',
        testCases: [
            { input: 'Multiple commas in shadow block property', expectedOutput: '20px 20px', description: 'Clones element using purely drop shadows.' }
        ],
        points: 35
    },
    {
        title: 'Full Viewport Background Image',
        description: '# CSS Cover Background\n\nSet a background image on a hero section that covers the entire viewport, is centered, does not repeat, and stays fixed in place through scroll.',
        difficulty: 'easy',
        category: 'css',
        starterCode: '.hero {\n  /* Code... */\n}',
        solutionCode: '.hero {\n  height: 100vh;\n  width: 100vw;\n  background-image: url("bg.jpg");\n  background-size: cover;\n  background-position: center;\n  background-attachment: fixed;\n  background-repeat: no-repeat;\n}',
        testCases: [
            { input: 'cover property', expectedOutput: 'cover', description: 'Resizes to fill edges completely' },
            { input: 'attachment parallax', expectedOutput: 'fixed', description: 'Prevents scroll sliding on background bounds.' }
        ],
        points: 10
    },
    {
        title: 'Drop Cap Paragraph',
        description: '# First Letter Selector\n\nStyle paragraphs so that their very first letter is a massive "Drop Cap" that floats to the left, standing 3 lines tall.',
        difficulty: 'medium',
        category: 'css',
        starterCode: 'p::first-letter {\n  /* Your code here */\n}',
        solutionCode: 'p::first-letter {\n  float: left;\n  font-size: 3rem;\n  line-height: 1;\n  font-weight: bold;\n  padding-right: 8px;\n  padding-top: 4px;\n  color: #3b82f6;\n}',
        testCases: [
            { input: 'pseudo element selector', expectedOutput: '::first-letter', description: 'CSS accesses string node text properties.' }
        ],
        points: 20
    },
    {
        title: 'Text Gradient Fill',
        description: '# Linear Gradient Text\n\nMake a heading text transparent and fill the actual text itself (not its background) with a CSS `linear-gradient` from purple to cyan.',
        difficulty: 'medium',
        category: 'css',
        starterCode: 'h1.gradient-text {\n  /* Define background clip */\n}',
        solutionCode: 'h1.gradient-text {\n  background: linear-gradient(to right, #8b5cf6, #06b6d4);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}',
        testCases: [
            { input: 'background clipping properties', expectedOutput: 'text', description: 'Masks background exclusively along text geometries' }
        ],
        points: 20
    },
    {
        title: 'Skeleton Loading Animation',
        description: '# Skeleton Shimmer\n\nCreate a skeleton loading element that has a dark gray background and uses a linear-gradient background animation moving from left to right endlessly to simulate a shimmer loading effect.',
        difficulty: 'hard',
        category: 'css',
        starterCode: '.skeleton {\n  /* Write gradient animation */\n}',
        solutionCode: '.skeleton {\n  background: #333;\n  background-image: linear-gradient(\n    90deg,\n    rgba(255, 255, 255, 0) 0,\n    rgba(255, 255, 255, 0.1) 50%,\n    rgba(255, 255, 255, 0) 100%\n  );\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite linear;\n}\n\n@keyframes shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}',
        testCases: [
            { input: 'background position keyframes', expectedOutput: '-200%', description: 'Animates the gradient mask coordinates logically.' }
        ],
        points: 35
    },
    {
        title: 'CSS Only Tabs Toggle',
        description: '# Switch tabs using Radios\n\nImplement a tab switching mechanism without JS using hidden `type="radio"` inputs and the `:checked` pseudo-class along with the general sibling combinator `~`.',
        difficulty: 'hard',
        category: 'css',
        starterCode: '/* [type=radio]:checked ~ .tab-content { ... } */',
        solutionCode: '.tabs {\n  position: relative;\n}\n\n.tab-content {\n  display: none;\n  padding: 20px;\n}\n\ninput[type="radio"] {\n  display: none;\n}\n\nlabel {\n  display: inline-block;\n  padding: 10px 20px;\n  cursor: pointer;\n  background: #eee;\n}\n\n#tab1:checked ~ #content1,\n#tab2:checked ~ #content2,\n#tab3:checked ~ #content3 {\n  display: block;\n}\n\n#tab1:checked ~ .labels label[for="tab1"],\n#tab2:checked ~ .labels label[for="tab2"],\n#tab3:checked ~ .labels label[for="tab3"] {\n  background: white;\n  font-weight: bold;\n}',
        testCases: [
            { input: 'CSS logic structure execution', expectedOutput: ':checked ~', description: 'Queries DOM tree dynamically through CSS rules.' }
        ],
        points: 40
    }
];
