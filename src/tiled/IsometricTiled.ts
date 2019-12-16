import { OrthogonalTiled } from "./OrthogonalTiled";

export class IsometricTiled extends OrthogonalTiled {

    init(tileData: ITiledData) {
        this.tileData = tileData;
        let { width: gw, height: gh, tilewidth: gew, tileheight: geh } = tileData;
        this.w = gw * gew;
        this.h = gh * geh;
    }

    getImagePixel(i: number, ox:number,oy:number) {
        let { width: gw, tilewidth: gew, tileheight: geh } = this.tileData;

        let j = ((i / gw) >> 0)
        i = (i % gw);

        let w = (i - j - 1) * gew / 2 + ox;
        let h = (i + j) * geh / 2 + oy;
        return [w, h];
    }
}