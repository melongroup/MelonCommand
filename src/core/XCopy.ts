import { File, __fs } from "./File";


export function xNodeCopy(from:File | string,to:File | string){

    if(typeof from == "string"){
        from = new File(from);
    }

    if(typeof to == "string"){
        to = new File(to);
    }
    
    if(from.isFile()){
        return xCopyFile(from,to);
    }

    let diffCount = 0;

    let files = from.getAllFiles(undefined,100);
    let fromPath = from.nativePath;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let toFile = to.resolvePath(file.nativePath.replace(fromPath,""));
        diffCount += xCopyFile(file,toFile);
    
    }

    return diffCount;

}

export function xCopyFile(from:File,to:File){
    if(from.isFile() == false){
        return 0;
    }

    if(false == to.exists){
        from.copyto(to);
        return 1;
    }

    let fromTime = __fs.statSync(from.nativePath).mtimeMs;
    let toTime = __fs.statSync(to.nativePath).mtimeMs;

    if(fromTime != toTime){
        from.copyto(to);
        return 1;
    }
    
    return 0;
}


