module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{html,tsx}',
    './src/components/**/*.{html,tsx}',
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      boxShadow: {
        'ct': '0px 2px 4px rgb(0 0 0 / 5%)',
      }
    }
  }  
}
