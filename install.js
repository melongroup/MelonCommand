"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
async function doCommand(cmd) {
    return new Promise(resolve => {
        child_process_1.exec(cmd, { encoding: 'buffer' }, (error, stdout) => {
            // let err = new TextDecoder("gbk").decode(stdout);
            resolve([error, stdout]);
        });
    });
}
async function setup() {
    let root = process.env.APPDATA + "\\npm\\";
    //await doCommand("xcopy \\\\192.168.1.4\\webgl\\melon\\* " + root + " /s /e /h /r /k /y /d");
    console.log(process.env);
}
setup();
//# sourceMappingURL=Install.js.map