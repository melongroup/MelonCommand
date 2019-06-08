"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function doCommand(cmd) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            child_process_1.exec(cmd, { encoding: 'buffer' }, (error, stdout) => {
                // let err = new TextDecoder("gbk").decode(stdout);
                resolve([error, stdout]);
            });
        });
    });
}
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        var isWin = /^win/.test(process.platform);
        if (isWin) {
            let root = process.env.APPDATA + "\\npm\\";
            console.log(root);
            yield doCommand("xcopy bin-release\\* " + root + " /s /e /h /r /k /y /d");
        }
    });
}
setup();
//# sourceMappingURL=Install.js.map