import { build } from "./build/Build";
import { createProject } from "./compiler/Create";
import { referenceJs } from "./compiler/Index";
import { publishProject, releaseProject } from "./compiler/Publish";
import { ConfigUtil } from "./core/ConfigUtil";
import { Core, fullproperty, IArgs } from "./core/Core";
import { LOG_COLOR } from "./core/Debug";
import { File } from "./core/File";
import { tiled_parser } from "./tiled/Tiled";
import { checkVersion, updateEngine, updateVersion } from "./update/Update";
import { combinedts } from "./compiler/CombineDTS";
import { AmfTSource } from "./crack/JsonSource";
import { TexturePack } from "./utils/TexturePack";



// function convertParam(str:string){
//     while(str.charAt(0) == "-"){
//         str = str.slice(1);
//     }
//     return str;
// }

// function convertArgv(argv:string[]){
//     var o = {params:[]};
//     for (let i = 2; i < argv.length; i++) {
//         const key = argv[i];
//         let convertKey = convertParam(key)
//         if(key.indexOf("--") == 0){
//             let value = argv[i+1];
//             if(value && value.indexOf("-") != 0){
//                 o[convertKey] = value;
//                 i += 1;
//             }else{
//                 o[convertKey] = true;
//             }
//         }else{
//             o[convertKey] = true;
//             o.params.push(convertKey);
//         }
//     }
//     return o;
// }


async function main(){

    // console.log(await getBranch());

    // removeComments("http://127.0.0.1/project/\n//12345")


    /*

    let from = new File("D:/workspace/arcHero/com/demo/813/a/");

    let list = from.getAllFiles(".atlas");

    for (let i = 0; i < list.length; i++) {
        const file = list[i];

        await packAnimation(file,{fps:24}) 
    }

    // packImage(from,from)

    // packAnimation(from,{fps:24})

    // console.log(process.env);


    

    return;
*/

    var config = Core.config = ConfigUtil.ConvertArgv(process.argv) as IArgs;

    fullproperty(config,Core.globalConfig);
    

    await Core.setup();


    let needUpdateVersion = checkVersion();




    // getCodeChinease("D:/workspace/jianghu/jianghu/src/");

    // getDatChinease("D:/workspace/jianghu/conf/zhcn/trunk/")

    // AmfTSource.filterTsource(Core.cmdPath)

    // AmfTSource.txtToBin();


    if(config.texturePack){
        TexturePack.packByCommand();
        return;
    }


    // TexturePack.pack({pngPath:`D:/workspace/a/a/`});

    // return;
    

    if(config.setup){
        if(needUpdateVersion){
            await updateVersion();
        }else{
            console.log("it's last version now") 
        }

        return;
    }

    if(needUpdateVersion){
        console.log(`find new Melon version! type '${LOG_COLOR.GREEN}melon setup${LOG_COLOR.WHITE}' to update`);
    }


    if(config.cdts){
        combinedts();
        return;
    }


    if(config.u || config.update){
        await updateEngine();
        return;
    }



    if(config.tiled){
        await tiled_parser();
        return;
    }



    if(config.v || config.version){
        let version = new File(process.env.APPDATA + "\\npm\\node_modules\\melon\\version.txt").readUTF8().trim();
        console.log("version:"+version);
        return;
    }
    
    if(config.create || config.c){
        await createProject();
        return;
    }

    if(config.release || config.r){
        await releaseProject();
        return;
    }

    if(config.p || config.publish){
        await publishProject();
        return;
    }


    if(config.h || config.help){
        console.log(`current version:${new File(process.env.APPDATA + "\\npm\\node_modules\\melon\\version.txt").readUTF8().trim()}`)
        console.log(`   melon          --编译生成html文件`)
        console.log(`   melon setup    --更新melon编译库`)
        console.log(`   melon update   --更新stage3d wechat 等lib库`)
        console.log(`   melon create   --创建web nodejs项目`)
        console.log(`   melon release  --发布release版本`)
        console.log(`   melon publish  --发布release版本到内网测试服务器`)
        return;
    }
    

    if(config.build){
        build(config.build);
        return;
    }
    
    referenceJs();
    // console.log($path.resolve(""));
}



main();





