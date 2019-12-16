import { File } from "../core/File";
import { getTSConfig, Core, getPackageJson } from "../core/Core";
import { forarr } from "../core/Attibute";

export function combinedts() {

    let config = getTSConfig();

    if (!config) {
        return;
    }

    let p = getPackageJson();

    if (!p) {
        return;
    }



    let file = Core.cmdPath.resolvePath(config.compilerOptions.outDir);

    if (file.exists == false) {
        return;
    }

    let files = file.getAllFiles(".ts");
    let str = "";
    let reg = /[import|export](.*?)from.*?\"\;/g;
    let reg2 = /export declare/g
    forarr(files, (v, i) => {
        let codestr = v.readUTF8();
        codestr = codestr.replace(reg, "");
        codestr = codestr.replace(reg2, "export");
        str += codestr + "\n";
        return true;
    })

    // file = files[0];
    // let codestr = file.readUTF8();


    str = `declare module '${p.name}' {\n${str}}`


    console.log(str);




    // o = codestr.match(reg);

    // getTSConfig().compilerOptions.outDir

    // let path = "E:/workspace/engine_es6/dest/"

    // let file = new File(path);
    // if(file.exists == false){
    //     return;
    // }

    // 


}