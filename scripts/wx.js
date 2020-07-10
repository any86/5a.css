const sass = require('node-sass');
const fs = require('fs');
const rimraf = require('rimraf');
const mime = require('mime-types')
const ICON_CSS_PATH = 'node_modules/ionicons/dist/scss/ionicons.scss';
const FONT_URL = 'node_modules/ionicons/dist/fonts/ionicons.ttf';
const DIST = './dist/wx/';
const {
    genFontCss
} = require('./iconToDataURL');

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

function replaceBase64() {
    const RULE = /@font-face[\s\S]*}[\s\S]*\.ion/;
    const font = fs.readFileSync(ICON_CSS_PATH, 'utf8');
    const newCss = font.replace(RULE, `@font-face {font-family: "Ionicons"; src: url('${genBase64(FONT_URL)}');} \r\n\r\n.ion`);
    return newCss;
}

// fs.writeFileSync('./dist/main.css', replaceBase64());
let fileNames = fs.readdirSync('./src/components');
fileNames.forEach(name => {
    if (name.includes('.scss')) {
        const componentName = name.replace(/_|.scss/g, '');
        renderToWXSS(componentName);
    }
});

function renderToWXSS(componentName) {
    const result = sass.renderSync({
        file: `./src/components/_${componentName}.scss`,
        outFile: `${DIST}${componentName}.wxss`,
        // outputStyle: 'compressed',
        // sourceMap: true,
        importer: [(url, prev) => {
            if ('icon' === componentName) {
                // 第一次运行
                if (url.includes('ionicons-common')) {
                    return {
                        contents: genFontCss(FONT_URL) + fs.readFileSync(url, 'utf8')
                    }
                };
                return {
                    contents: fs.readFileSync(url, 'utf8')
                }
            }
            return null;
        }]

    });
    try {
        fs.statSync('./dist/');
    } catch {
        fs.mkdirSync('./dist/');
    }
    try {

        fs.statSync(DIST);
    } catch (error) {
        fs.mkdirSync(DIST);
    }

    fs.writeFileSync(`${DIST}${componentName}.wxss`, result.css);
}