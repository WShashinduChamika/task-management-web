import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    fontFamily: {
      sans: ['var(--font-inter)'],
      'ubuntu-mono': ['"Ubuntu Mono"', 'monospace']
    },
    extend: {
      fontSize: {
        '5xl': [
          '3rem',
          {
            lineHeight: '3.75rem',
            letterSpacing: '-0.02em'
          }
        ],
        '4xl': [
          '2.25rem',
          {
            lineHeight: '2.75rem',
            letterSpacing: '-0.02em'
          }
        ],
        '3xl': [
          '1.875rem',
          {
            lineHeight: '2.375rem'
          }
        ],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '2rem'
          }
        ],
        xl: [
          '1.25rem',
          {
            lineHeight: '1.875rem'
          }
        ],
        lg: [
          '1.125rem',
          {
            lineHeight: '1.75rem'
          }
        ],
        md: [
          '1rem',
          {
            lineHeight: '1.5rem'
          }
        ],
        base: [
          '0.875rem',
          {
            lineHeight: '1.25rem'
          }
        ],
        sm: [
          '0.75rem',
          {
            lineHeight: '1.125rem'
          }
        ],
        xs: [
          '0.625rem',
          {
            lineHeight: '1rem'
          }
        ]
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '600'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'flash-purple': {
          1: '#FCFCFE',
          2: '#F6F7FF',
          3: '#EDF0FF',
          4: '#E1E6FF',
          5: '#D3DAFF',
          6: '#C3CCFF',
          7: '#ADB7FF',
          8: '#9199FF',
          9: '#5E50FF',
          10: '#5142E4',
          11: '#5142E4',
          12: '#272271'
        },
        'flash-green': {
          1: '#F9FDF9',
          2: '#F3FBF2',
          3: '#DFFADB',
          4: '#CAF6C5',
          5: '#B5EFAF',
          6: '#9DE496',
          7: '#7DD476',
          8: '#48C140',
          9: '#27D51D',
          10: '#05C900',
          11: '#018400',
          12: '#1B4218'
        },
        'sage-green': {
          1: '#FAFCFA',
          2: '#F4FAF4',
          3: '#E1F8DF',
          4: '#CEF4CC',
          5: '#BBEBB9',
          6: '#A7DFA6',
          7: '#8FCD8E',
          8: '#6CBA6C',
          9: '#8DF48D',
          10: '#7CEB7D',
          11: '#407D40',
          12: '#284328'
        },
        'serene-teal': {
          1: '#F8FCFE',
          2: '#F1FAFD',
          3: '#E4F2F7',
          4: '#D8EBF2',
          5: '#CEE5ED',
          6: '#C2DEE9',
          7: '#B1D4E1',
          8: '#96C3D3',
          9: '#00171F',
          10: '#173039',
          11: '#426977',
          12: '#09232C'
        },
        'forest-green': {
          1: '#F9FEF9',
          2: '#F2FBF4',
          3: '#E2F8E6',
          4: '#CFF3D6',
          5: '#B9ECC4',
          6: '#9DE3AD',
          7: '#74D58E',
          8: '#4ABD6E',
          9: '#30A85B',
          10: '#1D9B4F',
          11: '#008136',
          12: '#0D3F1F'
        },
        'lemon-yellow': {
          1: '#FDFCF7',
          2: '#FFFBE3',
          3: '#FFEF6E',
          4: '#FFEF6E',
          5: '#FFE52D',
          6: '#F4D72A',
          7: '#E2C839',
          8: '#CFB100',
          9: '#FFE500',
          10: '#FFDB00',
          11: '#8D7700',
          12: '#453D14'
        },
        'cherry-red': {
          1: '#FEFBFB',
          2: '#FEF6F5',
          3: '#FEEAE7',
          4: '#FFDAD4',
          5: '#FFCBC4',
          6: '#FFBBB3',
          7: '#F7A69D',
          8: '#EE8B81',
          9: '#E13333',
          10: '#D21B23',
          11: '#D21F25',
          12: '#661715'
        },
        'ocean-blue': {
          1: '#FBFCFF',
          2: '#F5F8FF',
          3: '#EBF1FF',
          4: '#DDE7FF',
          5: '#CEDCFF',
          6: '#BCCEFF',
          7: '#A5BAFF',
          8: '#859EFF',
          9: '#0C0453',
          10: '#1D2470',
          11: '#485ABC',
          12: '#1E2572'
        },
        'stone-neutral': {
          0: '#FFFFFF',
          1: '#FAFBFD',
          2: '#F6F8FB',
          3: '#EDEFF4',
          4: '#E4E7ED',
          5: '#DCE0E7',
          6: '#D3D9E1',
          7: '#C7CED9',
          8: '#B2BBC8',
          9: '#0D1117',
          10: '#262A31',
          11: '#5C636E',
          12: '#1B2026'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        success: 'var(--ocean-blue-ocean-blue-1, #FBFCFF)',
        'success-border': 'var(--ocean-blue-ocean-blue-5, #CEDCFF)',
        'success-foreground': 'var(--ocean-blue-ocean-blue-11, #485ABC)',
        destructive: 'var(--cherry-red-cherry-red-1, #FEFBFB)',
        'destructive-border': 'var(--cherry-red-cherry-red-5, #FFCBC4)',
        'destructive-foreground': 'var(--cherry-red-cherry-red-11, #D21F25)',
        default: 'var(--forest-green-forest-green-1, #F9FEF9)',
        'default-border': 'var(--forest-green-forest-green-5, #B9ECC4)',
        'default-foreground': 'var(--forest-green-forest-green-11, #008136)',
        warning: 'var(--lemon-yellow-lemon-yellow-1, #FDFCF7)',
        'warning-border': 'var(--lemon-yellow-lemon-yellow-5, #FFE52D)',
        'warning-foreground': 'var(--lemon-yellow-lemon-yellow-11, #8D7700)',
        critical: {
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [tailwindcssAnimate, tailwindScrollbar({ nocompatible: true })]
};