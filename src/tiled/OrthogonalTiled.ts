export class OrthogonalTiled{

    w:number;
    h:number;
    tileData : ITiledData;

    init(tileData:ITiledData){
        let {  width: gw, height: gh, tilewidth: gew, tileheight: geh } = tileData;
        this.w = gw * gew;
        this.h = gh * geh;
    }

    getImagePixel(i:number,ox:number,oy:number){
        let {  width: gw, tilewidth: gew, tileheight: geh } = this.tileData;
        let w = (i % gw) * gew + ox;
        let h = ((i / gw) >> 0) * geh + oy;
        return [w,h];
    }
}