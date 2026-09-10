/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        /* Bumped up from Tailwind defaults — body copy read too small */
        xs: ['0.8125rem', { lineHeight: '1.25rem' }],   /* 13px, was 12px */
        sm: ['0.9375rem', { lineHeight: '1.5rem' }],     /* 15px, was 14px */
        base: ['1.0625rem', { lineHeight: '1.75rem' }],  /* 17px, was 16px */
        lg: ['1.1875rem', { lineHeight: '1.875rem' }],   /* 19px, was 18px */
        xl: ['1.3125rem', { lineHeight: '1.875rem' }],   /* 21px, was 20px */
      },
      colors: {
        /* Sage & Brass palette */
        forest: {
          50: '#F4F5EE',
          100: '#E5E8D6',
          200: '#CBD0AD',
          300: '#ABB483',
          400: '#85905C',
          500: '#626C45',
          600: '#4B5338',
          700: '#3A4029',
          800: '#2B301E',
          900: '#1E2215',
          950: '#14170E',
        },
        cream: {
          50: '#FDFBF6',
          100: '#F6F1E6',
          200: '#EFE7D3',
          300: '#E3D6B8',
          400: '#CDBB92',
          500: '#B09B72',
        },
        amber: {
          200: '#EDE0C4',
          300: '#D7BD8C',
          400: '#C2A066',
          500: '#A9834C',
          600: '#8C6B3B',
          700: '#705530',
        },
        gold: {
          200: '#EDE0C4',
          300: '#D7BD8C',
          400: '#C2A066',
          500: '#A9834C',
          600: '#8C6B3B',
          700: '#705530',
        },
        lotus: {
          50: '#F7F1E1',
          100: '#EDE0BE',
          200: '#DCC183',
          300: '#C7A050',
          400: '#B08A3E',
          500: '#94702F',
          600: '#785A26',
          700: '#5F461D',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 40px -8px rgb(60 69 45 / 0.25)",
        "glow-amber": "0 0 40px -8px rgb(196 132 62 / 0.3)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
