/**
 * Instruments a Mocha runner with the Spec reporter with a modification to force color usage in the browser.
 *
 * The `consoleLog` function is also modified to prepend `[MOCHA]` for all Mocha output.
 *
 * When the Mocha runner finishes all tests a message [MOCHA_END_PASSED] or [MOCHA_END_FAILED] is output to the console.
 *
 * @param {object}   runner - Mocha runner.
 *
 * @param {boolean}  [useColors=true] - Output console colors.
 */
export default function mochaConsoleLog(runner, useColors = true)
{
   /* eslint-disable no-undef */
   Mocha.reporters.Spec.super_.consoleLog = (...args) => { console.log('[MOCHA]', ...args); };
   Mocha.reporters.Spec.super_.useColors = useColors;

   new Mocha.reporters.Spec(runner);

   let failed = false;

   runner.once('fail', () =>
   {
      failed = true;
   });

   runner.once('end', () =>
   {
      console.log(`[MOCHA_END_${failed ? 'FAILED' : 'PASSED'}]`);
   });
}
