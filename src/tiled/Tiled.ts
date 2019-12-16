import { singleton } from "../core/ClassUtils";
import { Core, readJsonFile, xCopy } from "../core/Core";
import { File, __fs, __path } from "../core/File";
import { BitmapData } from "../core/BitmapData";
import { packImage, delay, zipImage, refreshUV, packAnimation, atlasImage2BitmapSource } from "../core/Tools";
import { ConfigUtil } from "../core/ConfigUtil";
import { amf_writeObject, amf_readObject } from "../core/AMF3";
import { OrthogonalTiled } from "./OrthogonalTiled";
import { IsometricTiled } from "./IsometricTiled";
import { debugLog } from "../core/Debug";

export async function tiled_parser() {
    // console.log("tiled_parser");
    // console.log(process.argv);
    let config = Core.config;
    singleton(Tiled).parser(config["file"]);
}


export interface ITiledConf {
    out: string;
    pack: string;
    img: string;
    hash: string;

    publish:string;
}

export interface IMapTiled{
    
}


export class Tiled {

    tileFile: File;
    fileDic: File;
    tileRoot: File;
    tileOut: File;

    tileData: ITiledData;

    conf: ITiledConf;

    imgHash: { [key: string]: number }

    bitmaps: { [key: string]: { bmd: BitmapData, image: ITiledImage } } = {};

    findRoot(file: File) {
        while (file) {
            if (file.resolvePath("tile.conf").exists) {
                break;
            }
            file = file.parent;
        }

        return file;
    }

    async parser(path: string) {

        console.log(`parser : ${path}`);

        let tileFile = this.tileFile = new File(path);
        let fileDic = this.fileDic = tileFile.parent;
        let root = this.tileRoot = this.findRoot(tileFile.parent);
        if (!root) {
            return;
        }

        let conf = this.conf = ConfigUtil.ReadConf(root.resolvePath("tile.conf")) as ITiledConf;


        let tileData = this.tileData = readJsonFile(tileFile) as ITiledData;

        let hashFile = root.resolvePath(conf.hash);

        let imgHash = readJsonFile(hashFile) as { [key: string]: number };

        if (!imgHash) {
            imgHash = {};
        }

        imgHash = {};

        this.imgHash = imgHash;

        // let bmd = new BitmapData();
        // await bmd.from(this.tileRoot.resolvePath("floor/3.png").nativePath);
        // let b = bmd.allTransparent

        let count = 0;

        for (const key in tileData.tilesets) {
            const element = tileData.tilesets[key];
            let elementFile = fileDic.resolvePath(element.source)
            let imagejson = readJsonFile(elementFile) as ITiledImage;
            element.image = imagejson
            if (imagejson) {

                let image = imagejson.image;

                if(image){
                    element.path = elementFile.parent.resolvePath(imagejson.image).nativePath;
                    element.name = imagejson.image.replace(".png", "");
                    imagejson.firstgid = element.firstgid;
                    let state = __fs.statSync(element.path);
                    let mtime = imgHash[element.path];
                    if (mtime != state.mtimeMs) {
                        imgHash[element.path] = state.mtimeMs;
                        await this.loadImage(imagejson, element.path);
                        count++;
                    }
                }else{

                    imagejson.path = elementFile.parent.nativePath;

                    let path = elementFile.nativePath;
                    let state = __fs.statSync(path);
                    let mtime = imgHash[path];
                    if (mtime != state.mtimeMs) {
                        imgHash[path] = state.mtimeMs;
                        this.bitmaps[path] = { bmd:undefined, image:imagejson };
                        count++;
                    }

                }

               



            }
        }

        if (count > 0) {
            hashFile.writeUTF8(JSON.stringify(imgHash,undefined,4));


            let packDir = this.tileRoot.resolvePath(conf.pack);
            packDir.delete();
            await delay(50);
            packDir.mkdir();
            this.cut(packDir);

            await delay(100);

            console.log("packImage start" )

            await packImage(packDir, packDir);

            console.log("packImage complete" )

            await delay(100);

            let imgOut = root.resolvePath(conf.img);
            imgOut.mkdir();

            let { bitmaps } = this;
            for (const key in bitmaps) {
                const { image } = bitmaps[key];
                await this.copyImage(packDir, imgOut, image);
            }
        }

        this.parserLayers();

    }





    async copyImage(packDir: File, imgout: File, image: ITiledImage) {
        let f = packDir.resolvePath(image.image);
        let out = imgout.resolvePath(f.unExtName + "/diff.png");
        out.parent.mkdir();

        f = new File(f.nativePath.replace(".png", ".atlas"));

        await atlasImage2BitmapSource(f,imgout.resolvePath(f.unExtName));
        // if (f.exists) {
        //     await zipImage(f, out);
        // }

        // await delay(50);

        // let bmd = new BitmapData();
        // await bmd.from(out.nativePath);

        // let width = bmd.width;
        // let height = bmd.height;

        // out = imgout.resolvePath(f.unExtName + "/data.dat");

        // console.log(out);

        // f = new File(f.nativePath.replace(".png", ".atlas"));
        // let info = readJsonFile(f) as Atlas_FrameInfo;

        // let { frames } = info;

        // let newFrames = {};

        // for (const key in frames) {
        //     const { frame, sourceSize, spriteSourceSize } = frames[key];
        //     let { x, y, w, h } = frame;
        //     let vo = refreshUV({ x, y, w, h } as IBitmapSourceVO, width, height);
        //     vo.name = key;
        //     newFrames[key] = vo;
        // }

        // out.write(amf_writeObject({ frames: newFrames, width, height }))
    }


    



    async loadImage(image: ITiledImage, path: string) {
        let bmd = new BitmapData();
        this.bitmaps[image.image] = { bmd, image };
        await bmd.from(path);
    }


    cut(out: File) {
        let { bitmaps, tileRoot } = this;
        for (const key in bitmaps) {
            const { bmd, image } = bitmaps[key];


            if(bmd){
                // let imageFile = tileRoot.resolvePath(image.image);
                let { tilewidth, tileheight, columns, imagewidth, imageheight, tilecount, firstgid, image: name } = image;

                let f = out.resolvePath(name.slice(0, name.lastIndexOf(".")));
                f.mkdir();
                firstgid = 0;

                // out.mkdir();
                for (let i = 0; i < tilecount; i++) {
                    let x = ((i % columns) >> 0) * tilewidth;
                    let y = ((i / columns) >> 0) * tileheight;
                    let newBitmapData = bmd.getRectBitmapData(x, y, tilewidth, tileheight);
                    if (newBitmapData && !newBitmapData.allTransparent) {
                        newBitmapData.save(f.resolvePath((i + firstgid) + ".png").nativePath);
                    }
                }
            }else{
                let {tiles} = image;

                let elementFile = new File(image.path);

                let o = out.resolvePath(image.name);
                o.mkdir();

                for (let i = 0; i < tiles.length; i++) {
                    let tile = tiles[i];

                    let file = elementFile.resolvePath(tile.image);

                    if(file.exists){
                        file.copyto(o.resolvePath(tile.id+".png"));
                    }

                }

                image.image = image.name + ".png";
            }

          
        }
    }


    //===============================================================================================

    orientation : OrthogonalTiled;

    parserLayers() {
        let { tileFile, tileRoot, tileData, conf } = this;

        let id = tileFile.nativePath.replace(tileRoot.nativePath,"").replace(tileFile.extname,"");

        let images = {} as { [key: string]: { index: number, tileset: ITileset, vo: IBitmapSourceVO } }

        let {orientation, layers, tilesets, width: gw, height: gh, tilewidth: gew, tileheight: geh } = tileData;

        let textures = [] as ITiledReleaseTexture[];


        // console.log(tileData);

        debugLog("orientation:"+orientation);

        if(orientation == "orthogonal"){
            this.orientation = new OrthogonalTiled();
        }else if(orientation == "isometric"){
            this.orientation = new IsometricTiled();
        }

        this.orientation.init(tileData);

        let {w,h} = this.orientation;

        let data = { w, h, gw, gh, gew, geh, hgew: gew * 0.5, hgeh: geh * 0.5, textures ,id,orientation} as ITiledReleaseData;

        let imgRoot = tileRoot.resolvePath(conf.img);

        for (let i = 0; i < tilesets.length; i++) {
            let tileset = tilesets[i];
            let { name, firstgid } = tileset;
            if(!name){
                name = tileset.image.name;
            }
            let f = imgRoot.resolvePath(name + "/data.dat");
            if (f.exists) {
                let { frames, width, height } = f.readObject() as ITSourceData
                for (const key in frames) {
                    const vo = frames[key];
                    let index = ~~key.replace(".png", "");
                    images[index + firstgid] = { index: i, tileset, vo };
                }
                let source = (imgRoot.nativePath.replace(tileRoot.nativePath, "") + name + "/").replace(conf.out+"/","");
                textures[i] = { width, height, source } as ITiledReleaseTexture
            }


        }


        let newlayers = [] as ITiledReleaseLayer[];

        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (layer.type == "tilelayer") {

                if(layer.name == "monster"){
                   this.parserMonster(data,layer,images,gew,geh);
                }else if(layer.name == "terrain"){
                    data.byte = this.parserTerrain(layer,images,gew,geh);
                }else{
                    
                    let newlayer = this.parserLayer(layer, images, gew, geh);
                    if(newlayer.name == "stone"){
                        data.stone = newlayer;
                    }else{
                        newlayers.push(newlayer);
                    }
                }

                
            }
        }

        // console.log("????");

        data.layers = newlayers;


        let po :File;
        let out = po = this.tileRoot.resolvePath(conf.out)

        out = out.resolvePath(this.tileFile.nativePath.replace(this.tileRoot.nativePath, "").replace(".json", ".dat"));

        out.parent.mkdir();

        out.writeObject(data);

        if(conf.publish){
            let publish = this.tileRoot.resolvePath(conf.publish);
            xCopy(po.nativePath,publish.nativePath);
        }
        


    }


    parserLayer(layer: ITiledLayer, images: { [key: string]: { index: number, tileset: ITileset, vo: IBitmapSourceVO } }, tilewidth: number, tileheight: number) {
        let { name, x, y, data, width, properties } = layer;
        let {orientation} = this;

        let elements = [] as ITiledReleaseElement[]

        for (let i = 0; i < data.length; i++) {
            const key = data[i];
            let item = images[key];
            if (item) {
                let [x,y] = orientation.getImagePixel(i,0,tileheight - item.vo.h);
                // let x = (i % width) * tilewidth;
                // let y = ((i / width) >> 0) * tileheight + tileheight - item.vo.h;
                let element = { x, y, s: item.vo.name, i: item.index } as ITiledReleaseElement;
                elements.push(element);
            }
        }

        let pro = {};
        if (properties) {
            for (let i = 0; i < properties.length; i++) {
                const property = properties[i];
                pro[property.name] = property.value;
            }
        }

        return { name, x, y, elements, pro } as ITiledReleaseLayer

    }


    parserTerrain(layer: ITiledLayer, images: { [key: string]: { index: number, tileset: ITileset, vo: IBitmapSourceVO } }, tilewidth: number, tileheight: number){

        let {data} = layer;

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            let t = images[element];
            if(t){
                data[i] = element - t.tileset.firstgid;
            }else{
                data[i] = 0;
            }
        }

        return new Uint8Array(layer.data);
    }


    parserMonster(release:ITiledReleaseData, layer: ITiledLayer, images: { [key: string]: { index: number, tileset: ITileset, vo: IBitmapSourceVO } }, tilewidth: number, tileheight: number){

        let monsters : {x:number,y:number,id:string}[] = [];

        let {width} = layer;
        let{hgew,hgeh} = release;
        let { orientation } = this;

        let {data} = layer;
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            let image = images[element];

            if(image){
                let tiles = image.tileset.image.tiles;
                if(tiles){
                    let tile = tiles[element - image.tileset.firstgid];
                    let id = __path.basename(tile.image);
                    id = id.replace(".png","");

                    let [x,y] = orientation.getImagePixel(i,hgew,hgeh);

                    // let x = (i % width) * tilewidth + hgew;
                    // let y = ((i / width) >> 0) * tileheight + hgeh;

                    if(id == "arc"){
                        release.createpos = [x,y]
                    }else{
                        if(layer.visible){
                            monsters.push({x,y,id})
                        }
                    }

                    
                }
            }

        }

        release.monsters = monsters;
    }

}