/**
 * Provides a testsuite runner to be able to run the same testsuite on Node and in the browser.
 */
declare class TestsuiteRunner {
    /**
     * @param {object}   tests - The test modules which have an accessible run function.
     */
    constructor(tests: object);
    _tests: any;
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
     * @param {Function[]}  [options.chaiUse] - Additional modules for chai setup via `chai.use(<module>)`.
     *
     * @param {object}      [options.options] - Additional options to pass to the testsuite.
     */
    run({ Module, data, mochaOptions, chaiUse, ...options }: {
        Module: object;
        data?: object;
        mochaOptions?: object;
        chaiUse?: Function[];
        options?: object;
    }): void;
}

export default TestsuiteRunner;
