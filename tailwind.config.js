/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
  theme: {
    extend: {},
  },
  // Desactiva preflight para evitar conflictos con los estilos base de Docusaurus (Infima)
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
