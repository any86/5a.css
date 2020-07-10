const sass = require('node-sass');
const fs = require('fs');
const shell = require('shelljs');

const DIST_CSS_DIR = 'dist/css'; 
const DIST_CSS_FILE = `${DIST_CSS_DIR}/main.css`;
shell.mkdir('-p', DIST_CSS_DIR);
const out = sass.renderSync({
    file: `src/main.scss`,
    // sourceMap:true,
    // outFile: 'dist/main.css',
    outputStyle:'compressed'
});

fs.writeFileSync(DIST_CSS_FILE, out.css);
// fs.writeFileSync('dist/main.css.map', out.map);