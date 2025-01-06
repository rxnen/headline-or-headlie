module.exports = {
    // ...
    webpack: {
      alias: { /* ... */ },
      plugins: {
        add: [ /* ... */ ],
        remove: [ /* ... */ ],
      },
      configure: {
        experiments: {
            topLevelAwait: true,
          },
          module:{
            rules: [{
                test: /\.wasm$/,
                type: 'javascript/auto',
            }]
          },
      },
      configure: (webpackConfig, { env, paths }) => {
        /* ... */
        return webpackConfig;
      },
    },
  };