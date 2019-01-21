export interface IArgs{
    setup:boolean;
    update:boolean;
    create:boolean;
    c:boolean; //编译
    compiler:boolean;
}

export class Core{
    static config:IArgs;
}

import * as __path from "path";
export const $path = require("path") as typeof __path;
import * as __fs from "fs";
export const fs = require("fs") as typeof __fs;
// export const $path = require("path");