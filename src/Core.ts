export interface IArgs{
    setup:boolean;

    v:boolean;
    version:boolean;
    
    u:boolean;
    update:boolean;

    create:boolean;

    release:boolean;
}


export interface TSCompilerOptions{
    target:string;
    module:string;

    outDir:string;
    rootDir:string;
    outFile:string;

    lib:string[];

    sourceMap:boolean;
    declaration:boolean;
}

export interface TSConfigOptions{
    root:string;
    compilerOptions:TSCompilerOptions;
    include:string[];
    exclude:string[];
    templete:string;
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
import { File } from "./File";
const { exec } = require('child_process') as typeof __exec;

export async function doCommand(cmd:string){
    return await new Promise(resolve => {
        exec(cmd, { encoding: 'buffer' }, (error, stdout) => {
            let err:string;
            try {
                err = new TextDecoder("GBK").decode(stdout);
            } catch (error) {
                err = rf.byte_decodeUTF8(stdout);
            }
            resolve([error,err])
        });
    });
}


export function getTSConfig(){
    function removeComments(content:string){
        var reg1 = /\/\/.*/g;
        var r=content.replace(reg1, '');
        var reg2 = /\/\*[\s\S]*?\*\/[^\*]/g;
        r = r.replace(reg2, '');
        return r;
    }

    let tsconfig = new File($path.resolve("tsconfig.json"));

    if(tsconfig.exists){
        try {
            let ts = JSON.parse(removeComments(tsconfig.readUTF8())) as TSConfigOptions;
            ts.root = new File($path.resolve("")).nativePath;
            return ts;
        } catch (error) {
            console.log(error);
        }
    }

    console.log("cann't find 'tsconfig.json'")

    return undefined;
}


export var referenceMatch = /\/\/\/ <reference path=\"(.*?)\"/g;


export function getReference(files:File[],ts:TSConfigOptions) {
    referenceMatch = /reference path=\"(.*?)\"/;
    var fileobj = {};
    var reference:string[] = [];
    for (var i = 0; i < files.length; i++) {
        var relativepath = files[i];
        var content = relativepath.readUTF8();
        var arr = fileobj[relativepath.nativePath] = [];
        while (true) {
            var match = referenceMatch.exec(content);
            if (match) {
                content = content.replace(match[0], "");
                let filepath =  relativepath.resolvePath(match[1]);
                arr.push(filepath);
            }else{
                break;
            }
        }
    }

    var key;

    var processes = [];
    function process(arr:File[]) {
        for (var i = 0; i < arr.length; i++) {
            let f = arr[i];
            var key = f.nativePath;
            if (processes.indexOf(key) == -1) {
                processes.push(key);
                if (reference.indexOf(key) == -1) {
                    if (undefined != fileobj[key]) {
                        process(fileobj[key]);
                    }
                    reference.push(key.replace(ts.root,""));
                }
            }
        }
    }

    process(files);

    return reference;
};


export function compiler_checkAvailable(target:string,assets:string[]){
    var file;
    target = target.toLocaleLowerCase();
    for(file of assets){
        var i = target.indexOf(file[0]);
        if(i == -1){
            continue;
        }

        if(file[1] == 1){
            return true;
        }
        var path = target.slice(i+1);
        if(path.lastIndexOf("/") == -1){
            return true;
        }
    }
    return false;
}


export function getCompilerFiles(ts:TSConfigOptions){
    let{compilerOptions,include,exclude} = ts;
    function formatAssets(assets:string[]){
        var r = [];
        var i
        var file
        for (file of assets) {
            i = file.indexOf("/**/*");
            if(i != -1){
                r.push([$path.resolve(file.slice(0,i+1)).replace(/\\/g,"/").toLowerCase(),1]);
            }else{
                if((i = file.lastIndexOf("*")) == file.length-1){
                    r.push([$path.resolve(file.slice(0,i)).replace(/\\/g,"/").toLowerCase(),2]);
                }else{
                    r.push([(file).replace(/\\/g,"/").toLowerCase(),3]);
                }
            }
        }
        return r;
    }


    

    ts.exclude = exclude = formatAssets(exclude);
    let list =  new File(ts.root).resolvePath(compilerOptions.rootDir).getAllFiles();
    let result:File[] = [];
    list.forEach(element => {
        if(element.extname == ".ts"){
            var b = compiler_checkAvailable(element.nativePath,exclude);
            if(false == b){
                result.push(element);
            }
        }
    });

    return getReference(result,ts);
}


export function loger(msg:string){
    console.log(msg);
}