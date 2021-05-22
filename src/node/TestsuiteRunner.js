import chai                from 'chai';
import chaiAsPromised      from 'chai-as-promised';

chai.use(chaiAsPromised);

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
    * @param {function[]}  [options.chaiUse] - Additional modules for chai setup via `chai.use(<module>)`.
    *
    * @param {object}      [options.options] - Additional options to pass to the testsuite.
    */
   run({ Module, data = {}, chaiUse = [], ...options })
   {
      if (typeof data !== 'object') { throw new TypeError(`'data' must be an object.`); }
      if (!Array.isArray(chaiUse)) { throw new TypeError(`'chaiUse' must be an array.`); }

      for (const chaiAddon of chaiUse)
      {
         chai.use(chaiAddon);
      }

      const testOptions = Object.assign({ Module, data, chai }, options);

      for (const test in this._tests)
      {
         if (this._tests.hasOwnProperty(test))
         {
            this._tests[test].run(testOptions);
         }
      }
   }
}
