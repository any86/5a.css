const sass = require('node-sass');
const chalk = require('chalk');
const fs = require('fs');
const shell = require('shelljs');

// 打包
build('main');
build('helpers');

/**
 * 生成css文件
 * @param {String} 文件名不包含扩展名 
 */
function build(fileName){
    const DIST_CSS_DIR = 'dist/css'; 
    shell.mkdir('-p', DIST_CSS_DIR);
    const out = sass.renderSync({
        file: `src/${fileName}.scss`,
        sourceMap:true,
        outFile: `dist/${fileName}.css`,
        outputStyle:'compressed'
    });
    
    const DIST_CSS_FILE = `${DIST_CSS_DIR}/${fileName}.css`;
    fs.writeFileSync(DIST_CSS_FILE, out.css);
    fs.writeFileSync(`${DIST_CSS_FILE}.map`, out.map);
}



