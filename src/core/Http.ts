import { RequestOptions, request } from "http";
import { File } from "./File";

export class Http {

    static toRequestOptions(url:string,data?:object){
        let _url = new URL(url);
        return{
            hostname:_url.hostname,
            path:_url.pathname ,
            port:_url.port,
            protocol:_url.protocol
        } as RequestOptions;
    }

    // static async toRequest(option:RequestOptions){
    //     return new Promise(resolve => {
    //         request(option,res =>{
    //             console.log(res);
    //             resolve(res);
    //         })
    //     });
    // }

    /**
     * 
     * @param url 
     * @param encode "binary" 'utf-8'
     * @param method "GET" "POST"
     * @param data 
     */

    static async request(url:string,encode = 'utf-8' ,method = "GET", headers = undefined, data = undefined){

        let option = Http.toRequestOptions(url,data);
        option.method = method;
        option.headers = headers;
        // {
        //     'Content-Type': 'application/octet-stream',  //数据格式为二进制数据流
        //     "Content-Length":"0",
        //     'Transfer-Encoding': 'chunked',  //传输方式为分片传输
        //     'Connection': 'keep-alive'    //这个比较重要为保持链接。
        // }

        // log(`method:${option.method} url:${url}`,"http");

        return new Promise(resolve => {
            let req = request(option,res =>{
                let{statusCode} = res;
                // log(`method:${option.method} code:${statusCode} url:${url}`,"http");
                if(statusCode >= 400){
                    resolve(undefined);
                }else{
                    // res.setEncoding(encode);
                    let buffers = [] as Buffer[];
                    res.on('data', data => {
                        buffers.push(data);
                    });
                    res.on("end",()=>{
                        let buffer = Buffer.concat(buffers);
                        // log(`method:${option.method} data:${buffer.length} url:${url}`,"http");
                        if(encode != "binary"){
                            resolve(buffer.toString(encode))
                        }else{
                            resolve(new Uint8Array(buffer));
                        }
                    });

                }
            })

            req.on('error', e=>{ 
                console.log(`method:${option.method} error:${e.message} url:${url}`);
            }); 

            req.end();
        });
    }

    static async downland(url:string,path:string,handler = undefined){
        
        if(!handler){
            handler = {
                "Accept-Language": "zh-CN,zh;q=0.9",
                "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36"
            }
        }
        
        let data = await Http.request(url,"binary","GET",handler) as Buffer;
        new File(path).write(data);
    }
}