/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs"],
  safelist: [
    'text-green-500',
    'text-red-500',
    'border-red-500',
    'border-zinc-200',
    'border-4',
    'from-white',
    'to-zinc-200'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}