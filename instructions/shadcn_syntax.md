

## Shadcn UI Syntax Guide for App Development

This guide covers the core concepts and syntax needed to effectively use Shadcn UI components in your application. It assumes familiarity with React and Tailwind CSS, as Shadcn UI is built on top of Tailwind. For the most up-to-date information, refer to the official Shadcn UI documentation: [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs).

### 1. Core Concepts

*   **Copy and Paste Components:** Shadcn UI doesn't install as a traditional component library. Instead, you copy the source code of the components you need directly into your project. This gives you complete control over the code and allows for easy customization.
*   **Tailwind CSS:** Shadcn UI relies heavily on Tailwind CSS for styling. You should be comfortable with Tailwind's utility-first approach.
*   **Radix UI Primitives:** Many Shadcn UI components are built on top of Radix UI primitives, which provide accessible and unstyled UI components.
*   **Themes:** Shadcn UI supports theming, allowing you to customize the appearance of your components.

### 2. Installation and Setup

*   **Install `shadcn-ui` CLI:**

    ```bash
    npx shadcn-ui@latest init
    ```

    This command initializes Shadcn UI in your project and asks you a series of questions to configure it.  It will install necessary dependencies (like `tailwindcss-animate`, `class-variance-authority`, `clsx`, and `tailwind-merge`) and set up your `tailwind.config.js` file.
*   **Add Components:**

    ```bash
    npx shadcn-ui@latest add [component-name]
    ```

    Replace `[component-name]` with the name of the component you want to add (e.g., `button`, `dialog`, `select`).  This command copies the component's source code into your `components/ui` directory (or the directory you configured during initialization).

### 3. Component Syntax and Usage

Once you've added a component, you can import it into your React components and use it like any other React component.  Shadcn UI components are designed to be composable and customizable.

**Example: Button Component**

1.  **Add the Button component:**

    ```bash
    npx shadcn-ui@latest add button
    ```
2.  **Import and use the component:**

    ```typescript
    import { Button } from "@/components/ui/button"

    function MyComponent() {
      return (
         alert("Clicked!")}>
          Click me
        
      )
    }
    ```

    *   `import { Button } from "@/components/ui/button"`:  Imports the `Button` component from the location where you added it.  Adjust the path if you configured a different components directory.
    *   `variant="primary"`:  Applies the "primary" variant style. Shadcn UI components often have variants for different visual styles (e.g., `primary`, `secondary`, `outline`, `ghost`).
    *   `size="lg"`: Applies the "lg" size style.  Components may have different size options (`sm`, `md`, `lg`).
    *   `onClick={() => alert("Clicked!")}`:  Handles the click event.  Shadcn UI components accept standard React props.

### 4. Customization and Styling

*   **Tailwind CSS Classes:**  You can add custom Tailwind CSS classes to Shadcn UI components to further customize their appearance.

    ```typescript
    Custom Button
    ```

    This will make the button text uppercase and bold, in addition to the default Shadcn UI styles.
*   **Component Variants:**  Shadcn UI uses the `class-variance-authority` (cva) library to manage component variants. You can modify the component's code to add or modify variants.  The component code will contain a `cn` function which is a shortcut for `clsx` (another helpful library for conditionally applying classnames).

    ```typescript
    import { cva } from "class-variance-authority";
    import { cn } from "@/lib/utils";

    const buttonVariants = cva(
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      {
        variants: {
          variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            outline:
              "bg-transparent border border-input text-input-foreground hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "underline-offset-4 hover:underline text-primary",
          },
          size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      }
    )

    export interface ButtonProps
      extends React.ButtonHTMLAttributes,
        VariantProps {}

    const Button = React.forwardRef(
      ({ className, variant, size, ...props }, ref) => {
        return (
          
        )
      }
    )
    Button.displayName = "Button"

    export { Button, buttonVariants }
    ```

    To add a new variant, you would modify the `variants` object within the `cva` function.  For example:

    ```typescript
    variant: {
      default: "...",
      secondary: "...",
      // ... other variants
      success: "bg-green-500 text-white hover:bg-green-700", // Added success variant
    },
    ```

    Then you can use it like this:

    ```typescript
    Success Button
    ```

*   **Theming:** Shadcn UI uses CSS variables (custom properties) for theming. You can modify these variables in your `globals.css` file (or your preferred CSS file) to change the appearance of your components.  Shadcn UI provides a default light and dark theme.

    ```css
    :root {
      --background: 0 0% 100%;
      --foreground: 222.2 47.4% 11.2%;
      --primary: 222.2 47.4% 11.2%;
      --primary-foreground: 210 40% 98%;
      /* ... other variables */
    }

    .dark {
      --background: 222.2 84% 4.9%;
      --foreground: 210 40% 98%;
      --primary: 210 40% 98%;
      --primary-foreground: 222.2 47.4% 11.2%;
      /* ... other variables */
    }
    ```

### 5. Key Components and Their Usage

Shadcn UI offers a wide range of components. Here are some of the most commonly used ones:

*   **`Button`**:  For clickable buttons.  Variants: `primary`, `secondary`, `outline`, `ghost`, `link`.  Sizes: `default`, `sm`, `lg`, `icon`.
*   **`Card`**:  For displaying information in a card format.  Includes `CardHeader`, `CardContent`, and `CardFooter` sub-components.
*   **`Dialog`**:  For creating modal dialogs.  Uses `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription` sub-components.
*   **`Select`**:  For creating dropdown select menus.  Uses `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` sub-components.
*   **`Input`**:  For single-line text input fields.
*   **`Textarea`**: For multi-line text input fields.
*   **`Label`**: For labeling form elements.
*   **`Checkbox`**: For creating checkbox inputs.
*   **`RadioGroup` and RadioGroupItem**: For creating radio button groups.
*   **`Switch`**: For creating toggle switches.
*   **`Table`**: For displaying tabular data.  Uses `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead` sub-components.
*   **`Alert`**:  For displaying alert messages.
*   **`Badge`**: For displaying small status indicators.
*   **`DropdownMenu`**: For creating dropdown menus.
*   **`Command`**:  For creating command palettes (searchable dropdown menus).
*   **`Popover`**:  For displaying content in a popover.
*   **`Tooltip`**: For displaying tooltips on hover.
*   **`Calendar`**: For date picking.

For each component, refer to the Shadcn UI documentation for specific props and usage examples.

### 6. Utilities

Shadcn UI uses the following utility libraries:

*   **`class-variance-authority` (cva)**: For defining component variants.
*   **`clsx`**: For conditionally applying class names.
*   **`tailwind-merge`**: For merging Tailwind CSS classes, resolving conflicts and ensuring the correct styles are applied.
*   **`tailwindcss-animate`**: For adding animations using Tailwind CSS.

You can use these libraries directly in your components if needed. Shadcn UI provides a `cn` function (usually located in `lib/utils.ts`) that combines `clsx` and `tailwind-merge` for convenient class name manipulation:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 7. Important Considerations

*   **Accessibility:** Shadcn UI components are built with accessibility in mind, but it's still important to test your application with assistive technologies to ensure it's fully accessible.
*   **Customization:**  While Shadcn UI provides a good starting point, you'll likely need to customize the components to fit your specific design requirements.
*   **Dependencies:** Be aware of the dependencies that Shadcn UI installs and how they might affect your project.
*   **Updates:**  Since you're copying the component code directly into your project, you'll need to manually update the components when new versions are released.  The `shadcn-ui` CLI can help with this process.

This guide provides a solid foundation for working with Shadcn UI. As you build your application, explore the Shadcn UI documentation and the source code of the components to learn more about their features and customization options. Good luck!

Citations:
[1] https://pplx-res.cloudinary.com/image/upload/v1741763343/user_uploads/MctIpabkZlUyPbW/WhatsApp-Image-2025-03-05-at-19.59.21_c9a3d415.jpg

---
Answer from Perplexity: pplx.ai/share