import { getTSConfig, getCompilerFiles } from "./Core";
import { File } from "./File";

export function referenceJs(){
    var ts = getTSConfig();

    if(!ts){
        return;
    }

    let list = getCompilerFiles(ts);
    console.log(list);

    if(ts.templete){
        let file = new File(ts.root).resolvePath(ts.templete);
        let contents = "";
        if(file.exists){
            let len = list.length;
            for(let i = 0;i<len;i++){
                let filename = list[i];
                filename = filename.replace(".ts", ".js");
                filename = filename.replace("src/", "");
                contents += "        <script src='" + filename + "'></script>\r\n";
            }
            let str = file.readUTF8();
            let s1 = "<!--auto-->";
            let s2 = "<!--autoend-->";
            let si = str.indexOf(s1);
            let se = str.indexOf(s2);
            if(si == -1 || se == -1){
                return;
            }
            str = str.replace(str.slice(si,se+s2.length),`${s1}\n${contents}        ${s2}`);

            let out = new File(ts.root).resolvePath(ts.compilerOptions.outDir+"index.html");
            out.writeUTF8(str);
        }
    }
}