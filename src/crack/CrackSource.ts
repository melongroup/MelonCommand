import { BitmapData } from "../core/BitmapData";
import { forarr, foreach } from "../core/Attibute";
import { File } from "../core/File";

export class CrackSource {


    static crack(source: ITSourceData, bmd: BitmapData, out: File) {

        out.mkdir();

        let { frames } = source;

        foreach(frames, (v, k) => {

            let { x, y, w, h, ix, iy } = v;

            let newBitmapData = bmd.getRectBitmapData(x, y, w, h, 0, 0);
            if (newBitmapData && !newBitmapData.allTransparent) {
                newBitmapData.save(out.resolvePath(k + ".png").nativePath);
            }

            return true;
        })

    }

}