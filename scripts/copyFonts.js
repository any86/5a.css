const shell = require('shelljs');
const chalk = require('chalk');

shell.mkdir('-p','dist/fonts');
shell.cp('-Rf', 'node_modules/ionicons/dist/fonts/*', 'dist/fonts');
console.log(chalk.green('fonts复制完成, 等待后续操作....'));