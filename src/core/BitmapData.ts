import { __fs } from "./File";

export class BitmapData {

    static getAlphaXPos(data: Uint8Array, width: number, xfrom: number, xto: number, yfrom: number, yto: number, alpha = 0, gt = true) {
        let ei = xfrom < xto ? 1 : -1;
        let ej = yfrom < yto ? 1 : -1;


        while (xfrom != xto) {

            let j = yfrom;

            while (j != yto) {


                let offset = (j * width + xfrom) * 4;
                if (gt) {
                    if (data[offset] > alpha) {
                        return xfrom;
                    }
                } else {
                    if (data[offset] <= alpha) {
                        return xfrom;
                    }
                }


                j += ej;
            }

            xfrom += ei;
        }

        return xto;
    }


    static getAlphaYPos(data: Uint8Array, width: number, xfrom: number, xto: number, yfrom: number, yto: number, alpha = 0, gt = true) {
        let ei = xfrom < xto ? 1 : -1;
        let ej = yfrom < yto ? 1 : -1;

        while (yfrom != yto) {

            let x = xfrom;

            if (gt) {
                while (x != xto) {
                    let offset = (yfrom * width + x) * 4;
                    if (data[offset] > alpha) {
                        return yfrom;
                    }
                    x += ei;
                }
            } else {
                let f = false;
                while (x != xto) {
                    let offset = (yfrom * width + x) * 4;
                    if (data[offset] > alpha) {
                        f = true;
                        break;
                    }
                    x += ei;
                }
                if (!f) {
                    return yfrom;
                }
            }

            yfrom += ej;
        }

        return yto;
    }



    width = 0;
    height = 0;

    get allTransparent() {

        let { data } = this;

        for (let i = 0; i < data.length; i += 4) {
            let a = data[i + 3];

            if (a > 22) {
                return false;
            }

        }

        return true;
    }

    data: Uint8Array;


    async from(path: string) {
        var getPixels = require("get-pixels");
        var base = this;
        return new Promise(resolve => {
            getPixels(path, function (err: any, pixels: IView3duint8) {
                if (err) {
                    console.log("Bad image path:" + path)
                    return
                }
                let [width] = pixels.shape;
                base.setData(pixels.data, width);
                // base.pixels = pixels;
                // base.width = width;
                // base.height = height;
                resolve(this);
            })
        });
    }


    constructor(width = 0, height = 0) {
        this.ctor(width, height);
    }

    ctor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
        this.data = new Uint8Array(width * height * 4);
    }

    setData(data: Uint8Array, width: number) {
        this.data = data;
        this.width = width;
        this.height = data.length / width / 4;
    }


    getPixel(x: number, y: number) {
        let { width, height, data } = this;

        if (x < 0 || y < 0 || x >= width || y >= height) {
            return 0;
        }

        let offset = (y * width + x) * 4;

        let d = data[offset + 3] * 0x1000000 + data[offset] * 0x10000 + data[offset + 1] * 0x100 + data[offset + 2];

        return d;
    }

    setPixel(x: number, y: number, value: number) {
        let { width, height, data } = this;
        if (x < 0 || y < 0 || x >= width || y >= height) {
            return;
        }

        let offset = (y * width + x) * 4;

        data[offset + 3] = ~~(value / 0x1000000);
        data[offset + 0] = ~~((value & 0xFFFFFF) / 0x10000);
        data[offset + 1] = ~~((value & 0xFFFF) / 0x100);
        data[offset + 2] = ~~(value & 0xFF);

    }


    getRectBitmapData(x: number, y: number, w: number, h: number, ix = 0, iy = 0) {
        let { width, height, data } = this;
        // if(x < 0 || y < 0 || x >= width || y >= height || x+w >= width || y+h >= height){
        //     return undefined;
        // }

        let rw = w + ix;
        let rh = h + iy;


        let bitmapdata = new BitmapData(rw, rh);
        let bytes = bitmapdata.data;

        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {

                let dx = x + i;
                let dy = y + j;
                if (dx < 0 || dy < 0 || dx >= width || dy >= height) {
                    return;
                }

                let sourceOffset = (dy * width + dx) * 4;

                j += iy;
                i += ix;

                let offset = (j * rw + i) * 4;

                bytes[offset + 0] = data[sourceOffset + 0];
                bytes[offset + 1] = data[sourceOffset + 1];
                bytes[offset + 2] = data[sourceOffset + 2];
                bytes[offset + 3] = data[sourceOffset + 3];
            }
        };

        return bitmapdata;
    }




    getBoundsRect(alpha = 0, all = true, ox = 0, oy = 0) {
        let { width, height, data } = this;

        // width = 3;
        // height = 3;
        // var x = require("zeros")([width, height,4],"uint8") as IView3duint8
        // x.set(1,1,0,0xFF);
        // data = x.data;


        let rect = {} as IRectange;
        let l = width, t = height, r = width, b = height;
        let { getAlphaXPos, getAlphaYPos } = BitmapData;

        if (all) {
            // l = getAlphaXPos(data,width,0,width,0,height);
            // r = getAlphaXPos(data,width,width-1,-1,0,height) + 1;
            // t = getAlphaYPos(data,width,0,width,0,height);
            // b = getAlphaYPos(data,width,0,width,height-1,-1) + 1;

            b = getAlphaYPos(data, width, 0, width, 0, height, 0, false);
        } else {



        }

        rect.x = l;
        rect.y = t;
        rect.width = r - l;
        rect.height = b - t;

        return rect;
    }






    save(path: string) {
        var zeros = require("zeros");
        var savePixels = require("save-pixels");
        let { width, height, data } = this;
        var x = zeros([width, height, 4], "uint8") as IView3duint8
        for (var j = 0; j < height; ++j) {
            for (var i = 0; i < width; ++i) {
                let offset = (j * width + i) * 4;
                x.set(i, j, 0, data[offset]);
                x.set(i, j, 1, data[offset + 1]);
                x.set(i, j, 2, data[offset + 2]);
                x.set(i, j, 3, data[offset + 3]);
            }
        }

        var out = __fs.createWriteStream(path)
        var pxstream = savePixels(x, "png");
        pxstream.pipe(out);
    }




}