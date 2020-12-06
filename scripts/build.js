const sass = require('node-sass');
const fs = require('fs');
const shell = require('shelljs');
const copyFonts = require('./copyFonts');
const path = require('path');
// 打包
build('packages/5a.css/src/main.scss', 'packages/5a.css/dist/css/5a.css');
build('packages/helpers/src/helpers.scss', 'packages/helpers/dist/helpers.css');

/**
 * 生成css文件
 * @param {String} 文件名不包含扩展名 
 */
function build(file,outFile) {
    shell.mkdir('-p', path.dirname(outFile));
    const out = sass.renderSync({
        file,
        sourceMap: true,
        outFile,
        outputStyle: 'compressed'
    });

    fs.writeFileSync(outFile, out.css);
    fs.writeFileSync(`${outFile}.map`, out.map);
}



