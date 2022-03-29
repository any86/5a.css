import shell from 'shelljs';
import chalk from 'chalk';
shell.mkdir('-p', 'packages/5a.css/dist/fonts');
shell.cp('-Rf', 'node_modules/ionicons/dist/fonts/*', 'packages/5a.css/dist/fonts');
console.log(chalk.green('fonts复制完成, 等待后续操作....'));