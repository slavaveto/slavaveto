import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
               // Светлая тема
        light: {
          background: '#ffffff', // Фон светлой темы
          text: '#212936', // Текст светлой темы
        },
        // Тёмная тема
        dark: {
          background: '#1e2329', // Фон тёмной темы
          text: '#a7adba', // Текст тёмной темы
        },

        headerLight: '#e5e6e6', // Фон для светлой темы
        headerDark: '#16191e', // Фон для тёмной темы
      },

      screens: {
        xs375: '376px', // Extra Small
        xs390: '391px',
        xs414: '415px',
        xs450: '451px',
      },

      maxWidth: {
        'custom': '450px', // Ваша максимальная ширина
        'xs2': '280px', // Для маленьких экранов
      },

    },
  },
  plugins: [nextui()],

} satisfies Config;