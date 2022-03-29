import  sass from 'sass';
// const path = require('path');

// const result = sass.compileString(`

// `);


const result = sass.compile(`test.scss`);

console.log(result.css);