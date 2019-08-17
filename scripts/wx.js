const sass = require('node-sass');
const fs = require('fs');
const mime = require('mime-types')
const ICON_CSS_PATH = 'node_modules/ionicons/dist/scss/ionicons.scss';
const FONT_URL = 'node_modules/ionicons/dist/fonts/ionicons.ttf';

/**
 * 文件转base64
 * @param {String} 文件路径
 * @returns {String} 文件base64 
 */
function genBase64(url) {
    const font = fs.readFileSync(url);
    const data = Buffer.from(font).toString('base64');
    return 'data:' + mime.lookup(url) + ';base64,' + data;
}

function replaceBase64(){
    const RULE = /@font-face[\s\S]*}[\s\S]*\.ion/;
    const font = fs.readFileSync(ICON_CSS_PATH, 'utf8');
    const newCss = font.replace(RULE, `@font-face {font-family: "Ionicons"; src: url('${genBase64(FONT_URL)}');} \r\n\r\n.ion`);
    return newCss;
}

// fs.writeFileSync('./dist/main.css', replaceBase64());


const result = sass.renderSync({
    file: './src/main.scss',
    outFile: './dist/main.css',
    // outputStyle: 'compressed',
    // sourceMap: true,
    importer: [(url, prev) => {
        if (-1 !== ICON_CSS_PATH.indexOf(url)) {
            return {
                contents: replaceBase64()
            };
        }
        return null;
    }]
});

try {
    const stat = fs.statSync('./dist');
} catch (error) {
    fs.mkdirSync('./dist');
}

fs.writeFileSync('./dist/main.css', result.css);

// console.log(result)

