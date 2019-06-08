var isWin = /^win/.test(process.platform);
if (isWin) {
    let root = process.env.APPDATA + "\\npm\\";
    console.log(root);
}