
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neon: '#00EEFF',
				purple: '#9D4EDD',
				dark: {
					100: '#2A2A3A',
					200: '#1E1E2A',
					300: '#121212',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'glow': {
					'0%, 100%': { 
						textShadow: '0 0 5px hsl(var(--primary)), 0 0 15px hsl(var(--primary))',
						opacity: '0.8'
					},
					'50%': { 
						textShadow: '0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))', 
						opacity: '1'
					},
				},
				'text-reveal': {
					'0%': { 
						maxWidth: '0',
					},
					'100%': {
						maxWidth: '100%',
					},
				},
				'pulse-neon': {
					'0%, 100%': { 
						boxShadow: '0 0 5px 2px rgba(0, 238, 255, 0.7)',
					},
					'50%': {
						boxShadow: '0 0 20px 2px rgba(0, 238, 255, 0.3)',
					},
				},
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'typing': {
					from: { width: '0' },
					to: { width: '100%' },
				},
				'blink': {
					'50%': { borderColor: 'transparent' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'text-reveal': 'text-reveal 1s ease forwards',
				'pulse-neon': 'pulse-neon 2s infinite',
				'bounce-soft': 'bounce-soft 3s ease-in-out infinite',
				'typing': 'typing 3.5s steps(40, end) forwards',
				'blink': 'blink 0.7s step-end infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
