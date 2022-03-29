import sass from 'sass';
import fs from 'fs';
import shell from 'shelljs';
import path from 'path';



// 打包
build('packages/5a.css/src/main.scss', 'packages/5a.css/dist/css/5a.css');
build('packages/reset/src/reset.scss', 'packages/reset/dist/reset.css');
build('packages/helpers/src/helpers.scss', 'packages/helpers/dist/helpers.css');

/**
 * 生成css文件
 * @param {String} 文件名不包含扩展名 
 */
function build(file, outFile) {
    shell.mkdir('-p', path.dirname(outFile));
    const out = sass.compile(file, {
        sourceMap: true,
        style: 'compressed'
    });
    // console.log(Object.keys(out));
    fs.writeFileSync(outFile, out.css);
    fs.writeFileSync(`${outFile}.map`, JSON.stringify(out.sourceMap));
}



