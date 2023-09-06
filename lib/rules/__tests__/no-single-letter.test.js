// import noSingleLetter from './no-single-letter'

const { RuleTester } = require('eslint');
// const rule = require('./index');
const rule = require('../no-single-letter')

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015, sourceType: 'module' } });

ruleTester.run('no-single-letter rule', rule, {
    valid: [
        {
            code: `import {chuck} from './norris'`,
        },
    ],

    invalid: [
        {
            code: `import * as chuck from './norris'`,
            errors: [{ message: 'Importing a namespace is not allowed.' }],
        },
    ],
});
