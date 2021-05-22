import chai                  from '../../lib/chai.js';
import chaiAsPromised        from '../../lib/chai-as-promised.js';
import mocha                 from '../../lib/mocha.js';

import mochaConsoleLog       from './mochaConsoleLog.js';

chai.use(chaiAsPromised);

const s_DEFAULT_MOCHA_OPTIONS = {
   timeout: '10000',
   ui: 'bdd'
};

/**
 * Provides a testsuite runner to be able to run the same testsuite on Node and in the browser.
 */
export default class TestsuiteRunner
{
   /**
    * @param {object}   tests - The test modules which have an accessible run function.
    */
   constructor(tests)
   {
      if (typeof tests !== 'object') { throw new TypeError(`'tests' must be an object.`); }

      this._tests = tests;
   }

   /**
    * Run the stored tests against the given ES Module.
    *
    * @param {object}      options - Options parameters.
    *
    * @param {object}      options.Module - The ES Module to test.
    *
    * @param {object}      [options.data] - Optional data to pass to testsuite.
    *
    * @param {object}      [options.mochaOptions] - Specific options for Mocha.
    *
    * @param {function[]}  [options.chaiUse] - Additional modules for chai setup via `chai.use(<module>)`.
    *
    * @param {object}      [options.options] - Additional options to pass to the testsuite.
    */
   run({ Module, data = {}, mochaOptions = void 0, chaiUse = [], ...options })
   {
      if (typeof data !== 'object') { throw new TypeError(`'data' must be an object.`); }
      if (!Array.isArray(chaiUse)) { throw new TypeError(`'chaiUse' must be an array.`); }
      if (mochaOptions !== void 0 && typeof mochaOptions !== 'object')
      {
         throw new TypeError(`'mochaOptions' must be an object.`);
      }

      for (const chaiAddon of chaiUse)
      {
         chai.use(chaiAddon);
      }

      mocha.setup(Object.assign({}, s_DEFAULT_MOCHA_OPTIONS, mochaOptions || {}));

      mocha.checkLeaks();

      const testOptions = Object.assign({ Module, data, chai }, options);

      for (const test in this._tests)
      {
         if (this._tests.hasOwnProperty(test))
         {
            this._tests[test].run(testOptions);
         }
      }

      mochaConsoleLog(mocha.run());
   }
}
