import { forarr, foreach } from "../core/Attibute";
import { BitmapData } from "../core/BitmapData";
import { File } from "../core/File";
import { refreshUV } from "../core/Tools";
import { CrackSource } from "./CrackSource";

interface IMovieClipJson {
    mc: { [key: string]: IJSON_MovieClip_Frames };
    res: { [key: string]: IJSON_MovieClip_Re };
}

interface IJSON_MovieClip_Frames {
    frameRate: number;
    labels: IJSON_MovieClip_Label[];
    events: any[];
    frames: IJSON_MovieClip_Frame[];
}

interface IJSON_MovieClip_Frame {
    res: string;
    x: number;
    y: number;
}

interface IJSON_MovieClip_Label {
    name: string;
    frame: number;
    end: number;
}

interface IJSON_MovieClip_Re {
    x: number;
    y: number;
    w: number;
    h: number;
}


interface IJSON_UI {
    file: string;
    frames: { [key: string]: IJSON_UI_Frame };
}

interface IJSON_UI_Frame {
    x: number;
    y: number;
    w: number;
    h: number;
    offX: number;
    offY: number;
    sourceW: number;
    sourceH: number;
}

export class AmfTSource {


    static async filterTsource(root: File, out?: File) {

        if (!out) {
            out = root.resolvePath("output");
            out.mkdir();
        }

        let files = root.getAllFiles(".json", -1);
        forarr(files, v => {
            let fout = out.resolvePath(v.unExtName);
            fout.mkdir();
            this.toTsource(v, fout);
            return true;
        });
    }


    static async toTsource(file: File, out: File) {

        let pngFile = file.parent.resolvePath(file.unExtName + ".png");

        let bitmap = new BitmapData();
        await bitmap.from(pngFile.nativePath);
        let source: ITSourceData;

        try {
            let json = JSON.parse(file.readUTF8());
            if (json.mc) {
                source = this.movieClipJsonSource(json, bitmap);
            } else {
                source = this.UIJsonSource(json, bitmap);
            }

            pngFile.copyto(out.resolvePath("diff.png"));
            out.resolvePath("data.dat").writeObject(source);

            if (source.clips == undefined) {
                CrackSource.crack(source, bitmap, out.resolvePath("output"))
            }



        } catch (e) {
            console.log("error");
        }



    }


    static movieClipJsonSource(json: IMovieClipJson, bitmap: BitmapData) {

        let clips = {} as { [key: string]: ITSourceClip[] }

        foreach(json.mc, (v, k) => {
            clips[k] = this.toTSourceClips(v);
            return true;
        })


        let frames = {} as { [key: string]: IBitmapSourceVO };

        let ix = 0;
        let iy = 0;

        let { width, height } = bitmap;

        foreach(json.res, (v, k) => {
            let { x, y, w, h } = v;
            let vo = { x, y, w, h, ix, iy } as IBitmapSourceVO;
            refreshUV(vo, width, height);
            frames[k] = vo;
            return true;
        })


        return { width, height, frames, clips } as ITSourceData

    }

    static toTSourceClips(frames: IJSON_MovieClip_Frames) {


        let duration = (1000 / frames.frameRate) >> 0;

        let count = frames.frames.length - 1;

        let data = [] as ITSourceClip[];

        forarr(frames.frames, (v, i) => {

            let { res, x, y } = v;
            let next = i + 1;

            if (i >= count) {
                next = 0;
            }

            data[i] = { res, x, y, duration, next } as ITSourceClip;

            return true;
        })


        return data;

    }


    static UIJsonSource(json: IJSON_UI, bitmap: BitmapData) {


        let { width, height } = bitmap;

        let frames = {} as { [key: string]: IBitmapSourceVO };

        foreach(json.frames, (v, k) => {

            let { x, y, w, h, offX: ix, offY: iy } = v;

            let vo = { x, y, w, h, ix, iy } as IBitmapSourceVO;
            refreshUV(vo, width, height);
            frames[k] = vo;

            return true;
        })



        return { width, height, frames } as ITSourceData


    }



    






    static txtToBin() {
        let file = new File("E:/workspace/melonTest/assets/model/helmet/DamagedHelmet.bin.txt");
        let arr = new Uint16Array(file.readUTF8().split(';').map(Number));
        file = file.parent.resolvePath(file.unExtName);
        file.write(new Uint8Array(arr.buffer));
    }

    

}
