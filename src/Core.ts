export interface IArgs{
    setup:boolean;

    v:boolean;
    version:boolean;
    
    u:boolean;
    update:boolean;

    create:boolean;

    c:boolean; //编译
    compiler:boolean;
}

export class Core{
    static config:IArgs;
    static remotePath = "\\\\192.168.1.4\\webgl\\melon\\"
}

import * as __path from "path";
export const $path = require("path") as typeof __path;

import * as __fs from "fs";
export const fs = require("fs") as typeof __fs;

import * as __exec from "child_process";
const { exec } = require('child_process') as typeof __exec;

export async function doCommand(cmd:string){
    return await new Promise(resolve => {
        exec(cmd, { encoding: 'buffer' }, (error, stdout) => {
            // let err = new TextDecoder("GBK").decode(stdout);
            resolve([error,stdout])
        });
    });
}