import { File } from "../core/File";
import { amf_readObject } from "../core/AMF3";


export function getzhcnword(str: string) {

    // let file = new File("d:/A.ts");

    // str = file.readUTF8();

    let list = [] as IZhcnData[];

    // console.log(str);
    let reg = /"[^"]*"|'[^']*'|\`[^\`]*\`\1?/g
    let zhcn = /[\u4e00-\u9fa5]/
    while (true) {
        let o = reg.exec(str);
        if (!o) {
            break;
        }

        let v = o[0];
        let b = zhcn.exec(v) != undefined;
        if (b) {
            list.push({ index: o.index, value: v })
        }
        console.log(o.index, b, o[0]);

    }

    return list;
}



export function getCodeChinease(path: string) {

    let list = [];
    let file = new File(path);

    if (file.isDirectory()) {
        let files = file.getAllFiles(".ts", -1);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            list = list.concat(getzhcnword(file.readUTF8()));
        }
    }



    let str = "";

    for (let i = 0; i < list.length; i++) {
        str += list[i].value + "\n";
    }

    console.log(str);

}


export function getDatChinease(path: string) {

    let list = {};
    let file = new File(path);
    let zhcn = /[\u4e00-\u9fa5]/

    if (file.isDirectory()) {
        let files = file.getAllFiles(".dat", -1);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let o = file.readObject();
            getZhcnValue(o);
        }
    }



    function getZhcnValue(o: any) {

        if(typeof o == "number"){
            return;
        }

        if (typeof o == "string"){
            let b = zhcn.exec(o) != undefined;
            if (b) {
                list[o] = o;
            }
            return;
        }

        if(o instanceof ArrayBuffer){
            o = amf_readObject(o);
            getZhcnValue(o);
            return;
        }

        for (const key in o) {
            getZhcnValue(o[key])
        }
    }



    let str = "";

    for (const key in list) {
        str += key +"\n"
    }


    console.log(str);



}