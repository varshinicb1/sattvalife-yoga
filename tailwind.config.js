/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        /* Small phones (iPhone SE 1st gen is 320px wide) */
        xs: '400px',
      },
      fontFamily: {
        /* Self-hosted variable fonts (@fontsource-variable), imported in main.tsx */
        serif: ['"Playfair Display Variable"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      /* z-index scale: nav 40 · floating buttons 30 · cookie banner 50 · sheets/modals 60 · toasts 70 · grain overlay 80 */
      zIndex: {
        float: '30',
        nav: '40',
        banner: '50',
        sheet: '60',
        toast: '70',
        grain: '80',
      },
      fontSize: {
        /* Bumped up from Tailwind defaults — body copy read too small */
        xs: ['0.8125rem', { lineHeight: '1.25rem' }],    /* 13px, small labels */
        sm: ['0.9375rem', { lineHeight: '1.55rem' }],    /* 15px, small print */
        base: ['1.125rem', { lineHeight: '1.85rem' }],   /* 18px body */
        lg: ['1.25rem', { lineHeight: '1.95rem' }],      /* 20px */
        xl: ['1.375rem', { lineHeight: '2rem' }],        /* 22px lead */
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
          /* One master gold, sampled from the lotus artwork (#C89018).
             400 is the mark; 600/700 are the legible text tints on cream
             (5.2:1 / 7.4:1); 200/300 are the tints that read on dark sections. */
          50: '#FDF7E8',
          100: '#F8EDD2',
          200: '#F0DCA8',
          300: '#E0B75A',
          400: '#C89018',
          500: '#A8760F',
          600: '#8A6310',
          700: '#6E4E0C',
        },
        gold: {
          /* One master gold, sampled from the lotus artwork (#C89018).
             400 is the mark; 600/700 are the legible text tints on cream
             (5.2:1 / 7.4:1); 200/300 are the tints that read on dark sections. */
          50: '#FDF7E8',
          100: '#F8EDD2',
          200: '#F0DCA8',
          300: '#E0B75A',
          400: '#C89018',
          500: '#A8760F',
          600: '#8A6310',
          700: '#6E4E0C',
        },
        lotus: {
          /* One master gold, sampled from the lotus artwork (#C89018).
             400 is the mark; 600/700 are the legible text tints on cream
             (5.2:1 / 7.4:1); 200/300 are the tints that read on dark sections. */
          50: '#FDF7E8',
          100: '#F8EDD2',
          200: '#F0DCA8',
          300: '#E0B75A',
          400: '#C89018',
          500: '#A8760F',
          600: '#8A6310',
          700: '#6E4E0C',
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
        /* Shadows tinted with the forest hue, never pure black */
        soft: "0 1px 2px rgb(30 34 21 / 0.04), 0 8px 24px -12px rgb(30 34 21 / 0.12)",
        lift: "0 2px 4px rgb(30 34 21 / 0.04), 0 24px 48px -20px rgb(30 34 21 / 0.28)",
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
