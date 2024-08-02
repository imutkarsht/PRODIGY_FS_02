/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs"],
  safelist: [
    'text-green-500',
    'text-red-500',
    'border-red-500',
    'border-zinc-200',
    'border-4'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}