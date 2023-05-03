import path from 'path';

// The deploy path for the distribution for browser & Node.
const s_DIST_PATH_BROWSER = './dist/browser';

export default () =>
{
   return [{     // This bundle is for the browser distribution.
         input: ['src/browser/TestsuiteRunner.js'],
         output: [{
            file: `${s_DIST_PATH_BROWSER}${path.sep}TestsuiteRunner.js`,
            format: 'es',
            generatedCode: { constBindings: true },
            sourcemap: true
         }]
      }
   ];
};
