/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			gold: {
  				'50': '#fff9e6',
  				'100': '#fff2cc',
  				'200': '#ffe699',
  				'300': '#ffd966',
  				'400': '#ffcc33',
  				'500': '#FFD700',
  				'600': '#e6c200',
  				'700': '#b39700',
  				'800': '#806d00',
  				'900': '#4d4200'
  			},
  			dark: {
  				'50': '#f5f5f5',
  				'100': '#ebebeb',
  				'200': '#d6d6d6',
  				'300': '#adadad',
  				'400': '#858585',
  				'500': '#5c5c5c',
  				'600': '#333333',
  				'700': '#1a1a1a',
  				'800': '#0d0d0d',
  				'900': '#000000'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			]
  		},
  		backgroundColor: {
  			primary: '#0a0a0a',
  			secondary: '#1a1a1a'
  		},
  		textColor: {
  			gold: '#FFD700',
  			light: '#f5f5f5'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  darkMode: ['class', "class"],
  plugins: [require("tailwindcss-animate")],
}
