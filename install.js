
var root = process.env.APPDATA + "\\npm\\";
const { exec } = require('child_process');
async function doCommand(cmd) {
    return await new Promise(resolve => {
        exec(cmd, { encoding: 'buffer' }, (error, stdout) => {
            // let err = new TextDecoder("gbk").decode(stdout);
            resolve([error, stdout]);
        });
    });
}
doCommand("xcopy \\\\192.168.1.4\\webgl\\melon\\* "+root+" /s /e /h /r /k /y /d")