const fs = require('fs');
const mime = require('mime-types')

/**
 * 文件转base64
 * @param {String} 文件路径
 * @returns {String} 文件base64 
 */
function genBase64(fontUrl) {
    const font = fs.readFileSync(fontUrl);
    const data = Buffer.from(font).toString('base64');
    return 'data:' + mime.lookup(fontUrl) + ';base64,' + data;
}

module.exports.genFontCss = (fontUrl) => `
        @font-face {
            font-family: "Ionicons";
            src:url("${genBase64(fontUrl)}");
            font-weight: normal;
            font-style: normal;
        }
    `;
module.exports.genBase64 = genBase64;