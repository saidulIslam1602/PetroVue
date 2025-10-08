module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
        },
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false, // Let webpack handle modules
        shippedProposals: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic', // React 17+ JSX transform
        development: process.env.NODE_ENV === 'development',
      },
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
  ],
  plugins: [
    // Modern JavaScript features
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    
    // Runtime optimizations
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],

    // React optimizations
    process.env.NODE_ENV === 'development' && 'react-refresh/babel',
    
    // Bundle optimization
    process.env.NODE_ENV === 'production' && [
      'babel-plugin-transform-react-remove-prop-types',
      {
        mode: 'unsafe-wrap',
      },
    ],

    // Import optimizations for Material-UI
    process.env.NODE_ENV === 'production' && [
      'babel-plugin-import',
      {
        libraryName: '@mui/material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'mui-core',
    ],

    process.env.NODE_ENV === 'production' && [
      'babel-plugin-import',
      {
        libraryName: '@mui/icons-material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'mui-icons',
    ],
  ].filter(Boolean),

  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
            modules: 'commonjs',
          },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
      ],
    },
    production: {
      plugins: [
        'babel-plugin-dev-expression',
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements',
      ],
    },
  },
};