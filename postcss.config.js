module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    'postcss-normalize',
    process.env.NODE_ENV === 'production' && [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './src/**/*.{js,jsx,ts,tsx}',
          './public/index.html',
        ],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        safelist: [
          /^MuiBox/,
          /^MuiCard/,
          /^MuiButton/,
          /^MuiTypography/,
          /^MuiContainer/,
          /^recharts/,
        ],
      },
    ],
  ].filter(Boolean),
};