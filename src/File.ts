import { fs, $path } from "./Core";

export class File extends rf.FileReference{

    get exists(){
        return fs.existsSync(this.nativePath);
    }

    isFile(){
        if(this.exists == false){
            return false;
        }
        let states = fs.statSync(this.nativePath);
        return states.isFile();
    }

    get parent(){
        let path = $path.dirname(this.nativePath)+"/";
        // let{nativePath} = this;
        // let i = nativePath.lastIndexOf("/",nativePath.length-2);
        // if(i == -1){
        //     return undefined;
        // }
        // nativePath = nativePath.slice(0,i);
        return new File(path);
    }


    read(){
        return fs.readFileSync(this.nativePath);
    }

    readUTF8(type:string = "utf8"):string{
        return fs.readFileSync(this.nativePath,type);
    }

    mkdir(){
        if(this.exists == false){
            this.parent.mkdir();
            fs.mkdirSync(this.nativePath);
        }
    }

    write(buf:Uint8Array){
        let f = new File($path.dirname(this.nativePath)+"/");
        if(f.exists == false){
            f.mkdir();
        }
        fs.writeFileSync(this.nativePath,buf);
    }

    writeUTF8(value:string){
        this.write(rf.byte_encodeUTF8(value));
        return this;
    }


    getDirectoryListing():File[]{
        if(false == this.exists){
            return undefined;
        }
        let path = this.nativePath;
        if(this.isFile() == true){
            path = $path.dirname(path)+"/";
        }

        let files = fs.readdirSync(path);

            
        let result = [];
        // $fs.readdir(path,(err,files)=>{
        files.forEach(file => {
            result.push(new File(path + file));
        });
        // })
        return result;
    }


    resolvePath(path:string){
        var f:File;
        if(this.isFile() == true){
            f = this.parent;
        }else{
            f = this;
        }
        return new File(this.join(f.nativePath , path));
    }


    getAllFiles():File[]{

        if(false == this.exists){
            return undefined;
        }

        let path = this.nativePath;
        if(this.isFile() == true){
            path = $path.dirname(path)+"/";
        }

        let result:File[] = [];
        let files = fs.readdirSync(this.nativePath);

        files.forEach(file => {
            let f = new File(path + file);
            if(false == f.isFile()){
                result = result.concat(f.getAllFiles());
            }else{
                result.push(f);
            }
        });

        return result;
    }


    copyto(to:File){

        if(to.exists == false){
            let mk:File
            if(to.name.indexOf(".") == -1){
                mk = to;
            }else{
                mk = to.parent;
            }
            mk.mkdir();
        }

        // if(typeof fs.promises != "undefined"){
        //     // fs.copyto(this.nativePath, to)
        //     fs.copyFileSync(this.nativePath, to);
        // }else{
        to.write(this.read());
        // }

        
    }

    moveto(to:File){
        this.copyto(to);
        fs.unlinkSync(this.nativePath);
    }

    delete(){
        fs.unlinkSync(this.nativePath);
    }



}