

## Tailwind CSS Syntax Guide for App Development

This guide covers the core concepts and syntax you'll need to effectively use Tailwind CSS for styling your application. It focuses on the most common and essential utility classes. For the most up-to-date information, refer to the official Tailwind CSS documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs).

### 1. Core Concepts

*   **Utility-First:** Tailwind provides a set of pre-defined utility classes that you compose to style your HTML elements.  Instead of writing CSS, you apply these classes directly in your HTML.
*   **Responsive Design:**  Tailwind makes responsive design easy with breakpoint prefixes.
*   **Customization:**  Tailwind is highly customizable. You can configure the theme, add custom styles, and more.

### 2. Basic Syntax

Tailwind classes follow a consistent naming convention:

`[property]-[modifier]-[value]`

*   **`property`**:  Indicates the CSS property you're styling (e.g., `text`, `bg`, `font`, `m`, `p`).
*   **`modifier`**: (Optional) Modifies the property (e.g., `bold`, `italic`, `center`, `left`, `right`, `top`, `bottom`, `x`, `y`).
*   **`value`**:  Specifies the value for the property (e.g., `red-500`, `2`, `sm`, `lg`, `xl`).

**Example:**

`Click me`

*   `bg-blue-500`:  Sets the background color to blue-500.
*   `hover:bg-blue-700`: Changes the background color to blue-700 on hover.
*   `text-white`: Sets the text color to white.
*   `font-bold`: Makes the text bold.
*   `py-2`:  Adds 0.5rem of padding to the top and bottom (padding-top and padding-bottom).
*   `px-4`: Adds 1rem of padding to the left and right (padding-left and padding-right).
*   `rounded`:  Adds a border radius.

### 3. Essential Utility Classes

#### Layout

*   **`container`**:  Creates a container that centers your content horizontally.  You'll need to configure the container's max-width in your `tailwind.config.js` file.
*   **`block`**, **`inline-block`**, **`inline`**:  Sets the `display` property.
*   **`flex`**, **`inline-flex`**:  Enables flexbox layout.
*   **`grid`**, **`inline-grid`**: Enables grid layout.
*   **`hidden`**, **`block`**, **`inline`**:  Sets the `display` property to `none`, `block`, or `inline` respectively.
*   **`overflow-hidden`**, **`overflow-auto`**, **`overflow-scroll`**: Controls how overflowing content is handled.
*   **`static`**, **`relative`**, **`absolute`**, **`fixed`**, **`sticky`**:  Sets the `position` property.
*   **`top-0`**, **`right-0`**, **`bottom-0`**, **`left-0`**:  Sets the `top`, `right`, `bottom`, and `left` properties (used for positioned elements).
*   **`z-0`**, **`z-10`**, **`z-20`**, **`z-30`**, **`z-40`**, **`z-50`**, **`z-auto`**:  Sets the `z-index` property.

#### Flexbox & Grid

*   **`flex-row`**, **`flex-col`**: Sets the direction of flex items.
*   **`justify-start`**, **`justify-center`**, **`justify-end`**, **`justify-between`**, **`justify-around`**, **`justify-evenly`**:  Controls the horizontal alignment of flex items.
*   **`items-start`**, **`items-center`**, **`items-end`**, **`items-stretch`**, **`items-baseline`**:  Controls the vertical alignment of flex items.
*   **`gap-2`**, **`gap-4`**, **`gap-x-2`**, **`gap-y-4`**:  Adds gaps between flex or grid items.  Values are based on the Tailwind spacing scale.
*   **`grid-cols-1`**, **`grid-cols-2`**, ..., **`grid-cols-12`**:  Defines the number of columns in a grid layout.
*   **`col-span-1`**, **`col-span-2`**, ..., **`col-span-12`**:  Specifies how many columns a grid item should span.

#### Spacing

*   **`m-0`**, **`m-1`**, **`m-2`**, ..., **`m-auto`**:  Sets margin on all sides.
*   **`mt-0`**, **`mr-1`**, **`mb-2`**, **`ml-3`**:  Sets margin on the top, right, bottom, and left respectively.
*   **`mx-0`**, **`my-1`**: Sets horizontal (left and right) and vertical (top and bottom) margins respectively.
*   **`p-0`**, **`p-1`**, **`p-2`**, ..., **`p-auto`**:  Sets padding on all sides.
*   **`pt-0`**, **`pr-1`**, **`pb-2`**, **`pl-3`**:  Sets padding on the top, right, bottom, and left respectively.
*   **`px-0`**, **`py-1`**: Sets horizontal (left and right) and vertical (top and bottom) padding respectively.

    *   The values (0, 1, 2, 3, etc.) refer to values in Tailwind's spacing scale (usually multiples of 0.25rem).

#### Typography

*   **`font-sans`**, **`font-serif`**, **`font-mono`**:  Sets the font family.
*   **`text-xs`**, **`text-sm`**, **`text-base`**, **`text-lg`**, **`text-xl`**, ..., **`text-9xl`**:  Sets the font size.
*   **`font-thin`**, **`font-extralight`**, **`font-light`**, **`font-normal`**, **`font-medium`**, **`font-semibold`**, **`font-bold`**, **`font-extrabold`**, **`font-black`**:  Sets the font weight.
*   **`italic`**, **`not-italic`**:  Sets the font style to italic or normal.
*   **`uppercase`**, **`lowercase`**, **`capitalize`**, **`normal-case`**:  Transforms the text casing.
*   **`text-left`**, **`text-center`**, **`text-right`**, **`text-justify`**: Sets the text alignment.
*   **`text-red-500`**, **`text-green-600`**, etc.: Sets the text color.  See the "Colors" section.
*   **`leading-3`**, **`leading-4`**, ..., **`leading-relaxed`**:  Sets the line height.
*   **`tracking-tighter`**, **`tracking-tight`**, **`tracking-normal`**, **`tracking-wide`**, **`tracking-wider`**, **`tracking-widest`**:  Sets the letter spacing.

#### Backgrounds

*   **`bg-red-500`**, **`bg-green-600`**, etc.: Sets the background color.  See the "Colors" section.
*   **`bg-gradient-to-r`**, **`bg-gradient-to-l`**, **`bg-gradient-to-t`**, **`bg-gradient-to-b`**:  Creates a linear gradient.  Use with `from-*`, `to-*`, and `via-*` color stops.
*   **`bg-cover`**, **`bg-contain`**, **`bg-repeat`**, **`bg-no-repeat`**:  Sets the background size and repeat properties.
*   **`bg-center`**, **`bg-top`**, **`bg-bottom`**, **`bg-left`**, **`bg-right`**:  Sets the background position.

#### Borders

*   **`border`**, **`border-2`**, **`border-4`**, **`border-8`**:  Sets the border width.
*   **`border-red-500`**, **`border-green-600`**, etc.:  Sets the border color.  See the "Colors" section.
*   **`rounded`**, **`rounded-sm`**, **`rounded-md`**, **`rounded-lg`**, **`rounded-xl`**, **`rounded-2xl`**, **`rounded-3xl`**, **`rounded-full`**:  Sets the border radius.
*   **`rounded-t-none`**, **`rounded-r-md`**, **`rounded-b-lg`**, **`rounded-l-xl`**:  Sets the border radius for specific corners (top, right, bottom, left).

#### Effects

*   **`shadow`**, **`shadow-md`**, **`shadow-lg`**, **`shadow-xl`**, **`shadow-2xl`**, **`shadow-inner`**, **`shadow-none`**:  Adds box shadows.
*   **`opacity-0`**, **`opacity-25`**, **`opacity-50`**, **`opacity-75`**, **`opacity-100`**:  Sets the opacity.

#### Interactivity

*   **`hover:bg-blue-700`**, **`hover:text-white`**:  Applies styles on hover.
*   **`focus:outline-none`**, **`focus:ring-2`**, **`focus:ring-blue-500`**:  Styles the focus state (important for accessibility).
*   **`active:bg-gray-200`**:  Applies styles when the element is active (e.g., when a button is clicked).
*   **`disabled:opacity-50`**, **`disabled:cursor-not-allowed`**:  Styles a disabled element.
*   **`cursor-pointer`**, **`cursor-not-allowed`**:  Sets the cursor style.

#### Colors

Tailwind uses a numbered color palette:

*   `[color]-[intensity]`
*   Example: `red-100`, `red-200`, ..., `red-900`

Common colors:

*   `red`, `green`, `blue`, `yellow`, `purple`, `pink`, `gray`, `white`, `black`

#### Transforms

*   `rotate-0`, `rotate-45`, `rotate-90`, `rotate-180`: Rotates an element.
*   `scale-0`, `scale-50`, `scale-75`, `scale-90`, `scale-95`, `scale-100`, `scale-105`, `scale-110`, `scale-125`, `scale-150`: Scales an element.
*   `translate-x-0`, `translate-y-0`, `translate-x-4`, `translate-y-8`: Translates an element.
*   `skew-x-0`, `skew-y-0`, `skew-x-6`, `skew-y-12`: Skews an element.

### 4. Responsive Design

Use breakpoint prefixes to apply styles at different screen sizes:

*   `sm:` (640px and up)
*   `md:` (768px and up)
*   `lg:` (1024px and up)
*   `xl:` (1280px and up)
*   `2xl:` (1536px and up)

**Example:**

`...`

This will center the text on small screens, left-align it on medium screens, and right-align it on large screens.

### 5. Customization (tailwind.config.js)

The `tailwind.config.js` file is where you customize Tailwind:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Files to scan for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#123456',
      },
      fontFamily: {
        'custom-font': ['MyFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

*   **`content`**: Specifies the files to scan for Tailwind classes.  Crucially important for Tailwind to generate the correct CSS.
*   **`theme.extend`**:  Extends the default Tailwind theme with your customizations.
    *   `colors`: Add or override colors.
    *   `fontFamily`: Add custom font families.
    *   You can also customize spacing, breakpoints, and more.
*   **`plugins`**:  Add Tailwind plugins.

### 6. Important Considerations

*   **Purge CSS:**  In production, configure PurgeCSS (enabled by default in Tailwind v3) to remove unused CSS classes, significantly reducing your CSS file size.  Ensure your `content` paths in `tailwind.config.js` are accurate.
*   **Class Order:**  The order of classes in your HTML matters.  Later classes will override earlier ones.
*   **Readability:**  For complex elements, consider using `@apply` in your own CSS to create reusable component styles (use sparingly).  However, composing utility classes directly in your HTML is generally preferred.
*   **Accessibility:**  Pay attention to accessibility when styling your components.  Use semantic HTML and provide appropriate ARIA attributes when necessary.

This guide provides a strong foundation for using Tailwind CSS. Remember to consult the official documentation for the most comprehensive and up-to-date information. Good luck building your application!

Citations:
[1] https://pplx-res.cloudinary.com/image/upload/v1741763343/user_uploads/MctIpabkZlUyPbW/WhatsApp-Image-2025-03-05-at-19.59.21_c9a3d415.jpg

---
Answer from Perplexity: pplx.ai/share