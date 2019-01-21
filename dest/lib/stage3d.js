rf = global.rf;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var rf;
(function (rf) {
    rf.ClientCheck = {
        isClientCheck: true
    };
    rf.errorPrefix = "";
    function getMsg(msg) {
        return new Date()["format"]("[yyyy-MM-dd HH:mm:ss]", true) + "[info:]" + msg;
    }
    rf.ThrowError = function (msg, err, alert) {
        msg = rf.errorPrefix + msg;
        msg += "%c";
        if (err) {
            msg += "\nError:\n[name]:" + err.name + ",[message]:" + err.message;
        }
        else {
            err = new Error();
        }
        msg += "\n[stack]:\n" + err.stack;
        console.log(msg, "color:red");
    };
})(rf || (rf = {}));
function zeroize(value, length) {
    if (length === void 0) { length = 2; }
    var str = "" + value;
    var zeros = "";
    for (var i = 0, len = length - str.length; i < len; i++) {
        zeros += "0";
    }
    return zeros + str;
}
function getDescriptor(descriptor, enumerable, writable, configurable) {
    if (enumerable === void 0) { enumerable = false; }
    if (writable === void 0) { writable = true; }
    if (configurable === void 0) { configurable = true; }
    if (!descriptor.set && !descriptor.get) {
        descriptor.writable = writable;
    }
    descriptor.configurable = configurable;
    descriptor.enumerable = enumerable;
    return descriptor;
}
function makeDefDescriptors(descriptors, enumerable, writable, configurable) {
    if (enumerable === void 0) { enumerable = false; }
    if (writable === void 0) { writable = true; }
    if (configurable === void 0) { configurable = true; }
    for (var key in descriptors) {
        var desc = descriptors[key];
        var enumer = desc.enumerable == undefined ? enumerable : desc.enumerable;
        var write = desc.writable == undefined ? writable : desc.writable;
        var config = desc.configurable == undefined ? configurable : desc.configurable;
        descriptors[key] = getDescriptor(desc, enumer, write, config);
    }
    return descriptors;
}
Object.defineProperties(Object.prototype, makeDefDescriptors({
    clone: {
        value: function () {
            var o = {};
            for (var n in this) {
                o[n] = this[n];
            }
            return o;
        }
    },
    getPropertyDescriptor: {
        value: function (property) {
            var data = Object.getOwnPropertyDescriptor(this, property);
            if (data) {
                return data;
            }
            var prototype = Object.getPrototypeOf(this);
            if (prototype) {
                return prototype.getPropertyDescriptor(property);
            }
        }
    },
    copyto: {
        value: function (to) {
            for (var p in this) {
                var data = to.getPropertyDescriptor(p);
                if (!data || (data.set || data.writable)) {
                    to[p] = this[p];
                }
            }
        }
    },
    equals: {
        value: function (checker) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!args.length) {
                args = Object.getOwnPropertyNames(checker);
            }
            for (var i = 0; i < args.length; i++) {
                var key = args[i];
                if (this[key] != checker[key]) {
                    return false;
                }
            }
            return true;
        }
    },
    copyWith: {
        value: function (to) {
            var proNames = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                proNames[_i - 1] = arguments[_i];
            }
            for (var i = 0; i < proNames.length; i++) {
                var p = proNames[i];
                if (p in this) {
                    to[p] = this[p];
                }
            }
        }
    },
    getSpecObject: {
        value: function () {
            var proNames = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                proNames[_i] = arguments[_i];
            }
            var obj = {};
            for (var i = 0; i < proNames.length; i++) {
                var p = proNames[i];
                if (p in this) {
                    if (this[p] != null) {
                        obj[p] = this[p];
                    }
                }
            }
            return obj;
        }
    }
}));
Object.defineProperties(Float32Array.prototype, makeDefDescriptors({
    x: {
        get: function () {
            return this[0];
        },
        set: function (value) {
            this[0] = value;
        }
    },
    y: {
        get: function () {
            return this[1];
        },
        set: function (value) {
            this[1] = value;
        }
    },
    z: {
        get: function () {
            return this[2];
        },
        set: function (value) {
            this[2] = value;
        }
    },
    w: {
        get: function () {
            return this[3];
        },
        set: function (value) {
            this[3] = value;
        }
    },
    update: {
        value: function (data32PerVertex, offset, v) {
            var len = this.length;
            for (var i = 0; i < len; i += data32PerVertex) {
                this[i + offset] = v;
            }
        }
    },
    wPoint1: {
        value: function (position, x, y, z, w) {
            this[position] = x;
        }
    },
    wPoint2: {
        value: function (position, x, y, z, w) {
            this[position] = x;
            this[position + 1] = y;
        }
    },
    wPoint3: {
        value: function (position, x, y, z, w) {
            this[position] = x;
            this[position + 1] = y;
            this[position + 2] = z;
        }
    },
    wPoint4: {
        value: function (position, x, y, z, w) {
            this[position] = x;
            this[position + 1] = y;
            this[position + 2] = z;
            this[position + 3] = w;
        }
    },
    clone: {
        value: function () {
            return new Float32Array(this);
        }
    }
}));
Object.defineProperties(Function.prototype, makeDefDescriptors({
    isSubClass: {
        value: function (testBase) {
            if (typeof testBase !== "function") {
                return false;
            }
            var base = this.prototype;
            var flag = false;
            while (base !== null && base !== Object) {
                if (base === testBase) {
                    flag = true;
                    break;
                }
                base = base.prototype;
            }
            return true;
        }
    }
}));
Math.DEG_TO_RAD = Math.PI / 180;
Math.RAD_TO_DEG = 180 / Math.PI;
Math.PI2 = 2 * Math.PI;
Math.PI_1_2 = Math.PI * .5;
Math.clamp = function (value, min, max) {
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    return value;
};
Math.random2 = function (min, max) {
    return min + Math.random() * (max - min);
};
Math.random3 = function (center, delta) {
    return center - delta + Math.random() * 2 * delta;
};
if (!Number.isSafeInteger) {
    Number.isSafeInteger = function (value) { return value < 9007199254740991 && value >= -9007199254740991; };
}
Object.defineProperties(Number.prototype, makeDefDescriptors({
    zeroize: getDescriptor({
        value: function (length) { return zeroize(this, length); }
    }),
    between: getDescriptor({
        value: function (min, max) { return min <= this && max >= this; }
    })
}));
Object.defineProperties(String.prototype, makeDefDescriptors({
    zeroize: {
        value: function (length) { return zeroize(this, length); },
    },
    trim: {
        value: function () {
            return this.replace(/(^[\s\t\f\r\n\u3000\ue79c ]*)|([\s\t\f\r\n\u3000\ue79c ]*$)/g, "");
        }
    },
    substitute: {
        value: function () {
            var len = arguments.length;
            if (len > 0) {
                var obj_1;
                if (len == 1) {
                    obj_1 = arguments[0];
                    if (typeof obj_1 !== "object") {
                        obj_1 = arguments;
                    }
                }
                else {
                    obj_1 = arguments;
                }
                if ((obj_1 instanceof Object) && !(obj_1 instanceof RegExp)) {
                    return this.replace(/\{(?:%([^{}]+)%)?([^{}]+)\}/g, function (match, handler, key) {
                        var value = obj_1[key];
                        if (handler) {
                            var func = String.subHandler[handler];
                            if (func) {
                                value = func(value);
                            }
                        }
                        return (value !== undefined) ? '' + value : match;
                    });
                }
            }
            return this.toString();
        }
    },
    hash: {
        value: function () {
            var len = this.length;
            var hash = 5381;
            for (var i = 0; i < len; i++) {
                hash += (hash << 5) + this.charCodeAt(i);
            }
            return hash & 0xffffffff;
        }
    },
    trueLength: {
        value: function () {
            var arr = this.match(/[\u2E80-\u9FBF]/ig);
            return this.length + (arr ? arr.length : 0);
        }
    }
}));
String.zeroize = zeroize;
String.subHandler = {};
String.regSubHandler = function (key, handler) {
    this.subHandler[key] = handler;
};
Object.defineProperties(Date.prototype, makeDefDescriptors({
    format: {
        value: function (mask, local) {
            var d = this;
            return mask.replace(/"[^"]*"|'[^']*'|(?:d{1,2}|m{1,2}|yy(?:yy)?|([hHMs])\1?)/g, function ($0) {
                switch ($0) {
                    case "d": return gd();
                    case "dd": return zeroize(gd());
                    case "M": return gM() + 1;
                    case "MM": return zeroize(gM() + 1);
                    case "yy": return (gy() + "").substr(2);
                    case "yyyy": return gy();
                    case "h": return gH() % 12 || 12;
                    case "hh": return zeroize(gH() % 12 || 12);
                    case "H": return gH();
                    case "HH": return zeroize(gH());
                    case "m": return gm();
                    case "mm": return zeroize(gm());
                    case "s": return gs();
                    case "ss": return zeroize(gs());
                    default: return $0.substr(1, $0.length - 2);
                }
            });
            function gd() { return local ? d.getDate() : d.getUTCDate(); }
            function gM() { return local ? d.getMonth() : d.getUTCMonth(); }
            function gy() { return local ? d.getFullYear() : d.getUTCFullYear(); }
            function gH() { return local ? d.getHours() : d.getUTCHours(); }
            function gm() { return local ? d.getMinutes() : d.getUTCMinutes(); }
            function gs() { return local ? d.getSeconds() : d.getUTCSeconds(); }
        }
    }
}));
Array.binaryInsert = function (partArr, item, filter) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var right = partArr.length - 1;
    var left = 0;
    while (left <= right) {
        var middle = (left + right) >> 1;
        var test = partArr[middle];
        if (filter.apply(void 0, [test].concat(args))) {
            right = middle - 1;
        }
        else {
            left = middle + 1;
        }
    }
    partArr.splice(left, 0, item);
};
Array.SORT_DEFAULT = {
    number: 0,
    string: "",
    boolean: false
};
Object.freeze(Array.SORT_DEFAULT);
Object.defineProperties(Array.prototype, makeDefDescriptors({
    cloneTo: {
        value: function (b) {
            b.length = this.length;
            var len = this.length;
            b.length = len;
            for (var i = 0; i < len; i++) {
                b[i] = this[i];
            }
        }
    },
    appendTo: {
        value: function (b) {
            var len = this.length;
            for (var i = 0; i < len; i++) {
                b.push(this[i]);
            }
        }
    },
    pushOnce: {
        value: function (t) {
            var idx = this.indexOf(t);
            if (!~idx) {
                idx = this.length;
                this[idx] = t;
            }
            return idx;
        }
    },
    remove: {
        value: function (t) {
            var idx = this.indexOf(t);
            if (~idx) {
                this.splice(idx, 1);
                return true;
            }
            return false;
        },
        writable: true
    },
    doSort: {
        value: function () {
            var key, descend;
            var len = arguments.length;
            for (var i = 0; i < len; i++) {
                var arg = arguments[i];
                var t = typeof arg;
                if (t === "string") {
                    key = arg;
                }
                else {
                    descend = !!arg;
                }
            }
            if (key) {
                return this.sort(function (a, b) { return descend ? b[key] - a[key] : a[key] - b[key]; });
            }
            else {
                return this.sort(function (a, b) { return descend ? b - a : a - b; });
            }
        }
    },
    multiSort: {
        value: function (kArr, dArr) {
            var isArr = Array.isArray(dArr);
            return this.sort(function (a, b) {
                var def = Array.SORT_DEFAULT;
                for (var idx = 0, len = kArr.length; idx < len; idx++) {
                    var key = kArr[idx];
                    var mode = isArr ? !!dArr[idx] : !!dArr;
                    var av = a[key];
                    var bv = b[key];
                    var typea = typeof av;
                    var typeb = typeof bv;
                    if (typea == "object" || typeb == "object") {
                        return 0;
                    }
                    else if (typea != typeb) {
                        if (typea == "undefined") {
                            bv = def[typeb];
                        }
                        else if (typeb == "undefined") {
                            av = def[typea];
                        }
                        else {
                            return 0;
                        }
                    }
                    if (av < bv) {
                        return mode ? 1 : -1;
                    }
                    else if (av > bv) {
                        return mode ? -1 : 1;
                    }
                    else {
                        continue;
                    }
                }
                return 0;
            });
        }
    }
}));
var rf;
(function (rf) {
    function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (prototype.hasOwnProperty("__class__")) {
            return prototype["__class__"];
        }
        var constructorString = prototype.constructor.toString().trim();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__class__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
    rf.getQualifiedClassName = getQualifiedClassName;
    function getQualifiedSuperclassName(value) {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        var superClass = getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
    rf.getQualifiedSuperclassName = getQualifiedSuperclassName;
    function is(instance, ref) {
        if (!instance || typeof instance != "object") {
            return false;
        }
        var prototype = Object.getPrototypeOf(instance);
        var types = prototype ? prototype.__types__ : null;
        if (!types) {
            return false;
        }
        return (types.indexOf(getQualifiedClassName(ref)) !== -1);
    }
    rf.is = is;
    function toString(instance, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ""; }
        if (!instance) {
            return defaultValue;
        }
    }
    rf.toString = toString;
    function clone(from, to) {
        if (!to) {
            to = {};
        }
        for (var key in from) {
            to[key] = from[key];
        }
        return to;
    }
    rf.clone = clone;
    function properties(target, key) {
        var old = target[key];
        Object.defineProperty(target, key, {
            get: function () {
                return old;
            },
            set: function (value) {
                old = value;
            },
            configurable: true,
            enumerable: true
        });
    }
    rf.properties = properties;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.weixin = false;
    rf.pixelRatio = 1;
    rf.sceneWidth = 0;
    rf.sceneHeight = 0;
    rf.windowWidth = 0;
    rf.windowHeight = 0;
    rf.innerWidth = 0;
    rf.innerHeight = 0;
    rf.stageWidth = 0;
    rf.stageHeight = 0;
    rf.TEMP_RECT = {};
    rf.isWindowResized = false;
    rf.max_vc = 100;
    rf.c_white = "rgb(255,255,255)";
    rf.pixelFont = 1;
    rf.pixelScale = 1;
    rf.softKeyboard = false;
    function isPowerOfTwo(n) {
        return (n !== 0) && ((n & (n - 1)) === 0);
    }
    rf.isPowerOfTwo = isPowerOfTwo;
    function wx_init() {
        var path = "";
        if (path) {
        }
    }
    rf.wx_init = wx_init;
})(rf || (rf = {}));
var rf_v3_identity = [0, 0, 0, 1];
var rf_m3_identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
var rf_m2_identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
var rf_m3_temp = new Float32Array(16);
Object.defineProperties(Float32Array.prototype, {
    m3_identity: {
        value: function (from) {
            if (!from) {
                from = rf_m3_identity;
            }
            this.set(from);
            return this;
        }
    },
    m3_toString: {
        value: function (scale) {
            var str = "";
            for (var i = 0; i < 16; i++) {
                var d = this[i];
                d = ((i + 1) % 4) == 0 ? d : d / scale;
                str += d + ",";
            }
            return str.slice(0, str.length - 1);
        }
    },
    m3_append: {
        value: function (m3, prepend, from) {
            var a;
            var b;
            if (!prepend) {
                a = from ? from : this;
                b = m3;
            }
            else {
                a = m3;
                b = from ? from : this;
            }
            var _a = a, a11 = _a[0], a12 = _a[1], a13 = _a[2], a14 = _a[3], a21 = _a[4], a22 = _a[5], a23 = _a[6], a24 = _a[7], a31 = _a[8], a32 = _a[9], a33 = _a[10], a34 = _a[11], a41 = _a[12], a42 = _a[13], a43 = _a[14], a44 = _a[15];
            var _b = b, b11 = _b[0], b12 = _b[1], b13 = _b[2], b14 = _b[3], b21 = _b[4], b22 = _b[5], b23 = _b[6], b24 = _b[7], b31 = _b[8], b32 = _b[9], b33 = _b[10], b34 = _b[11], b41 = _b[12], b42 = _b[13], b43 = _b[14], b44 = _b[15];
            this[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            this[1] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            this[2] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            this[3] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
            this[4] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            this[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            this[6] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            this[7] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
            this[8] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            this[9] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            this[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            this[11] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
            this[12] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            this[13] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            this[14] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            this[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
            return this;
        }
    },
    m3_rotation: {
        value: function (angle, axis, prepend, from) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var t = 1 - c;
            var x = axis[0], y = axis[1], z = axis[2];
            var tx = t * x, ty = t * y;
            var b = rf_m3_temp;
            b.set([
                tx * x + c, tx * y + s * z, tx * z - s * y, 0,
                tx * y - s * z, ty * y + c, ty * z + s * x, 0,
                tx * z + s * y, ty * z - s * x, t * z * z + c, 0,
                0, 0, 0, 1
            ]);
            return this.m3_append(b, prepend, from);
        }
    },
    m3_scale: {
        value: function (x, y, z, prepend, from) {
            if (from)
                this.set(from);
            if (prepend) {
                this[0] *= x;
                this[4] *= y;
                this[8] *= z;
                this[1] *= x;
                this[5] *= y;
                this[9] *= z;
                this[2] *= x;
                this[6] *= y;
                this[10] *= z;
                this[3] *= x;
                this[7] *= y;
                this[11] *= z;
            }
            else {
                this[0] *= x;
                this[1] *= y;
                this[2] *= z;
                this[4] *= x;
                this[5] *= y;
                this[6] *= z;
                this[8] *= x;
                this[9] *= y;
                this[10] *= z;
                this[12] *= x;
                this[13] *= y;
                this[14] *= z;
            }
            return this;
        }
    },
    m3_translation: {
        value: function (x, y, z, prepend, from) {
            if (prepend) {
                var b = rf_m3_temp;
                b.set(rf_m3_identity);
                b[12] = x;
                b[13] = y;
                b[14] = z;
                this.m3_append(b, undefined, from);
            }
            else {
                from = from ? from : this;
                this[12] = from[12] + x;
                this[13] = from[13] + y;
                this[14] = from[14] + z;
            }
            return this;
        }
    },
    m3_invert: {
        value: function (from, pos) {
            if (pos === void 0) { pos = true; }
            from = from ? from : this;
            var a = from[0], b = from[1], c = from[2], d = from[3], e = from[4], f = from[5], g = from[6], h = from[7], i = from[8], j = from[9], k = from[10], l = from[11], m = from[12], n = from[13], o = from[14], p = from[15], q = a * f - b * e, r = a * g - c * e, s = a * h - d * e, t = b * g - c * f, u = b * h - d * f, v = c * h - d * g, w = i * n - j * m, x = i * o - k * m, y = i * p - l * m, z = j * o - k * n, A = j * p - l * n, B = k * p - l * o, ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
            this[0] = (f * B - g * A + h * z) * ivd;
            this[1] = (-b * B + c * A - d * z) * ivd;
            this[2] = (n * v - o * u + p * t) * ivd;
            this[3] = (-j * v + k * u - l * t) * ivd;
            this[4] = (-e * B + g * y - h * x) * ivd;
            this[5] = (a * B - c * y + d * x) * ivd;
            this[6] = (-m * v + o * s - p * r) * ivd;
            this[7] = (i * v - k * s + l * r) * ivd;
            this[8] = (e * A - f * y + h * w) * ivd;
            this[9] = (-a * A + b * y - d * w) * ivd;
            this[10] = (m * u - n * s + p * q) * ivd;
            this[11] = (-i * u + j * s - l * q) * ivd;
            if (pos) {
                this[12] = (-e * z + f * x - g * w) * ivd;
                this[13] = (a * z - b * x + c * w) * ivd;
                this[14] = (-m * t + n * r - o * q) * ivd;
            }
            else {
                this[12] = 0;
                this[13] = 0;
                this[14] = 0;
            }
            this[15] = (i * t - j * r + k * q) * ivd;
            return this;
        }
    },
    m3_decompose: {
        value: function (pos, rot, sca, orientationStyle) {
            if (undefined == orientationStyle) {
                orientationStyle = 0;
            }
            var _a = this, m0 = _a[0], m1 = _a[1], m2 = _a[2], m3 = _a[3], m4 = _a[4], m5 = _a[5], m6 = _a[6], m7 = _a[7], m8 = _a[8], m9 = _a[9], m10 = _a[10], m11 = _a[11], m12 = _a[12], m13 = _a[13], m14 = _a[14], m15 = _a[15];
            if (undefined != pos) {
                pos[0] = m12;
                pos[1] = m13;
                pos[2] = m14;
            }
            var sqrt = Math.sqrt, atan2 = Math.atan2;
            var sx = sqrt(m0 * m0 + m1 * m1 + m2 * m2);
            var sy = sqrt(m4 * m4 + m5 * m5 + m6 * m6);
            var sz = sqrt(m8 * m8 + m9 * m9 + m10 * m10);
            if (m0 * (m5 * m10 - m6 * m9) - m1 * (m4 * m10 - m6 * m8) + m2 * (m4 * m9 - m5 * m8) < 0) {
                sz = -sz;
            }
            if (undefined != sca) {
                sca[0] = sx;
                sca[1] = sy;
                sca[2] = sz;
            }
            m0 /= sx;
            m1 /= sx;
            m2 /= sx;
            m4 /= sy;
            m5 /= sy;
            m6 /= sy;
            m8 /= sz;
            m9 /= sz;
            m10 /= sz;
            switch (orientationStyle) {
                case 0:
                    rot[1] = Math.asin(-m2);
                    if (m2 != 1 && m2 != -1) {
                        rot[0] = atan2(m6, m10);
                        rot[2] = atan2(m1, m0);
                    }
                    else {
                        rot[2] = 0;
                        rot[0] = atan2(-m4, m5);
                    }
                    break;
                case 2:
                    var tr = m0 + m5 + m10;
                    if (tr > 0) {
                        var rw = sqrt(1 + tr) / 2;
                        rot[3] = rw;
                        rw *= 4;
                        rot[0] = (m6 - m9) / rw;
                        rot[1] = (m8 - m2) / rw;
                        rot[2] = (m1 - m4) / rw;
                    }
                    else if ((m0 > m5) && (m0 > m10)) {
                        var rx = sqrt(1 + m0 - m5 - m10) / 2;
                        rot[0] = rx;
                        rx *= 4;
                        rot[3] = (m6 - m9) / rx;
                        rot[1] = (m1 + m4) / rx;
                        rot[2] = (m8 + m2) / rx;
                    }
                    else if (m5 > m10) {
                        rot[1] = sqrt(1 + m5 - m0 - m10) / 2;
                        rot[0] = (m1 + m4) / (4 * rot[1]);
                        rot[3] = (m8 - m2) / (4 * rot[1]);
                        rot[2] = (m6 + m9) / (4 * rot[1]);
                    }
                    else {
                        rot[2] = sqrt(1 + m10 - m0 - m5) / 2;
                        rot[0] = (m8 + m2) / (4 * rot[2]);
                        rot[1] = (m6 + m9) / (4 * rot[2]);
                        rot[3] = (m1 - m4) / (4 * rot[2]);
                    }
                    break;
                case 1:
                    rot[3] = Math.acos((m0 + m5 + m10 - 1) / 2);
                    var len = Math.sqrt((m6 - m9) * (m6 - m9) + (m8 - m2) * (m8 - m2) + (m1 - m4) * (m1 - m4));
                    if (len == 0) {
                        rot[0] = 0;
                        rot[1] = 0;
                        rot[2] = 0;
                    }
                    else {
                        rot[0] = (m6 - m9) / len;
                        rot[1] = (m8 - m2) / len;
                        rot[2] = (m1 - m4) / len;
                    }
                    break;
            }
        }
    },
    m3_recompose: {
        value: function (pos, rot, sca, orientationStyle) {
            if (undefined == orientationStyle) {
                orientationStyle = 0;
            }
            var scale_0_1_2 = sca[0], scale_4_5_6 = sca[1], scale_8_9_10 = sca[2];
            if (scale_0_1_2 == 0 || scale_4_5_6 == 0 || scale_8_9_10 == 0)
                return;
            var c0x = pos[0], c0y = pos[1], c0z = pos[2];
            var c1x = rot[0], c1y = rot[1], c1z = rot[2], c1w = rot[3];
            var cos = Math.cos, sin = Math.sin;
            switch (orientationStyle) {
                case 0:
                    {
                        var cx = cos(c1x);
                        var cy = cos(c1y);
                        var cz = cos(c1z);
                        var sx = sin(c1x);
                        var sy = sin(c1y);
                        var sz = sin(c1z);
                        this[0] = cy * cz * scale_0_1_2;
                        this[1] = cy * sz * scale_0_1_2;
                        this[2] = -sy * scale_0_1_2;
                        this[3] = 0;
                        this[4] = (sx * sy * cz - cx * sz) * scale_4_5_6;
                        this[5] = (sx * sy * sz + cx * cz) * scale_4_5_6;
                        this[6] = sx * cy * scale_4_5_6;
                        this[7] = 0;
                        this[8] = (cx * sy * cz + sx * sz) * scale_8_9_10;
                        this[9] = (cx * sy * sz - sx * cz) * scale_8_9_10;
                        this[10] = cx * cy * scale_8_9_10;
                        this[11] = 0;
                        this[12] = c0x;
                        this[13] = c0y;
                        this[14] = c0z;
                        this[15] = 1;
                    }
                    break;
                default:
                    {
                        var x = c1x;
                        var y = c1y;
                        var z = c1z;
                        var w = c1w;
                        if (orientationStyle == 1) {
                            var w_2 = w / 2;
                            var sinW_2 = sin(w_2);
                            x *= sinW_2;
                            y *= sinW_2;
                            z *= sinW_2;
                            w = cos(w_2);
                        }
                        ;
                        this[0] = (1 - 2 * y * y - 2 * z * z) * scale_0_1_2;
                        this[1] = (2 * x * y + 2 * w * z) * scale_0_1_2;
                        this[2] = (2 * x * z - 2 * w * y) * scale_0_1_2;
                        this[3] = 0;
                        this[4] = (2 * x * y - 2 * w * z) * scale_4_5_6;
                        this[5] = (1 - 2 * x * x - 2 * z * z) * scale_4_5_6;
                        this[6] = (2 * y * z + 2 * w * x) * scale_4_5_6;
                        this[7] = 0;
                        this[8] = (2 * x * z + 2 * w * y) * scale_8_9_10;
                        this[9] = (2 * y * z - 2 * w * x) * scale_8_9_10;
                        this[10] = (1 - 2 * x * x - 2 * y * y) * scale_8_9_10;
                        this[11] = 0;
                        this[12] = c0x;
                        this[13] = c0y;
                        this[14] = c0z;
                        this[15] = 1;
                    }
                    break;
            }
            return this;
        }
    },
    m3_copyColumnFrom: {
        value: function (column, vector3D) {
            column *= 4;
            this[column] = vector3D[0];
            this[column + 1] = vector3D[1];
            this[column + 2] = vector3D[2];
            this[column + 3] = vector3D[3];
        }
    },
    m3_copyColumnTo: {
        value: function (column, vector3D) {
            column *= 4;
            vector3D[0] = this[column];
            vector3D[1] = this[column + 1];
            vector3D[2] = this[column + 2];
            vector3D[3] = this[column + 3];
        }
    },
    m3_transformVector: {
        value: function (v, result) {
            var x = v[0], y = v[1], z = v[2], w = v[3];
            if (undefined == result) {
                result = new Float32Array(rf_v3_identity);
            }
            result[0] = x * this[0] + y * this[4] + z * this[8] + w * this[12];
            result[1] = x * this[1] + y * this[5] + z * this[9] + w * this[13];
            result[2] = x * this[2] + y * this[6] + z * this[10] + w * this[14];
            result[3] = x * this[3] + y * this[7] + z * this[11] + w * this[15];
            return result;
        }
    },
    m3_transformVectors: {
        value: function (vin, vout) {
            var i = 0;
            var v = [0, 0, 0];
            var v2 = [0, 0, 0];
            while (i + 3 <= vin.length) {
                v[0] = vin[i];
                v[1] = vin[i + 1];
                v[2] = vin[i + 2];
                this.transformVector(v, v2);
                vout[i] = v2[0];
                vout[i + 1] = v2[1];
                vout[i + 2] = v2[2];
                i += 3;
            }
        }
    },
    m3_transformRotation: {
        value: function (v, result) {
            var x = v[0], y = v[1], z = v[2];
            if (undefined == result) {
                result = new Float32Array(rf_v3_identity);
            }
            result[0] = x * this[0] + y * this[4] + z * this[8];
            result[1] = x * this[1] + y * this[5] + z * this[9];
            result[2] = x * this[2] + y * this[6] + z * this[10];
            return result;
        }
    },
    m3_getMaxScaleOnAxis: {
        value: function () {
            var scaleXSq = this[0] * this[0] + this[1] * this[1] + this[2] * this[2];
            var scaleYSq = this[4] * this[4] + this[5] * this[5] + this[6] * this[6];
            var scaleZSq = this[8] * this[8] + this[9] * this[9] + this[10] * this[10];
            return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
        }
    }
});
Object.defineProperties(Float32Array.prototype, {
    v3_lengthSquared: {
        get: function () {
            var _a = this, x = _a[0], y = _a[1], z = _a[2];
            return x * x + y * y + z * z;
        }
    },
    v2_length: {
        get: function () {
            var _a = this, x = _a[0], y = _a[1];
            return Math.sqrt(x * x + y * y);
        }
    },
    v3_length: {
        get: function () {
            var _a = this, x = _a[0], y = _a[1], z = _a[2];
            return Math.sqrt(x * x + y * y + z * z);
        }
    },
    v3_add: {
        value: function (v, out) {
            var o = out || new Float32Array(4);
            for (var i = 0; i < 3; i++)
                o[i] = this[i] + v[i];
            return o;
        }
    },
    v3_sub: {
        value: function (v, out) {
            var o = out || new Float32Array(4);
            for (var i = 0; i < 3; i++)
                o[i] = this[i] - v[i];
            return o;
        }
    },
    v3_scale: {
        value: function (v) {
            this[0] *= v;
            this[1] *= v;
            this[2] *= v;
        }
    },
    v4_scale: {
        value: function (v) {
            this[0] *= v;
            this[1] *= v;
            this[2] *= v;
            this[3] *= v;
        }
    },
    v3_normalize: {
        value: function (from) {
            if (from) {
                this[0] = from[0];
                this[1] = from[1];
                this[2] = from[2];
            }
            var leng = this.v3_length;
            if (leng != 0) {
                var v = 1 / leng;
                this[0] *= v;
                this[1] *= v;
                this[2] *= v;
            }
        }
    },
    v3_dotProduct: {
        value: function (t) {
            return this[0] * t[0] + this[1] * t[1] + this[2] * t[2];
        }
    },
    v3_crossProduct: {
        value: function (t, out) {
            var _a = this, x = _a[0], y = _a[1], z = _a[2];
            var ax = t[0], ay = t[1], az = t[2];
            if (undefined == out) {
                out = new Float32Array(4);
            }
            out[0] = y * az - z * ay;
            out[1] = z * ax - x * az;
            out[2] = x * ay - y * ax;
            return out;
        }
    },
    v3_applyMatrix4: {
        value: function (e, out) {
            var _a = this, x = _a[0], y = _a[1], z = _a[2];
            if (undefined == out) {
                out = this;
            }
            var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
            out[0] = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
            out[1] = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
            out[2] = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
            out[3] = 1;
            return out;
        }
    }
});
Object.defineProperties(Float32Array.prototype, {
    m2_identity: {
        value: function () {
            this.set(rf_m2_identity);
        }
    },
    m2_clone: {
        value: function () {
            return new Float32Array(this);
        }
    },
    m2_scale: {
        value: function (scalex, scaley) {
            this[0] *= scalex;
            this[4] *= scaley;
        }
    },
    m2_rotate: {
        value: function (angle) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            var arr = new Float32Array(9);
            arr[0] = cos;
            arr[1] = sin;
            arr[3] = -sin;
            arr[4] = cos;
            this.m2_append(arr);
        }
    },
    m2_transformVector: {
        value: function (v, result) {
            var x = v[0], y = v[1];
            if (undefined == result) {
                result = new Float32Array(rf_v3_identity);
            }
            result[0] = x * this[0] + y * this[3] + this[6];
            result[1] = x * this[1] + y * this[4] + this[7];
            return result;
        }
    },
    m2_append: {
        value: function (m2, prepend, from) {
            var a;
            var b;
            if (!prepend) {
                a = from ? from : this;
                b = m2;
            }
            else {
                a = m2;
                b = from ? from : this;
            }
            var _a = a, a11 = _a[0], a12 = _a[1], a13 = _a[2], a21 = _a[3], a22 = _a[4], a23 = _a[5], a31 = _a[6], a32 = _a[7], a33 = _a[8];
            var _b = b, b11 = _b[0], b12 = _b[1], b13 = _b[2], b21 = _b[3], b22 = _b[4], b23 = _b[5], b31 = _b[6], b32 = _b[7], b33 = _b[8];
            this[0] = a11 * b11 + a12 * b21 + a13 * b31;
            this[1] = a11 * b12 + a12 * b22 + a13 * b32;
            this[2] = a11 * b13 + a12 * b23 + a13 * b33;
            this[3] = a21 * b11 + a22 * b21 + a23 * b31;
            this[4] = a21 * b12 + a22 * b22 + a23 * b32;
            this[5] = a21 * b13 + a22 * b23 + a23 * b33;
            this[6] = a31 * b11 + a32 * b21 + a33 * b31;
            this[7] = a31 * b12 + a32 * b22 + a33 * b32;
            this[8] = a31 * b13 + a32 * b23 + a33 * b33;
            return this;
        }
    },
    m2_decompose: {
        value: function (result) {
            var _a = this, m0 = _a[0], m1 = _a[1], m2 = _a[2], m3 = _a[3], m4 = _a[4], m5 = _a[5], m6 = _a[6], m7 = _a[7];
            var sx = Math.sqrt(m0 * m0 + m1 * m1), sy = Math.sqrt(m3 * m3 + m4 * m4);
            var x = m6, y = m7;
            var rotaiton = Math.acos(m0 / sx) * rf.RADIANS_TO_DEGREES;
            if (!result) {
                result = { x: x, y: y, scaleX: sx, scaleY: sy, rotaiton: rotaiton };
            }
            else {
                result.x = x;
                result.y = y;
                result.scaleX = sx;
                result.scaleY = sy;
                result.rotaiton = rotaiton;
            }
            return result;
        }
    },
    m2_recompose: {
        value: function (value) {
            var x = value.x === undefined ? 0 : value.x;
            var y = value.y === undefined ? 0 : value.y;
            var sx = value.scaleX === undefined ? 1 : value.scaleX;
            var sy = value.scaleY === undefined ? 1 : value.scaleY;
            var rotaiton = value.rotaiton === undefined ? 0 : value.rotaiton;
            rotaiton *= rf.DEGREES_TO_RADIANS;
            var cos = Math.cos(rotaiton), sin = Math.sin(rotaiton);
            this[0] = sx * cos;
            this[1] = -sin;
            this[3] = sin;
            this[4] = cos * sy;
            this[6] = x;
            this[7] = y;
        }
    }
});
var rf;
(function (rf) {
    var DEG_2_RAD = Math.PI / 180;
    function newMatrix3D(v) {
        var out;
        if (v instanceof ArrayBuffer) {
            out = new Float32Array(v);
        }
        else {
            if (undefined != v) {
                out = new Float32Array(v);
            }
            else {
                out = new Float32Array(rf_m3_identity);
            }
        }
        return out;
    }
    rf.newMatrix3D = newMatrix3D;
    function newMatrix(v) {
        var out;
        if (v instanceof ArrayBuffer) {
            out = new Float32Array(v);
        }
        else {
            if (undefined != v) {
                out = new Float32Array(v);
            }
            else {
                out = new Float32Array(rf_m2_identity);
            }
        }
        return out;
    }
    rf.newMatrix = newMatrix;
    function newVector3D(x, y, z, w) {
        if (undefined == x) {
            return new Float32Array(rf_v3_identity);
        }
        if (x instanceof ArrayBuffer) {
            return new Float32Array(x);
        }
        if (undefined == y) {
            y = 0;
        }
        if (undefined == z) {
            z = 0;
        }
        if (undefined == w) {
            w = 0;
        }
        return new Float32Array([Number(x), y, z, w]);
    }
    rf.newVector3D = newVector3D;
    function matrix2d_clearScale(matrix) {
    }
    rf.matrix2d_clearScale = matrix2d_clearScale;
    function qua_lerp(qa, qb, t, out) {
        var qax = qa[0], qay = qa[1], qaz = qa[2], qaw = qa[3];
        var qbx = qb[0], qby = qb[1], qbz = qb[2], qbw = qb[3];
        if (!out) {
            out = newVector3D();
        }
        if (qax * qbx + qay * qby + qaz * qbz + qaw * qbw < 0) {
            out[0] = qax + t * (-qbx - qax);
            out[1] = qay + t * (-qby - qay);
            out[2] = qaz + t * (-qbz - qaz);
            out[3] = qaw + t * (-qbw - qaw);
        }
        else {
            out[0] = qax + t * (qbx - qax);
            out[1] = qay + t * (qby - qay);
            out[2] = qaz + t * (qbz - qaz);
            out[3] = qaw + t * (qbw - qaw);
        }
        return out;
    }
    rf.qua_lerp = qua_lerp;
    function qua_slerp(qa, qb, t, out) {
        var x, y, z, w;
        var x1 = qa[0], y1 = qa[1], z1 = qa[2], w1 = qa[3];
        var x2 = qb[0], y2 = qb[1], z2 = qb[2], w2 = qb[3];
        var dot = x1 * x2 + y1 * y2 + z1 * z2 + w1 * w2;
        if (dot < 0) {
            dot = -dot;
            w2 = -w2;
            x2 = -x2;
            y2 = -y2;
            z2 = -z2;
        }
        if (dot < 0.95) {
            var angle = Math.acos(dot);
            var s = 1 / Math.sin(angle);
            var s1 = Math.sin(angle * (1 - t)) * s;
            var s2 = Math.sin(angle * t) * s;
            w = w1 * s1 + w2 * s2;
            x = x1 * s1 + x2 * s2;
            y = y1 * s1 + y2 * s2;
            z = z1 * s1 + z2 * s2;
        }
        else {
            w = w1 + t * (w2 - w1);
            x = x1 + t * (x2 - x1);
            y = y1 + t * (y2 - y1);
            z = z1 + t * (z2 - z1);
            var len = 1.0 / Math.sqrt(w * w + x * x + y * y + z * z);
            w *= len;
            x *= len;
            y *= len;
            z *= len;
        }
        if (!out) {
            out = newVector3D();
        }
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
    }
    rf.qua_slerp = qua_slerp;
    function pos_lerp(ap, bp, t, out) {
        var x = ap[0], y = ap[1], z = ap[2];
        if (!out) {
            out = newVector3D();
        }
        out[0] = x + t * (bp[0] - x);
        out[1] = y + t * (bp[1] - y);
        out[2] = z + t * (bp[2] - z);
        return out;
    }
    rf.pos_lerp = pos_lerp;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function size_checkIn(l, r, t, b, dx, dy, scale) {
        return dx > l * scale && dx < r * scale && dy > t * scale && dy < b * scale;
    }
    rf.size_checkIn = size_checkIn;
    function size_intersection(a, b, c) {
        c = c || {};
        var ax = a.x, ay = a.y, aw = a.w, ah = a.h;
        var bx = b.x, by = b.y, bw = b.w, bh = b.h;
        c.x = Math.max(ax, bx);
        c.y = Math.max(ay, by);
        c.w = Math.min(ax + aw, bx + bw) - c.x;
        c.h = Math.min(ay + ah, by + bh) - c.y;
        return c;
    }
    rf.size_intersection = size_intersection;
    rf.rgb_color_temp = new Float32Array([1, 1, 1, 1]);
    function hexToCSS(d, a) {
        if (a === void 0) { a = 1; }
        var r = ((d & 0x00ff0000) >>> 16) & 0xFF;
        var g = ((d & 0x0000ff00) >>> 8) & 0xFF;
        var b = d & 0x000000ff;
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
    rf.hexToCSS = hexToCSS;
    function toRGB(color, out) {
        if (undefined == out) {
            out = rf.newVector3D();
        }
        out[0] = ((color & 0x00ff0000) >>> 16) / 0xFF;
        out[1] = ((color & 0x0000ff00) >>> 8) / 0xFF;
        out[2] = (color & 0x000000ff) / 0xFF;
        out[3] = 1.0;
        return out;
    }
    rf.toRGB = toRGB;
    function toRGBA(color, out) {
        out = toRGB(color);
        out[3] = ((color & 0xff000000) >>> 24) / 0xFF;
        return out;
    }
    rf.toRGBA = toRGBA;
    function toCSS(color) {
        return "rgba(" + color[0] * 0xFF + "," + color[1] * 0xFF + "," + color[2] * 0xFF + "," + color[3] * 0xFF + ")";
    }
    rf.toCSS = toCSS;
    var Point = (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Object.defineProperty(Point.prototype, "length", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            enumerable: true,
            configurable: true
        });
        return Point;
    }());
    rf.Point = Point;
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect(x, y, w, h) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (w === void 0) { w = 0; }
            if (h === void 0) { h = 0; }
            var _this = _super.call(this, x, y) || this;
            _this.w = 0;
            _this.h = 0;
            _this.w = w;
            _this.h = h;
            return _this;
        }
        Rect.prototype.clone = function () {
            return new Rect(this.x, this.y, this.w, this.h);
        };
        return Rect;
    }(Point));
    rf.Rect = Rect;
    rf.RADIANS_TO_DEGREES = 180 / Math.PI;
    rf.DEGREES_TO_RADIANS = Math.PI / 180;
    rf.tempAxeX = rf.newVector3D();
    rf.tempAxeY = rf.newVector3D();
    rf.tempAxeZ = rf.newVector3D();
    rf.X_AXIS = rf.newVector3D(1, 0, 0);
    rf.Y_AXIS = rf.newVector3D(0, 1, 0);
    rf.Z_AXIS = rf.newVector3D(0, 0, 1);
    rf.PI2 = Math.PI * 2;
    rf.RAW_DATA_CONTAINER = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
    rf.TEMP_MATRIX3D = rf.newMatrix3D();
    rf.TEMP_MATRIX2D = rf.newMatrix();
    rf.TEMP_VECTOR3D = rf.newVector3D();
    rf.TEMP_MatrixComposeData = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotaiton: 0 };
    function newCallBackFunction(func, thisobj) {
        return { func: func, thisobj: thisobj };
    }
    rf.newCallBackFunction = newCallBackFunction;
    function callFunction(func) {
        func.func.call(func.thisobj);
    }
    rf.callFunction = callFunction;
    rf.Location = {
        getDist: function (l1, l2) {
            var dtr = rf.DEGREES_TO_RADIANS;
            var radlat1 = l1.latitude * dtr;
            var radlat2 = l2.latitude * dtr;
            var a = radlat1 - radlat2;
            var b = (l1.longitude - l2.longitude) * dtr;
            return Math.asin(Math.sqrt(Math.pow(Math.sin(a * .5), 2) + Math.cos(radlat1) * Math.cos(radlat2) * (Math.pow(Math.sin(b * .5), 2)))) * 12756274;
        }
    };
    rf.EMPTY_POINT2D = new Point();
    rf.EMPTY_POINT2D_2 = new Point();
    rf.EMPTY_POINT2D_3 = new Point();
    function m2dTransform(matrix, p, out) {
        var _a = matrix, m11 = _a[0], m12 = _a[1], m13 = _a[2], m21 = _a[3], m22 = _a[4], m23 = _a[5], m31 = _a[6], m32 = _a[7], m33 = _a[8];
        var x = p[0] - m31;
        var y = p[1] - m32;
        var dx = x * m11 + y * m21;
        var dy = x * m12 + y * m22;
        out[0] = dx + m31;
        out[1] = dy + m32;
    }
    rf.m2dTransform = m2dTransform;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var BitmapData = (function () {
        function BitmapData(width, height, transparent, fillColor) {
            if (transparent === void 0) { transparent = true; }
            if (fillColor === void 0) { fillColor = 0xFFFFFFFF; }
            this._transparent = transparent;
            var canvas = wx.createCanvas();
            canvas.width = width;
            canvas.height = height;
            this.canvas = canvas;
        }
        Object.defineProperty(BitmapData.prototype, "context", {
            get: function () {
                if (!this._context) {
                    var con = this.canvas.getContext("2d");
                    if (con) {
                        this._context = con;
                        con.textAlign = "left";
                        con.textBaseline = "middle";
                    }
                    else {
                        rf.log("create 2dcontext error! w:" + this.canvas.width + " h:" + this.canvas.height);
                    }
                }
                return this._context;
            },
            enumerable: true,
            configurable: true
        });
        BitmapData.fromImageElement = function (img) {
            var bmd = new BitmapData(img.width, img.height, true);
            var context = bmd.context;
            if (context) {
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
            }
            return bmd;
        };
        Object.defineProperty(BitmapData.prototype, "width", {
            get: function () {
                return this.canvas.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapData.prototype, "height", {
            get: function () {
                return this.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapData.prototype, "rect", {
            get: function () {
                return this._rect;
            },
            enumerable: true,
            configurable: true
        });
        BitmapData.prototype.getImageData = function (x, y, w, h) {
            return this.context.getImageData(x, y, w, h);
        };
        BitmapData.prototype.copyPixels = function (sourceBitmapData, sourceRect, destPoint) {
            var context = this.context;
            if (context) {
                if (sourceBitmapData instanceof BitmapData)
                    this.context.drawImage(sourceBitmapData.canvas, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h, destPoint.x, destPoint.y, sourceRect.w, sourceRect.h);
                else {
                    this.context.drawImage(sourceBitmapData, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h, destPoint.x, destPoint.y, sourceRect.w, sourceRect.h);
                }
            }
        };
        BitmapData.prototype.draw = function (source) {
            var context = this.context;
            if (context) {
                if (source instanceof BitmapData) {
                    context.drawImage(source.canvas, 0, 0);
                }
                else {
                    context.drawImage(source, 0, 0);
                }
            }
        };
        BitmapData.prototype.fillRect = function (x, y, width, height, css) {
            var context = this.context;
            if (context) {
                context.fillStyle = css;
                context.fillRect(x, y, width, height);
            }
        };
        return BitmapData;
    }());
    rf.BitmapData = BitmapData;
    var MaxRectsBinPack = (function () {
        function MaxRectsBinPack(width, height, rotations) {
            if (rotations === void 0) { rotations = false; }
            this.binWidth = 0;
            this.binHeight = 0;
            this.allowRotations = false;
            this.usedRects = [];
            this.freeRects = [];
            this.score1 = 0;
            this.score2 = 0;
            this.binWidth = width;
            this.binHeight = height;
            this.allowRotations = rotations;
            var n = new rf.Rect();
            n.x = 0;
            n.y = 0;
            n.w = width;
            n.h = height;
            this.usedRects.length = 0;
            this.freeRects.length = 0;
            this.freeRects.push(n);
        }
        MaxRectsBinPack.prototype.count = function (n) {
            if (n >= 2)
                return this.count(n / 2);
            return n;
        };
        MaxRectsBinPack.prototype.insert = function (width, height, method) {
            if (method === void 0) { method = 0; }
            var newNode = new rf.Rect();
            this.score1 = 0;
            this.score2 = 0;
            switch (method) {
                case MaxRectsBinPack.BESTSHORTSIDEFIT:
                    newNode = this.findPositionForNewNodeBestShortSideFit(width, height);
                    break;
                case MaxRectsBinPack.BOTTOMLEFTRULE:
                    newNode = this.findPositionForNewNodeBottomLeft(width, height, this.score1, this.score2);
                    break;
                case MaxRectsBinPack.CONTACTPOINTRULE:
                    newNode = this.findPositionForNewNodeContactPoint(width, height, this.score1);
                    break;
                case MaxRectsBinPack.BESTLONGSIDEFIT:
                    newNode = this.findPositionForNewNodeBestLongSideFit(width, height, this.score2, this.score1);
                    break;
                case MaxRectsBinPack.BESTAREAFIT:
                    newNode = this.findPositionForNewNodeBestAreaFit(width, height, this.score1, this.score2);
                    break;
            }
            if (newNode.h == 0)
                return newNode;
            this.placeRect(newNode);
            return newNode;
        };
        MaxRectsBinPack.prototype.insert2 = function (Rects, dst, method) {
            dst.length = 0;
            while (Rects.length > 0) {
                var bestScore1 = Infinity;
                var bestScore2 = Infinity;
                var bestRectIndex = -1;
                var bestNode = new rf.Rect();
                for (var i = 0; i < Rects.length; ++i) {
                    var score1 = 0;
                    var score2 = 0;
                    var newNode = this.scoreRect(Rects[i].w, Rects[i].h, method, score1, score2);
                    if (score1 < bestScore1 || (score1 == bestScore1 && score2 < bestScore2)) {
                        bestScore1 = score1;
                        bestScore2 = score2;
                        bestNode = newNode;
                        bestRectIndex = i;
                    }
                }
                if (bestRectIndex == -1)
                    return;
                this.placeRect(bestNode);
                Rects.splice(bestRectIndex, 1);
            }
        };
        MaxRectsBinPack.prototype.placeRect = function (node) {
            var numRectsToProcess = this.freeRects.length;
            for (var i = 0; i < numRectsToProcess; i++) {
                if (this.splitFreeNode(this.freeRects[i], node)) {
                    this.freeRects.splice(i, 1);
                    --i;
                    --numRectsToProcess;
                }
            }
            this.
                pruneFreeList();
            this.usedRects.push(node);
        };
        MaxRectsBinPack.prototype.scoreRect = function (width, height, method, score1, score2) {
            var newNode = new rf.Rect();
            score1 = Infinity;
            score2 = Infinity;
            switch (method) {
                case MaxRectsBinPack.BESTSHORTSIDEFIT:
                    newNode = this.findPositionForNewNodeBestShortSideFit(width, height);
                    break;
                case MaxRectsBinPack.BOTTOMLEFTRULE:
                    newNode = this.findPositionForNewNodeBottomLeft(width, height, score1, score2);
                    break;
                case MaxRectsBinPack.CONTACTPOINTRULE:
                    newNode = this.findPositionForNewNodeContactPoint(width, height, score1);
                    score1 = -score1;
                    break;
                case MaxRectsBinPack.BESTLONGSIDEFIT:
                    newNode = this.findPositionForNewNodeBestLongSideFit(width, height, score2, score1);
                    break;
                case MaxRectsBinPack.BESTAREAFIT:
                    newNode = this.findPositionForNewNodeBestAreaFit(width, height, score1, score2);
                    break;
            }
            if (newNode.h == 0) {
                score1 = Infinity;
                score2 = Infinity;
            }
            return newNode;
        };
        MaxRectsBinPack.prototype.occupancy = function () {
            var usedSurfaceArea = 0;
            for (var i = 0; i < this.usedRects.length; i++)
                usedSurfaceArea += this.usedRects[i].w * this.usedRects[i].h;
            return usedSurfaceArea / (this.binWidth * this.binHeight);
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeBottomLeft = function (width, height, bestY, bestX) {
            var bestNode = new rf.Rect();
            bestY = Infinity;
            var rect;
            var topSideY;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                if (rect.w >= width && rect.h >= height) {
                    topSideY = rect.y + height;
                    if (topSideY < bestY || (topSideY == bestY && rect.x < bestX)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        bestY = topSideY;
                        bestX = rect.x;
                    }
                }
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    topSideY = rect.y + width;
                    if (topSideY < bestY || (topSideY == bestY && rect.x < bestX)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        bestY = topSideY;
                        bestX = rect.x;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeBestShortSideFit = function (width, height) {
            var bestNode = new rf.Rect();
            this.
                bestShortSideFit = Infinity;
            this.bestLongSideFit = this.score2;
            var rect;
            var leftoverHoriz;
            var leftoverVert;
            var shortSideFit;
            var longSideFit;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                if (rect.w >= width && rect.h >= height) {
                    leftoverHoriz = Math.abs(rect.w - width);
                    leftoverVert = Math.abs(rect.h - height);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    longSideFit = Math.max(leftoverHoriz, leftoverVert);
                    if (shortSideFit < this.bestShortSideFit || (shortSideFit == this.bestShortSideFit && longSideFit < this.bestLongSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        this.bestShortSideFit = shortSideFit;
                        this.bestLongSideFit = longSideFit;
                    }
                }
                var flippedLeftoverHoriz;
                var flippedLeftoverVert;
                var flippedShortSideFit;
                var flippedLongSideFit;
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    flippedLeftoverHoriz = Math.abs(rect.w - height);
                    flippedLeftoverVert = Math.abs(rect.h - width);
                    flippedShortSideFit = Math.min(flippedLeftoverHoriz, flippedLeftoverVert);
                    flippedLongSideFit = Math.max(flippedLeftoverHoriz, flippedLeftoverVert);
                    if (flippedShortSideFit < this.bestShortSideFit || (flippedShortSideFit == this.bestShortSideFit && flippedLongSideFit < this.bestLongSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        this.bestShortSideFit = flippedShortSideFit;
                        this.bestLongSideFit = flippedLongSideFit;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeBestLongSideFit = function (width, height, bestShortSideFit, bestLongSideFit) {
            var bestNode = new rf.Rect();
            bestLongSideFit = Infinity;
            var rect;
            var leftoverHoriz;
            var leftoverVert;
            var shortSideFit;
            var longSideFit;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                if (rect.w >= width && rect.h >= height) {
                    leftoverHoriz = Math.abs(rect.w - width);
                    leftoverVert = Math.abs(rect.h - height);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    longSideFit = Math.max(leftoverHoriz, leftoverVert);
                    if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        bestShortSideFit = shortSideFit;
                        bestLongSideFit = longSideFit;
                    }
                }
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    leftoverHoriz = Math.abs(rect.w - height);
                    leftoverVert = Math.abs(rect.h - width);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    longSideFit = Math.max(leftoverHoriz, leftoverVert);
                    if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        bestShortSideFit = shortSideFit;
                        bestLongSideFit = longSideFit;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeBestAreaFit = function (width, height, bestAreaFit, bestShortSideFit) {
            var bestNode = new rf.Rect();
            bestAreaFit = Infinity;
            var rect;
            var leftoverHoriz;
            var leftoverVert;
            var shortSideFit;
            var areaFit;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                areaFit = rect.w * rect.h - width * height;
                if (rect.w >= width && rect.h >= height) {
                    leftoverHoriz = Math.abs(rect.w - width);
                    leftoverVert = Math.abs(rect.h - height);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        bestShortSideFit = shortSideFit;
                        bestAreaFit = areaFit;
                    }
                }
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    leftoverHoriz = Math.abs(rect.w - height);
                    leftoverVert = Math.abs(rect.h - width);
                    shortSideFit = Math.min(leftoverHoriz, leftoverVert);
                    if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        bestShortSideFit = shortSideFit;
                        bestAreaFit = areaFit;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.commonIntervalLength = function (i1start, i1end, i2start, i2end) {
            if (i1end < i2start || i2end < i1start)
                return 0;
            return Math.min(i1end, i2end) - Math.max(i1start, i2start);
        };
        MaxRectsBinPack.prototype.contactPointScoreNode = function (x, y, width, height) {
            var score = 0;
            if (x == 0 || x + width == this.binWidth)
                score += height;
            if (y == 0 || y + height == this.binHeight)
                score += width;
            var rect;
            for (var i = 0; i < this.usedRects.length; i++) {
                rect = this.usedRects[i];
                if (rect.x == x + width || rect.x + rect.w == x)
                    score += this.commonIntervalLength(rect.y, rect.y + rect.h, y, y + height);
                if (rect.y == y + height || rect.y + rect.h == y)
                    score += this.commonIntervalLength(rect.x, rect.x + rect.w, x, x + width);
            }
            return score;
        };
        MaxRectsBinPack.prototype.findPositionForNewNodeContactPoint = function (width, height, bestContactScore) {
            var bestNode = new rf.Rect();
            bestContactScore = -1;
            var rect;
            var score;
            for (var i = 0; i < this.freeRects.length; i++) {
                rect = this.freeRects[i];
                if (rect.w >= width && rect.h >= height) {
                    score = this.contactPointScoreNode(rect.x, rect.y, width, height);
                    if (score > bestContactScore) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = width;
                        bestNode.h = height;
                        bestContactScore = score;
                    }
                }
                if (this.allowRotations && rect.w >= height && rect.h >= width) {
                    score = this.contactPointScoreNode(rect.x, rect.y, height, width);
                    if (score > bestContactScore) {
                        bestNode.x = rect.x;
                        bestNode.y = rect.y;
                        bestNode.w = height;
                        bestNode.h = width;
                        bestContactScore = score;
                    }
                }
            }
            return bestNode;
        };
        MaxRectsBinPack.prototype.splitFreeNode = function (freeNode, usedNode) {
            if (usedNode.x >= freeNode.x + freeNode.w || usedNode.x + usedNode.w <= freeNode.x ||
                usedNode.y >= freeNode.y + freeNode.h || usedNode.y + usedNode.h <= freeNode.y)
                return false;
            var newNode;
            if (usedNode.x < freeNode.x + freeNode.w && usedNode.x + usedNode.w > freeNode.x) {
                if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.h) {
                    newNode = freeNode.clone();
                    newNode.h = usedNode.y - newNode.y;
                    this.freeRects.push(newNode);
                }
                if (usedNode.y + usedNode.h < freeNode.y + freeNode.h) {
                    newNode = freeNode.clone();
                    newNode.y = usedNode.y + usedNode.h;
                    newNode.h = freeNode.y + freeNode.h - (usedNode.y + usedNode.h);
                    this.freeRects.push(newNode);
                }
            }
            if (usedNode.y < freeNode.y + freeNode.h && usedNode.y + usedNode.h > freeNode.y) {
                if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.w) {
                    newNode = freeNode.clone();
                    newNode.w = usedNode.x - newNode.x;
                    this.freeRects.push(newNode);
                }
                if (usedNode.x + usedNode.w < freeNode.x + freeNode.w) {
                    newNode = freeNode.clone();
                    newNode.x = usedNode.x + usedNode.w;
                    newNode.w = freeNode.x + freeNode.w - (usedNode.x + usedNode.w);
                    this.freeRects.push(newNode);
                }
            }
            return true;
        };
        MaxRectsBinPack.prototype.pruneFreeList = function () {
            for (var i = 0; i < this.freeRects.length; i++)
                for (var j = i + 1; j < this.freeRects.length; j++) {
                    if (this.isContainedIn(this.freeRects[i], this.freeRects[j])) {
                        this.freeRects.splice(i, 1);
                        break;
                    }
                    if (this.isContainedIn(this.freeRects[j], this.freeRects[i])) {
                        this.freeRects.splice(j, 1);
                    }
                }
        };
        MaxRectsBinPack.prototype.isContainedIn = function (a, b) {
            return a.x >= b.x && a.y >= b.y
                && a.x + a.w <= b.x + b.w
                && a.y + a.h <= b.y + b.h;
        };
        MaxRectsBinPack.BESTSHORTSIDEFIT = 0;
        MaxRectsBinPack.BESTLONGSIDEFIT = 1;
        MaxRectsBinPack.BESTAREAFIT = 2;
        MaxRectsBinPack.BOTTOMLEFTRULE = 3;
        MaxRectsBinPack.CONTACTPOINTRULE = 4;
        return MaxRectsBinPack;
    }());
    rf.MaxRectsBinPack = MaxRectsBinPack;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ClassFactory = (function () {
        function ClassFactory(creator, props) {
            this._creator = creator;
            if (props != undefined)
                this._props = props;
        }
        ClassFactory.prototype.get = function () {
            var ins = new this._creator();
            var p = this._props;
            for (var key in p) {
                ins[key] = p[key];
            }
            return ins;
        };
        return ClassFactory;
    }());
    rf.ClassFactory = ClassFactory;
    function pro_copy(to, pros) {
        for (var key in pros) {
            to[key] = pros[key];
        }
    }
    rf.pro_copy = pro_copy;
    var RecyclablePool = (function () {
        function RecyclablePool(TCreator, max) {
            if (max === void 0) { max = 100; }
            this._pool = [];
            this._max = max;
            this._creator = TCreator;
        }
        RecyclablePool.prototype.get = function (params) {
            var ins;
            var pool = this._pool;
            if (pool.length) {
                ins = pool.pop();
            }
            else {
                ins = new this._creator();
            }
            if (params) {
                pro_copy(ins, params);
            }
            if (typeof ins.onSpawn === "function") {
                ins.onSpawn();
            }
            ins._insid = _recid++;
            return ins;
        };
        RecyclablePool.prototype.recycle = function (t) {
            var pool = this._pool;
            var idx = pool.indexOf(t);
            if (!~idx) {
                if (typeof t.onRecycle === "function") {
                    t.onRecycle();
                }
                if (pool.length < this._max) {
                    pool.push(t);
                }
            }
        };
        return RecyclablePool;
    }());
    rf.RecyclablePool = RecyclablePool;
    var _recid = 0;
    function recyclable(clazz, addInstanceRecycle, params) {
        var pool;
        if (clazz.hasOwnProperty("_pool")) {
            pool = clazz._pool;
        }
        if (!pool) {
            if (addInstanceRecycle) {
                pool = new RecyclablePool(function () {
                    var ins = new clazz();
                    ins.recycle = recycle;
                    return ins;
                });
            }
            else {
                pool = new RecyclablePool(clazz);
                var pt = clazz.prototype;
                if (!pt.hasOwnProperty("recycle")) {
                    pt.recycle = recycle;
                }
            }
            Object.defineProperty(clazz, "_pool", {
                value: pool
            });
        }
        return pool.get(params);
        function recycle() {
            pool.recycle(this);
        }
    }
    rf.recyclable = recyclable;
    function singleton(clazz) {
        var instance;
        if (clazz.hasOwnProperty("_instance")) {
            instance = clazz._instance;
        }
        if (!instance) {
            instance = new clazz;
            Object.defineProperty(clazz, "_instance", {
                value: instance
            });
        }
        return instance;
    }
    rf.singleton = singleton;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var LinkVO = (function () {
        function LinkVO() {
            this.close = true;
            this.weight = 0;
            this.time = 0;
        }
        LinkVO.prototype.onRecycle = function () {
            this.data = undefined;
            this.args = undefined;
            this.thisObj = undefined;
            this.next = undefined;
            this.pre = undefined;
            this.weight = 0;
            this.close = true;
        };
        LinkVO.prototype.onSpawn = function () {
            this.close = false;
        };
        return LinkVO;
    }());
    rf.LinkVO = LinkVO;
    var Link = (function () {
        function Link() {
            this.last = undefined;
            this.first = undefined;
            this.length = 0;
            this.warningMax = 200;
            this.checkSameData = true;
            this.lock = false;
        }
        Link.prototype.getFrist = function () {
            if (undefined == this.first)
                return undefined;
            var vo = this.first;
            while (vo) {
                if (false == vo.close) {
                    return vo;
                }
                vo = vo.next;
            }
            return undefined;
        };
        Link.prototype.getLast = function () {
            if (undefined == this.last)
                return undefined;
            var vo = this.last;
            while (vo) {
                if (false == vo.close) {
                    return vo;
                }
                vo = vo.pre;
            }
            return undefined;
        };
        Link.prototype.getValueLink = function (value, thisObj) {
            var vo = this.getFrist();
            if (undefined == vo)
                return undefined;
            while (vo) {
                if (false == vo.close) {
                    if (value == vo.data && thisObj == vo.thisObj) {
                        return vo;
                    }
                }
                vo = vo.next;
            }
            return undefined;
        };
        Link.prototype.add = function (value, thisObj, args) {
            if (!value)
                return undefined;
            var vo;
            if (this.checkSameData) {
                vo = this.getValueLink(value, thisObj);
                if (vo && vo.close == false)
                    return vo;
            }
            vo = rf.recyclable(LinkVO);
            vo.data = value;
            vo.args = args;
            vo.thisObj = thisObj;
            this.length++;
            if (undefined == this.first) {
                this.first = this.last = vo;
            }
            else {
                vo.pre = this.last;
                this.last.next = vo;
                this.last = vo;
            }
            return vo;
        };
        Link.prototype.addByWeight = function (value, weight, thisObj, args) {
            if (!value)
                return undefined;
            var vo;
            if (this.checkSameData) {
                vo = this.getValueLink(value, thisObj);
                if (vo && vo.close == false) {
                    if (weight == vo.weight) {
                        return vo;
                    }
                    vo.close = true;
                }
            }
            vo = rf.recyclable(LinkVO);
            vo.weight = weight;
            vo.data = value;
            vo.thisObj = thisObj;
            vo.args = args;
            this.length++;
            if (undefined == this.first) {
                this.first = this.last = vo;
            }
            else {
                var tempvo = this.getFrist();
                if (undefined == tempvo) {
                    vo.pre = this.last;
                    this.last.next = vo;
                    this.last = vo;
                }
                else {
                    while (tempvo) {
                        if (false == tempvo.close) {
                            if (tempvo.weight < weight) {
                                vo.next = tempvo;
                                vo.pre = tempvo.pre;
                                if (undefined != tempvo.pre) {
                                    tempvo.pre.next = vo;
                                }
                                tempvo.pre = vo;
                                if (tempvo == this.first) {
                                    this.first = vo;
                                }
                                break;
                            }
                        }
                        tempvo = tempvo.next;
                    }
                    if (undefined == tempvo) {
                        vo.pre = this.last;
                        this.last.next = vo;
                        this.last = vo;
                    }
                }
            }
            return vo;
        };
        Link.prototype.remove = function (value, thisObj) {
            var vo = this.getValueLink(value, thisObj);
            if (!vo)
                return;
            this.removeLink(vo);
        };
        Link.prototype.removeLink = function (vo) {
            this.length--;
            vo.close = true;
            vo.data = null;
            rf.callLater.later(this.clean, this, 500);
        };
        Link.prototype.clean = function () {
            var vo = this.first;
            var next;
            this.length = 0;
            while (vo) {
                next = vo.next;
                if (true == vo.close) {
                    if (vo == this.first) {
                        this.first = vo.next;
                        if (undefined != this.first) {
                            this.first.pre = undefined;
                        }
                    }
                    else {
                        vo.pre.next = vo.next;
                    }
                    if (vo == this.last) {
                        this.last = vo.pre;
                        if (undefined != this.last) {
                            this.last.next = undefined;
                        }
                    }
                    else {
                        vo.next.pre = vo.pre;
                    }
                    vo.recycle();
                }
                else {
                    this.length++;
                }
                vo = next;
            }
        };
        Link.prototype.pop = function () {
            var vo = this.getLast();
            if (vo) {
                var data = vo.data;
                this.removeLink(vo);
                return data;
            }
            return undefined;
        };
        Link.prototype.shift = function () {
            var vo = this.getFrist();
            if (vo) {
                var data = vo.data;
                this.removeLink(vo);
                return data;
            }
            return undefined;
        };
        Link.prototype.exec = function (f) {
            if (undefined == f)
                return;
            var vo = this.getFrist();
            while (vo) {
                var next = vo.next;
                if (false == vo.close) {
                    f(vo.data);
                }
                vo = vo.next;
            }
        };
        Link.prototype.onRecycle = function () {
            var vo = this.first;
            var next;
            while (vo) {
                next = vo.next;
                vo.recycle();
                vo = next;
            }
            this.first = this.last = undefined;
            this.length = 0;
            this.checkSameData = true;
        };
        Link.prototype.toString = function () {
            var vo = this.getFrist();
            var s = "list:";
            while (vo) {
                var next = vo.next;
                if (false == vo.close) {
                    s += vo.data + ",";
                }
                vo = vo.next;
            }
            return s;
        };
        Object.defineProperty(Link.prototype, "datas", {
            get: function () {
                var arr = [];
                for (var vo = this.getFrist(); vo; vo = vo.next) {
                    if (vo.close == false) {
                        arr.push(vo.data);
                    }
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        return Link;
    }());
    rf.Link = Link;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var EventX = (function () {
        function EventX(type, data, bubbles) {
            this.type = undefined;
            this.type = type;
            this.data = data;
            this.bubbles = bubbles;
        }
        EventX.prototype.onRecycle = function () {
            this.data = undefined;
            this.type = undefined;
            this.target = undefined;
            this.currentTarget = undefined;
            this.bubbles = false;
            this.stopPropagation = false;
            this.stopImmediatePropagation = false;
        };
        EventX.TEMP = new EventX();
        return EventX;
    }());
    rf.EventX = EventX;
    var MiniDispatcher = (function () {
        function MiniDispatcher(target) {
            if (target === void 0) { target = null; }
            this.addEventListener = this.on;
            this.removeEventListener = this.off;
            this.hasEventListener = this.has;
            if (target == null) {
                target = this;
            }
            this.mTarget = target;
        }
        MiniDispatcher.prototype.on = function (type, listener, thisObject, priority) {
            if (priority === void 0) { priority = 0; }
            if (undefined == this.mEventListeners) {
                this.mEventListeners = {};
            }
            var signal = this.mEventListeners[type];
            if (signal == null) {
                signal = this.mEventListeners[type] = rf.recyclable(rf.Link);
            }
            if (signal.lock) {
                var extend = signal.extendparam;
                if (!extend) {
                    signal.extendparam = extend = [];
                }
                for (var i = 0; i < extend.length; i++) {
                    var element = extend[i];
                    if (element[0] == listener && element[2] == thisObject) {
                        element[1] = priority;
                        return;
                    }
                }
                extend.push([listener, priority, thisObject]);
            }
            else {
                signal.addByWeight(listener, priority, thisObject);
            }
        };
        MiniDispatcher.prototype.off = function (type, listener, thisObject) {
            if (undefined != this.mEventListeners) {
                var signal = this.mEventListeners[type];
                if (undefined == signal)
                    return;
                signal.remove(listener, thisObject);
                var extendparam = signal.extendparam;
                if (extendparam) {
                    for (var i = 0; i < extendparam.length; i++) {
                        var element = extendparam[i];
                        if (element[0] == listener && element[2] == thisObject) {
                            extendparam.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        };
        MiniDispatcher.prototype.removeEventListeners = function (type) {
            if (type === void 0) { type = undefined; }
            var signal;
            if (type && this.mEventListeners) {
                signal = this.mEventListeners[type];
                if (signal) {
                    signal.recycle();
                    this.mEventListeners[type] = undefined;
                }
                delete this.mEventListeners[type];
            }
            else if (this.mEventListeners) {
                for (type in this.mEventListeners) {
                    signal = this.mEventListeners[type];
                    if (signal) {
                        signal.extendparam = undefined;
                        signal.recycle();
                        this.mEventListeners[type] = undefined;
                    }
                }
                this.mEventListeners = undefined;
            }
        };
        MiniDispatcher.prototype.dispatchEvent = function (event) {
            var mEventListeners = this.mEventListeners;
            if (!mEventListeners || !mEventListeners[event.type]) {
                return false;
            }
            event.currentTarget = this.mTarget;
            var signal = mEventListeners[event.type];
            signal.lock = true;
            for (var vo = signal.getFrist(); vo; vo = vo.next) {
                if (event.stopPropagation || event.stopImmediatePropagation) {
                    break;
                }
                if (false == vo.close) {
                    var f = vo.data;
                    if (undefined != f) {
                        f.call(vo.thisObj, event);
                    }
                }
            }
            signal.lock = false;
            var extendparam = signal.extendparam;
            if (extendparam) {
                for (var i = 0; i < extendparam.length; i++) {
                    var _a = extendparam[i], listener = _a[0], priority = _a[1], thisObject = _a[2];
                    signal.addByWeight(listener, priority, thisObject);
                }
                signal.extendparam = undefined;
            }
            return false == event.stopPropagation;
        };
        MiniDispatcher.prototype.simpleDispatch = function (type, data, bubbles) {
            if (data === void 0) { data = undefined; }
            if (bubbles === void 0) { bubbles = false; }
            if (!bubbles && (undefined == this.mEventListeners || undefined == this.mEventListeners[type])) {
                return false;
            }
            var event = rf.recyclable(EventX);
            event.type = type;
            event.data = data;
            event.bubbles = bubbles;
            event.target = this.mTarget;
            var bool = this.dispatchEvent(event);
            event.recycle();
            return bool;
        };
        MiniDispatcher.prototype.has = function (type) {
            if (undefined == this.mEventListeners) {
                return false;
            }
            var signal = this.mEventListeners[type];
            if (undefined == signal || 0 >= signal.length) {
                return false;
            }
            return true;
        };
        MiniDispatcher.prototype.onRecycle = function () {
            this.removeEventListeners();
        };
        return MiniDispatcher;
    }());
    rf.MiniDispatcher = MiniDispatcher;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var EngineEvent = (function () {
        function EngineEvent() {
        }
        EngineEvent.VISIBILITY_CHANGE = 'visibility_change';
        EngineEvent.FPS_CHANGE = 'FPS_CHANGE';
        return EngineEvent;
    }());
    rf.EngineEvent = EngineEvent;
    function newTimeMixer(target, now, tm, speed) {
        if (now === void 0) { now = 0; }
        if (speed === void 0) { speed = 1; }
        var t = { target: target, now: now, speed: speed, parent: tm, childs: [] };
        if (tm) {
            tm.childs.push(t);
        }
        return t;
    }
    rf.newTimeMixer = newTimeMixer;
    function removeTimeMixer(tm) {
        var parent = tm.parent;
        if (parent) {
            parent.childs.remove(tm);
        }
    }
    rf.removeTimeMixer = removeTimeMixer;
    function tm_add(t, interval) {
        if (!t.pause) {
            t.interval = interval *= t.speed;
            t.now += interval;
            var childs = t.childs;
            for (var i = 0; i < childs.length; i++) {
                var element = childs[i];
                tm_add(element, interval);
            }
        }
        return t.now;
    }
    rf.tm_add = tm_add;
    function tm_set(t, now) {
        var interval = now - t.now;
        t.now = now;
        var childs = t.childs;
        for (var i = 0; i < childs.length; i++) {
            var element = childs[i];
            tm_add(element, interval);
        }
    }
    rf.tm_set = tm_set;
    rf.nativeMouseX = 0;
    rf.nativeMouseY = 0;
    rf.nextUpdateTime = 0;
    rf.lastUpdateTime = 0;
    rf.lastUpdateDate = 0;
    rf.frameInterval = 0;
    rf.engineNow = 0;
    var _sharedDate = new Date();
    var _utcOffset = -_sharedDate.getTimezoneOffset() * 60000;
    function getUTCTime(time) {
        return time + _utcOffset;
    }
    rf.getUTCTime = getUTCTime;
    function getFormatTime(time, format, isRaw) {
        if (isRaw === void 0) { isRaw = true; }
        if (isRaw) {
            time = this.getUTCTime(time);
        }
        _sharedDate.setTime(time);
        return _sharedDate.format(format);
    }
    rf.getFormatTime = getFormatTime;
    function getProxTime(sec) {
        sec *= 1000;
        if (sec < 1800) {
            return Math.ceil(sec / 60) + "分钟";
        }
        else if (sec < 86400000) {
            return Math.ceil(sec / 3600) + "小时";
        }
        else if (sec < 604800000) {
            return Math.ceil(sec / 86400000) + "天";
        }
        else {
            return "7天";
        }
    }
    rf.getProxTime = getProxTime;
    rf.getT = Date.now;
    rf.defaultTimeMixer = newTimeMixer(undefined, 0.0, undefined, 1.0);
    function setContextMatrix(width, height, x, y) {
        console.log("setContextMatrix", width, height, x, y);
        var h = height;
        var p = rf.stageWidth / rf.stageHeight;
        var w = Math.round(h * p);
        if (w > width) {
            w = width;
            h = width / p;
        }
        var s = (w * rf.pixelRatio) / rf.stageWidth;
        rf.pixelFont = rf.isMobile ? s : 1;
        var m = rf.contextMatrix;
        m.m3_identity();
        m.m3_scale(s, s, 1);
        m.m3_translation(((width - w) >> 1) * rf.pixelRatio, ((height - h) >> 1) * rf.pixelRatio, 0);
        m.m3_translation(x, y, 0);
        rf.contextInvMatrix.m3_invert(m);
        rf.ROOT.camera.status = 1;
        rf.ROOT.cameraUI.status = 1;
        if (!rf.weixin) {
            var container2d = {};
            container2d.transform = "matrix3d(" + rf.contextMatrix.m3_toString(rf.pixelRatio) + ")";
            wx.resetCssStyle({ container2d: container2d });
        }
    }
    rf.setContextMatrix = setContextMatrix;
    function defaultResize(width, height) {
        rf.innerWidth = width * rf.pixelRatio;
        rf.innerHeight = height * rf.pixelRatio;
        if (rf.isMobile) {
            if (rf.softKeyboard) {
                rf.onResizeKeboard(width, height);
                return;
            }
        }
        if (rf.lockStageArea) {
            setContextMatrix(width, height, 0, 0);
        }
        else {
            rf.stageWidth = rf.innerWidth;
            rf.stageHeight = rf.innerHeight;
            rf.pixelScale = rf.pixelRatio;
        }
    }
    rf.defaultResize = defaultResize;
    rf.resizeStageSizeFunction = defaultResize;
    var Engine = (function () {
        function Engine() {
        }
        Engine.setDisplayArea = function (width, height) {
            rf.lockStageArea = true;
            rf.stageWidth = width;
            rf.stageHeight = height;
            rf.isWindowResized = true;
        };
        Engine.start = function () {
            Engine.startTime = Date.now();
            rf.engineNow = 0;
            Engine.frameRate = Engine._frameRate;
            rf.nextUpdateTime = rf.frameInterval;
            rf.lastUpdateTime = Engine.startTime;
            Engine._nextProfileTime = 1000;
            var animationRequest = requestAnimationFrame;
            function onAnimationChange(time) {
                animationRequest(onAnimationChange);
                var interval = time - rf.lastUpdateTime;
                var now;
                if (interval < 0) {
                    now = Date.now() - Engine.startTime;
                    interval = now - rf.engineNow;
                    rf.nextUpdateTime = now;
                }
                else {
                    now = interval + rf.engineNow;
                }
                if (now < rf.nextUpdateTime) {
                    return;
                }
                rf.lastUpdateTime = time;
                rf.lastUpdateDate = Date.now();
                tm_add(rf.defaultTimeMixer, interval);
                rf.nextUpdateTime += rf.frameInterval;
                rf.engineNow = now;
                Engine.update(now, interval);
                Engine.profile();
            }
            animationRequest(onAnimationChange);
            wx.onWindowResize(function (res) {
                var width = res.windowWidth, height = res.windowHeight;
                if (rf.windowWidth != width || rf.windowHeight != height) {
                    rf.windowWidth = width;
                    rf.windowHeight = height;
                    rf.isWindowResized = true;
                }
            });
            rf.resizeStageSizeFunction(rf.windowWidth, rf.windowHeight);
        };
        Engine.addResize = function (value) {
            Engine.resizeLink.add(value);
            value.resize(rf.stageWidth, rf.stageHeight);
        };
        Engine.removeResize = function (value) {
            Engine.resizeLink.remove(value);
        };
        Engine.resize = function (width, height) {
            var vo = Engine.resizeLink.getFrist();
            while (vo) {
                var next = vo.next;
                if (false == vo.close) {
                    var value = vo.data;
                    value.resize(width, height);
                }
                vo = next;
            }
            rf.ROOT.simpleDispatch(2);
        };
        Engine.addTick = function (tick) {
            Engine.ticklink.add(tick);
        };
        Engine.removeTick = function (tick) {
            Engine.ticklink.remove(tick);
        };
        Engine.update = function (now, interval) {
            if (rf.isWindowResized) {
                rf.isWindowResized = false;
                rf.resizeStageSizeFunction(rf.windowWidth, rf.windowHeight);
                Engine.resize(rf.stageWidth, rf.stageHeight);
                rf.ROOT.simpleDispatch(2);
            }
            var vo = Engine.ticklink.getFrist();
            while (vo) {
                var next = vo.next;
                if (false == vo.close) {
                    var tick = vo.data;
                    if (!tick.update || !(tick.update instanceof Function)) {
                        console.log("errrrrr tick,,,", tick, tick.update, vo);
                    }
                    else {
                        tick.update(now, interval);
                    }
                }
                vo = next;
            }
            rf.ROOT.simpleDispatch(1);
        };
        Object.defineProperty(Engine, "frameRate", {
            get: function () {
                return Engine._frameRate;
            },
            set: function (value) {
                Engine._frameRate = value;
                rf.frameInterval = 1000 / value;
            },
            enumerable: true,
            configurable: true
        });
        Engine.profile = function () {
            var now = getTimer();
            var interval = now - Engine._nextProfileTime;
            Engine._fpsCount++;
            Engine._codeTime += now - rf.engineNow;
            if (interval > 0) {
                if (interval > 2000) {
                    Engine._nextProfileTime = now + 1000;
                }
                else {
                    Engine._nextProfileTime += 1000;
                }
                Engine.fps = Engine._fpsCount;
                Engine.code = Engine._codeTime;
                Engine._fpsCount = 0;
                Engine._codeTime = 0;
                rf.ROOT.simpleDispatch(EngineEvent.FPS_CHANGE);
            }
        };
        Engine.startTime = 0;
        Engine.interval = 0;
        Engine.hidden = false;
        Engine.hiddenTime = 0;
        Engine.fps = 0;
        Engine.code = 0;
        Engine.ticklink = new rf.Link();
        Engine.resizeLink = new rf.Link();
        Engine._frameRate = 60;
        Engine._nextProfileTime = 0;
        Engine._fpsCount = 0;
        Engine._codeTime = 0;
        return Engine;
    }());
    rf.Engine = Engine;
    function getTimer() {
        return rf.engineNow + rf.getT() - rf.lastUpdateDate;
    }
    rf.getTimer = getTimer;
    var TimerEventX = (function (_super) {
        __extends(TimerEventX, _super);
        function TimerEventX() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimerEventX.TIMER = 'timer';
        TimerEventX.TIMER_COMPLETE = 'timerComplete';
        return TimerEventX;
    }(rf.EventX));
    rf.TimerEventX = TimerEventX;
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(delay, repeatCount) {
            if (repeatCount === void 0) { repeatCount = 0; }
            var _this = _super.call(this) || this;
            _this._delay = 0;
            _this.currnetTime = 0;
            _this.repeatCount = 0;
            _this.running = false;
            _this.delay = delay;
            _this.repeatCount = repeatCount;
            return _this;
        }
        Object.defineProperty(Timer.prototype, "delay", {
            get: function () {
                return this._delay;
            },
            set: function (value) {
                if (value < 1) {
                    value = 1;
                }
                if (this._delay == value) {
                    return;
                }
                this._delay = value;
            },
            enumerable: true,
            configurable: true
        });
        Timer.prototype.start = function () {
            this.currnetTime = 0;
            Engine.addTick(this);
        };
        Timer.prototype.stop = function () {
            Engine.removeTick(this);
            this.currnetTime = 0;
            this.repeatCount = 0;
        };
        Timer.prototype.update = function (now, interval) {
            this.currnetTime += interval;
            if (this.currnetTime >= this._delay) {
                this.simpleDispatch(TimerEventX.TIMER);
                this.currnetTime = this.currnetTime % this._delay;
            }
            if (this.repeatCount > 0) {
                this.repeatCount--;
                if (this.repeatCount <= 0) {
                    this.simpleDispatch(TimerEventX.TIMER_COMPLETE);
                    this.stop();
                }
            }
        };
        return Timer;
    }(rf.MiniDispatcher));
    rf.Timer = Timer;
    var GTimer = (function () {
        function GTimer(delay) {
            this.link = new rf.Link();
            this.timer = new Timer(delay);
            this.timer.addEventListener(TimerEventX.TIMER, this.timerHandler, this);
        }
        GTimer.prototype.timerHandler = function (event) {
            for (var vo = this.link.getFrist(); vo; vo = vo.next) {
                if (vo.close)
                    continue;
                var func = vo.data;
                var thisobj = vo.thisObj;
                if (undefined != func) {
                    if (vo.args) {
                        func.call(thisobj, vo.args);
                    }
                    else {
                        func.call(thisobj);
                    }
                }
            }
        };
        GTimer.prototype.add = function (func, thisobj, args) {
            var vo = this.link.add(func, thisobj, args);
            this.timer.start();
            return vo;
        };
        GTimer.prototype.remove = function (func, thisobj) {
            var link = this.link;
            link.remove(func, thisobj);
            if (!link.length) {
                this.timer.stop();
            }
        };
        return GTimer;
    }());
    rf.GTimer = GTimer;
    var GTimerCallLater = (function (_super) {
        __extends(GTimerCallLater, _super);
        function GTimerCallLater() {
            return _super.call(this, 10) || this;
        }
        GTimerCallLater.prototype.later = function (f, thisobj, time, args, checksame) {
            if (checksame === void 0) { checksame = true; }
            if (undefined == f) {
                return;
            }
            this.link.checkSameData = checksame;
            var vo = _super.prototype.add.call(this, f, thisobj, args);
            vo.weight = rf.engineNow + time;
            return vo;
        };
        GTimerCallLater.prototype.add = function (func, thisobj, args, checksame) {
            if (checksame === void 0) { checksame = true; }
            return this.later(func, thisobj, 10, args, checksame);
        };
        GTimerCallLater.prototype.remove = function (func, thisobj) {
            var link = this.link;
            for (var vo = link.first; vo; vo = vo.next) {
                if (vo.data == func && vo.thisObj == thisobj && vo.close == false) {
                    link.removeLink(vo);
                }
            }
            if (!link.length) {
                this.timer.stop();
            }
        };
        GTimerCallLater.prototype.timerHandler = function (event) {
            var now = rf.engineNow;
            var link = this.link;
            var vo = link.getFrist();
            var cleanflag;
            while (vo) {
                var next = vo.next;
                if (false == vo.close) {
                    if (now > vo.weight) {
                        vo.close = true;
                        var func = vo.data;
                        func.call(vo.thisObj, vo.args);
                        cleanflag = true;
                    }
                }
                vo = next;
            }
            if (cleanflag) {
                link.clean();
            }
        };
        return GTimerCallLater;
    }(GTimer));
    rf.GTimerCallLater = GTimerCallLater;
    var TickLink = (function () {
        function TickLink() {
            this.link = new rf.Link();
            Engine.addTick(this);
        }
        TickLink.prototype.addTick = function (tick) {
            this.link.add(tick);
        };
        TickLink.prototype.removeTick = function (tick) {
            this.link.remove(tick);
        };
        TickLink.prototype.update = function (now, interval) {
            var vo = this.link.getFrist();
            while (vo) {
                var next = vo.next;
                if (false == vo.close) {
                    var tick = vo.data;
                    if (!tick.update || !(tick.update instanceof Function)) {
                        console.log("errrrrr tick,,,,", tick, vo);
                    }
                    else {
                        tick.update(now, interval);
                    }
                }
                vo = next;
            }
        };
        return TickLink;
    }());
    rf.TickLink = TickLink;
    rf.gameTick = new TickLink();
    rf.skillTick = new TickLink();
    rf.timerobj = {};
    function getGTimer(time) {
        var gtimer = rf.timerobj[time];
        if (undefined == gtimer) {
            rf.timerobj[time] = gtimer = new GTimer(time);
        }
        return gtimer;
    }
    rf.getGTimer = getGTimer;
    rf.time250 = getGTimer(250);
    rf.time500 = getGTimer(500);
    rf.time1000 = getGTimer(1000);
    rf.time3000 = getGTimer(3000);
    rf.time4000 = getGTimer(4000);
    rf.time5000 = getGTimer(5000);
    rf.callLater = new GTimerCallLater();
})(rf || (rf = {}));
var rf;
(function (rf) {
    function call(info, ars) {
        var args = [];
        var i = 0;
        if (ars) {
            for (; i < ars.length; i++) {
                args[i] = ars[i];
            }
        }
        var argus = info.args;
        if (argus) {
            for (var j = 0; j < argus.length; j++) {
                args[i++] = argus[j];
            }
        }
        var callback = info.callback;
        if (callback != undefined) {
            try {
                return callback.apply(info.thisObj, args);
            }
            catch (e) {
            }
        }
    }
    var CallbackInfo = (function () {
        function CallbackInfo() {
            this.doRecycle = true;
        }
        CallbackInfo.prototype.init = function (callback, thisObj, args) {
            this.callback = callback;
            this.args = args;
            this.thisObj = thisObj;
        };
        CallbackInfo.prototype.checkHandle = function (callback, thisObj) {
            return this.callback === callback && this.thisObj == thisObj;
        };
        CallbackInfo.prototype.execute = function (doRecycle) {
            var callback = this.callback;
            var result = call(this);
            if (doRecycle == undefined) {
                doRecycle = this.doRecycle;
            }
            if (doRecycle) {
                this.recycle();
            }
            return result;
        };
        CallbackInfo.prototype.call = function () {
            return call(this, arguments);
        };
        CallbackInfo.prototype.callAndRecycle = function () {
            var result = call(this, arguments);
            this.recycle();
            return result;
        };
        CallbackInfo.prototype.onRecycle = function () {
            this.callback = undefined;
            this.args = undefined;
            this.thisObj = undefined;
            this.doRecycle = true;
        };
        CallbackInfo.get = function (callback, thisObj) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var info = rf.recyclable(CallbackInfo);
            info.init(callback, thisObj, args);
            return info;
        };
        return CallbackInfo;
    }());
    rf.CallbackInfo = CallbackInfo;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function refreshUV(vo, mw, mh) {
        var x = vo.x, y = vo.y, w = vo.w, h = vo.h;
        vo.ul = x / mw;
        vo.ur = (x + w) / mw;
        vo.vt = y / mh;
        vo.vb = (y + h) / mh;
    }
    rf.refreshUV = refreshUV;
    var BitmapSourceArea = (function () {
        function BitmapSourceArea() {
            this.name = 0;
            this.source = undefined;
            this.frames = {};
        }
        BitmapSourceArea.prototype.init = function () { };
        BitmapSourceArea.prototype.getArea = function (name, x, y, w, h) {
            var vo = {
                name: name,
                x: x,
                y: y,
                ix: 0,
                iy: 0,
                w: w,
                h: h,
                rw: w,
                rh: h,
                used: 0,
                time: rf.engineNow,
                source: this.source
            };
            this.frames[name] = vo;
            return vo;
        };
        BitmapSourceArea.prototype.createFrameArea = function (name, frame) {
            var x = frame.x, y = frame.y, w = frame.w, h = frame.h, ix = frame.ix, iy = frame.iy;
            var vo = this.getArea(name, ix - x, iy - y, w, h);
            if (undefined != vo) {
                vo.ix = ix;
                vo.iy = iy;
            }
            return vo;
        };
        BitmapSourceArea.prototype.getEmptyArea = function (name, sw, sh) {
            return undefined;
        };
        BitmapSourceArea.prototype.getUnusedArea = function (name, sw, sh) {
            var frames = this.frames;
            var vo;
            var now = rf.engineNow;
            vo = frames[name];
            if (!vo) {
                for (var dname in frames) {
                    vo = frames[dname];
                    if (!vo)
                        continue;
                    if (vo.time < now && 0 >= vo.used && sw <= vo.rw && sh <= vo.rh) {
                        frames[vo.name] = undefined;
                        vo.name = name;
                        vo.w = sw;
                        vo.h = sh;
                        vo.time = now;
                        frames[name] = vo;
                        break;
                    }
                    else {
                        vo = undefined;
                    }
                }
            }
            if (vo) {
                this.source.clearBitmap(vo);
                return vo;
            }
            return undefined;
        };
        return BitmapSourceArea;
    }());
    rf.BitmapSourceArea = BitmapSourceArea;
    var MixBitmapSourceArea = (function (_super) {
        __extends(MixBitmapSourceArea, _super);
        function MixBitmapSourceArea() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MixBitmapSourceArea.prototype.init = function () {
            this.maxRect = new rf.MaxRectsBinPack(this.r - this.l, this.b - this.t);
        };
        MixBitmapSourceArea.prototype.getEmptyArea = function (name, sw, sh) {
            var rect = this.maxRect.insert(sw + 0, sh + 0);
            var vo;
            if (rect.w != 0) {
                vo = this.getArea(name, rect.x + this.l, rect.y + this.t, sw, sh);
            }
            else {
                vo = this.getUnusedArea(name, sw, sh);
            }
            if (vo) {
                this.frames[name] = vo;
            }
            return vo;
        };
        return MixBitmapSourceArea;
    }(BitmapSourceArea));
    rf.MixBitmapSourceArea = MixBitmapSourceArea;
    var BitmapSource = (function (_super) {
        __extends(BitmapSource, _super);
        function BitmapSource() {
            var _this = _super.call(this) || this;
            _this.name = undefined;
            _this.width = 0;
            _this.height = 0;
            _this.originU = 0;
            _this.originV = 0;
            _this.areas = {};
            return _this;
        }
        BitmapSource.prototype.create = function (name, bmd, pack) {
            if (pack === void 0) { pack = false; }
            this.name = name;
            this.bmd = bmd;
            this.width = bmd.width;
            this.height = bmd.height;
            if (pack == false) {
                this.setArea(0, 0, 0, this.width, this.height);
            }
            else {
                this.areas[0] = this.setArea(1, 0, 0, this.width, this.height);
            }
            rf.bitmapSources[name] = this;
            return this;
        };
        BitmapSource.prototype.setArea = function (name, x, y, w, h) {
            var area = this.areas[name];
            if (undefined == area) {
                if (1 == name) {
                    var mix = new MixBitmapSourceArea();
                    mix.l = x;
                    mix.t = y;
                    mix.r = x + w;
                    mix.b = y + h;
                    area = mix;
                }
                else {
                    area = new BitmapSourceArea();
                }
            }
            else {
                rf.ThrowError("area exist");
                return area;
            }
            area.source = this;
            area.name = name;
            area.init();
            this.areas[name] = area;
            return area;
        };
        BitmapSource.prototype.setSourceVO = function (name, w, h, area) {
            if (area === void 0) { area = 1; }
            var barea = this.areas[area];
            if (undefined == barea) {
                return undefined;
            }
            var vo = barea.getEmptyArea(name, w, h);
            if (vo) {
                refreshUV(vo, this.width, this.height);
            }
            return vo;
        };
        BitmapSource.prototype.getSourceVO = function (name, area) {
            if (area === void 0) { area = 0; }
            var barea = this.areas[area];
            if (undefined == barea) {
                return undefined;
            }
            var vo = barea.frames[name];
            if (vo) {
                vo.time = rf.engineNow;
            }
            return vo;
        };
        BitmapSource.prototype.drawimg = function (img, x, y, w, h) {
            var _a = this, name = _a.name, textureData = _a.textureData;
            var bmd = this.bmd;
            if (img instanceof rf.BitmapData) {
                img = img.canvas;
            }
            if (w == undefined && h == undefined) {
                bmd.context.drawImage(img, x, y);
            }
            else {
                bmd.context.drawImage(img, x, y, w, h);
            }
            if (textureData) {
                var texture = rf.context3D.textureObj[textureData.key];
                if (undefined != texture) {
                    texture.readly = false;
                }
            }
        };
        BitmapSource.prototype.clearBitmap = function (vo) {
            var x = vo.x, y = vo.y, rw = vo.rw, rh = vo.rh;
            var bmd = this.bmd;
            if (rw && rh) {
                var context = bmd.context;
                context.globalCompositeOperation = "destination-out";
                context.fillStyle = rf.c_white;
                context.fillRect(x, y, rw, rh);
                context.globalCompositeOperation = "source-over";
            }
        };
        BitmapSource.prototype.uploadContext = function (program, variable) {
            var texture = this.texture;
            if (!texture) {
                var c = rf.context3D;
                var _a = this, textureData = _a.textureData, bmd = _a.bmd, name_1 = _a.name;
                if (!textureData) {
                    this.textureData = textureData = c.getTextureData(name_1, false);
                }
                texture = textureData.key ? rf.context3D.textureObj[textureData.key] : undefined;
                if (!texture) {
                    texture = rf.context3D.createTexture(textureData, bmd);
                }
                this.texture = texture;
            }
            texture.uploadContext(program, variable);
        };
        BitmapSource.DEFAULT = 0;
        BitmapSource.PACK = 1;
        return BitmapSource;
    }(rf.MiniDispatcher));
    rf.BitmapSource = BitmapSource;
    var UrlBitmapSource = (function (_super) {
        __extends(UrlBitmapSource, _super);
        function UrlBitmapSource(url) {
            var _this = _super.call(this) || this;
            _this.name = url;
            _this.status = 0;
            _this.completeFuncs = [];
            return _this;
        }
        UrlBitmapSource.prototype.load = function () {
            this.status = 1;
            rf.loadRes(rf.RES_PERFIX, this.name, this.loadImageComplete, this, 5);
        };
        UrlBitmapSource.prototype.loadImageComplete = function (event) {
            var _this = this;
            if (event.type != 4) {
                this.status = 3;
                return;
            }
            var bmd = this.bmd = event.data;
            this.width = bmd.width;
            this.height = bmd.height;
            var area = this.setArea(BitmapSource.DEFAULT, 0, 0, bmd.width, bmd.height);
            var vo = { x: 0, y: 0, w: bmd.width, h: bmd.height, ix: 0, iy: 0 };
            refreshUV(vo, this.width, this.height);
            area.frames[0] = vo;
            this.status = 2;
            this.simpleDispatch(4);
            this.completeFuncs.forEach(function (element) {
                element(_this);
            });
            this.completeFuncs.length = 0;
        };
        return UrlBitmapSource;
    }(BitmapSource));
    rf.UrlBitmapSource = UrlBitmapSource;
    rf.bitmapSources = {};
    function createBitmapSource(name, w, h, origin) {
        console.log("createBitmapSource " + name + " " + w + " x " + h);
        var bmd = new rf.BitmapData(w, h, true);
        var source = new BitmapSource().create(name, bmd, true);
        if (origin) {
            var vo = source.setSourceVO("origin", 1, 1);
            bmd.fillRect(vo.x, vo.y, vo.w, vo.h, "#FFFFFF");
            source.originU = vo.ul;
            source.originV = vo.vt;
        }
        return source;
    }
    rf.createBitmapSource = createBitmapSource;
    function createUrlSource(url, extendtion, complete) {
        url = rf.getFullUrl(url, extendtion);
        var source = rf.bitmapSources[url];
        if (!source) {
            rf.bitmapSources[url] = source = new UrlBitmapSource(url);
            source.load();
        }
        else if (source.status == 0) {
            source.load();
        }
        else if (complete && source.status == 2) {
            complete(source);
            return source;
        }
        if (complete) {
            var completes = source.completeFuncs;
            if (completes.indexOf(complete) == -1) {
                completes.push(complete);
            }
        }
        return source;
    }
    rf.createUrlSource = createUrlSource;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function inRange(a, min, max) {
        return min <= a && a <= max;
    }
    rf.inRange = inRange;
    function byte_div(n, d) {
        return Math.floor(n / d);
    }
    rf.byte_div = byte_div;
    function byte_Error(fatal, opt_code_point) {
        if (fatal) {
        }
        return opt_code_point || 0xFFFD;
    }
    rf.byte_Error = byte_Error;
    function byte_inflate(data) {
        return new Zlib.Inflate(data).decompress();
    }
    rf.byte_inflate = byte_inflate;
    function byte_decodeUTF8(data) {
        var fatal = false;
        var pos = 0;
        var result = "";
        var code_point;
        var utf8_code_point = 0;
        var utf8_bytes_needed = 0;
        var utf8_bytes_seen = 0;
        var utf8_lower_boundary = 0;
        var inRange = rf.inRange;
        var decoderError = byte_Error;
        while (data.length > pos) {
            var _byte = data[pos++];
            if (_byte == -1) {
                if (utf8_bytes_needed != 0) {
                    code_point = decoderError(fatal);
                }
                else {
                    code_point = -1;
                }
            }
            else {
                if (utf8_bytes_needed == 0) {
                    if (inRange(_byte, 0x00, 0x7F)) {
                        code_point = _byte;
                    }
                    else {
                        if (inRange(_byte, 0xC2, 0xDF)) {
                            utf8_bytes_needed = 1;
                            utf8_lower_boundary = 0x80;
                            utf8_code_point = _byte - 0xC0;
                        }
                        else if (inRange(_byte, 0xE0, 0xEF)) {
                            utf8_bytes_needed = 2;
                            utf8_lower_boundary = 0x800;
                            utf8_code_point = _byte - 0xE0;
                        }
                        else if (inRange(_byte, 0xF0, 0xF4)) {
                            utf8_bytes_needed = 3;
                            utf8_lower_boundary = 0x10000;
                            utf8_code_point = _byte - 0xF0;
                        }
                        else {
                            decoderError(fatal);
                        }
                        utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                        code_point = null;
                    }
                }
                else if (!inRange(_byte, 0x80, 0xBF)) {
                    utf8_code_point = 0;
                    utf8_bytes_needed = 0;
                    utf8_bytes_seen = 0;
                    utf8_lower_boundary = 0;
                    pos--;
                    code_point = decoderError(fatal, _byte);
                }
                else {
                    utf8_bytes_seen += 1;
                    utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                    if (utf8_bytes_seen !== utf8_bytes_needed) {
                        code_point = null;
                    }
                    else {
                        var cp = utf8_code_point;
                        var lower_boundary = utf8_lower_boundary;
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        if (inRange(cp, lower_boundary, 0x10FFFF) && !inRange(cp, 0xD800, 0xDFFF)) {
                            code_point = cp;
                        }
                        else {
                            code_point = decoderError(fatal, _byte);
                        }
                    }
                }
            }
            if (code_point !== null && code_point !== -1) {
                if (code_point <= 0xFFFF) {
                    if (code_point > 0)
                        result += String.fromCharCode(code_point);
                }
                else {
                    code_point -= 0x10000;
                    result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                    result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                }
            }
        }
        return result;
    }
    rf.byte_decodeUTF8 = byte_decodeUTF8;
    function stringToCodePoints(string) {
        var cps = [];
        var i = 0, n = string.length;
        while (i < string.length) {
            var c = string.charCodeAt(i);
            if (!inRange(c, 0xD800, 0xDFFF)) {
                cps.push(c);
            }
            else if (inRange(c, 0xDC00, 0xDFFF)) {
                cps.push(0xFFFD);
            }
            else {
                if (i == n - 1) {
                    cps.push(0xFFFD);
                }
                else {
                    var d = string.charCodeAt(i + 1);
                    if (inRange(d, 0xDC00, 0xDFFF)) {
                        var a = c & 0x3FF;
                        var b = d & 0x3FF;
                        i += 1;
                        cps.push(0x10000 + (a << 10) + b);
                    }
                    else {
                        cps.push(0xFFFD);
                    }
                }
            }
            i += 1;
        }
        return cps;
    }
    rf.stringToCodePoints = stringToCodePoints;
    function byte_encodeUTF8(str) {
        var pos = 0;
        var codePoints = stringToCodePoints(str);
        var outputBytes = [];
        var inRange = rf.inRange;
        var decoderError = byte_Error;
        while (codePoints.length > pos) {
            var code_point = codePoints[pos++];
            if (inRange(code_point, 0xD800, 0xDFFF)) {
                decoderError(code_point);
            }
            else if (inRange(code_point, 0x0000, 0x007f)) {
                outputBytes.push(code_point);
            }
            else {
                var count = void 0, offset = void 0;
                if (inRange(code_point, 0x0080, 0x07FF)) {
                    count = 1;
                    offset = 0xC0;
                }
                else if (inRange(code_point, 0x0800, 0xFFFF)) {
                    count = 2;
                    offset = 0xE0;
                }
                else if (inRange(code_point, 0x10000, 0x10FFFF)) {
                    count = 3;
                    offset = 0xF0;
                }
                outputBytes.push(byte_div(code_point, Math.pow(64, count)) + offset);
                while (count > 0) {
                    var temp = byte_div(code_point, Math.pow(64, count - 1));
                    outputBytes.push(0x80 + (temp % 64));
                    count -= 1;
                }
            }
        }
        return new Uint8Array(outputBytes);
    }
    rf.byte_encodeUTF8 = byte_encodeUTF8;
    var Byte = (function () {
        function Byte(buf) {
            this.setArrayBuffer(buf);
        }
        Byte.prototype.setArrayBuffer = function (buf) {
            if (undefined == buf) {
                this.length = this.position = 0;
                buf = new ArrayBuffer(0);
            }
            else {
                this.buf = new DataView(buf);
                this.length = buf.byteLength;
                this.position = 0;
            }
            this.uint8 = new Uint8Array(buf);
        };
        Byte.prototype.outOfRange = function () {
        };
        Byte.prototype.readByte = function () {
            var position = this.position;
            if (position > this.length) {
                this.outOfRange();
                return;
            }
            ;
            var b = this.buf.getUint8(position);
            this.position++;
            return b;
        };
        Byte.prototype.writeByte = function (v) {
            var position = this.position;
            ;
            this.position++;
            this.buf.setInt8(position, v);
        };
        Byte.prototype.readUint16 = function (littleEndian) {
            var position = this.position;
            if (position + 2 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getUint16(position, littleEndian);
            this.position = position + 2;
            return b;
        };
        Byte.prototype.writeUint16 = function (v, littleEndian) {
            var position = this.position;
            this.position = position + 2;
            this.buf.setUint16(position, v, littleEndian);
        };
        Byte.prototype.readInt = function () {
            var position = this.position;
            if (position + 4 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getInt32(position);
            this.position = position + 4;
            return b;
        };
        Byte.prototype.writeInt = function (v) {
            var position = this.position;
            this.position = position + 4;
            this.buf.setInt32(position, v);
        };
        Byte.prototype.readUInt = function () {
            var position = this.position;
            if (position + 4 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getUint32(position);
            this.position = position + 4;
            return b;
        };
        Byte.prototype.writeUInt = function (v) {
            var position = this.position;
            ;
            this.position += 4;
            this.buf.setUint32(position, v);
        };
        Byte.prototype.readDouble = function () {
            var position = this.position;
            if (position + 8 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getFloat64(position);
            this.position = position + 8;
            return b;
        };
        Byte.prototype.readFloat = function () {
            var position = this.position;
            if (position + 4 > this.length) {
                this.outOfRange();
                return;
            }
            var b = this.buf.getFloat32(position);
            this.position = position + 4;
            return b;
        };
        Byte.prototype.readMultiByte = function (length, charSet) {
            if (charSet === void 0) { charSet = "utf-8"; }
            var _a = this, position = _a.position, buf = _a.buf;
            var end = position + length;
            if (end > this.length) {
                this.outOfRange();
                return;
            }
            this.position += length;
            var str = byte_decodeUTF8(new Uint8Array(buf.buffer.slice(position, end)));
            return str;
        };
        Byte.prototype.readByteArray = function (length) {
            var position = this.position;
            if (!length) {
                length = this.length - position;
            }
            var buf = this.buf.buffer.slice(position, position + length);
            this.position += length;
            return buf;
        };
        Byte.prototype.writeByteArray = function (byte) {
            var _a = this, position = _a.position, uint8 = _a.uint8;
            uint8.set(byte, position);
            this.position += byte.length;
        };
        return Byte;
    }());
    rf.Byte = Byte;
    var ClassDefine = (function () {
        function ClassDefine(className, members) {
        }
        return ClassDefine;
    }());
    rf.ClassDefine = ClassDefine;
    var AMF3Decode = (function (_super) {
        __extends(AMF3Decode, _super);
        function AMF3Decode(buf) {
            var _this = _super.call(this, buf) || this;
            _this.flags = 0;
            _this.stringsTable = [];
            _this.objectsTable = [];
            _this.traitsTable = [];
            _this.clsNameMap = {};
            _this.MASK = 1 << 28;
            return _this;
        }
        AMF3Decode.prototype.clear = function () {
            var _a = this, stringsTable = _a.stringsTable, objectsTable = _a.objectsTable, traitsTable = _a.traitsTable;
            stringsTable.length = 0;
            objectsTable.length = 0;
            traitsTable.length = 0;
            this.clsNameMap = {};
        };
        AMF3Decode.prototype.read29 = function (unsign) {
            var v = 0, a = 0;
            v = this.readByte();
            if (v >= 0x80) {
                a = this.readByte();
                v = (v & 0x7f) << 7;
                if (a < 0x80) {
                    v = v | a;
                }
                else {
                    v = (v | a & 0x7f) << 7;
                    a = this.readByte();
                    if (a < 0x80) {
                        v = v | a;
                    }
                    else {
                        v = (v | a & 0x7f) << 8;
                        a = this.readByte();
                        v = v | a;
                    }
                }
                v = -(v & 0x10000000) | v;
            }
            return v;
        };
        AMF3Decode.prototype.readInt = function () {
            return this.read29(false);
        };
        AMF3Decode.prototype.readString = function () {
            var handle = this.read29(true);
            var inline = (handle & 1) != 0;
            handle = handle >> 1;
            if (inline) {
                if (0 == handle) {
                    return "";
                }
                var str = this.readMultiByte(handle);
                this.stringsTable.push(str);
                return str;
            }
            return this.stringsTable[handle];
        };
        AMF3Decode.prototype.readDate = function (u29D) {
            return new Date(this.readDouble());
        };
        AMF3Decode.prototype.readObjectVector = function (length) {
            var fixed = this.read29(true);
            var list = [];
            this.objectsTable.push(list);
            var index = -1;
            while (++index < length) {
                list[index] = this.readObject();
            }
            return list;
        };
        AMF3Decode.prototype.readArray = function (length) {
            var objectsTable = this.objectsTable;
            var instance = [];
            objectsTable.push(instance);
            var key;
            while (key = this.readString()) {
                instance[key] = this.readObject();
            }
            var index = -1;
            while (++index < length) {
                instance[index] = this.readObject();
            }
            return instance;
        };
        AMF3Decode.prototype.readDictionary = function (length) {
            var weakKeys = this.readByte() != 0;
            var dic = {};
            this.objectsTable.push(dic);
            var key;
            var value;
            for (var i = 0; i < length; i++) {
                key = this.readObject();
                value = this.readObject();
                dic[key] = value;
            }
            return dic;
        };
        AMF3Decode.prototype.readObject = function () {
            var value;
            var marker = this.readByte();
            switch (marker) {
                case 4:
                    value = this.read29(false);
                    if (value >= 0x10000000) {
                        value = value - 0xFFFFFFFF - 1;
                    }
                    break;
                case 5:
                    value = this.readDouble();
                    break;
                case 2:
                case 3:
                    value = (marker == 3);
                    break;
                case 1:
                    value = null;
                    break;
                case 0:
                    value = undefined;
                    break;
                case 6:
                    value = this.readString();
                    break;
                case 9:
                case 10:
                case 8:
                case 11:
                case 7:
                case 12:
                case 16:
                case 13:
                case 14:
                case 15:
                case 17:
                    value = this.readReferencableObject(marker);
                    break;
                default:
                    throw Error("not implement:" + marker);
            }
            return value;
        };
        AMF3Decode.prototype.readByteArray = function (length) {
            var objectsTable = this.objectsTable;
            var buf = _super.prototype.readByteArray.call(this, length);
            objectsTable.push(buf);
            return buf;
        };
        AMF3Decode.prototype._readObject = function (handle) {
            var _a = this, traitsTable = _a.traitsTable, objectsTable = _a.objectsTable;
            var traits;
            var classDef;
            var className;
            var len;
            var i;
            var inlineClassDef = ((handle & 1) != 0);
            handle = handle >> 1;
            if (inlineClassDef) {
                className = this.readString();
                var isIExternalizable = (handle & 1) != 0;
                handle = handle >> 1;
                var isDynamic = (handle & 1) != 0;
                if (isDynamic == false) {
                }
                len = handle >> 1;
                traits = [];
                for (i = 0; i < len; i++) {
                    traits[i] = this.readString();
                }
                classDef = new ClassDefine(className, traits);
                classDef.isExternalizable = isIExternalizable;
                classDef.isDynamic = isDynamic;
                traitsTable.push(classDef);
            }
            else {
                classDef = traitsTable[handle];
                if (!classDef) {
                    throw new Error("no trait found with refId: " + handle);
                }
                traits = classDef.members;
                className = classDef.className;
            }
            var instance;
            instance = {};
            objectsTable.push(instance);
            for (var key in traits) {
                key = traits[key];
                instance[key] = this.readObject();
            }
            if (classDef.isDynamic) {
                var key = void 0;
                while (key = this.readString()) {
                    instance[key] = this.readObject();
                }
            }
            return instance;
        };
        AMF3Decode.prototype.readReferencableObject = function (marker) {
            var objectsTable = this.objectsTable;
            var object;
            var handle = this.read29(true);
            var isIn = (handle & 1) == 0;
            handle = handle >> 1;
            if (isIn) {
                object = objectsTable[handle];
                return object;
            }
            else {
                switch (marker) {
                    case 9:
                        object = this.readArray(handle);
                        break;
                    case 10:
                        object = this._readObject(handle);
                        break;
                    case 8:
                        object = this.readDate(handle);
                        break;
                    case 11:
                        object = this.readMultiByte(handle);
                        break;
                    case 7:
                        object = this.readMultiByte(handle);
                        break;
                    case 12:
                        object = this.readByteArray(handle);
                        break;
                    case 16:
                    case 14:
                    case 13:
                    case 15:
                        object = this.readObjectVector(handle);
                        break;
                    case 17:
                        object = this.readDictionary(handle);
                        break;
                    default:
                        throw Error("not implement:" + handle);
                }
            }
            return object;
        };
        return AMF3Decode;
    }(Byte));
    rf.AMF3Decode = AMF3Decode;
    var AMF3Encode = (function (_super) {
        __extends(AMF3Encode, _super);
        function AMF3Encode(buf) {
            var _this = _super.call(this, buf || new ArrayBuffer(10240 * 1024)) || this;
            _this.stringsTable = [];
            _this.objectsTable = [];
            _this.traitsTable = [];
            _this.unit8 = new Uint8Array(_this.buf.buffer);
            return _this;
        }
        AMF3Encode.prototype.clear = function () {
            var _a = this, stringsTable = _a.stringsTable, objectsTable = _a.objectsTable, traitsTable = _a.traitsTable;
            stringsTable.length = 0;
            objectsTable.length = 0;
            traitsTable.length = 0;
            this.position = 0;
        };
        AMF3Encode.prototype.writeByte = function (value) {
            this.buf.setUint8(this.position, value);
            this.position++;
        };
        AMF3Encode.prototype.writeFloat = function (value) {
            this.buf.setFloat32(this.position, value);
            this.position += 4;
        };
        AMF3Encode.prototype.writeDouble = function (value) {
            this.buf.setFloat64(this.position, value);
            this.position += 8;
        };
        AMF3Encode.prototype.writeString = function (str) {
            var stringsTable = this.stringsTable;
            var index = stringsTable.indexOf(str);
            var handle;
            if (index == -1) {
                var byte = byte_encodeUTF8(str);
                var length_1 = byte.length;
                handle = length_1 << 1;
                handle |= 1;
                this.write29(handle, true);
                this.writeByteArray(byte);
                stringsTable.push(str);
            }
            else {
                handle = index << 1;
                handle |= 0;
                this.write29(handle, true);
            }
        };
        AMF3Encode.prototype.write29 = function (v, unsign) {
            var len = 0;
            if (v < 0x80)
                len = 1;
            else if (v < 0x4000)
                len = 2;
            else if (v < 0x200000)
                len = 3;
            else
                len = 4;
            switch (len) {
                case 1:
                    this.writeByte(v);
                    break;
                case 2:
                    this.writeByte(((v >> 7) & 0x7F) | 0x80);
                    this.writeByte(v & 0x7F);
                    break;
                case 3:
                    this.writeByte(((v >> 14) & 0x7F) | 0x80);
                    this.writeByte(((v >> 7) & 0x7F) | 0x80);
                    this.writeByte(v & 0x7F);
                    break;
                case 4:
                    this.writeByte(((v >> 22) & 0x7F) | 0x80);
                    this.writeByte(((v >> 15) & 0x7F) | 0x80);
                    this.writeByte(((v >> 8) & 0x7F) | 0x80);
                    this.writeByte(v & 0xFF);
                    break;
            }
        };
        AMF3Encode.prototype.isRealNum = function (val) {
            if (val === "" || val == null) {
                return false;
            }
            if (!isNaN(val)) {
                return true;
            }
            else {
                return false;
            }
        };
        AMF3Encode.prototype.writeObject = function (o) {
            var type = typeof o;
            if (type === "string") {
                this.writeByte(6);
                this.writeString(String(o));
            }
            else if (type === "boolean") {
                this.writeByte(o == true ? 3 : 2);
            }
            else if ('number' === type) {
                if ((o >> 0) === o && o >= -0x10000000 && o < 0x10000000) {
                    if (o < 0) {
                        o = 0xFFFFFFFF + (o + 1);
                    }
                    this.writeByte(4);
                    this.write29(o, false);
                }
                else {
                    this.writeByte(5);
                    this.writeDouble(o);
                }
            }
            else if (o instanceof Uint8Array
                || (o instanceof Uint32Array)
                || (o instanceof Uint16Array)
                || (o instanceof Float32Array)
                || o instanceof Float64Array) {
                this.writeBytes(o.buffer);
            }
            else if (o instanceof ArrayBuffer) {
                this.writeBytes(o);
            }
            else if (o instanceof Array) {
                this.writeArray(o);
            }
            else if (o instanceof Object) {
                this.writeByte(10);
                var objectsTable = this.objectsTable;
                var index = objectsTable.indexOf(o);
                var ins = 0;
                if (index != -1) {
                    this.write29(index << 1, true);
                    return;
                }
                objectsTable.push(o);
                this.write29(11, true);
                this.write29(1, true);
                for (var key in o) {
                    this.writeString(key);
                    this.writeObject(o[key]);
                }
                this.writeByte(1);
            }
            else if (null === o) {
                this.writeByte(1);
            }
            else if (undefined === o) {
                this.writeByte(0);
            }
        };
        AMF3Encode.prototype.writeArray = function (arr) {
            this.writeByte(9);
            var objectsTable = this.objectsTable;
            var index = objectsTable.indexOf(arr);
            var ins = 0;
            if (index != -1) {
                this.write29(index << 1, true);
                return;
            }
            objectsTable.push(arr);
            var len = arr.length;
            this.write29((len << 1) | 1, true);
            this.writeByte(1);
            for (var i = 0; i < len; i++) {
                this.writeObject(arr[i]);
            }
        };
        AMF3Encode.prototype.writeBytes = function (buffer) {
            this.writeByte(12);
            var objectsTable = this.objectsTable;
            var index = objectsTable.indexOf(buffer);
            var ins = 0;
            if (index != -1) {
                this.write29(index << 1, true);
                return;
            }
            objectsTable.push(buffer);
            var length = buffer.byteLength;
            this.write29((length << 1) | 1, true);
            this.unit8.set(new Uint8Array(buffer), this.position);
            this.position += buffer.byteLength;
        };
        AMF3Encode.prototype.toUint8Array = function () {
            return new Uint8Array(this.buf.buffer).slice(0, this.position);
        };
        AMF3Encode.prototype.toArrayBuffer = function (pos) {
            if (!~~pos) {
                pos = this.position;
            }
            return this.buf.buffer.slice(0, pos);
        };
        return AMF3Encode;
    }(Byte));
    rf.AMF3Encode = AMF3Encode;
    function amf_writeObject(obj) {
        var amf = rf.singleton(AMF3Encode);
        amf.clear();
        amf.writeObject(obj);
        return amf.toUint8Array();
    }
    rf.amf_writeObject = amf_writeObject;
    function amf_readObject(byte) {
        var amf = rf.singleton(AMF3Decode);
        if (byte instanceof Uint8Array) {
            byte = byte.buffer;
        }
        amf.clear();
        amf.setArrayBuffer(byte);
        var o = amf.readObject();
        return o;
    }
    rf.amf_readObject = amf_readObject;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function ease_default(t, b, c, d) {
        return c * t / d + b;
    }
    rf.ease_default = ease_default;
    function ease_quartic_in(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    }
    rf.ease_quartic_in = ease_quartic_in;
    function ease_quartic_out(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    rf.ease_quartic_out = ease_quartic_out;
    function ease_quartic_inout(t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
    rf.ease_quartic_inout = ease_quartic_inout;
    function ease_back_in(t, b, c, d) {
        var s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    rf.ease_back_in = ease_back_in;
    function ease_back_out(t, b, c, d) {
        var s = 5;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    rf.ease_back_out = ease_back_out;
    function ease_back_inout(t, b, c, d) {
        var s = 1.70158;
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
    rf.ease_back_inout = ease_back_inout;
    rf.tween_ease_function = {
        "Quadratic.out": ease_quartic_out,
        "Quadratic.in": ease_quartic_in,
        "Quadratic.inout": ease_quartic_inout
    };
    rf.tweenLink = new rf.Link();
    function tweener_createItem(eo, so, target, data, tweener) {
        var l = 0, e = 0, d = 0, s = 0;
        if (!data) {
            data = [];
        }
        for (var k in eo) {
            if (target) {
                s = target[k];
                if (undefined != s) {
                    s = (so && undefined != so[k]) ? so[k] : s;
                }
                else {
                    s = 0;
                }
            }
            else {
                s = (so && undefined != so[k]) ? so[k] : 0;
            }
            e = eo[k];
            data[l++] = { k: k, s: s, e: e, d: e - s, n: 0 };
        }
        if (tweener) {
            tweener.l = l;
        }
        return data;
    }
    rf.tweener_createItem = tweener_createItem;
    function createTweener(eo, duration, tm, target, ease, so) {
        var tweener = { data: [], caster: target, tm: tm, st: tm.now, ease: ease ? ease : ease_default, duration: duration };
        var data = tweener.data;
        tweener_createItem(eo, so, target, data, tweener);
        return tweener;
    }
    rf.createTweener = createTweener;
    function tween_lerp_pro(a, b, n, pro, ease) {
        if (!ease)
            ease = ease_default;
        for (var key in pro) {
            var s = a[key];
            var e = b[key];
            if (s === undefined || e === undefined) {
                continue;
            }
            if (s != e) {
                pro[key] = ease(n, s, e - s, 1);
            }
            else {
                pro[key] = s;
            }
        }
    }
    rf.tween_lerp_pro = tween_lerp_pro;
    function tweenTo(eo, duration, tm, target, ease, so) {
        var tweener = createTweener(eo, duration, tm, target, ease, so);
        if (tweener.l > 0) {
            rf.tweenLink.add(tweener);
        }
        return tweener;
    }
    rf.tweenTo = tweenTo;
    function tweenUpdate() {
        for (var vo = rf.tweenLink.getFrist(); vo; vo = vo.next) {
            if (vo.close == false) {
                var tweener = vo.data;
                var caster = tweener.caster, l = tweener.l, data = tweener.data, ease = tweener.ease, tm = tweener.tm, st = tweener.st, duration = tweener.duration, update = tweener.update, thisObj = tweener.thisObj;
                var now = tm.now - st;
                if (now >= duration) {
                    tweenEnd(tweener);
                }
                else {
                    for (var i = 0; i < l; i++) {
                        var item = data[i];
                        var k = item.k, s = item.s, d = item.d;
                        item.n = ease(now, s, d, duration);
                        if (caster) {
                            caster[k] = item.n;
                        }
                    }
                    if (undefined != update) {
                        update.call(thisObj, tweener);
                    }
                }
            }
        }
    }
    rf.tweenUpdate = tweenUpdate;
    function tweenEnd(tweener) {
        if (tweener.completed)
            return;
        var _a = tweener, caster = _a.caster, l = _a.l, data = _a.data, update = _a.update, complete = _a.complete, thisObj = _a.thisObj;
        for (var i = 0; i < l; i++) {
            var item = data[i];
            var k = item.k, e = item.e;
            item.n = e;
            if (caster) {
                caster[k] = e;
            }
        }
        if (undefined != update) {
            update.call(thisObj, tweener);
        }
        if (undefined != complete) {
            complete.call(thisObj, tweener);
        }
        rf.tweenLink.remove(tweener);
        tweener.completed = true;
    }
    rf.tweenEnd = tweenEnd;
    function tweenStop(tweener) {
        if (tweener.completed)
            return;
        rf.tweenLink.remove(tweener);
        tweener.completed = true;
    }
    rf.tweenStop = tweenStop;
    function scriptTween_play(target, data, tm, mx, my, dtype, property) {
        var tween = rf.recyclable(ScriptTween);
        tween.play(target, data, tm, mx, my, dtype, property);
        return tween;
    }
    rf.scriptTween_play = scriptTween_play;
    function random_number(num) {
        if (num instanceof Array) {
            return num[0] + Math.random() * (num[1] - num[0]);
        }
        return ~~num ? +num : 0;
    }
    rf.random_number = random_number;
    var STweenBase = (function () {
        function STweenBase() {
            this.needupdate = true;
        }
        STweenBase.prototype.start = function () {
            var _a = this, type = _a.type, data = _a.data, target = _a.target;
            var eo = {};
            eo[type] = (undefined != data.to) ? random_number(data.to) : target[type];
            if (data.duration <= 0) {
                target[type] = eo[type];
                this.complete();
            }
            else {
                var so = {};
                so[type] = (undefined != data.from) ? random_number(data.from) : target[type];
                this.tweenItems = tweener_createItem(eo, so);
                this.needupdate = true;
            }
        };
        STweenBase.prototype.update = function (now, interval) {
            var _a = this, tweenItems = _a.tweenItems, data = _a.data, target = _a.target, ease = _a.ease, st = _a.st, lifeTime = _a.lifeTime;
            var duration = ~~data.duration;
            if (isNaN(lifeTime) || lifeTime < duration) {
                this.lifeTime = lifeTime = duration;
            }
            now -= st;
            if (now >= lifeTime) {
                this.complete();
            }
            else {
                if (!tweenItems) {
                    return;
                }
                if (now > duration) {
                    now = duration;
                }
                var n = tweenItems.length;
                for (var i = 0; i < n; i++) {
                    var element = tweenItems[i];
                    if (element) {
                        var k = element.k, s = element.s, d = element.d;
                        target[k] = ease(now, s, d, duration);
                    }
                }
            }
        };
        STweenBase.prototype.stop = function () {
            this.tweenItems = undefined;
            this.complete();
        };
        STweenBase.prototype.complete = function () {
            var _a = this, tweenItems = _a.tweenItems, target = _a.target;
            if (tweenItems) {
                tweenItems.forEach(function (element) {
                    if (element) {
                        var k = element.k, e = element.e;
                        target[k] = e;
                    }
                });
            }
            this.status = 2;
            this.data = undefined;
            this.target = undefined;
            this.tweenItems = undefined;
            this.stween = undefined;
            this.lifeTime = 0;
        };
        return STweenBase;
    }());
    rf.STweenBase = STweenBase;
    var STweenPro = (function (_super) {
        __extends(STweenPro, _super);
        function STweenPro() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        STweenPro.prototype.start = function () {
            var _a = this, data = _a.data, target = _a.target;
            var so = data.so ? data.so : {};
            var eo = data.eo ? data.eo : {};
            for (var type in so) {
                if (eo[type] === undefined) {
                    eo[type] = target[type];
                }
            }
            for (var type in eo) {
                if (so[type] === undefined) {
                    so[type] = target[type];
                }
            }
            if (data.duration <= 0) {
                for (var type in eo) {
                    target[type] = eo[type];
                }
                this.complete();
            }
            else {
                this.tweenItems = tweener_createItem(eo, so);
            }
        };
        return STweenPro;
    }(STweenBase));
    rf.STweenPro = STweenPro;
    var STweenLiner = (function (_super) {
        __extends(STweenLiner, _super);
        function STweenLiner() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        STweenLiner.prototype.start = function () {
            var _a = this, type = _a.type, data = _a.data, target = _a.target;
            var so = {};
            var eo = {};
            var degree = target.rotation;
            degree += random_number(data.degree);
            degree += ~~data.offsetDegree;
            degree *= rf.DEGREES_TO_RADIANS;
            var len = random_number(data.len);
            so.x = target._x;
            so.y = target._y;
            eo.x = so.x + len * Math.cos(degree);
            eo.y = so.y + len * Math.sin(degree);
            if (data.duration <= 0) {
                target.x = eo.x;
                target.y = eo.y;
                this.complete();
            }
            else {
                this.tweenItems = tweener_createItem(eo, so);
            }
        };
        return STweenLiner;
    }(STweenBase));
    rf.STweenLiner = STweenLiner;
    var ScriptTween = (function (_super) {
        __extends(ScriptTween, _super);
        function ScriptTween() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScriptTween.prototype.play = function (target, data, tm, mx, my, dtype, property) {
            this.target = target;
            var tweens = this.tweens;
            if (!tweens) {
                this.tweens = tweens = [];
            }
            this.tm = tm ? tm : rf.defaultTimeMixer;
            var st = tm.now;
            var n = data.length;
            for (var i = 0; i < n; i++) {
                var element = data[i];
                var type = element.type;
                var c = rf.ScriptTweenIns[type];
                if (c) {
                    var t = rf.recyclable(c);
                    t.type = type;
                    t.data = element;
                    t.target = target;
                    t.dtype = dtype;
                    t.mx = mx;
                    t.my = my;
                    t.property = property;
                    t.status = 0;
                    t.ease = rf.tween_ease_function[element.ease] ? rf.tween_ease_function[element.ease] : ease_default;
                    t.st = st + element.time;
                    t.stween = this;
                    tweens.push(t);
                }
            }
            rf.Engine.addTick(this);
            this.update(0, 0);
        };
        ScriptTween.prototype.playPro = function (target, tm, duration, to, from, time) {
            if (time === void 0) { time = 0; }
            var tweens = this.tweens;
            if (!tweens) {
                this.tweens = tweens = [];
            }
            this.tm = tm;
            var t = rf.recyclable(STweenPro);
            t.type = "pro";
            t.data = { so: from, eo: to, duration: duration, time: time };
            t.target = target;
            t.status = 0;
            t.ease = ease_default;
            t.st = tm.now + time;
            t.stween = this;
            tweens.push(t);
            rf.Engine.addTick(this);
            this.update(0, 0);
            return t;
        };
        ScriptTween.prototype.update = function (now, interval) {
            var runing = 0;
            var _a = this, tweens = _a.tweens, tm = _a.tm;
            now = tm.now;
            var n = tweens.length;
            for (var i = 0; i < n; i++) {
                var element = tweens[i];
                var status_1 = element.status, data = element.data;
                if (status_1 != 2) {
                    runing++;
                    if (status_1 == 0) {
                        if (now >= element.st) {
                            element.status = 1;
                            element.start();
                            if (data.duration > 0 && element.needupdate) {
                                element.update(now, tm.interval);
                            }
                        }
                    }
                    else {
                        if (element.needupdate) {
                            element.update(now, tm.interval);
                        }
                    }
                }
            }
            if (0 == runing) {
                this.simpleDispatch(4);
                rf.Engine.removeTick(this);
                this.target = undefined;
                tweens.length = 0;
            }
        };
        return ScriptTween;
    }(rf.MiniDispatcher));
    rf.ScriptTween = ScriptTween;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Stream = (function (_super) {
        __extends(Stream, _super);
        function Stream() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Stream.prototype.toObject = function (v, pros, to) {
            var n = v.length;
            if (!to) {
                to = {};
            }
            for (var i = 0; i < n; i++) {
                to[pros[i]] = v[i];
            }
            return to;
        };
        return Stream;
    }(rf.EventX));
    rf.Stream = Stream;
    var Socket = (function (_super) {
        __extends(Socket, _super);
        function Socket() {
            var _this = _super.call(this) || this;
            _this.input = new rf.AMF3Decode();
            _this.output = new rf.AMF3Encode(new ArrayBuffer(10240));
            _this.sendoption = {};
            _this.sendTemp = [];
            _this.stream = new Stream();
            return _this;
        }
        Socket.prototype.connect = function (url) {
            wx.onSocketOpen(this.onOpen.bind(this));
            wx.onSocketClose(this.onClose.bind(this));
            wx.onSocketError(this.onError.bind(this));
            wx.onSocketMessage(this.onMessage.bind(this));
            wx.connectSocket({ url: url });
        };
        Socket.prototype.close = function (reason) {
            this.connected = false;
            wx.closeSocket({ reason: reason });
        };
        Socket.prototype.onOpen = function (e) {
            this.connected = true;
            this.simpleDispatch(65536, e);
        };
        Socket.prototype.onMessage = function (e) {
            var _a = this, input = _a.input, stream = _a.stream;
            var data = e.data;
            input.clear();
            input.setArrayBuffer(data);
            var code = input.readUint16(true);
            var flag = input.readByte();
            var len = data.byteLength;
            stream.type = code;
            stream.len = len;
            if (flag == 0) {
                stream.data = input.readObject();
            }
            else {
                input.clear();
                data = new Zlib.Inflate(new Uint8Array(data.slice(3))).decompress().buffer;
                input.setArrayBuffer(data);
                stream.data = input.readObject();
                console.log("Inflate data code:" + code + " length:" + stream.len + " => " + input.position);
            }
            if (stream.type != 0) {
                console.log("receive: " + stream.type + ", ", stream.data);
            }
            this.dispatchEvent(stream);
        };
        Socket.prototype.onClose = function (e) {
            console.log("socket onclose:", e);
            this.simpleDispatch(65537, e);
        };
        Socket.prototype.onError = function (e) {
            console.log("socket onError:", e);
            this.simpleDispatch(65538, e);
        };
        Socket.prototype.send = function (code, value) {
            if (code != 0) {
                console.log("send: ", code, value);
            }
            var _a = this, sendoption = _a.sendoption, output = _a.output, sendTemp = _a.sendTemp;
            output.clear();
            output.position = 2;
            output.writeUint16(code);
            if (value != undefined) {
                if ((value instanceof Array) == false) {
                    sendTemp[0] = value;
                    value = sendTemp;
                }
                output.writeObject(value);
            }
            var pos = output.position;
            output.position = 0;
            output.writeUint16(pos);
            sendoption.data = output.toArrayBuffer(pos);
            wx.sendSocketMessage(sendoption);
        };
        return Socket;
    }(rf.MiniDispatcher));
    rf.Socket = Socket;
    var SocketDecoder = (function () {
        function SocketDecoder(socket, types) {
            if (!socket) {
                return;
            }
            this.socket = socket;
            var n = types.length;
            for (var i = 0; i < n; i++) {
                var type = types[i];
                var f = this["f_" + type];
                if (f) {
                    socket.on(type, f, this);
                }
                else {
                    console.log("缺少function:f_" + type);
                }
            }
        }
        SocketDecoder.prototype.showError = function (args, type) {
            if (type === void 0) { type = 0; }
        };
        return SocketDecoder;
    }());
    rf.SocketDecoder = SocketDecoder;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Quaternion = (function () {
        function Quaternion(x, y, z, w) {
            if (w === void 0) { w = 1; }
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w;
        }
        Quaternion.lerp = function (qa, qb, percent) {
            var qax = qa.x, qay = qa.y, qaz = qa.z, qaw = qa.w;
            var qbx = qb.x, qby = qb.y, qbz = qb.z, qbw = qb.w;
            if (qax * qbx + qay * qby + qaz * qbz + qaw * qbw < 0) {
                return new Quaternion(qax + percent * (-qbx - qax), qay + percent * (-qby - qay), qaz + percent * (-qbz - qaz), qaw + percent * (-qbw - qaw));
            }
            return new Quaternion(qax + percent * (qbx - qax), qay + percent * (qby - qay), qaz + percent * (qbz - qaz), qaw + percent * (qbw - qaw));
        };
        Quaternion.prototype.fromMatrix3D = function (m) {
            var _a = m, m11 = _a[0], m12 = _a[1], m13 = _a[2], m21 = _a[4], m22 = _a[5], m23 = _a[6], m31 = _a[8], m32 = _a[9], m33 = _a[10];
            var tr = m11 + m22 + m33;
            var tmp;
            if (tr > 0) {
                tmp = 1 / (2 * Math.sqrt(tr + 1));
                this.x = (m23 - m32) * tmp;
                this.y = (m31 - m13) * tmp;
                this.z = (m12 - m21) * tmp;
                this.w = 0.25 / tmp;
            }
            else {
                if ((m11 > m22) && (m11 > m33)) {
                    tmp = 1 / (2 * Math.sqrt(1 + m11 - m22 + m33));
                    this.x = (m21 + m12) * tmp;
                    this.y = (m13 + m31) * tmp;
                    this.z = (m32 - m23) * tmp;
                    this.w = 0.25 / tmp;
                }
                else if ((m22 > m11) && (m22 > m33)) {
                    tmp = 1 / (Math.sqrt(1 + m22 - m11 - m33));
                    this.x = 0.25 / tmp;
                    this.y = (m32 + m23) * tmp;
                    this.z = (m13 - m31) * tmp;
                    this.w = (m21 + m12) * tmp;
                }
                else if ((m33 > m11) && (m33 > m22)) {
                    tmp = 1 / (Math.sqrt(1 + m33 - m11 - m22));
                    this.x = (m32 + m23) * tmp;
                    this.y = 0.25 / tmp;
                    this.z = (m21 - m12) * tmp;
                    this.w = (m13 + m31) * tmp;
                }
            }
            return this;
        };
        Quaternion.prototype.toMatrix3D = function (target) {
            var _a = this, x = _a.x, y = _a.y, z = _a.z, w = _a.w;
            var x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
            if (!target) {
                target = rf.newMatrix3D();
            }
            var rawData = target;
            rawData[0] = 1 - (yy + zz);
            rawData[1] = xy + wz;
            rawData[2] = xz - wy;
            rawData[3] = 0;
            rawData[4] = xy - wz;
            rawData[5] = 1 - (xx + zz);
            rawData[6] = yz + wx;
            rawData[7] = 0;
            rawData[8] = xz + wy;
            rawData[9] = yz - wx;
            rawData[10] = 1 - (xx + yy);
            rawData[11] = 0;
            rawData[12] = 0;
            rawData[13] = 0;
            rawData[14] = 0;
            rawData[15] = 1;
            return target;
        };
        Quaternion.prototype.fromAxisAngle = function (axis, angleInRadians) {
            var angle = angleInRadians * 0.5;
            var sin_a = Math.sin(angle);
            var cos_a = Math.cos(angle);
            this.x = axis.x * sin_a;
            this.y = axis.y * sin_a;
            this.z = axis.z * sin_a;
            this.w = cos_a;
        };
        Quaternion.prototype.conjugate = function () {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        };
        Quaternion.prototype.toString = function () {
            return "[Quaternion] (x:" + this.x + " ,y:" + this.y + ", z:" + this.z + ", w:" + this.w + ")";
        };
        return Quaternion;
    }());
    rf.Quaternion = Quaternion;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Ray = (function () {
        function Ray(origion, direction) {
            this.origin = rf.newVector3D(origion);
            this.direction = rf.newVector3D(direction);
        }
        Ray.prototype.copyFrom = function (ray) {
            this.origin.set(ray.origin);
            this.direction.set(ray.direction);
            return this;
        };
        Ray.prototype.at = function (t, target) {
            if (target == undefined) {
                target = rf.newVector3D();
            }
            target.set(this.direction);
            target.v3_scale(t);
            target.v3_add(this.origin, target);
            return target;
        };
        Ray.prototype.applyMatrix4 = function (matrix) {
            matrix.m3_transformVector(this.origin, this.origin);
            matrix.m3_transformRotation(this.direction, this.direction);
            return this;
        };
        Ray.prototype.intersectsSphere = function (sphere) {
            return this.distanceSqToPoint(sphere.center) <= sphere.radius;
        };
        Ray.prototype.distanceSqToPoint = function (point) {
            var v1 = rf.TEMP_VECTOR3D;
            v1.set(point);
            v1.v3_sub(this.origin, v1);
            var directionDistance = v1.v3_dotProduct(this.direction);
            if (directionDistance < 0) {
                v1.set(this.origin);
                v1.v3_sub(point, v1);
                return v1.v3_length;
            }
            v1.set(this.direction);
            v1.v3_scale(directionDistance);
            v1.v3_add(this.origin, v1);
            v1.v3_sub(point, v1);
            return v1.v3_length;
        };
        Ray.prototype.intersectBox = function (box, target) {
            var tmin, tmax, tymin, tymax, tzmin, tzmax;
            var invdirx = 1 / this.direction.x, invdiry = 1 / this.direction.y, invdirz = 1 / this.direction.z;
            var origin = this.origin;
            if (invdirx >= 0) {
                tmin = (box.minx - origin.x) * invdirx;
                tmax = (box.maxx - origin.x) * invdirx;
            }
            else {
                tmin = (box.maxx - origin.x) * invdirx;
                tmax = (box.minx - origin.x) * invdirx;
            }
            if (invdiry >= 0) {
                tymin = (box.miny - origin.y) * invdiry;
                tymax = (box.maxy - origin.y) * invdiry;
            }
            else {
                tymin = (box.maxy - origin.y) * invdiry;
                tymax = (box.miny - origin.y) * invdiry;
            }
            if ((tmin > tymax) || (tymin > tmax))
                return null;
            if (tymin > tmin || tmin !== tmin)
                tmin = tymin;
            if (tymax < tmax || tmax !== tmax)
                tmax = tymax;
            if (invdirz >= 0) {
                tzmin = (box.minz - origin.z) * invdirz;
                tzmax = (box.maxz - origin.z) * invdirz;
            }
            else {
                tzmin = (box.maxz - origin.z) * invdirz;
                tzmax = (box.minz - origin.z) * invdirz;
            }
            if ((tmin > tzmax) || (tzmin > tmax))
                return null;
            if (tzmin > tmin || tmin !== tmin)
                tmin = tzmin;
            if (tzmax < tmax || tmax !== tmax)
                tmax = tzmax;
            if (tmax < 0)
                return null;
            return this.at(tmin >= 0 ? tmin : tmax, target);
        };
        Ray.prototype.intersectTriangle = function (a, b, c, backfaceCulling, target) {
            var diff = Ray.diff, edge1 = Ray.edge1, edge2 = Ray.edge2, normal = Ray.normal;
            edge1.set(b);
            edge1.v3_sub(a, edge1);
            edge2.set(c);
            edge2.v3_sub(a, edge2);
            normal.set(edge1);
            normal.v3_crossProduct(edge2, normal);
            var DdN = this.direction.v3_dotProduct(normal);
            var sign;
            if (DdN > 0) {
                if (backfaceCulling)
                    return null;
                sign = 1;
            }
            else if (DdN < 0) {
                sign = -1;
                DdN = -DdN;
            }
            else {
                return null;
            }
            diff.set(this.origin);
            diff.v3_sub(a, diff);
            diff.v3_crossProduct(edge2, edge2);
            var DdQxE2 = sign * this.direction.v3_dotProduct(edge2);
            if (DdQxE2 < 0) {
                return null;
            }
            edge1.v3_crossProduct(diff, edge1);
            var DdE1xQ = sign * this.direction.v3_dotProduct(edge1);
            if (DdE1xQ < 0) {
                return null;
            }
            if (DdQxE2 + DdE1xQ > DdN) {
                return null;
            }
            var QdN = -sign * diff.v3_dotProduct(normal);
            if (QdN < 0) {
                return null;
            }
            return this.at(QdN / DdN, target);
        };
        Ray.diff = rf.newVector3D();
        Ray.edge1 = rf.newVector3D();
        Ray.edge2 = rf.newVector3D();
        Ray.normal = rf.newVector3D();
        return Ray;
    }());
    rf.Ray = Ray;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.vertex_ui_variable = {
        "pos": { size: 3, offset: 0 },
        "uv": { size: 4, offset: 3 },
        "color": { size: 4, offset: 7 },
        "data32PerVertex": { size: 11, offset: 0 }
    };
    rf.vertex_ui_full_variable = {
        "pos": { size: 3, offset: 0 },
        "normal": { size: 3, offset: 3 },
        "uv": { size: 4, offset: 6 },
        "color": { size: 4, offset: 10 },
        "data32PerVertex": { size: 14, offset: 0 }
    };
    rf.vertex_mesh_variable = {
        "pos": { size: 3, offset: 0 },
        "normal": { size: 3, offset: 3 },
        "uv": { size: 2, offset: 6 },
        "data32PerVertex": { size: 8, offset: 0 }
    };
    rf.vertex_mesh_full_variable = {
        "pos": { size: 3, offset: 0 },
        "normal": { size: 3, offset: 3 },
        "uv": { size: 2, offset: 6 },
        "color": { size: 4, offset: 8 },
        "data32PerVertex": { size: 12, offset: 0 }
    };
    rf.vertex_skeleton_variable = {
        "index": { size: 4, offset: 0 },
        "weight": { size: 4, offset: 4 },
        "data32PerVertex": { size: 8, offset: 0 }
    };
    rf.EMPTY_MAX_NUMVERTICES = Math.pow(2, 13);
    rf.empty_float32_pos = new Float32Array(3 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_normal = new Float32Array(3 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_tangent = new Float32Array(3 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_uv = new Float32Array(2 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_color = new Float32Array(4 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_uint16_indexs = new Uint16Array(3 * rf.EMPTY_MAX_NUMVERTICES);
    rf.empty_float32_object = {
        "pos": rf.empty_float32_pos,
        "normal": rf.empty_float32_normal,
        "uv": rf.empty_float32_uv,
        "color": rf.empty_float32_color
    };
    function createGeometry(data, variables, numVertices, result) {
        var data32PerVertex = variables["data32PerVertex"].size;
        if (undefined == result) {
            result = new Float32Array(data32PerVertex * numVertices);
        }
        var offset = 0;
        var offsetIndex = 0;
        var offsetData = 0;
        var key = "";
        var index = 0;
        for (var i = 0; i < numVertices; i++) {
            offset = data32PerVertex * i;
            for (key in data) {
                var variable = variables[key];
                if (undefined == variable) {
                    continue;
                }
                var array = data[key];
                offsetData = i * variable.size;
                offsetIndex = offset + variable.offset;
                for (index = 0; index < variable.size; index++) {
                    result[offsetIndex + index] = array[offsetData + index];
                }
            }
        }
        return result;
    }
    rf.createGeometry = createGeometry;
    var VertexInfo = (function () {
        function VertexInfo(value, data32PerVertex, variables) {
            this.numVertices = 0;
            this.data32PerVertex = 0;
            if (value instanceof Float32Array) {
                this.vertex = value;
            }
            else {
                this.vertex = new Float32Array(value);
            }
            this.data32PerVertex = data32PerVertex;
            this.numVertices = this.vertex.length / data32PerVertex;
            this.variables = variables;
        }
        VertexInfo.prototype.regVariable = function (variable, offset, size) {
            if (undefined == this.variables) {
                this.variables = {};
            }
            this.variables[variable] = { size: size, offset: offset };
        };
        Object.defineProperty(VertexInfo.prototype, "debug", {
            get: function () {
                var _a = this, variables = _a.variables, vertex = _a.vertex;
                var o = {};
                var data32PerVertex = variables.data32PerVertex.size;
                for (var i = 0; i < vertex.length; i += data32PerVertex) {
                    for (var key in variables) {
                        if (key == "data32PerVertex") {
                            continue;
                        }
                        var arr = o[key];
                        if (!arr) {
                            o[key] = arr = [];
                        }
                        var variable = variables[key];
                        var size = variable.size, offset = variable.offset;
                        if (size == 1) {
                            arr.push(vertex[i + offset]);
                        }
                        else {
                            var temp = [];
                            for (var j = 0; j < size; j++) {
                                temp.push(vertex[i + offset + j]);
                            }
                            arr.push(temp);
                        }
                    }
                }
                return o;
            },
            enumerable: true,
            configurable: true
        });
        return VertexInfo;
    }());
    rf.VertexInfo = VertexInfo;
    var Sphere = (function () {
        function Sphere() {
            this.change = true;
            this.radius = 0;
            this.center = rf.newVector3D();
        }
        Sphere.prototype.copyFrom = function (sphere) {
            this.center.set(sphere.center);
            this.radius = sphere.radius;
            this.change = false;
        };
        Sphere.prototype.applyMatrix4 = function (matrix, result) {
            result = result || this;
            result.copyFrom(this);
            matrix.m3_transformVector(result.center, result.center);
            result.radius = this.radius * matrix.m3_getMaxScaleOnAxis();
            return result;
        };
        return Sphere;
    }());
    rf.Sphere = Sphere;
    var OBB = (function () {
        function OBB(bounding, maxx, miny, maxy, minz, maxz) {
            this.change = true;
            this.vertex = new Float32Array(24);
            this.index = OBB.index;
            if (bounding != undefined) {
                if (bounding instanceof ArrayBuffer) {
                    this.minx = bounding[0];
                    this.maxx = bounding[1];
                    this.miny = bounding[2];
                    this.maxy = bounding[3];
                    this.minz = bounding[4];
                    this.maxz = bounding[5];
                }
                else {
                    this.minx = Number(bounding);
                    this.maxx = maxx;
                    this.miny = miny;
                    this.maxy = maxy;
                    this.minz = minz;
                    this.maxz = maxz;
                }
                this.updateTriangle();
                this.change = false;
            }
        }
        OBB.prototype.updateTriangle = function () {
            this.vertex[0] = this.minx;
            this.vertex[1] = this.miny;
            this.vertex[2] = this.minz;
            this.vertex[3] = this.minx;
            this.vertex[4] = this.maxy;
            this.vertex[5] = this.minz;
            this.vertex[6] = this.maxx;
            this.vertex[7] = this.maxy;
            this.vertex[8] = this.minz;
            this.vertex[9] = this.maxx;
            this.vertex[10] = this.miny;
            this.vertex[11] = this.minz;
            this.vertex[12] = this.maxx;
            this.vertex[13] = this.miny;
            this.vertex[14] = this.maxz;
            this.vertex[15] = this.maxx;
            this.vertex[16] = this.maxy;
            this.vertex[17] = this.maxz;
            this.vertex[18] = this.minx;
            this.vertex[19] = this.maxy;
            this.vertex[20] = this.maxz;
            this.vertex[21] = this.minx;
            this.vertex[22] = this.miny;
            this.vertex[23] = this.maxz;
        };
        OBB.updateOBBByGeometry = function (mesh, out) {
            var obb = out || new OBB();
            var _a = mesh.vertex.data, numVertices = _a.numVertices, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex, variables = _a.variables;
            var pos = variables['pos'];
            obb.maxx = obb.minx = vertex[pos.offset];
            obb.maxy = obb.miny = vertex[pos.offset + 1];
            obb.maxz = obb.minz = vertex[pos.offset + 2];
            for (var i = 1; i < numVertices; i++) {
                var p = i * data32PerVertex + pos.offset;
                var x = vertex[p];
                var y = vertex[p + 1];
                var z = vertex[p + 2];
                if (x < obb.minx)
                    obb.minx = x;
                else if (x > obb.maxx)
                    obb.maxx = x;
                if (y < obb.miny)
                    obb.miny = y;
                else if (y > obb.maxy)
                    obb.maxy = y;
                if (z < obb.minz)
                    obb.minz = z;
                else if (z > obb.maxz)
                    obb.maxz = z;
            }
            obb.updateTriangle();
            obb.change = false;
            return obb;
        };
        OBB.index = new Uint16Array([
            0, 1, 2, 0, 2, 3,
            1, 6, 5, 1, 5, 2,
            2, 5, 4, 2, 4, 3,
            3, 4, 7, 3, 7, 0,
            4, 5, 6, 4, 6, 7,
            0, 7, 6, 0, 6, 1
        ]);
        return OBB;
    }());
    rf.OBB = OBB;
    var Temp_Float32Byte = (function () {
        function Temp_Float32Byte() {
            this.data32PerVertex = 1;
            this.numVertices = 0;
            this.position = 0;
            this.data = new Float32Array(2048);
        }
        Temp_Float32Byte.prototype.onSpawn = function () {
            this.data32PerVertex = 1;
            this.numVertices = 0;
            this.position = 0;
        };
        Temp_Float32Byte.prototype.set = function (array, offset) {
            if (undefined == offset) {
                offset = this.position;
            }
            this.data.set(array, offset);
            this.position = offset + array.length;
        };
        Temp_Float32Byte.prototype.toArray = function () {
            var len = this.data32PerVertex * this.numVertices;
            var arr = new Float32Array(len);
            arr.set(this.data.slice(0, len));
            return arr;
        };
        return Temp_Float32Byte;
    }());
    rf.Temp_Float32Byte = Temp_Float32Byte;
    function geometry_plane(width, height, position, variables, matrix3D) {
        var width_half = width * 0.5;
        var height_half = height * 0.5;
        var points = [
            width_half, height_half, 0, 0, 0,
            -width_half, height_half, 0, 1, 0,
            -width_half, -height_half, 0, 1, 1,
            width_half, -height_half, 0, 0, 1
        ];
        var v = rf.TEMP_VECTOR3D;
        var variable = variables["pos"];
        var pos = variable ? variable.size * 4 : -1;
        variable = variables["normal"];
        var normal = variable ? variable.size * 4 : -1;
        variable = variables["uv"];
        var uv = variable ? variable.size * 4 : -1;
        for (var i = 0; i < 4; i++) {
            var p = i * 5;
            if (-1 != pos) {
                v.x = points[p];
                v.y = points[p + 1];
                v.z = points[p + 2];
                v.w = 1.0;
                if (undefined != matrix3D) {
                    matrix3D.m3_transformVector(v, v);
                }
                rf.empty_float32_pos.wPoint3(position * pos + (i * 3), v.x, v.y, v.z);
            }
            if (-1 != normal) {
                v.x = 0;
                v.y = 0;
                v.z = 1;
                if (undefined != matrix3D) {
                    matrix3D.m3_transformRotation(v, v);
                }
                rf.empty_float32_normal.wPoint3(position * normal + (i * 3), -v.x, -v.y, v.z);
            }
            if (-1 != uv) {
                rf.empty_float32_uv.wPoint2(position * uv + (i * 2), points[p + 3], points[p + 4]);
            }
        }
    }
    rf.geometry_plane = geometry_plane;
    var GeometryBase = (function () {
        function GeometryBase(variables) {
            this.data32PerVertex = 0;
            this.numVertices = 0;
            this.centerPoint = rf.newVector3D();
            this.numTriangles = 0;
            if (undefined == variables) {
                variables = rf.vertex_mesh_variable;
            }
            this.variables = variables;
            this.data32PerVertex = variables["data32PerVertex"].size;
        }
        GeometryBase.prototype.initData = function (data) {
            var c = rf.context3D;
            var variables = data.variables, data32PerVertex = data.data32PerVertex, vertex = data.vertex, index = data.index, vertexBuffer = data.vertexBuffer, indexBuffer = data.indexBuffer;
            if (!vertexBuffer) {
                var info = new VertexInfo(vertex, data32PerVertex, variables);
                data.vertexBuffer = vertexBuffer = c.createVertexBuffer(info);
            }
            if (!indexBuffer) {
                if (index) {
                    data.indexBuffer = indexBuffer = c.createIndexBuffer(index);
                }
            }
        };
        GeometryBase.prototype.setData = function (data) {
            this.data = data;
            var meshVar = data.variables, numVertices = data.numVertices, numTriangles = data.numTriangles, data32PerVertex = data.data32PerVertex;
            var variables = this.variables;
            var c = rf.context3D;
            if (!meshVar) {
                data.variables = variables;
                data.data32PerVertex = data32PerVertex;
            }
            else {
                variables = data.variables;
            }
            this.numVertices = numVertices;
            this.numTriangles = numTriangles;
            this.data32PerVertex = data32PerVertex;
            this.initData(data);
            var vertexBuffer = data.vertexBuffer, indexBuffer = data.indexBuffer;
            this.vertex = vertexBuffer;
            this.index = indexBuffer;
        };
        Object.defineProperty(GeometryBase.prototype, "pos", {
            get: function () {
                var _a = this.vertex.data, numVertices = _a.numVertices, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex;
                var pos = [];
                for (var i = 0; i < numVertices; i++) {
                    var p = i * data32PerVertex;
                    pos.push([vertex[p], vertex[p + 1], vertex[p + 2]]);
                }
                return pos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryBase.prototype, "uv", {
            get: function () {
                var _a = this.vertex.data, numVertices = _a.numVertices, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex, variables = _a.variables;
                var uv = variables["uv"];
                var uvs = [];
                for (var i = 0; i < numVertices; i++) {
                    var p = i * data32PerVertex + uv.offset;
                    uvs.push([vertex[p], vertex[p + 1]]);
                }
                return uvs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeometryBase.prototype, "triangles", {
            get: function () {
                var numTriangles = this.numTriangles;
                var data = this.index.data;
                var triangles = [];
                for (var i = 0; i < numTriangles; i++) {
                    var p = i * 3;
                    triangles.push([data[p], data[p + 1], data[p + 2]]);
                }
                return triangles;
            },
            enumerable: true,
            configurable: true
        });
        GeometryBase.prototype.calculateBoundingSphere = function (center, out) {
            var sphere = out || new Sphere();
            var _a = this.vertex.data, numVertices = _a.numVertices, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex, variables = _a.variables;
            var minR = 0;
            var pos = variables['pos'];
            for (var i = 0; i < numVertices; i++) {
                var p = i * data32PerVertex + pos.offset;
                var x = vertex[p];
                var y = vertex[p + 1];
                var z = vertex[p + 2];
                x -= center.x;
                x *= x;
                y -= center.y;
                y *= y;
                z -= center.z;
                z *= z;
                var dis = Math.sqrt(x + y + z);
                if (dis > minR) {
                    minR = dis;
                }
            }
            sphere.center.set(center);
            sphere.radius = minR;
            sphere.change = false;
            return sphere;
        };
        GeometryBase.prototype.uploadContext = function (camera, mesh, program, now, interval) {
            var c = rf.context3D;
            this.vertex.uploadContext(program);
            var sceneTransform = mesh.sceneTransform, invSceneTransform = mesh.invSceneTransform;
            var worldTranform = rf.TEMP_MATRIX3D;
            worldTranform.m3_append(camera.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
            c.setProgramConstantsFromMatrix("invm", invSceneTransform);
            return worldTranform;
        };
        return GeometryBase;
    }());
    rf.GeometryBase = GeometryBase;
    var SkeletonGeometry = (function (_super) {
        __extends(SkeletonGeometry, _super);
        function SkeletonGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SkeletonGeometry;
    }(GeometryBase));
    rf.SkeletonGeometry = SkeletonGeometry;
    var PlaneGeometry = (function (_super) {
        __extends(PlaneGeometry, _super);
        function PlaneGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PlaneGeometry.prototype.create = function (width, height) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            var numVertices = 0;
            var quad = 0;
            var variables = this.variables;
            var matrix3D = rf.newMatrix3D();
            geometry_plane(width, height, 0, variables);
            numVertices += 4;
            quad++;
            var c = rf.context3D;
            var arr = createGeometry(rf.empty_float32_object, variables, numVertices);
            this.vertex = c.createVertexBuffer(new VertexInfo(arr, this.data32PerVertex, variables));
            this.index = c.getIndexByQuad(quad);
            this.numVertices = numVertices;
            this.numTriangles = quad * 2;
            return this;
        };
        return PlaneGeometry;
    }(GeometryBase));
    rf.PlaneGeometry = PlaneGeometry;
    var BoxGeometry = (function (_super) {
        __extends(BoxGeometry, _super);
        function BoxGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BoxGeometry.prototype.create = function (width, height, depth) {
            var matrix3D = rf.newMatrix3D();
            var numVertices = 0;
            var quad = 0;
            var variables = this.variables;
            matrix3D.m3_translation(0, 0, depth * 0.5);
            geometry_plane(width, height, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(180 * rf.DEGREES_TO_RADIANS, rf.Y_AXIS);
            matrix3D.m3_translation(0, 0, -depth * 0.5);
            geometry_plane(width, height, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(-90 * rf.DEGREES_TO_RADIANS, rf.Y_AXIS);
            matrix3D.m3_translation(width * 0.5, 0, 0);
            geometry_plane(depth, height, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(90 * rf.DEGREES_TO_RADIANS, rf.Y_AXIS);
            matrix3D.m3_translation(-width * 0.5, 0, 0);
            geometry_plane(depth, height, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(90 * rf.DEGREES_TO_RADIANS, rf.X_AXIS);
            matrix3D.m3_translation(0, height * 0.5, 0);
            geometry_plane(width, depth, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            matrix3D.m3_identity();
            matrix3D.m3_rotation(-90 * rf.DEGREES_TO_RADIANS, rf.X_AXIS);
            matrix3D.m3_translation(0, -height * 0.5, 0);
            geometry_plane(width, depth, quad, variables, matrix3D);
            numVertices += 4;
            quad++;
            var c = rf.context3D;
            var arr = createGeometry(rf.empty_float32_object, variables, numVertices);
            this.vertex = c.createVertexBuffer(new VertexInfo(arr, this.data32PerVertex, variables));
            this.index = c.getIndexByQuad(quad);
            this.numVertices = numVertices;
            this.numTriangles = quad * 2;
            return this;
        };
        return BoxGeometry;
    }(GeometryBase));
    rf.BoxGeometry = BoxGeometry;
    var SkyBoxGeometry = (function (_super) {
        __extends(SkyBoxGeometry, _super);
        function SkyBoxGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkyBoxGeometry.prototype.create = function () {
            return _super.prototype.create.call(this, 500., 500., 500.);
        };
        SkyBoxGeometry.prototype.uploadContext = function (camera, mesh, program, now, interval) {
            var c = rf.context3D;
            this.vertex.uploadContext(program);
            var sceneTransform = mesh.sceneTransform, invSceneTransform = mesh.invSceneTransform;
            var worldTranform = rf.TEMP_MATRIX3D;
            sceneTransform[12] = camera.pos[0];
            sceneTransform[13] = camera.pos[1];
            sceneTransform[14] = camera.pos[2];
            worldTranform.m3_append(camera.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
            c.setProgramConstantsFromMatrix("invm", invSceneTransform);
            return worldTranform;
        };
        return SkyBoxGeometry;
    }(BoxGeometry));
    rf.SkyBoxGeometry = SkyBoxGeometry;
    function hsva(h, s, v, a) {
        if (s > 1 || v > 1 || a > 1) {
            return;
        }
        var th = h % 360;
        var i = Math.floor(th / 60);
        var f = th / 60 - i;
        var m = v * (1 - s);
        var n = v * (1 - s * f);
        var k = v * (1 - s * (1 - f));
        var color = [];
        var r = [v, n, m, m, k, v];
        var g = [k, v, v, n, m, m];
        var b = [m, m, k, v, v, n];
        color.push(r[i], g[i], b[i], a);
        return color;
    }
    rf.hsva = hsva;
    var SphereGeometry = (function (_super) {
        __extends(SphereGeometry, _super);
        function SphereGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SphereGeometry.prototype.create = function (row, column, rad, color) {
            var numVertices = 0;
            for (var i = 0; i <= row; i++) {
                var r = Math.PI / row * i;
                var ry = Math.cos(r);
                var rr = Math.sin(r);
                for (var ii = 0; ii <= column; ii++) {
                    var tr = Math.PI * 2 / column * ii;
                    var tx = rr * rad * Math.cos(tr);
                    var ty = ry * rad;
                    var tz = rr * rad * Math.sin(tr);
                    var rx = rr * Math.cos(tr);
                    var rz = rr * Math.sin(tr);
                    var tc = color;
                    if (undefined == tc) {
                        tc = hsva(360 / row * i, 1, 1, 1);
                    }
                    rf.empty_float32_pos.wPoint3(numVertices * 3, tx, ty, tz);
                    rf.empty_float32_normal.wPoint3(numVertices * 3, rx, ry, rz);
                    rf.empty_float32_uv.wPoint2(numVertices * 2, 1 - 1 / column * ii, 1 / row * i);
                    rf.empty_float32_color.wPoint4(numVertices * 4, tc[0], tc[1], tc[2], tc[3]);
                    numVertices++;
                }
            }
            var position = 0;
            for (var i = 0; i < row; i++) {
                for (var ii = 0; ii < column; ii++) {
                    var r = (column + 1) * i + ii;
                    rf.empty_uint16_indexs.set([r, r + 1, r + column + 2, r, r + column + 2, r + column + 1], position);
                    position += 6;
                }
            }
            var variables = this.variables;
            var c = rf.context3D;
            var arr = createGeometry(rf.empty_float32_object, variables, numVertices);
            this.vertex = c.createVertexBuffer(new VertexInfo(arr, this.data32PerVertex, variables));
            this.index = c.createIndexBuffer(rf.empty_uint16_indexs.slice(0, position));
            this.numVertices = numVertices;
            this.numTriangles = position / 3;
            return this;
        };
        return SphereGeometry;
    }(GeometryBase));
    rf.SphereGeometry = SphereGeometry;
    var TorusGeomerty = (function (_super) {
        __extends(TorusGeomerty, _super);
        function TorusGeomerty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TorusGeomerty.prototype.create = function (row, column, irad, orad) {
            var numVertices = 0;
            for (var i = 0; i <= row; i++) {
                var r = Math.PI * 2 / row * i;
                var rr = Math.cos(r);
                var ry = Math.sin(r);
                for (var ii = 0; ii <= column; ii++) {
                    var tr = Math.PI * 2 / column * ii;
                    var tx = (rr * irad + orad) * Math.cos(tr);
                    var ty = ry * irad;
                    var tz = (rr * irad + orad) * Math.sin(tr);
                    var rx = rr * Math.cos(tr);
                    var rz = rr * Math.sin(tr);
                    var rs = 1 / column * ii;
                    var rt = 1 / row * i + 0.5;
                    if (rt > 1.0) {
                        rt -= 1.0;
                    }
                    rt = 1.0 - rt;
                    rf.empty_float32_pos.wPoint3(numVertices * 3, tx, ty, tz);
                    rf.empty_float32_normal.wPoint3(numVertices * 3, rx, ry, rz);
                    rf.empty_float32_uv.wPoint2(numVertices * 2, rs, rt);
                    numVertices++;
                }
            }
            var position = 0;
            for (i = 0; i < row; i++) {
                for (ii = 0; ii < column; ii++) {
                    r = (column + 1) * i + ii;
                    rf.empty_uint16_indexs.set([r, r + column + 1, r + 1, r + column + 1, r + column + 2, r + 1], position);
                    position += 6;
                }
            }
            var variables = this.variables;
            var c = rf.context3D;
            var arr = createGeometry(rf.empty_float32_object, variables, numVertices);
            this.vertex = c.createVertexBuffer(new VertexInfo(arr, this.data32PerVertex, variables));
            this.index = c.createIndexBuffer(rf.empty_uint16_indexs.slice(0, position));
            this.numVertices = numVertices;
            this.numTriangles = position / 3;
            return this;
        };
        return TorusGeomerty;
    }(GeometryBase));
    rf.TorusGeomerty = TorusGeomerty;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Material = (function () {
        function Material() {
            this.depthMask = false;
            this.sun = true;
        }
        Material.prototype.createProgram = function (mesh) {
            this.initFilters(mesh);
            var shader = rf.singleton(rf.Shader);
            var p = shader.createProgram(mesh);
            this.program = p;
            return p;
        };
        Material.prototype.initFilters = function (mesh) {
            var filters = mesh.filters;
            filters["basic_"] = rf.singleton(rf.BasicFilter);
            filters["normal_"] = rf.singleton(rf.NormalFilter);
            filters["mvp_"] = rf.singleton(rf.MvpFilter);
            filters["diff_"] = rf.singleton(rf.DiffFilter);
            if (mesh.skData) {
                filters["skeleton_"] = rf.singleton(rf.SkeletonFilter);
            }
            if (this.sun) {
                filters["sun_"] = rf.singleton(rf.SunFilter);
            }
            filters["discard_"] = rf.singleton(rf.DiscardFilter);
        };
        Material.prototype.setData = function (data) {
            if (!data) {
                this.cull = 0;
                this.depthMask = true;
                this.passCompareMode = 515;
                this.srcFactor = 770;
                this.dstFactor = 771;
                this.alphaTest = -1;
            }
            else {
                var cull = data.cull, depthMask = data.depthMask, passCompareMode = data.passCompareMode, srcFactor = data.srcFactor, dstFactor = data.dstFactor, alphaTest = data.alphaTest, diffTex = data.diffTex;
                this.cull = (undefined != cull) ? cull : 1029;
                this.depthMask = undefined != depthMask ? depthMask : true;
                this.passCompareMode = passCompareMode ? passCompareMode : 515;
                this.srcFactor = srcFactor ? srcFactor : 770;
                this.dstFactor = dstFactor ? dstFactor : 771;
                this.alphaTest = ~~alphaTest;
                if (diffTex) {
                    this.diffTex = diffTex;
                }
            }
        };
        Material.prototype.uploadContextSetting = function () {
            var setting = rf.context3D.setting;
            var _a = this, cull = _a.cull, srcFactor = _a.srcFactor, dstFactor = _a.dstFactor, depthMask = _a.depthMask, passCompareMode = _a.passCompareMode;
            setting.cull = cull;
            setting.depth = depthMask;
            setting.depthMode = passCompareMode;
            setting.src = srcFactor;
            setting.dst = dstFactor;
        };
        Material.prototype.uploadContext = function (camera, mesh, now, interval) {
            var _a = this, program = _a.program, diffTex = _a.diffTex;
            var filters = mesh.filters;
            var filter;
            if (mesh.shader) {
                mesh.shader = false;
                program = undefined;
            }
            if (!program) {
                var b = this.checkTexs(diffTex);
                if (false == b) {
                    return false;
                }
                for (var key in filters) {
                    filter = filters[key];
                    if (!filter.readly) {
                        return false;
                    }
                }
                this.program = program = this.createProgram(mesh);
            }
            var c = rf.context3D;
            c.setProgram(program);
            this.uploadContextSetting();
            for (var key in filters) {
                filter = filters[key];
                filter.setProgramConstants(c, program, mesh, camera);
            }
            if (diffTex) {
                var t = void 0;
                t = c.textureObj[diffTex.key];
                if (t) {
                    t.uploadContext(program, "diff");
                }
            }
            return true;
        };
        Material.prototype.checkTexs = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var c = rf.context3D;
            var b = true;
            args.forEach(function (data) {
                if (undefined != data) {
                    var tex = void 0;
                    if (data.key) {
                        tex = c.textureObj[data.key];
                    }
                    if (undefined == tex) {
                        tex = c.createTexture(data, undefined);
                        b = false;
                    }
                    var readly = tex.readly, status_2 = tex.status;
                    if (false == readly) {
                        if (2 != status_2) {
                            if (0 == status_2) {
                                tex.load(_this.getTextUrl(data));
                            }
                            b = false;
                        }
                    }
                }
            });
            return b;
        };
        Material.prototype.getTextUrl = function (data) {
            return data.url;
        };
        return Material;
    }());
    rf.Material = Material;
    var ShadowMaterial = (function (_super) {
        __extends(ShadowMaterial, _super);
        function ShadowMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShadowMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            var _a = this, program = _a.program, diffTex = _a.diffTex;
            if (!program) {
                this.program = program = this.createProgram(mesh);
            }
            var c = rf.context3D;
            c.setProgram(program);
            this.uploadContextSetting();
            return true;
        };
        ShadowMaterial.prototype.createProgram = function (mesh) {
            var c = rf.context3D;
            var key = "ShadowMaterial";
            var p = c.programs[key];
            if (undefined != p) {
                return p;
            }
            var skAnim = mesh.skAnim;
            var v_def = "";
            if (undefined != skAnim) {
                key += "-skeleton";
                v_def += "#define USE_SKINNING\n           #define MAX_BONES 100\n";
            }
            var vertexCode = "\n                precision mediump float;\n\n                " + v_def + "\n\n\n\n                attribute vec3 " + "pos" + ";\n                uniform mat4 " + "mvp" + ";\n\n                mat4 qua2mat(vec4 qua,vec4 pos){\n                    vec4 t1 = qua * qua;\n                    vec3 t2 = 2.0 * qua.xxx * qua.yzw;\n                    vec3 t3 = 2.0 * qua.yyz * qua.zww;\n                    return mat4(\n                        t1.x - t1.y - t1.z + t1.w , t2.x + t3.z , t2.y - t3.y , 0.0 ,\n                        t2.x - t3.z , -t1.x + t1.y - t1.z + t1.w , t3.x + t2.z , 0.0 ,\n                        t2.y + t3.y , t3.x - t2.z , -t1.x - t1.y + t1.z + t1.w , 0.0 ,\n                        pos.x,pos.y,pos.z,1.0\n                    );\n                }\n\n\n#ifdef USE_SKINNING\n                attribute vec4 " + "index" + ";\n                attribute vec4 " + "weight" + ";\n                uniform vec4 " + "bones" + "[ MAX_BONES ];\n                mat4 getBoneMatrix( const in float i ) {\n                    float d = i * 2.0;\n                    vec4 qua = " + "bones" + "[ int(d) ];\n                    vec4 pos = " + "bones" + "[ int(d + 1.0) ];\n                    return qua2mat(qua,pos);\n                }\n#endif\n                void main(void){\n                    vec4 t_pos = vec4(" + "pos" + ",1.0);\n\n                    #ifdef USE_SKINNING\n                        mat4 skinMatrix = mat4( 0.0 );\n                        skinMatrix += " + "weight" + ".x * getBoneMatrix( " + "index" + ".x );\n                        skinMatrix += " + "weight" + ".y * getBoneMatrix( " + "index" + ".y );\n                        skinMatrix += " + "weight" + ".z * getBoneMatrix( " + "index" + ".z );\n                        skinMatrix += " + "weight" + ".w * getBoneMatrix( " + "index" + ".w );\n                        t_pos = skinMatrix * t_pos;\n                    #endif\n\n                    gl_Position = " + "mvp" + " * t_pos;\n                }\n            ";
            var fragmentCode = "\n                precision mediump float;\n\n                const vec3 PackFactors2 = vec3( 256. * 256. * 256., 256. * 256., 256. );\n                const float PackUpscale = 256. / 255.;\n                const float ShiftRight8 = 1. / 256.;\n\n                vec4 packDepthToRGBA( float v ) {\n                    vec4 r = vec4( fract( v * PackFactors2 ), v );\n                    r.yzw -= r.xyz * ShiftRight8;\n                    return r * PackUpscale;\n                }\n\n\n                const float UnpackDownscale = 255. / 256.;\n                const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\n                const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n                float unpackRGBAToDepth( const in vec4 v ) {\n                    return dot( v, UnpackFactors );\n                }\n\n                varying vec4 vPos;\n                void main(void){\n                    // gl_FragColor = vec4(vec3(gl_FragCoord.z),1.0);\n                    gl_FragColor = packDepthToRGBA(gl_FragCoord.z);\n                }\n                \n            ";
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        return ShadowMaterial;
    }(Material));
    rf.ShadowMaterial = ShadowMaterial;
    var SkyBoxMaterial = (function (_super) {
        __extends(SkyBoxMaterial, _super);
        function SkyBoxMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkyBoxMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            var scene = mesh.scene;
            var c = rf.context3D;
            var diffTex = this.diffTex;
            var skAnim = mesh.skAnim;
            if (!diffTex) {
                return false;
            }
            var b = this.checkTexs(diffTex);
            if (false == b) {
                return false;
            }
            _super.prototype.uploadContext.call(this, camera, mesh, now, interval);
            var program = this.program;
            var t;
            t = c.textureObj[diffTex.key];
            t.uploadContext(program, "diff");
            return true;
        };
        SkyBoxMaterial.prototype.checkTexs = function (data) {
            var c = rf.context3D;
            var b = true;
            var tex;
            if (data.key) {
                tex = c.textureObj[data.key];
            }
            if (undefined == tex) {
                tex = c.createCubeTexture(data);
                b = false;
            }
            var readly = tex.readly, status = tex.status;
            if (false == readly) {
                if (2 != status) {
                    if (0 == status) {
                        tex.load(this.getTextUrl(data));
                    }
                    b = false;
                }
            }
            return b;
        };
        SkyBoxMaterial.prototype.createProgram = function (mesh) {
            var c = rf.context3D;
            var f_def = "";
            var v_def = "";
            var key = "SkyBoxMaterial";
            key += "-diff";
            f_def += "#define DIFF\n";
            var p = c.programs[key];
            if (undefined != p) {
                return p;
            }
            var vertexCode = "\n                precision mediump float;\n                " + v_def + "\n                attribute vec3 " + "pos" + ";\n                attribute vec2 " + "uv" + ";\n                \n                uniform mat4 " + "mvp" + ";\n\n                varying vec3 v_texCoord;\n\n                void main() {\n                    vec4 t_pos = vec4(" + "pos" + ", 1.0);\n                    \n                    v_texCoord = " + "pos" + ";\n\n                    t_pos = " + "mvp" + " * t_pos;\n                    \n                    gl_Position = t_pos.xyww;\n                }\n            ";
            var fragmentCode = "\n            precision mediump float;    \n\n            " + f_def + "\n\n            uniform samplerCube " + "diff" + ";\n            \n            uniform vec4 " + "vc_diff" + ";\n            uniform vec4 " + "vc_emissive" + ";\n            \n            varying vec3 v_texCoord;\n\n            void main(void){\n\n                vec4 c = textureCube(" + "diff" + ", v_texCoord);\n                \n                gl_FragColor = c;\n            }\n            ";
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        return SkyBoxMaterial;
    }(Material));
    rf.SkyBoxMaterial = SkyBoxMaterial;
    var PhongMaterial = (function (_super) {
        __extends(PhongMaterial, _super);
        function PhongMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PhongMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            var diffTex = this.diffTex;
            if (!diffTex) {
                return false;
            }
            var b = this.checkTexs(diffTex);
            if (false == b) {
                return false;
            }
            var c = rf.context3D;
            var skAnim = mesh.skAnim, scene = mesh.scene, shader = mesh.shader;
            _super.prototype.uploadContext.call(this, camera, mesh, now, interval);
            var program = this.program;
            var sun = scene.sun;
            c.setProgramConstantsFromVector("lightDirection", sun.normalsize, 4);
            if (mesh.shadowTarget) {
                rf.ROOT.shadow.rtt.uploadContext(program, "shadow");
            }
            if (rf.context3D.logarithmicDepthBuffer) {
                c.setProgramConstantsFromVector("logDepthFar", camera.logDepthFar, 1, false);
            }
            return true;
        };
        PhongMaterial.prototype.createProgram = function (mesh) {
            var diffTex = this.diffTex;
            var skAnim = mesh.skAnim, shadowTarget = mesh.shadowTarget, filters = mesh.filters;
            var c = rf.context3D;
            var f_def = "";
            var v_def = "";
            var key = "PhongMaterial";
            if (undefined != diffTex) {
                key += "-diff";
                f_def += "#define DIFF\n";
            }
            if (shadowTarget) {
                key += "-shadow";
                f_def += "#define SHADOW\n";
                v_def += "#define SHADOW\n";
            }
            if (undefined != skAnim) {
                key += "-skeleton";
                v_def += "#define USE_SKINNING\n           #define MAX_BONES 100\n";
            }
            var filter = filters["liuguang_"];
            if (filter) {
                if (filter.readly) {
                    key += filter.skey;
                    f_def += "#define LIU_GUANG\n";
                    v_def += "#define LIU_GUANG\n";
                }
            }
            filter = filters[5];
            if (filter) {
                key += filter.skey;
                v_def += "#define UV_ANIM\n";
            }
            filter = filters[31];
            if (filter) {
                key += filter.skey;
                f_def += "#define COLOR_TRANFORM\n";
            }
            if (rf.context3D.logarithmicDepthBuffer) {
                key += "-log_depth_buffer";
                v_def += "#define LOG_DEPTH_BUFFER\n";
                f_def += "#define LOG_DEPTH_BUFFER\n";
                if (rf.context3D.use_logdepth_ext) {
                    key += "_ext";
                    v_def += "#define LOG_DEPTH_BUFFER_EXT\n";
                    f_def += "#define LOG_DEPTH_BUFFER_EXT\n";
                }
            }
            var p = c.programs[key];
            if (undefined != p) {
                return p;
            }
            var vertexCode = "\n        // precision mediump float;\n        " + v_def + "\n        attribute vec3 " + "pos" + ";\n        attribute vec3 " + "normal" + ";\n        attribute vec2 " + "uv" + ";\n        #ifdef USE_SKINNING\n            attribute vec4 " + "index" + ";\n            attribute vec4 " + "weight" + ";\n        #endif\n        uniform mat4 " + "mvp" + ";\n        uniform mat4 " + "invm" + ";\n        uniform vec4 " + "lightDirection" + ";\n        uniform mat4 " + "sunmvp" + ";\n\n        varying vec4 vDiffuse;\n        varying vec2 vUV;\n        varying vec4 vShadowUV;\n        #ifdef LOG_DEPTH_BUFFER\n            #ifdef LOG_DEPTH_BUFFER_EXT\n                varying float depth;\n            #else\n                uniform float logDepthFar;\n            #endif\n        #endif\n\n        mat4 qua2mat(vec4 qua,vec4 pos){\n            vec4 t1 = qua * qua;\n            vec3 t2 = 2.0 * qua.xxx * qua.yzw;\n            vec3 t3 = 2.0 * qua.yyz * qua.zww;\n            return mat4(\n                t1.x - t1.y - t1.z + t1.w , t2.x + t3.z , t2.y - t3.y , 0.0 ,\n                t2.x - t3.z , -t1.x + t1.y - t1.z + t1.w , t3.x + t2.z , 0.0 ,\n                t2.y + t3.y , t3.x - t2.z , -t1.x - t1.y + t1.z + t1.w , 0.0 ,\n                pos.x,pos.y,pos.z,1.0\n            );\n        }\n\n        vec4 liuguangFunc(in vec4 liuguang,in vec2 uv){\n            vec4 tuv = vec4(uv,liuguang.zw);\n            tuv.xy *= liuguang.yy;\n            tuv.xy += liuguang.xx;\n            return tuv;\n        }\n                \n#ifdef USE_SKINNING\n        uniform vec4 " + "bones" + "[ MAX_BONES ];\n        mat4 getBoneMatrix( const in float i ) {\n            float d = i * 2.0;\n            vec4 qua = " + "bones" + "[ int(d) ];\n            vec4 pos = " + "bones" + "[ int(d + 1.0) ];\n            return qua2mat(qua,pos);\n        }\n#endif\n                \n        \n\n#ifdef LIU_GUANG\n        uniform vec4 liuguang;\n        varying vec4 vLiuguang;\n#endif\n\n\n#ifdef UV_ANIM\n        uniform vec4 uvAnim;\n#endif\n\n        varying vec4 vDebug;\n\n        void main() {\n            vec4 t_pos = vec4(" + "pos" + ", 1.0);\n            vec3 t_normal = " + "normal" + ";\n\n            #ifdef USE_SKINNING\n                mat4 skinMatrix = mat4( 0.0 );\n                skinMatrix += " + "weight" + ".x * getBoneMatrix( " + "index" + ".x );\n                skinMatrix += " + "weight" + ".y * getBoneMatrix( " + "index" + ".y );\n                skinMatrix += " + "weight" + ".z * getBoneMatrix( " + "index" + ".z );\n                skinMatrix += " + "weight" + ".w * getBoneMatrix( " + "index" + ".w );\n                t_normal = vec4( skinMatrix * vec4( t_normal, 0.0 ) ).xyz;\n                t_pos = skinMatrix * t_pos;\n            #endif\n\n            t_normal = normalize(vec4(t_normal,0.0) * " + "invm" + ").xyz;\n            vec3 invLight = normalize(" + "lightDirection" + ".xyz);\n            float diffuse  = clamp(dot(t_normal , invLight), 0.1, 1.0);\n            vDiffuse = vec4(vec3(diffuse), 1.0);\n            \n            // vDebug = vec4(diffuse,diffuse,diffuse,1.0);\n            // vDebug = vec4(t_normal,1.0);\n\n#ifdef UV_ANIM\n    vUV = ((" + "uv" + ".xy - vec2(0.5)) * uvAnim.zw) + uvAnim.xy + vec2(0.5);\n#else\n    vUV = " + "uv" + ";\n#endif\n\n#ifdef LIU_GUANG\n            vLiuguang = liuguangFunc(liuguang,vUV);            \n#endif\n            \n            gl_Position = " + "mvp" + " * t_pos;\n            #ifdef LOG_DEPTH_BUFFER\n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    depth = gl_Position.w + 1.0;\n                #else\n                    gl_Position.z = log2( max( 0.0000001, gl_Position.w + 1.0 ) ) * logDepthFar * 2.0 - 1.0;\n                    gl_Position.z *= gl_Position.w;\n                #endif\n            #endif\n            \n#ifdef SHADOW\n            t_pos = " + "sunmvp" + " * t_pos;\n            // t_pos.xyz /= t_pos.w;\n            // t_pos.xy = t_pos.xy * 0.5 + 0.5;\n            vShadowUV = t_pos;\n#endif\n        }\n    ";
            var fragmentCode = "\n                " + f_def + "\n                precision mediump float;    \n                \n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    #extension GL_EXT_frag_depth : enable\n                #endif\n                \n                uniform sampler2D " + "diff" + ";\n                uniform sampler2D " + "shadow" + ";\n\n                uniform vec4 " + "vc_diff" + ";\n                uniform vec4 " + "vc_emissive" + ";\n\n                varying vec4 vDiffuse;\n                varying vec2 vUV;\n                varying vec4 vShadowUV;\n                \n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    varying float depth;\n                    uniform float logDepthFar;\n                #endif\n\n\n                #ifdef LIU_GUANG\n                    uniform sampler2D liuguangTex;\n                    varying vec4 vLiuguang;\n                #endif\n\n                #ifdef COLOR_TRANFORM\n                        uniform vec4 color_mul;\n                        uniform vec4 color_add;\n                #endif\n\n\n                const vec3 PackFactors2 = vec3( 256. * 256. * 256., 256. * 256., 256. );\n                const float PackUpscale = 256. / 255.;\n                const float ShiftRight8 = 1. / 256.;\n\n                vec4 packDepthToRGBA( float v ) {\n                    vec4 r = vec4( fract( v * PackFactors2 ), v );\n                    r.yzw -= r.xyz * ShiftRight8;\n                    return r * PackUpscale;\n                }\n\n\n                const float UnpackDownscale = 255. / 256.;\n                const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\n                const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n                float unpackRGBAToDepth( const in vec4 v ) {\n                    return dot( v, UnpackFactors );\n                }\n\n                float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n                    return step( unpackRGBAToDepth( texture2D( depths, uv ) ) , compare );\n                }\n\n                float sat(float v)\n                {\n                    return clamp(v,0.0,1.0);\n                }\n\n\n                varying vec4 vDebug;\n                \n                void main(void){\n\n                    vec2 tUV = vUV;\n                    vec4 diffuse = vDiffuse;\n\n                    #ifdef DIFF\n                        vec4 color = texture2D(" + "diff" + ", tUV);\n                    #else\n                        #ifdef VC_DIFF\n                            vec4 color = " + "vc_diff" + ";\n                        #else\n                            vec4 color = vec4(1.0,1.0,1.0,1.0) ;\n                        #endif\n                    #endif\n\n\n#ifdef COLOR_TRANFORM\n                    color  = color * color_mul + color_add;\n#endif\n\n                    if(color.w <= 0.05){\n                        discard;\n                    }\n\n\n                    \n\n                    \n                    #ifdef SHADOW\n                        // diffuse.xyz = vec3(1.0);\n                        vec4 sc = vShadowUV;\n                        sc.xyz /= sc.w;\n                        sc.xyz = sc.xyz * 0.5 + 0.5;\n                        float shadow = texture2DCompare(" + "shadow" + ", sc.xy,sc.z+0.001);\n                        // vec4 scolor = texture2D( " + "shadow" + ", sc.xy );\n                        // float shadow = unpackRGBAToDepth( scolor );\n                        // shadow = step(shadow,sc.z); \n                        diffuse.xyz *= (1.0 - shadow * 0.3);\n                        // color = scolor;\n                    #endif\n\n                    \n                    \n                    #ifdef LOG_DEPTH_BUFFER_EXT\n\t                    gl_FragDepthEXT = log2( depth ) * logDepthFar;\n                    #endif\n\n\n                    #ifdef LIU_GUANG\n                        vec4 lc = texture2D(liuguangTex, vLiuguang.xy);\n                        color.xyz += lc.xyz * sat(color.w - vLiuguang.z) * vLiuguang.www;\n                    #endif\n\n                    color.xyz *= (diffuse.xyz * 0.6 + 1.0);\n                    // color.xyz *= 1.65;\n                    // color.xyz += diffuse.xyz;\n\n\n                    gl_FragColor = color;\n\n                    // gl_FragColor = vDebug;\n\n                    \n\n                    // gl_FragColor = vec4(gl_FragCoord.zzz,1.0);\n\n                    // float deep = unpackRGBAToDepth(vec4(1.0));\n                    // gl_FragColor = vec4(vec3(deep),1.0);\n\n                    // gl_FragColor = packDepthToRGBA(gl_FragCoord.z);\n                    \n                    // gl_FragColor = vec4(1.0,1.0,1.0,1.0);\n                    // gl_FragColor = vec4(vUV,0.0,1.0);\n                }\n            ";
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        return PhongMaterial;
    }(Material));
    rf.PhongMaterial = PhongMaterial;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.IShaderSettingPros = [
        "useEye", "usePos", "useQua2mat", "useNormal", "useColor",
        "useShadow", "useInvm"
    ];
    function newShaderCode(code, def, func) {
        return { def: def, func: func, code: code };
    }
    rf.newShaderCode = newShaderCode;
    var Shader = (function () {
        function Shader() {
            this.vertex_render_list = [
                "basic_",
                "normal_",
                "color_",
                "single_",
                "ui_",
                "skeleton_",
                "sun_",
                "fresnel_",
                "fresnelAlpha_",
                "diff_",
                5,
                30,
                "uidiff_",
                "liuguang_",
                "shadow_",
                "mvp_",
            ];
            this.frament_render_list = [
                "diff_",
                "fill_",
                "color_",
                30,
                "discard_",
                31,
                "sun_",
                "fresnel_",
                "fresnelAlpha_",
                "gray_",
                "hole_",
                "circle_",
                "shadow_",
            ];
        }
        Shader.prototype.init = function (vertex_render_list, frament_render_list) {
            this.vertex_render_list = vertex_render_list;
            this.frament_render_list = frament_render_list;
        };
        Shader.prototype.createProgram = function (target) {
            var filters = target.filters;
            var key = "";
            for (var filterKey in filters) {
                var filter = filters[filterKey];
                if (filter && filter.readly) {
                    key += filter.skey;
                }
            }
            var p = rf.context3D.programs[key];
            if (!p) {
                var setting = {};
                for (var filterKey in filters) {
                    var filter = filters[filterKey];
                    if (filter && filter.readly) {
                        filter.updateSetting(setting);
                    }
                }
                var v = this.createVertex2(filters, setting);
                var f = this.createFragment2(filters, setting);
                p = rf.context3D.createProgram(v, f, key);
                p.setting = setting;
            }
            target.shader = false;
            return p;
        };
        Shader.prototype.createVertex2 = function (filters, setting) {
            var filter;
            var def = "";
            var code = "";
            var func = "";
            if (!setting) {
                setting = {};
            }
            function append(filter) {
                if (filter && filter.readly) {
                    var vertex = filter.vertex;
                    if (vertex) {
                        if (vertex.def) {
                            def += vertex.def;
                        }
                        if (vertex.func) {
                            func += vertex.func;
                        }
                        if (vertex.code) {
                            code += vertex.code;
                        }
                    }
                }
            }
            func += Shader.FUNC_SAT;
            func += Shader.FUNC_DOT_VALUE;
            if (setting.useQua2mat) {
                func += Shader.FUNC_QUA2MAT;
            }
            var list = this.vertex_render_list;
            for (var i = 0; i < list.length; i++) {
                append(filters[list[i]]);
            }
            if (setting.useInvm) {
                def += "uniform mat4 invm;\n";
            }
            if (setting.usePos) {
                def += "varying vec3 vpos;\n";
                code += "vpos.xyz = p.xyz;\n";
            }
            if (setting.useColor) {
                code += "vColor = c;";
            }
            return "\n" + def + "\n" + func + "\nvoid main(void){\n    " + code + "\n    gl_Position = p;\n}\n";
        };
        Shader.prototype.createFragment2 = function (filters, setting) {
            function append(filter) {
                if (filter && filter.readly) {
                    var fragment = filter.fragment;
                    if (fragment) {
                        if (fragment.def) {
                            def += fragment.def;
                        }
                        if (fragment.func) {
                            func += fragment.func;
                        }
                        if (fragment.code) {
                            code += fragment.code;
                        }
                    }
                }
            }
            var def = "";
            var func = "";
            var code = "";
            var list = this.frament_render_list;
            for (var i = 0; i < list.length; i++) {
                append(filters[list[i]]);
            }
            if (setting.usePos) {
                def += "varying vec3 vpos;\n";
            }
            func += Shader.FUNC_SAT;
            return "\nprecision mediump float;\n// precision lowp float;\n" + def + "\n" + func + "\nvoid main(void){\n    " + code + "\n    gl_FragColor = color;   \n}\n";
        };
        Shader.FUNC_QUA2MAT = "\nmat4 qua2mat(vec4 qua,vec4 pos){\n    vec4 t1 = qua * qua;\n    vec3 t2 = 2.0 * qua.xxx * qua.yzw;\n    vec3 t3 = 2.0 * qua.yyz * qua.zww;\n    return mat4(\n        t1.x - t1.y - t1.z + t1.w , t2.x + t3.z , t2.y - t3.y , 0.0 ,\n        t2.x - t3.z , -t1.x + t1.y - t1.z + t1.w , t3.x + t2.z , 0.0 ,\n        t2.y + t3.y , t3.x - t2.z , -t1.x - t1.y + t1.z + t1.w , 0.0 ,\n        pos.x,pos.y,pos.z,1.0\n    );\n}\n";
        Shader.FUNC_SHADOW_ENCODE = "\nconst vec3 PackFactors2 = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst float PackUpscale = 256. / 255.;\nconst float ShiftRight8 = 1. / 256.;\n\nvec4 packDepthToRGBA( float v ) {\n    vec4 r = vec4( fract( v * PackFactors2 ), v );\n    r.yzw -= r.xyz * ShiftRight8;\n    return r * PackUpscale;\n}\n";
        Shader.FUNC_SHADOW_DECODE = "\nconst float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nfloat unpackRGBAToDepth( const in vec4 v ) {\n    return dot( v, UnpackFactors );\n}\n\nfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n    return step( unpackRGBAToDepth( texture2D( depths, uv ) ) , compare );\n}\n";
        Shader.FUNC_SAT = "\nfloat sat(float v)\n{\n    return clamp(v,0.0,1.0);\n}\n\nvec2 sat(vec2 v)\n{\n    return clamp(v,0.0,1.0);\n}\n";
        Shader.FUNC_DOT_VALUE = "\nfloat dotValue(vec3 n,vec4 dir,mat4 invm){\n    return dot(normalize(vec4(n, 0.0) * invm).xyz,dir.xyz);\n}\n";
        return Shader;
    }());
    rf.Shader = Shader;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var HitArea = (function () {
        function HitArea() {
            this.left = 0;
            this.right = 0;
            this.top = 0;
            this.bottom = 0;
            this.front = 0;
            this.back = 0;
        }
        HitArea.prototype.clean = function () {
            this.left = this.right = this.top = this.bottom = this.front = this.back = 0;
        };
        HitArea.prototype.combine = function (hitArea, x, y) {
            var b = false;
            if (hitArea == undefined) {
                return b;
            }
            if (this.left > hitArea.left + x) {
                this.left = hitArea.left + x;
                b = true;
            }
            if (this.right < hitArea.right + x) {
                this.right = hitArea.right + x;
                b = true;
            }
            if (this.top > hitArea.top + y) {
                this.top = hitArea.top + y;
                b = true;
            }
            if (this.bottom < hitArea.bottom + y) {
                this.bottom = hitArea.bottom + y;
                b = true;
            }
            if (this.front > hitArea.front) {
                this.front = hitArea.front;
                b = true;
            }
            if (this.back < hitArea.back) {
                this.back = hitArea.back;
                b = true;
            }
            return b;
        };
        HitArea.prototype.updateArea = function (x, y, z) {
            var b = false;
            if (this.left > x) {
                this.left = x;
                b = true;
            }
            else if (this.right < x) {
                this.right = x;
                b = true;
            }
            if (this.top > y) {
                this.top = y;
                b = true;
            }
            else if (this.bottom < y) {
                this.bottom = y;
                b = true;
            }
            if (this.front > z) {
                this.front = z;
                b = true;
            }
            else if (this.back < z) {
                this.back = z;
                b = true;
            }
            return b;
        };
        HitArea.prototype.checkIn = function (x, y, scale) {
            if (scale === void 0) { scale = 1; }
            if (this.allWays) {
                return true;
            }
            if (x > this.left * scale && x < this.right * scale && y > this.top * scale && y < this.bottom * scale) {
                return true;
            }
            return false;
        };
        HitArea.prototype.scale = function (value) {
            this.left *= value;
            this.right *= value;
            this.top *= value;
            this.bottom *= value;
        };
        HitArea.prototype.toString = function () {
            return "HitArea left:" + this.left + " right:" + this.right + " top:" + this.top + " bottom:" + this.bottom + " front:" + this.front + " back:" + this.back;
        };
        return HitArea;
    }());
    rf.HitArea = HitArea;
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        function DisplayObject() {
            var _this = _super.call(this) || this;
            _this.mouseEnabled = true;
            _this.mouseChildren = true;
            _this.mousedown = false;
            _this.mouseroll = false;
            _this.up = rf.newVector3D(0, 1, 0);
            _this._x = 0;
            _this._y = 0;
            _this._z = 0;
            _this.w = 0;
            _this.h = 0;
            _this._rotationX = 0;
            _this._rotationY = 0;
            _this._rotationZ = 0;
            _this._scaleX = 1;
            _this._scaleY = 1;
            _this._scaleZ = 1;
            _this._alpha = 1;
            _this.sceneAlpha = 1;
            _this._visible = true;
            _this.status = 0;
            _this.pivotZero = false;
            _this.locksize = false;
            _this.filters = {};
            _this.pos = rf.newVector3D();
            _this.rot = rf.newVector3D();
            _this.sca = rf.newVector3D(1, 1, 1);
            _this.transform = rf.newMatrix3D();
            _this.sceneTransform = rf.newMatrix3D();
            _this.trandom = Math.random();
            return _this;
        }
        DisplayObject.prototype.setChange = function (value, p, c) {
            if (p === void 0) { p = 0; }
            if (c === void 0) { c = false; }
            this.status |= (value & ~12);
            if (undefined != this.parent) {
                if (value & 3) {
                    value |= 16;
                }
                if (value & 32) {
                    value |= 64;
                }
                this.parent.setChange(value & 12, value & 80, true);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "visible", {
            get: function () { return this._visible; },
            set: function (value) {
                if (this._visible != value) {
                    this._visible = value;
                    this.setChange(4);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                if (this._alpha == value) {
                    return;
                }
                var vertex = 0;
                if (this._alpha <= 0 || value == 0) {
                    vertex |= 4;
                }
                this._alpha = value;
                this.setChange(vertex | 2 | 8);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleX", {
            get: function () { return this._scaleX; },
            set: function (value) {
                if (this._scaleX == value)
                    return;
                this._scaleX = value;
                this.sca.x = value;
                this.setChange(1 | 8);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleY", {
            get: function () { return this._scaleY; },
            set: function (value) { this._scaleY = value; this.sca.y = value; this.setChange(1); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "scaleZ", {
            get: function () { return this._scaleZ; },
            set: function (value) { this._scaleZ = value; this.sca.z = value; this.setChange(1); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotationX", {
            get: function () { return this._rotationX * rf.RADIANS_TO_DEGREES; },
            set: function (value) {
                value %= 360;
                value *= rf.DEGREES_TO_RADIANS;
                if (value == this._rotationX)
                    return;
                this._rotationX = value;
                this.rot.x = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotationY", {
            get: function () { return this._rotationY * rf.RADIANS_TO_DEGREES; },
            set: function (value) {
                value %= 360;
                value *= rf.DEGREES_TO_RADIANS;
                if (value == this._rotationY)
                    return;
                this._rotationY = value;
                this.rot.y = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotationZ", {
            get: function () { return this._rotationZ * rf.RADIANS_TO_DEGREES; },
            set: function (value) {
                value %= 360;
                value *= rf.DEGREES_TO_RADIANS;
                if (value == this._rotationZ)
                    return;
                this._rotationZ = value;
                this.rot.z = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "rotation", {
            get: function () {
                return this._rotationZ * rf.RADIANS_TO_DEGREES;
            },
            set: function (value) {
                value %= 360;
                value *= rf.DEGREES_TO_RADIANS;
                if (value == this._rotationZ)
                    return;
                this._rotationZ = value;
                this.rot.z = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "x", {
            get: function () { return this._x; },
            set: function (value) {
                if (value == this._x)
                    return;
                this._x = value;
                this.pos.x = value;
                this.setChange(1 | 8);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "y", {
            get: function () { return this._y; },
            set: function (value) {
                if (value == this._y)
                    return;
                this._y = value;
                this.pos.y = value;
                this.setChange(1 | 8);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "z", {
            get: function () { return this._z; },
            set: function (value) {
                if (value == this._z)
                    return;
                this._z = value;
                this.pos.z = value;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.setPos = function (x, y, z, update) {
            if (z === void 0) { z = 0; }
            if (update === void 0) { update = true; }
            if (this._x == x && this._y == y && this._z == z)
                return;
            this.pos.x = this._x = x;
            this.pos.y = this._y = y;
            this.pos.z = this._z = z;
            if (update) {
                this.setChange(1 | 8);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "eulers", {
            set: function (value) {
                this._rotationX = value.x * rf.DEGREES_TO_RADIANS;
                this._rotationY = value.y * rf.DEGREES_TO_RADIANS;
                this._rotationZ = value.z * rf.DEGREES_TO_RADIANS;
                this.setChange(1);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.forwardPos = function (distance, target) {
            var pos = this.pos;
            this.transform.m3_copyColumnTo(2, rf.tempAxeX);
            rf.tempAxeX.v3_normalize();
            if (undefined != target) {
                pos.x = -rf.tempAxeX.x * distance + target.x;
                pos.y = -rf.tempAxeX.y * distance + target.y;
                pos.z = -rf.tempAxeX.z * distance + target.z;
            }
            else {
                pos.x += rf.tempAxeX.x * distance;
                pos.y += rf.tempAxeX.y * distance;
                pos.z += rf.tempAxeX.z * distance;
            }
            this._x = pos.x;
            this._y = pos.y;
            this._z = pos.z;
            this.setChange(1 | 8);
        };
        DisplayObject.prototype.upPos = function (distance) {
            this.transform.m3_copyColumnTo(1, rf.tempAxeX);
            rf.tempAxeX.v3_normalize();
            this.pos.x += rf.tempAxeX.x * distance;
            this.pos.y += rf.tempAxeX.y * distance;
            this.pos.z += rf.tempAxeX.z * distance;
            this._x = this.pos.x;
            this._y = this.pos.y;
            this._z = this.pos.z;
            this.setChange(1 | 8);
        };
        DisplayObject.prototype.rightPos = function (distance) {
            this.transform.m3_copyColumnTo(0, rf.tempAxeX);
            rf.tempAxeX.v3_normalize();
            this.pos.x += rf.tempAxeX.x * distance;
            this.pos.y += rf.tempAxeX.y * distance;
            this.pos.z += rf.tempAxeX.z * distance;
            this._x = this.pos.x;
            this._y = this.pos.y;
            this._z = this.pos.z;
            this.setChange(1 | 8);
        };
        DisplayObject.prototype.setRot = function (rx, ry, rz, update) {
            if (update === void 0) { update = true; }
            this.rot.x = this._rotationX = rx * rf.DEGREES_TO_RADIANS;
            this.rot.y = this._rotationY = ry * rf.DEGREES_TO_RADIANS;
            this.rot.z = this._rotationZ = rz * rf.DEGREES_TO_RADIANS;
            if (update) {
                this.setChange(1);
            }
        };
        DisplayObject.prototype.setRotRadians = function (rx, ry, rz, update) {
            if (update === void 0) { update = true; }
            this.rot.x = this._rotationX = rx;
            this.rot.y = this._rotationY = ry;
            this.rot.z = this._rotationZ = rz;
            if (update) {
                this.setChange(1);
            }
        };
        Object.defineProperty(DisplayObject.prototype, "scale", {
            get: function () {
                var _a = this, _scaleX = _a._scaleX, _scaleY = _a._scaleY, _scaleZ = _a._scaleZ;
                if (_scaleX == _scaleY && _scaleX == _scaleZ) {
                    return _scaleX;
                }
                return Math.min(_scaleX, _scaleY, _scaleZ);
            },
            set: function (value) {
                this.setSca(value, value, value);
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.setSca = function (sx, sy, sz, update) {
            if (update === void 0) { update = true; }
            this.sca.x = this._scaleX = sx;
            this.sca.y = this._scaleY = sy;
            this.sca.z = this._scaleZ = sz;
            if (update) {
                this.setChange(1 | 8);
            }
        };
        DisplayObject.prototype.setPivotPonumber = function (x, y, z) {
            if (undefined == this.pivotPonumber) {
                this.pivotPonumber = rf.newVector3D();
            }
            ;
            this.pivotPonumber.x = x;
            this.pivotPonumber.y = y;
            this.pivotPonumber.z = z;
            this.pivotZero = (x != 0 || y != 0 || z != 0);
        };
        DisplayObject.prototype.setTransform = function (matrix) {
            var _a = this, transform = _a.transform, pos = _a.pos, rot = _a.rot, sca = _a.sca;
            transform.set(matrix);
            transform.m3_decompose(pos, rot, sca, 0);
            this._x = pos.x;
            this._y = pos.y;
            this._z = pos.z;
            this._rotationX = rot.x;
            this._rotationY = rot.y;
            this._rotationZ = rot.z;
            this._scaleX = sca.x;
            this._scaleY = sca.y;
            this._scaleZ = sca.z;
            this.setChange(1 | 8);
        };
        DisplayObject.prototype.updateTransform = function () {
            var _a = this, transform = _a.transform, pivotZero = _a.pivotZero;
            if (pivotZero) {
                var pivotPonumber = this.pivotPonumber;
                var x = pivotPonumber[0], y = pivotPonumber[1], z = pivotPonumber[2];
                transform.m3_identity();
                transform.m3_translation(-x, -y, -z);
                transform.m3_scale(this._scaleX, this._scaleY, this._scaleZ);
                transform.m3_translation(this._x + x, this._y + y, this._z + z);
            }
            else {
                transform.m3_recompose(this.pos, this.rot, this.sca);
            }
            this.status &= ~1;
        };
        DisplayObject.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (updateStatus === void 0) { updateStatus = 0; }
            var _a = this, status = _a.status, parent = _a.parent;
            if (status & 1) {
                this.updateTransform();
                updateStatus |= 1;
            }
            if (status & 2) {
                updateStatus |= 2;
                this.status &= ~2;
            }
            if (updateStatus & 1) {
                if (parentSceneTransform) {
                    this.sceneTransform.m3_append(parentSceneTransform, false, this.transform);
                }
                else {
                    if (parent) {
                        this.sceneTransform.m3_append(parent.sceneTransform, false, this.transform);
                    }
                    else {
                        this.sceneTransform.set(this.transform);
                    }
                }
            }
            if (updateStatus & 2) {
                if (parent) {
                    this.sceneAlpha = parent.sceneAlpha * this._alpha;
                }
                else {
                    this.sceneAlpha = this._alpha;
                }
            }
            return updateStatus;
        };
        DisplayObject.prototype.remove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        DisplayObject.prototype.addToStage = function () { };
        ;
        DisplayObject.prototype.removeFromStage = function () { };
        ;
        DisplayObject.prototype.setSize = function (width, height) {
            this.locksize = true;
            this.w = width;
            this.h = height;
            rf.callLater.add(this.doResize, this);
        };
        DisplayObject.prototype.doResize = function () { };
        DisplayObject.prototype.dispatchEvent = function (event) {
            var bool = false;
            var parent = this.parent;
            if (undefined != this.mEventListeners && event.type in this.mEventListeners) {
                bool = _super.prototype.dispatchEvent.call(this, event);
            }
            if (parent && (false == event.stopImmediatePropagation && event.bubbles)) {
                parent.dispatchEvent(event);
            }
            return bool;
        };
        DisplayObject.prototype.updateHitArea = function () {
            this.status &= ~96;
        };
        DisplayObject.prototype.getObjectByPoint = function (dx, dy, scale) {
            var area = this.hitArea;
            if (undefined == area) {
                return undefined;
            }
            if (area.checkIn(dx, dy, this._scaleX * scale) == true) {
                return this;
            }
            return undefined;
        };
        Object.defineProperty(DisplayObject.prototype, "mouseX", {
            get: function () {
                return rf.nativeMouseX - this.sceneTransform[12];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "mouseY", {
            get: function () {
                return rf.nativeMouseY - this.sceneTransform[13];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "stageX", {
            get: function () {
                return this.sceneTransform[12];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "stageY", {
            get: function () {
                return this.sceneTransform[13];
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.render = function (camera, option) {
        };
        DisplayObject.prototype.lookat = function (target, upAxis) {
            if (upAxis === void 0) { upAxis = null; }
            var xAxis = rf.tempAxeX;
            var yAxis = rf.tempAxeY;
            var zAxis = rf.tempAxeZ;
            var _a = this, transform = _a.transform, _scaleX = _a._scaleX, _scaleY = _a._scaleY, _scaleZ = _a._scaleZ, _x = _a._x, _y = _a._y, _z = _a._z, rot = _a.rot;
            if (undefined == upAxis) {
                upAxis = rf.Y_AXIS;
            }
            zAxis.x = target.x - _x;
            zAxis.y = target.y - _y;
            zAxis.z = target.z - _z;
            zAxis.v3_normalize();
            xAxis.x = upAxis.y * zAxis.z - upAxis.z * zAxis.y;
            xAxis.y = upAxis.z * zAxis.x - upAxis.x * zAxis.z;
            xAxis.z = upAxis.x * zAxis.y - upAxis.y * zAxis.x;
            xAxis.v3_normalize();
            if (xAxis.v3_length < .05) {
                xAxis.x = upAxis.y;
                xAxis.y = upAxis.x;
                xAxis.z = 0;
                xAxis.v3_normalize();
            }
            yAxis.x = zAxis.y * xAxis.z - zAxis.z * xAxis.y;
            yAxis.y = zAxis.z * xAxis.x - zAxis.x * xAxis.z;
            yAxis.z = zAxis.x * xAxis.y - zAxis.y * xAxis.x;
            var raw = transform;
            raw[0] = _scaleX * xAxis.x;
            raw[1] = _scaleX * xAxis.y;
            raw[2] = _scaleX * xAxis.z;
            raw[3] = 0;
            raw[4] = _scaleY * yAxis.x;
            raw[5] = _scaleY * yAxis.y;
            raw[6] = _scaleY * yAxis.z;
            raw[7] = 0;
            raw[8] = _scaleZ * zAxis.x;
            raw[9] = _scaleZ * zAxis.y;
            raw[10] = _scaleZ * zAxis.z;
            raw[11] = 0;
            raw[12] = _x;
            raw[13] = _y;
            raw[14] = _z;
            raw[15] = 1;
            transform.m3_decompose(undefined, rot, undefined);
            this._rotationX = rot.x;
            this._rotationY = rot.y;
            this._rotationZ = rot.z;
            if (zAxis.z < 0) {
                this._rotationY = rot.y = (Math.PI - rot.y);
                this._rotationX = rot.x = rot.x - Math.PI;
                this._rotationZ = rot.z = rot.z - Math.PI;
            }
            this.setChange(1);
        };
        DisplayObject.prototype.onSpawn = function () {
            this.scale = 1.0;
            this.alpha = 1.0;
            this.setRot(0, 0, 0);
        };
        Object.defineProperty(DisplayObject.prototype, "shaderKey", {
            get: function () {
                var filters = this.filters;
                var key = "";
                for (var filterKey in filters) {
                    var filter = filters[filterKey];
                    if (filter && filter.readly) {
                        key += filter.skey;
                    }
                }
                return key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "factorKey", {
            get: function () {
                var key = "";
                if (this.srcFactor) {
                    key += this.srcFactor + "_" + this.dstFactor;
                }
                return key;
            },
            enumerable: true,
            configurable: true
        });
        return DisplayObject;
    }(rf.MiniDispatcher));
    rf.DisplayObject = DisplayObject;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            var _this = _super.call(this) || this;
            _this.childrens = [];
            return _this;
        }
        DisplayObjectContainer.prototype.setChange = function (value, p, c) {
            if (p === void 0) { p = 0; }
            if (c === void 0) { c = false; }
            if (true == c) {
                this.status |= p;
                if (this.parent) {
                    this.parent.setChange(value, p, true);
                }
            }
            else {
                _super.prototype.setChange.call(this, value);
            }
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
            get: function () {
                return this.childrens.length;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype.addChild = function (child) {
            if (undefined == child || child == this)
                return;
            var childrens = this.childrens;
            var i = childrens.indexOf(child);
            if (i == -1) {
                if (child.parent)
                    child.remove();
                childrens.push(child);
                child.parent = this;
                child.setChange(51 | 12);
                if (this.stage) {
                    if (!child.stage) {
                        child.stage = this.stage;
                        child.addToStage();
                    }
                }
            }
            else {
                childrens.splice(i, 1);
                childrens.push(child);
            }
        };
        DisplayObjectContainer.prototype.addChildAt = function (child, index) {
            if (undefined == child || child == this)
                return;
            if (child.parent)
                child.remove();
            if (index < 0) {
                index = 0;
            }
            else if (index > this.childrens.length) {
                index = this.childrens.length;
            }
            this.childrens.splice(index, 0, child);
            child.parent = this;
            child.setChange(51);
            if (this.stage) {
                if (!child.stage) {
                    child.stage = this.stage;
                    child.addToStage();
                }
            }
        };
        DisplayObjectContainer.prototype.getChildIndex = function (child) {
            return this.childrens.indexOf(child);
        };
        DisplayObjectContainer.prototype.removeChild = function (child) {
            if (undefined == child) {
                return;
            }
            var i = this.childrens.indexOf(child);
            if (i == -1) {
                return;
            }
            this.childrens.splice(i, 1);
            child.stage = undefined;
            child.parent = undefined;
            this.setChange(12);
            child.removeFromStage();
        };
        DisplayObjectContainer.prototype.removeAllChild = function () {
            var childrens = this.childrens;
            var len = childrens.length;
            for (var i = 0; i < len; i++) {
                var child = childrens[i];
                child.stage = undefined;
                child.parent = undefined;
                child.removeFromStage();
            }
            if (len > 0) {
                this.setChange(12);
            }
            this.childrens.length = 0;
        };
        DisplayObjectContainer.prototype.removeFromStage = function () {
            var childrens = this.childrens;
            var len = childrens.length;
            for (var i = 0; i < len; i++) {
                var child = childrens[i];
                child.stage = undefined;
                child.removeFromStage();
            }
            _super.prototype.removeFromStage.call(this);
        };
        DisplayObjectContainer.prototype.addToStage = function () {
            var _a = this, childrens = _a.childrens, stage = _a.stage;
            var len = childrens.length;
            for (var i = 0; i < len; i++) {
                var child = childrens[i];
                child.stage = stage;
                child.addToStage();
            }
            _super.prototype.addToStage.call(this);
        };
        DisplayObjectContainer.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (updateStatus === void 0) { updateStatus = 0; }
            updateStatus = _super.prototype.updateSceneTransform.call(this, updateStatus, parentSceneTransform);
            var _a = this, childrens = _a.childrens, sceneTransform = _a.sceneTransform;
            if (updateStatus || this.status & 16) {
                for (var i = 0; i < childrens.length; i++) {
                    childrens[i].updateSceneTransform(updateStatus, sceneTransform);
                }
                this.status &= ~16;
            }
            return updateStatus;
        };
        DisplayObjectContainer.prototype.updateHitArea = function () {
            var hitArea = this.hitArea;
            if (hitArea) {
                hitArea.clean();
                var childrens = this.childrens;
                for (var i = 0; i < childrens.length; i++) {
                    var child = childrens[i];
                    var hit = child.hitArea;
                    if (undefined == hit)
                        continue;
                    if (child.status & 96) {
                        child.updateHitArea();
                    }
                    hitArea.combine(hit, child._x, child._y);
                }
            }
            this.status &= ~96;
        };
        return DisplayObjectContainer;
    }(rf.DisplayObject));
    rf.DisplayObjectContainer = DisplayObjectContainer;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(far) {
            if (far === void 0) { far = 10000; }
            var _this = _super.call(this) || this;
            _this.isPerspectiveCamera = false;
            _this.isOrthographicCamera = false;
            _this.far = far;
            _this.originFar = far;
            _this.len = rf.newMatrix3D();
            _this.worldTranform = rf.newMatrix3D();
            return _this;
        }
        Camera.prototype.updateSceneTransform = function (updateStatus) {
            if (this.status | 1) {
                this.updateTransform();
                this.sceneTransform.m3_invert(this.transform);
                this.sceneTransform.m3_append(rf.contextMatrix);
                this.worldTranform.m3_append(this.len, false, this.sceneTransform);
            }
            this.status = 0;
            return 0;
        };
        Camera.prototype.resize = function (width, height) {
        };
        return Camera;
    }(rf.DisplayObject));
    rf.Camera = Camera;
    function CameraUIResize(width, height, len, far, originFar, camera) {
        if (camera) {
            camera.w = width;
            camera.h = height;
            camera.far = far;
            camera.status |= 1;
            camera.isOrthographicCamera = true;
            camera.isPerspectiveCamera = false;
            camera.resize(width, height);
        }
        len[0] = 2 / width;
        len[1] = 0;
        len[2] = 0;
        len[3] = 0;
        len[4] = 0;
        len[5] = -2 / height;
        len[6] = 0;
        len[7] = 0;
        len[8] = 0;
        len[9] = 0;
        len[10] = -1 / far;
        len[11] = 0;
        len[12] = -1;
        len[13] = 1;
        len[14] = 0;
        len[15] = 1;
    }
    rf.CameraUIResize = CameraUIResize;
    function CameraOrthResize(width, height, len, far, originFar, camera) {
        if (camera) {
            camera.w = width;
            camera.h = height;
            camera.far = far;
            camera.status |= 1;
            camera.isOrthographicCamera = true;
            camera.isPerspectiveCamera = false;
        }
        len[0] = 2 / width;
        len[1] = 0;
        len[2] = 0;
        len[3] = 0;
        len[4] = 0;
        len[5] = 2 / height;
        len[6] = 0;
        len[7] = 0;
        len[8] = 0;
        len[9] = 0;
        len[10] = 1 / far;
        len[11] = 0;
        len[12] = 0;
        len[13] = 0;
        len[14] = -1 / far * Math.PI * 100;
        len[15] = 1;
    }
    rf.CameraOrthResize = CameraOrthResize;
    function Camera3DResize(width, height, len, far, originFar, camera) {
        if (camera) {
            camera.w = width;
            camera.h = height;
            camera.far = far;
            camera.originFar = originFar = far / Math.PI2;
            camera.status |= 1;
            camera.isPerspectiveCamera = true;
            camera.isOrthographicCamera = false;
        }
        len[0] = 2 / width;
        len[1] = 0;
        len[2] = 0;
        len[3] = 0;
        len[4] = 0;
        len[5] = 2 / height;
        len[6] = 0;
        len[7] = 0;
        len[8] = 0;
        len[9] = 0;
        len[10] = 1 / far;
        len[11] = 1 / originFar;
        len[12] = 0;
        len[13] = 0;
        len[14] = -1 / far * Math.PI * 100;
        len[15] = 0;
        len[14] = -1 / far * Math.PI;
    }
    rf.Camera3DResize = Camera3DResize;
    function PerspectiveResize(width, height, len, far, degree, camera) {
        var radians = degree * rf.DEGREES_TO_RADIANS;
        var zNear = 0.001;
        var zFar = far;
        var standardHeight = 960;
        var standardSy = 1.0 / Math.tan(radians / 2.0);
        var yScale = standardSy * standardHeight / height;
        var xScale = standardSy * standardHeight / width;
        if (camera) {
            camera.w = width;
            camera.h = height;
            camera.far = far;
            camera.originFar = 0.5 * height * yScale;
            camera.logDepthFar = 1.0 / (Math.log(camera.far + 1.0) / Math.LN2);
            camera.status |= 1;
            camera.isPerspectiveCamera = true;
            camera.isOrthographicCamera = false;
        }
        len[0] = xScale;
        len[1] = 0;
        len[2] = 0;
        len[3] = 0;
        len[4] = 0;
        len[5] = yScale;
        len[6] = 0;
        len[7] = 0;
        len[8] = 0;
        len[9] = 0;
        len[10] = (zFar + zNear) / (zFar - zNear);
        len[11] = 1.0;
        len[12] = 0;
        len[13] = 0;
        len[14] = zFar * zNear / (zNear - zFar);
        len[15] = 0;
    }
    rf.PerspectiveResize = PerspectiveResize;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var FilterBase = (function (_super) {
        __extends(FilterBase, _super);
        function FilterBase(type) {
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.skey = type;
            _this.readly = true;
            return _this;
        }
        FilterBase.prototype.updateSetting = function (setting) {
            var pros = rf.IShaderSettingPros;
            for (var i = 0; i < pros.length; i++) {
                var element = pros[i];
                setting[element] = setting[element] || this[element];
            }
        };
        FilterBase.prototype.createCode = function () {
        };
        FilterBase.prototype.setProgramConstants = function (context, program, target, camera) {
        };
        return FilterBase;
    }(rf.STweenBase));
    rf.FilterBase = FilterBase;
    var BasicFilter = (function (_super) {
        __extends(BasicFilter, _super);
        function BasicFilter() {
            var _this = _super.call(this, "basic_") || this;
            var def = "\nattribute vec3 pos;\n";
            var func = "";
            var code = "\nvec4 p = vec4(pos,1.0);\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            return _this;
        }
        return BasicFilter;
    }(FilterBase));
    rf.BasicFilter = BasicFilter;
    var NormalFilter = (function (_super) {
        __extends(NormalFilter, _super);
        function NormalFilter() {
            var _this = _super.call(this, "basic_") || this;
            var def = "\nattribute vec3 normal;\n";
            var func = "";
            var code = "\nvec3 n = normal;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            return _this;
        }
        return NormalFilter;
    }(FilterBase));
    rf.NormalFilter = NormalFilter;
    var ColorFilter = (function (_super) {
        __extends(ColorFilter, _super);
        function ColorFilter() {
            var _this = _super.call(this, "basic_") || this;
            var def = "\nattribute vec4 color;\nvarying vec4 vColor;\n";
            var func = "";
            var code = "\nvec4 c = color;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            def =
                "\nvarying vec4 vColor;\n";
            func = "";
            code =
                "\ncolor = vColor * color;\n";
            _this.fragment = rf.newShaderCode(code, def, func);
            _this.useColor = true;
            return _this;
        }
        return ColorFilter;
    }(FilterBase));
    rf.ColorFilter = ColorFilter;
    var MvpFilter = (function (_super) {
        __extends(MvpFilter, _super);
        function MvpFilter() {
            var _this = _super.call(this, "mvp_") || this;
            var def = "\nuniform mat4 mvp;\n";
            var func = "";
            var code = "\np = mvp * p;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            return _this;
        }
        return MvpFilter;
    }(FilterBase));
    rf.MvpFilter = MvpFilter;
    var DiscardFilter = (function (_super) {
        __extends(DiscardFilter, _super);
        function DiscardFilter() {
            var _this = _super.call(this, "discard_") || this;
            _this.fragment = DiscardFilter.FRAGMENT;
            return _this;
        }
        DiscardFilter.FRAGMENT = {
            code: "\nif(color.w <= 0.05) {\n    discard;\n}\ncolor.w = (color.w - 0.05) / 0.95;\n"
        };
        return DiscardFilter;
    }(FilterBase));
    rf.DiscardFilter = DiscardFilter;
    var GrayFilter = (function (_super) {
        __extends(GrayFilter, _super);
        function GrayFilter() {
            var _this = _super.call(this, "gray_") || this;
            _this.fragment = GrayFilter.FARGMENT;
            return _this;
        }
        GrayFilter.FARGMENT = {
            code: "\nfloat grey = dot(color.xyz,vec3(0.299, 0.587, 0.114));\ncolor.xyz = vec3(grey,grey,grey);\n"
        };
        return GrayFilter;
    }(FilterBase));
    rf.GrayFilter = GrayFilter;
    var HoleFilter = (function (_super) {
        __extends(HoleFilter, _super);
        function HoleFilter() {
            var _this = _super.call(this, "hole_") || this;
            _this.pos = rf.newVector3D();
            _this.usePos = true;
            _this.fragment = HoleFilter.FARGMENT;
            return _this;
        }
        HoleFilter.prototype.setConstants = function (x, y, len, inner) {
            var pos = this.pos;
            pos.x = x;
            pos.y = y;
            pos.z = len - inner;
            pos.w = inner;
        };
        HoleFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromVector("hole", this.pos, 4);
        };
        HoleFilter.FARGMENT = {
            def: "uniform vec4 hole;",
            code: "\nvec2 pos = vpos.xy - hole.xy;\nfloat r = length(pos) - hole.w;\ncolor.w = sat(r / hole.z) * color.w;\n"
        };
        return HoleFilter;
    }(FilterBase));
    rf.HoleFilter = HoleFilter;
    var CircleFilter = (function (_super) {
        __extends(CircleFilter, _super);
        function CircleFilter(x, y, len, inner) {
            var _this = _super.call(this, "circle_") || this;
            _this.pos = rf.newVector3D();
            _this.fragment = CircleFilter.FRAGMENT;
            _this.setConstants(x, y, len, inner);
            return _this;
        }
        CircleFilter.prototype.setConstants = function (x, y, len, inner) {
            var pos = this.pos;
            pos.x = x;
            pos.y = y;
            pos.z = len - 1.0;
            pos.w = inner - 1.0;
        };
        CircleFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromVector("circleConst", this.pos, 4);
        };
        CircleFilter.FRAGMENT = rf.newShaderCode("\nuniform vec4 circleConst;\n", "\nfloat circleFunc(vec3 pos,vec4 data){\n    float a=length(pos.xy-data.xy);\n    return (1.0 - sat(a-data.z)) * sat(a-data.w);\n}\n", "\ncolor.w = circleFunc(vpos,circleConst) * color.w;\n");
        return CircleFilter;
    }(FilterBase));
    rf.CircleFilter = CircleFilter;
    var UIFilter = (function (_super) {
        __extends(UIFilter, _super);
        function UIFilter() {
            var _this = _super.call(this, "ui_") || this;
            _this.vertex = UIFilter.VERTEX;
            return _this;
        }
        UIFilter.VERTEX = {
            def: "uniform vec4 ui[" + rf.max_vc + "];\n",
            code: "vec4 tv = ui[int(uv.z)];\np.xy = p.xy + tv.xy;\np.xy = p.xy * tv.zz;\nc.w *= tv.w;\n"
        };
        return UIFilter;
    }(FilterBase));
    rf.UIFilter = UIFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var RenderBase = (function (_super) {
        __extends(RenderBase, _super);
        function RenderBase(variables) {
            var _this = _super.call(this) || this;
            _this.nativeRender = false;
            _this.variables = variables;
            return _this;
        }
        RenderBase.prototype.render = function (camera, option) {
            var i = 0;
            var childrens = this.childrens;
            var len = childrens.length;
            for (i = 0; i < len; i++) {
                var child = childrens[i];
                child.render(camera, option);
            }
        };
        RenderBase.prototype.addToStage = function () {
            _super.prototype.addToStage.call(this);
            this.setChange(4);
        };
        return RenderBase;
    }(rf.DisplayObjectContainer));
    rf.RenderBase = RenderBase;
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(source, variables) {
            var _this = _super.call(this) || this;
            _this.hitArea = new rf.HitArea();
            _this.source = source ? source : rf.componentSource;
            _this.variables = variables ? variables : rf.vertex_ui_variable;
            _this.mouseChildren = true;
            _this.mouseEnabled = true;
            return _this;
        }
        Sprite.prototype.setScrollRect = function (w, h, hStep, vStep, x, y) {
            if (hStep === void 0) { hStep = 0; }
            if (vStep === void 0) { vStep = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var renderer = this.renderer;
            if (!renderer) {
                this.renderer = renderer = new BatchRenderer(this);
            }
            this.scrollRect = { x: x, y: y, w: w, h: h };
        };
        Sprite.prototype.addChild = function (child) {
            _super.prototype.addChild.call(this, child);
            if (this.mask && this.mask.parent == this) {
                _super.prototype.addChild.call(this, this.mask);
            }
        };
        Sprite.prototype.setMask = function (color, alpha) {
            if (color === void 0) { color = undefined; }
            if (alpha === void 0) { alpha = 0.95; }
            var mask = this.mask;
            if (color != undefined) {
                if (!mask) {
                    mask = this.mask = new Sprite(this.source);
                }
                this.addChild(mask);
                var g = mask.graphics;
                g.clear();
                g.drawRect(0, 0, this.w, this.h, color, 0.95);
                g.end();
            }
            else {
                if (this.mask) {
                    this.mask.remove();
                }
            }
        };
        Object.defineProperty(Sprite.prototype, "graphics", {
            get: function () {
                if (undefined == this.$graphics) {
                    this.$graphics = new rf.Graphics(this, rf.vertex_ui_variable);
                }
                return this.$graphics;
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.setChange = function (value, p, c) {
            if (p === void 0) { p = 0; }
            if (c === void 0) { c = false; }
            if (undefined != this.renderer) {
                this.status |= (value | p);
                if (value & 4) {
                    if (this.__batch) {
                        this.__batch.change |= 4;
                    }
                    else {
                        _super.prototype.setChange.call(this, 4);
                    }
                }
            }
            else {
                _super.prototype.setChange.call(this, value, p, c);
            }
        };
        Sprite.prototype.render = function (camera, option) {
            if (undefined != this.renderer) {
                if (this.status & 19) {
                    this.updateSceneTransform();
                }
                this.renderer.render(camera, option);
            }
            else {
                _super.prototype.render.call(this, camera, option);
            }
        };
        Sprite.prototype.addToStage = function () {
            if (this.$graphics && this.$graphics.numVertices) {
                this.setChange(4);
            }
            if (this.renderer) {
                if (this.parent) {
                    this.parent.setChange(4);
                }
            }
            _super.prototype.addToStage.call(this);
        };
        Sprite.prototype.cleanAll = function () {
            if (this.childrens.length) {
                this.removeAllChild();
            }
            var g = this.$graphics;
            if (g && g.numVertices > 0) {
                g.clear();
                g.end();
            }
        };
        Sprite.prototype.setSize = function (width, height) {
            _super.prototype.setSize.call(this, width, height);
            var hitArea = this.hitArea;
            hitArea.clean();
            hitArea.updateArea(width, height, 0);
        };
        Sprite.prototype.updateHitArea = function () {
            var locksize = this.locksize;
            if (locksize) {
                return;
            }
            var hitArea = this.hitArea;
            hitArea.clean();
            var childrens = this.childrens;
            for (var i = 0; i < childrens.length; i++) {
                var child = childrens[i];
                if (child.status & 96) {
                    child.updateHitArea();
                }
                hitArea.combine(child.hitArea, child._x, child._y);
            }
            if (this.$graphics) {
                hitArea.combine(this.$graphics.hitArea, 0, 0);
            }
            this.w = hitArea.right - hitArea.left;
            this.h = hitArea.bottom - hitArea.top;
            this.status &= ~96;
        };
        Sprite.prototype.getObjectByPoint = function (dx, dy, scale) {
            var _a = this, mouseEnabled = _a.mouseEnabled, mouseChildren = _a.mouseChildren, visible = _a.visible;
            if (!visible) {
                return;
            }
            if (mouseEnabled == false && mouseChildren == false) {
                return undefined;
            }
            var _b = this, scrollRect = _b.scrollRect, hitArea = _b.hitArea;
            if (this.status & 96) {
                this.updateHitArea();
            }
            dx -= this._x;
            dy -= this._y;
            scale *= this._scaleX;
            var b = true;
            if (scrollRect) {
                var w = scrollRect.w, h = scrollRect.h, x = scrollRect.x, y = scrollRect.y;
                b = rf.size_checkIn(-x, w - x, -y, h - y, dx, dy, scale);
            }
            else {
                b = hitArea.checkIn(dx, dy, scale);
            }
            if (b) {
                if (this.mouseChildren) {
                    var children = this.childrens;
                    var len = children.length;
                    for (var i = len - 1; i >= 0; i--) {
                        var child = children[i];
                        var d = child.getObjectByPoint(dx, dy, scale);
                        if (undefined != d) {
                            return d;
                        }
                    }
                }
                if (mouseEnabled) {
                    if (hitArea.allWays) {
                        return this;
                    }
                    if (!this.pixcheck) {
                        return this;
                    }
                    var g = this.$graphics;
                    var vo = void 0;
                    if (g && g.grometrys.length && (vo = g.grometrys[0].vo)) {
                        var b_1 = rf.source_transparent_check(this.source, vo, dx, dy);
                        if (b_1) {
                            return this;
                        }
                    }
                    else {
                        return this;
                    }
                }
            }
            return undefined;
        };
        Sprite.prototype.buttonModel = function (x, y, z) {
            _super.prototype.setPivotPonumber.call(this, x, y, z);
            this.on(50, this.pivotMouseDownHandler, this);
        };
        Sprite.prototype.pivotMouseDownHandler = function (event) {
            rf.ROOT.on(53, this.pivotMouseUpHandler, this);
            rf.debug_click_button = this;
            var _a = this, _tweener = _a._tweener, tm = _a.tm, w = _a.w, h = _a.h;
            if (!this.renderer) {
                this.hadRenderer = false;
                this.renderer = new BatchRenderer(this);
                this.setChange(12);
            }
            else {
                this.hadRenderer = true;
            }
            if (_tweener) {
                rf.tweenStop(_tweener);
            }
            this._tweener = rf.tweenTo({ scale: 0.9 }, 200, tm, this, rf.ease_quartic_out);
        };
        Sprite.prototype.pivotMouseUpHandler = function (event) {
            rf.ROOT.off(53, this.pivotMouseUpHandler, this);
            var _a = this, _tweener = _a._tweener, tm = _a.tm;
            if (_tweener) {
                rf.tweenStop(_tweener);
            }
            this._tweener = _tweener = rf.tweenTo({ scale: 1 }, 200, tm, this, rf.ease_back_out);
            _tweener.complete = this.scaleTweenComplete.bind(this);
        };
        Sprite.prototype.scaleTweenComplete = function (t) {
            if (this.renderer && !this.hadRenderer) {
                this.renderer = undefined;
                this.setChange(12);
            }
        };
        Sprite.prototype.addFilter = function (filter) {
            var _a = this, filters = _a.filters, renderer = _a.renderer;
            if (!filters) {
                this.filters = filters = {};
            }
            filters[filter.type] = filter;
            filter.disable = false;
            if (!renderer) {
                this.renderer = renderer = new BatchRenderer(this);
                this.setChange(12);
            }
            else {
                this.renderer.program = undefined;
            }
        };
        Sprite.prototype.removeFilter = function (type) {
            var _a = this, filters = _a.filters, renderer = _a.renderer;
            if (!filters)
                return;
            filters[type] = undefined;
            if (renderer) {
                renderer.program = undefined;
            }
        };
        Sprite.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (updateStatus === void 0) { updateStatus = 0; }
            updateStatus = _super.prototype.updateSceneTransform.call(this, updateStatus, parentSceneTransform);
            if (this.__batch_render_data) {
                this.updateBatchVCData();
            }
            return updateStatus;
        };
        Sprite.prototype.updateBatchVCData = function () {
            var _a = this, __batch = _a.__batch, __batch_render_data = _a.__batch_render_data, sceneTransform = _a.sceneTransform, sceneAlpha = _a.sceneAlpha, _scaleX = _a._scaleX, $vcIndex = _a.$vcIndex;
            var batchSceneTransform = __batch.target.sceneTransform;
            var vcData = __batch_render_data.vcData;
            var index = $vcIndex * 4;
            vcData[index] = sceneTransform[12] - batchSceneTransform[12];
            vcData[index + 1] = sceneTransform[13] - batchSceneTransform[13];
            vcData[index + 2] = _scaleX;
            vcData[index + 3] = sceneAlpha;
        };
        Sprite.prototype.removeFromStage = function () {
            _super.prototype.removeFromStage.call(this);
            var $graphics = this.$graphics;
            $graphics.$batchOffset = 0;
            this.$batchGeometry = undefined;
            this.__batch = undefined;
            this.__batch_render_data = undefined;
        };
        return Sprite;
    }(RenderBase));
    rf.Sprite = Sprite;
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(source, variables) {
            var _this = _super.call(this, source, variables) || this;
            _this.lock_a = 0;
            return _this;
        }
        Image.prototype.load = function (url, extension) {
            url = rf.getFullUrl(url, extension);
            if (this.url == url) {
                return;
            }
            if (url) {
                this.url = url;
                var _a = this, source = _a.source, lockkey = _a.lockkey, lock_a = _a.lock_a;
                var vo = source.getSourceVO(lockkey ? lockkey : url, lockkey ? lock_a : 1);
                if (!vo || lockkey) {
                    rf.loadRes(rf.RES_PERFIX, url, this.onImageComplete, this, 5);
                }
                else {
                    this.w = vo.w;
                    this.h = vo.h;
                    this.draw(vo);
                    this.simpleDispatch(4, this);
                }
            }
        };
        Image.prototype.onImageComplete = function (e) {
            if (e.type != 4) {
                return;
            }
            var res = e.currentTarget;
            var img = e.data;
            var _a = this, url = _a.url, drawW = _a.drawW, drawH = _a.drawH, lockkey = _a.lockkey, lock_a = _a.lock_a, source = _a.source, rect = _a.rect;
            if (url != res.url) {
                return;
            }
            var cw = img.width, ch = img.height;
            this.w = cw;
            this.h = ch;
            if (!rect) {
                if (drawW && drawH) {
                    this.w = cw = drawW;
                    this.h = ch = drawH;
                }
            }
            var vo = source.getSourceVO(lockkey ? lockkey : url, lockkey ? lock_a : 1);
            if (!vo || lockkey) {
                if (!lockkey) {
                    vo = source.setSourceVO(url, cw, ch, 1);
                }
                else {
                    vo.rw = vo.w;
                    vo.rh = vo.h;
                    source.clearBitmap(vo);
                }
                source.drawimg(img, vo.x, vo.y, cw, ch);
            }
            this.draw(vo);
            this.simpleDispatch(4, this);
        };
        Image.prototype.setSize = function (_width, _height) {
            this.w = this.drawW = _width;
            this.h = this.drawH = _height;
        };
        Image.prototype.draw = function (vo) {
            var g = this.graphics;
            g.clear();
            var ix, iy;
            if (this.aglin) {
                var p = rf.getAglinPoint(this.aglin, vo.w, vo.h);
                ix = p[0];
                iy = p[1];
            }
            else {
                ix = 0;
                iy = 0;
            }
            var _a = this, rect = _a.rect, drawW = _a.drawW, drawH = _a.drawH;
            var d;
            if (drawW != vo.w || drawH != vo.h) {
                d = rf.newMatrix();
                d.m2_scale(drawW / vo.w, drawH / vo.h);
            }
            if (rect && drawW != undefined && drawH != undefined) {
                g.drawScale9Bitmap(ix, iy, vo, rect, d);
            }
            else if (drawW != undefined && drawH != undefined) {
                g.drawBitmap(ix, iy, vo, d);
            }
            else {
                g.drawBitmap(ix, iy, vo);
            }
            g.end();
        };
        Image.prototype.clean = function () {
            var g = this.graphics;
            g.clear();
            g.end();
            this.aglin = 0;
            this.url = undefined;
            this.lockkey = undefined;
            this.lock_a = undefined;
        };
        Image.prototype.onRecycle = function () {
            this.clean();
            _super.prototype.onRecycle.call(this);
            this.drawW = this.drawH = undefined;
        };
        return Image;
    }(Sprite));
    rf.Image = Image;
    function newGraphicsGeometry(matrix) {
        return { numVertices: 0, matrix: matrix, offset: 0 };
    }
    rf.newGraphicsGeometry = newGraphicsGeometry;
    var BatchRenderer = (function () {
        function BatchRenderer(target) {
            this.geo = undefined;
            this.depth = false;
            this.depthMode = 519;
            this.srcFactor = 770;
            this.dstFactor = 771;
            this.cull = 0;
            this.target = target;
            this.renders = new rf.Link();
            this.renders.checkSameData = false;
        }
        BatchRenderer.prototype.render = function (camera, option) {
            var target = this.target;
            var c = rf.context3D;
            var source = target.source, status = target.status, _x = target._x, _y = target._y, _scaleX = target._scaleX, scrollRect = target.scrollRect, sceneTransform = target.sceneTransform;
            if (!source || !source.bmd) {
                return;
            }
            var textureData = source.textureData;
            if (!textureData) {
                source.textureData = textureData = c.getTextureData(source.name, false);
            }
            var t;
            if (!textureData.key) {
                t = rf.context3D.createTexture(textureData, source.bmd);
            }
            else {
                t = rf.context3D.textureObj[textureData.key];
                if (!t) {
                    t = rf.context3D.createTexture(textureData, source.bmd);
                }
            }
            this.t = t;
            if (status & 4) {
                this.cleanBatch();
                this.getBatchTargets(target, -_x, -_y, 1 / _scaleX);
                this.toBatch();
                this.geo = undefined;
                target.status &= ~12;
            }
            else if (status & 8) {
                this.updateVCData(target, -_x, -_y, 1 / _scaleX);
                target.status &= ~8;
            }
            if (!this.renders.length) {
                return;
            }
            if (undefined == this.program) {
                this.createProgram();
            }
            var parentRect;
            if (scrollRect) {
                parentRect = c.setScissor(scrollRect, sceneTransform[12], sceneTransform[13]);
            }
            var vo = this.renders.getFrist();
            while (vo) {
                if (vo.close == false) {
                    var render = vo.data;
                    if (render instanceof BatchGeometry) {
                        this.dc(camera, render);
                    }
                    else {
                        render.render(camera, option);
                    }
                }
                vo = vo.next;
            }
            if (scrollRect) {
                c.lossScissor(parentRect);
            }
        };
        BatchRenderer.prototype.dc = function (camera, geo) {
            var c = rf.context3D;
            var v = geo.$vertexBuffer;
            if (undefined == v) {
                geo.$vertexBuffer = v = c.createVertexBuffer(geo.vertex, geo.vertex.data32PerVertex);
            }
            var g = rf.gl;
            var _a = this.target, scrollRect = _a.scrollRect, sceneTransform = _a.sceneTransform, filters = _a.filters;
            var worldTransform = rf.TEMP_MATRIX3D;
            var setting = c.setting;
            setting.depth = this.depth;
            setting.depthMode = this.depthMode;
            setting.src = this.srcFactor;
            setting.dst = this.dstFactor;
            setting.cull = this.cull;
            worldTransform.m3_append(camera.worldTranform, false, sceneTransform);
            var i = c.getIndexByQuad(geo.quadcount);
            var p = this.program;
            var type = c.setProgram(p);
            c.setProgramConstantsFromMatrix("mvp", worldTransform);
            c.setProgramConstantsFromVector("ui", geo.vcData, 4);
            this.t.uploadContext(p, "diff");
            v.uploadContext(p);
            var target = this.target;
            for (var key in filters) {
                var filter = filters[key];
                if (filter && !filter.disable) {
                    filter.setProgramConstants(c, p, target);
                }
            }
            c.drawTriangles(i, geo.quadcount * 2);
        };
        BatchRenderer.prototype.createProgram = function () {
            var shader = rf.singleton(rf.Shader);
            var target = this.target;
            var filters = target.filters;
            filters["basic_"] = rf.singleton(rf.BasicFilter);
            filters["color_"] = rf.singleton(rf.ColorFilter);
            filters["diff_"] = rf.singleton(rf.UIDiffFilter);
            filters["ui_"] = rf.singleton(rf.UIFilter);
            filters["mvp_"] = rf.singleton(rf.MvpFilter);
            this.program = shader.createProgram(target);
        };
        BatchRenderer.prototype.cleanBatch = function () {
            var vo = this.renders.getFrist();
            while (vo) {
                if (vo.close == false) {
                    var render = vo.data;
                    if (render instanceof BatchGeometry) {
                        render.recycle();
                    }
                    vo.close = true;
                }
                vo = vo.next;
            }
            this.renders.clean();
        };
        BatchRenderer.prototype.getBatchTargets = function (render, ox, oy, os) {
            var target;
            if (render instanceof Sprite) {
                target = render;
            }
            else {
                this.renders.add(render);
                this.geo = undefined;
                return;
            }
            if (false == target._visible) {
                target.$vcIndex = -1;
                target.$batchGeometry = null;
                return;
            }
            var g = target.$graphics;
            ox = target._x + ox;
            oy = target._y + oy;
            os = target._scaleX * os;
            if (target == this.target || (null == target.renderer && false == target.nativeRender)) {
                if (undefined == g || 0 >= g.numVertices) {
                    target.$vcIndex = -1;
                    target.$batchGeometry = null;
                }
                else {
                    if (undefined == this.geo) {
                        this.geo = rf.recyclable(BatchGeometry);
                        this.renders.add(this.geo);
                    }
                    var i = this.geo.add(target, g);
                    target.$vcox = ox;
                    target.$vcoy = oy;
                    target.$vcos = os;
                    if (i >= rf.max_vc) {
                        this.geo = undefined;
                    }
                }
            }
            else {
                this.renders.add(target);
                this.geo = undefined;
                return;
            }
            var childrens = target.childrens;
            for (var i = 0; i < childrens.length; i++) {
                var child = childrens[i];
                if (child instanceof Sprite) {
                    this.getBatchTargets(child, ox, oy, os);
                }
                else if (child instanceof RenderBase) {
                    this.renders.add(child);
                    this.geo = undefined;
                }
            }
        };
        BatchRenderer.prototype.updateVCData = function (render, ox, oy, os) {
            var target;
            if (render instanceof Sprite) {
                target = render;
            }
            else {
                return;
            }
            if (false == target._visible || 0.0 >= target.sceneAlpha) {
                target.$vcIndex = -1;
                target.$batchGeometry = null;
                return;
            }
            var g = target.$graphics;
            ox = target._x + ox;
            oy = target._y + oy;
            os = target._scaleX * os;
            if (target == this.target || (null == target.renderer && false == target.nativeRender)) {
                if (undefined != target.$batchGeometry) {
                    target.$vcox = ox;
                    target.$vcoy = oy;
                    target.$vcos = os;
                    target.$batchGeometry.vcData.wPoint4(target.$vcIndex * 4, ox / os, oy / os, os, target.sceneAlpha);
                }
            }
            else {
                return;
            }
            var childrens = target.childrens;
            for (var i = 0; i < childrens.length; i++) {
                var child = childrens[i];
                if (child instanceof Sprite) {
                    this.updateVCData(child, ox, oy, os);
                }
            }
        };
        BatchRenderer.prototype.toBatch = function () {
            var vo = this.renders.getFrist();
            var target = this.target;
            while (vo) {
                if (vo.close == false) {
                    var render = vo.data;
                    if (render instanceof BatchGeometry) {
                        render.build(target);
                    }
                }
                vo = vo.next;
            }
        };
        return BatchRenderer;
    }());
    rf.BatchRenderer = BatchRenderer;
    var BatchGeometry = (function () {
        function BatchGeometry() {
            this.vci = 0;
            this.verlen = 0;
        }
        ;
        BatchGeometry.prototype.add = function (target, g) {
            if (undefined == this.link) {
                this.link = new rf.Link();
            }
            target.$vcIndex = this.vci++;
            target.$batchGeometry = this;
            g.$batchOffset = this.verlen;
            this.verlen += g.byte.length;
            this.link.add(target);
            return this.vci;
        };
        BatchGeometry.prototype.build = function (target) {
            var variables = target.variables;
            var vertex = this.vertex = new rf.VertexInfo(this.verlen, variables["data32PerVertex"].size);
            vertex.variables = variables;
            this.quadcount = vertex.numVertices / 4;
            this.vcData = new Float32Array(this.quadcount * 4);
            var data32PerVertex = vertex.data32PerVertex, byte = vertex.vertex;
            var offset = rf.vertex_ui_variable["uv"].offset + 2;
            var vo = this.link.getFrist();
            while (vo) {
                if (vo.close == false) {
                    var sp = vo.data;
                    var $vcIndex = sp.$vcIndex;
                    var g = sp.$graphics;
                    if ($vcIndex >= 0) {
                        g.byte.update(data32PerVertex, offset, $vcIndex);
                    }
                    byte.set(g.byte, g.$batchOffset);
                    var ox = sp.$vcox, oy = sp.$vcoy, os = sp.$vcos;
                    this.vcData.wPoint4($vcIndex * 4, ox / os, oy / os, os, sp.sceneAlpha);
                }
                vo = vo.next;
            }
        };
        BatchGeometry.prototype.update = function (position, byte) {
            if (undefined != this.vertex) {
                this.vertex.vertex.set(byte, position);
            }
            if (undefined != this.$vertexBuffer) {
                this.$vertexBuffer.readly = false;
            }
        };
        BatchGeometry.prototype.updateVC = function (sp) {
            this.vcData.wPoint4(sp.$vcIndex * 4, sp.$vcox, sp.$vcoy, sp.$vcos, sp.sceneAlpha);
        };
        BatchGeometry.prototype.onRecycle = function () {
            this.vertex = undefined;
            this.verlen = 0;
            this.vci = 0;
            this.$vertexBuffer = null;
            this.vcData = null;
            var vo = this.link.getFrist();
            while (vo) {
                if (vo.close == false) {
                    var sp = vo.data;
                    if (sp.$batchGeometry == this) {
                        sp.$batchGeometry = null;
                        sp.$vcIndex = -1;
                        sp.$vcos = 1;
                        sp.$vcox = 0;
                        sp.$vcoy = 0;
                    }
                }
                vo = vo.next;
            }
            this.link.onRecycle();
        };
        return BatchGeometry;
    }());
    rf.BatchGeometry = BatchGeometry;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function showKeyboard(tf) {
        if (tf == rf.editTF) {
            return;
        }
        console.log("select");
        rf.editTF = tf;
        tf.visible = false;
        var sceneTransform = tf.sceneTransform, w = tf.w, h = tf.h, text = tf.text;
        var x = sceneTransform[12];
        var y = sceneTransform[13];
        var offset = tf.format.stroke ? tf.format.stroke.size : 0;
        x += offset;
        y += offset;
        var style;
        if (!rf.weixin) {
            var txt_input = {};
            var format = tf.format;
            txt_input.left = x + "px";
            txt_input.top = y + "px";
            txt_input.width = w + "px";
            txt_input.visibility = "";
            txt_input.border = "none";
            txt_input.outline = "thin";
            txt_input.padding = "0px 0px 10px";
            txt_input["font-size"] = format.size + "px";
            txt_input.height = (format.size + 5) + "px";
            txt_input["text-align"] = format.align;
            txt_input["vertical-align"] = "top";
            style = { txt_input: txt_input };
            rf.oldWindowWidth = rf.windowWidth;
            rf.oldWindowHeight = rf.windowHeight;
        }
        wx.onKeyboardInput(onKeyboardInput);
        wx.onKeyboardComplete(onKeyboardComplete);
        var defaultValue = text;
        var option = { defaultValue: defaultValue, style: style };
        wx.showKeyboard(option);
        rf.softKeyboard = true;
    }
    rf.showKeyboard = showKeyboard;
    function onResizeKeboard(width, height) {
        var stageY = rf.editTF.stageY;
        var v = rf.TEMP_VECTOR3D;
        v.x = 0;
        v.y = (stageY + rf.editTF.format.size);
        v.z = 0;
        rf.contextMatrix.m3_transformVector(v, v);
        v.y /= rf.pixelRatio;
        if (v.y > height) {
            var y = (height - rf.oldWindowHeight - (v.y - rf.oldWindowHeight)) * rf.pixelRatio;
            rf.setContextMatrix(rf.oldWindowWidth, rf.oldWindowHeight, 0, y);
        }
    }
    rf.onResizeKeboard = onResizeKeboard;
    function onKeyboardInput(option) {
        if (rf.editTF) {
            rf.editTF.text = option.value;
        }
    }
    rf.onKeyboardInput = onKeyboardInput;
    function onKeyboardComplete(option) {
        rf.softKeyboard = false;
        if (rf.editTF) {
            rf.editTF.visible = true;
            rf.editTF.simpleDispatch(10);
            rf.editTF = undefined;
        }
    }
    rf.onKeyboardComplete = onKeyboardComplete;
    var emote_images = {};
    ;
    var TextFormat = (function () {
        function TextFormat() {
            this.family = "微软雅黑";
            this.size = 20;
            this.align = "left";
            this.bold = "normal";
            this.italic = "normal";
            this.leading = 4;
        }
        TextFormat.prototype.init = function () {
            this.font = this.bold + " " + this.italic + " " + this.size + "px " + this.family;
            this.stroke = { size: 1, color: 0 };
            return this;
        };
        TextFormat.prototype.test = function (context, text, out, scale) {
            var _a = this, family = _a.family, size = _a.size, bold = _a.bold, italic = _a.italic;
            context.font = this.bold + " " + this.italic + " " + this.size * scale + "px " + this.family;
            out.x = context.measureText(text).width;
            out.y = size * scale;
            if (this.stroke) {
                out.x += this.stroke.size * 2 * scale;
                out.y += this.stroke.size * 2 * scale;
            }
            out.x += 1.0;
            out.x = Math.round(out.x);
            out.y *= 1.1;
            out.y = Math.round(out.y);
        };
        TextFormat.prototype.draw = function (context, text, s) {
            var x = s.x, y = s.y, w = s.w, h = s.h;
            var _a = this, family = _a.family, size = _a.size, bold = _a.bold, italic = _a.italic, stroke = _a.stroke, shadow = _a.shadow, gradient = _a.gradient, align = _a.align;
            var scale = rf.pixelFont;
            context.font = this.bold + " " + this.italic + " " + this.size * scale + "px " + this.family;
            y += Math.round((this.size * scale) * 0.5) + 1;
            var ox = 0;
            context.fillStyle = rf.c_white;
            if (stroke) {
                context.strokeStyle = this.getColorStr(stroke.color || 0);
                context.lineWidth = stroke.size * 2 * scale;
                context.strokeText(text, x + stroke.size, y + stroke.size, w - 1);
                ox = stroke.size;
            }
            context.fillText(text, x + ox, y + ox, w - 1);
        };
        TextFormat.prototype.getColorStr = function (color) {
            var s = color.toString(16);
            return "#000000".substr(0, 7 - s.length) + s;
        };
        TextFormat.prototype.clone = function (format) {
            if (undefined == format) {
                format = new TextFormat();
            }
            format.family = this.family;
            format.size = this.size;
            format.bold = this.bold;
            format.italic = this.italic;
            format.stroke = this.stroke;
            format.shadow = this.shadow;
            format.gradient = this.gradient;
            format.font = this.font;
            format.align = this.align;
            format.leading = this.leading;
            return format;
        };
        return TextFormat;
    }());
    rf.TextFormat = TextFormat;
    rf.defalue_format = new TextFormat().init();
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.html = false;
            _this.$text = "";
            _this.gap = -2;
            _this.multiline = false;
            _this._edit = false;
            _this._type = "dynamic";
            _this.lines = [];
            _this.textLines = [];
            return _this;
        }
        TextField.prototype.init = function (source, format) {
            if (undefined != source) {
                this.source = source;
            }
            if (undefined == format) {
                format = rf.defalue_format.clone();
            }
            this.format = format;
        };
        Object.defineProperty(TextField.prototype, "text", {
            get: function () {
                return this.$text;
            },
            set: function (value) {
                if (this.$text == value) {
                    return;
                }
                this.$text = value;
                var element = this.element;
                if (undefined == element) {
                    this.element = element = new HtmlElement();
                }
                else {
                    element.clear();
                }
                var format = this.format;
                if (undefined == format) {
                    this.format = format = rf.defalue_format.clone();
                }
                element.format = format;
                element.color = this.color;
                if (this.html) {
                    formatHtml(value, element, this.source);
                }
                else {
                    element.str = value;
                }
                var prelens = this.textLines.length;
                var lines = this.tranfromHtmlElement2CharDefine(element, this.multiline ? this.w : Infinity);
                var len = lines.length;
                var oy = 0;
                var lw;
                for (var i = 0; i < len; i++) {
                    var line = lines[i];
                    var textLine = this.textLines[i];
                    if (undefined == textLine) {
                        this.textLines[i] = textLine = new TextLine();
                    }
                    textLine.y = oy;
                    textLine.source = this.source;
                    textLine.renderText(line);
                    textLine.updateHitArea();
                    oy += line.h + format.leading;
                    this.addChild(textLine);
                    if (!lw) {
                        lw = line.w;
                    }
                    else {
                        if (lw < line.w) {
                            lw = line.w;
                        }
                    }
                }
                this.textWidth = lw;
                this.textHeight = Math.floor(oy / 1.1);
                while (lines.length > len) {
                    var textLine = lines.pop();
                    textLine.recycle();
                }
                while (prelens > len) {
                    var tline = this.textLines[prelens - 1];
                    tline.cleanAll();
                    prelens--;
                }
                this.layout();
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.cleanAll = function () {
            _super.prototype.cleanAll.call(this);
        };
        TextField.prototype.removeChild = function (child) {
            _super.prototype.removeChild.call(this, child);
        };
        TextField.prototype.layout = function () {
            var format = this.format;
            this.updateHitArea();
            if (format.align == "left") {
                return;
            }
            var childrens = this.childrens;
            var _w = this.w;
            if (_w == 0) {
                return;
            }
            var align_type = 0;
            if (format.align == "center") {
                align_type = 1;
            }
            else if (format.align == "right") {
                align_type = 2;
            }
            var len = childrens.length;
            for (var i = 0; i < len; i++) {
                var display = childrens[i];
                if (align_type == 1) {
                    display.x = _w - display.w >> 1;
                }
                else if (align_type == 2) {
                    display.x = _w - display.w;
                }
            }
        };
        TextField.prototype.getCharSourceVO = function (char, format) {
            var source = this.source;
            var name = format.font + "_" + char;
            var vo = source.getSourceVO(name, 1);
            if (undefined == vo) {
                var p = rf.EMPTY_POINT2D;
                var bmd = source.bmd;
                var context = bmd.context;
                format.test(context, char, p, rf.pixelFont);
                vo = source.setSourceVO(name, p.x, p.y, 1);
                if (vo) {
                    format.draw(context, char, vo);
                    if (rf.pixelFont != 1.0) {
                        format.test(context, char, p, 1.0);
                    }
                    vo.w = p.x;
                    vo.h = p.y;
                    var c = rf.context3D;
                    var textureData = source.textureData;
                    if (!textureData) {
                        source.textureData = textureData = c.getTextureData(source.name);
                    }
                    var texture = rf.context3D.textureObj[textureData.key];
                    if (undefined != texture) {
                        texture.readly = false;
                    }
                }
            }
            return vo;
        };
        TextField.prototype.tranfromHtmlElement2CharDefine = function (html, width) {
            if (width === void 0) { width = Infinity; }
            var char;
            var str;
            var i = 0;
            var oi = 0;
            var len;
            var ox = 0;
            var lineCount = 0;
            var lines = this.lines;
            var line = lines[lineCount];
            if (!line) {
                lines[lineCount] = line = rf.recyclable(Line);
            }
            var chars = line.chars;
            lineCount++;
            while (html) {
                if (!html.image && !html.str) {
                    html = html.next;
                    continue;
                }
                if (html.image) {
                    if (html.newline) {
                        while (chars.length > oi) {
                            char = chars.pop();
                            char.recycle();
                        }
                        line = lines[lineCount];
                        if (!line) {
                            lines[lineCount] = line = rf.recyclable(Line);
                        }
                        chars = line.chars;
                        ox = 0;
                        oi = 0;
                        lineCount++;
                    }
                    if (ox && ox + html.image.w > width) {
                        while (chars.length > oi) {
                            char = chars.pop();
                            char.recycle();
                        }
                        line = lines[lineCount];
                        if (!line) {
                            lines[lineCount] = line = rf.recyclable(Line);
                        }
                        chars = line.chars;
                        ox = 0;
                        oi = 0;
                        lineCount++;
                    }
                    char = chars[oi];
                    if (!char) {
                        chars[oi] = char = rf.recyclable(Char);
                    }
                    char.index = oi;
                    char.w = html.w;
                    char.h = html.h;
                    char.sx = ox;
                    char.ex = ox + char.w;
                    char.ox = ox + char.h * .5;
                    char.name = null;
                    char.display = html.image;
                    char.element = html;
                    line.w = ox + char.w;
                    if (line.h < char.h) {
                        line.h = char.h;
                    }
                    ox += (char.w + this.gap - 2);
                    oi++;
                }
                else {
                    if (html.newline) {
                        while (chars.length > oi) {
                            char = chars.pop();
                            char.recycle();
                        }
                        line = lines[lineCount];
                        if (!line) {
                            lines[lineCount] = line = rf.recyclable(Line);
                        }
                        chars = line.chars;
                        ox = 0;
                        oi = 0;
                        lineCount++;
                    }
                    str = html.str;
                    len = str.length;
                    for (i = 0; i < len; i++) {
                        var c = str.charAt(i);
                        var vo = this.getCharSourceVO(c, html.format);
                        if (!vo) {
                            continue;
                        }
                        if (ox + vo.w > width) {
                            while (chars.length > oi) {
                                char = chars.pop();
                                char.recycle();
                            }
                            line = lines[lineCount];
                            if (!line) {
                                lines[lineCount] = line = rf.recyclable(Line);
                            }
                            chars = line.chars;
                            ox = 0;
                            oi = 0;
                            lineCount++;
                        }
                        char = chars[oi];
                        if (!char) {
                            chars[oi] = char = rf.recyclable(Char);
                        }
                        char.index = oi;
                        char.w = vo.w;
                        char.h = vo.h;
                        char.sx = ox;
                        char.ex = ox + vo.w;
                        char.ox = ox + vo.w * .5;
                        char.name = c;
                        char.element = html;
                        char.display = vo;
                        line.w = ox + vo.w;
                        if (line.h < vo.h) {
                            line.h = vo.h;
                        }
                        ox += (vo.w + this.gap);
                        oi++;
                    }
                }
                html = html.next;
            }
            while (chars.length > oi) {
                char = chars.pop();
                char.recycle();
            }
            while (lines.length > lineCount) {
                line = lines.pop();
                var chars_1 = line.chars;
                for (var i_1 = 0; i_1 < chars_1.length; i_1++) {
                    chars_1[i_1].recycle();
                }
                chars_1.length = 0;
            }
            return lines;
        };
        Object.defineProperty(TextField.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (val) {
                this._type = val;
                if (val == "input") {
                    this.on(53, this.mouseUpHandler, this);
                }
                else {
                    this.off(53, this.mouseUpHandler, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.mouseUpHandler = function (event) {
            this.simpleDispatch(30);
            showKeyboard(this);
        };
        TextField.prototype.removeFromStage = function () {
            _super.prototype.removeFromStage.call(this);
            if (this._edit) {
                wx.hideKeyboard();
            }
        };
        return TextField;
    }(rf.Sprite));
    rf.TextField = TextField;
    var ImageVO = (function () {
        function ImageVO() {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
        }
        ImageVO.prototype.clone = function (vo) {
            if (undefined == vo) {
                vo = new ImageVO();
            }
            vo.name = this.name;
            vo.tag = this.tag;
            vo.w = this.w;
            vo.h = this.h;
            return vo;
        };
        ImageVO.prototype.dispose = function () {
            this.display = undefined;
        };
        return ImageVO;
    }());
    rf.ImageVO = ImageVO;
    var HtmlElement = (function () {
        function HtmlElement() {
            this.newline = false;
            this.str = undefined;
            this.start = 0;
            this.color = 0;
        }
        HtmlElement.prototype.createAndCopyFormat = function (last, newline) {
            if (last === void 0) { last = null; }
            if (newline === void 0) { newline = false; }
            var ele = new HtmlElement();
            ele.format = this.format;
            ele.underline = this.underline;
            ele.color = this.color;
            ele.newline = newline;
            if (last) {
                last.next = ele;
                ele.pre = last;
            }
            return ele;
        };
        HtmlElement.prototype.clear = function () {
            var next;
            while (next) {
                if (next.image) {
                    var images = emote_images;
                    if (next.imageTag > -1) {
                        images[next.imageTag] = null;
                        next.imageTag = -1;
                    }
                    next.image.remove();
                    next.image = null;
                }
                next = next.next;
            }
            this.next = null;
            this.pre = null;
            this.str = undefined;
            this.color = 0;
            this.image = undefined;
            this.imageTag = undefined;
        };
        return HtmlElement;
    }());
    rf.HtmlElement = HtmlElement;
    var regPro = /(color|size|face|href|target|width|height)=(['|"])(.*?)(['|"])/;
    var regTag = /<(font|u|a|image|b)([^\>]*?)\>/;
    var _imgtag = /({tag (.*?) (.*?)})/g;
    var _emotiontag = /\#[0-9]/g;
    var newLineChar = "∏々";
    function getTagStr(value) {
        var o = regTag.exec(value);
        if (undefined == o) {
            return undefined;
        }
        var tag = o[1];
        var flag = 1;
        var findTag = "<" + tag;
        var findTagLen = findTag.length;
        var endTag = "</" + tag;
        var endTagLen = endTag.length;
        var sindex;
        var findindex;
        var endindex;
        var test;
        sindex = o[0].length + o.index;
        while (flag) {
            findindex = value.indexOf(findTag, sindex);
            endindex = value.indexOf(endTag, sindex);
            if (findindex != -1 && findindex < endindex) {
                flag++;
                sindex = findindex + findTagLen;
            }
            else {
                if (endindex == -1) {
                    console.log("htmltext format error at tag " + tag + "\nvalue:" + value);
                    return undefined;
                }
                flag--;
                sindex = endindex + endTagLen;
            }
            test = value.slice(sindex);
        }
        endindex = value.indexOf(">", sindex);
        if (endindex == -1) {
            console.log("htmltext format error at tag " + tag + "\nvalue:" + value);
            return undefined;
        }
        var result = value.slice(o.index, endindex + 1);
        o[3] = value.slice(o.index + o[0].length, sindex - endTagLen);
        o[0] = result;
        return o;
    }
    function doFormatHtml(value, source, parent, last) {
        if (parent === void 0) { parent = null; }
        if (last === void 0) { last = null; }
        var html;
        var o;
        var str;
        var len;
        var i;
        if (parent) {
            if (parent.str || parent.image) {
                last = html = parent.createAndCopyFormat(last);
            }
            else {
                html = parent;
            }
        }
        var nextnew;
        o = getTagStr(value);
        if (o) {
            var index = o.index;
            if (index != 0) {
                str = value.slice(0, index);
                while ((i = str.indexOf(newLineChar)) != -1) {
                    if (html.str || parent.image) {
                        last = html = parent.createAndCopyFormat(last, nextnew);
                    }
                    html.str = str.slice(0, i);
                    nextnew = true;
                    str = str.slice(i + newLineChar.length);
                }
                if (html.str || parent.image) {
                    last = html = parent.createAndCopyFormat(last, nextnew);
                    if (str) {
                        nextnew = false;
                    }
                }
                if (nextnew) {
                    last = html = parent.createAndCopyFormat(last, nextnew);
                    html.str = str;
                }
                else {
                    html.str = str;
                }
                if (str) {
                    nextnew = false;
                }
            }
            value = value.slice(o.index + o[0].length);
            if (o[1] == "image") {
                var image = emote_images[o[3]];
                if (image) {
                    if (parent.str || parent.image) {
                        last = html = parent.createAndCopyFormat(last, html.newline);
                    }
                    html.imageTag = o[3];
                    html.image = image;
                    html.w = image.w;
                    html.h = image.h;
                    htmlProParser(o[1], o[2], html, html.image);
                }
            }
            else if (o[1] == "a") {
                if (parent.str || parent.image) {
                    last = html = parent.createAndCopyFormat(last, html.newline);
                }
                var text = rf.recyclable(TextALink);
                text.init(source, html.format);
                text.color = html.color;
                html.image = text;
                html.imageTag = -1;
                htmlProParser(o[1], o[2], html, text);
                text.text = o[3];
                html.w = text.w;
                html.h = text.h;
            }
            else if (o[1] == "b") {
                last = html = parent.createAndCopyFormat(last, html.newline);
                var format = parent.format;
                if (format.bold != "bold") {
                    format = format.clone();
                    format.bold = "bold";
                    format.init();
                }
                html.format = format;
                htmlProParser(o[1], o[2], html);
                last = doFormatHtml(o[3], source, html, last);
            }
            else {
                last = html = parent.createAndCopyFormat(last, nextnew);
                htmlProParser(o[1], o[2], html);
                last = doFormatHtml(o[3], source, html, last);
            }
            if (value.length) {
                last = html = parent.createAndCopyFormat(last);
                last = doFormatHtml(value, source, html, last);
            }
        }
        else {
            str = value;
            nextnew = false;
            while ((i = str.indexOf(newLineChar)) != -1) {
                if (html.str || parent.image) {
                    last = html = parent.createAndCopyFormat(last, nextnew);
                }
                html.str = str.slice(0, i);
                nextnew = true;
                str = str.slice(i + newLineChar.length);
            }
            if (html.str || parent.image) {
                last = html = parent.createAndCopyFormat(last, html.newline);
            }
            html.str = str;
            if (nextnew) {
                html.newline = nextnew;
                nextnew = false;
            }
        }
        return last;
    }
    rf.imageCreateFunctions = {};
    var imageTag = 0;
    function checkImage() {
        for (var i = 0; i < imageTag; i++) {
            if (emote_images[i] == null) {
                return i;
            }
        }
        return imageTag++;
    }
    function createImage(tag, value, source) {
        var funcParms = rf.imageCreateFunctions[tag];
        if (!funcParms) {
            return "";
        }
        var func = funcParms.func, thisobj = funcParms.thisobj;
        var imagevo = func.call(thisobj, value, source);
        var index = checkImage();
        emote_images[index] = imagevo.display;
        imagevo.display = undefined;
        var str = "<image>{0}</image>".substitute(index);
        return str;
    }
    function imageStrFormat(value, source) {
        var _strs;
        var len;
        var index = 0;
        var arr;
        _strs = "";
        value = value.replace(/\'#/g, "'$");
        value = value.replace(/\"#/g, "\"$");
        len = value.length;
        index = _imgtag.lastIndex = 0;
        var temp1;
        var temp;
        while (index < len) {
            arr = _imgtag.exec(value);
            if (arr) {
                temp1 = arr[0];
                temp = value.substring(index, _imgtag.lastIndex - temp1.length);
                if (temp) {
                    _strs += temp;
                }
                index = _imgtag.lastIndex;
                _strs += createImage(arr[2], arr[3], source);
            }
            else {
                temp = value.substring(index);
                if (temp) {
                    _strs += temp;
                }
                break;
            }
        }
        value = _strs;
        var imageCheck = 0;
        var i;
        var imageVO;
        var tag;
        if (rf.emotion) {
            do {
                i = value.indexOf("#", index);
                if (i == -1) {
                    break;
                }
                index = i + 1;
                imageCheck = 5;
                while (imageCheck > 2) {
                    tag = value.slice(i, i + imageCheck);
                    imageVO = rf.emotion[tag];
                    if (!imageVO) {
                        imageCheck--;
                        continue;
                    }
                    var s = _emotiontag.exec(tag);
                    var image = createImage("em", tag, source);
                    value = value.replace(tag, image);
                    break;
                }
            } while (i != -1);
        }
        value = value.replace(/\'\$/g, "'#");
        value = value.replace(/\"\$/g, "\"#");
        value = value.replace(/\'\$/g, "'#");
        return value;
    }
    function formatHtml(value, html, source) {
        value = value.replace(/<br\/>/g, newLineChar);
        value = value.replace(/\n/g, newLineChar);
        value = value.replace(/\&lt;/g, "<");
        value = value.replace(/\&gt;/g, ">");
        value = value.replace(/\&apos;/g, "'");
        value = value.replace(/\&quot;/g, '"');
        value = value.replace(/\&amp;/g, "&");
        value = imageStrFormat(value, source);
        doFormatHtml(value, source, html, html);
        var next;
        while (html) {
            if (html.pre && !html.str && !html.newline && !html.image) {
                html.pre.next = html.next;
                if (html.next) {
                    html.next.pre = html.pre;
                }
                html = html.next;
            }
            else {
                html = html.next;
            }
        }
    }
    rf.formatHtml = formatHtml;
    function htmlProParser(pro, value, html, sp) {
        regPro.lastIndex = 0;
        value = value.replace(/\s/g, "");
        var o = regPro.exec(value);
        var cloneFormat;
        while (o) {
            var p = o[1];
            var v = o[3];
            p = p.trim();
            if (p == "color") {
                html.color = Number(v.replace("#", "0x"));
            }
            else if (p == "href") {
                if (v.indexOf("event:") == 0) {
                    v = v.replace("event:", "");
                }
            }
            else if (p == "size") {
                var size = Number(v);
                var format = html.format;
                if (format.size != size) {
                    format = format.clone();
                    format.size = size;
                    format.init();
                    html.format = format;
                }
            }
            if (undefined != sp) {
                if (sp.hasOwnProperty(p)) {
                    sp[p] = v;
                }
            }
            else {
                if (p != "color" && html.hasOwnProperty(p)) {
                    html[p] = v;
                }
            }
            value = value.replace(o[0], "");
            o = regPro.exec(value);
        }
    }
    var Char = (function () {
        function Char() {
            this.ox = 0;
            this.sx = 0;
            this.ex = 0;
        }
        Char.prototype.onRecycle = function () {
            this.element = undefined;
            this.display = undefined;
        };
        return Char;
    }());
    rf.Char = Char;
    var Line = (function () {
        function Line() {
            this.w = 0;
            this.h = 0;
            this.chars = [];
        }
        return Line;
    }());
    rf.Line = Line;
    var TextLine = (function (_super) {
        __extends(TextLine, _super);
        function TextLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextLine.prototype.renderText = function (line) {
            this.removeAllChild();
            this.line = line;
            var h = line.h;
            var chars = line.chars;
            var len = chars.length;
            var g = this.graphics;
            g.clear();
            for (var i = 0; i < len; i++) {
                var char = chars[i];
                var ele = char.element;
                var display = char.display;
                if (display instanceof rf.Sprite) {
                    display.x = char.sx;
                    display.y = (h - display.h) >> 1;
                    this.addChild(display);
                }
                else {
                    g.drawBitmap(char.sx, h - display.h, display, undefined, undefined, ele.color);
                }
            }
            g.end();
        };
        return TextLine;
    }(rf.Sprite));
    rf.TextLine = TextLine;
    var TextALink = (function (_super) {
        __extends(TextALink, _super);
        function TextALink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TextALink;
    }(TextField));
    rf.TextALink = TextALink;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component(source) {
            var _this = _super.call(this, source) || this;
            _this._selected = false;
            _this._enabled = true;
            return _this;
        }
        Component.prototype.setSymbol = function (symbol, matrix) {
            this.symbol = symbol;
            if (!symbol) {
                var graphics = this.graphics;
                graphics.clear();
                graphics.end();
                return;
            }
            this.setPos(symbol.x, symbol.y);
            this.gotoAndStop(symbol.displayClip, true);
            this.updateHitArea();
            this.bindComponents();
        };
        Component.prototype.gotoAndStop = function (clip, refresh) {
            if (refresh === void 0) { refresh = false; }
            var _a = this, symbol = _a.symbol, graphics = _a.graphics, source = _a.source;
            if (symbol == undefined) {
                return;
            }
            if (this.currentClip == clip && !refresh) {
                return;
            }
            graphics.clear();
            this.currentClip = clip;
            var elements = symbol.displayFrames[clip];
            if (undefined == elements) {
                graphics.end();
                return;
            }
            var sp;
            var names;
            for (var i = 0; i < elements.length; i++) {
                var ele = elements[i];
                var type = ele.type, x = ele.x, y = ele.y, rect = ele.rect, name_2 = ele.name, matrix2d = ele.matrix2d;
                if (matrix2d instanceof ArrayBuffer) {
                    ele.matrix2d = matrix2d = new Float32Array(matrix2d);
                }
                if (type == 9) {
                    console.log("xxx");
                }
                if (rf.ComponentClass.hasOwnProperty(type + "")) {
                    sp = this[name_2];
                    if (!sp) {
                        if (type == 1) {
                            var textElement = ele;
                            var e_format = textElement.format, width = textElement.width, height = textElement.height, text = textElement.text, color = textElement.color, multiline = textElement.multiline;
                            var textfield = rf.recyclable(rf.TextField);
                            var format = rf.recyclable(rf.TextFormat).init();
                            format.size = e_format["size"] == undefined ? 12 : e_format["size"];
                            format.align = e_format["alignment"] == undefined ? "left" : e_format["alignment"];
                            format.init();
                            textfield.init(source, format);
                            textfield.color = color;
                            textfield.multiline = multiline;
                            if (textElement.input) {
                                textfield.type = "input";
                                textfield.mouseEnabled = true;
                            }
                            else {
                                textfield.type = "dynamic";
                            }
                            textfield.setSize(width, height);
                            if (text) {
                                textfield.text = text;
                            }
                            textfield.setPos(x, y);
                            this.addChild(textfield);
                            textfield.name = name_2;
                            this[name_2] = textfield;
                        }
                        else {
                            sp = rf.recyclable(rf.ComponentClass[type]);
                            sp.name = name_2;
                            sp.source = source;
                            sp.setSymbol(ele);
                            sp.locksize = true;
                            sp.setPos(x, y);
                            this.addChild(sp);
                            this[name_2] = sp;
                        }
                    }
                }
                else {
                    this.renderFrameElement(ele);
                }
            }
            graphics.end();
        };
        Component.prototype.setSize = function (width, height) {
            var _a = this, w = _a.w, h = _a.h, symbol = _a.symbol, locksize = _a.locksize;
            if (w == width && h == height) {
                return;
            }
            if (width == 0)
                width = 1;
            if (symbol) {
                var matrix2d = symbol.matrix2d;
                if (matrix2d.m2_decompose) {
                    var m = matrix2d.m2_decompose(rf.TEMP_MatrixComposeData);
                    m.scaleX = m.scaleX / w * width;
                    m.scaleY = m.scaleY / h * height;
                    matrix2d.m2_recompose(m);
                }
            }
            _super.prototype.setSize.call(this, width, height);
            var graphics = this.$graphics;
            if (graphics) {
                graphics.hitArea.clean();
                graphics.setSize(width, height);
            }
        };
        Component.prototype.addToStage = function () {
            _super.prototype.addToStage.call(this);
            this.simpleDispatch(23);
        };
        Component.prototype.removeFromStage = function () {
            _super.prototype.removeFromStage.call(this);
            this.simpleDispatch(24);
        };
        Component.prototype.renderFrameElement = function (element, clean) {
            var vo = this.source.getSourceVO(element.libraryItemName, 0);
            if (vo == undefined) {
                return;
            }
            var _a = this, graphics = _a.graphics, symbol = _a.symbol;
            if (clean) {
                graphics.clear();
            }
            var rect = element.rect, x = element.x, y = element.y, matrix2d = element.matrix2d;
            if (rect) {
                graphics.drawScale9Bitmap(x, y, vo, rect, symbol.matrix2d);
            }
            else {
                graphics.drawBitmap(x, y, vo, matrix2d);
            }
            if (clean) {
                graphics.end();
            }
        };
        Component.prototype.doResize = function () {
        };
        Object.defineProperty(Component.prototype, "selected", {
            get: function () { return this._selected; },
            set: function (value) { this._selected = value; this.doSelected(); },
            enumerable: true,
            configurable: true
        });
        Component.prototype.doSelected = function () { };
        Object.defineProperty(Component.prototype, "enabled", {
            get: function () { return this._enabled; },
            set: function (value) { if (this._enabled == value) {
                return;
            } this._enabled = value; this.doEnabled(); },
            enumerable: true,
            configurable: true
        });
        Component.prototype.doEnabled = function () { };
        Object.defineProperty(Component.prototype, "data", {
            get: function () { return this._data; },
            set: function (value) { this._data = value; this.doData(); },
            enumerable: true,
            configurable: true
        });
        Component.prototype.doData = function () { };
        Component.prototype.refreshData = function () { this.doData(); };
        Component.prototype.bindComponents = function () { };
        Component.prototype.awaken = function () { };
        Component.prototype.sleep = function () { };
        Component.prototype.setScrollRect = function (w, h, hStep, vStep, x, y) {
            if (hStep === void 0) { hStep = 0; }
            if (vStep === void 0) { vStep = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _a = this, renderer = _a.renderer, scroll = _a.scroll;
            if (!renderer) {
                this.renderer = renderer = new rf.BatchRenderer(this);
            }
            this.scrollRect = { x: x, y: y, w: w, h: h };
            if (!scroll) {
                this.scroll = scroll = new rf.Scroll(this);
                scroll.bind(this, 1, 1);
                scroll.hStep = hStep;
                scroll.vStep = vStep;
            }
            return scroll;
        };
        Component.prototype.clearScrollRect = function () {
            this.scrollRect = undefined;
            var scroll = this.scroll;
            if (scroll) {
                scroll.disbind(this);
                this.scroll = undefined;
            }
        };
        return Component;
    }(rf.Sprite));
    rf.Component = Component;
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Label.prototype, "label", {
            get: function () { var _a = this, _editable = _a._editable, txt_label = _a.txt_label, _label = _a._label; if (_editable) {
                return txt_label.text;
            } return _label; },
            set: function (value) { this._label = value + ""; this.doLabel(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "editable", {
            get: function () { return this._editable; },
            set: function (value) { this._editable = value; this.doEditable(); },
            enumerable: true,
            configurable: true
        });
        Label.prototype.doEditable = function () { };
        ;
        Label.prototype.bindComponents = function () {
        };
        Label.prototype.doLabel = function () {
            var _a = this, txt_label = _a.txt_label, _label = _a._label, _editable = _a._editable;
            if (txt_label) {
                txt_label.text = _label;
                this.textResize();
            }
        };
        Label.prototype.textResize = function () { };
        return Label;
    }(Component));
    rf.Label = Label;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var List = (function (_super) {
        __extends(List, _super);
        function List(source, Clazz, itemWidth, itemHeight, hgap, vgap, vertical, columnCount, offsetX, offsetY) {
            if (hgap === void 0) { hgap = 0; }
            if (vgap === void 0) { vgap = 0; }
            if (vertical === void 0) { vertical = true; }
            if (columnCount === void 0) { columnCount = 1; }
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            var _this = _super.call(this, source) || this;
            _this._selectIndex = -1;
            _this.option = {
                itemWidth: itemWidth + hgap,
                itemHeight: itemHeight + vgap,
                vertical: vertical,
                columnCount: columnCount,
                clazz: Clazz,
                hgap: hgap,
                vgap: vgap,
                offsetX: offsetX,
                offsetY: offsetY
            };
            _this.runtime = {
                selectedIndex: -1,
                displayCount: -1,
            };
            _this.caches = [];
            return _this;
        }
        List.prototype.setSize = function (width, height) {
            _super.prototype.setSize.call(this, width, height);
            this.simpleDispatch(2);
        };
        List.prototype.displayList = function (data) {
            this.datas = data;
            var _a = this, option = _a.option, runtime = _a.runtime, scroll = _a.scroll;
            runtime.start = -1;
            runtime.end = -1;
            runtime.selectedIndex = -1;
            this.clear();
            this.refreshList();
            var columnCount = option.columnCount, itemWidth = option.itemWidth, itemHeight = option.itemHeight, vertical = option.vertical, hgap = option.hgap, vgap = option.vgap, offsetX = option.offsetX, offsetY = option.offsetY;
            var len = data.length;
            var maxlen = Math.ceil(len / columnCount);
            if (vertical) {
                this.h = maxlen * itemHeight - vgap;
                this.w = columnCount * itemWidth - hgap;
            }
            else {
                this.w = maxlen * itemWidth - hgap;
                this.h = columnCount * itemHeight - vgap;
            }
            this.w += offsetX;
            this.y += offsetY;
            this.simpleDispatch(2);
            if (scroll) {
                scroll.resetOrigin();
                scroll.on(12, this.s_c, this);
            }
        };
        List.prototype.scrollXY = function (x, y) {
            var scroll = this.scroll;
            if (scroll) {
                scroll.scrollxy(x, y);
                scroll.on(12, this.s_c, this);
            }
        };
        List.prototype.s_c = function (e) {
            rf.callLater.later(this.d_c, this, 200);
        };
        List.prototype.d_c = function (e) {
            this.simpleDispatch(10, this);
        };
        List.prototype.clear = function () {
            var _a = this, runtime = _a.runtime, caches = _a.caches;
            var len = caches.length;
            for (var i = 0; i < len; i++) {
                var item = caches[i];
                item.selected = false;
                item.remove();
                item.__next = item.__pre = undefined;
                item.recycle();
                item.off(53, this.itemClickHandler, this);
            }
            caches.length = 0;
            runtime.first = runtime.last = undefined;
        };
        List.prototype.refreshList = function (event) {
            var _a = this, datas = _a.datas, runtime = _a.runtime;
            var displayCount = runtime.displayCount, first = runtime.first, last = runtime.last;
            var start, end, datalen;
            datalen = datas.length;
            if (displayCount == -1) {
                start = 0;
                end = datalen;
            }
            else {
                var _b = this, option = _b.option, scrollRect = _b.scrollRect;
                var vertical = option.vertical, itemWidth = option.itemWidth, itemHeight = option.itemHeight;
                if (vertical) {
                    start = Math.clamp(Math.floor(-scrollRect.y / itemHeight), 0, Math.max(0, datalen - displayCount));
                }
                else {
                    start = Math.clamp(Math.floor(-scrollRect.x / itemWidth), 0, Math.max(0, datalen - displayCount));
                }
                end = Math.min(start + displayCount, datalen);
            }
            if (runtime.start == start && runtime.end == end) {
                return;
            }
            runtime.start = start;
            runtime.end = end;
            if (first && (first.index > end || last.index < start)) {
                this.clear();
            }
            else {
                while (first) {
                    if (first.index >= start)
                        break;
                    var f = first.__next;
                    this.removeItem(first);
                    first = f;
                }
                runtime.first = first;
                while (last) {
                    if (last.index < end)
                        break;
                    var l = last.__pre;
                    this.removeItem(last);
                    last = l;
                }
                runtime.last = last;
            }
            if (first) {
                for (var i = first.index - 1; i >= start; i--) {
                    var ins = this.addItem(i, datas[i]);
                    first.__pre = ins;
                    ins.__next = first;
                    first = ins;
                }
                for (var i = last.index + 1; i < end; i++) {
                    var ins = this.addItem(i, datas[i]);
                    last.__next = ins;
                    ins.__pre = last;
                    last = ins;
                }
            }
            else {
                for (var i = start; i < end; i++) {
                    var ins = this.addItem(i, datas[i]);
                    if (!last) {
                        runtime.first = runtime.last = first = last = ins;
                    }
                    else {
                        last.__next = ins;
                        ins.__pre = last;
                        runtime.last = last = ins;
                    }
                }
            }
            runtime.first = first;
            runtime.last = last;
        };
        List.prototype.addItem = function (index, data) {
            var _a = this, caches = _a.caches, option = _a.option;
            var ins = caches[index];
            if (ins) {
                this.addChild(ins);
                return ins;
            }
            var clazz = option.clazz, itemWidth = option.itemWidth, itemHeight = option.itemHeight, columnCount = option.columnCount, hgap = option.hgap, vgap = option.vgap, vertical = option.vertical, offsetX = option.offsetX, offsetY = option.offsetY;
            ins = rf.recyclable(clazz, false, { source: this.source });
            ins.index = index;
            if (vertical) {
                ins.setPos((index % columnCount) * itemWidth + offsetX, Math.floor(index / columnCount) * itemHeight + offsetY);
            }
            else {
                ins.setPos(Math.floor(index / columnCount) * itemWidth + offsetX, (index % columnCount) * itemHeight + offsetY);
            }
            ins.on(53, this.itemClickHandler, this);
            ins.data = data;
            this.addChild(ins);
            caches[index] = ins;
            return ins;
        };
        List.prototype.removeItem = function (item) {
            item.remove();
            item.__next = item.__pre = item.data = undefined;
        };
        Object.defineProperty(List.prototype, "selectIndex", {
            get: function () {
                return this._selectIndex;
            },
            set: function (value) {
                var index = this.runtime.selectedIndex;
                var item;
                if (index != -1) {
                    if (index == value) {
                        return;
                    }
                    item = this.caches[index];
                    if (item) {
                        item.selected = false;
                    }
                }
                this.runtime.selectedIndex = value;
                this._selectIndex = value;
                item = this.caches[value];
                if (item) {
                    item.selected = true;
                    this.simpleDispatch(15, item);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "selectItem", {
            get: function () {
                var _a = this, caches = _a.caches, _selectIndex = _a._selectIndex;
                return caches[_selectIndex];
            },
            set: function (val) {
                var caches = this.caches;
                if (caches.indexOf(val) != -1) {
                    this.selectIndex = caches.indexOf(val);
                }
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.itemClickHandler = function (event) {
            var item = event.currentTarget;
            if (item.mouseEnabled) {
                this.selectItem = item;
            }
        };
        List.prototype.remove = function () {
            var item = this.selectItem;
            if (item)
                item.selected = false;
            _super.prototype.remove.call(this);
        };
        Object.defineProperty(List.prototype, "backward", {
            get: function () {
                var scroll = this.scroll;
                if (!scroll)
                    return false;
                return scroll.backward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "forward", {
            get: function () {
                var scroll = this.scroll;
                if (!scroll)
                    return false;
                return scroll.forward;
            },
            enumerable: true,
            configurable: true
        });
        return List;
    }(rf.Component));
    rf.List = List;
    var DynmList = (function (_super) {
        __extends(DynmList, _super);
        function DynmList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DynmList.prototype.displayList = function (data) {
            _super.prototype.displayList.call(this, data);
            var runtime = this.runtime;
            var last = runtime.last;
            if (last) {
                this.h = last.y + last.h;
                this.w = last.x + last.w;
            }
            else {
                this.w = this.h = 0;
            }
            this.simpleDispatch(2);
        };
        DynmList.prototype.addItem = function (index, data) {
            var ins = _super.prototype.addItem.call(this, index, data);
            var last = this.runtime.last;
            if (!last) {
                ins.setPos(0, 0, 0);
            }
            else {
                var _a = this.option, clazz = _a.clazz, itemWidth = _a.itemWidth, itemHeight = _a.itemHeight, columnCount = _a.columnCount, hgap = _a.hgap, vgap = _a.vgap, vertical = _a.vertical;
                if (vertical) {
                    ins.setPos(last.x, last.y + last.h + vgap, 0);
                }
                else {
                    ins.setPos(last.x + last.w + hgap, last.y, 0);
                }
            }
            return ins;
        };
        return DynmList;
    }(List));
    rf.DynmList = DynmList;
    var TestListItemRender = (function (_super) {
        __extends(TestListItemRender, _super);
        function TestListItemRender(source) {
            var _this = _super.call(this, source) || this;
            var g = _this.graphics;
            g.clear();
            g.drawRect(0, 0, 100, 20, Math.floor(Math.random() * 0xFFFFFF));
            g.end();
            _this.t = new rf.TextField();
            _this.addChild(_this.t);
            return _this;
        }
        TestListItemRender.prototype.doData = function () {
            this.t.text = this.index + "";
        };
        return TestListItemRender;
    }(rf.Component));
    rf.TestListItemRender = TestListItemRender;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Drager = (function (_super) {
        __extends(Drager, _super);
        function Drager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.vStep = 1;
            _this.hStep = 1;
            _this.areacheck = false;
            return _this;
        }
        Drager.prototype.updateScroll = function (scroll, dlen, mlen) {
            scroll.dlen = dlen;
            scroll.mlen = mlen;
            scroll.max = Math.max(0, mlen - dlen);
            scroll.pos = 0;
            return scroll;
        };
        Drager.prototype.setArea = function (w, h, width, height, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _a = this, rect = _a.rect, hStep = _a.hStep, vStep = _a.vStep, updateScroll = _a.updateScroll, target = _a.target;
            if (!rect) {
                this.rect = rect = { x: 0, y: 0, w: w, h: h };
            }
            else {
                rect.w = w;
                rect.h = h;
            }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            if (hStep > 0) {
                var hScroll = this.hScroll;
                if (!hScroll) {
                    this.hScroll = hScroll = {};
                }
                updateScroll(hScroll, w, width);
            }
            if (vStep > 0) {
                var vScroll = this.vScroll;
                if (!vScroll) {
                    this.vScroll = vScroll = {};
                }
                updateScroll(vScroll, h, height);
            }
            return this;
        };
        Drager.prototype.start = function () {
            var tweener = this.tweener;
            if (tweener) {
                rf.tweenEnd(tweener);
                this.tweener = undefined;
            }
        };
        Drager.prototype.update = function (ox, oy) {
            var _a = this, vStep = _a.vStep, hStep = _a.hStep, rect = _a.rect, vScroll = _a.vScroll, hScroll = _a.hScroll;
            if (hStep > 0) {
                ox += rect.x;
                if (ox > hScroll.max) {
                    ox = hScroll.max;
                }
                else if (ox < 0) {
                    ox = 0;
                }
                rect.x = ox;
            }
            if (vStep > 0) {
                oy += rect.y;
                if (oy > vScroll.max) {
                    oy = vScroll.max;
                }
                else if (oy < 0) {
                    oy = 0;
                }
                rect.y = oy;
            }
            this.refreshScroll();
        };
        Drager.prototype.end = function () {
            var _a = this, vStep = _a.vStep, hStep = _a.hStep, areacheck = _a.areacheck, rect = _a.rect, width = _a.width, height = _a.height;
            var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
            var o;
            if (hStep > 1) {
                var dx = x % hStep;
                if (Math.abs(dx) > hStep * .5) {
                    if (dx > 0) {
                        dx = Math.ceil(x / hStep) * hStep;
                    }
                    else {
                        dx = Math.floor(x / hStep) * hStep;
                    }
                }
                else {
                    if (dx > 0) {
                        dx = Math.floor(x / hStep) * hStep;
                    }
                    else {
                        dx = Math.ceil(x / hStep) * hStep;
                    }
                }
                x = dx;
                if (!o) {
                    o = { x: dx };
                }
                else {
                    o.x = dx;
                }
            }
            if (vStep > 1) {
                var dy = y % vStep;
                if (Math.abs(dy) > vStep * .5) {
                    if (dy > 0) {
                        dy = Math.ceil(y / vStep) * vStep;
                    }
                    else {
                        dy = Math.floor(y / vStep) * vStep;
                    }
                }
                else {
                    if (dy > 0) {
                        dy = Math.floor(y / vStep) * vStep;
                    }
                    else {
                        dy = Math.ceil(y / vStep) * vStep;
                    }
                }
                y = dy;
                if (!o) {
                    o = { y: dy };
                }
                else {
                    o.y = dy;
                }
            }
            if (areacheck) {
                if (hStep > 0) {
                    if (x + w > width) {
                        if (!o) {
                            o = { x: width - w };
                        }
                        else {
                            o.x = width - w;
                        }
                    }
                    else if (x < 0) {
                        if (!o) {
                            o = { x: 0 };
                        }
                        else {
                            o.x = 0;
                        }
                    }
                }
                if (vStep > 0) {
                    if (y + h > height) {
                        if (!o) {
                            o = { y: height - h };
                        }
                        else {
                            o.y = height - h;
                        }
                    }
                    else if (y < 0) {
                        if (!o) {
                            o = { y: 0 };
                        }
                        else {
                            o.y = 0;
                        }
                    }
                }
            }
            if (o) {
                var tweener = rf.tweenTo(o, 200, rf.defaultTimeMixer, rect);
                tweener.thisObj = this;
                tweener.update = this.refreshScroll;
                this.tweener = tweener;
            }
            else {
                this.refreshScroll();
            }
        };
        Drager.prototype.disbind = function (target) {
            if (this.target == target) {
                this.target = undefined;
            }
            target.off(50, this.mouseDownHandler, this);
        };
        Drager.prototype.bind = function (target, directionX, directionY) {
            target.on(50, this.mouseDownHandler, this);
            var t = target;
            t.dragDirX = directionX;
            t.dragDirY = directionY;
            return this;
        };
        Drager.prototype.mouseDownHandler = function (event) {
            var _a = this, mouseMoveHandler = _a.mouseMoveHandler, mouseUpHandler = _a.mouseUpHandler;
            this.currentDrager = event.currentTarget;
            rf.ROOT.on(60, mouseMoveHandler, this);
            rf.ROOT.on(53, mouseUpHandler, this);
            this.start();
        };
        Drager.prototype.mouseUpHandler = function (event) {
            rf.ROOT.off(60, this.mouseMoveHandler, this);
            rf.ROOT.off(53, this.mouseUpHandler, this);
            this.end();
        };
        Drager.prototype.mouseMoveHandler = function (event) {
            var _a = this.currentDrager, dragDirX = _a.dragDirX, dragDirY = _a.dragDirY;
            var _b = event.data, ox = _b.ox, oy = _b.oy;
            this.update(ox * dragDirX, oy * dragDirY);
        };
        Drager.prototype.refreshScroll = function (tweener) {
            var _a = this, hStep = _a.hStep, vStep = _a.vStep, rect = _a.rect, width = _a.width, height = _a.height, target = _a.target;
            var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
            if (hStep > 0) {
                var scroll_1 = this.hScroll;
                var max = scroll_1.max;
                if (x > 0) {
                    scroll_1.mlen = width + x;
                    scroll_1.pos = max;
                }
                else if (x < -max) {
                    scroll_1.mlen = width - x;
                    scroll_1.pos = 0;
                }
                else {
                    scroll_1.mlen = width;
                    scroll_1.pos = x;
                }
                this.hScroll.pos = scroll_1.pos;
            }
            if (vStep > 0) {
                var scroll_2 = this.vScroll;
                var max = scroll_2.max;
                if (y > 0) {
                    scroll_2.mlen = height + y;
                    scroll_2.pos = max;
                }
                else if (y < -max) {
                    scroll_2.mlen = height - y;
                    scroll_2.pos = Math.max(0, scroll_2.mlen - scroll_2.dlen);
                }
                else {
                    scroll_2.mlen = height;
                    scroll_2.pos = y;
                }
                this.vScroll.pos = scroll_2.pos;
            }
            this.simpleDispatch(12, this);
            if (target && (hStep || vStep)) {
                target.setPos(x + this.x, y + this.y);
            }
        };
        return Drager;
    }(rf.MiniDispatcher));
    rf.Drager = Drager;
    var Scroll = (function (_super) {
        __extends(Scroll, _super);
        function Scroll(target) {
            var _this = _super.call(this) || this;
            var scrollRect = target.scrollRect;
            _this.rect = scrollRect;
            var w = scrollRect.w, h = scrollRect.h;
            _this.areacheck = true;
            if (target.status | 32) {
                target.updateHitArea();
            }
            var width = target.w, height = target.h, x = target.x, y = target.y;
            _this.setArea(w, h, width, height, x, y);
            target.on(2, _this.resizeHandler, _this);
            _this.target = target;
            return _this;
        }
        Scroll.prototype.resizeHandler = function (event) {
            var _a = event.currentTarget, width = _a.w, height = _a.h;
            var _b = this.rect, w = _b.w, h = _b.h;
            this.setArea(w, h, width, height, this.x, this.y);
        };
        Scroll.prototype.resetOrigin = function () {
            this.rect.x = 0;
            this.rect.y = 0;
            this.end();
        };
        Scroll.prototype.scrollxy = function (x, y) {
            if (x)
                this.rect.x = -x;
            if (y)
                this.rect.y = -y;
            this.end();
        };
        Scroll.prototype.update = function (ox, oy) {
            var _a = this, vStep = _a.vStep, hStep = _a.hStep, rect = _a.rect, vScroll = _a.vScroll, hScroll = _a.hScroll;
            if (hStep > 0) {
                ox += rect.x;
                if (ox < -hScroll.max) {
                    ox = -hScroll.max;
                }
                else if (ox > 0) {
                    ox = 0;
                }
                rect.x = ox;
            }
            if (vStep > 0) {
                oy += rect.y;
                if (oy < -vScroll.max) {
                    oy = -vScroll.max;
                }
                else if (oy > 0) {
                    oy = 0;
                }
                rect.y = oy;
            }
            this.refreshScroll();
        };
        Scroll.prototype.end = function () {
            var _a = this, vStep = _a.vStep, hStep = _a.hStep, areacheck = _a.areacheck, rect = _a.rect, width = _a.width, height = _a.height;
            var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
            var o;
            if (hStep > 1) {
                var dx = x % hStep;
                if (Math.abs(dx) > hStep * .5) {
                    dx = Math.floor(x / hStep) * hStep;
                }
                else {
                    dx = Math.ceil(x / hStep) * hStep;
                }
                x = dx;
                if (!o) {
                    o = { x: dx };
                }
                else {
                    o.x = dx;
                }
            }
            if (vStep > 1) {
                var dy = y % vStep;
                if (Math.abs(dy) > vStep * .5) {
                    dy = Math.floor(y / vStep) * vStep;
                }
                else {
                    dy = Math.ceil(y / vStep) * vStep;
                }
                y = dy;
                if (!o) {
                    o = { y: dy };
                }
                else {
                    o.y = dy;
                }
            }
            if (areacheck) {
                if (hStep > 0) {
                    if (width > w) {
                        if (x + width < w) {
                            if (!o) {
                                o = { x: w - width };
                            }
                            else {
                                o.x = w - width;
                            }
                        }
                        else if (x > 0) {
                            if (!o) {
                                o = { x: 0 };
                            }
                            else {
                                o.x = 0;
                            }
                        }
                    }
                    else {
                        if (x != 0) {
                            if (!o) {
                                o = { x: 0 };
                            }
                            else {
                                o.x = 0;
                            }
                        }
                    }
                }
                if (vStep > 0) {
                    if (height > h) {
                        if (y + height < h) {
                            if (!o) {
                                o = { y: h - height };
                            }
                            else {
                                o.y = h - height;
                            }
                        }
                        else if (y > 0) {
                            if (!o) {
                                o = { y: 0 };
                            }
                            else {
                                o.y = 0;
                            }
                        }
                    }
                    else {
                        if (y != 0) {
                            if (!o) {
                                o = { y: 0 };
                            }
                            else {
                                o.y = 0;
                            }
                        }
                    }
                }
            }
            if (o) {
                var tweener = rf.tweenTo(o, 200, rf.defaultTimeMixer, rect);
                tweener.thisObj = this;
                tweener.update = this.refreshScroll;
                this.tweener = tweener;
            }
            else {
                this.refreshScroll();
            }
        };
        Object.defineProperty(Scroll.prototype, "backward", {
            get: function () {
                var _a = this, hStep = _a.hStep, hScroll = _a.hScroll, vScroll = _a.vScroll;
                var c = hStep > 0 ? hScroll.pos : vScroll.pos;
                var max = hStep > 0 ? hScroll.max : vScroll.max;
                return Math.abs(c) < max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scroll.prototype, "forward", {
            get: function () {
                var _a = this, hStep = _a.hStep, hScroll = _a.hScroll, vScroll = _a.vScroll;
                var c = hStep > 0 ? hScroll.pos : vScroll.pos;
                return c < 0;
            },
            enumerable: true,
            configurable: true
        });
        return Scroll;
    }(Drager));
    rf.Scroll = Scroll;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ScrollBar = (function (_super) {
        __extends(ScrollBar, _super);
        function ScrollBar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.step = 100;
            return _this;
        }
        ScrollBar.prototype.bindComponents = function () {
            this.on(59, this.mouseWheelHandler, this);
        };
        ScrollBar.prototype.bindScroll = function (scroll) {
            this.scroll = scroll;
            scroll.bind(this.btn_thumb, 0, -1);
            this.updateThumb();
            scroll.on(12, this.updateThumb, this);
        };
        ScrollBar.prototype.setSize = function (width, height) {
            var _a = this, btn_down = _a.btn_down, track = _a.track, btn_thumb = _a.btn_thumb, hitArea = _a.hitArea, scroll = _a.scroll;
            var sh = btn_down.h;
            var h = height - sh * 2;
            track.setSize(track.w, h);
            btn_down.y = h + sh;
            hitArea.clean();
            hitArea.updateArea(width, height, 0);
            if (scroll) {
                this.updateThumb();
            }
        };
        ScrollBar.prototype.updateThumb = function (e) {
            var _a = this, btn_down = _a.btn_down, track = _a.track, btn_thumb = _a.btn_thumb, scroll = _a.scroll;
            var vScroll = scroll.vScroll;
            var _b = scroll.vScroll, dlen = _b.dlen, mlen = _b.mlen, max = _b.max, pos = _b.pos;
            var h = track.h;
            var p = Math.min(1, dlen / mlen);
            btn_thumb.setSize(btn_thumb.w, h * p);
            btn_thumb.y = btn_down.h + (pos / mlen) * h;
        };
        ScrollBar.prototype.mouseWheelHandler = function (event) {
            var data = event.data;
        };
        ScrollBar.prototype.upHandler = function (event) {
            var sdata = this.scroll.vScroll;
            var step = this.step;
            this.scroll.update(0, step);
            this.scroll.end();
        };
        ScrollBar.prototype.downHandler = function (event) {
            var step = this.step;
            this.scroll.update(0, -step);
            this.scroll.end();
        };
        return ScrollBar;
    }(rf.Component));
    rf.ScrollBar = ScrollBar;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tweenTime = 500;
            _this.cur = 1;
            _this.max = 1;
            _this.dir = true;
            return _this;
        }
        ProgressBar.prototype.bindComponents = function () {
            _super.prototype.bindComponents.call(this);
            if (this.txt_label) {
                this.labelFunc = this.defalutLabelFunc;
            }
            var bar = this.bar;
            if (bar) {
                this.bw = bar.w;
                this.bh = bar.h;
            }
        };
        ProgressBar.prototype.loadbar = function (barurl) {
            var bar = this.bar;
            if (!bar) {
                this.bar = bar = new rf.Image(this.source, this.variables);
                this.addChild(bar);
                this.bw = bar.w;
                this.bh = bar.h;
            }
            bar.load(barurl);
            bar.on(4, this.barInit, this);
        };
        ProgressBar.prototype.barInit = function (e) {
            var _a = this, cur = _a.cur, max = _a.max;
            if (e) {
                e.currentTarget.off(e.type, this.barInit, this);
            }
            this.setProgress(cur, max);
        };
        ProgressBar.prototype.setProgress = function (cur, max) {
            this.cur = cur;
            this.max = max;
            var _a = this, bar = _a.bar, usetween = _a.usetween, _tween = _a._tween, tweenTime = _a.tweenTime;
            if (!bar)
                return;
            var g = bar.graphics;
            var gro = g.grometrys[0];
            if (!gro)
                return;
            if (usetween && _tween) {
                rf.tweenStop(_tween);
                _tween = undefined;
            }
            if (usetween) {
                _tween = rf.tweenTo({ dc: cur }, tweenTime, bar.tm, this);
                _tween.complete = this.tweenEnd.bind(this);
            }
            else {
                this.dc = cur;
            }
        };
        Object.defineProperty(ProgressBar.prototype, "dc", {
            get: function () {
                return this._c;
            },
            set: function (value) {
                this._c = value;
                var max = this.max;
                if (!max) {
                    return;
                }
                this.doProgress();
            },
            enumerable: true,
            configurable: true
        });
        ProgressBar.prototype.doProgress = function () {
            var _a = this, bar = _a.bar, labelFunc = _a.labelFunc, txt_label = _a.txt_label, bw = _a.bw, bh = _a.bh, dir = _a.dir, _c = _a._c, max = _a.max;
            if (!bar)
                return;
            var g = bar.graphics;
            var gro = g.grometrys[0];
            if (!gro)
                return;
            if (gro.rect) {
                bar.setSize(_c / max * bw, bh);
            }
            else {
                g.drawBitmap(0, 0, gro.vo, gro.matrix, gro, 0xFFFFFF, 1, 0, _c / max, 1.0, dir);
                g.end();
            }
            if (labelFunc != undefined && txt_label) {
                txt_label.text = labelFunc(_c, max);
            }
        };
        ProgressBar.prototype.tweenEnd = function (t) {
            this._tween = undefined;
        };
        ProgressBar.prototype.defalutLabelFunc = function (c, t) {
            return parseInt(c) + "/" + t;
        };
        return ProgressBar;
    }(rf.Component));
    rf.ProgressBar = ProgressBar;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Button.prototype.bindComponents = function () {
            this.mouseChildren = false;
            this.doEnabled();
        };
        Button.prototype.getObjectByPoint = function (dx, dy, scale) {
            return _super.prototype.getObjectByPoint.call(this, dx, dy, 1 / this._scaleX);
        };
        Button.prototype.doEnabled = function () {
            this.mouseEnabled = this._enabled;
        };
        Button.prototype.clipRefresh = function () {
            this.gotoAndStop(0);
        };
        Button.prototype.addClick = function (listener, thisObj) {
            this.on(56, listener, thisObj);
            return this;
        };
        Button.prototype.setface = function (url) {
            var icon = this.icon;
            if (!icon) {
                this.icon = icon = new rf.Image(this.source);
                this.addChild(icon);
            }
            icon.on(4, this.faceHandler, this);
            icon.load(url);
        };
        Button.prototype.faceHandler = function (event) {
            event.currentTarget.off(event.type, this.faceHandler, this);
            this.updateHitArea();
            this.bindComponents();
            this.locksize = true;
            this.simpleDispatch(4);
        };
        Button.prototype.setAniNum = function (font, nums, center, ox, oy) {
            if (center === void 0) { center = true; }
            if (!this.anifont) {
                var ani = new rf.FontRender(font, this.source);
                this.addChild(ani);
                ani.on(4, this.u_l, this);
                if (!center) {
                    ani.setPos(ox, oy);
                }
                this.anifont = ani;
                this.ox = ox;
                this.oy = oy;
            }
            this.anifont.updateVal(nums);
        };
        Button.prototype.u_l = function (e) {
            var _a = this, anifont = _a.anifont, w = _a.w, h = _a.h, ox = _a.ox, oy = _a.oy;
            anifont.setPos(ox ? ox : (w - anifont.w >> 1), oy ? oy : (h - anifont.h >> 1));
        };
        return Button;
    }(rf.Label));
    rf.Button = Button;
    var CheckBox = (function (_super) {
        __extends(CheckBox, _super);
        function CheckBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CheckBox.prototype.doEnabled = function () {
            _super.prototype.doEnabled.call(this);
            var _enabled = this._enabled;
            if (_enabled) {
                this.on(56, this.clickHandler, this);
            }
            else {
                this.off(56, this.clickHandler, this);
            }
        };
        CheckBox.prototype.clickHandler = function (event) {
            this.selected = !this._selected;
        };
        CheckBox.prototype.doSelected = function () {
            this.simpleDispatch(15, this._selected);
            this.clipRefresh();
        };
        CheckBox.prototype.clipRefresh = function () {
            var _selected = this._selected;
            this.gotoAndStop(_selected ? 1 : 0);
        };
        return CheckBox;
    }(Button));
    rf.CheckBox = CheckBox;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var RadioButtonGroup = (function (_super) {
        __extends(RadioButtonGroup, _super);
        function RadioButtonGroup(name) {
            var _this = _super.call(this) || this;
            _this._selectIndex = -1;
            _this.name = name;
            _this.list = [];
            RadioButtonGroup.groupDict[name] = _this;
            return _this;
        }
        RadioButtonGroup.getGroup = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var group = RadioButtonGroup.groupDict[name];
            if (!group) {
                group = new RadioButtonGroup(name);
            }
            args.forEach(function (element) {
                element.group = group;
                group.addRadioButton(element);
            });
            return group;
        };
        RadioButtonGroup.prototype.setTabmodel = function (parent, index, select) {
            if (select === void 0) { select = 0; }
            var list = this.list;
            this.tab_index = index;
            this.tab_parent = parent;
            for (var i = 0; i < list.length; i++) {
                var data = list[i].data;
                if (data)
                    data.remove();
            }
            this.selectIndex = select;
        };
        RadioButtonGroup.prototype.addRadioButton = function (radioButton) {
            var list = this.list;
            if (list.indexOf(radioButton) == -1) {
                radioButton.on(15, this.selectHandler, this);
                list.push(radioButton);
            }
        };
        RadioButtonGroup.prototype.removeRadioButton = function (radioButton) {
            var list = this.list;
            var i = list.indexOf(radioButton);
            if (i == -1) {
                return;
            }
            radioButton.off(15, this.selectHandler, this);
            list.splice(i, 1);
        };
        Object.defineProperty(RadioButtonGroup.prototype, "selectIndex", {
            get: function () {
                return this._selectIndex;
            },
            set: function (value) {
                var _a = this, list = _a.list, selectRadioButton = _a.selectRadioButton;
                this._selectIndex = value;
                if (value == -1) {
                    if (selectRadioButton) {
                        selectRadioButton.selected = false;
                        selectRadioButton.on(15, this.selectHandler, this);
                        var display = selectRadioButton.data;
                        if (display) {
                            display.remove();
                        }
                        this.selectRadioButton = undefined;
                    }
                    return;
                }
                var item = list[value];
                if (item) {
                    item.selected = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RadioButtonGroup.prototype, "selectItem", {
            set: function (val) {
                var _a = this, list = _a.list, _selectIndex = _a._selectIndex;
                if (_selectIndex == list.indexOf(val)) {
                    return;
                }
                this.selectIndex = list.indexOf(val);
            },
            enumerable: true,
            configurable: true
        });
        RadioButtonGroup.prototype.selectHandler = function (event) {
            var target = event.data;
            var _a = this, selectRadioButton = _a.selectRadioButton, list = _a.list, tab_parent = _a.tab_parent, tab_index = _a.tab_index;
            if (selectRadioButton == target) {
                if (!target._selected) {
                    this.selectRadioButton = undefined;
                    if (tab_parent) {
                        var display = target.data;
                        if (display) {
                            display.remove();
                        }
                    }
                }
                this.simpleDispatch(10);
                return;
            }
            if (target && target.selected) {
                if (selectRadioButton) {
                    selectRadioButton.selected = false;
                    selectRadioButton.on(15, this.selectHandler, this);
                    if (tab_parent) {
                        var display = selectRadioButton.data;
                        if (display) {
                            display.remove();
                        }
                    }
                }
                this._selectIndex = list.indexOf(target);
                this.selectRadioButton = target;
                if (tab_parent) {
                    var display = target.data;
                    if (display) {
                        tab_parent.addChildAt(display, tab_index);
                    }
                }
                if (!target.cancancle) {
                    target.off(15, this.selectHandler, this);
                }
                this.simpleDispatch(10, target);
            }
        };
        RadioButtonGroup.groupDict = {};
        return RadioButtonGroup;
    }(rf.MiniDispatcher));
    rf.RadioButtonGroup = RadioButtonGroup;
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton(source) {
            return _super.call(this, source) || this;
        }
        RadioButton.prototype.bindComponents = function () {
            _super.prototype.bindComponents.call(this);
            var name = this.name;
            var arr = name.split("_");
            if (arr.length == 3) {
                RadioButtonGroup.getGroup(arr[1], this);
            }
        };
        RadioButton.prototype.doSelected = function () {
            this.simpleDispatch(15, this);
            this.clipRefresh();
            if (!this._selected) {
                this.on(56, this.clickHandler, this);
            }
            else {
                if (!this.cancancle)
                    this.off(56, this.clickHandler, this);
            }
        };
        return RadioButton;
    }(rf.CheckBox));
    rf.RadioButton = RadioButton;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Facade = (function (_super) {
        __extends(Facade, _super);
        function Facade() {
            var _this = _super.call(this) || this;
            _this.SINGLETON_MSG = "Facade Singleton already constructed!";
            _this.mediatorMap = {};
            return _this;
        }
        Facade.prototype.toggle = function (m, type, params) {
            if (type === void 0) { type = -1; }
            var mediatorMap = this.mediatorMap;
            var mediator;
            if (m instanceof Mediator) {
                mediator = m;
            }
            else {
                mediator = rf.singleton(m);
            }
            if (!mediator.openParams)
                mediator.openParams = params;
            mediatorMap[mediator.name] = mediator;
            if (mediator.isReady == false && type == 0) {
                mediator.off(25, this.mediatorCompleteHandler, this);
                return mediator;
            }
            if (mediator.isReady == false && mediator.startSync()) {
                mediator.on(25, this.mediatorCompleteHandler, this, 10);
                return mediator;
            }
            this.togglepanel(mediator.panel, type);
            return mediator;
        };
        Facade.prototype.registerEvent = function (events, thisobj) {
            for (var key in events) {
                var fun = events[key];
                this.on(key, fun, thisobj);
            }
        };
        Facade.prototype.removeEvent = function (event, thisobj) {
            for (var key in event) {
                var fun = event[key];
                this.off(key, fun, thisobj);
            }
        };
        Facade.prototype.togglepanel = function (panel, type) {
            if (type === void 0) { type = -1; }
            switch (type) {
                case 1:
                    panel.isShow ? panel.bringTop() : panel.show();
                    break;
                case 0:
                    if (panel.isShow)
                        panel.hide();
                    break;
                case -1:
                    panel.isShow ? panel.hide() : panel.show();
                    break;
            }
        };
        Facade.prototype.mediatorCompleteHandler = function (event) {
            var mediator = event.data;
            mediator.off(25, this.mediatorCompleteHandler, this);
            this.togglepanel(mediator.panel, 1);
        };
        return Facade;
    }(rf.MiniDispatcher));
    rf.Facade = Facade;
    rf.facade = rf.singleton(Facade);
    var Mediator = (function (_super) {
        __extends(Mediator, _super);
        function Mediator(name) {
            var _this = _super.call(this) || this;
            _this.isReady = false;
            _this.weight = 1;
            _this.name = name;
            _this.mEventListeners = {};
            _this.eventInterests = {};
            _this.mediatorParams = { ox: 0, oy: 0, centerFlag: false, resizeable: false, haveFight: false };
            return _this;
        }
        Mediator.prototype.setPanel = function (panel) {
            if (this.panel) {
                rf.ThrowError("has panel");
            }
            this.panel = panel;
            this["$panel"] = panel;
            panel.on(56, this.panelClickHandler, this);
        };
        Mediator.prototype.panelClickHandler = function (event) {
            var _a = event.data, ctrl = _a.ctrl, shift = _a.shift;
            if (ctrl && shift) {
                event.stopImmediatePropagation = true;
                rf.ROOT.simpleDispatch("canvas_Event", this.panel.source);
            }
        };
        Mediator.prototype.startSync = function () {
            var panel = this.panel;
            var source = panel.source;
            if (source.status == 0) {
                panel.load();
            }
            if (source.status == 2) {
                this.preViewCompleteHandler(undefined);
            }
            else if (source.status == 1) {
                panel.on(4, this.preViewCompleteHandler, this);
            }
            return true;
        };
        Mediator.prototype.preViewCompleteHandler = function (e) {
            if (e) {
                var skin = e.currentTarget;
                skin.removeEventListener(4, this.preViewCompleteHandler, this);
                this.setBindView(true);
            }
            this.mediatorReadyHandle();
            this.simpleDispatch(25, this);
        };
        Mediator.prototype.awakenAndSleepHandle = function (e) {
            var type = e.type;
            switch (type) {
                case 23:
                    rf.facade.registerEvent(this.eventInterests, this);
                    if (this.isReady) {
                        this.awaken();
                        this.panelshow();
                    }
                    break;
                case 24:
                    rf.facade.removeEvent(this.eventInterests, this);
                    this.sleep();
                    this.panelhide();
                    break;
            }
        };
        Mediator.prototype.setBindView = function (isBind) {
            var panel = this.panel;
            if (isBind) {
                panel.on(23, this.awakenAndSleepHandle, this);
                panel.on(24, this.awakenAndSleepHandle, this);
            }
            else {
                panel.off(23, this.awakenAndSleepHandle, this);
                panel.off(24, this.awakenAndSleepHandle, this);
            }
        };
        Mediator.prototype.mediatorReadyHandle = function () {
            this.isReady = true;
            this.bindComponents();
            this.bindEventInterests();
            if (this.panel.isShow) {
                rf.facade.registerEvent(this.eventInterests, this);
                this.awaken();
            }
        };
        Mediator.prototype.bindEventInterests = function () {
        };
        Mediator.prototype.bindComponents = function () {
        };
        Mediator.prototype.sleep = function () {
        };
        Mediator.prototype.awaken = function () {
        };
        Mediator.prototype.onRemove = function () {
        };
        Mediator.prototype.panelshow = function () {
            var _a = this.mediatorParams, resizeable = _a.resizeable, centerFlag = _a.centerFlag;
            if (resizeable) {
                rf.Engine.addResize(this);
            }
            else if (centerFlag) {
                this.centerLayout();
            }
        };
        Mediator.prototype.panelhide = function () {
            var resizeable = this.mediatorParams.resizeable;
            if (resizeable) {
                rf.Engine.removeResize(this);
            }
        };
        Mediator.prototype.resize = function (width, height) {
            var centerFlag = this.mediatorParams.centerFlag;
            if (centerFlag) {
                this.centerLayout();
            }
        };
        Mediator.prototype.centerLayout = function () {
            var _a = this, panel = _a.panel, mediatorParams = _a.mediatorParams;
            var ox = mediatorParams.ox, oy = mediatorParams.oy;
            panel.setPos((rf.stageWidth - panel.w >> 1) + ox, (rf.stageHeight - panel.h >> 1) + oy);
            if (panel.y < 0) {
                panel.y = 0;
            }
        };
        Mediator.prototype.back = function () {
            this.panel.hide();
            return 0;
        };
        Mediator.prototype.saveParms = function () {
        };
        return Mediator;
    }(rf.MiniDispatcher));
    rf.Mediator = Mediator;
    var Panel = (function (_super) {
        __extends(Panel, _super);
        function Panel(uri, cls) {
            var _this = _super.call(this, rf.panelSourceLoad(uri)) || this;
            _this.m_hide = false;
            _this.m_a = 0.7;
            _this._mask = undefined;
            _this.clsName = cls;
            _this.mName = uri;
            _this.renderer = new rf.BatchRenderer(_this);
            _this.mouseEnabled = false;
            _this.mouseChildren = true;
            return _this;
        }
        Panel.prototype.render = function (camera, option) {
            var _a = this, source = _a.source, renderer = _a.renderer;
            if (!source || source.status != 2) {
                return;
            }
            if (undefined != renderer) {
                if (this.status & 19) {
                    this.updateSceneTransform();
                }
                this.renderer.render(camera, option);
            }
        };
        Panel.prototype.show = function (container) {
            var _a = this, isShow = _a.isShow, addp = _a.addp, isModel = _a.isModel, addPos = _a.addPos;
            if (!container) {
                container = addp ? addp : rf.popContainer;
            }
            if (isModel) {
                container.addChild(this.maskcon);
            }
            if (isShow) {
                this.bringTop();
                return;
            }
            if (addPos != undefined) {
                container.addChildAt(this, addPos);
            }
            else {
                container.addChild(this);
            }
            this.isShow = true;
            this.awaken();
            this.effectTween(1);
            this.on(50, this.bringTop, this);
            rf.facade.simpleDispatch(26, this.mName);
        };
        Panel.prototype.load = function () {
            var source = this.source;
            if (source.status == 2) {
                this.asyncsourceComplete();
                return;
            }
            if (source.status == 0) {
                source.status = 1;
                rf.facade.simpleDispatch(28, this.mName);
                rf.loadRes(rf.RES_PERFIX, source.name, source.loadConfigComplete, source, 1);
            }
            source.on(4, this.asyncsourceComplete, this);
            return source;
        };
        Panel.prototype.asyncsourceComplete = function (e) {
            if (e) {
                e.currentTarget.off(e.type, this.asyncsourceComplete, this);
                rf.facade.simpleDispatch(29);
            }
            var loadSource = this.source;
            var cs = loadSource.config.symbols[this.clsName];
            if (!cs) {
                return;
            }
            this.setSymbol(cs);
            this.setChange(12);
            this.simpleDispatch(4);
            this.locksize = true;
        };
        Panel.prototype.hide = function (e) {
            if (!this.isShow) {
                return;
            }
            this.isShow = false;
            if (this._mask) {
                this._mask.remove();
            }
            this.effectTween(0);
            this.off(50, this.bringTop, this);
            rf.facade.simpleDispatch(27, this.mName);
            this.simpleDispatch("PanelEvent_HIDE");
            this.graphics.clear();
            this.renderer.cleanBatch();
        };
        Panel.prototype.bringTop = function (e) {
            var parent = this.parent;
            if (parent == null)
                return;
            parent.addChild(this);
        };
        Panel.prototype.effectTween = function (type) {
            if (type == 0) {
                this.remove();
            }
        };
        Object.defineProperty(Panel.prototype, "maskcon", {
            get: function () {
                var _a = this, _mask = _a._mask, m_hide = _a.m_hide, m_a = _a.m_a;
                if (!_mask) {
                    _mask = new rf.Sprite();
                    var g = _mask.graphics;
                    g.clear();
                    g.drawRect(0, 0, rf.stageWidth, rf.stageHeight, 0, m_a);
                    g.end();
                    if (m_hide) {
                        _mask.on(56, this.hide, this);
                    }
                    this._mask = _mask;
                }
                return _mask;
            },
            enumerable: true,
            configurable: true
        });
        return Panel;
    }(rf.Component));
    rf.Panel = Panel;
    var TEventInteresterDele = (function (_super) {
        __extends(TEventInteresterDele, _super);
        function TEventInteresterDele(skin) {
            var _this = _super.call(this) || this;
            if (skin) {
                skin.mouseEnabled = false;
            }
            _this.eventInterests = {};
            _this._skin = skin;
            _this.bindEventInterests();
            _this.setBindView();
            _this.bindComponents();
            return _this;
        }
        TEventInteresterDele.prototype.bindEventInterests = function () {
        };
        TEventInteresterDele.prototype.bindComponents = function () {
        };
        TEventInteresterDele.prototype.setBindView = function () {
            var _skin = this._skin;
            _skin.addEventListener(23, this.awakenAndSleepHandle, this);
            _skin.addEventListener(24, this.awakenAndSleepHandle, this);
        };
        TEventInteresterDele.prototype.awakenAndSleepHandle = function (e) {
            var type = e.type;
            switch (type) {
                case 23:
                    rf.facade.registerEvent(this.eventInterests, this);
                    this.awaken();
                    break;
                case 24:
                    rf.facade.removeEvent(this.eventInterests, this);
                    this.sleep();
                    break;
            }
        };
        TEventInteresterDele.prototype.awaken = function () {
        };
        TEventInteresterDele.prototype.sleep = function () {
        };
        Object.defineProperty(TEventInteresterDele.prototype, "data", {
            get: function () { return this._data; },
            set: function (value) { this._data = value; this.doData(); },
            enumerable: true,
            configurable: true
        });
        TEventInteresterDele.prototype.doData = function () { };
        ;
        TEventInteresterDele.prototype.refreshData = function () { this.doData(); };
        return TEventInteresterDele;
    }(rf.MiniDispatcher));
    rf.TEventInteresterDele = TEventInteresterDele;
    var TasyncDele = (function (_super) {
        __extends(TasyncDele, _super);
        function TasyncDele(m, source) {
            var _this = _super.call(this, source) || this;
            _this.m = m;
            _this.on(23, _this.awakenAndSleepHandle, _this);
            _this.on(24, _this.awakenAndSleepHandle, _this);
            return _this;
        }
        TasyncDele.prototype.awakenAndSleepHandle = function (e) {
            var type = e.type;
            switch (type) {
                case 23:
                    this.awaken();
                    break;
                case 24:
                    this.sleep();
                    break;
            }
        };
        TasyncDele.prototype.awaken = function () {
            var target = this.target;
            var mediator;
            if (!target) {
                mediator = rf.singleton(this.m);
                this.mname = mediator.name;
                this.target = mediator;
                mediator.panel.addp = this;
                rf.facade.toggle(this.m, 1);
                if (mediator.isReady) {
                    this.addChild(mediator.panel);
                    this.sizeHandler();
                }
                else {
                    mediator.on(25, this.sizeHandler, this);
                }
            }
            else {
                mediator = rf.facade.mediatorMap[this.mname];
                mediator.mName = this.mname;
                if (mediator.isReady) {
                    this.addChild(mediator.panel);
                    this.sizeHandler();
                    rf.facade.simpleDispatch(26, mediator.mName);
                }
                else {
                    mediator.on(25, this.sizeHandler, this);
                }
            }
        };
        TasyncDele.prototype.sizeHandler = function (e) {
            if (e) {
                e.currentTarget.off(25, this.sizeHandler, this);
            }
            var mediator = rf.facade.mediatorMap[this.mname];
            var _a = mediator.panel, w = _a.w, h = _a.h;
            this.setSize(w, h);
        };
        return TasyncDele;
    }(rf.Component));
    rf.TasyncDele = TasyncDele;
    var ItemRender = (function (_super) {
        __extends(ItemRender, _super);
        function ItemRender(uri, cls) {
            var _this = _super.call(this, rf.panelSourceLoad(uri)) || this;
            var config = _this.source.config;
            var cs = config.symbols[cls];
            if (!cs) {
                return _this;
            }
            _this.setSymbol(cs);
            return _this;
        }
        return ItemRender;
    }(rf.Component));
    rf.ItemRender = ItemRender;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var PanelSource = (function (_super) {
        __extends(PanelSource, _super);
        function PanelSource() {
            var _this = _super.call(this) || this;
            _this.status = 0;
            return _this;
        }
        PanelSource.prototype.loadConfigComplete = function (event) {
            if (event.type != 4) {
                this.status = 3;
                return;
            }
            var resItem = event.currentTarget;
            var url = resItem.url;
            if (url != this.name)
                return;
            var config = resItem.data;
            this.config = config;
            url = "p3d/" + config.image + ".png";
            rf.loadRes(rf.RES_PERFIX, url, this.loadImageComplete, this, 5);
        };
        PanelSource.prototype.loadImageComplete = function (event) {
            if (event.type != 4) {
                this.status = 3;
                return;
            }
            var bmd = this.bmd = rf.BitmapData.fromImageElement(event.data);
            var area = this.setArea(rf.BitmapSource.DEFAULT, 0, 0, bmd.width, bmd.height);
            var frames = this.config.frames;
            area.frames = frames;
            this.width = bmd.width;
            this.height = bmd.height;
            var vo = frames["emptyTextarea"];
            if (vo) {
                this.setArea(rf.BitmapSource.PACK, vo.x, vo.y, vo.w, vo.h);
                var evo = this.setSourceVO("origin", 1, 1);
                bmd.fillRect(evo.x, evo.y, evo.w, evo.h, "#FFFFFF");
                this.originU = evo.ul;
                this.originV = evo.vt;
            }
            this.status = 2;
            this.simpleDispatch(4);
        };
        return PanelSource;
    }(rf.BitmapSource));
    rf.PanelSource = PanelSource;
    function panelSourceLoad(url) {
        url = rf.getFullUrl("p3d/" + url, ".p3d");
        var source = rf.bitmapSources[url];
        if (!source) {
            rf.bitmapSources[url] = source = new PanelSource();
            source.name = url;
            source.textureData = rf.context3D.getTextureData(source.name, false);
        }
        return source;
    }
    rf.panelSourceLoad = panelSourceLoad;
    function source_transparent_check(source, vo, x, y) {
        var w = vo.w, h = vo.h, ul = vo.ul, ur = vo.ur, vt = vo.vt, vb = vo.vb;
        ul = (x / w) * (ur - ul) + ul;
        vt = (y / h) * (vb - vt) + vt;
        var data = source.bmd.getImageData(ul * source.width, vt * source.height, 1, 1).data;
        return data[3] != 0;
    }
    rf.source_transparent_check = source_transparent_check;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Buffer3D = (function () {
        function Buffer3D() {
            this.preusetime = 0;
            this.gctime = 3000;
            this.readly = false;
        }
        Buffer3D.prototype.awaken = function () { };
        ;
        Buffer3D.prototype.sleep = function () { };
        ;
        Buffer3D.prototype.onRecycle = function () {
            this.readly = false;
            this.preusetime = 0;
        };
        return Buffer3D;
    }());
    rf.Buffer3D = Buffer3D;
    var Program3D = (function (_super) {
        __extends(Program3D, _super);
        function Program3D() {
            var _this = _super.call(this) || this;
            _this.uniforms = {};
            _this.attribs = {};
            _this.gctime = 60000;
            return _this;
        }
        Program3D.prototype.awaken = function () {
            if (undefined != this.program) {
                return true;
            }
            if (!this.vertexCode || !this.fragmentCode) {
                console.log("vertexCode or fragmentCode is empty");
                return false;
            }
            var g = rf.gl;
            this.vShader = this.createShader(this.vertexCode, g.VERTEX_SHADER);
            this.fShader = this.createShader(this.fragmentCode, g.FRAGMENT_SHADER);
            this.program = g.createProgram();
            g.attachShader(this.program, this.vShader);
            g.attachShader(this.program, this.fShader);
            g.linkProgram(this.program);
            if (!g.getProgramParameter(this.program, rf.gl.LINK_STATUS)) {
                this.dispose();
                console.log("create program error:" + g.getProgramInfoLog(this.program));
                return false;
            }
            rf.context3D.bufferLink.add(this, this, undefined);
            this.readly = true;
            return true;
        };
        Program3D.prototype.dispose = function () {
            var g = rf.gl;
            if (this.vShader) {
                g.detachShader(this.program, this.vShader);
                g.deleteShader(this.vShader);
                this.vShader = null;
            }
            if (this.fShader) {
                g.detachShader(this.program, this.fShader);
                g.deleteShader(this.fShader);
                this.fShader = null;
            }
            if (this.program) {
                g.deleteProgram(this.program);
                this.program = null;
            }
        };
        Program3D.prototype.recycle = function () {
            this.dispose();
            this.preusetime = 0;
            this.readly = false;
            this.uniforms = {};
            this.attribs = {};
        };
        Program3D.prototype.createShader = function (code, type) {
            var g = rf.gl;
            var shader = g.createShader(type);
            g.shaderSource(shader, code);
            g.compileShader(shader);
            if (!g.getShaderParameter(shader, g.COMPILE_STATUS)) {
                var error = g.getShaderInfoLog(shader);
                g.deleteShader(shader);
                console.log(error);
                throw new Error(error);
            }
            return shader;
        };
        return Program3D;
    }(Buffer3D));
    rf.Program3D = Program3D;
    var VertexBuffer3D = (function (_super) {
        __extends(VertexBuffer3D, _super);
        function VertexBuffer3D() {
            var _this = _super.call(this) || this;
            _this.numVertices = 0;
            _this.data32PerVertex = 0;
            _this.buffer = null;
            _this.attribarray = {};
            return _this;
        }
        VertexBuffer3D.prototype.recycle = function () {
            var g = rf.gl;
            var att = rf.context3D.attribarray;
            var _a = this, buffer = _a.buffer, attribarray = _a.attribarray;
            if (buffer) {
                for (var t in attribarray) {
                    attribarray[t] = false;
                    att[t] = false;
                    g.bindBuffer(g.ARRAY_BUFFER, buffer);
                    g.disableVertexAttribArray(~~t);
                }
                g.deleteBuffer(buffer);
                this.buffer = undefined;
            }
            this.readly = false;
            this.preusetime = 0;
        };
        VertexBuffer3D.prototype.awaken = function () {
            if (!this.data || !this.data32PerVertex || !this.numVertices) {
                this.readly = false;
                rf.ThrowError("vertexBuffer3D unavailable");
                return false;
            }
            var g = rf.gl;
            if (undefined == this.buffer) {
                this.buffer = g.createBuffer();
            }
            g.bindBuffer(g.ARRAY_BUFFER, this.buffer);
            g.bufferData(g.ARRAY_BUFFER, this.data.vertex, g.STATIC_DRAW);
            g.bindBuffer(g.ARRAY_BUFFER, null);
            this.readly = true;
            rf.context3D.bufferLink.add(this);
            return true;
        };
        VertexBuffer3D.prototype.uploadFromVector = function (data, startVertex, numVertices) {
            if (startVertex === void 0) { startVertex = 0; }
            if (numVertices === void 0) { numVertices = -1; }
            if (data instanceof rf.VertexInfo) {
                this.data = data;
                this.numVertices = data.numVertices;
                this.readly = false;
                return;
            }
            if (0 > startVertex) {
                startVertex = 0;
            }
            var nd;
            var data32PerVertex = this.data32PerVertex;
            if (numVertices != -1) {
                this.numVertices = data.length / data32PerVertex;
                if (this.numVertices - startVertex < numVertices) {
                    rf.ThrowError("numVertices out of range");
                    return;
                }
                if (this.numVertices != numVertices && startVertex == 0) {
                    this.numVertices = numVertices;
                    nd = new Float32Array(data32PerVertex * numVertices);
                    nd.set(data.slice(startVertex * data32PerVertex, numVertices * data32PerVertex));
                    data = nd;
                }
            }
            if (0 < startVertex) {
                if (numVertices == -1) {
                    numVertices = data.length / data32PerVertex - startVertex;
                }
                nd = new Float32Array(data32PerVertex * numVertices);
                nd.set(data.slice(startVertex * data32PerVertex, numVertices * data32PerVertex));
                data = nd;
                this.numVertices = numVertices;
            }
            else {
                if (false == (data instanceof Float32Array)) {
                    data = new Float32Array(data);
                }
                this.numVertices = data.length / data32PerVertex;
            }
            this.data = new rf.VertexInfo(data, data32PerVertex);
        };
        VertexBuffer3D.prototype.uploadContext = function (program) {
            if (false == this.readly) {
                if (false == this.awaken()) {
                    throw new Error("create VertexBuffer error!");
                }
            }
            var loc = -1;
            var g = rf.gl;
            var att = rf.context3D.attribarray;
            var attribs = program.attribs;
            var p = program.program;
            var attribarray = this.attribarray;
            g.bindBuffer(g.ARRAY_BUFFER, this.buffer);
            var variables = this.data.variables;
            for (var variable in variables) {
                if (true == (variable in attribs)) {
                    loc = attribs[variable];
                }
                else {
                    loc = g.getAttribLocation(p, variable);
                    attribs[variable] = loc;
                }
                if (loc < 0) {
                    continue;
                }
                var o = variables[variable];
                g.vertexAttribPointer(loc, o.size, g.FLOAT, false, this.data32PerVertex * 4, o.offset * 4);
                attribarray[loc] = true;
                if (true != att[loc]) {
                    g.enableVertexAttribArray(loc);
                    att[loc] = true;
                }
            }
            this.preusetime = rf.engineNow;
        };
        return VertexBuffer3D;
    }(Buffer3D));
    rf.VertexBuffer3D = VertexBuffer3D;
    var IndexBuffer3D = (function (_super) {
        __extends(IndexBuffer3D, _super);
        function IndexBuffer3D() {
            var _this = _super.call(this) || this;
            _this.quadid = -1;
            return _this;
        }
        IndexBuffer3D.prototype.recycle = function () {
            if (this.buffer) {
                rf.gl.deleteBuffer(this.buffer);
                this.buffer = undefined;
            }
            this.readly = false;
            this.preusetime = 0;
        };
        IndexBuffer3D.prototype.awaken = function () {
            if (true == this.readly) {
                if (undefined == this.buffer) {
                    rf.ThrowError("indexBuffer readly is true but buffer is null");
                    return false;
                }
                return true;
            }
            if (!this.data) {
                this.readly = false;
                rf.ThrowError("indexData unavailable");
                return false;
            }
            var g = rf.gl;
            if (undefined == this.buffer) {
                this.buffer = g.createBuffer();
            }
            g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, this.buffer);
            g.bufferData(g.ELEMENT_ARRAY_BUFFER, this.data, g.STATIC_DRAW);
            g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, null);
            this.readly = true;
            rf.context3D.bufferLink.add(this);
        };
        IndexBuffer3D.prototype.uploadFromVector = function (data, startOffset, count) {
            if (startOffset === void 0) { startOffset = 0; }
            if (count === void 0) { count = -1; }
            if (0 > startOffset) {
                startOffset = 0;
            }
            if (count != -1) {
                if (this.numIndices - startOffset < count) {
                    rf.ThrowError("VectorData out of range");
                    return;
                }
            }
            if (0 < startOffset) {
                if (-1 == count) {
                    count = data.length - startOffset;
                }
                var nd = new Uint16Array(count);
                nd.set(data.slice(startOffset, startOffset + count));
                data = nd;
            }
            else {
                if (false == (data instanceof Uint16Array)) {
                    data = new Uint16Array(data);
                }
            }
            this.numIndices = data.length;
            this.data = data;
        };
        return IndexBuffer3D;
    }(Buffer3D));
    rf.IndexBuffer3D = IndexBuffer3D;
    var Texture = (function (_super) {
        __extends(Texture, _super);
        function Texture() {
            var _this = _super.call(this) || this;
            _this.width = 0;
            _this.height = 0;
            _this.status = 0;
            return _this;
        }
        Texture.prototype.awaken = function () {
            var tex = this.texture;
            var g = rf.gl;
            var data = this.pixels;
            if (data instanceof rf.BitmapData) {
                data = data.canvas;
            }
            if (undefined == tex) {
                this.texture = tex = g.createTexture();
            }
            g.bindTexture(g.TEXTURE_2D, tex);
            var textureData = this.data;
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, textureData.mag);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, textureData.mix);
            var pepeat = textureData.repeat;
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, pepeat);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, pepeat);
            var _a = this, width = _a.width, height = _a.height;
            if (data) {
                g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, data);
                width = data.width;
                height = data.height;
            }
            else {
                if (!this.floatData) {
                    this.floatData = new Uint8Array(width * height * 4);
                }
                g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, width, height, 0, g.RGBA, g.UNSIGNED_BYTE, this.floatData);
            }
            if (textureData.mipmap) {
                g.generateMipmap(g.TEXTURE_2D);
            }
            this.readly = true;
            rf.context3D.bufferLink.add(this);
            return true;
        };
        Texture.prototype.uploadContext = function (program, variable) {
            if (false == this.readly) {
                this.awaken();
            }
            var index = rf.context3D.texIndex++;
            var uniforms = program.uniforms;
            var g = rf.gl;
            var index_tex;
            index_tex = uniforms[variable];
            if (undefined == index_tex) {
                index_tex = g.getUniformLocation(program.program, variable);
                uniforms[variable] = index_tex;
            }
            if (undefined != index_tex) {
                g.activeTexture(g["TEXTURE" + index]);
                g.uniform1i(index_tex, index);
                g.bindTexture(g.TEXTURE_2D, this.texture);
            }
            this.preusetime = rf.engineNow;
        };
        Texture.prototype.load = function (url) {
            if (undefined == url) {
                url = this.data.url;
            }
            if (0 == this.status) {
                this.status = 1;
                rf.loadRes(rf.RES_PERFIX, url, this.loadComplete, this, 5);
            }
        };
        Texture.prototype.loadComplete = function (e) {
            if (e.type == 4) {
                this.status = 2;
                var image = e.data;
                this.width = image.width;
                this.height = image.height;
                this.pixels = image;
            }
            else {
                this.status = 3;
            }
        };
        Texture.prototype.recycle = function () {
            if (this.texture) {
                rf.gl.deleteTexture(this.texture);
                this.texture = undefined;
            }
            this.readly = false;
        };
        return Texture;
    }(Buffer3D));
    rf.Texture = Texture;
    var RTTexture = (function (_super) {
        __extends(RTTexture, _super);
        function RTTexture() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.setting = {};
            return _this;
        }
        RTTexture.prototype.awaken = function () {
            var b = _super.prototype.awaken.call(this);
            var g = rf.gl;
            if (b) {
                var _a = this, frameBuffer = _a.frameBuffer, renderBuffer = _a.renderBuffer, texture = _a.texture, width = _a.width, height = _a.height;
                if (!frameBuffer) {
                    this.frameBuffer = frameBuffer = g.createFramebuffer();
                }
                g.bindFramebuffer(g.FRAMEBUFFER, frameBuffer);
                if (!renderBuffer) {
                    this.renderBuffer = renderBuffer = g.createRenderbuffer();
                }
                g.bindRenderbuffer(g.RENDERBUFFER, renderBuffer);
                g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, width, height);
                g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, renderBuffer);
                g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, texture, 0);
                g.bindRenderbuffer(g.RENDERBUFFER, undefined);
                g.bindFramebuffer(g.FRAMEBUFFER, undefined);
            }
            return b;
        };
        RTTexture.prototype.recycle = function () {
            var g = rf.gl;
            var _a = this, frameBuffer = _a.frameBuffer, renderBuffer = _a.renderBuffer, texture = _a.texture;
            if (frameBuffer) {
                g.deleteFramebuffer(frameBuffer);
                this.frameBuffer = undefined;
            }
            if (renderBuffer) {
                g.deleteRenderbuffer(renderBuffer);
                this.renderBuffer = undefined;
            }
            if (texture) {
                g.deleteTexture(texture);
                this.texture = undefined;
            }
            this.readly = false;
        };
        return RTTexture;
    }(Texture));
    rf.RTTexture = RTTexture;
    var CubeTexture = (function (_super) {
        __extends(CubeTexture, _super);
        function CubeTexture() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.setting = {};
            _this.files = ["nx", 'ny', 'nz', 'px', 'py', 'pz'];
            _this.status = 0;
            return _this;
        }
        CubeTexture.prototype.awaken = function () {
            var tex = this.texture;
            var g = rf.gl;
            var data = [];
            var _a = this.cubePixels, nx = _a[0], ny = _a[1], nz = _a[2], px = _a[3], py = _a[4], pz = _a[5];
            var textureData = this.data;
            if (undefined == tex) {
                this.texture = tex = g.createTexture();
            }
            g.bindTexture(g.TEXTURE_CUBE_MAP, tex);
            g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, textureData.mag);
            g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, textureData.mix);
            var pepeat = textureData.repeat;
            g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_WRAP_S, pepeat);
            g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_WRAP_T, pepeat);
            g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, px);
            g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, nx);
            g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, py);
            g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, ny);
            g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, pz);
            g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, nz);
            if (textureData.mipmap) {
                g.generateMipmap(g.TEXTURE_CUBE_MAP);
            }
            g.bindTexture(g.TEXTURE_CUBE_MAP, null);
            this.readly = true;
            rf.context3D.bufferLink.add(this);
            return true;
        };
        CubeTexture.prototype.uploadContext = function (program, variable) {
            if (false == this.readly) {
                this.awaken();
            }
            var index = rf.context3D.texIndex++;
            var uniforms = program.uniforms;
            var g = rf.gl;
            var index_tex;
            g.activeTexture(rf.gl["TEXTURE" + index]);
            g.bindTexture(g.TEXTURE_CUBE_MAP, this.texture);
            if (true == uniforms.hasOwnProperty(variable)) {
                index_tex = uniforms[variable];
            }
            else {
                index_tex = g.getUniformLocation(program.program, variable);
                uniforms[variable] = index_tex;
            }
            if (undefined != index_tex) {
                g.uniform1i(index_tex, index);
            }
            this.preusetime = rf.engineNow;
        };
        CubeTexture.prototype.load = function (url, type) {
            if (type === void 0) { type = '.jpg'; }
            if (undefined == url) {
                url = this.data.url;
            }
            if (url.charAt(url.length - 1) != '/') {
                url += '/';
            }
            this.cubePixels = [];
            if (0 == this.status) {
                this.status = 1;
                var files = this.files;
                for (var i = 0; i < files.length; i++) {
                    var face = files[i];
                    rf.loadRes(rf.RES_PERFIX, url + face + type, this.loadComplete, this, 5);
                }
            }
        };
        CubeTexture.prototype.loadComplete = function (e) {
            if (e.type == 4) {
                var res = e.currentTarget;
                var image = e.data;
                this.width = image.width;
                this.height = image.height;
                var index = res.url.lastIndexOf('/');
                var fname = res.url.slice(index + 1);
                fname = fname.split('.')[0];
                index = this.files.indexOf(fname);
                this.cubePixels[index] = image;
                var b = true;
                for (var i = 0; i < 6; ++i) {
                    var pixels = this.cubePixels[i];
                    if (pixels == undefined) {
                        b = false;
                    }
                }
                if (b) {
                    this.status = 2;
                }
            }
            else {
                this.status = 3;
            }
        };
        CubeTexture.prototype.recycle = function () {
            if (this.texture) {
                rf.gl.deleteTexture(this.texture);
                this.texture = undefined;
            }
            this.readly = false;
        };
        return CubeTexture;
    }(Texture));
    rf.CubeTexture = CubeTexture;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Context3D = (function () {
        function Context3D() {
            this.logarithmicDepthBuffer = true;
            this.use_logdepth_ext = false;
            this.texIndex = 0;
            this.attribarray = {};
            this.defauleMag = 9728;
            this.textureObj = {};
            this.rttTextures = [];
            this.programs = {};
            this.bufferLink = new rf.Link();
            this.bufferLink.warningMax = 3000;
        }
        Context3D.prototype.createEmptyContext3DSetting = function () {
            var setting = {};
            setting.cull = 0;
            setting.depth = true;
            setting.depthMode = 515;
            setting.src = 770;
            setting.dst = 771;
            return setting;
        };
        Context3D.prototype.configureBackBuffer = function (width, height, antiAlias, enableDepthAndStencil) {
            if (antiAlias === void 0) { antiAlias = 0; }
            if (enableDepthAndStencil === void 0) { enableDepthAndStencil = true; }
            console.log("configureBackBuffer:" + width + "  " + height);
            var g = rf.gl;
            g.canvas.width = width;
            g.canvas.height = height;
            this.backBufferWidth = width;
            this.backBufferHeight = height;
            g.viewport(0, 0, width, height);
            this._clearBit = g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT | g.STENCIL_BUFFER_BIT;
            g.disable(g.DEPTH_TEST);
            g.disable(g.CULL_FACE);
            g.enable(g.BLEND);
            g.colorMask(true, true, true, true);
            this.setting = this.createEmptyContext3DSetting();
            this.render_setting = {};
            g.activeTexture(g.TEXTURE0);
            g.activeTexture(g.TEXTURE1);
        };
        Context3D.prototype.lossScissor = function (rect) {
            var current = rf.scissorRect;
            var g = rf.gl;
            if (current && !rect) {
                g.disable(g.SCISSOR_TEST);
            }
            rf.scissorRect = rect;
            if (rect) {
                var y = rect.y, h = rect.h;
                y = Math.max(this.backBufferHeight - y - h, 0);
                rf.gl.scissor(rect.x, y, rect.w, h);
            }
        };
        Context3D.prototype.setScissor = function (rect, sceneX, sceneY) {
            var current = rf.scissorRect;
            var temp_rect = rf.TEMP_RECT;
            var x;
            var y;
            var w;
            var h;
            if (!rect) {
                if (current) {
                    var g = rf.gl;
                    g.disable(g.SCISSOR_TEST);
                }
            }
            else {
                x = rect.x;
                y = rect.y;
                w = rect.w;
                h = rect.h;
                var v = rf.TEMP_VECTOR3D;
                v.x = sceneX - x;
                v.y = sceneY - y;
                v.z = 0;
                v.w = 1;
                rf.contextMatrix.m3_transformVector(v, v);
                x = v.x;
                y = v.y;
                v.x = sceneX - rect.x + w;
                v.y = sceneY - rect.y + h;
                rf.contextMatrix.m3_transformVector(v, v);
                w = v.x - x;
                h = v.y - y;
                if (!current) {
                    var g = rf.gl;
                    g.enable(g.SCISSOR_TEST);
                    temp_rect.x = x;
                    temp_rect.y = y;
                    temp_rect.w = w;
                    temp_rect.h = h;
                }
                else {
                    temp_rect.x = x;
                    temp_rect.y = y;
                    temp_rect.w = w;
                    temp_rect.h = h;
                    rf.size_intersection(current, temp_rect, temp_rect);
                    x = temp_rect.x;
                    y = temp_rect.y;
                    w = temp_rect.w;
                    h = temp_rect.h;
                }
                rf.scissorRect = { x: x, y: y, w: w, h: h };
            }
            y = Math.max(this.backBufferHeight - y - h, 0);
            rf.gl.scissor(x, y, w, h);
            if (current) {
                return { x: current.x, y: current.y, w: current.w, h: current.h };
            }
            else {
                return undefined;
            }
        };
        Context3D.prototype.clear = function (red, green, blue, alpha, depth, stencil, mask) {
            if (red === void 0) { red = 0.0; }
            if (green === void 0) { green = 0.0; }
            if (blue === void 0) { blue = 0.0; }
            if (alpha === void 0) { alpha = 1.0; }
            if (depth === void 0) { depth = 1.0; }
            if (stencil === void 0) { stencil = 0; }
            if (mask === void 0) { mask = 0xffffffff; }
            var g = rf.gl;
            g.clear(this._clearBit);
        };
        Context3D.prototype.updateSetting = function (render_setting) {
            var g = rf.gl;
            var _a = this.setting, cull = _a.cull, depth = _a.depth, depthMode = _a.depthMode, src = _a.src, dst = _a.dst;
            if (cull != render_setting.cull) {
                if (cull == 0) {
                    g.disable(g.CULL_FACE);
                }
                else {
                    g.enable(g.CULL_FACE);
                    g.cullFace(cull);
                }
                render_setting.cull = cull;
            }
            if (depth != render_setting.depth || depthMode != render_setting.depthMode) {
                render_setting.depth = depth;
                render_setting.depthMode = depthMode;
                if (depth == false && render_setting.depthMode == g.ALWAYS) {
                    g.disable(g.DEPTH_TEST);
                    g.depthMask(depth);
                    g.depthFunc(depthMode);
                }
                else {
                    g.enable(g.DEPTH_TEST);
                    g.depthMask(depth);
                    g.depthFunc(depthMode);
                }
            }
            if (src != render_setting.src || dst != render_setting.dst) {
                render_setting.src = src;
                render_setting.dst = dst;
                g.blendFunc(src, dst);
            }
        };
        Context3D.prototype.createVertexBuffer = function (data, data32PerVertex, startVertex, numVertices, CLS) {
            if (data32PerVertex === void 0) { data32PerVertex = -1; }
            if (startVertex === void 0) { startVertex = 0; }
            if (numVertices === void 0) { numVertices = -1; }
            if (!CLS) {
                CLS = rf.VertexBuffer3D;
            }
            var buffer = rf.recyclable(CLS);
            if (data instanceof rf.VertexInfo) {
                buffer.data32PerVertex = data.data32PerVertex;
            }
            else {
                if (data32PerVertex == -1) {
                    rf.ThrowError("mast set data32PerVertex");
                    return null;
                }
                buffer.data32PerVertex = data32PerVertex;
            }
            buffer.uploadFromVector(data, startVertex, numVertices);
            return buffer;
        };
        Context3D.prototype.getIndexByQuad = function (quadCount) {
            var count = 1000;
            if (quadCount > count) {
                rf.ThrowError("你要这么多四边形干嘛？");
                return null;
            }
            if (undefined == this.indexByte) {
                var byte = new Uint16Array(count * 6);
                count *= 4;
                var j = 0;
                for (var i = 0; i < count; i += 4) {
                    byte[j++] = i;
                    byte[j++] = i + 1;
                    byte[j++] = i + 3;
                    byte[j++] = i + 1;
                    byte[j++] = i + 2;
                    byte[j++] = i + 3;
                }
                this.indexByte = this.createIndexBuffer(byte);
            }
            return this.indexByte;
        };
        Context3D.prototype.createIndexBuffer = function (data) {
            var buffer = rf.recyclable(rf.IndexBuffer3D);
            if (data instanceof ArrayBuffer) {
                buffer.uploadFromVector(new Uint16Array(data));
            }
            else {
                buffer.uploadFromVector(data);
            }
            return buffer;
        };
        Context3D.prototype.getTextureData = function (url, mipmap, mag, mix, repeat, y) {
            var defauleMag = this.defauleMag;
            var data = {};
            data.url = url;
            data.mipmap = undefined != mipmap ? mipmap : false;
            data.mag = undefined != mag ? mag : defauleMag;
            data.mix = undefined != mix ? mix : defauleMag;
            data.repeat = undefined != repeat ? repeat : 33071;
            return data;
        };
        Context3D.prototype.createTexture = function (key, pixels) {
            var texture = rf.recyclable(rf.Texture);
            texture.key = key.key ? key.key : (key.key = key.url + "_" + key.mipmap + "_" + key.mag + "_" + key.mix + "_" + key.repeat);
            texture.data = key;
            texture.pixels = pixels;
            if (pixels) {
                texture.width = pixels.width;
                texture.height = pixels.height;
            }
            this.textureObj[key.key] = texture;
            return texture;
        };
        Context3D.prototype.createEmptyTexture = function (key, width, height) {
            var texture = rf.recyclable(rf.Texture);
            texture.key = key.key ? key.key : (key.key = key.url + "_" + key.mipmap + "_" + key.mag + "_" + key.mix + "_" + key.repeat);
            texture.data = key;
            texture.width = width;
            texture.height = height;
            this.textureObj[key.key] = texture;
            return texture;
        };
        Context3D.prototype.createRttTexture = function (key, width, height) {
            var texture = new rf.RTTexture();
            texture.key = key.key ? key.key : (key.key = key.url + "_" + key.mipmap + "_" + key.mag + "_" + key.mix + "_" + key.repeat);
            texture.data = key;
            texture.width = width;
            texture.height = height;
            this.textureObj[key.key] = texture;
            return texture;
        };
        Context3D.prototype.createCubeTexture = function (key) {
            var texture = new rf.CubeTexture();
            texture.key = key.key ? key.key : (key.key = key.url + "_" + key.mipmap + "_" + key.mag + "_" + key.mix + "_" + key.repeat);
            texture.data = key;
            this.textureObj[key.key] = texture;
            return texture;
        };
        Context3D.prototype.setRenderToTexture = function (texture, enableDepthAndStencil, antiAlias, surfaceSelector, colorOutputIndex) {
            if (enableDepthAndStencil === void 0) { enableDepthAndStencil = true; }
            if (antiAlias === void 0) { antiAlias = 0; }
            if (surfaceSelector === void 0) { surfaceSelector = 0; }
            if (colorOutputIndex === void 0) { colorOutputIndex = 0; }
            var g = rf.gl;
            this.rttTextures.push(texture);
            if (!texture.readly) {
                if (false == texture.awaken()) {
                    return;
                }
            }
            var frameBuffer = texture.frameBuffer, renderBuffer = texture.renderBuffer, textureObj = texture.texture, width = texture.width, height = texture.height, cleanColor = texture.cleanColor;
            g.viewport(0, 0, width, height);
            g.bindFramebuffer(g.FRAMEBUFFER, frameBuffer);
            if (enableDepthAndStencil) {
                texture.cleanBit = g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT | g.STENCIL_BUFFER_BIT;
            }
            else {
                texture.cleanBit = g.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT | g.STENCIL_BUFFER_BIT;
            }
            texture.setting.src = -1;
            if (cleanColor) {
                g.clearColor(cleanColor.x, cleanColor.y, cleanColor.z, cleanColor.w);
            }
            else {
                g.clearColor(0, 0, 0, 0);
            }
            texture.preusetime = rf.engineNow;
            g.clear(texture.cleanBit);
        };
        Context3D.prototype.setRenderToBackBuffer = function () {
            var g = rf.gl;
            var _a = this, rttTextures = _a.rttTextures, render_setting = _a.render_setting;
            rttTextures.pop();
            var texture = rttTextures[rttTextures.length - 1];
            if (texture) {
                var frameBuffer = texture.frameBuffer, width = texture.width, height = texture.height;
                g.bindFramebuffer(g.FRAMEBUFFER, frameBuffer);
                g.viewport(0, 0, width, height);
            }
            else {
                var _b = this, backBufferWidth = _b.backBufferWidth, backBufferHeight = _b.backBufferHeight;
                g.bindFramebuffer(g.FRAMEBUFFER, null);
                g.viewport(0, 0, backBufferWidth, backBufferHeight);
            }
            render_setting.cull = 0;
            render_setting.depth = false;
            render_setting.depthMode = 0;
            render_setting.src = 0;
            render_setting.dst = 0;
        };
        Context3D.prototype.createProgram = function (vertexCode, fragmentCode, key) {
            var program;
            if (undefined != key) {
                program = this.programs[key];
                if (undefined == program) {
                    this.programs[key] = program = rf.recyclable(rf.Program3D);
                }
            }
            else {
                program = rf.recyclable(rf.Program3D);
            }
            program.vertexCode = vertexCode;
            program.fragmentCode = fragmentCode;
            return program;
        };
        Context3D.prototype.setProgramConstantsFromVector = function (variable, data, format, array, numstr) {
            if (array === void 0) { array = true; }
            if (numstr === void 0) { numstr = "f"; }
            var p = this.cProgram;
            var uniforms = p.uniforms;
            var g = rf.gl;
            var index;
            if (true == (variable in uniforms)) {
                index = uniforms[variable];
            }
            else {
                index = g.getUniformLocation(p.program, variable);
                uniforms[variable] = index;
            }
            if (undefined != index) {
                if (array) {
                    g['uniform' + format + numstr + 'v'](index, data);
                }
                else {
                    g['uniform' + format + numstr](index, data);
                }
            }
        };
        Context3D.prototype.setProgramConstantsFromMatrix = function (variable, rawData) {
            var p = this.cProgram;
            var uniforms = p.uniforms;
            var g = rf.gl;
            var index;
            if (true == (variable in uniforms)) {
                index = uniforms[variable];
            }
            else {
                index = g.getUniformLocation(p.program, variable);
                uniforms[variable] = index;
            }
            if (undefined != index) {
                g.uniformMatrix4fv(index, false, rawData);
            }
        };
        Context3D.prototype.setProgram = function (program) {
            if (!program)
                return;
            program.preusetime = rf.engineNow;
            if (false == program.readly) {
                if (false == program.awaken()) {
                    rf.ThrowError("program create error!");
                    return -1;
                }
            }
            else {
                if (program == this.cProgram)
                    return 1;
            }
            this.cProgram = program;
            rf.gl.useProgram(program.program);
            return 0;
        };
        Context3D.prototype.drawTriangles = function (indexBuffer, numTriangles, setting, offset) {
            if (offset === void 0) { offset = 0; }
            var g = rf.gl;
            this.updateSetting(setting || this.render_setting);
            if (undefined != indexBuffer) {
                if (false == indexBuffer.readly) {
                    if (false == indexBuffer.awaken()) {
                        throw new Error("create indexBuffer error!");
                    }
                }
                indexBuffer.preusetime = rf.engineNow;
                g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                g.drawElements(g.TRIANGLES, numTriangles * 3, g.UNSIGNED_SHORT, offset * 6);
            }
            else {
                g.drawArrays(g.TRIANGLES, 0, numTriangles * 3);
            }
            this.triangles += numTriangles;
            this.dc++;
            this.texIndex = 0;
        };
        Context3D.prototype.gc = function (now) {
            var link = this.bufferLink;
            var vo = link.getFrist();
            var hasChange = false;
            while (vo) {
                if (false == vo.close) {
                    var buffer = vo.data;
                    if (now - buffer.preusetime > buffer.gctime) {
                        buffer.recycle();
                        vo.close = true;
                        hasChange = true;
                    }
                }
                vo = vo.next;
            }
            if (hasChange)
                link.clean();
        };
        Context3D.prototype.toString = function () {
            var link = this.bufferLink;
            var vo = link.getFrist();
            var v = 0, t = 0, p = 0, i = 0;
            while (vo) {
                if (false == vo.close) {
                    var buffer = vo.data;
                    if (buffer instanceof rf.VertexBuffer3D) {
                        v++;
                    }
                    else if (buffer instanceof rf.IndexBuffer3D) {
                        i++;
                    }
                    else if (buffer instanceof rf.Texture) {
                        t++;
                    }
                    else if (buffer instanceof rf.Program3D) {
                        p++;
                    }
                }
                vo = vo.next;
            }
            return "p:" + p + " i:" + i + " v:" + v + " t:" + t;
        };
        return Context3D;
    }());
    rf.Context3D = Context3D;
    function webGLSimpleReport() {
        var g = rf.gl;
        g.getParameter(g.MAX_VERTEX_ATTRIBS);
        g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS);
        g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS);
        g.getParameter(g.MAX_VARYING_VECTORS);
        g.getParameter(g.MAX_TEXTURE_IMAGE_UNITS);
        return {};
    }
    rf.webGLSimpleReport = webGLSimpleReport;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Light = (function (_super) {
        __extends(Light, _super);
        function Light() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.color = 0xFFFFFF;
            _this.intensity = 1.0;
            _this.lookVector = rf.newVector3D(0, 0, 0);
            return _this;
        }
        Light.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (this.status | 1) {
                var _a = this, transform = _a.transform, lookVector = _a.lookVector, sceneTransform = _a.sceneTransform, len = _a.len;
                this.updateTransform();
                this.sceneTransform.m3_invert(transform);
                this.worldTranform.m3_append(len, false, sceneTransform);
            }
            this.status = 0;
            return 0;
        };
        return Light;
    }(rf.Camera));
    rf.Light = Light;
    var DirectionalLight = (function (_super) {
        __extends(DirectionalLight, _super);
        function DirectionalLight() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lightoffset = rf.newVector3D();
            _this.normalsize = rf.newVector3D();
            return _this;
        }
        DirectionalLight.prototype.setDirectional = function (x, y, z) {
            this.setPos(x, y, z);
            this.normalsize.v3_normalize(this.pos);
        };
        DirectionalLight.prototype.setSunOffset = function (x, y, z) {
            var _a = this.lightoffset, tx = _a[0], ty = _a[1], tz = _a[2];
            this.setPos(x + tx, y + ty, z + tz);
        };
        return DirectionalLight;
    }(Light));
    rf.DirectionalLight = DirectionalLight;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var SceneObject = (function (_super) {
        __extends(SceneObject, _super);
        function SceneObject(variables, mouseEnabled, source) {
            var _this = _super.call(this, source, variables) || this;
            _this.distance = Number.MAX_VALUE;
            if (mouseEnabled) {
                _this.minBoundingBox = new rf.OBB();
                _this.boundingSphere = new rf.Sphere();
                _this.distance = Number.MAX_VALUE;
            }
            return _this;
        }
        SceneObject.prototype.update = function (now, interval) {
        };
        SceneObject.prototype.addChild = function (child) {
            if (child instanceof SceneObject) {
                var scene_1 = this.scene;
                child.scene = scene_1;
                if (scene_1) {
                    scene_1.childChange = true;
                }
            }
            _super.prototype.addChild.call(this, child);
        };
        Object.defineProperty(SceneObject.prototype, "available", {
            get: function () {
                return undefined != this.geometry;
            },
            enumerable: true,
            configurable: true
        });
        SceneObject.prototype.addChildAt = function (child, index) {
            if (child instanceof SceneObject) {
                var scene_2 = this.scene;
                child.scene = scene_2;
                if (scene_2) {
                    scene_2.childChange = true;
                }
            }
            _super.prototype.addChildAt.call(this, child, index);
        };
        SceneObject.prototype.removeChild = function (child) {
            if (undefined == child) {
                return;
            }
            _super.prototype.removeChild.call(this, child);
            if (child instanceof SceneObject) {
                if (child.scene) {
                    child.removeFromStage();
                }
                child.scene = undefined;
                rf.scene.childChange = true;
            }
        };
        SceneObject.prototype.removeAllChild = function () {
            var childrens = this.childrens;
            var len = childrens.length;
            for (var i = 0; i < len; i++) {
                var child = childrens[i];
                child.stage = undefined;
                child.parent = undefined;
                if (child instanceof SceneObject) {
                    child.scene = undefined;
                }
                child.removeFromStage();
            }
            this.childrens.length = 0;
        };
        SceneObject.prototype.removeFromStage = function () {
            var childrens = this.childrens;
            var len = childrens.length;
            for (var i = 0; i < len; i++) {
                var child = childrens[i];
                child.stage = undefined;
                if (child instanceof SceneObject) {
                    child.scene = undefined;
                }
                child.removeFromStage();
            }
        };
        SceneObject.prototype.addToStage = function () {
            var _a = this, childrens = _a.childrens, scene = _a.scene, stage = _a.stage;
            var len = childrens.length;
            for (var i = 0; i < len; i++) {
                var child = childrens[i];
                child.stage = stage;
                if (child instanceof SceneObject) {
                    child.scene = scene;
                }
                child.addToStage();
            }
        };
        SceneObject.prototype.renderShadow = function (sun, p, c, worldTranform, now, interval) {
            var _a = this, geometry = _a.geometry, sceneTransform = _a.sceneTransform;
            geometry.vertex.uploadContext(p);
            worldTranform.m3_append(sun.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
        };
        SceneObject.prototype.raycast = function (raycaster, intersects) {
            var geometry = this.geometry;
            if (!geometry)
                return intersects;
            if (this.minBoundingBox == undefined || this.minBoundingBox.change) {
                var obb = this.minBoundingBox = rf.OBB.updateOBBByGeometry(geometry, this.minBoundingBox);
                geometry.centerPoint.set([(obb.minx + obb.maxx) * 0.5, (obb.miny + obb.maxy) * 0.5, (obb.minz + obb.maxz) * 0.5, 1]);
            }
            if (this.boundingSphere == undefined || this.boundingSphere.change) {
                this.boundingSphere = geometry.calculateBoundingSphere(geometry.centerPoint, this.boundingSphere);
            }
            var sphere = SceneObject.sphere;
            sphere.copyFrom(this.boundingSphere);
            sphere.applyMatrix4(this.sceneTransform, sphere);
            if (raycaster.ray.intersectsSphere(sphere) == false) {
                return intersects;
            }
            var ray = SceneObject.ray;
            ray.copyFrom(raycaster.ray).applyMatrix4(this.invSceneTransform);
            var intersectPoint = ray.intersectBox(this.minBoundingBox);
            if (intersectPoint == null) {
                return intersects;
            }
            this.sceneTransform.m3_transformVector(intersectPoint, intersectPoint);
            rf.TEMP_VECTOR3D.set(raycaster.ray.origin);
            rf.TEMP_VECTOR3D.v3_sub(intersectPoint, rf.TEMP_VECTOR3D);
            var distance = rf.TEMP_VECTOR3D.v3_length;
            if (distance < raycaster.near || distance > raycaster.far) {
                return intersects;
            }
            intersects = intersects || [];
            intersects.push({ "obj": this, "distance": distance, "point": intersectPoint });
            return intersects;
        };
        SceneObject.sphere = new rf.Sphere();
        SceneObject.ray = new rf.Ray();
        return SceneObject;
    }(rf.Sprite));
    rf.SceneObject = SceneObject;
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(variables, mouseEnabled) {
            var _this = _super.call(this, variables) || this;
            _this.scene = _this;
            if (mouseEnabled) {
                _this.hitArea = new rf.HitArea();
                _this.hitArea.allWays = true;
                _this.rayCaster = new rf.Raycaster(50000);
            }
            else {
                _this.mouseChildren = false;
                _this.mouseEnabled = false;
            }
            return _this;
        }
        Scene.prototype.render = function (camera, option) {
            var _a = this, _camera = _a.camera, childrens = _a.childrens;
            var c = rf.context3D;
            var g = rf.gl;
            if (undefined == _camera) {
                _camera = camera;
            }
            if (_camera.status) {
                _camera.updateSceneTransform();
            }
            if (childrens.length) {
                _super.prototype.render.call(this, _camera, option);
            }
        };
        Scene.prototype.getObjectByPoint = function (dx, dy, scale) {
            if (!this.mouseEnabled) {
                return;
            }
            if (this.camera == undefined) {
                return;
            }
            var mx = 2 * dx / rf.stageWidth - 1;
            var my = -2 * dy / rf.stageHeight + 1;
            this.rayCaster.setFromCamera(mx, my, this.camera);
            var intersects = this.rayCaster.intersectObjects(this.childrens, false);
            if (intersects.length) {
                return intersects[0].obj;
            }
            else {
                return _super.prototype.getObjectByPoint.call(this, dx, dy, scale);
            }
        };
        return Scene;
    }(SceneObject));
    rf.Scene = Scene;
    var AllActiveSprite = (function (_super) {
        __extends(AllActiveSprite, _super);
        function AllActiveSprite(source, variables) {
            var _this = _super.call(this, source, variables) || this;
            _this.hitArea.allWays = true;
            _this.mouseEnabled = false;
            return _this;
        }
        return AllActiveSprite;
    }(rf.Sprite));
    rf.AllActiveSprite = AllActiveSprite;
    var NoActiveSprite = (function (_super) {
        __extends(NoActiveSprite, _super);
        function NoActiveSprite(source, variables) {
            var _this = _super.call(this, source, variables) || this;
            _this.mouseEnabled = false;
            _this.mouseChildren = false;
            return _this;
        }
        return NoActiveSprite;
    }(rf.Sprite));
    rf.NoActiveSprite = NoActiveSprite;
    var Stage3D = (function (_super) {
        __extends(Stage3D, _super);
        function Stage3D() {
            var _this = _super.call(this) || this;
            _this.names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
            _this.renderOption = {};
            _this.renderer = new rf.BatchRenderer(_this);
            _this.shadow = new ShadowEffect(2300, 3000);
            _this.renderLink = new rf.Link();
            _this.stage = _this;
            return _this;
        }
        Stage3D.prototype.requestContext3D = function (canvas) {
            this.canvas = canvas;
            var contextAttributes = {};
            if (rf.isMobile) {
                contextAttributes.antialias = false;
            }
            else {
                contextAttributes.antialias = true;
            }
            contextAttributes.stencil = false;
            contextAttributes.depth = true;
            var names = this.names;
            for (var i = 0; i < names.length; i++) {
                try {
                    rf.gl = this.canvas.getContext(names[i], contextAttributes);
                }
                catch (e) {
                }
                if (rf.gl) {
                    break;
                }
            }
            if (undefined == rf.gl) {
                rf.context3D = null;
                this.simpleDispatch(18, "webgl is not available");
                return false;
            }
            rf.context3D = rf.singleton(rf.Context3D);
            rf.singleton(rf.Mouse).init();
            this.simpleDispatch(9, rf.gl);
            return true;
        };
        Stage3D.prototype.update = function (now, interval) {
            if (this.status & 16) {
                _super.prototype.updateSceneTransform.call(this, 0);
            }
            var _a = this, renderLink = _a.renderLink, shadow = _a.shadow, renderOption = _a.renderOption, camera = _a.camera;
            if (shadow && rf.scene.childChange) {
                renderLink.onRecycle();
                this.filterRenderList(rf.scene, renderLink);
                rf.scene.childChange = false;
            }
            var c = rf.context3D;
            c.dc = 0;
            c.triangles = 0;
            c.clear(0, 0, 0, 1);
            if (shadow && renderLink.length) {
                shadow.render(renderLink, rf.scene.sun, now, interval);
            }
            renderOption.now = now;
            renderOption.interval = interval;
            if (camera.status) {
                camera.updateSceneTransform();
            }
            this.render(this.camera, renderOption);
        };
        Stage3D.prototype.resize = function (width, height) {
            this.w = width;
            this.h = height;
            var _a = this, camera2D = _a.camera2D, cameraUI = _a.cameraUI, camera3D = _a.camera3D, cameraOrth = _a.cameraOrth, cameraPerspective = _a.cameraPerspective;
            if (cameraUI) {
                rf.CameraUIResize(width, height, cameraUI.len, cameraUI.far, cameraUI.originFar, cameraUI);
            }
            if (camera2D) {
                rf.CameraUIResize(width, height, camera2D.len, camera2D.far, camera2D.originFar, camera2D);
            }
            if (camera3D) {
                rf.Camera3DResize(width, height, camera3D.len, camera3D.far, camera3D.originFar, camera3D);
            }
            if (cameraOrth) {
                rf.CameraOrthResize(width, height, cameraOrth.len, cameraOrth.far, cameraOrth.originFar, cameraOrth);
            }
            if (cameraPerspective) {
                rf.PerspectiveResize(width, height, cameraPerspective.len, cameraPerspective.far, 15, cameraPerspective);
            }
        };
        Stage3D.prototype.filterRenderList = function (d, link) {
            var childrens = d.childrens;
            var len = childrens.length;
            for (var i = 0; i < len; i++) {
                var m = childrens[i];
                if (m.available && (m.shadowTarget || m.shadowCast)) {
                    link.add(m);
                }
                this.filterRenderList(m, link);
            }
        };
        Stage3D.prototype.getObjectByPoint = function (dx, dy, scale) {
            return _super.prototype.getObjectByPoint.call(this, dx + this._x, dy + this._y, scale);
        };
        return Stage3D;
    }(AllActiveSprite));
    rf.Stage3D = Stage3D;
    var ShadowEffect = (function () {
        function ShadowEffect(w, h) {
            this.w = w;
            this.h = h;
            this.m = new rf.ShadowMaterial();
            this.m.setData(undefined);
            this.len = rf.newMatrix3D();
            rf.CameraOrthResize(w, h, this.len, 10000, 10000 / Math.PI2);
        }
        ShadowEffect.prototype.render = function (link, sun, now, interval) {
            var _a = this, m = _a.m, rtt = _a.rtt, len = _a.len, w = _a.w, h = _a.h;
            if (sun.status || sun.len != len) {
                sun.len = len;
                sun.updateSceneTransform();
            }
            var c = rf.context3D;
            if (!rtt) {
                this.rtt = rtt = c.createRttTexture(c.getTextureData("ShadowMaterial"), 2048, 2048);
                rtt.cleanColor = rf.toRGBA(0xFFFFFFFF);
                rtt.setting.src = 1;
            }
            var g = rf.gl;
            c.setRenderToTexture(rtt, false);
            var passCompareMode = m.passCompareMode, cull = m.cull, program = m.program;
            var worldTranform = rf.TEMP_MATRIX3D;
            g.disable(g.BLEND);
            for (var vo = link.getFrist(); vo; vo = vo.next) {
                if (vo.close == false) {
                    var obj = vo.data;
                    var shadowable = obj.shadowCast, shadowTarget = obj.shadowTarget, geometry = obj.geometry, shadowMatrix = obj.shadowMatrix, sceneTransform = obj.sceneTransform;
                    if (shadowable) {
                        m.uploadContext(sun, obj, now, interval);
                        var p = m.program;
                        obj.renderShadow(sun, p, c, worldTranform, now, interval);
                        c.drawTriangles(geometry.index, geometry.numTriangles, rtt.setting);
                    }
                    if (shadowTarget) {
                        if (!shadowMatrix) {
                            obj.shadowMatrix = shadowMatrix = rf.newMatrix3D();
                        }
                        shadowMatrix.m3_append(sun.worldTranform, false, sceneTransform);
                    }
                }
            }
            c.setRenderToBackBuffer();
            g.enable(g.BLEND);
        };
        return ShadowEffect;
    }());
    rf.ShadowEffect = ShadowEffect;
    var PassContainer = (function (_super) {
        __extends(PassContainer, _super);
        function PassContainer(variables) {
            var _this = _super.call(this, variables) || this;
            _this.hitArea = new rf.HitArea();
            _this.hitArea.allWays = true;
            return _this;
        }
        PassContainer.prototype.render = function (camera, option) {
            var _camera = this.camera;
            var c = rf.context3D;
            var g = rf.gl;
            if (undefined == _camera) {
                _camera = camera;
            }
            if (_camera.status) {
                _camera.updateSceneTransform();
            }
            this.material.uploadContextSetting();
            _super.prototype.render.call(this, _camera, option);
        };
        return PassContainer;
    }(rf.RenderBase));
    rf.PassContainer = PassContainer;
    var UIContainer = (function (_super) {
        __extends(UIContainer, _super);
        function UIContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UIContainer.prototype.render = function (camera, option) {
            var cameraUI = rf.ROOT.cameraUI;
            if (cameraUI.status) {
                cameraUI.updateSceneTransform();
            }
            this.material.uploadContextSetting();
            _super.prototype.render.call(this, cameraUI, option);
        };
        return UIContainer;
    }(AllActiveSprite));
    rf.UIContainer = UIContainer;
    function getChildrenCount(d) {
        var _this = this;
        var count = 0;
        d.childrens.forEach(function (child) {
            count++;
            if (child instanceof rf.DisplayObjectContainer) {
                count += _this.getChildrenCount(child);
            }
        });
        return count;
    }
    rf.getChildrenCount = getChildrenCount;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.logging = true;
    function log(msg) {
        if (!rf.weixin && rf.logging) {
            wx.showLog(true);
            wx.log(msg);
        }
    }
    rf.log = log;
    var AppBase = (function () {
        function AppBase() {
            this.gcDelay = 3000;
            rf.contextMatrix = rf.newMatrix3D();
            rf.contextInvMatrix = rf.newMatrix3D();
            this.createSource();
            rf.Engine.start();
            rf.ROOT = rf.singleton(rf.Stage3D);
            this.initROOT();
            if (!rf.weixin) {
                rf.ROOT.on(62, this.rolldownHandler, this);
                rf.ROOT.on(61, this.rollupHandler, this);
            }
        }
        AppBase.prototype.rolldownHandler = function (event) {
            var mouseDownY = event.data.mouseDownY;
            if (mouseDownY < 50) {
                wx.showLog(true);
            }
        };
        AppBase.prototype.rollupHandler = function (event) {
            var mouseDownY = event.data.mouseDownY;
            if (mouseDownY < 200) {
                wx.showLog(false);
            }
        };
        AppBase.prototype.init = function (canvas) {
            wx.no_maincanvas = canvas;
            var b = rf.ROOT.requestContext3D(canvas);
            if (false == b) {
                console.log("GL create fail");
                return;
            }
            this.initCanvas(canvas);
            this.initContainer(rf.ROOT.camera2D, true);
            rf.state_Setup();
            rf.mainKey.init();
            rf.Engine.addResize(this);
            rf.Engine.addTick(this);
            var c = rf.context3D;
            rf.pass_init_mesh();
            rf.ROOT.addEventListener(rf.EngineEvent.FPS_CHANGE, this.gcChangeHandler, this);
            this.nextGCTime = rf.engineNow + this.gcDelay;
        };
        AppBase.prototype.initCanvas = function (canvas) {
        };
        AppBase.prototype.createSource = function () {
            var info = wx.getSystemInfoSync();
            rf.isMobile = info.platform != "pc";
            rf.platform = info.platform;
            rf.sceneWidth = info.screenWidth;
            rf.sceneHeight = info.screenHeight;
            rf.windowWidth = info.windowWidth;
            rf.windowHeight = info.windowHeight;
            rf.pixelRatio = info.pixelRatio;
            rf.componentSource = rf.createBitmapSource("component", 2048, 2048, true);
            rf.ComponentClass = {
                0: rf.Component,
                1: rf.TextField,
                2: rf.Button,
                3: rf.CheckBox,
                4: rf.RadioButton,
                5: rf.ScrollBar,
                6: rf.Component,
                7: rf.ProgressBar
            };
            rf.ScriptTweenIns = {
                "pro": rf.STweenPro,
                "scale": rf.STweenBase,
                "alpha": rf.STweenBase,
                "liner": rf.STweenLiner
            };
        };
        AppBase.prototype.initROOT = function () {
            var r = rf.ROOT;
            r.camera2D = new rf.Camera();
            r.camera = r.cameraUI = new rf.Camera();
        };
        AppBase.prototype.initContainer = function (sceneCamera, sceneMouse) {
            var g = rf.gl;
            var container = new rf.Scene(rf.vertex_mesh_variable, sceneMouse);
            var isFragDepthAvailable = g.getExtension("EXT_frag_depth");
            rf.context3D.use_logdepth_ext = isFragDepthAvailable ? true : false;
            container.camera = sceneCamera;
            rf.scene = container;
            var uiContainer = new rf.UIContainer(undefined, rf.vertex_ui_variable);
            uiContainer.renderer = new rf.BatchRenderer(uiContainer);
            var material = new rf.Material();
            material.depthMask = false;
            material.passCompareMode = 519;
            material.srcFactor = 770;
            material.dstFactor = 771;
            material.cull = 0;
            uiContainer.material = material;
            rf.floorContainer = new rf.NoActiveSprite();
            rf.popContainer = new rf.AllActiveSprite();
            rf.tipContainer = new rf.AllActiveSprite();
            rf.popContainer.mouseEnabled = false;
            rf.tipContainer.mouseEnabled = false;
            rf.ROOT.addChild(container);
            rf.ROOT.addChild(uiContainer);
            uiContainer.addChild(rf.floorContainer);
            uiContainer.addChild(rf.popContainer);
            uiContainer.addChild(rf.tipContainer);
        };
        AppBase.prototype.update = function (now, interval) {
            rf.ROOT.update(now, interval);
            rf.tweenUpdate();
        };
        AppBase.prototype.resize = function (width, height) {
            var c = rf.context3D;
            rf.context3D.configureBackBuffer(rf.innerWidth, rf.innerHeight, 0);
            rf.ROOT.resize(rf.innerWidth, rf.innerHeight);
        };
        AppBase.prototype.gcChangeHandler = function (event) {
            var _a = this, nextGCTime = _a.nextGCTime, gcDelay = _a.gcDelay;
            var now = rf.engineNow;
            if (now > nextGCTime) {
                rf.context3D.gc(now);
                rf.http_gc(now);
                this.nextGCTime += gcDelay;
            }
        };
        return AppBase;
    }());
    rf.AppBase = AppBase;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function test_fill(str) {
        var context = rf.test_bitmap.context;
        context.clearRect(0, 0, 800, 200);
        var size = { x: 0, y: 0 };
        rf.defalue_format.test(context, str, size, 1.0);
        rf.defalue_format.draw(context, str, { x: 0, y: 0, w: size.x, h: size.y });
        rf.test_text.text = str;
        rf.test_text.y = rf.defalue_format.size + 20;
    }
    rf.test_fill = test_fill;
    var StageDebug = (function (_super) {
        __extends(StageDebug, _super);
        function StageDebug() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StageDebug.prototype.resize = function (w, h) {
            var camera = rf.ROOT.camera2D;
            var map = camera.map;
            if (map) {
                var watchTarget = camera.watchTarget;
                var _x = watchTarget._x, _y = watchTarget._y;
                map.setSize(w, h);
                map.setScrollRect(w, h);
                camera.init();
                camera.update(rf.engineNow, 16);
            }
            _super.prototype.resize.call(this, w, h);
        };
        StageDebug.prototype.createSource = function () {
            _super.prototype.createSource.call(this);
        };
        StageDebug.prototype.initROOT = function () {
            var r = rf.ROOT;
            r.camera2D = rf.singleton(rf.Arpg2DCamera);
            rf.ROOT.camera3D = new rf.Camera(10000);
            rf.ROOT.cameraPerspective = new rf.Camera();
            rf.ROOT.cameraOrth = new rf.Camera();
            r.camera = r.cameraUI = new rf.Camera();
        };
        StageDebug.prototype.init = function (canvas) {
            _super.prototype.init.call(this, canvas);
            if (undefined == rf.gl) {
                return;
            }
            rf.scene.renderer = new rf.BatchRenderer(rf.scene);
            rf.context3D.defauleMag = 9729;
            rf.ROOT_PERFIX = "http://" + document.domain + "/cqh5/data/zhcn/";
            rf.RES_PERFIX = "http://" + document.domain + "/cqh5/data/zhcn/";
            rf.CONFIG_PERFIX = "https://localres.lingyunetwork.com/chuanshih5/web/config/zhcn/trunk/";
            rf.skill_setup();
            this.superBatchTest();
        };
        StageDebug.prototype.timerTest = function () {
            function time200() {
                console.log("200");
            }
            function time500() {
                console.log("500");
            }
            rf.getGTimer(1000).add(time500, this);
            rf.getGTimer(100).add(time200, this);
        };
        StageDebug.prototype.textTest = function () {
            var bitmap = new rf.BitmapData(800, 200);
            var context = bitmap.context;
            context.fillStyle = rf.c_white;
            rf.debugCanvas(bitmap.canvas, false, 10, 10);
            rf.test_bitmap = bitmap;
            var text = new rf.TextField();
            text.setPos(10, 10);
            rf.ROOT.addChild(text);
            rf.test_text = text;
        };
        StageDebug.prototype.map2dTest = function () {
            rf.context3D.use_logdepth_ext = false;
            rf.context3D.logarithmicDepthBuffer = false;
            var camera = rf.scene.camera = rf.ROOT.camera2D;
            var map = rf.singleton(rf.SnakeMap);
            var data = rf.map_create_data("3", 19, 14);
            map.init(data, 100, 100);
            rf.scene.addChild(map);
            var followScene = new rf.NoActiveSprite();
            rf.scene.addChild(followScene);
            camera.map = map;
            rf.singleton(rf.TitleUtils).bind(followScene);
            var sun = new rf.DirectionalLight();
            sun.setDirectional(200, 200, 200);
            var v = rf.newVector3D(600, -400, 1000);
            v.v3_normalize();
            v.v3_scale(2000);
            sun.lightoffset = v;
            sun.setPos(sun.lightoffset[0], sun.lightoffset[1], sun.lightoffset[2]);
            sun.lookat(rf.newVector3D(0, 0, 0));
            sun.color = 0xCCCCCC;
            v = rf.TEMP_VECTOR3D;
            v[0] = v[1] = v[2] = 0;
            sun.lookat(v);
            rf.scene.sun = sun;
            var rx2 = 90 - rf.RX;
            var offz = 0;
            var unitA = this.unitA = new rf.ActionActor();
            unitA.setPos(19 * 60 + 30, 22 * 30 + 15, offz);
            unitA.setBody("mesh/actor/a10010m/");
            unitA.body.shadowCast = true;
            unitA.body.mediump = true;
            unitA.setText("行走人民币", 0x00FF00);
            map.on(56, this.moveTest, this);
            rf.mainKey.regKeyDown(81, this.attack, this);
            rf.mainKey.regKeyDown(87, this.attack, this);
            rf.mainKey.regKeyDown(69, this.attack, this);
            rf.mainKey.regKeyDown(82, this.attack, this);
            rf.mainKey.regKeyDown(49, this.attack, this);
            rf.mainKey.regKeyDown(50, this.attack, this);
            rf.mainKey.regKeyDown(51, this.attack, this);
            rf.mainKey.regKeyDown(52, this.attack, this);
            rf.mainKey.regKeyDown(53, this.attack, this);
            rf.mainKey.regKeyDown(67, this.attack, this);
            map.on(59, this.mouseWheelHandler, this);
            var r = 0;
            var _a = this.unitA, _x = _a._x, _y = _a._y;
            rf.unitlist = {};
            for (var i = 0; i < 0; i++) {
                var monster = new rf.Monster();
                var dr = Math.PI * 2 * i / 15;
                var sin = Math.sin(dr) * 150;
                var cos = Math.cos(dr) * 150 / rf.SY;
                var ox = 400 + Math.random() * map.data.w - 200;
                var oy = 400 + Math.random() * map.data.h - 200;
                monster.setPos(_x + sin, _y + cos);
                monster.setBody("mesh/monster/m060001/");
                monster.scale = 0.9;
                monster.body.shadowCast = true;
                monster.faceto(_x, _y);
                monster.follow(this.unitA);
                var name_3 = String.fromCharCode(Math.round(Math.random() * (0x9FA5 - 0x4E00)) + 0x4E00);
                name_3 += String.fromCharCode(Math.round(Math.random() * (0x9FA5 - 0x4E00)) + 0x4E00);
                rf.unitlist[monster.guid] = monster;
                map.addChild(monster);
                rf.u3d_monster = monster;
            }
            rf.u3d_role = this.unitA;
            rf.unitlist[unitA.guid] = unitA;
            camera.watchTarget = this.unitA;
            map.addChild(this.unitA);
            rf.ROOT.updateSceneTransform(0);
            this.resize(rf.stageWidth, rf.stageHeight);
        };
        StageDebug.prototype.mouseWheelHandler = function (event) {
            this.unitA.rotation += (event.data.wheel / 10);
        };
        StageDebug.prototype.attack = function (e) {
            switch (e.keyCode) {
                case 67:
                    rf.scene.addChild(rf.mesh_fre_alpha_cut(rf.u3d_role.body));
                    break;
            }
        };
        StageDebug.prototype.moveTest = function (e) {
            var _a = this, unitA = _a.unitA, dibiao = _a.dibiao;
            var camera = rf.ROOT.camera2D;
            var map = camera.map, watchTarget = camera.watchTarget;
            var _b = e.data, mouseDownX = _b.mouseDownX, mouseDownY = _b.mouseDownY;
            unitA.findPath(camera._x + mouseDownX, camera._y + mouseDownY);
            if (!dibiao) {
                dibiao = new rf.Skill();
                dibiao.setSceneModel(0);
                dibiao.rotation = rf.u3d_role.rotation;
                dibiao.load("dibiao.sk");
            }
            dibiao.reset();
            dibiao.setPos(camera._x + mouseDownX, camera._y + mouseDownY, 2);
            map.addChild(dibiao);
        };
        StageDebug.prototype.mouseWheel3dHandler = function (event) {
            event.stopImmediatePropagation = true;
            var data = event.data;
            rf.u3d_role.rotationY += (event.data.wheel / 10);
        };
        StageDebug.prototype.unit3dCamera2DTest = function () {
            rf.context3D.use_logdepth_ext = false;
            rf.context3D.logarithmicDepthBuffer = false;
            var sun = new rf.DirectionalLight();
            sun.setDirectional(100, 200, 200);
            sun.color = 0xCCCCCC;
            var v = rf.TEMP_VECTOR3D;
            v[0] = v[1] = v[2] = 0;
            sun.lookat(v);
            rf.scene.sun = sun;
            var camera;
            camera = rf.scene.camera = rf.ROOT.cameraOrth;
            var sp = new rf.SceneObject();
            sp.setRot(rf.RX, 0, 0);
            rf.scene.addChild(sp);
            var variables = rf.vertex_mesh_variable;
            var mesh;
            var m;
            var skill;
            var w = 500;
            var planeGeo = new rf.PlaneGeometry(variables).create(1920, 1080);
            mesh = new rf.Mesh(variables);
            m = new rf.ColorMaterial(0x999999);
            m.setData(undefined);
            mesh.geometry = planeGeo;
            mesh.material = m;
            mesh.shadowTarget = true;
            mesh.y = -0.001;
            skill = new rf.TestSkill();
            skill.rotationZ = 90;
            skill.setSceneModel(0);
            skill.load("actor/a10010m/atks020/atks020.sk");
            sp.addChild(skill);
            var len = 10;
            sun.setDirectional(len, len, len);
            var ctl = new rf.TrackballControls(camera);
            ctl.lock = true;
        };
        StageDebug.prototype.unit3dTest = function () {
            rf.context3D.use_logdepth_ext = false;
            rf.context3D.logarithmicDepthBuffer = false;
            var sun = new rf.DirectionalLight();
            sun.setDirectional(100, 200, 200);
            sun.color = 0xCCCCCC;
            var v = rf.TEMP_VECTOR3D;
            v[0] = v[1] = v[2] = 0;
            sun.lookat(v);
            rf.scene.sun = sun;
            var camera = rf.scene.camera = rf.ROOT.cameraPerspective;
            camera = rf.scene.camera = rf.ROOT.camera3D;
            var w = 5;
            var variables = rf.vertex_mesh_variable;
            var w_e = w * 1.1;
            var m = new rf.PhongMaterial();
            m.setData(undefined);
            m.cull = 1029;
            var box = new rf.SkyBoxGeometry(rf.vertex_mesh_variable).create();
            var mesh = new rf.Mesh(rf.vertex_mesh_variable);
            mesh.geometry = box;
            mesh.name = "skybox";
            var msky = new rf.SkyBoxMaterial();
            msky.setData(undefined);
            msky.cull = 0;
            msky.diffTex = rf.context3D.getTextureData(rf.RES_PERFIX + "r/t/skybox/");
            mesh.material = msky;
            mesh.mouseChildren = mesh.mouseEnabled = false;
            rf.scene.addChild(mesh);
            var unit = new rf.ActionActor();
            unit.setPos(1, 0, 0);
            unit.tm = rf.newTimeMixer(unit, 0, rf.defaultTimeMixer, 1);
            unit.setSceneModel(2);
            unit.setBody("mesh/actor/a10010m/");
            rf.u3d_role = unit;
            var tr = new rf.Trident(2, 2);
            tr.setPos(0, 0, 0);
            rf.scene.addChild(tr);
            w = 10;
            m = new rf.ColorMaterial(0x999999);
            m.setData(undefined);
            var planeGeo = new rf.PlaneGeometry(variables).create(w * 2, w * 2);
            mesh = new rf.Mesh(variables);
            mesh.rotationX = -90;
            mesh.geometry = planeGeo;
            mesh.material = m;
            mesh.shadowTarget = true;
            mesh.y = -0.001;
            rf.scene.addChild(mesh);
            var boxGeo = new rf.TorusGeomerty(variables).create(30, 30, 0.5, 1);
            mesh = new rf.Mesh(variables);
            m = new rf.PhongMaterial();
            m.setData(undefined);
            mesh.shadowCast = true;
            mesh.geometry = boxGeo;
            mesh.material = m;
            mesh.y = 2;
            mesh.rotationX = -90;
            boxGeo = new rf.TorusGeomerty(variables).create(30, 30, 0.5, 1);
            mesh = new rf.Mesh(variables);
            m = new rf.PhongMaterial();
            m.setData(undefined);
            mesh.shadowCast = true;
            mesh.geometry = boxGeo;
            mesh.material = m;
            mesh.x = 3;
            mesh.y = 3;
            mesh.z = 3;
            mesh.rotationX = -90;
            mesh.rotationY = 45;
            mesh.rotationZ = 45;
            var skill;
            skill = new rf.TestSkill();
            skill.setSceneModel(2);
            var particle = new rf.TestPartilce();
            particle.tm = rf.defaultTimeMixer;
            particle.setPos(1, 0);
            particle.load("a.pa");
            rf.scene.addChild(particle);
            var len = 10;
            camera.setPos(len, len, len);
            camera.lookat(rf.newVector3D(0, 0, 0));
            sun.setDirectional(len, len, len);
            var ctl = new rf.TrackballControls(camera);
            ctl.lock = true;
        };
        StageDebug.prototype.filterTest = function () {
            var s1 = new rf.Sprite();
            var g;
            var sp = new rf.Image();
            var hole = new rf.HoleFilter();
            hole.setConstants(40, 40, 30, 10);
            sp.addFilter(hole);
            sp.load("i/zb623.png", ".png");
            sp.setPos(0, 0);
            rf.ROOT.addChild(sp);
        };
        StageDebug.prototype.superBatchTest = function () {
            rf.ROOT.renderer = new rf.SuperBatchRenderer(rf.ROOT);
            var sp;
            var g;
            sp = new rf.Sprite();
            sp.on(56, function (e) {
                g = sp.graphics;
                g.clear();
                var c = Math.random() * 5 + 1;
                for (var i = 0; i < c; i++) {
                    g.drawRect(Math.random() * 100, Math.random() * 100, 100, 100, Math.random() * 0xFFFFFF);
                }
                g.end();
            }, sp);
            g = sp.graphics;
            g.clear();
            g.drawRect(0, 0, 100, 100, 0xFF0000);
            g.end();
            rf.ROOT.addChild(sp);
            rf.ROOT.addChild(rf.singleton(rf.GUIProfile));
        };
        StageDebug.prototype.kfmtest = function () {
            var sun = new rf.DirectionalLight();
            sun.setPos(100, 200, 200);
            sun.color = 0xCCCCCC;
            var v = rf.TEMP_VECTOR3D;
            v[0] = v[1] = v[2] = 0;
            sun.lookat(v);
            rf.scene.sun = sun;
            var camera = rf.singleton(rf.Arpg2DCamera);
            rf.Engine.addTick(camera);
            var kfmmesh = new rf.KFMMesh();
            kfmmesh.load("mesh/a10010m/");
            kfmmesh.scale = 100;
            kfmmesh.setPos(200, 200);
            kfmmesh.rotationZ = 180;
            kfmmesh.rotationX = 35;
            rf.scene.addChild(kfmmesh);
            rf.mesh = kfmmesh;
            camera.watchTarget = kfmmesh;
            rf.Engine.addResize(camera);
        };
        StageDebug.prototype.quaternionTest = function () {
            var m = rf.newMatrix3D();
            m.m3_rotation(45 * rf.DEGREES_TO_RADIANS, rf.X_AXIS);
            var qua = rf.newVector3D();
            var pos = rf.newVector3D();
            m.m3_decompose(pos, qua, undefined, 2);
            var m2 = qua2mat(qua, pos);
        };
        StageDebug.prototype.circleTest = function () {
            var url = "i/zb623.png";
            var sp = new rf.Image();
            sp.setPos(20, 20);
            sp.load(url);
            rf.ROOT.addChild(sp);
        };
        StageDebug.prototype.testtest = function () {
        };
        return StageDebug;
    }(rf.AppBase));
    rf.StageDebug = StageDebug;
    function qua2mat(qua, pos) {
        var xx = qua.x * qua.x;
        var yy = qua.y * qua.y;
        var zz = qua.z * qua.z;
        var ww = qua.w * qua.w;
        var xy2 = 2 * qua.x * qua.y;
        var xz2 = 2 * qua.x * qua.z;
        var xw2 = 2 * qua.x * qua.w;
        var yz2 = 2 * qua.y * qua.z;
        var yw2 = 2 * qua.y * qua.w;
        var zw2 = 2 * qua.z * qua.w;
        var rawData = rf.newMatrix3D();
        rawData[0] = xx - yy - zz + ww;
        rawData[4] = xy2 - zw2;
        rawData[8] = xz2 + yw2;
        rawData[12] = pos.x;
        rawData[1] = xy2 + zw2;
        rawData[5] = -xx + yy - zz + ww;
        rawData[9] = yz2 - xw2;
        rawData[13] = pos.y;
        rawData[2] = xz2 - yw2;
        rawData[6] = yz2 + xw2;
        rawData[10] = -xx - yy + zz + ww;
        rawData[14] = pos.z;
        rawData[3] = 0;
        rawData[7] = 0;
        rawData[11] = 0;
        rawData[15] = 1;
        return rawData;
    }
    rf.qua2mat = qua2mat;
})(rf || (rf = {}));
var skill;
(function (skill) {
    skill.testskill = {};
})(skill || (skill = {}));
var rf;
(function (rf) {
    var Anim2dSource = (function (_super) {
        __extends(Anim2dSource, _super);
        function Anim2dSource(url) {
            var _this = _super.call(this) || this;
            _this.name = url;
            _this.status = 0;
            _this.completeFuncs = [];
            return _this;
        }
        Anim2dSource.prototype.load = function () {
            this.status = 1;
            rf.loadRes(rf.RES_PERFIX, this.name, this.loadConfigComplete, this, 1);
        };
        Anim2dSource.prototype.loadConfigComplete = function (event) {
            if (event.type != 4) {
                this.status = 3;
                return;
            }
            var name = this.name;
            var _a = event.currentTarget, data = _a.data, url = _a.url;
            if (url != name)
                return;
            var i = name.lastIndexOf("/") + 1;
            data.p = name.slice(0, i);
            data.n = name.slice(i, name.lastIndexOf("."));
            this.loadByConfig(data);
        };
        Anim2dSource.prototype.loadByConfig = function (data) {
            this.config = data;
            var matrix2d = data.matrix2d;
            if (matrix2d instanceof ArrayBuffer) {
                data.matrix2d = new Float32Array(matrix2d);
            }
            var perfix = data.p + data.n + ".png";
            this.status = 1;
            rf.loadRes(rf.RES_PERFIX, perfix, this.loadImageComplete, this, 5);
        };
        Anim2dSource.prototype.loadImageComplete = function (event) {
            if (event.type != 4) {
                this.status = 3;
                return;
            }
            var bmd = this.bmd = event.data;
            this.width = bmd.width;
            this.height = bmd.height;
            var area = this.setArea(rf.BitmapSource.DEFAULT, 0, 0, bmd.width, bmd.height);
            area.frames = this.config.fs;
            this.status = 2;
            this.simpleDispatch(4);
            var completeFuncs = this.completeFuncs;
            for (var i = 0; i < completeFuncs.length; i++) {
                var element = completeFuncs[i];
                element(this);
            }
            completeFuncs.length = 0;
        };
        return Anim2dSource;
    }(rf.BitmapSource));
    rf.Anim2dSource = Anim2dSource;
    var Ani = (function (_super) {
        __extends(Ani, _super);
        function Ani(source) {
            var _this = _super.call(this, source) || this;
            _this.cur = 0;
            _this.max = 0;
            _this.lock = -1;
            _this.tm = rf.defaultTimeMixer;
            _this.renderer = new rf.SingleRenderer(_this);
            _this.source = undefined;
            _this.extention = ".ha";
            return _this;
        }
        Ani.prototype.load = function (url) {
            this.removeTime = -1;
            this.nt = this.tm.now;
            var source = anim_getSource(url, this.extention);
            this.url = source.name;
            if (source.status == 2) {
                this.play(source);
            }
            else if (source.status == 1) {
                source.on(4, this.onSouceComplete, this);
            }
            return source;
        };
        Ani.prototype.onSouceComplete = function (e) {
            if (e.type != 4) {
                return;
            }
            var source = e.currentTarget;
            if (source.name == this.url) {
                source.off(e.type, this.onSouceComplete, this);
                this.play(source);
                this.simpleDispatch(4);
            }
        };
        Ani.prototype.play = function (source) {
            var config = source.config;
            this.source = source;
            this.config = config;
            this.t = ~~this.t == 0 ? config.t : this.t;
            this.max = config.m;
            this.nt = this.tm.now;
            this.cur = this.lock != -1 ? this.lock : 0;
            this.st == ~~this.st ? this.tm.now : this.st;
            this.renderFrame(this.cur);
        };
        Ani.prototype.render = function (camera, option) {
            var _a = this, source = _a.source, parentAni = _a.parentAni, _visible = _a._visible, config = _a.config, lock = _a.lock;
            if (!source)
                return;
            if (source.status != 2)
                return;
            if (!config)
                return;
            if (!_visible) {
                return;
            }
            _super.prototype.render.call(this, camera, option);
            if (lock != -1)
                return;
            if (parentAni)
                return;
            var _b = this, tm = _b.tm, nt = _b.nt, t = _b.t, once = _b.once, removeTime = _b.removeTime;
            if (removeTime > 0 && tm.now > removeTime) {
                this.onComplete();
                return;
            }
            var dt = tm.now - nt;
            if (dt > 0) {
                var _c = this, max = _c.max, cur = _c.cur, config_1 = _c.config;
                if (cur >= max - 1) {
                    cur = config_1.l;
                    if (once == 1) {
                        this.once = 0;
                        this.onceComplete(true);
                        return;
                    }
                    if (cur == -1 || once == -1) {
                        this.onComplete();
                        return;
                    }
                }
                else {
                    cur++;
                }
                this.cur = cur;
                if (dt > 200) {
                    nt = Math.floor(dt / t) * t + nt;
                }
                var d = this.renderFrame(cur);
                if (d > 0) {
                    this.nt = nt + d * t;
                }
                else {
                    this.nt = nt + 100;
                }
            }
        };
        Ani.prototype.renderFrame = function (frame) {
            var _a = this, source = _a.source, config = _a.config, bindAnis = _a.bindAnis;
            if (!source)
                return 0;
            var vo = source.getSourceVO(frame, 0);
            if (!vo)
                return 0;
            var g = this.graphics;
            g.clear();
            g.drawBitmap(0, 0, vo, config.matrix2d);
            g.end();
            if (bindAnis) {
                for (var linkvo = bindAnis.first; linkvo; linkvo = linkvo.next) {
                    if (false == linkvo.close) {
                        var ani = linkvo.data;
                        ani.renderFrame(frame);
                    }
                }
            }
            return vo.duration;
        };
        Ani.prototype.lockFrame = function (frame) {
            this.lock = frame;
            this.renderFrame(frame);
        };
        Ani.prototype.addBindAni = function (ani) {
            var bindAnis = this.bindAnis;
            if (!bindAnis) {
                this.bindAnis = bindAnis = new rf.Link();
            }
            bindAnis.add(ani, this);
            ani.parentAni = this;
            this.addChild(ani);
        };
        Ani.prototype.removeBindAni = function (ani) {
            var parentAni = ani.parentAni;
            var bindAnis = this.bindAnis;
            if (bindAnis && parentAni == this) {
                ani.parentAni = undefined;
                bindAnis.remove(ani, this);
                ani.remove();
            }
        };
        Ani.prototype.onceComplete = function (finish) {
            this.simpleDispatch(102, finish);
        };
        Ani.prototype.onComplete = function (t) {
            this.remove();
            var pool = this.pool;
            if (pool) {
                pool.recycle(this);
            }
        };
        return Ani;
    }(rf.Sprite));
    rf.Ani = Ani;
    var Pak = (function (_super) {
        __extends(Pak, _super);
        function Pak() {
            var _this = _super.call(this) || this;
            _this.extention = ".hp";
            return _this;
        }
        Pak.prototype.load = function (url) {
            url = rf.getFullUrl(url, this.extention);
            this.name = url;
            rf.loadRes(rf.RES_PERFIX, url, this.pakLoadComplete, this, 1);
            return undefined;
        };
        Pak.prototype.pakLoadComplete = function (event) {
            if (event.type == 4) {
                var item = event.currentTarget;
                if (item.url == this.name) {
                    var info = void 0;
                    this.info = info = event.data;
                    this.simpleDispatch(Pak.INFO_COMPLETE, info);
                }
            }
        };
        Pak.prototype.anim = function (anim, faceto, tm, once, duration, refresh) {
            if (once === void 0) { once = 0; }
            if (refresh === void 0) { refresh = true; }
            this.action = anim;
            this.faceto = faceto;
            this.once = once;
            this.tm = tm;
            this.st = tm.now;
            this.t = ~~duration;
            var _a = this, info = _a.info, name = _a.name;
            if (!info) {
                return;
            }
            var action = info.actions[anim];
            if (!action) {
                return;
            }
            var conf = action[faceto];
            if (!conf) {
                return;
            }
            var source = conf.source;
            if (!source) {
                var i = name.lastIndexOf("/") + 1;
                conf.p = name.slice(0, i);
                conf.n = anim + "_" + faceto;
                conf.source = _super.prototype.load.call(this, conf);
            }
            else {
                this.play(source);
            }
        };
        Pak.prototype.onComplete = function () {
            var pool = this.pool;
            if (pool) {
                pool.recycle(this);
            }
        };
        Pak.INFO_COMPLETE = "INFO_COMPLETE";
        return Pak;
    }(Ani));
    rf.Pak = Pak;
    function anim_getSource(data, extendtion, complete) {
        var url;
        var config;
        if (typeof data === "string") {
            url = rf.getFullUrl(data, extendtion);
        }
        else {
            config = data;
            var p = config.p, n = config.n;
            url = p + n + ".hp";
        }
        var source = rf.bitmapSources[url];
        if (!source) {
            rf.bitmapSources[url] = source = new Anim2dSource(url);
            if (config) {
                source.loadByConfig(config);
            }
            else {
                source.load();
            }
        }
        else if (source.status == 0) {
            if (config) {
                source.loadByConfig(config);
            }
            else {
                source.load();
            }
        }
        else if (complete && source.status == 2) {
            complete(source);
            return source;
        }
        if (complete) {
            var completes = source.completeFuncs;
            if (completes.indexOf(complete) == -1) {
                completes.push(complete);
            }
        }
        return source;
    }
    rf.anim_getSource = anim_getSource;
    function getAglinPoint(aglin, w, h) {
        var ox, oy;
        var t1 = (aglin / 3) >> 0;
        switch (t1) {
            case 0:
                oy = 0;
                break;
            case 1:
                oy = -h >> 1;
                break;
            case 2:
                oy = -h;
                break;
        }
        t1 = aglin % 3;
        switch (t1) {
            case 0:
                ox = 0;
                break;
            case 1:
                ox = -w >> 1;
                break;
            case 2:
                ox = -w;
                break;
        }
        return [ox, oy];
    }
    rf.getAglinPoint = getAglinPoint;
    function fontRender(g, vos, aglin, gap, rd) {
        if (gap === void 0) { gap = 0; }
        if (rd === void 0) { rd = 0; }
        var w = 0;
        var h = 0;
        vos.forEach(function (element) {
            w += element.w + gap;
            if (element.h > h) {
                h = element.h;
            }
        });
        var p = getAglinPoint(aglin, w, h);
        g.clear();
        w = 0;
        var n = vos.length;
        for (var i = 0; i < n; i++) {
            var vo = vos[i];
            var ox = w + p[0] + ~~vo.f_ox;
            g.drawBitmap(ox, p[1] + ~~vo.f_oy - rd * ox, vo);
            w += vo.w + gap;
        }
        g.end();
    }
    rf.fontRender = fontRender;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var FontRender = (function (_super) {
        __extends(FontRender, _super);
        function FontRender(font, source) {
            var _this = _super.call(this, source) || this;
            _this.gap = 0;
            _this.rd = 0;
            _this.font = font;
            return _this;
        }
        FontRender.prototype.updateVal = function (arr) {
            if (this.valarr == arr)
                return;
            this.valarr = arr;
            var uri = this.font.uri;
            this.asource = rf.anim_getSource(uri, ".ha");
            if (this.asource.status != 2) {
                this.asource.on(4, this.draw, this);
                return;
            }
            this.draw();
        };
        FontRender.prototype.draw = function (e) {
            if (e) {
                e.currentTarget.off(4, this.draw, this);
            }
            var _a = this, source = _a.source, asource = _a.asource, valarr = _a.valarr, font = _a.font, gap = _a.gap, rd = _a.rd;
            var name = asource.name;
            var vo = source.getSourceVO(asource.name, 1);
            if (!vo) {
                copyAniSource(asource, source);
            }
            var arr = img_getAnimvos(name, valarr, source, font);
            rf.fontRender(this.graphics, arr, 0, gap, rd);
            this.updateHitArea();
            this.simpleDispatch(4);
        };
        return FontRender;
    }(rf.Component));
    rf.FontRender = FontRender;
    function img_getAnimvos(key, arr, source, font) {
        var vos = [];
        var len = arr.length;
        var va;
        var vo;
        for (var i = 0; i < len; i++) {
            var ele = arr[i];
            vo = source.getSourceVO(key + ele, 1);
            if (vo) {
                vos.push(vo);
                vo.f_ox = 0;
                vo.f_oy = 0;
            }
        }
        return vos;
    }
    rf.img_getAnimvos = img_getAnimvos;
    function copyAniSource(from, to) {
        var name = from.name, width = from.width, height = from.height, bmd = from.bmd, config = from.config;
        var vo = to.getSourceVO(from.name, 1);
        if (!vo) {
            vo = to.setSourceVO(name, width, height, 1);
            to.drawimg(bmd, vo.x, vo.y, vo.w, vo.h);
            var frames_1 = to.areas[1].frames;
            var f = void 0;
            for (var ele in config.fs) {
                f = config.fs[ele];
                var tmpvo = { x: f.x + vo.x, y: f.y + vo.y, w: f.w, h: f.h, ix: f.ix, iy: f.iy, used: 0 };
                rf.refreshUV(tmpvo, to.width, to.height);
                frames_1[name + ele] = tmpvo;
            }
            to.areas[1].frames = frames_1;
        }
    }
    rf.copyAniSource = copyAniSource;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var FileReference = (function () {
        function FileReference(path) {
            path = path.replace(/\\/g, "/");
            this.nativePath = path;
            if (path.indexOf(".") == -1) {
                if (path[path.length - 1] != "/") {
                    this.nativePath += "/";
                }
            }
        }
        FileReference.prototype.join = function (f, t) {
            var bf = f;
            var bt = t;
            if (f.lastIndexOf(".") != -1) {
                f = f.slice(0, f.lastIndexOf("/") + 1);
            }
            t = t.replace(/\\/g, "/");
            var i;
            while (true) {
                i = t.indexOf("../");
                if (i != -1) {
                    f = f.slice(0, f.lastIndexOf("/", f.length - 2) + 1);
                    t = t.replace("../", "");
                }
                else {
                    break;
                }
            }
            t = t.replace(/\.\//g, "");
            return f + t;
        };
        Object.defineProperty(FileReference.prototype, "name", {
            get: function () {
                var _name = this.nativePath;
                _name = _name.slice(_name.lastIndexOf("/", _name.length - 2)).replace(/\//g, "");
                return _name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileReference.prototype, "extname", {
            get: function () {
                var _name = this.nativePath;
                return _name.slice(_name.indexOf(".")).toLocaleLowerCase();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileReference.prototype, "exists", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        FileReference.prototype.isFile = function () {
            return false;
        };
        Object.defineProperty(FileReference.prototype, "parent", {
            get: function () {
                var nativePath = this.nativePath;
                var i = nativePath.lastIndexOf("/", nativePath.length - 2);
                if (i == -1) {
                    return undefined;
                }
                nativePath = nativePath.slice(0, i);
                return new FileReference.CLS(nativePath);
            },
            enumerable: true,
            configurable: true
        });
        FileReference.prototype.read = function () {
            return undefined;
        };
        FileReference.prototype.readUTF8 = function (type) {
            if (type === void 0) { type = "utf8"; }
            return undefined;
        };
        FileReference.prototype.mkdir = function (path) {
            if (this.exists == false) {
                this.parent.mkdir(this.name);
            }
        };
        FileReference.prototype.write = function (buf) {
        };
        FileReference.prototype.writeUTF8 = function (value) {
        };
        FileReference.prototype.copyto = function (to) {
        };
        FileReference.prototype.moveto = function (to) {
        };
        FileReference.prototype.getDirectoryListing = function () {
            return undefined;
        };
        FileReference.prototype.resolvePath = function (path) {
            var f;
            if (this.isFile() == true) {
                f = this.parent;
            }
            else {
                f = this;
            }
            return new FileReference.CLS(f.nativePath + path);
        };
        FileReference.prototype.getAllFiles = function () {
            return undefined;
        };
        FileReference.CLS = FileReference;
        return FileReference;
    }());
    rf.FileReference = FileReference;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.HTTP_REPOSITORY = {};
    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader(perfix, url, dataType, method) {
            if (dataType === void 0) { dataType = "arraybuffer"; }
            if (method === void 0) { method = "GET"; }
            var _this = _super.call(this) || this;
            _this.status = 0;
            rf.HTTP_REPOSITORY[url] = _this;
            var option;
            _this.option = option = {};
            _this.url = url;
            _this.perfix = perfix;
            url = url.replace(perfix, "");
            option.url = perfix + url;
            option.responseType = dataType;
            option.method = method;
            _this.initOption(option);
            _this.requstTimes = 0;
            _this.completeLink = new rf.Link();
            return _this;
        }
        Loader.prototype.accessSync = function (url) {
            var file = rf.FILE_ROOT.resolvePath(url);
            if (file.exists) {
                return true;
            }
        };
        Loader.prototype.initOption = function (option) {
        };
        Loader.prototype.load = function () {
            var option = this.option;
            if (option.method == "GET") {
                if (rf.FILE_ROOT && this.accessSync(option.url) == true) {
                    return;
                }
            }
            this.loadUseTime = rf.engineNow;
            this.status = 1;
            this.doLoad(option);
        };
        Loader.prototype.doLoad = function (option) {
            option.complete = this.preComplete.bind(this);
            wx.request(option);
        };
        Loader.prototype.complete = function (res) {
            this.data = res.data;
            var statusCode = res.statusCode, data = res.data;
            var event = rf.EventX.TEMP;
            event.currentTarget = this;
            if (statusCode >= 400 || statusCode == 0) {
                this.status = 3;
                event.type = 3;
                event.data = undefined;
                console.log("loadError " + this.perfix + " " + this.url);
            }
            else {
                this.status = 2;
                this.lastActiveTime = rf.engineNow;
                event.type = 4;
                event.data = data;
            }
            var completeLink = this.completeLink;
            for (var vo = completeLink.getFrist(); vo; vo = vo.next) {
                var data_1 = vo.data, thisObj = vo.thisObj;
                data_1.call(thisObj, event);
                vo.close = true;
            }
            completeLink.clean();
            this.dispatchEvent(event);
        };
        Loader.prototype.getFileByteLength = function (data) {
            if (data instanceof ArrayBuffer) {
                return data.byteLength;
            }
            else if (typeof data == "string") {
                return data.length;
            }
            return 0;
        };
        Loader.prototype.preComplete = function (res) {
            this.loadUseTime = rf.engineNow - this.loadUseTime;
            var data = res.data, statusCode = res.statusCode;
            if (statusCode == 200) {
                this.byte = this.getFileByteLength(data);
                this.data = res.data = this.formatData(data);
            }
            this.complete(res);
        };
        Loader.prototype.formatData = function (data) {
            return data;
        };
        return Loader;
    }(rf.MiniDispatcher));
    rf.Loader = Loader;
    var AMFLoader = (function (_super) {
        __extends(AMFLoader, _super);
        function AMFLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AMFLoader.prototype.formatData = function (data) {
            if (data instanceof ArrayBuffer) {
                if (this.inflate) {
                    data = rf.byte_inflate(new Uint8Array(data)).buffer;
                }
                return rf.amf_readObject(data);
            }
            return undefined;
        };
        return AMFLoader;
    }(Loader));
    rf.AMFLoader = AMFLoader;
    var ImageLoader = (function (_super) {
        __extends(ImageLoader, _super);
        function ImageLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImageLoader.prototype.doLoad = function (option) {
            var image = wx.createImage();
            image.crossOrigin = "Anonymous";
            image.onload = this.onLoaded.bind(this);
            image.onerror = this.onerror.bind(this);
            image.src = option.url;
        };
        ImageLoader.prototype.getFileByteLength = function (data) {
            data.width.toFixed;
            return data.width * data.height * 4;
        };
        ImageLoader.prototype.onLoaded = function (e) {
            var data = e.currentTarget;
            data.onload = undefined;
            data.onerror = undefined;
            var statusCode = 200;
            this.preComplete({ data: data, statusCode: statusCode });
        };
        ImageLoader.prototype.onerror = function (e) {
            var data = e.currentTarget;
            data.onload = undefined;
            data.onerror = undefined;
            var statusCode = 404;
            this.preComplete({ data: data, statusCode: statusCode });
        };
        return ImageLoader;
    }(Loader));
    rf.ImageLoader = ImageLoader;
    rf.http_res_max_loader = 5;
    rf.http_current_loader_count = 0;
    rf.http_load_Link = new rf.Link();
    function loadRes(perfix, url, complete, thisObj, type, priority, disposeTime) {
        if (type === void 0) { type = 0; }
        if (priority === void 0) { priority = 0; }
        if (disposeTime === void 0) { disposeTime = 30000; }
        if (!url) {
            console.warn("request url is empty!");
            return;
        }
        var loader = rf.HTTP_REPOSITORY[url];
        if (!loader) {
            switch (type) {
                case 0:
                    loader = new Loader(perfix, url);
                    break;
                case 3:
                    loader = new Loader(perfix, url, "text");
                    break;
                case 1:
                    loader = new AMFLoader(perfix, url);
                    break;
                case 2:
                    loader = new AMFLoader(perfix, url);
                    loader.inflate = true;
                    break;
                case 5:
                    loader = new ImageLoader(perfix, url);
            }
            rf.http_load_Link.addByWeight(loader, priority);
            loader.completeLink.add(complete, thisObj);
            if (rf.http_current_loader_count < rf.http_res_max_loader) {
                http_load_continue();
            }
        }
        else {
            switch (loader.status) {
                case 0:
                    rf.http_load_Link.addByWeight(loader, priority);
                    if (rf.http_current_loader_count < rf.http_res_max_loader) {
                        http_load_continue();
                    }
                case 1:
                    loader.completeLink.add(complete, thisObj);
                    break;
                case 2:
                    setTimeout(function () {
                        var e = rf.EventX.TEMP;
                        e.type = 4;
                        e.data = loader.data;
                        e.currentTarget = loader;
                        complete.call(thisObj, e);
                    }, 20);
                    break;
            }
        }
        loader.requstTimes++;
        return loader;
    }
    rf.loadRes = loadRes;
    function http_load_continue(e) {
        var link = rf.http_load_Link;
        var max = rf.http_res_max_loader;
        var current = rf.http_current_loader_count;
        if (e) {
            current--;
        }
        for (var vo = link.getFrist(); vo; vo = vo.next) {
            if (current < max) {
                var loader = vo.data;
                if (loader) {
                    vo.close = true;
                    loader.completeLink.add(http_load_continue, loader);
                    loader.load();
                    current++;
                }
            }
        }
        link.clean();
        rf.http_current_loader_count = current;
    }
    rf.http_load_continue = http_load_continue;
    function getFullUrl(url, extension) {
        if (!url)
            return url;
        if (extension && url.lastIndexOf(extension) == -1) {
            url += extension;
        }
        return url;
    }
    rf.getFullUrl = getFullUrl;
    var LoadTask = (function (_super) {
        __extends(LoadTask, _super);
        function LoadTask() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.queue = {};
            _this.total = 0;
            _this.progress = 0;
            return _this;
        }
        LoadTask.prototype.add = function (perfix, url, type, complete, thisObj) {
            var res = loadRes(perfix, url, this.complteHandler, this, type);
            if (undefined != complete) {
                res.completeLink.addByWeight(complete, 1, thisObj);
            }
            this.queue[url] = res;
            this.total++;
            return res;
        };
        LoadTask.prototype.addTask = function (item) {
            this.queue[item.name] = item;
            this.total++;
            item.on(4, this.complteHandler, this);
            item.on(3, this.complteHandler, this);
        };
        LoadTask.prototype.complteHandler = function (event) {
            var item = event.currentTarget;
            if (item instanceof rf.MiniDispatcher) {
                item.off(4, this.complteHandler, this);
                item.off(3, this.complteHandler, this);
            }
            var queue = this.queue;
            var completeCount = 0;
            var totalCount = 0;
            for (var key in queue) {
                var item_1 = queue[key];
                if (item_1.status >= 2) {
                    completeCount++;
                }
                totalCount++;
            }
            this.progress = completeCount;
            this.total = totalCount;
            this.simpleDispatch(19, this);
            if (completeCount == totalCount) {
                this.simpleDispatch(4, this);
            }
        };
        LoadTask.prototype.onRecycle = function () {
            this.queue = {};
            this.progress = this.total = 0;
        };
        return LoadTask;
    }(rf.MiniDispatcher));
    rf.LoadTask = LoadTask;
    function http_gc(now) {
    }
    rf.http_gc = http_gc;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var KeyManagerV2 = (function (_super) {
        __extends(KeyManagerV2, _super);
        function KeyManagerV2(target) {
            var _this = _super.call(this) || this;
            _this.keylist = [];
            _this.keylimit = [];
            _this.isClosed = false;
            _this.keyDict = {};
            _this.keyObj = {};
            if (target) {
                target.addEventListener(50, _this.mouseDownHandler, _this);
            }
            _this.keyDict = {};
            return _this;
        }
        KeyManagerV2.prototype.mouseDownHandler = function (e) {
            KeyManagerV2.currentKey = this;
        };
        KeyManagerV2.resetDefaultMainKey = function (value) {
            KeyManagerV2._defaultMainKey = value == null ? rf.mainKey : value;
            this.setFocus(KeyManagerV2._defaultMainKey);
        };
        KeyManagerV2.setFocus = function (focus) {
            if (KeyManagerV2.currentKey && KeyManagerV2.currentKey.isClosed) {
                return;
            }
            if (!focus) {
                focus = KeyManagerV2._defaultMainKey;
            }
            KeyManagerV2.currentKey = focus;
        };
        KeyManagerV2.prototype.awaken = function () {
            KeyManagerV2.currentKey = this;
        };
        KeyManagerV2.prototype.sleep = function () {
            KeyManagerV2.setFocus(KeyManagerV2._defaultMainKey);
        };
        KeyManagerV2.prototype.init = function () {
            var $this = this;
            function m(e) {
                $this.onKeyHandle(e);
            }
            ;
            var canvas = rf.ROOT.canvas;
            window.onkeydown = m;
            window.onkeyup = m;
            this.keylimit = [16, 17, 18];
            this.keylist = [];
        };
        KeyManagerV2.prototype.onKeyHandle = function (e) {
            e.stopImmediatePropagation();
            var keyList = this.keylist;
            var i;
            var code = e.keyCode;
            if (!this.check()) {
                i = keyList.indexOf(code);
                if (i != -1) {
                    keyList.splice(i, 1);
                }
                return;
            }
            if (this.keylimit.indexOf(code) != -1)
                return;
            if (e.type == "keydown") {
                if (keyList.indexOf(code) != -1) {
                    return;
                }
                keyList.push(code);
            }
            else {
                i = keyList.indexOf(code);
                if (i != -1) {
                    keyList.splice(i, 1);
                }
            }
            var type = (e.type == "keydown") ? 0 : 1;
            var shiftKey, ctrlKey, altKey;
            shiftKey = e.shiftKey ? 1 : 0;
            ctrlKey = e.ctrlKey ? 1 : 0;
            altKey = e.altKey ? 1 : 0;
            var keyvalue = type << 12 | shiftKey << 11 | ctrlKey << 10 | altKey << 9 | e.keyCode;
            if ((!KeyManagerV2.currentKey || !KeyManagerV2.currentKey.doKey(e, keyvalue)) && rf.mainKey) {
                rf.mainKey.doKey(e, keyvalue);
            }
        };
        KeyManagerV2.prototype.doKey = function (e, keyvalue) {
            var f = this.keyDict[keyvalue];
            this.currentKeyCode = keyvalue & 0xFF;
            if (f != null) {
                if (f.length == 1) {
                    f.call(this.keyObj[keyvalue], e);
                }
                else {
                    f.call(this.keyObj[keyvalue]);
                }
                return true;
            }
            return this.isClosed;
        };
        KeyManagerV2.prototype.check = function () {
            if (!KeyManagerV2.enabled) {
                return false;
            }
            return true;
        };
        KeyManagerV2.prototype.regKeyDown = function (key, func, thisobj, shift, ctrl, alt) {
            if (shift === void 0) { shift = false; }
            if (ctrl === void 0) { ctrl = false; }
            if (alt === void 0) { alt = false; }
            var shiftKey, ctrlKey, altKey;
            shiftKey = shift ? 1 : 0;
            ctrlKey = ctrl ? 1 : 0;
            altKey = alt ? 1 : 0;
            this.keyDict[shiftKey << 11 | ctrlKey << 10 | altKey << 9 | key] = func;
            this.keyObj[shiftKey << 11 | ctrlKey << 10 | altKey << 9 | key] = thisobj;
        };
        KeyManagerV2.prototype.removeKeyDown = function (key, func, shift, ctrl, alt) {
            if (shift === void 0) { shift = false; }
            if (ctrl === void 0) { ctrl = false; }
            if (alt === void 0) { alt = false; }
            var shiftKey, ctrlKey, altKey;
            shiftKey = shift ? 1 : 0;
            ctrlKey = ctrl ? 1 : 0;
            altKey = alt ? 1 : 0;
            var d = shiftKey << 11 | ctrlKey << 10 | altKey << 9 | key;
            if (this.keyDict[d] == func) {
                this.keyDict[d] = null;
                delete this.keyDict[d];
                this.keyObj[d] = null;
                delete this.keyObj[d];
            }
        };
        KeyManagerV2.enabled = true;
        return KeyManagerV2;
    }(rf.MiniDispatcher));
    rf.KeyManagerV2 = KeyManagerV2;
    rf.mainKey = new KeyManagerV2();
})(rf || (rf = {}));
var rf;
(function (rf) {
    var MD5 = (function () {
        function MD5() {
            this.hexcase = 0;
            this.b64pad = "";
        }
        MD5.prototype.hex_md5 = function (s) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s))); };
        MD5.prototype.b64_md5 = function (s) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s))); };
        MD5.prototype.any_md5 = function (s, e) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e); };
        MD5.prototype.hex_hmac_md5 = function (k, d) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
        MD5.prototype.b64_hmac_md5 = function (k, d) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); };
        MD5.prototype.any_hmac_md5 = function (k, d, e) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); };
        MD5.prototype.md5_vm_test = function () {
            return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        };
        MD5.prototype.rstr_md5 = function (s) {
            return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
        };
        MD5.prototype.rstr_hmac_md5 = function (key, data) {
            var bkey = this.rstr2binl(key);
            if (bkey.length > 16)
                bkey = this.binl_md5(bkey, key.length * 8);
            var ipad = Array(16), opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
            return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
        };
        MD5.prototype.rstr2hex = function (input) {
            try {
                this.hexcase;
            }
            catch (e) {
                this.hexcase = 0;
            }
            var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var output = "";
            var x;
            for (var i = 0; i < input.length; i++) {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F)
                    + hex_tab.charAt(x & 0x0F);
            }
            return output;
        };
        MD5.prototype.rstr2b64 = function (input) {
            try {
                this.b64pad;
            }
            catch (e) {
                this.b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
                var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > input.length * 8)
                        output += this.b64pad;
                    else
                        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
            }
            return output;
        };
        MD5.prototype.rstr2any = function (input, encoding) {
            var divisor = encoding.length;
            var i, j, q, x, quotient;
            var dividend = Array(Math.ceil(input.length / 2));
            for (i = 0; i < dividend.length; i++) {
                dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
            }
            var full_length = Math.ceil(input.length * 8 /
                (Math.log(encoding.length) / Math.log(2)));
            var remainders = Array(full_length);
            for (j = 0; j < full_length; j++) {
                quotient = Array();
                x = 0;
                for (i = 0; i < dividend.length; i++) {
                    x = (x << 16) + dividend[i];
                    q = Math.floor(x / divisor);
                    x -= q * divisor;
                    if (quotient.length > 0 || q > 0)
                        quotient[quotient.length] = q;
                }
                remainders[j] = x;
                dividend = quotient;
            }
            var output = "";
            for (i = remainders.length - 1; i >= 0; i--)
                output += encoding.charAt(remainders[i]);
            return output;
        };
        MD5.prototype.str2rstr_utf8 = function (input) {
            var output = "";
            var i = -1;
            var x, y;
            while (++i < input.length) {
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }
                if (x <= 0x7F)
                    output += String.fromCharCode(x);
                else if (x <= 0x7FF)
                    output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
                else if (x <= 0xFFFF)
                    output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
                else if (x <= 0x1FFFFF)
                    output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            }
            return output;
        };
        MD5.prototype.str2rstr_utf16le = function (input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
            return output;
        };
        MD5.prototype.str2rstr_utf16be = function (input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
            return output;
        };
        MD5.prototype.rstr2binl = function (input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++)
                output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8)
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            return output;
        };
        MD5.prototype.binl2rstr = function (input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8)
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            return output;
        };
        MD5.prototype.binl_md5 = function (x, len) {
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = this.safe_add(a, olda);
                b = this.safe_add(b, oldb);
                c = this.safe_add(c, oldc);
                d = this.safe_add(d, oldd);
            }
            return [a, b, c, d];
        };
        MD5.prototype.md5_cmn = function (q, a, b, x, s, t) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
        };
        MD5.prototype.md5_ff = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        };
        MD5.prototype.md5_gg = function (a, b, c, d, x, s, t) {
            return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        };
        MD5.prototype.md5_hh = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        };
        MD5.prototype.md5_ii = function (a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        };
        MD5.prototype.safe_add = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
        MD5.prototype.bit_rol = function (num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        };
        return MD5;
    }());
    rf.MD5 = MD5;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function debugPanelSource(event) {
        var source = event.data;
        if (!source)
            return;
        debugCanvas(source.bmd.canvas);
    }
    rf.debugPanelSource = debugPanelSource;
    function debugCanvas(canvas, fullscale, ox, oy) {
        if (ox === void 0) { ox = 0; }
        if (oy === void 0) { oy = 0; }
        var oldCanvas = document.getElementById("dcanvas");
        if (oldCanvas && oldCanvas != canvas) {
            oldCanvas.removeEventListener("click", clickRemoveElement);
            oldCanvas.remove();
        }
        var style = canvas.style;
        style.position = "absolute";
        style.left = ox / rf.pixelRatio + "px";
        style.top = oy / rf.pixelRatio + "px";
        canvas.id = "dcanvas";
        style["transform-origin"] = "0% 0% 0px";
        var scale = 1;
        if (!fullscale) {
            var sx = rf.sceneWidth / canvas.width;
            var sy = rf.sceneHeight / canvas.height;
            scale = sx > sy ? sy : sx;
        }
        if (scale > 1) {
            scale = 1;
        }
        style.transform = "matrix(" + scale / rf.pixelRatio + ", 0, 0, " + scale / rf.pixelRatio + ", 0, 0)";
        document.body.appendChild(canvas);
        canvas.onclick = clickRemoveElement.bind(canvas);
    }
    rf.debugCanvas = debugCanvas;
    function clickRemoveElement(event) {
        if (event.ctrlKey) {
            this.remove();
        }
    }
    rf.clickRemoveElement = clickRemoveElement;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var GUIProfile = (function (_super) {
        __extends(GUIProfile, _super);
        function GUIProfile() {
            var _this = _super.call(this) || this;
            _this.bindComponents();
            return _this;
        }
        GUIProfile.prototype.bindComponents = function () {
            this.timeTex = this.createText();
            this.fpsTxt = this.createText();
            this.bufferTex = this.createText();
            this.dcTxt = this.createText();
            rf.ROOT.addEventListener(rf.EngineEvent.FPS_CHANGE, this.fpsChangeHandler, this);
        };
        GUIProfile.prototype.createText = function () {
            var text = new rf.TextField();
            text.init();
            text.y = this.h;
            this.h += text.format.size;
            this.addChild(text);
            return text;
        };
        GUIProfile.prototype.fpsChangeHandler = function (event) {
            var con = rf.context3D;
            this.timeTex.text = "time:" + rf.getFormatTime(rf.engineNow, "HH:mm:ss", false);
            this.fpsTxt.text = "F:" + rf.Engine.fps + " C:" + rf.Engine.code.toFixed(2);
            this.bufferTex.text = con.toString();
            this.dcTxt.text = "tri:" + con.triangles + " dc:" + con.dc;
        };
        return GUIProfile;
    }(rf.Sprite));
    rf.GUIProfile = GUIProfile;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.line_variable = {
        "posX": { size: 3, offset: 0 },
        "posY": { size: 3, offset: 3 },
        "len": { size: 1, offset: 6 },
        "color": { size: 4, offset: 7 },
        "data32PerVertex": { size: 11, offset: 0 }
    };
    var Line3DPoint = (function () {
        function Line3DPoint() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 1;
            this.g = 1;
            this.b = 1;
            this.a = 1;
            this.t = 1;
        }
        Line3DPoint.prototype.clear = function () {
            this.x = this.y = this.z = 0;
            this.r = this.g = this.b = this.a = this.t = 1;
        };
        Line3DPoint.prototype.clone = function () {
            var vo = new Line3DPoint();
            vo.x = this.x;
            vo.y = this.y;
            vo.z = this.z;
            vo.r = this.r;
            vo.g = this.g;
            vo.b = this.b;
            vo.a = this.a;
            vo.t = this.t;
            return vo;
        };
        Line3DPoint.prototype.toRGB = function (color) {
            this.r = ((color & 0x00ff0000) >>> 16) / 0xFF;
            this.g = ((color & 0x0000ff00) >>> 8) / 0xFF;
            this.b = (color & 0x000000ff) / 0xFF;
        };
        return Line3DPoint;
    }());
    rf.Line3DPoint = Line3DPoint;
    var Line3D = (function (_super) {
        __extends(Line3D, _super);
        function Line3D() {
            var _this = _super.call(this, rf.line_variable) || this;
            _this.points = [];
            _this.data32PerVertex = rf.line_variable["data32PerVertex"].size;
            _this.nativeRender = true;
            _this.worldTransform = rf.newMatrix3D();
            return _this;
        }
        Line3D.prototype.clear = function () {
            var tempVertex = this.tempVertex;
            if (undefined == tempVertex) {
                this.tempVertex = tempVertex = rf.recyclable(rf.Temp_Float32Byte);
            }
            tempVertex.data32PerVertex = this.data32PerVertex;
            tempVertex.numVertices = 0;
            var origin = this.origin;
            if (undefined == origin) {
                this.origin = origin = rf.recyclable(Line3DPoint);
            }
            this.points.length = 0;
            this.vertexBuffer = null;
        };
        Line3D.prototype.moveTo = function (x, y, z, thickness, color, alpha) {
            if (thickness === void 0) { thickness = 1; }
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            var _a = this, origin = _a.origin, points = _a.points;
            if (points.length) {
                this.build();
            }
            origin.x = x;
            origin.y = y;
            origin.z = z;
            origin.t = thickness;
            origin.toRGB(color);
            origin.a = alpha;
            points.push(origin.clone());
        };
        Line3D.prototype.lineTo = function (x, y, z, thickness, color, alpha) {
            if (thickness === void 0) { thickness = 1; }
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            var _a = this, vo = _a.origin, points = _a.points;
            vo.x = x;
            vo.y = y;
            vo.z = z;
            vo.a = alpha;
            vo.t = thickness;
            vo.toRGB(color);
            points.push(vo.clone());
        };
        Line3D.prototype.build = function () {
            var _a = this, points = _a.points, tempVertex = _a.tempVertex;
            var j = 0;
            var m = points.length - 1;
            for (j = 0; j < m; j++) {
                var p1 = points[j];
                var p2 = points[j + 1];
                tempVertex.set([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, -p1.t * 0.5, p1.r, p1.g, p1.b, p1.a]);
                tempVertex.set([p2.x, p2.y, p2.z, p1.x, p1.y, p1.z, p2.t * 0.5, p2.r, p2.g, p2.b, p2.a]);
                tempVertex.set([p2.x, p2.y, p2.z, p1.x, p1.y, p1.z, -p2.t * 0.5, p2.r, p2.g, p2.b, p2.a]);
                tempVertex.set([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p1.t * 0.5, p1.r, p1.g, p1.b, p1.a]);
                tempVertex.numVertices += 4;
            }
            points.length = 0;
        };
        Line3D.prototype.end = function () {
            var _a = this, origin = _a.origin, data32PerVertex = _a.data32PerVertex, points = _a.points, tempVertex = _a.tempVertex, variables = _a.variables;
            if (points.length) {
                this.build();
            }
            var arr = tempVertex.toArray();
            var info = new rf.VertexInfo(arr, data32PerVertex, variables);
            var v = this.vertexBuffer = rf.context3D.createVertexBuffer(info);
            this.triangles = v.numVertices / 2;
            this.quad = this.triangles / 2;
            tempVertex.recycle();
            origin.recycle();
            this.tempVertex = this.origin = undefined;
        };
        Line3D.prototype.render = function (camera, option) {
            var c = rf.context3D;
            var _a = this, v = _a.vertexBuffer, m = _a.worldTransform, quad = _a.quad, triangles = _a.triangles;
            if (undefined == v) {
                return;
            }
            var p = this.program;
            if (undefined == p) {
                p = c.programs["Line3D"];
                if (undefined == p) {
                    p = this.createProgram();
                }
                this.program = p;
            }
            var setting = c.setting;
            setting.depth = true;
            setting.depthMode = 515;
            setting.cull = 0;
            c.setProgram(p);
            m.set(this.sceneTransform);
            m.m3_append(camera.sceneTransform);
            c.setProgramConstantsFromMatrix("mv", m);
            c.setProgramConstantsFromMatrix("p", camera.len);
            c.setProgramConstantsFromVector("originFar", 1 / camera.originFar, 1, false);
            if (rf.context3D.logarithmicDepthBuffer) {
                c.setProgramConstantsFromVector("logDepthFar", camera.logDepthFar, 1, false);
            }
            v.uploadContext(p);
            var i = c.getIndexByQuad(quad);
            c.drawTriangles(i, triangles);
        };
        Line3D.prototype.createProgram = function () {
            var v_def = "";
            var f_def = "";
            if (rf.context3D.logarithmicDepthBuffer) {
                v_def += "#define LOG_DEPTH_BUFFER\n";
                f_def += "#define LOG_DEPTH_BUFFER\n";
                if (rf.context3D.use_logdepth_ext) {
                    v_def += "#define LOG_DEPTH_BUFFER_EXT\n";
                    f_def += "#define LOG_DEPTH_BUFFER_EXT\n";
                }
            }
            var vertexCode = "\n                " + v_def + "\n                attribute vec3 posX;\n                attribute vec3 posY;\n                attribute float len;\n                attribute vec4 color;\n\n                #ifdef LOG_DEPTH_BUFFER\n                    #ifdef LOG_DEPTH_BUFFER_EXT\n                        varying float depth;\n                    #else\n                        uniform float logDepthFar;\n                    #endif\n                #endif\n\n                uniform mat4 mv;\n                uniform mat4 p;\n                varying vec4 vColor;\n                uniform float originFar;\n\n                void main(void){\n                    vec4 pos = mv * vec4(posX,1.0); \n                    vec4 t = pos - mv * vec4(posY,1.0);\n                    vec3 v = cross(t.xyz,vec3(0,0,1));\n                    v = normalize(v);\n                    float t2 = pos.z * originFar;\n                    if(t2 == 0.0){\n                       v.xyz *= len;\n                    }else{\n                        v.xyz *= len * t2;\n                    }\n                    // v.xyz *= len * t2;\n                    // pos.xyz += v.xyz;\n                    pos.xy += v.xy;\n                    pos = p * pos;\n                    \n                    gl_Position = pos;\n                    \n                    #ifdef LOG_DEPTH_BUFFER\n                        #ifdef LOG_DEPTH_BUFFER_EXT\n                            depth = gl_Position.w + 1.0;\n                        #else\n                            gl_Position.z = log2( max( 0.0000001, gl_Position.w + 1.0 ) ) * logDepthFar * 2.0 - 1.0;\n                            gl_Position.z *= gl_Position.w;\n                        #endif\n                    #endif\n\n                    vColor = color;\n                    // t2 = pos.z;\n                    // pos = vec4(t2,t2,t2,1.0);\n                    // vColor.xyzw = pos;\n                }\n            ";
            var fragmentCode = " \n                " + f_def + "\n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    #extension GL_EXT_frag_depth : enable\n                #endif\n                precision mediump float;\n                varying vec4 vColor;\n                #ifdef LOG_DEPTH_BUFFER_EXT\n                    varying float depth;\n                    uniform float logDepthFar;\n                #endif\n                void main(void){\n                    gl_FragColor = vColor;\n                    #ifdef LOG_DEPTH_BUFFER_EXT\n\t                    gl_FragDepthEXT = log2( depth ) * logDepthFar;\n                    #endif\n                }\n            ";
            return rf.context3D.createProgram(vertexCode, fragmentCode, "Line3D");
        };
        return Line3D;
    }(rf.SceneObject));
    rf.Line3D = Line3D;
    var Trident = (function (_super) {
        __extends(Trident, _super);
        function Trident(len, think) {
            if (len === void 0) { len = 200; }
            if (think === void 0) { think = 2; }
            var _this = _super.call(this) || this;
            var line;
            if (len * 0.1 > 60) {
                line = len - 60;
            }
            else {
                line = len * 0.9;
            }
            _this.clear();
            var color = 0xFF0000;
            _this.moveTo(0, 0, 0, think, color);
            _this.lineTo(line, 0, 0, think, color);
            _this.moveTo(line, 0, 0, think * 5, color);
            _this.lineTo(len, 0, 0, 0, color);
            color = 0x00FF00;
            _this.moveTo(0, 0, 0, think, color);
            _this.lineTo(0, line, 0, think, color);
            _this.moveTo(0, line, 0, think * 5, color);
            _this.lineTo(0, len, 0, 0, color);
            color = 0x0000FF;
            _this.moveTo(0, 0, 0, think, color);
            _this.lineTo(0, 0, line, think, color);
            _this.moveTo(0, 0, line, think * 5, color);
            _this.lineTo(0, 0, len, 0, color);
            _this.end();
            return _this;
        }
        return Trident;
    }(Line3D));
    rf.Trident = Trident;
    var LinePlane = (function (_super) {
        __extends(LinePlane, _super);
        function LinePlane(len, think, scale) {
            if (len === void 0) { len = 2; }
            if (think === void 0) { think = 1; }
            if (scale === void 0) { scale = 1; }
            var _this = _super.call(this) || this;
            var c = Math.ceil(len / scale);
            var color = 0xFFFFFF;
            _this.clear();
            _this.moveTo(-len, 0, -len, think * 2, color);
            _this.lineTo(len, 0, -len, think * 2, color);
            _this.lineTo(len, 0, len, think * 2, color);
            _this.lineTo(-len, 0, len, think * 2, color);
            _this.lineTo(-len, 0, -len, think * 2, color);
            color = 0xCCCCCC;
            var s = 0;
            for (var i = -c; i < c; i++) {
                _this.moveTo(i * scale, 0, -len, think, color);
                _this.lineTo(i * scale, 0, len, think, color);
            }
            for (var i = -c; i < c; i++) {
                _this.moveTo(-len, 0, i * scale, think, color);
                _this.lineTo(len, 0, i * scale, think, color);
            }
            _this.end();
            return _this;
        }
        return LinePlane;
    }(Line3D));
    rf.LinePlane = LinePlane;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var MoveRocker = (function (_super) {
        __extends(MoveRocker, _super);
        function MoveRocker() {
            var _this = _super.call(this) || this;
            _this.bindComponents();
            return _this;
        }
        MoveRocker.prototype.bindComponents = function () {
            var btn = new rf.GrapButton();
            this.addChild(btn);
            this.btn_left = btn;
            btn.label = "左";
            btn.setPos(20, 140);
            this.btn_right = btn = new rf.GrapButton();
            this.addChild(btn);
            btn.setPos(260, 140);
            btn.label = "右";
            this.btn_up = btn = new rf.GrapButton();
            this.addChild(btn);
            btn.setPos(140, 20);
            btn.label = "上";
            this.btn_down = btn = new rf.GrapButton();
            this.addChild(btn);
            btn.setPos(140, 260);
            btn.label = "下";
            var g = this.graphics;
            g.clear();
            g.drawRect(0, 0, 300, 300, 0, 0.5);
            g.drawRect(149, 0, 2, 300, 0xff0000, 0.5);
            g.drawRect(0, 149, 300, 2, 0xff0000, 0.5);
            g.end();
            this.updateHitArea();
            this.c_point = { x: this.w >> 1, y: this.h >> 1 };
            rf.Engine.addResize(this);
            this.on(50, this.downHandler, this);
            this.on(53, this.upHandler, this);
        };
        MoveRocker.prototype.downHandler = function (e) {
            e.stopImmediatePropagation = true;
            rf.ROOT.on(60, this.moveHandler, this);
            rf.ROOT.on(53, this.upHandler, this);
            rf.ROOT.on(50, this.rootdownHandler, this);
            this.moveHandler();
        };
        MoveRocker.prototype.rootdownHandler = function (e) {
            this._otherDown = true;
        };
        MoveRocker.prototype.upHandler = function (e) {
            if (this._otherDown) {
                this._otherDown = false;
                return;
            }
            rf.ROOT.off(60, this.moveHandler, this);
            rf.ROOT.off(53, this.upHandler, this);
            rf.ROOT.off(1, this.moveTick, this);
            rf.ROOT.off(50, this.rootdownHandler, this);
            this._identifier = -1;
            var unit = rf.u3d_role;
            unit.state.stopState(1, 1);
            unit.defaultAnim = "stand.kf";
            unit.playDefaultAnim();
        };
        MoveRocker.prototype.moveHandler = function (e) {
            if (e) {
                var identifier = e.data.identifier;
                if (this._identifier == -1) {
                    this._identifier = identifier;
                }
                if (identifier != this._identifier)
                    return;
            }
            var _a = this, sceneTransform = _a.sceneTransform, c_point = _a.c_point;
            var tx = rf.nativeMouseX - sceneTransform[12];
            var ty = rf.nativeMouseY - sceneTransform[13];
            var angle = Math.atan2(ty - c_point.y, tx - c_point.x);
            var tmpx = c_point.x + Math.cos(angle) * c_point.y - c_point.x;
            var tmpy = c_point.y + Math.sin(angle) * c_point.x - c_point.x;
            this.dx = tmpx;
            this.dy = tmpy;
            if (!rf.ROOT.hasEventListener(1)) {
                rf.ROOT.on(1, this.moveTick, this);
            }
        };
        MoveRocker.prototype.moveTick = function (e) {
            var _a = this, dx = _a.dx, dy = _a.dy;
            var unit = rf.u3d_role;
            unit.findPath(unit.x + dx, unit.y + dy);
        };
        MoveRocker.prototype.resize = function (width, height) {
            this.x = 10;
            this.y = height - this.h - 10;
        };
        return MoveRocker;
    }(rf.Sprite));
    rf.MoveRocker = MoveRocker;
    var SkillRocker = (function (_super) {
        __extends(SkillRocker, _super);
        function SkillRocker() {
            var _this = _super.call(this) || this;
            _this.bindComponents();
            return _this;
        }
        SkillRocker.prototype.bindComponents = function () {
            var btn = new rf.GrapButton();
            this.addChild(btn);
            this.btn_one = btn;
            btn.label = "技能1";
            btn.setPos(30, 140);
            btn.addClick(this.skill_click, this);
            this.btn_two = btn = new rf.GrapButton();
            this.addChild(btn);
            btn.setPos(80, 100);
            btn.label = "技能2";
            btn.addClick(this.skill_click, this);
            this.btn_three = btn = new rf.GrapButton();
            this.addChild(btn);
            btn.setPos(140, 80);
            btn.label = "技能3";
            btn.addClick(this.skill_click, this);
            this.btn_four = btn = new rf.GrapButton();
            this.addChild(btn);
            btn.setPos(200, 60);
            btn.label = "技能4";
            btn.addClick(this.skill_click, this);
            var g = this.graphics;
            g.clear();
            g.drawRect(0, 0, 300, 200, 0, 0.5);
            g.end();
            this.updateHitArea();
            rf.Engine.addResize(this);
        };
        SkillRocker.prototype.skill_click = function (e) {
            var unit = rf.u3d_role;
            if (unit.state.check(2) == false) {
                return;
            }
            var _a = this, btn_one = _a.btn_one, btn_two = _a.btn_two, btn_three = _a.btn_three, btn_four = _a.btn_four;
            var camera = rf.ROOT.camera2D;
            switch (e.currentTarget) {
                case btn_one:
                    unit.castSkill("skillA", camera._x + rf.nativeMouseX, camera._y + rf.nativeMouseY);
                    break;
                case btn_two:
                    unit.castSkill("skillB", camera._x + rf.nativeMouseX, camera._y + rf.nativeMouseY);
                    break;
                case btn_three:
                    unit.castSkill("skillC", camera._x + rf.nativeMouseX, camera._y + rf.nativeMouseY);
                    break;
                case btn_four:
                    unit.castSkill("skillD", camera._x + rf.nativeMouseX, camera._y + rf.nativeMouseY);
                    break;
            }
        };
        SkillRocker.prototype.resize = function (width, height) {
            this.x = width - this.w - 10;
            this.y = height - this.h - 10;
        };
        return SkillRocker;
    }(rf.Sprite));
    rf.SkillRocker = SkillRocker;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function skeleton_debug() {
    }
    rf.skeleton_debug = skeleton_debug;
    var SkeletonDebuger = (function (_super) {
        __extends(SkeletonDebuger, _super);
        function SkeletonDebuger(mesh) {
            var _this = _super.call(this) || this;
            _this.mesh = mesh;
            if (!mesh.kfm) {
                mesh.on(4, _this.meshReadlyHandler, _this);
            }
            else {
                _this.startFollow();
            }
            return _this;
        }
        SkeletonDebuger.prototype.meshReadlyHandler = function (event) {
            event.currentTarget.off(event.type, this.meshReadlyHandler, this);
            this.startFollow();
        };
        SkeletonDebuger.prototype.startFollow = function () {
            var skAnim = this.mesh.skAnim;
            if (skAnim) {
                skAnim.on(10, this.buildMesh, this);
                this.buildMesh();
            }
        };
        SkeletonDebuger.prototype.buildMesh = function (event) {
            var skAnim = this.mesh.skAnim;
            var boneTransform = skAnim.currentBoneTransfrom;
            var bone = skAnim.skeleton.rootBone;
        };
        return SkeletonDebuger;
    }(rf.SceneObject));
})(rf || (rf = {}));
var rf;
(function (rf) {
    var GrapButton = (function (_super) {
        __extends(GrapButton, _super);
        function GrapButton() {
            var _this = _super.call(this) || this;
            _this.bindComponents();
            return _this;
        }
        GrapButton.prototype.bindComponents = function () {
            this.txt_label = new rf.TextField();
            var format = new rf.TextFormat();
            format.size = 12;
            format.init();
            format.stroke = undefined;
            this.txt_label.format = format;
            this.txt_label.color = 0x333333;
            this.txt_label.gap = -1;
            this.addChild(this.txt_label);
            this.mouseChildren = false;
            this.txt_label.setPos(2, 2);
        };
        GrapButton.prototype.textResize = function () {
            var _a = this, graphics = _a.graphics, txt_label = _a.txt_label, mousedown = _a.mousedown;
            txt_label.color = mousedown ? 0xFFFFFF : 0xAAAAAA;
            var text = txt_label.text;
            txt_label.$text = undefined;
            txt_label.text = text;
            var w = txt_label.w, h = txt_label.h;
            graphics.clear();
            if (mousedown) {
                graphics.drawRect(0, h + 4, w + 3, 1, 0xFFFFFF);
            }
            else {
                graphics.drawRect(0, h + 4, w + 3, 1, 0xAAAAAA);
            }
            graphics.end();
            this.setSize(w + 3, h + 4);
        };
        return GrapButton;
    }(rf.Button));
    rf.GrapButton = GrapButton;
    var TimeDragItem = (function (_super) {
        __extends(TimeDragItem, _super);
        function TimeDragItem() {
            var _this = _super.call(this) || this;
            _this.bindComponents();
            return _this;
        }
        TimeDragItem.prototype.bindComponents = function () {
            var text = new rf.TextField();
            text.mouseEnabled = false;
            text.y = 2;
            var format = new rf.TextFormat();
            format.size = 12;
            format.init();
            format.stroke = undefined;
            text.format = format;
            text.color = 0xFFFFFF;
            text.gap = -1;
            this.txt_label = text;
            this.addChild(text);
        };
        TimeDragItem.prototype.setData = function (width, height, color) {
            if (color === void 0) { color = 0xff0000; }
            var g = this.graphics;
            g.clear();
            g.drawRect(-width >> 1, 0, width, height, color);
            g.drawRect(0, 0, 1, height + 20, color);
            g.end();
        };
        TimeDragItem.prototype.updateVal = function (val) {
            var txt_label = this.txt_label;
            txt_label.text = val + "";
            txt_label.x = -txt_label.textWidth >> 1;
        };
        return TimeDragItem;
    }(rf.Sprite));
    rf.TimeDragItem = TimeDragItem;
    var TimeBar = (function (_super) {
        __extends(TimeBar, _super);
        function TimeBar() {
            var _this = _super.call(this) || this;
            _this.txts = [];
            _this.offsetx = 80;
            _this.bindComponents();
            return _this;
        }
        TimeBar.prototype.bindComponents = function () {
            var format = new rf.TextFormat();
            format.size = 12;
            format.init();
            format.stroke = undefined;
            var btn = new GrapButton();
            this.addChild(btn);
            this.btn_play = btn;
            btn.label = "播放";
            btn.y = 10;
            var con = new TimeDragItem();
            con.setData(50, 16);
            con.x = this.offsetx;
            this.btn_time = con;
            this.addChild(con);
            con.on(50, this.downHandler, this);
            this.on(56, this.dirtHandler, this);
            btn.addClick(this.playHandler, this);
        };
        TimeBar.prototype.setTm = function (ttm) {
            this.targetTm = ttm;
        };
        TimeBar.prototype.setData = function (duration, pixSec) {
            var _a = this, offsetx = _a.offsetx, g = _a.graphics;
            this.reset();
            var time = Math.ceil(duration / 1000);
            this.params = { duration: duration, pixSec: pixSec, time: time, btnEx: time * pixSec + offsetx };
            this.draw();
            g.clear();
            g.drawRect(-30, 0, time * pixSec + 60 + offsetx, 40, 0, 0.9);
            g.end();
            this.updateHitArea();
            rf.Engine.addResize(this);
        };
        TimeBar.prototype.draw = function () {
            var _a = this, offsetx = _a.offsetx, params = _a.params;
            var pixSec = params.pixSec, time = params.time;
            for (var i = 0; i <= time; i++) {
                var txt = this.createtxt(i);
                this.addChild(txt);
                txt.text = i + "s";
                txt.setPos(i * pixSec - (txt.textWidth * 0.5) + offsetx, 16);
            }
        };
        TimeBar.prototype.update = function (now, interval) {
            var _a = this, params = _a.params, offsetx = _a.offsetx, btn_time = _a.btn_time;
            var tx = btn_time.x + 4.8;
            if (tx > params.btnEx) {
                tx = offsetx;
                rf.Engine.removeTick(this);
            }
            this.updateBtn(tx);
        };
        TimeBar.prototype.playHandler = function (e) {
            var _a = this, params = _a.params, offsetx = _a.offsetx;
            rf.Engine.addTick(this);
        };
        TimeBar.prototype.dirtHandler = function (e) {
            var _a = this, sceneTransform = _a.sceneTransform, params = _a.params, offsetx = _a.offsetx;
            var tx = rf.nativeMouseX - sceneTransform[12];
            tx = tx < offsetx ? offsetx : tx;
            tx = tx > params.btnEx ? params.btnEx : tx;
            this.updateBtn(tx);
        };
        TimeBar.prototype.downHandler = function (e) {
            e.stopImmediatePropagation = true;
            this.preMouseX = rf.nativeMouseX;
            rf.ROOT.on(60, this.moveHandler, this);
            rf.ROOT.on(53, this.upHandler, this);
        };
        TimeBar.prototype.moveHandler = function (e) {
            var _a = this, btn_time = _a.btn_time, params = _a.params;
            var _b = this, preMouseX = _b.preMouseX, offsetx = _b.offsetx;
            var tx = rf.nativeMouseX - preMouseX;
            var tmpx = btn_time.x + tx;
            tmpx = tmpx < offsetx ? offsetx : tmpx;
            tmpx = tmpx > params.btnEx ? params.btnEx : tmpx;
            this.updateBtn(tmpx);
        };
        TimeBar.prototype.upHandler = function (e) {
            rf.ROOT.off(60, this.moveHandler, this);
            rf.ROOT.off(53, this.upHandler, this);
        };
        TimeBar.prototype.updateBtn = function (tx) {
            var _a = this, btn_time = _a.btn_time, params = _a.params, offsetx = _a.offsetx, targetTm = _a.targetTm;
            var tmptime = parseInt((tx - offsetx) / params.pixSec * 1000);
            btn_time.x = tx;
            btn_time.updateVal(tmptime);
            rf.tm_set(targetTm, tmptime);
            targetTm.target.update(0, 0);
            this.preMouseX = rf.nativeMouseX;
            this.simpleDispatch(10, tmptime);
        };
        TimeBar.prototype.createtxt = function (i) {
            var txts = this.txts;
            var text = txts[i];
            if (text)
                return text;
            text = this.txts[i] = new rf.TextField();
            text.mouseEnabled = false;
            var format = new rf.TextFormat();
            format.size = 16;
            format.init();
            format.stroke = undefined;
            text.format = format;
            text.color = 0xFFFFFF;
            text.gap = -1;
            return text;
        };
        TimeBar.prototype.reset = function () {
            var _a = this, txts = _a.txts, btn_time = _a.btn_time, offsetx = _a.offsetx;
            for (var i = 0; i < txts.length; i++) {
                var element = txts[i];
                element.remove();
            }
            btn_time.x = offsetx;
            btn_time.updateVal(0);
        };
        TimeBar.prototype.resize = function (width, height) {
            this.x = width - this.w >> 1;
            this.y = height - this.h;
        };
        return TimeBar;
    }(rf.Sprite));
    rf.TimeBar = TimeBar;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var AStar = (function () {
        function AStar() {
            this.aSurOff = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
        }
        AStar.prototype.go = function (map, xfrom, yfrom, xto, yto, event) {
            this.map = map;
            this.xfrom = xfrom;
            this.yfrom = yfrom;
            this.xto = xto;
            this.yto = yto;
            this.event = event;
            this.minNode = undefined;
            this.minih = 99999999;
            this.openlist = [[xfrom, yfrom, 0, Math.abs(xfrom - xto) * 10 + Math.abs(yfrom - yto) * 10, null]];
            this.closelist = [];
            this.excute();
            if (!event) {
                return this.merge(map, this.getNearest());
            }
        };
        AStar.prototype.getPushIndex = function (wayList, f) {
            var length = wayList.length - 1;
            if (length < 0) {
                return 0;
            }
            var flag;
            var num = length + 1;
            var index = (num / 2) >> 0;
            while (num > 1) {
                flag = num & 1;
                num = (num + flag) >> 1;
                var node = wayList[index];
                if (f <= node[2] + node[3]) {
                    index -= num;
                    if (index < 0)
                        index = 0;
                }
                else {
                    index += num;
                    if (index >= length) {
                        index = length;
                    }
                }
            }
            if (f > wayList[index][2]) {
                return ++index;
            }
            return index;
        };
        AStar.prototype.excute = function () {
            var _a = this, openlist = _a.openlist, closelist = _a.closelist, event = _a.event, xto = _a.xto, yto = _a.yto, map = _a.map, aSurOff = _a.aSurOff;
            var w = map.w, h = map.h;
            while (openlist.length) {
                var node = openlist.shift();
                var x = node[0], y = node[1], g = node[2];
                var index = y * w + x;
                if (closelist[index]) {
                    continue;
                }
                closelist[index] = 1;
                if (x == xto && y == yto) {
                    this.minNode = node;
                    if (event) {
                        event.simpleDispatch(4);
                    }
                    return 0;
                }
                for (var i = 0; i < aSurOff.length; i++) {
                    var _b = aSurOff[i], dx = _b[0], dy = _b[1];
                    dx += x;
                    dy += y;
                    if (dx < 0 || dy < 0 || dx >= w || dy >= h) {
                        continue;
                    }
                    index = dy * w + dx;
                    var cg = map.getWalk(dx, dy);
                    if (cg < 1 || closelist[index]) {
                        continue;
                    }
                    var temp1 = dx - x + dy - y;
                    temp1 = temp1 < 0 ? -temp1 : temp1;
                    var temp2 = xto - dx;
                    temp2 = temp2 < 0 ? -temp2 : temp2;
                    var temp3 = yto - dy;
                    temp3 = temp3 < 0 ? -temp3 : temp3;
                    var newNode = [
                        dx,
                        dy,
                        (temp1 == 1 ? 10 + g : 14 + g),
                        (temp2 + temp3) * 10,
                        node
                    ];
                    var gh = newNode[2] + newNode[3];
                    index = this.getPushIndex(openlist, gh);
                    if (newNode[3] < this.minih) {
                        this.minih = newNode[3];
                        this.minNode = newNode;
                    }
                    openlist.splice(index, 0, newNode);
                }
            }
            if (event) {
                event.simpleDispatch(4);
            }
            return 0;
        };
        AStar.prototype.getNearest = function () {
            var minNode = this.minNode;
            return minNode && minNode.length ? this.format(minNode) : undefined;
        };
        AStar.prototype.format = function (node) {
            var arr = [];
            var i = 0;
            while (node) {
                arr.push([node[0], node[1]]);
                node = node[4];
                i++;
            }
            arr.reverse();
            return arr;
        };
        AStar.prototype.merge = function (ml, nearest) {
            var len = nearest.length;
            if (len < 2) {
                return nearest;
            }
            var path = [];
            var startIndex = 0;
            var endIndex = len - 1;
            var index;
            while (startIndex <= endIndex) {
                var current = nearest[startIndex++];
                path.push(current);
                var sx = current[0];
                var sy = current[1];
                index = endIndex;
                while (index > startIndex) {
                    var test = nearest[index];
                    var flag = true;
                    var ex = test[0];
                    var ey = test[1];
                    var checkD = 1;
                    var dx = ex - sx;
                    var dy = ey - sy;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    var px = dx / dist;
                    var py = dy / dist;
                    while (dist > checkD) {
                        dx = Math.round(ex - px * checkD);
                        dy = Math.round(ey - py * checkD);
                        if (!ml.getWalk(dx, dy)) {
                            flag = false;
                            break;
                        }
                        checkD++;
                    }
                    if (flag) {
                        startIndex = index;
                        break;
                    }
                    index--;
                }
            }
            return path;
        };
        return AStar;
    }());
    rf.AStar = AStar;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Arpg2DCamera = (function (_super) {
        __extends(Arpg2DCamera, _super);
        function Arpg2DCamera() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Arpg2DCamera.prototype.init = function () {
            var _a = this.map, sw = _a.sw, sh = _a.sh, data = _a.data;
            var w = data.w, h = data.h;
            var hw = sw >> 1;
            var hh = sh >> 1;
            this.top = hh;
            this.left = hw;
            this.right = w - hw;
            this.bottom = h - hh;
        };
        Arpg2DCamera.prototype.resize = function (width, height) {
            if (this.map) {
                this.init();
            }
        };
        Arpg2DCamera.prototype.update = function (now, interval) {
            var _a = this, watchTarget = _a.watchTarget, map = _a.map;
            if (!watchTarget || !map) {
                return;
            }
            var sceneTransform = watchTarget.sceneTransform;
            var _b = this, top = _b.top, left = _b.left, right = _b.right, bottom = _b.bottom;
            var _x = sceneTransform[12];
            var _y = sceneTransform[13] + Math.floor(top * 0.3);
            var _z = sceneTransform[14];
            var _w = 1000;
            _x = Math.max(left, Math.min(_x, right)) - left;
            _y = Math.max(top, Math.min(_y, bottom)) - top;
            _x = Math.round(_x);
            _y = Math.round(_y);
            rf.scene.sun.setSunOffset(_x + left, _y + top, _z);
            this.setPos(_x, _y, _z);
            map.setviewRect(_x, _y);
        };
        return Arpg2DCamera;
    }(rf.Camera));
    rf.Arpg2DCamera = Arpg2DCamera;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function map_create_data(id, pwc, phc) {
        var data = {};
        data.id = id;
        data.pw = 256;
        data.ph = 256;
        data.w = pwc * data.pw;
        data.h = phc * data.ph;
        data.gew = 60;
        data.geh = 30;
        data.hgew = data.gew * 0.5;
        data.hgeh = data.geh * 0.5;
        data.gw = Math.floor(data.w / data.gew);
        data.gh = Math.floor(data.h / data.geh);
        data.w = data.gew * data.gw;
        data.h = data.geh * data.gh;
        var len = data.gw * data.gh;
        var buffer = new ArrayBuffer(len);
        var byte = new rf.Byte(buffer);
        for (var i = 0; i < len; i++) {
            byte.position = i;
            byte.writeByte(1);
        }
        data.byte = buffer;
        return data;
    }
    rf.map_create_data = map_create_data;
    var MapGrap = (function (_super) {
        __extends(MapGrap, _super);
        function MapGrap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MapGrap.prototype, "available", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return MapGrap;
    }(rf.SceneObject));
    var SnakeMap = (function (_super) {
        __extends(SnakeMap, _super);
        function SnakeMap(variables) {
            var _this = _super.call(this, variables) || this;
            _this.gx = -1;
            _this.gy = -1;
            _this.sw = 0;
            _this.sh = 0;
            var batch;
            var mapGrap = new MapGrap();
            var sourceSize = SnakeMap.sourceSize;
            mapGrap.source = rf.createBitmapSource("map", sourceSize.x, sourceSize.y, false);
            mapGrap.source.textureData = rf.context3D.getTextureData("map", false, 9729, 9729);
            batch = new rf.SingleRenderer(mapGrap);
            if (rf.ROOT.shadow) {
                mapGrap.addFilter(new rf.ShadowFilter(mapGrap));
            }
            batch.depth = true;
            batch.depthMode = 515;
            mapGrap.renderer = batch;
            mapGrap.setSca(1, rf.SY, 1);
            mapGrap.z = -0.1;
            _this.setRot(rf.RX, 0, 0);
            _this.addChild(mapGrap);
            _this.mapGrap = mapGrap;
            var mapHalo = new rf.Sprite();
            mapHalo.setSca(1, rf.SY, 1);
            mapHalo.renderer = new rf.BatchRenderer(mapHalo);
            _this.addChild(mapHalo);
            _this.mapHalo = mapHalo;
            return _this;
        }
        SnakeMap.prototype.getFull = function (s, len) {
            while (s.length < len) {
                s = "0" + s;
            }
            return s;
        };
        SnakeMap.prototype.init = function (data, sceneWidth, sceneHeight) {
            this.data = data;
            this.gx = -1;
            this.gy = -1;
            var p = "m/" + data.id + "/";
            this.perfix = p;
            this.setSize(sceneWidth, sceneHeight);
            if (!data.setting) {
                data.setting = new rf.Map2DSetting(data);
            }
        };
        SnakeMap.prototype.render = function (camera, option) {
            _super.prototype.render.call(this, camera, option);
        };
        SnakeMap.prototype.setSize = function (width, height) {
            _super.prototype.setSize.call(this, width, height);
            this.sw = width;
            this.sh = height;
            var _a = this.data, pw = _a.pw, ph = _a.ph;
            this.gw = Math.ceil(width / pw) + 1;
            this.gh = Math.ceil(height / ph) + 1;
        };
        SnakeMap.prototype.setviewRect = function (x, y) {
            var _a = this, data = _a.data, gx = _a.gx, gy = _a.gy;
            var pw = data.pw, ph = data.ph;
            var dx = Math.floor(x / pw);
            var dy = Math.floor(y / ph);
            if (gx == dx && gy == dy) {
                return;
            }
            this.gx = dx;
            this.gy = dy;
            var _b = this, perfix = _b.perfix, gw = _b.gw, gh = _b.gh, mapGrap = _b.mapGrap;
            var graphics = mapGrap.graphics, source = mapGrap.source;
            var w = data.w, h = data.h;
            var frames = source.areas[0].frames;
            graphics.clear();
            var needloads = [];
            for (var j = 0; j < gh; j++) {
                for (var i = 0; i < gw; i++) {
                    var x_1 = dx + i;
                    var y_1 = dy + j;
                    if (x_1 < 0 || y_1 < 0 || x_1 * pw >= w || y_1 * ph >= h) {
                        continue;
                    }
                    var url = perfix + ("" + this.getFull(y_1 + "", 3) + this.getFull(x_1 + "", 3) + ".jpg");
                    var vo = frames[url];
                    if (vo == undefined) {
                        needloads.push([url, x_1, y_1]);
                    }
                    else {
                        graphics.drawBitmap(x_1 * pw, y_1 * ph, vo);
                    }
                }
            }
            for (var i = 0; i < needloads.length; i++) {
                var _c = needloads[i], url = _c[0], x_2 = _c[1], y_2 = _c[2];
                var vo = source.setSourceVO(url + "", data.pw, data.ph);
                if (vo) {
                    rf.loadRes(rf.RES_PERFIX, url + "", this.maploadCompleteHandler, this, 5);
                    graphics.drawBitmap(x_2 * pw, y_2 * ph, vo);
                }
                else {
                    console.log(x_2, y_2, "no draw");
                }
            }
            graphics.end();
        };
        SnakeMap.prototype.maploadCompleteHandler = function (event) {
            var source = this.mapGrap.source;
            var vo = source.getSourceVO(event.currentTarget.url);
            if (vo) {
                source.drawimg(event.data, vo.x, vo.y, vo.w, vo.h);
            }
        };
        SnakeMap.sourceSize = { x: 2048, y: 2048 };
        return SnakeMap;
    }(rf.SceneObject));
    rf.SnakeMap = SnakeMap;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Map2DSetting = (function () {
        function Map2DSetting(data) {
            this.alphas = [1.0, 0.7, 0.5, 0.2];
            this.data = data;
            this.path = new Uint8Array(data.byte);
            this.w = data.gw;
            this.h = data.gh;
        }
        Map2DSetting.prototype.getValue = function (x, y) {
            var _a = this, w = _a.w, h = _a.h, path = _a.path;
            if (x < 0 || y < 0 || x >= w || y >= h) {
                return 0;
            }
            var d = y * w + x;
            if (d < 0 || d >= path.length) {
                return 0;
            }
            return path[d];
        };
        Map2DSetting.prototype.getWalk = function (x, y) {
            var d = this.getValue(x, y);
            return d & 1;
        };
        Map2DSetting.prototype.getsafe = function (x, y) {
            var d = this.getValue(x, y);
            return ((d << 6) >> 7) & 1;
        };
        Map2DSetting.prototype.getAlpha = function (x, y) {
            var d = this.getValue(x, y);
            return (d & 12) >> 2;
        };
        Map2DSetting.prototype.setWalk = function (x, y, val) {
            if (val > 1 || val < 0)
                rf.ThrowError("设置行走区域值超出0-1范围");
            var _a = this, w = _a.w, path = _a.path;
            var d = y * w + x;
            var old = path[d];
            var n = old & 584 | val;
            this.path[d] = n;
        };
        Map2DSetting.prototype.setAlpha = function (x, y, val) {
            if (val > 12 || val < 0)
                rf.ThrowError("设置透明区域值超出范围");
            var _a = this, w = _a.w, path = _a.path;
            var d = y * w + x;
            var old = path[d];
            var n = (val << 2) | (old & 9);
            this.path[d] = n;
        };
        Map2DSetting.prototype.setSafe = function (x, y, val) {
            if (val > 1 || val < 0)
                rf.ThrowError("设置安全区值超出范围");
            var _a = this, w = _a.w, path = _a.path;
            var d = y * w + x;
            var old = path[d];
            var n = (val << 1) | (old & 577);
            this.path[d] = n;
        };
        return Map2DSetting;
    }());
    rf.Map2DSetting = Map2DSetting;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var MapRtt = (function (_super) {
        __extends(MapRtt, _super);
        function MapRtt() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.nativeRender = true;
            return _this;
        }
        MapRtt.prototype.render = function (camera, option) {
        };
        return MapRtt;
    }(rf.SceneObject));
    rf.MapRtt = MapRtt;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var StateModel = (function () {
        function StateModel() {
            this.running = {};
        }
        StateModel.prototype.runningList = function () {
            var arr = [];
            var running = this.running;
            for (var key in running) {
                var vo = running[key];
                if (vo && vo.active) {
                    arr.push(vo);
                }
            }
            return arr;
        };
        StateModel.prototype.isRunning = function (id) {
            var vo = this.running[id];
            return (vo && vo.active) ? true : false;
        };
        StateModel.prototype.check = function (id) {
            var running = this.running;
            for (var key in running) {
                var vo = running[key];
                if (vo && vo.active) {
                    var b = rf.stateRelation[vo.id][id];
                    if (b == 0) {
                        return false;
                    }
                }
            }
            return true;
        };
        StateModel.prototype.startState = function (id, thisobj, stop, trystop) {
            var running = this.running;
            for (var key in running) {
                var vo_1 = running[key];
                if (vo_1) {
                    var b = rf.stateRelation[vo_1.id][id];
                    if (b == 1) {
                        this.stopState(vo_1.id, id);
                    }
                }
            }
            var vo = running[id];
            if (!vo) {
                vo = { id: id };
            }
            vo.thisobj = thisobj;
            vo.stop = stop;
            vo.trystop = trystop;
            vo.active = true;
            running[id] = vo;
            return vo;
        };
        StateModel.prototype.stopState = function (id, activeId) {
            var running = this.running;
            var vo = running[id];
            if (vo && vo.active) {
                vo.active = false;
                var stop_1 = vo.stop, thisobj = vo.thisobj;
                if (stop_1) {
                    stop_1.call(thisobj, activeId);
                }
            }
        };
        StateModel.prototype.stop = function (activeId) {
            var running = this.running;
            for (var key in running) {
                var vo = running[key];
                if (vo) {
                    this.stopState(vo.id, activeId);
                }
            }
        };
        return StateModel;
    }());
    rf.StateModel = StateModel;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function state_Setup() {
        rf.stateRelation = [];
        var arr;
        var allAllow = [];
        for (var i = 0; i < 11; ++i) {
            allAllow[i] = 2;
        }
        rf.stateRelation[1] = arr = [];
        arr[1] = 2;
        arr[2] = 1;
        arr[3] = 2;
        arr[4] = 2;
        arr[6] = 2;
        arr[7] = 2;
        arr[8] = 1;
        arr[9] = 1;
        rf.stateRelation[2] = arr = [];
        arr[1] = 0;
        arr[2] = 0;
        arr[3] = 2;
        arr[4] = 0;
        arr[6] = 0;
        arr[7] = 0;
        arr[8] = 1;
        arr[9] = 2;
        rf.stateRelation[3] = arr = [];
        arr[1] = 2;
        arr[2] = 2;
        arr[3] = 1;
        arr[4] = 2;
        arr[5] = 2;
        arr[6] = 2;
        arr[7] = 2;
        arr[8] = 2;
        arr[9] = 2;
        arr[10] = 2;
        rf.stateRelation[6] = arr = [];
        arr[1] = 2;
        arr[2] = 1;
        arr[3] = 2;
        arr[4] = 2;
        arr[6] = 1;
        arr[7] = 1;
        arr[8] = 1;
        arr[9] = 2;
        rf.stateRelation[7] = arr = [];
        arr[1] = 2;
        arr[2] = 1;
        arr[3] = 2;
        arr[4] = 2;
        arr[6] = 1;
        arr[7] = 1;
        arr[8] = 1;
        arr[9] = 2;
        rf.stateRelation[10] = arr = [];
        arr[1] = 2;
        arr[2] = 2;
        arr[3] = 2;
        arr[4] = 2;
        arr[6] = 2;
        arr[8] = 1;
        arr[9] = 2;
        rf.stateRelation[9] = arr = [];
        arr[1] = 2;
        arr[2] = 2;
        arr[3] = 2;
        arr[4] = 2;
        arr[5] = 2;
        arr[6] = 2;
        arr[7] = 2;
        arr[8] = 2;
        arr[9] = 2;
        arr[10] = 2;
        rf.stateRelation[8] = arr = [];
        arr[1] = 0;
        arr[2] = 0;
        arr[3] = 2;
        arr[4] = 0;
        arr[5] = 0;
        arr[6] = 0;
        arr[7] = 0;
        arr[8] = 0;
        arr[9] = 2;
        arr[10] = 0;
    }
    rf.state_Setup = state_Setup;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.RX = 55;
    rf.SY = 1 / Math.cos(rf.RX * rf.DEGREES_TO_RADIANS);
    rf.OBJECT2D_SCALE = 80;
    var MapObject = (function (_super) {
        __extends(MapObject, _super);
        function MapObject() {
            var _this = _super.call(this) || this;
            _this.createContainer();
            return _this;
        }
        MapObject.prototype.setSceneModel = function (value) {
            this.sceneModel = value;
            var container = this.container;
            switch (value) {
                case 0:
                    container.scale = rf.OBJECT2D_SCALE;
                    container.setRot(90, 0, 180);
                    break;
                case 1:
                    container.scale = rf.OBJECT2D_SCALE;
                    container.setRot(0, 0, 180);
                    break;
                case 2:
                    container.scale = 1.0;
                    container.setRot(0, 0, 0);
                    break;
            }
        };
        MapObject.prototype.createContainer = function () {
            var container = new rf.SceneObject();
            container.scale = rf.OBJECT2D_SCALE;
            container.setRot(0, 0, 180);
            this.addChild(container);
            this.container = container;
        };
        Object.defineProperty(MapObject.prototype, "rotation", {
            get: function () {
                return this.rotationZ + 90;
            },
            set: function (value) {
                this.rotationZ = value - 90;
            },
            enumerable: true,
            configurable: true
        });
        MapObject.prototype.updateTransform = function () {
            var _a = this, transform = _a.transform, pivotZero = _a.pivotZero;
            if (pivotZero) {
                var pivotPonumber = this.pivotPonumber;
                var x = pivotPonumber[0], y = pivotPonumber[1], z = pivotPonumber[2];
                transform.m3_identity();
                transform.m3_translation(-x, -y, -z);
                transform.m3_scale(this._scaleX, this._scaleY, this._scaleZ);
                transform.m3_translation(this._x + x, this._y * rf.SY + y, this._z + z);
            }
            else {
                var _b = this, pos = _b.pos, sceneModel = _b.sceneModel, rot = _b.rot, sca = _b.sca;
                if (sceneModel == 0) {
                    var temp = rf.TEMP_VECTOR3D;
                    temp[0] = pos[0];
                    temp[1] = pos[1] * rf.SY;
                    temp[2] = pos[2];
                    temp[3] = pos[3];
                    transform.m3_recompose(temp, rot, sca);
                }
                else {
                    transform.m3_recompose(pos, rot, sca);
                }
            }
            this.status &= ~1;
        };
        MapObject.prototype.setTransform = function (matrix) {
            _super.prototype.setTransform.call(this, matrix);
            var _a = this, _y = _a._y, sceneModel = _a.sceneModel;
            if (sceneModel == 0) {
                this.pos.y = this._y = _y / rf.SY;
            }
        };
        return MapObject;
    }(rf.SceneObject));
    rf.MapObject = MapObject;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ActorAction = (function (_super) {
        __extends(ActorAction, _super);
        function ActorAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActorAction.prototype.init = function () { };
        ActorAction.prototype.check = function (actor, state) {
            return state.check(this.stateID);
        };
        ActorAction.prototype.start = function (actor, params) {
            this.actor = actor;
            var state = actor.state;
            if (this.check(actor, state) == false) {
                return false;
            }
            state.startState(this.stateID, this, this.stop, this.tryStop);
            this.doStart(actor, params);
            return true;
        };
        ActorAction.prototype.doStart = function (actor, params) {
        };
        ActorAction.prototype.tryStop = function (activeID) {
            return 0;
        };
        ActorAction.prototype.end = function () {
            this.actor.state.stopState(this.stateID, this.stateID);
        };
        ActorAction.prototype.stop = function (activeID) {
        };
        ActorAction.prototype.update = function (now, interval) {
        };
        ActorAction.prototype.actorSyncPosition = function () {
            var actor = this.actor;
            if (actor) {
            }
        };
        return ActorAction;
    }(rf.MiniDispatcher));
    rf.ActorAction = ActorAction;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ShadowImg = (function (_super) {
        __extends(ShadowImg, _super);
        function ShadowImg() {
            var _this = _super.call(this) || this;
            _this.aglin = 4;
            return _this;
        }
        return ShadowImg;
    }(rf.Image));
    rf.ShadowImg = ShadowImg;
    var MsgPop = (function (_super) {
        __extends(MsgPop, _super);
        function MsgPop() {
            var _this = _super.call(this) || this;
            var txt = _this.txt = new rf.TextField();
            txt.init();
            txt.format.size = 12;
            txt.gap = 0;
            txt.html = true;
            txt.multiline = true;
            txt.w = 140;
            txt.setPos(15, 15);
            _this.addChild(txt);
            _this.rect = { x: 15, y: 10, w: 90, h: 40 };
            _this.load(rf.getFullUrl("i/popchat"), ".png");
            return _this;
        }
        Object.defineProperty(MsgPop.prototype, "text", {
            set: function (str) {
                var txt = this.txt;
                txt.w = 140;
                txt.text = str;
                txt.h = txt.textHeight + 5;
                this.setSize(169, txt.textHeight + 40);
            },
            enumerable: true,
            configurable: true
        });
        return MsgPop;
    }(rf.Image));
    rf.MsgPop = MsgPop;
    var TitleUtils = (function () {
        function TitleUtils() {
            var format = new rf.TextFormat();
            format.size = 16;
            format.init();
            format.stroke = { size: 1, color: 0 };
            this.txtformat = format;
        }
        TitleUtils.prototype.bind = function (target) {
            this.parent = target;
            this.init();
        };
        TitleUtils.prototype.init = function () {
            var parent = this.parent;
            var con = new rf.NoActiveSprite(rf.componentSource);
            this.textCon = con;
            con.renderer = new rf.BatchRenderer(con);
            parent.addChild(con);
            con = new rf.NoActiveSprite(rf.componentSource);
            this.effCon = con;
            parent.addChild(con);
        };
        TitleUtils.prototype.addTxt = function () {
            var _a = this, textCon = _a.textCon, txtformat = _a.txtformat;
            var textfiled = rf.recyclable(rf.TextField);
            textfiled.source = textCon.source;
            textfiled.html = true;
            textfiled.format = txtformat;
            textCon.addChild(textfiled);
            return textfiled;
        };
        TitleUtils.prototype.addImg = function () {
            var textCon = this.textCon;
            var img = rf.recyclable(rf.Image);
            img.source = textCon.source;
            textCon.addChild(img);
            return img;
        };
        TitleUtils.prototype.addEff = function () {
            var effCon = this.effCon;
            var ani = new rf.Ani();
            effCon.addChild(ani);
            return ani;
        };
        TitleUtils.prototype.addHalo = function () {
            var mapHalo = rf.singleton(rf.SnakeMap).mapHalo;
            var img = rf.recyclable(ShadowImg);
            img.source = mapHalo.source;
            mapHalo.addChild(img);
            return img;
        };
        TitleUtils.prototype.addPop = function () {
            var textCon = this.textCon;
            var pop = rf.recyclable(MsgPop);
            pop.source = textCon.source;
            textCon.addChild(pop);
            return pop;
        };
        return TitleUtils;
    }());
    rf.TitleUtils = TitleUtils;
    var UnitTitle = (function () {
        function UnitTitle() {
            this._visible = true;
            this.titlevos = [];
            this.util = rf.singleton(TitleUtils);
        }
        Object.defineProperty(UnitTitle.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (val) {
                this._visible = val;
                this.doShow();
            },
            enumerable: true,
            configurable: true
        });
        UnitTitle.prototype.setPos = function (x, y) {
            x = Math.round(x);
            y = Math.round(y);
            this.x = x;
            this.y = y;
            this.layout();
        };
        UnitTitle.prototype.popMsg = function (val) {
            var pop = this.util.addPop();
            pop.text = val;
            this.msgpop = pop;
        };
        UnitTitle.prototype.setText = function (val, level, color, isfollow, hd) {
            if (color === void 0) { color = 0xffffff; }
            if (isfollow === void 0) { isfollow = false; }
            if (hd === void 0) { hd = 0; }
            var vo = this.getTitleVo(level, isfollow);
            var textfiled = vo.dis;
            if (!textfiled) {
                textfiled = vo.dis = this.util.addTxt();
            }
            textfiled.color = color;
            textfiled.text = val;
            vo.ox = -textfiled.textWidth >> 1;
            vo.oy = -textfiled.textHeight >> 1;
            vo.hor_dir = hd;
            vo.width = textfiled.textWidth;
            vo.height = textfiled.textHeight;
            textfiled.visible = this._visible;
            rf.callLater.add(this.layout, this);
        };
        UnitTitle.prototype.setEff = function (url, level, offsetx, offsety, isfollow, hd) {
            if (offsetx === void 0) { offsetx = 0; }
            if (offsety === void 0) { offsety = 0; }
            if (isfollow === void 0) { isfollow = false; }
            if (hd === void 0) { hd = 0; }
            var vo = this.getTitleVo(level, isfollow);
            var ani = vo.dis;
            if (!ani) {
                ani = vo.dis = this.util.addEff();
            }
            ani.load(url);
            vo.ox = offsetx;
            vo.oy = offsety;
            vo.width = Math.abs(offsetx * 2);
            vo.height = Math.abs(offsety * 2);
            vo.hor_dir = hd;
            ani.visible = this._visible;
            rf.callLater.add(this.layout, this);
        };
        UnitTitle.prototype.setIcon = function (url, level, isfollow, hd) {
            if (isfollow === void 0) { isfollow = false; }
            if (hd === void 0) { hd = 0; }
            var vo = this.getTitleVo(level, isfollow);
            var img = vo.dis;
            if (!img) {
                img = vo.dis = this.util.addImg();
            }
            vo.hor_dir = hd;
            img.visible = this._visible;
            img.load(url);
            img.on(4, this.imgHandler, this);
        };
        UnitTitle.prototype.addDisplay = function (dis, level) {
            var vo = this.getTitleVo(level);
            vo.dis = dis;
            vo.ox = -dis.w >> 1;
            vo.oy = -dis.h >> 1;
            vo.width = dis.w;
            vo.height = dis.h;
            dis.visible = this._visible;
            rf.callLater.add(this.layout, this);
        };
        UnitTitle.prototype.removeLevel = function (level) {
            var titlevos = this.titlevos;
            var vo = titlevos[level];
            if (!vo)
                return;
            vo.dis.remove();
            vo.dis.onRecycle();
            vo.dis = undefined;
            titlevos[level] = undefined;
        };
        UnitTitle.prototype.changeColor = function (level, color) {
            var vo = this.getTitleVo(level);
            if (!vo)
                return;
            var textfiled = vo.dis;
            if (textfiled instanceof rf.TextField) {
                textfiled.color = color;
            }
            else {
                console.log("title changeColor只支持文本");
            }
        };
        UnitTitle.prototype.layout = function () {
            var _a = this, titlevos = _a.titlevos, x = _a.x, y = _a.y;
            var dy = y;
            for (var i = 0; i < titlevos.length; i++) {
                var vo = titlevos[i];
                if (!vo)
                    continue;
                var height = vo.height, dis = vo.dis, ox = vo.ox, oy = vo.oy, width = vo.width, followVo = vo.followVo;
                dy -= ~~height + ~~oy;
                dis.y = dy;
                if (!followVo || ~~followVo.hor_dir != 2) {
                    dis.x = x + ~~ox;
                }
                else if (followVo) {
                    var fdis = followVo.dis;
                    if (followVo.hor_dir == 2) {
                        fdis.x = x + ~~ox + ~~followVo.ox;
                        dis.x = fdis.x + ~~followVo.width;
                    }
                    else {
                        fdis.x = ~~followVo.hor_dir ? (dis.x + ~~width) : (dis.x - ~~followVo.width);
                    }
                    fdis.y = dis.y - ~~oy + ~~followVo.oy;
                }
            }
        };
        UnitTitle.prototype.imgHandler = function (e) {
            var img = e.data;
            var titlevos = this.titlevos;
            for (var i = 0; i < titlevos.length; i++) {
                var vo = titlevos[i];
                if (!vo)
                    continue;
                if (vo.dis == img) {
                    vo.ox = -vo.dis.w >> 1;
                    vo.oy = -vo.dis.h >> 1;
                    vo.width = vo.dis.w;
                    vo.height = vo.dis.h;
                    break;
                }
                if (vo.followVo && vo.followVo.dis == img) {
                    vo.followVo.ox = -img.w >> 1;
                    vo.followVo.oy = -img.h >> 1;
                    vo.followVo.width = img.w;
                    vo.followVo.height = img.h;
                    break;
                }
            }
            rf.callLater.add(this.layout, this);
        };
        UnitTitle.prototype.getTitleVo = function (level, isfollow) {
            if (isfollow === void 0) { isfollow = false; }
            var titlevos = this.titlevos;
            var vo = titlevos[level];
            if (isfollow && !vo) {
                rf.ThrowError("没有跟随父对象vo，设置出错");
                return undefined;
            }
            if (!vo) {
                this.titlevos[level] = vo = { level: level };
            }
            if (isfollow) {
                var childvo = vo.followVo;
                if (!childvo) {
                    vo.followVo = childvo = { level: level };
                }
                return childvo;
            }
            return vo;
        };
        UnitTitle.prototype.doShow = function () {
            var _a = this, titlevos = _a.titlevos, _visible = _a._visible;
            for (var i = 0; i < titlevos.length; i++) {
                var vo = titlevos[i];
                vo.dis.visible = _visible;
                if (vo.followVo) {
                    vo.followVo.dis.visible = _visible;
                }
            }
        };
        UnitTitle.prototype.dispose = function () {
            var titlevos = this.titlevos;
            for (var i = 0; i < titlevos.length; i++) {
                var vo = titlevos[i];
                vo.dis.remove();
                vo.dis.onRecycle();
                vo.dis = undefined;
                if (vo.followVo) {
                    vo.followVo.dis.remove();
                    vo.followVo.dis.onRecycle();
                    vo.followVo.dis = undefined;
                    vo.followVo = undefined;
                }
                vo = undefined;
            }
            this.titlevos.length = 0;
            this._visible = true;
        };
        return UnitTitle;
    }());
    rf.UnitTitle = UnitTitle;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Unit3D = (function (_super) {
        __extends(Unit3D, _super);
        function Unit3D() {
            var _this = _super.call(this) || this;
            _this.nameLabelY = 180;
            _this.setSceneModel(0);
            return _this;
        }
        Unit3D.prototype.setBody = function (url) {
            var _a = this, body = _a.body, container = _a.container, tm = _a.tm;
            if (!body) {
                this.body = body = new rf.KFMMesh();
                body.tm = tm;
            }
            body.load(url);
            container.addChild(body);
            body.on(4, this.initialize, this);
            this.initTitle();
        };
        Unit3D.prototype.initVO = function (vo) {
            if (!vo) {
                vo = {};
                vo.hp = 100;
                vo.guid = this.guid;
            }
            this.vo = vo;
        };
        Unit3D.prototype.initTitle = function () {
            this.title = new rf.UnitTitle();
        };
        Unit3D.prototype.setWeapon = function (url) {
            var _a = this, weapon = _a.weapon, body = _a.body, tm = _a.tm;
            if (!weapon) {
                this.weapon = weapon = new rf.KFMMesh();
                weapon.tm = tm;
                weapon.rotationX = -90;
                weapon.defaultAnim = "";
            }
            weapon.load(url);
            body.bindMesh("Bone_wuqi", weapon);
        };
        Unit3D.prototype.initialize = function (e) {
            var _a = this, body = _a.body, title = _a.title, x = _a.x, y = _a.y;
            body.off(4, this.initialize, this);
            this.hitArea = body.hitArea;
            this.nameLabelY = body.nameLabelY * rf.OBJECT2D_SCALE;
            title.setPos(x, y - this.nameLabelY);
        };
        return Unit3D;
    }(rf.MapObject));
    rf.Unit3D = Unit3D;
    var ActionActor = (function (_super) {
        __extends(ActionActor, _super);
        function ActionActor() {
            var _this = _super.call(this) || this;
            _this.movespeed = 350 / 1000;
            _this.defaultAnim = "stand.kf";
            _this.guid = Math.floor(Math.random() * 1000000);
            _this.state = new rf.StateModel();
            _this.actions = {};
            _this.title = new rf.UnitTitle();
            _this._alive = true;
            return _this;
        }
        ActionActor.prototype.setText = function (val, color) {
            if (color === void 0) { color = 0xFFFFFF; }
            var title = this.title;
            title.setText(val, 1, color);
        };
        ActionActor.prototype.crateHalo = function () {
            var _a = this, title = _a.title, halo = _a.halo;
            if (!halo) {
                this.halo = halo = title.util.addHalo();
            }
            halo.load(rf.RES_PERFIX + "i/shadow.png");
            halo.setPos(this.x, this.y);
        };
        ActionActor.prototype.talk = function (val) {
            var title = this.title;
            title.popMsg(val);
        };
        ActionActor.prototype.playAnim = function (id, refresh) {
            var body = this.body;
            if (!body) {
                return;
            }
            body.playAnim(id, refresh);
        };
        ActionActor.prototype.attack = function (id, complete, thisobj, loop) {
            var action = this.getAction(3, rf.AttackAction);
            action.start(this, [id, thisobj, complete, loop]);
        };
        ActionActor.prototype.playDefaultAnim = function () {
            this.playAnim(this.defaultAnim, false);
        };
        ActionActor.prototype.faceto = function (x, y, tween) {
            var _a = this, _x = _a._x, _y = _a._y;
            var angle = Math.atan2((y - _y) * rf.SY, x - _x);
            var degree = angle * rf.RADIANS_TO_DEGREES;
            this.rotation = degree;
        };
        ActionActor.prototype.updateXY = function (x, y) {
            var map = rf.singleton(rf.SnakeMap);
            x = Math.min(map.data.w - 200, Math.max(400, x));
            y = Math.min(map.data.h - 200, Math.max(300, y));
            var _a = this, _z = _a._z, title = _a.title, halo = _a.halo, sceneTransform = _a.sceneTransform, nameLabelY = _a.nameLabelY;
            this.setPos(x, y, _z);
            this.gx = Math.floor(x / 60);
            this.gy = Math.floor(y / 30);
            this.updateSceneTransform();
            x = sceneTransform[12];
            y = sceneTransform[13];
            if (title) {
                title.setPos(x, y - nameLabelY);
            }
            if (halo)
                halo.setPos(x, y);
        };
        ActionActor.prototype.getAction = function (id, c) {
            var action = this.actions[id];
            if (!action) {
                action = this.actions[id] = new c();
            }
            return action;
        };
        ActionActor.prototype.walkPixTo = function (x, y, autoAnim, endtime) {
            if (autoAnim === void 0) { autoAnim = true; }
            if (endtime === void 0) { endtime = -1; }
            var action = this.getAction(1, rf.MoveAction);
            action.tx = x;
            action.ty = y;
            action.endtime = endtime;
            action.autoAnim = autoAnim;
            action.start(this);
        };
        ActionActor.prototype.cancleMove = function () {
            this.state.stopState(1, 1);
            this.state.stopState(6, 6);
            if (this.state.isRunning(3) == false) {
                this.playDefaultAnim();
            }
        };
        ActionActor.prototype.castSkill = function (id, tx, ty) {
            if (!this.state.check(2)) {
                return;
            }
            this.faceto(tx, ty);
            var data = skill[id];
            if (!data) {
                return;
            }
            this.state.startState(2);
            var tween = rf.scriptTween_play(this, data.elements, rf.defaultTimeMixer, tx, ty);
            tween.on(4, this.endCast, this);
        };
        ActionActor.prototype.endCast = function (e) {
            e.currentTarget.off(e.type, this.endCast, this);
            this.state.stopState(2, 2);
            this.simpleDispatch(7);
        };
        ActionActor.prototype.hit = function (dx, dy, speedxy, speedz, addxy, duration) {
            if (speedxy === void 0) { speedxy = 0; }
            if (speedz === void 0) { speedz = 0; }
            var action = this.getAction(9, rf.HitForceAction);
            action.reset(this, dx, dy, speedxy, speedz, addxy, duration);
            action.start(this);
        };
        ActionActor.prototype.findPath = function (x, y, pix) {
            if (pix === void 0) { pix = true; }
            if (!pix) {
                x = x * 60 + 30;
                y = y * 30 + 15;
            }
            var action = this.getAction(6, rf.NavigationLocalAction);
            action.tx = x;
            action.ty = y;
            action.start(this);
        };
        ActionActor.prototype.dead = function () {
            if (!this.state.check(8)) {
                return;
            }
            this.state.startState(8);
            this.attack("die.kf", this.remove, this);
        };
        ActionActor.prototype.remove = function () {
            var skAnim = this.body.skAnim;
            skAnim.lockFrame = skAnim.totalFrame;
            this._alive = false;
            if (this._z > 0) {
                rf.callLater.later(this.remove, this, 1000);
                return;
            }
            rf.callLater.remove(this.remove, this);
            _super.prototype.remove.call(this);
        };
        return ActionActor;
    }(Unit3D));
    rf.ActionActor = ActionActor;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Monster = (function (_super) {
        __extends(Monster, _super);
        function Monster() {
            var _this = _super.call(this) || this;
            _this.movespeed = 300 / 1000;
            return _this;
        }
        Monster.prototype.follow = function (target) {
            var action = this.getAction(10, rf.FollowAction);
            action.target = target;
            action.start(this);
        };
        return Monster;
    }(rf.ActionActor));
    rf.Monster = Monster;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var AttackAction = (function (_super) {
        __extends(AttackAction, _super);
        function AttackAction() {
            var _this = _super.call(this) || this;
            _this.stateID = 3;
            return _this;
        }
        AttackAction.prototype.check = function (actor, state) {
            var mesh = actor.body;
            if (!mesh || !mesh.skAnim) {
                return false;
            }
            return _super.prototype.check.call(this, actor, state);
        };
        AttackAction.prototype.doStart = function (actor, params) {
            this.actionname = params[0];
            this.thisobj = params[1];
            this.complete = params[2];
            var mesh = actor.body;
            mesh.skAnim.on(5, this.end, this);
            var actionname = this.actionname;
            if (actionname.indexOf(".kf") == -1) {
                actionname += ".kf";
                this.actionname = actionname;
            }
            actor.playAnim(actionname, true);
        };
        AttackAction.prototype.end = function (event) {
            if (event) {
                var node = event.data;
                if (node && node.name != this.actionname) {
                    return;
                }
            }
            this.actor.state.stopState(this.stateID, this.stateID);
        };
        AttackAction.prototype.stop = function (activeID) {
            var _a = this, actor = _a.actor, complete = _a.complete, thisobj = _a.thisobj;
            var mesh = actor.body;
            if (mesh && mesh.skAnim) {
                mesh.skAnim.off(5, this.end, this);
            }
            if (this.actionname != "die.kf") {
                actor.playDefaultAnim();
            }
            this.complete = undefined;
            if (complete != undefined) {
                complete.call(thisobj);
            }
        };
        return AttackAction;
    }(rf.ActorAction));
    rf.AttackAction = AttackAction;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var FollowAction = (function (_super) {
        __extends(FollowAction, _super);
        function FollowAction() {
            var _this = _super.call(this) || this;
            _this.distance = 300;
            _this.min_dis = 200;
            _this.max_dis = 1200;
            _this.stateID = 10;
            return _this;
        }
        FollowAction.prototype.check = function (actor, state) {
            if (!this.target) {
                return false;
            }
            return _super.prototype.check.call(this, actor, state);
        };
        FollowAction.prototype.doStart = function (actor, params) {
            actor.on(8, this.turnface, this);
            rf.time500.add(this.follow, this);
        };
        FollowAction.prototype.turnface = function () {
            var _a = this, actor = _a.actor, target = _a.target;
            var _x = target._x, _y = target._y;
            if (!actor.state.isRunning(1)) {
                actor.faceto(_x, _y);
            }
        };
        FollowAction.prototype.follow = function () {
            var monster = this.actor;
            if (monster.state.isRunning(9)) {
                return;
            }
            var _a = this, target = _a.target, distance = _a.distance, min_dis = _a.min_dis, max_dis = _a.max_dis;
            var tx = target._x, ty = target._y;
            var _x = monster._x, _y = monster._y;
            var dx = tx - _x;
            ty *= rf.SY;
            _y *= rf.SY;
            var dy = (ty - _y);
            var len = Math.sqrt(dx * dx + dy * dy);
            if (len > max_dis) {
                this.actor.state.stopState(1, this.stateID);
                var _b = this.actor, _x_1 = _b._x, _y_1 = _b._y;
                this.updateposDic(this.actor.guid, _x_1, _y_1);
            }
            else if (len > distance) {
                var dir = Math.atan2(dy, dx);
                dir = dir * rf.RADIANS_TO_DEGREES;
                rf.TEMP_VECTOR3D.x = dx;
                rf.TEMP_VECTOR3D.y = dy;
                rf.TEMP_VECTOR3D.z = 0;
                rf.TEMP_VECTOR3D.w = 0;
                rf.TEMP_VECTOR3D.v3_normalize();
                rf.TEMP_VECTOR3D.v3_scale(min_dis);
                dx = tx - rf.TEMP_VECTOR3D.x;
                dy = ty - rf.TEMP_VECTOR3D.y;
                var _c = this.findPointCanStand(rf.TEMP_VECTOR3D, dx, dy, tx, ty), mx = _c[0], my = _c[1];
                mx *= 60;
                my *= 60;
                my /= rf.SY;
                mx = Math.floor(mx);
                my = Math.floor(my);
                this.actor.walkPixTo(mx, my);
                this.updateposDic(this.actor.guid, mx, my);
            }
            else {
                var _d = this.actor, _x_2 = _d._x, _y_2 = _d._y;
                this.turnface();
                this.updateposDic(this.actor.guid, _x_2, _y_2);
            }
        };
        FollowAction.prototype.findPointCanStand = function (dir, mx, my, dx, dy) {
            var n = 1;
            var m = 0;
            mx /= 60;
            my /= 60;
            var key = Math.round(mx) * 10000 + Math.round(my);
            var actor = this.actor;
            var keyDic = FollowAction.keyDic, posDic = FollowAction.posDic;
            while (posDic[key] && posDic[key] != actor.guid) {
                rf.TEMP_MATRIX2D.m2_identity();
                var angle = 70 / dir.v3_length;
                rf.TEMP_MATRIX2D.m2_rotate(angle * n);
                var tmp2 = rf.TEMP_MATRIX2D.m2_transformVector(dir);
                mx = (dx - tmp2.x) / 60;
                my = (dy - tmp2.y) / 60;
                key = Math.round(mx) * 10000 + Math.round(my);
                n *= -1;
                if (n > 0) {
                    n += 1;
                }
                if (Math.abs(n) * angle >= Math.PI / 2 || Math.abs(n) > 5) {
                    var curlen = dir.v3_length;
                    dir.v3_normalize();
                    dir.v3_scale(curlen + 30);
                    n = 1;
                    m++;
                }
                if (m > 10) {
                    break;
                }
            }
            return [mx, my];
        };
        FollowAction.prototype.updateposDic = function (guid, x, y) {
            var keyDic = FollowAction.keyDic, posDic = FollowAction.posDic;
            var key = keyDic[guid];
            if (key) {
                delete posDic[key];
            }
            key = Math.round((x / 60)) * 10000 + Math.round(y * rf.SY / 60);
            posDic[key] = guid;
            keyDic[guid] = key;
        };
        FollowAction.prototype.stop = function (activeID) {
            rf.time500.remove(this.follow, this);
        };
        FollowAction.posDic = {};
        FollowAction.keyDic = {};
        return FollowAction;
    }(rf.ActorAction));
    rf.FollowAction = FollowAction;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ForceVector = (function (_super) {
        __extends(ForceVector, _super);
        function ForceVector() {
            return _super.call(this, 4) || this;
        }
        return ForceVector;
    }(Float32Array));
    rf.ForceVector = ForceVector;
    var HitForceAction = (function (_super) {
        __extends(HitForceAction, _super);
        function HitForceAction() {
            var _this = _super.call(this) || this;
            _this.stateID = 9;
            _this.pos0 = rf.newVector3D();
            _this.pos1 = rf.newVector3D();
            _this.pos2 = rf.newVector3D();
            _this.speed0 = rf.newVector3D();
            _this.speed1 = rf.newVector3D();
            _this.accelerate0 = rf.newVector3D();
            _this.accelerate1 = rf.newVector3D();
            return _this;
        }
        HitForceAction.prototype.reset = function (actor, dx, dy, speedxy, speedz, addxy, duration, starttime) {
            if (speedxy === void 0) { speedxy = 0; }
            if (speedz === void 0) { speedz = 0; }
            speedxy = ~~speedxy * HitForceAction.TransformSpeed;
            speedz = ~~speedz * HitForceAction.TransformSpeed;
            addxy = ~~addxy * HitForceAction.TransformAcc;
            if (speedxy < 0) {
                speedxy *= -1;
                dx *= -1;
                dy *= -1;
            }
            if (isNaN(starttime)) {
                starttime = rf.engineNow;
            }
            this.starttime = starttime;
            var _a = this, speed0 = _a.speed0, speed1 = _a.speed1, pos0 = _a.pos0, pos1 = _a.pos1, pos2 = _a.pos2, accelerate0 = _a.accelerate0, accelerate1 = _a.accelerate1;
            var angle = Math.atan2(dy * rf.SY, dx);
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            var tmp;
            speed0.x = cos * speedxy;
            speed0.y = sin * speedxy;
            speed0.z = speedz;
            pos0.x = actor._x;
            pos0.y = actor._y * rf.SY;
            pos0.z = actor._z;
            var a = HitForceAction.AccelerationOfFriction;
            accelerate0.v4_scale(0);
            tmp = a + addxy;
            accelerate0.x = tmp * cos;
            accelerate0.y = tmp * sin;
            accelerate0.z = HitForceAction.g;
            if (tmp < 0) {
                var t_1 = -speedxy / tmp;
                accelerate0.w = Math.min(~~duration, t_1);
            }
            else {
                accelerate0.w = ~~duration;
            }
            this.t1 = starttime + accelerate0.w;
            if (this.accelerate0.w == 0) {
                pos1.set(pos0);
                speed1.set(speed0);
                accelerate1.set(accelerate0);
            }
            else {
                var sqrt_t_1 = accelerate0.w * accelerate0.w;
                pos1.x = pos0.x + speed0.x * accelerate0.w + 0.5 * accelerate0.x * sqrt_t_1;
                pos1.y = pos0.y + speed0.y * accelerate0.w + 0.5 * accelerate0.y * sqrt_t_1;
                pos1.z = pos0.z + speed0.z * accelerate0.w + 0.5 * accelerate0.z * sqrt_t_1;
                if (pos1.z < 0) {
                    pos1.z = 0;
                }
                speed1.x = speed0.x + accelerate0.x * accelerate0.w;
                speed1.y = speed0.y + accelerate0.y * accelerate0.w;
                speed1.z = speed0.z + accelerate0.z * accelerate0.w;
                accelerate1.x = a * cos;
                accelerate1.y = a * sin;
                accelerate1.z = HitForceAction.g;
            }
            var spxy = speed1.v2_length;
            var t = -spxy / a;
            accelerate1.w = t;
            var sqrt_t = t * t;
            this.t2 = this.t1 + t;
            pos2.x = pos1.x + speed1.x * t + 0.5 * accelerate1.x * sqrt_t;
            pos2.y = pos1.y + speed1.y * t + 0.5 * accelerate1.y * sqrt_t;
            pos2.z = pos1.z + speed1.z * t + 0.5 * accelerate1.z * sqrt_t;
            if (speed0.v2_length < 0.000001 && speed1.v2_length < 0.000001) {
                if (pos2.z <= 0) {
                    pos2.z = 10;
                }
            }
            if (pos2.z < 0) {
                pos2.z = 0;
                this.t3 = this.t2;
            }
            else {
                var t_2 = (-speed1.z - Math.sqrt(speed1.z * speed1.z - 2 * HitForceAction.g * pos2.z)) / HitForceAction.g;
                this.t3 = this.t2 + t_2;
            }
            this.stopXY = false;
        };
        HitForceAction.prototype.doStart = function (actor, params) {
            rf.gameTick.addTick(this);
        };
        HitForceAction.prototype.update = function (now, interval) {
            var _a = this, actor = _a.actor, speed0 = _a.speed0, speed1 = _a.speed1, pos0 = _a.pos0, pos1 = _a.pos1, pos2 = _a.pos2, accelerate0 = _a.accelerate0, accelerate1 = _a.accelerate1, t1 = _a.t1, t2 = _a.t2, t3 = _a.t3;
            var g = HitForceAction.g, t_pos = HitForceAction.t_pos, t_speed = HitForceAction.t_speed;
            var t;
            if (now >= t3) {
                actor.updateXY(pos2.x, pos2.y / rf.SY);
                actor.z = 0;
                var camera = rf.ROOT.camera2D;
                if (actor == camera.watchTarget) {
                    actor.updateSceneTransform();
                    camera.update(0, 0);
                }
                this.end();
            }
            else if (now >= t2) {
                t = now - t2;
                actor.z = pos1.z + speed1.z * t + 0.5 * g * t * t;
            }
            else {
                var p0 = void 0;
                var sp0 = void 0;
                var acc = void 0;
                if (now >= t1) {
                    p0 = pos1;
                    sp0 = speed1;
                    acc = accelerate1;
                    t = now - t1;
                }
                else {
                    p0 = pos0;
                    sp0 = speed0;
                    acc = accelerate0;
                    t = now - this.starttime;
                }
                var sqrt_t = t * t;
                t_pos.z = p0.z + sp0.z * t + 0.5 * acc.z * sqrt_t;
                if (t_pos.z < 0) {
                    t_pos.z = 0;
                }
                if (!this.stopXY) {
                    t_pos.x = p0.x + sp0.x * t + 0.5 * acc.x * sqrt_t;
                    t_pos.y = p0.y + sp0.y * t + 0.5 * acc.y * sqrt_t;
                    var ty = t_pos.y / rf.SY;
                    var map = rf.singleton(rf.SnakeMap);
                    var gx = Math.floor(t_pos.x / 60);
                    var gy = Math.floor(ty / 30);
                    var canwalk = map.data.setting.getWalk(gx, gy);
                    if (canwalk) {
                        actor.updateXY(t_pos.x, ty);
                    }
                    else {
                        this.stopXY = true;
                        pos2.x = t_pos.x;
                        pos2.y = t_pos.y;
                    }
                }
                actor.z = t_pos.z;
                var camera = rf.ROOT.camera2D;
                if (actor == camera.watchTarget) {
                    actor.updateSceneTransform();
                    camera.update(0, 0);
                }
            }
        };
        HitForceAction.prototype.stop = function (activeID) {
            rf.gameTick.removeTick(this);
        };
        HitForceAction.TransformAcc = 0.001 * 0.001;
        HitForceAction.TransformSpeed = 0.001;
        HitForceAction.g = -50 * 100 * HitForceAction.TransformAcc;
        HitForceAction.AccelerationOfFriction = -20 * 100 * HitForceAction.TransformAcc;
        HitForceAction.MaxSpeed = 1000;
        HitForceAction.t_pos = rf.newVector3D();
        HitForceAction.t_speed = rf.newVector3D();
        return HitForceAction;
    }(rf.ActorAction));
    rf.HitForceAction = HitForceAction;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var MoveAction = (function (_super) {
        __extends(MoveAction, _super);
        function MoveAction() {
            var _this = _super.call(this) || this;
            _this.stateID = 1;
            return _this;
        }
        MoveAction.prototype.check = function (actor, state) {
            var map = rf.singleton(rf.SnakeMap);
            var setting = map.data.setting;
            if (!setting) {
                return false;
            }
            return _super.prototype.check.call(this, actor, state);
        };
        MoveAction.prototype.doStart = function (actor, params) {
            var _x = actor._x, _y = actor._y, movespeed = actor.movespeed;
            var _a = this, tx = _a.tx, ty = _a.ty, endtime = _a.endtime;
            this.fx = _x;
            this.fy = _y;
            actor.faceto(tx, ty);
            var dx = this.dx = tx - _x;
            var dy = this.dy = ty - _y;
            var duration;
            if (endtime != -1) {
                duration = endtime - rf.engineNow;
            }
            else {
                dy *= rf.SY;
                var len = Math.sqrt(dy * dy + dx * dx);
                duration = len / movespeed;
            }
            if (duration < 10) {
                duration = 10;
            }
            this.duration = duration;
            this.startTime = rf.engineNow;
            this.reach = false;
            actor.defaultAnim = "run.kf";
            if (actor.state.isRunning(3) == false) {
                actor.playDefaultAnim();
            }
            rf.gameTick.addTick(this);
        };
        MoveAction.prototype.update = function (now, interval) {
            var _a = this, duration = _a.duration, startTime = _a.startTime, actor = _a.actor, dx = _a.dx, fx = _a.fx, dy = _a.dy, fy = _a.fy;
            if (actor.state.isRunning(9)) {
                return;
            }
            var currentTime = now - startTime;
            if (currentTime < duration) {
                var n = currentTime / duration;
                actor.updateXY(n * dx + fx, n * dy + fy);
            }
            else {
                actor.updateXY(dx + fx, dy + fy);
                this.reach = true;
                this.end();
            }
            actor.updateSceneTransform();
            rf.ROOT.camera2D.update(0, 0);
        };
        MoveAction.prototype.stop = function (stateID) {
            rf.gameTick.removeTick(this);
            var _a = this, actor = _a.actor, autoAnim = _a.autoAnim;
            this.actor.defaultAnim = "stand.kf";
            if (autoAnim) {
                this.actor.playDefaultAnim();
            }
            actor.simpleDispatch(6, this.reach);
        };
        return MoveAction;
    }(rf.ActorAction));
    rf.MoveAction = MoveAction;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var NavigationCityAction = (function (_super) {
        __extends(NavigationCityAction, _super);
        function NavigationCityAction() {
            var _this = _super.call(this) || this;
            _this.stateID = 7;
            return _this;
        }
        return NavigationCityAction;
    }(rf.ActorAction));
    rf.NavigationCityAction = NavigationCityAction;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var NavigationLocalAction = (function (_super) {
        __extends(NavigationLocalAction, _super);
        function NavigationLocalAction() {
            var _this = _super.call(this) || this;
            _this.astar = new rf.AStar();
            _this.stateID = 6;
            return _this;
        }
        NavigationLocalAction.prototype.doStart = function (actor, params) {
            var _a = this, astar = _a.astar, tx = _a.tx, ty = _a.ty;
            this.endpixx = this.tx;
            this.endpixy = this.ty;
            var setting = rf.singleton(rf.SnakeMap).data.setting;
            var _x = actor._x, _y = actor._y;
            _x = Math.floor(_x / 60);
            _y = Math.floor(_y / 30);
            actor.gx = _x;
            actor.gy = _y;
            tx = this.tx = Math.floor(tx / 60);
            ty = this.ty = Math.floor(ty / 30);
            this.reach = false;
            var path = this.path = astar.go(setting, _x, _y, tx, ty);
            path.shift();
            if (!path.length) {
                this.end();
                return;
            }
            var _b = path[path.length - 1], ex = _b[0], ey = _b[1];
            if (ex != tx || ey != ty) {
                this.endpixx = ex * 60 + 30;
                this.endpixy = ey * 30 + 15;
            }
            actor.on(6, this.nextStep, this);
            this.nextStep();
        };
        NavigationLocalAction.prototype.nextStep = function (e) {
            var _a = this, path = _a.path, actor = _a.actor;
            if (e && e.data == false) {
                this.end();
                return;
            }
            if (path.length) {
                var _b = path.shift(), x = _b[0], y = _b[1];
                if (path.length) {
                    actor.walkPixTo(x * 60 + 30, y * 30 + 15, false);
                }
                else {
                    actor.walkPixTo(this.endpixx, this.endpixy, false);
                }
            }
            else {
                this.reach = true;
                this.end();
            }
        };
        NavigationLocalAction.prototype.stop = function (activeID) {
            var actor = this.actor;
            actor.simpleDispatch(8, this.reach);
            actor.defaultAnim = "stand.kf";
            if (actor.state.isRunning(3) == false && (this.stateID != activeID || this.reach)) {
                actor.playDefaultAnim();
            }
        };
        return NavigationLocalAction;
    }(rf.ActorAction));
    rf.NavigationLocalAction = NavigationLocalAction;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var MeshUnit = (function (_super) {
        __extends(MeshUnit, _super);
        function MeshUnit() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MeshUnit.prototype.action = function (value) {
        };
        MeshUnit.prototype.faceto = function (value) {
        };
        MeshUnit.prototype.addWeapon = function (url) {
        };
        MeshUnit.prototype.addWing = function (url) {
        };
        return MeshUnit;
    }(rf.Sprite));
    rf.MeshUnit = MeshUnit;
    var PakUnit = (function (_super) {
        __extends(PakUnit, _super);
        function PakUnit() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PakUnit.prototype.action = function (value) {
        };
        PakUnit.prototype.faceto = function (value) {
        };
        PakUnit.prototype.addWeapon = function (url) {
        };
        PakUnit.prototype.addWing = function (url) {
        };
        return PakUnit;
    }(rf.Sprite));
    rf.PakUnit = PakUnit;
    var UnitTmp = (function (_super) {
        __extends(UnitTmp, _super);
        function UnitTmp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnitTmp.prototype.action = function (value) {
        };
        UnitTmp.prototype.faceto = function (value) {
        };
        UnitTmp.prototype.addWeapon = function (url) {
        };
        UnitTmp.prototype.addWing = function (url) {
        };
        return UnitTmp;
    }(rf.Sprite));
    rf.UnitTmp = UnitTmp;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Mouse = (function () {
        function Mouse() {
            this.preMouseTime = 0;
            this.perMoveTime = 0;
            this.mouseElement = {};
            this.touchElement = {};
            this.eventData = {};
        }
        Mouse.prototype.updateNativeMouse = function (x, y) {
            var v = rf.TEMP_VECTOR3D;
            v.x = x * rf.pixelRatio;
            v.y = y * rf.pixelRatio;
            v.z = 0;
            v.w = 1;
            rf.contextInvMatrix.m3_transformVector(v, v);
            rf.nativeMouseX = Math.round(v.x);
            rf.nativeMouseY = Math.round(v.y);
        };
        Mouse.prototype.init = function () {
            wx.onTouchStart(this.onTouchStart.bind(this));
            wx.onTouchMove(this.onTouchMove.bind(this));
            wx.onTouchEnd(this.onTouchEnd.bind(this));
            wx.onTouchCancel(this.onTouchEnd.bind(this));
            if (!rf.weixin) {
                window.onmousewheel = this.onMousewheel.bind(this);
            }
        };
        Mouse.prototype.onEvent = function (identifier, screenX, screenY, event, ctrlKey, shiftKey, altKey, deltaY) {
            this.updateNativeMouse(screenX, screenY);
            screenX = rf.nativeMouseX;
            screenY = rf.nativeMouseY;
            Mouse.currentType = event;
            var now = rf.engineNow;
            var mouseElement = this.mouseElement;
            var element = mouseElement[identifier];
            if (!element) {
                mouseElement[identifier] = element = { identifier: identifier };
            }
            element.ctrl = ctrlKey;
            element.shift = shiftKey;
            element.alt = altKey;
            if (event != 60) {
                var d = void 0;
                if (this.preMouseTime < now) {
                    d = rf.ROOT.getObjectByPoint(screenX, screenY, 1);
                    this.preMouseTime = now;
                }
                else {
                    d = this.preTarget;
                }
                if (!d) {
                    d = rf.ROOT;
                }
                rf.mouse_current = d;
                element.x = screenX;
                element.y = screenY;
                if (event == 50 || event == 52 || event == 51) {
                    element.mouseDownX = screenX;
                    element.mouseDownY = screenY;
                    element.time = now;
                    element.target = d;
                    d.simpleDispatch(event, element, true);
                }
                else {
                    element.ox = screenX - element.x;
                    element.oy = screenY - element.y;
                    element.wheel = deltaY;
                    d.simpleDispatch(event, element, true);
                    if (now - element.time < 500) {
                        var len = element.x - element.mouseDownX;
                        if (len > 100) {
                            d.simpleDispatch(64, element, true);
                        }
                        else if (len < -100) {
                            d.simpleDispatch(63, element, true);
                        }
                        else {
                            len = element.y - element.mouseDownY;
                            if (len > 100) {
                                d.simpleDispatch(62, element, true);
                            }
                            else if (len < -100) {
                                d.simpleDispatch(61, element, true);
                            }
                            else {
                                if (element.target == d) {
                                    if (event == 55) {
                                        d.simpleDispatch(57, element, true);
                                    }
                                    else {
                                        d.simpleDispatch(56, element, true);
                                    }
                                }
                            }
                        }
                    }
                    element.target = undefined;
                    element.time = 0;
                }
            }
            else {
                if (this.perMoveTime >= now) {
                    return;
                }
                this.perMoveTime = now;
                element.ox = screenX - element.x;
                element.oy = screenY - element.y;
                element.x = screenX;
                element.y = screenY;
                element.wheel = deltaY;
                var d = rf.ROOT.getObjectByPoint(screenX, screenY, 1);
                if (!d) {
                    d = rf.ROOT;
                }
                d.simpleDispatch(event, element, true);
            }
        };
        Mouse.prototype.onTouchStart = function (data) {
            var event = data.event;
            if (event) {
                this.onEvent(event.button, event.x, event.y, 50 + event.button, event.ctrlKey, event.shiftKey, event.altKey);
            }
            else {
                var changedTouches = data.changedTouches;
                for (var i = 0; i < changedTouches.length; i++) {
                    var element = changedTouches[i];
                    this.onEvent(element.identifier, element.clientX, element.clientY, 50);
                }
            }
        };
        Mouse.prototype.onTouchEnd = function (data) {
            var event = data.event;
            if (event) {
                this.onEvent(event.button, event.x, event.y, 53 + event.button, event.ctrlKey, event.shiftKey, event.altKey);
            }
            else {
                var changedTouches = data.changedTouches;
                for (var i = 0; i < changedTouches.length; i++) {
                    var element = changedTouches[i];
                    this.onEvent(element.identifier, element.clientX, element.clientY, 53);
                }
            }
        };
        Mouse.prototype.onTouchMove = function (data) {
            var event = data.event;
            if (event) {
                this.onEvent(event.button, event.x, event.y, 60, event.ctrlKey, event.shiftKey, event.altKey);
            }
            else {
                var changedTouches = data.changedTouches;
                for (var i = 0; i < changedTouches.length; i++) {
                    var element = changedTouches[i];
                    this.onEvent(element.identifier, element.clientX, element.clientY, 60);
                }
            }
        };
        Mouse.prototype.onMousewheel = function (event) {
            this.onEvent(event.button, event.x, event.y, 59, event.ctrlKey, event.shiftKey, event.altKey, event.deltaY);
        };
        return Mouse;
    }());
    rf.Mouse = Mouse;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TrackballControls = (function () {
        function TrackballControls(object) {
            this.mouseSitivity = 0.3;
            this.lock = true;
            this.object = object;
            this.target = rf.newVector3D();
            this.distance = this.object.pos.v3_sub(this.target).v3_length;
            rf.scene.on(50, this.mouseDownHandler, this);
            rf.scene.on(59, this.mouseWheelHandler, this);
            rf.scene.on(52, this.mouseRightDownHandler, this);
            this.updateSun();
        }
        TrackballControls.prototype.updateSun = function () {
        };
        Object.defineProperty(TrackballControls.prototype, "tdistance", {
            get: function () {
                return this.distance;
            },
            set: function (value) {
                this.distance = value;
                this.object.forwardPos(value, this.target);
            },
            enumerable: true,
            configurable: true
        });
        TrackballControls.prototype.mouseWheelHandler = function (event) {
            var distance = this.object.pos.v3_sub(this.target).v3_length;
            this.distance = distance;
            var wheel = event.data.wheel;
            var step = 1;
            if (Math.abs(wheel) < 5000 && distance < 5000) {
                step = distance / 5000;
            }
            wheel *= step;
            var tweener = this.tweener;
            if (tweener) {
                rf.tweenStop(tweener);
            }
            this.tweener = rf.tweenTo({ tdistance: distance + wheel * 2 }, Math.abs(wheel) * 2, rf.defaultTimeMixer, this);
        };
        TrackballControls.prototype.mouseDownHandler = function (event) {
            rf.ROOT.on(60, this.mouseMoveHandler, this);
            rf.ROOT.on(53, this.mouseUpHandler, this);
            this.distance = this.object.pos.v3_sub(this.target).v3_length;
        };
        TrackballControls.prototype.mouseUpHandler = function (e) {
            rf.ROOT.off(60, this.mouseMoveHandler, this);
            rf.ROOT.off(53, this.mouseUpHandler, this);
        };
        TrackballControls.prototype.mouseMoveHandler = function (e) {
            var _a = this, object = _a.object, target = _a.target, mouseSitivity = _a.mouseSitivity, distance = _a.distance;
            var _b = e.data, ox = _b.ox, oy = _b.oy;
            var speed = (distance > 1000) ? mouseSitivity : mouseSitivity * distance / 1000;
            speed = Math.max(speed, 0.1);
            var rx = 0;
            var ry = 0;
            if (this.lock) {
                var transform = rf.TEMP_MATRIX3D;
                transform.m3_identity();
                transform.m3_translation(0, 0, -distance);
                rx = object.rotationX + oy * speed;
                ry = object.rotationY + ox * speed;
                transform.m3_rotation(rx * rf.DEGREES_TO_RADIANS, rf.X_AXIS);
                transform.m3_rotation(ry * rf.DEGREES_TO_RADIANS, rf.Y_AXIS);
                transform.m3_rotation(-object._rotationZ, rf.Z_AXIS);
                transform.m3_translation(target.x, target.y, target.z);
                object.setPos(transform[12], transform[13], transform[14]);
            }
            else {
                rx = object.rotationX + oy * speed;
                ry = object.rotationY + ox * speed;
            }
            object.rotationX = rx;
            object.rotationY = ry;
            this.updateSun();
        };
        TrackballControls.prototype.mouseRightDownHandler = function (event) {
            rf.ROOT.on(60, this.mouseRightMoveHandler, this);
            rf.ROOT.on(55, this.mouseRightUpHandler, this);
        };
        TrackballControls.prototype.mouseRightMoveHandler = function (event) {
            var _a = event.data, ox = _a.ox, oy = _a.oy;
            var _b = this, object = _b.object, target = _b.target;
            oy *= (this.distance / object.originFar);
            target.y += oy;
            object.lookat(target);
            this.updateSun();
        };
        TrackballControls.prototype.mouseRightUpHandler = function (event) {
            rf.ROOT.off(60, this.mouseRightMoveHandler, this);
            rf.ROOT.off(55, this.mouseRightUpHandler, this);
        };
        return TrackballControls;
    }());
    rf.TrackballControls = TrackballControls;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Graphics = (function () {
        function Graphics(target, variables) {
            this.numVertices = 0;
            this.$batchOffset = 0;
            this.preNumVertices = 0;
            this.target = target;
            this.numVertices = 0;
            this.hitArea = new rf.HitArea();
            this.grometrys = [];
        }
        Graphics.prototype.clear = function () {
            this.preNumVertices = this.numVertices;
            this.numVertices = 0;
            this.byte = undefined;
            this.hitArea.clean();
            var grometrys = this.grometrys;
            for (var i = 0; i < grometrys.length; i++) {
                var vo = grometrys[i].vo;
                if (vo) {
                    var used = vo.used - 1;
                    vo.used = used < 0 ? 0 : used;
                }
            }
            this.grometrys.length = 0;
        };
        Graphics.prototype.end = function () {
            var _a = this, target = _a.target, grometrys = _a.grometrys, numVertices = _a.numVertices;
            var change = 0;
            if (numVertices > 0) {
                var data32PerVertex = target.variables["data32PerVertex"].size;
                var float = new Float32Array(numVertices * data32PerVertex);
                var offset = 0;
                for (var i = 0; i < grometrys.length; i++) {
                    var geo_1 = grometrys[i];
                    geo_1.offset = offset;
                    float.set(geo_1.base, offset);
                    offset += geo_1.base.length;
                }
                var geo = target.$batchGeometry, __batch = target.__batch;
                this.byte = float;
                if (geo && this.preNumVertices == this.numVertices) {
                    geo.update(this.$batchOffset, float);
                }
                else {
                    if (__batch) {
                        __batch.change |= 4;
                    }
                    else {
                        change |= 4;
                    }
                }
                if (target.hitArea.combine(this.hitArea, 0, 0)) {
                    change |= 32;
                }
            }
            else {
                var __batch = target.__batch;
                if (__batch) {
                    __batch.change |= 4;
                    change |= 32;
                }
                else {
                    change |= (4 | 32);
                }
            }
            if (change > 0) {
                target.setChange(change);
            }
        };
        Graphics.prototype.addPoint = function (geometry, pos, noraml, uv, color, locksize) {
            var variables = this.target.variables;
            var numVertices = geometry.numVertices;
            function set(variable, array, data) {
                if (undefined == data || undefined == variable) {
                    return;
                }
                var size = variable.size;
                var offset = numVertices * size;
                if (data.length == size) {
                    array.set(data, offset);
                }
                else {
                    array.set(data.slice(0, size), offset);
                }
            }
            set(variables["pos"], rf.empty_float32_pos, pos);
            set(variables["normal"], rf.empty_float32_normal, noraml);
            set(variables["uv"], rf.empty_float32_uv, uv);
            set(variables["color"], rf.empty_float32_color, color);
            if (!locksize) {
                this.hitArea.updateArea(pos[0], pos[1], pos[2]);
            }
            geometry.numVertices++;
        };
        Graphics.prototype.drawRect = function (x, y, width, height, color, alpha, matrix, z) {
            if (alpha === void 0) { alpha = 1; }
            if (matrix === void 0) { matrix = undefined; }
            if (z === void 0) { z = 0; }
            var _a = this.target, variables = _a.variables, source = _a.source, $vcIndex = _a.$vcIndex, locksize = _a.locksize;
            var data32PerVertex = variables["data32PerVertex"].size;
            var originU = source.originU, originV = source.originV;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var uv = [originU, originV, $vcIndex];
            var noraml = [0, 0, 1];
            var geometry = rf.newGraphicsGeometry();
            this.grometrys.push(geometry);
            var r = x + width;
            var b = y + height;
            var f = rf.m2dTransform;
            var p = [0, 0, 0];
            var points = [x, y, r, y, r, b, x, b];
            for (var i = 0; i < 8; i += 2) {
                p[0] = points[i];
                p[1] = points[i + 1];
                p[2] = z;
                if (undefined != matrix) {
                    f(matrix, p, p);
                }
                this.addPoint(geometry, p, noraml, uv, rgba, locksize);
            }
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.drawCircle = function (x, y, radius, vo, uiMatrix, color, alpha, z) {
            if (uiMatrix === void 0) { uiMatrix = undefined; }
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            if (z === void 0) { z = 0; }
            var _a = this.target, variables = _a.variables, source = _a.source, index = _a.$vcIndex, locksize = _a.locksize;
            var data32PerVertex = variables["data32PerVertex"].size;
            var originU = source.originU, originV = source.originV;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var uv = [originU, originV, index];
            var noraml = [0, 0, 1];
            var geometry = rf.newGraphicsGeometry();
            this.grometrys.push(geometry);
            var f = rf.m2dTransform;
            var _numSegments;
            var nu;
            var nv;
            var p = [0, 0, z];
            var ou;
            var ov;
            var du;
            var dv;
            if (vo) {
                ou = vo.ul;
                ov = vo.vt;
                du = vo.ur - ou;
                dv = vo.vb - ov;
            }
            else {
                nu = 0;
                nv = 0;
            }
            _numSegments = Math.ceil(radius / 10) * 4;
            if (_numSegments < 8) {
                _numSegments = 8;
            }
            var cos;
            var sin;
            var rcos;
            var rsin;
            var t;
            var pi2 = Math.PI * 2;
            var i;
            var j;
            for (i = 0; i < _numSegments; i += 2) {
                if (vo) {
                    if (uiMatrix) {
                        p[0] = x;
                        p[1] = y;
                        f(uiMatrix, p, p);
                    }
                    else {
                        p[0] = x;
                        p[1] = y;
                    }
                    nu = p[0] / vo.w;
                    if (nu < 0) {
                        nu = 0;
                    }
                    ;
                    if (nu > 1) {
                        nu = 1;
                    }
                    ;
                    nv = p[1] / vo.h;
                    if (nv < 0) {
                        nv = 0;
                    }
                    ;
                    if (nv > 1) {
                        nv = 1;
                    }
                    ;
                    nu = nu * du + ou;
                    nv = nv * dv + ov;
                }
                this.addPoint(geometry, p, noraml, [nu, nv, index], rgba, locksize);
                for (j = 0; j < 3; j++) {
                    t = (i + j) / _numSegments * pi2;
                    cos = Math.cos(t);
                    sin = Math.sin(t);
                    rcos = cos * radius + x;
                    rsin = sin * radius + y;
                    if (vo) {
                        if (uiMatrix) {
                            p[0] = rcos;
                            p[1] = rsin;
                            f(uiMatrix, p, p);
                        }
                        else {
                            p[0] = rcos;
                            p[1] = rsin;
                        }
                        nu = p[0] / vo.w;
                        if (nu < 0) {
                            nu = 0;
                        }
                        ;
                        if (nu > 1) {
                            nu = 1;
                        }
                        ;
                        nv = p[1] / vo.h;
                        if (nv < 0) {
                            nv = 0;
                        }
                        ;
                        if (nv > 1) {
                            nv = 1;
                        }
                        ;
                        nu = nu * du + ou;
                        nv = nv * dv + ov;
                    }
                    this.addPoint(geometry, p, noraml, [nu, nv, index], rgba, locksize);
                }
            }
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.setSize = function (width, height) {
            var _this = this;
            this.preNumVertices = this.numVertices;
            this.grometrys.forEach(function (geometry) {
                var x = geometry.x, y = geometry.y, matrix = geometry.matrix, w = geometry.w, h = geometry.h, vo = geometry.vo, rect = geometry.rect, offset = geometry.offset;
                if (width == 0)
                    width = 1;
                var sx = width / w, sy = height / h;
                if (matrix) {
                    matrix.m2_scale(sx, sy);
                }
                if (vo) {
                    if (rect) {
                        _this.drawScale9Bitmap(x, y, vo, rect, matrix, geometry);
                    }
                }
            });
            this.end();
        };
        Graphics.prototype.drawScale9Bitmap = function (x, y, vo, rect, matrix, geometry, color, alpha, z) {
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            if (z === void 0) { z = 0; }
            var w = vo.w, h = vo.h, ul = vo.ul, ur = vo.ur, vt = vo.vt, vb = vo.vb, ix = vo.ix, iy = vo.iy;
            x += ix;
            y += iy;
            var noraml = [0, 0, 1];
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var _a = this.target, variables = _a.variables, index = _a.$vcIndex, locksize = _a.locksize;
            var sx = 1, sy = 1;
            if (matrix) {
                var d = matrix.m2_decompose();
                sx = d.scaleX;
                sy = d.scaleY;
                d.scaleX = 1;
                d.scaleY = 1;
                matrix = rf.newMatrix();
                matrix.m2_recompose(d);
            }
            if (!geometry) {
                geometry = rf.newGraphicsGeometry(matrix || rf.newMatrix());
                this.grometrys.push(geometry);
            }
            else {
                geometry.matrix = matrix;
                this.numVertices -= geometry.numVertices;
                geometry.numVertices = 0;
            }
            geometry.x = x;
            geometry.y = y;
            var dx = 0, dy = 0;
            var rx = rect.x, ry = rect.y, rw = rect.w, rh = rect.h;
            var rr = w - rw - rx, rb = h - rh - ry;
            var uw = ur - ul, vh = vb - vt;
            var x2 = dx + rx, y2 = dy + ry;
            var u2 = (rx / w) * uw + ul, u3 = ((rx + rw) / w) * uw + ul;
            var v2 = (ry / h) * vh + vt, v3 = ((ry + rh) / h) * vh + vt;
            geometry.w = w;
            geometry.h = h;
            w = w * sx;
            h = h * sy;
            var x3 = w - rr, y3 = h - rb;
            if (x3 < rx) {
                x3 = rx;
            }
            var r = dx + w, b = dy + h;
            var points = [
                dx, dy, ul, vt, x2, dy, u2, vt, x2, y2, u2, v2, dx, y2, ul, v2,
                x2, dy, u2, vt, x3, dy, u3, vt, x3, y2, u3, v2, x2, y2, u2, v2,
                x3, dy, u3, vt, r, dy, ur, vt, r, y2, ur, v2, x3, y2, u3, v2,
                dx, y2, ul, v2, x2, y2, u2, v2, x2, y3, u2, v3, dx, y3, ul, v3,
                x2, y2, u2, v2, x3, y2, u3, v2, x3, y3, u3, v3, x2, y3, u2, v3,
                x3, y2, u3, v2, r, y2, ur, v2, r, y3, ur, v3, x3, y3, u3, v3,
                dx, y3, ul, v3, x2, y3, u2, v3, x2, b, u2, vb, dx, b, ul, vb,
                x2, y3, u2, v3, x3, y3, u3, v3, x3, b, u3, vb, x2, b, u2, vb,
                x3, y3, u3, v3, r, y3, ur, v3, r, b, ur, vb, x3, b, u3, vb
            ];
            var f = rf.m2dTransform;
            var o = [0, 0];
            if (undefined != matrix) {
                f(matrix, o, o);
            }
            var p = [0, 0, 0];
            for (var i = 0; i < points.length; i += 4) {
                p[0] = points[i] + x - o[0];
                p[1] = points[i + 1] + y - o[1];
                p[2] = z;
                if (undefined != matrix) {
                    f(matrix, p, p);
                }
                this.addPoint(geometry, p, noraml, [points[i + 2], points[i + 3], index], rgba, locksize);
            }
            geometry.vo = vo;
            geometry.rect = rect;
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        Graphics.prototype.drawBitmap = function (x, y, vo, matrix, geometry, color, alpha, z, wpercent, hpercent, dir) {
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1; }
            if (z === void 0) { z = 0; }
            if (wpercent === void 0) { wpercent = 1; }
            if (hpercent === void 0) { hpercent = 1; }
            if (dir === void 0) { dir = true; }
            vo.time = rf.engineNow;
            vo.used++;
            var w = vo.w, h = vo.h, ul = vo.ul, ur = vo.ur, vt = vo.vt, vb = vo.vb, ix = vo.ix, iy = vo.iy, scale = vo.scale;
            if (scale) {
                w /= scale;
                h /= scale;
            }
            x += ix;
            y += iy;
            var rgba = [
                ((color & 0x00ff0000) >>> 16) / 0xFF,
                ((color & 0x0000ff00) >>> 8) / 0xFF,
                (color & 0x000000ff) / 0xFF,
                alpha
            ];
            var noraml = [0, 0, 1];
            var _a = this.target, variables = _a.variables, index = _a.$vcIndex, locksize = _a.locksize;
            if (!geometry) {
                geometry = rf.newGraphicsGeometry(matrix || rf.newMatrix());
                this.grometrys.push(geometry);
            }
            else {
                this.numVertices -= geometry.numVertices;
                geometry.numVertices = 0;
            }
            var dx = 0, dy = 0;
            if (wpercent != 1) {
                if (dir) {
                    w *= wpercent;
                    ur = wpercent * (ur - ul) + ul;
                }
                else {
                    dx = (1 - wpercent) * w;
                    ul = (1 - wpercent) * (ur - ul) + ul;
                }
            }
            if (hpercent != 1) {
                if (dir) {
                    h *= hpercent;
                    vb = hpercent * (vb - vt) + vt;
                }
                else {
                    dy = (1 - wpercent) * h;
                    vt = (1 - wpercent) * (vb - vt) + vt;
                }
            }
            geometry.w = w;
            geometry.h = h;
            var f = rf.m2dTransform;
            var p = [0, 0, 0];
            var points = [dx, dy, ul, vt, w, dy, ur, vt, w, h, ur, vb, dx, h, ul, vb];
            var o = [0, 0];
            if (undefined != matrix) {
                f(matrix, o, o);
            }
            for (var i = 0; i < 16; i += 4) {
                p[0] = points[i] + x - o[0];
                p[1] = points[i + 1] + y - o[1];
                p[2] = z;
                if (undefined != matrix) {
                    f(matrix, p, p);
                }
                this.addPoint(geometry, p, noraml, [points[i + 2], points[i + 3], index], rgba, locksize);
            }
            geometry.vo = vo;
            geometry.base = rf.createGeometry(rf.empty_float32_object, variables, geometry.numVertices);
            this.numVertices += geometry.numVertices;
            return geometry;
        };
        return Graphics;
    }());
    rf.Graphics = Graphics;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var NormalRender = (function () {
        function NormalRender(target) {
            this.target = target;
        }
        NormalRender.prototype.render = function (camera, option) {
            var target = this.target;
            var c = rf.context3D;
            var source = target.source, status = target.status, _x = target._x, _y = target._y, _scaleX = target._scaleX, scrollRect = target.scrollRect, sceneTransform = target.sceneTransform;
            if (!source || !source.bmd) {
                return;
            }
            var textureData = source.textureData;
            if (!textureData) {
                source.textureData = textureData = c.getTextureData(source.name, false);
            }
        };
        return NormalRender;
    }());
    rf.NormalRender = NormalRender;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var SingleFilter = (function (_super) {
        __extends(SingleFilter, _super);
        function SingleFilter() {
            var _this = _super.call(this, "single_") || this;
            var def = "\nattribute vec3 pos;\nuniform mat4 mvp;\n";
            var func = "";
            var code = "\nvec4 p = vec4(pos,1.0);\n";
            return _this;
        }
        return SingleFilter;
    }(rf.FilterBase));
    rf.SingleFilter = SingleFilter;
    var SingleRenderer = (function () {
        function SingleRenderer(target) {
            this.depth = false;
            this.depthMode = 519;
            this.target = target;
        }
        SingleRenderer.prototype.update = function (position, byte) {
            var _a = this, vertex = _a.vertex, vertexBuffer = _a.vertexBuffer;
            if (vertex) {
                vertex.vertex = byte;
                if (vertexBuffer) {
                    vertexBuffer.readly = false;
                }
            }
        };
        SingleRenderer.prototype.render = function (camera, option) {
            var target = this.target;
            var source = target.source, status = target.status, scrollRect = target.scrollRect, sceneTransform = target.sceneTransform, filters = target.filters;
            var c = rf.context3D;
            if (!source || !source.bmd) {
                return;
            }
            if (status & 4) {
                var g = target.$graphics;
                if (!g || g.numVertices <= 0) {
                    return;
                }
                var _a = this, vertex_1 = _a.vertex, vertexBuffer_1 = _a.vertexBuffer;
                var variables = target.variables;
                if (!vertex_1) {
                    this.vertex = vertex_1 = new rf.VertexInfo(g.byte, variables.data32PerVertex.size, variables);
                }
                else if (vertexBuffer_1) {
                    vertex_1.vertex = g.byte;
                    vertexBuffer_1.readly = false;
                }
                target.$batchGeometry = this;
                this.quadcount = g.numVertices / 4;
                target.status = 0;
            }
            var _b = this, vertex = _b.vertex, vertexBuffer = _b.vertexBuffer, program = _b.program, quadcount = _b.quadcount;
            if (!vertex) {
                return;
            }
            if (!vertexBuffer) {
                this.vertexBuffer = vertexBuffer = c.createVertexBuffer(vertex);
            }
            if (!program) {
                program = this.createProgram();
            }
            var parentRect;
            if (scrollRect) {
                parentRect = c.setScissor(scrollRect, sceneTransform[12], sceneTransform[13]);
            }
            var worldTransform = rf.TEMP_MATRIX3D;
            worldTransform.m3_append(camera.worldTranform, false, sceneTransform);
            c.setProgram(program);
            source.uploadContext(program, "diff");
            vertexBuffer.uploadContext(program);
            c.setProgramConstantsFromMatrix("mvp", worldTransform);
            c.setting.depth = this.depth;
            c.setting.depthMode = this.depthMode;
            this.otherParms(c, program);
            for (var key in filters) {
                var filter = filters[key];
                if (filter && !filter.disable) {
                    filter.setProgramConstants(c, program, target);
                }
            }
            c.drawTriangles(c.getIndexByQuad(quadcount), quadcount * 2);
            if (scrollRect) {
                c.lossScissor(parentRect);
            }
        };
        SingleRenderer.prototype.otherParms = function (c, p) {
        };
        SingleRenderer.prototype.createProgram = function () {
            var shader = rf.singleton(rf.Shader);
            var target = this.target;
            var filters = target.filters;
            var program;
            if (!filters) {
                target.filters = filters = {};
            }
            filters["basic_"] = rf.singleton(rf.BasicFilter);
            filters["color_"] = rf.singleton(rf.ColorFilter);
            filters["diff_"] = rf.singleton(rf.DiffFilter);
            filters["single_"] = rf.singleton(SingleFilter);
            filters["mvp_"] = rf.singleton(rf.MvpFilter);
            this.program = program = shader.createProgram(target);
            return program;
        };
        return SingleRenderer;
    }());
    rf.SingleRenderer = SingleRenderer;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var IBatchSourceData = (function () {
        function IBatchSourceData() {
        }
        return IBatchSourceData;
    }());
    rf.IBatchSourceData = IBatchSourceData;
    var SuperBatchRenderer = (function () {
        function SuperBatchRenderer(target) {
            this.change = 4;
            this.target = target;
            var filters = target.filters;
            filters["basic_"] = rf.singleton(rf.BasicFilter);
            filters["color_"] = rf.singleton(rf.ColorFilter);
            filters["diff_"] = rf.singleton(rf.UIDiffFilter);
            filters["ui_"] = rf.singleton(rf.UIFilter);
            filters["mvp_"] = rf.singleton(rf.MvpFilter);
            this.worldTransform = rf.newMatrix3D();
        }
        SuperBatchRenderer.prototype.render = function (camera, option) {
            var _a = this, change = _a.change, target = _a.target, renderData = _a.renderData, worldTransform = _a.worldTransform;
            if (change & 4) {
                this.cleanBatch();
                this.filterGeo(target);
                this.toBatch();
                this.change &= ~12;
            }
            var scrollRect = target.scrollRect, sceneTransform = target.sceneTransform;
            var parentRect;
            if (scrollRect) {
                parentRect = rf.context3D.setScissor(scrollRect, sceneTransform[12], sceneTransform[13]);
            }
            worldTransform.m3_append(camera.worldTranform, false, sceneTransform);
            for (; renderData; renderData = renderData.__render_next) {
                if (renderData instanceof rf.Sprite) {
                    renderData.render(camera, option);
                }
                else {
                    this.dc(renderData, worldTransform);
                }
            }
            if (scrollRect) {
                rf.context3D.lossScissor(parentRect);
            }
        };
        SuperBatchRenderer.prototype.dc = function (renderData, worldTransform) {
            var c = rf.context3D;
            if (!this.length) {
                return;
            }
            var program = renderData.program, vcData = renderData.vcData, offset = renderData.offset, triangles = renderData.triangles, quad = renderData.quad;
            if (!program) {
                renderData.program = program = rf.singleton(rf.Shader).createProgram(renderData);
            }
            c.setProgram(program);
            var _a = this, vertex = _a.vertexBuffer, sources = _a.sources;
            vertex.uploadContext(program);
            var variable = "diff";
            for (var i = 0; i < sources.length; i++) {
                sources[i].uploadContext(program, i == 0 ? variable : variable + i);
            }
            c.setProgramConstantsFromVector("ui", vcData, 4);
            c.setProgramConstantsFromMatrix("mvp", worldTransform);
            var indexbuffer = c.getIndexByQuad(quad);
            c.drawTriangles(indexbuffer, triangles, undefined, offset);
        };
        SuperBatchRenderer.prototype.cleanBatch = function () {
            var _a = this, renderData = _a.renderData, target = _a.target;
            if (!renderData) {
                this.renderData = renderData = {};
            }
            renderData.__render_next = undefined;
            renderData.first = undefined;
            renderData.current = undefined;
            this.i3DRender = renderData;
            this.length = 0;
            this.sources = [];
            this.currentRenderData = renderData;
            renderData.shaderKey = target.shaderKey;
            renderData.factorKey = target.factorKey;
            var filters = target.filters;
            var f = {};
            for (var filterKey in filters) {
                f[filterKey] = filters[filterKey];
            }
            renderData.filters = f;
            renderData.count = 0;
            renderData.quad = 0;
            renderData.program = undefined;
        };
        SuperBatchRenderer.prototype.createNewRenderData = function (render, factorKey) {
            var currentRenderData = this.currentRenderData;
            var renderData = {};
            var filters = currentRenderData.filters, x = currentRenderData.x, y = currentRenderData.y, s = currentRenderData.s, a = currentRenderData.a;
            var f = {};
            var shaderKey = "";
            for (var filterKey in filters) {
                var filter = filters[filterKey];
                f[filterKey] = filter;
                shaderKey += filter.skey;
            }
            filters = render.filters;
            for (var filterKey in filters) {
                var filter = filters[filterKey];
                f[filterKey] = filter;
                shaderKey += filter.skey;
            }
            renderData.filters = f;
            renderData.shaderKey = shaderKey;
            renderData.factorKey = factorKey;
            currentRenderData.__render_next = renderData;
            currentRenderData = renderData;
        };
        SuperBatchRenderer.prototype.filterGeo = function (render) {
            render.__batch = this;
            var _visible = render._visible;
            if (!_visible) {
                return;
            }
            var nativeRender = render.nativeRender, renderer = render.renderer;
            if (render != this.target && (nativeRender || renderer)) {
                this.i3DRender.__render_next = render;
                this.i3DRender = render;
                return;
            }
            var $graphics = render.$graphics;
            if ($graphics && $graphics.numVertices) {
                render.$batchGeometry = this;
                $graphics.$batchOffset = this.length;
                this.length += $graphics.byte.length;
                var currentRenderData = this.currentRenderData;
                var shaderKey = render.shaderKey;
                var factorKey = render.factorKey;
                if (currentRenderData.factorKey.indexOf(factorKey) == -1 || currentRenderData.shaderKey.indexOf(shaderKey) == -1 || currentRenderData.count > rf.max_vc) {
                    this.createNewRenderData(render, factorKey);
                }
                if (!currentRenderData.first) {
                    currentRenderData.first = render;
                }
                else {
                    currentRenderData.current.__render_next = render;
                }
                currentRenderData.current = render;
                render.$vcIndex = currentRenderData.count;
                var sources = this.sources;
                var sourceIndex = sources.indexOf(render.source);
                if (sourceIndex == -1) {
                    sourceIndex = sources.length;
                    sources.push(render.source);
                }
                render.$sourceIndex = sourceIndex;
                render.__batch_render_data = currentRenderData;
                currentRenderData.count++;
                currentRenderData.quad += $graphics.numVertices / 4;
            }
            var childrens = render.childrens;
            for (var i = 0; i < childrens.length; i++) {
                var element = childrens[i];
                if (element) {
                    this.filterGeo(element);
                }
            }
        };
        SuperBatchRenderer.prototype.toBatch = function () {
            var _a = this, length = _a.length, vertex = _a.vertexBuffer, target = _a.target, renderData = _a.renderData;
            var variables = target.variables;
            var data32PerVertex = variables.data32PerVertex.size;
            var info;
            if (!vertex) {
                info = new rf.VertexInfo(length, data32PerVertex, variables);
                this.vertexBuffer = vertex = rf.context3D.createVertexBuffer(info);
            }
            else {
                info = vertex.data;
                if (info.vertex.length < length) {
                    info = new rf.VertexInfo(length, data32PerVertex, variables);
                    vertex.data = info;
                }
                vertex.numVertices = info.numVertices = length / data32PerVertex;
                vertex.readly = false;
            }
            var vcoffset = variables.uv.offset + 2;
            var vertexData = info.vertex;
            var offset = 0;
            for (; renderData; renderData = renderData.__render_next) {
                var count = renderData.count;
                if (!(renderData instanceof rf.Sprite) && count > 0) {
                    renderData.offset = offset;
                    renderData.triangles = renderData.quad * 2;
                    offset += renderData.triangles;
                    renderData.vcData = new Float32Array(count * 4);
                    var render = renderData.first;
                    for (; render; render = render.__render_next) {
                        var g = render.$graphics, v = render.$vcIndex, s = render.$sourceIndex;
                        for (var i = 0; i < g.numVertices; i++) {
                            g.byte[i * data32PerVertex + vcoffset] = v;
                            g.byte[i * data32PerVertex + vcoffset + 1] = s;
                        }
                        vertexData.set(g.byte, g.$batchOffset);
                        render.updateBatchVCData();
                    }
                }
            }
        };
        SuperBatchRenderer.prototype.update = function (position, byte) {
            var vertexBuffer = this.vertexBuffer;
            vertexBuffer.data.vertex.set(byte, position);
            vertexBuffer.readly = false;
        };
        return SuperBatchRenderer;
    }());
    rf.SuperBatchRenderer = SuperBatchRenderer;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var PerspectiveMatrix3D = (function (_super) {
        __extends(PerspectiveMatrix3D, _super);
        function PerspectiveMatrix3D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PerspectiveMatrix3D.prototype.lookAtLH = function (eye, at, up) {
            var sqrt = Math.sqrt;
            var eyex = eye.x, eyey = eye.y, eyez = eye.z;
            var upx = up.x, upy = up.y, upz = up.z;
            var zX = at.x - eyex;
            var zY = at.y - eyey;
            var zZ = at.z - eyez;
            var len = 1 / sqrt(zX * zX + zY * zY + zZ * zZ);
            zX *= len;
            zY *= len;
            zZ *= len;
            var xX = upy * zZ - upz * zY;
            var xY = upz * zX - upx * zZ;
            var xZ = upx * zY - upy * zX;
            len = 1 / sqrt(xX * xX + xY * xY + xZ * xZ);
            xX *= len;
            xY *= len;
            xZ *= len;
            var yX = zY * xZ - zZ * xY;
            var yY = zZ * xX - zX * xZ;
            var yZ = zX * xY - zY * xX;
            this.set([
                xX, xY, xZ, -(xX * eyex + xY * eyey + xZ * eyez),
                yX, yY, yZ, -(yX * eyex + yY * eyey + yZ * eyez),
                zX, zY, zZ, -(zX * eyex + zY * eyey + zZ * eyez),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.lookAtRH = function (eye, at, up) {
            var sqrt = Math.sqrt;
            var eyex = eye.x, eyey = eye.y, eyez = eye.z;
            var upx = up.x, upy = up.y, upz = up.z;
            var zX = eyex - at.x;
            var zY = eyey - at.y;
            var zZ = eyez - at.z;
            var len = 1 / sqrt(zX * zX + zY * zY + zZ * zZ);
            zX *= len;
            zY *= len;
            zZ *= len;
            var xX = upy * zZ - upz * zY;
            var xY = upz * zX - upx * zZ;
            var xZ = upx * zY - upy * zX;
            len = 1 / sqrt(xX * xX + xY * xY + xZ * xZ);
            xX *= len;
            xY *= len;
            xZ *= len;
            var yX = zY * xZ - zZ * xY;
            var yY = zZ * xX - zX * xZ;
            var yZ = zX * xY - zY * xX;
            this.set([
                xX, xY, xZ, -(xX * eyex + xY * eyey + xZ * eyez),
                yX, yY, yZ, -(yX * eyex + yY * eyey + yZ * eyez),
                zX, zY, zZ, -(zX * eyex + zY * eyey + zZ * eyez),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveOffCenterLH = function (left, right, bottom, top, zNear, zFar) {
            this.set([
                2.0 * zNear / (right - left), 0.0, (left + right) / (left - right), 0.0,
                0.0, 2.0 * zNear / (top - bottom), (bottom + top) / (bottom - top), 0.0,
                0.0, 0.0, (zFar + zNear) / (zFar - zNear), 2.0 * zFar * zNear / (zNear - zFar),
                0.0, 0.0, 1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveLH = function (width, height, zNear, zFar) {
            this.set([
                2.0 * zNear / width, 0.0, 0.0, 0.0,
                0.0, 2.0 * zNear / height, 0.0, 0.0,
                0.0, 0.0, (zFar + zNear) / (zFar - zNear), 2.0 * zFar * zNear / (zNear - zFar),
                0.0, 0.0, 1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveFieldOfViewLH = function (fieldOfViewY, aspectRatio, zNear, zFar) {
            var yScale = 1.0 / Math.tan(fieldOfViewY / 2.0);
            var xScale = yScale / aspectRatio;
            this.set([
                xScale, 0.0, 0.0, 0.0,
                0.0, yScale, 0.0, 0.0,
                0.0, 0.0, (zFar + zNear) / (zFar - zNear), 1.0,
                0.0, 0.0, 2.0 * zFar * zNear / (zNear - zFar), 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoOffCenterLH = function (left, right, bottom, top, zNear, zFar) {
            this.set([
                2.0 / (right - left), 0.0, 0.0, (left + right) / (left - right),
                0.0, 2.0 / (top - bottom), 0.0, (bottom + top) / (bottom - top),
                0.0, 0.0, 2 / (zFar - zNear), (zNear + zFar) / (zNear - zFar),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoLH = function (width, height, zNear, zFar) {
            this.set([
                2.0 / width, 0.0, 0.0, 0.0,
                0.0, 2.0 / height, 0.0, 0.0,
                0.0, 0.0, 2 / (zFar - zNear), (zNear + zFar) / (zNear - zFar),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveOffCenterRH = function (left, right, bottom, top, zNear, zFar) {
            this.set([
                2.0 * zNear / (right - left), 0.0, (right + left) / (right - left), 0.0,
                0.0, 2.0 * zNear / (top - bottom), (top + bottom) / (top - bottom), 0.0,
                0.0, 0.0, (zNear + zFar) / (zNear - zFar), 2.0 * zNear * zFar / (zNear - zFar),
                0.0, 0.0, -1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveRH = function (width, height, zNear, zFar) {
            this.set([
                2.0 * zNear / width, 0.0, 0.0, 0.0,
                0.0, 2.0 * zNear / height, 0.0, 0.0,
                0.0, 0.0, (zNear + zFar) / (zNear - zFar), 2.0 * zNear * zFar / (zNear - zFar),
                0.0, 0.0, -1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.perspectiveFieldOfViewRH = function (fieldOfViewY, aspectRatio, zNear, zFar) {
            var yScale = 1.0 / Math.tan(fieldOfViewY / 2.0);
            var xScale = yScale / aspectRatio;
            this.set([
                xScale, 0.0, 0.0, 0.0,
                0.0, yScale, 0.0, 0.0,
                0.0, 0.0, (zFar + zNear) / (zNear - zFar), 2.0 * zNear * zFar / (zNear - zFar),
                0.0, 0.0, -1.0, 0.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoOffCenterRH = function (left, right, bottom, top, zNear, zFar) {
            this.set([
                2.0 / (right - left), 0.0, 0.0, (left + right) / (left - right),
                0.0, 2.0 / (top - bottom), 0.0, (bottom + top) / (bottom - top),
                0.0, 0.0, -2.0 / (zFar - zNear), (zNear + zFar) / (zNear - zFar),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        PerspectiveMatrix3D.prototype.orthoRH = function (width, height, zNear, zFar) {
            this.set([
                2.0 / width, 0.0, 0.0, 0.0,
                0.0, 2.0 / height, 0.0, 0.0,
                0.0, 0.0, -2.0 / (zFar - zNear), (zNear + zFar) / (zNear - zFar),
                0.0, 0.0, 0.0, 1.0
            ]);
        };
        return PerspectiveMatrix3D;
    }(Float32Array));
    rf.PerspectiveMatrix3D = PerspectiveMatrix3D;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.pass_temp_pos = { x: -1, y: 1, w: 1, h: -1 };
    rf.pass_temp_uv = { x: 0, y: 0, w: 1, h: 1 };
    rf.pass_temp_transform = rf.newMatrix3D();
    function pass_init_mesh() {
        rf.pass_vertexInfo = new rf.VertexInfo(new Float32Array([
            -1, 1, 0, 0, 1, 1, 0, 0,
            1, -1, 0, 0, -1, -1, 0, 0
        ]), 4, {
            "pos": { size: 2, offset: 0 },
            "uv": { size: 2, offset: 2 }
        });
        rf.pass_vertexBuffer = rf.context3D.createVertexBuffer(rf.pass_vertexInfo);
        rf.pass_temp_transform.m3_scale(1, -1, 1);
    }
    rf.pass_init_mesh = pass_init_mesh;
    function pass_update_mesh(pos, uv) {
        if (!pos) {
            pos = rf.pass_temp_pos;
        }
        if (!uv) {
            uv = rf.pass_temp_uv;
        }
        var vertex = rf.pass_vertexInfo.vertex, data32PerVertex = rf.pass_vertexInfo.data32PerVertex;
        vertex[0] = vertex[data32PerVertex * 3] = pos.x;
        vertex[1] = vertex[data32PerVertex + 1] = pos.y;
        vertex[data32PerVertex] = vertex[data32PerVertex * 2] = pos.w;
        vertex[data32PerVertex * 2 + 1] = vertex[data32PerVertex * 3 + 1] = pos.h;
        vertex[2] = vertex[data32PerVertex * 3 + 2] = uv.x;
        vertex[3] = vertex[data32PerVertex + 3] = uv.y;
        vertex[data32PerVertex + 2] = vertex[data32PerVertex * 2 + 2] = uv.w;
        vertex[data32PerVertex * 2 + 3] = vertex[data32PerVertex * 3 + 3] = uv.h;
        rf.pass_vertexBuffer.uploadFromVector(rf.pass_vertexInfo);
    }
    rf.pass_update_mesh = pass_update_mesh;
    rf.pass_vertex_code = "attribute vec2 pos;\nattribute vec2 uv;\nuniform mat4 mvp;\nvarying vec2 vUV;\nvarying vec2 vPos;\nvoid main(void){\ngl_Position= mvp * vec4(pos,0.0,1.0);\nvPos=pos;\nvUV=uv;\n}\n";
    rf.pass_fragment_code = "precision mediump float;\nuniform sampler2D diff;\nvarying vec2 vUV;\nvarying vec2 vPos;\n{1}\nvoid main(void){\nvec4 color = texture2D(diff, vUV);\n {0}\ngl_FragColor = color;\n}";
    function pass_dc(tex, program, vertex, transfrom, quadcount, index) {
        if (quadcount === void 0) { quadcount = 1; }
        if (!transfrom) {
            transfrom = rf.pass_temp_transform;
        }
        var c = rf.context3D;
        c.setProgramConstantsFromMatrix("mvp", transfrom);
        tex.uploadContext(program, "diff");
        vertex.uploadContext(program);
        if (!index) {
            index = c.getIndexByQuad(quadcount);
            c.drawTriangles(index, quadcount * 2);
        }
        else {
            c.drawTriangles(index, index.numIndices);
        }
    }
    rf.pass_dc = pass_dc;
    function pass_normal_render(tex, pos, uv, transfrom) {
        pass_update_mesh(pos, uv);
        var program = rf.context3D.programs["pass_normal"];
        if (!program) {
            var code = "";
            var def = "";
            program = rf.context3D.createProgram(rf.pass_vertex_code, rf.pass_fragment_code.substitute(code, def), "pass_normal");
        }
        rf.context3D.setProgram(program);
        pass_dc(tex, program, rf.pass_vertexBuffer, transfrom);
    }
    rf.pass_normal_render = pass_normal_render;
    function pass_blur_render2(tex, blurX, blurY, pos, uv, transfrom) {
        pass_update_mesh(pos, uv);
        var key = "pass_blur";
        var program = rf.context3D.programs[key];
        if (!program) {
            var code = "\n            color = vec4(0.0);\n            float f = 0.0;\n            float tot = 0.0;\n            for(float i=-10.0;i<10.0;i++){\n                if(texuv.z < abs(i)){\n                    continue;\n                }\n                for(float j = -10.0; j < 10.0; j++)\n                {\n                    if(texuv.w < abs(j)){\n                        continue;\n                    }\n                    f = (1.1 - sqrt(i*i + j*j)/8.0);\n                    f *= f;\n                    tot += f;\n                    color += texture2D( diff, vec2(vUV.x + j * texuv.x, vUV.y + i * texuv.y) ) * f;\n                }\n            }\n            color /= tot;\n        ";
            var def = "uniform vec4 texuv;\n";
            program = rf.context3D.createProgram(rf.pass_vertex_code, rf.pass_fragment_code.substitute(code, def), key);
        }
        rf.context3D.setProgram(program);
        var temp = rf.TEMP_VECTOR3D;
        temp[2] = blurX = 5;
        temp[3] = blurY = 5;
        rf.context3D.setProgramConstantsFromVector("texuv", temp, 4);
        pass_dc(tex, program, rf.pass_vertexBuffer, transfrom);
    }
    rf.pass_blur_render2 = pass_blur_render2;
    function pass_outline_render(tex, pos, uv, transfrom) {
        pass_update_mesh(pos, uv);
        var key = "pass_outline";
        var program = rf.context3D.programs[key];
        if (!program) {
            var code = "\n            vec4 curColor;\n            vec4 outlineColor = vec4(0.0,1.0,0.0,1.0);\n            const float PI2 = 6.283185307179586;\n            float maxAlpha = 0.0;\n            float thickness = 3.0;\n            vec2 displaced;\n            for (float angle = 0.; angle < PI2; angle += 0.5000000 ) {\n                displaced.x = vUV.x + thickness * texuv.x * cos(angle);\n                displaced.y = vUV.y + thickness * texuv.y * sin(angle);\n                curColor = texture2D(diff, displaced);\n                maxAlpha = max(maxAlpha, curColor.a);\n            }\n\n            float resultAlpha = max(maxAlpha, color.w);\n\n            color.xyz = (color.xyz + outlineColor.xyz * (1.0 - color.w)) * resultAlpha;\n            color.w = resultAlpha;\n        ";
            var def = "uniform vec4 texuv;\n";
            program = rf.context3D.createProgram(rf.pass_vertex_code, rf.pass_fragment_code.substitute(code, def), key);
        }
        rf.context3D.setProgram(program);
        var temp = rf.TEMP_VECTOR3D;
        rf.context3D.setProgramConstantsFromVector("texuv", temp, 4);
        pass_dc(tex, program, rf.pass_vertexBuffer, transfrom);
    }
    rf.pass_outline_render = pass_outline_render;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Skeleton = (function (_super) {
        __extends(Skeleton, _super);
        function Skeleton(config, id) {
            var _this = _super.call(this) || this;
            _this.animations = {};
            _this.mediumpCalcA = { pos: rf.newVector3D(), qua: rf.newVector3D(), mat: rf.newMatrix3D(), out: rf.newVector3D() };
            _this.mediumpCalcB = { pos: rf.newVector3D(), qua: rf.newVector3D(), mat: rf.newMatrix3D(), out: rf.newVector3D() };
            _this.tempScale = rf.newVector3D(1, 1, 1, 1);
            _this.id = id;
            var _a = _this, boneCount = _a.boneCount, defaultMatrices = _a.defaultMatrices, boneTransform = _a.boneTransform;
            _this.boneCount = boneCount = config.boneCount;
            var buffer = new ArrayBuffer(8 * 4 * boneCount);
            _this.defaultMatrices = defaultMatrices = new Float32Array(buffer);
            _this.boneTransform = boneTransform = {};
            function init(bone, boneTransform) {
                var inv = bone.inv, matrix = bone.matrix, parent = bone.parent, children = bone.children, name = bone.name, index = bone.index;
                if (undefined != inv) {
                    bone.inv = inv = new Float32Array(inv);
                }
                bone.matrix = matrix = new Float32Array(matrix);
                var sceneTransform = new Float32Array(matrix);
                if (parent) {
                    sceneTransform.m3_append(parent.sceneTransform);
                }
                if (index > -1) {
                    index *= 2;
                    var matrice = rf.newMatrix3D();
                    matrice.m3_append(sceneTransform, false, inv);
                    var qua = new Float32Array(buffer, index * 4 * 4, 4);
                    var pos = new Float32Array(buffer, (index + 1) * 4 * 4, 4);
                    matrice.m3_decompose(pos, qua, undefined, 2);
                }
                bone.sceneTransform = sceneTransform.clone();
                boneTransform[bone.name] = sceneTransform.m3_rotation(90, rf.X_AXIS, true);
                children.forEach(function (b) {
                    init(b, boneTransform);
                });
            }
            init(config.root, boneTransform);
            _this.rootBone = config.root;
            _this.vertex = rf.context3D.createVertexBuffer(new rf.VertexInfo(new Float32Array(config.vertex), config.data32PerVertex, rf.vertex_skeleton_variable));
            return _this;
        }
        Skeleton.prototype.initAnimationData = function (anim) {
            anim.skeleton = this;
            anim.matrices = [];
            anim.boneTransform = [];
            anim.boneMatrix3D = [];
            var frames = anim.frames;
            for (var key in frames) {
                frames[key] = new Float32Array(frames[key]);
            }
            this.animations[anim.name] = anim;
        };
        Skeleton.prototype.createAnimation = function () {
            var anim = rf.recyclable(SkeletonAnimation);
            anim.skeleton = this;
            anim.currentBoneTransfrom = this.boneTransform;
            return anim;
        };
        Skeleton.prototype.getMatricesData = function (anim, frame) {
            var result = anim.matrices[frame];
            if (undefined != result) {
                return result;
            }
            var _a = this, boneCount = _a.boneCount, rootBone = _a.rootBone;
            var frames = anim.frames;
            var map = {};
            var buffer = new ArrayBuffer(8 * 4 * boneCount);
            result = new Float32Array(buffer);
            anim.matrices[frame] = result;
            var boneTransform = {};
            anim.boneTransform[frame] = boneTransform;
            var matrice = rf.TEMP_MATRIX3D;
            function update(bone, boneTransform) {
                var inv = bone.inv, matrix = bone.matrix, sceneTransform = bone.sceneTransform, parent = bone.parent, children = bone.children, name = bone.name, index = bone.index;
                var frameData = frames[bone.name];
                if (frameData) {
                    matrix.set(frameData.subarray(frame * 16, (frame + 1) * 16));
                }
                if (parent) {
                    sceneTransform.m3_append(parent.sceneTransform, false, matrix);
                }
                else {
                    sceneTransform.set(matrix);
                }
                if (index > -1) {
                    index *= 2;
                    matrice.m3_append(sceneTransform, false, inv);
                    var qua = new Float32Array(buffer, index * 4 * 4, 4);
                    var pos = new Float32Array(buffer, (index + 1) * 4 * 4, 4);
                    matrice.m3_decompose(pos, qua, undefined, 2);
                }
                boneTransform[name] = sceneTransform.clone().m3_rotation(90, rf.X_AXIS, true);
                map[bone.name] = bone;
                for (var i = 0; i < children.length; i++) {
                    update(children[i], boneTransform);
                }
            }
            update(rootBone, boneTransform);
            return result;
        };
        Skeleton.prototype.loadAnimationComplete = function (e) {
            if (e.type == 4) {
                this.initAnimationData(e.data);
                this.simpleDispatch(e.type, e.data);
            }
        };
        Skeleton.prototype.getMediumpMatricesData = function (anim, frame, n, boneTransform, buffer, bonepq) {
            var animation = anim.animation, preAnimation = anim.preAnimation;
            var rootBone = this.rootBone;
            var frames;
            var nextFrames;
            var nextFrame;
            frames = animation.data.frames;
            if (preAnimation.data && anim.tm.now - preAnimation.stoptime < 200) {
                nextFrames = preAnimation.data.frames;
                var duration = (anim.tm.now - preAnimation.starttime) % (preAnimation.data.duration * 1000);
                var eDuration = (preAnimation.data.eDuration * 1000);
                nextFrame = Math.floor(duration / eDuration);
                n = 1 - (anim.tm.now - preAnimation.stoptime) / 200;
            }
            else {
                var totalFrame = animation.data.totalFrame;
                if (frame >= totalFrame - 1) {
                    nextFrame = 0;
                }
                else {
                    nextFrame = frame + 1;
                }
                nextFrames = frames;
            }
            this.updateBone(rootBone, frames, frame, nextFrames, nextFrame, n, boneTransform, bonepq);
            this.updateMatrices(rootBone, buffer);
        };
        Skeleton.prototype.mixTransform = function (am, bm, n, bonepq, matrix) {
            var _a = this, tempScale = _a.tempScale, mediumpCalcA = _a.mediumpCalcA, mediumpCalcB = _a.mediumpCalcB;
            var aq = mediumpCalcA.qua, ap = mediumpCalcA.pos;
            var bq = mediumpCalcB.qua, bp = mediumpCalcB.pos;
            var q = bonepq.q, p = bonepq.p;
            am.m3_decompose(ap, aq, undefined, 2);
            bm.m3_decompose(bp, bq, undefined, 2);
            rf.qua_slerp(aq, bq, n, q);
            rf.pos_lerp(ap, bp, n, p);
            if (!matrix) {
                matrix = rf.newMatrix3D();
            }
            matrix.m3_recompose(p, q, tempScale, 2);
            bonepq.p = p;
            bonepq.q = q;
        };
        Skeleton.prototype.updateBone = function (bone, frames, frame, nextframes, nextFrame, n, boneTransform, bonepq) {
            var inv = bone.inv, matrix = bone.matrix, sceneTransform = bone.sceneTransform, parent = bone.parent, children = bone.children, name = bone.name, index = bone.index;
            var _a = this, tempScale = _a.tempScale, mediumpCalcA = _a.mediumpCalcA, mediumpCalcB = _a.mediumpCalcB;
            var frameData = frames[bone.name];
            var nextFrameData = nextframes[bone.name];
            if (frameData) {
                if (n == 0) {
                    matrix.set(nextFrameData.subarray(frame * 16, (frame + 1) * 16));
                }
                else {
                    var am = mediumpCalcA.mat, aq = mediumpCalcA.qua, ap = mediumpCalcA.pos, p = mediumpCalcA.out;
                    var bm = mediumpCalcB.mat, bq = mediumpCalcB.qua, bp = mediumpCalcB.pos, q = mediumpCalcB.out;
                    var pq = bonepq[name];
                    if (!pq) {
                        bonepq[name] = pq = { p: rf.newVector3D(), q: rf.newVector3D() };
                    }
                    am.set(frameData.subarray(frame * 16, (frame + 1) * 16));
                    bm.set(nextFrameData.subarray(nextFrame * 16, (nextFrame + 1) * 16));
                    this.mixTransform(am, bm, n, pq, matrix);
                }
            }
            if (parent) {
                sceneTransform.m3_append(parent.sceneTransform, false, matrix);
            }
            else {
                sceneTransform.set(matrix);
            }
            boneTransform[name] = sceneTransform.clone().m3_rotation(90, rf.X_AXIS, true);
            for (var i = 0; i < children.length; i++) {
                this.updateBone(children[i], frames, frame, nextframes, nextFrame, n, boneTransform, bonepq);
            }
        };
        Skeleton.prototype.updateMatrices = function (bone, buffer) {
            var inv = bone.inv, sceneTransform = bone.sceneTransform, children = bone.children, index = bone.index;
            var matrice = rf.TEMP_MATRIX3D;
            if (index > -1) {
                index *= 2;
                matrice.m3_append(sceneTransform, false, inv);
                var qua = new Float32Array(buffer, index * 4 * 4, 4);
                var pos = new Float32Array(buffer, (index + 1) * 4 * 4, 4);
                matrice.m3_decompose(pos, qua, undefined, 2);
            }
            for (var i = 0; i < children.length; i++) {
                this.updateMatrices(children[i], buffer);
            }
        };
        return Skeleton;
    }(rf.MiniDispatcher));
    rf.Skeleton = Skeleton;
    rf.skeleton_test_n = 0.1;
    var SkeletonAnimation = (function (_super) {
        __extends(SkeletonAnimation, _super);
        function SkeletonAnimation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.animation = { starttime: 0, frame: 0, data: undefined };
            _this.preAnimation = { starttime: 0, frame: 0, data: undefined, stoptime: 0 };
            _this.currentFrame = 0;
            _this.totalFrame = 0;
            _this.lockFrame = -1;
            return _this;
        }
        SkeletonAnimation.prototype.play = function (animationData, tm, mediump) {
            if (mediump === void 0) { mediump = false; }
            var currentFrame = 0;
            this.currentFrame = currentFrame;
            this.preFrame = 0;
            this.mediump = mediump;
            this.tm = tm;
            var animation = this.animation;
            this.totalFrame = animationData.totalFrame;
            if (mediump) {
                var _a = this, preAnimation = _a.preAnimation, currentBonePQ = _a.currentBonePQ;
                if (!currentBonePQ) {
                    this.currentBonePQ = currentBonePQ = {};
                }
                if (animationData != animation.data && ((animation.data && animation.data.name == "stand.kf") || (animationData.name == "stand.kf" && animation.data && animation.data.name == "run.kf"))) {
                    preAnimation.starttime = animation.starttime;
                    preAnimation.data = animation.data;
                    preAnimation.stoptime = tm.now;
                }
                animation.data = animationData;
                animation.starttime = tm.now;
                this.currentBoneTransfrom = {};
                this.matrices = new Float32Array(new ArrayBuffer(8 * 4 * this.skeleton.boneCount));
                this.skeleton.getMediumpMatricesData(this, currentFrame, 0, this.currentBoneTransfrom, this.matrices.buffer, currentBonePQ);
            }
            else {
                this.matrices = this.skeleton.getMatricesData(animationData, currentFrame);
                this.currentBoneTransfrom = animationData.boneTransform[currentFrame];
                animation.data = animationData;
                animation.starttime = tm.now;
            }
            this.simpleDispatch(10, this.currentBoneTransfrom);
        };
        SkeletonAnimation.prototype.uploadContext = function (camera, mesh, program, now, interval) {
            var _a = this, animation = _a.animation, skeleton = _a.skeleton, currentFrame = _a.currentFrame, tm = _a.tm;
            var matrices = this.matrices;
            var data = animation.data, starttime = animation.starttime;
            if (undefined == data) {
                this.matrices = matrices = skeleton.defaultMatrices;
                this.currentBoneTransfrom = skeleton.boneTransform;
            }
            else {
                var duration = (tm.now - starttime) % (data.duration * 1000);
                var eDuration = (data.eDuration * 1000);
                var frame = this.lockFrame;
                if (frame == -1) {
                    frame = Math.floor(duration / eDuration);
                }
                if (this.mediump == false) {
                    if (frame != currentFrame) {
                        currentFrame = frame;
                        this.currentFrame = currentFrame;
                        this.matrices = matrices = skeleton.getMatricesData(data, currentFrame);
                        this.currentBoneTransfrom = data.boneTransform[currentFrame];
                        this.simpleDispatch(10, this.currentBoneTransfrom);
                    }
                }
                else {
                    currentFrame = frame;
                    this.currentFrame = currentFrame;
                    var n = (duration % eDuration) / eDuration;
                    skeleton.getMediumpMatricesData(this, currentFrame, n, this.currentBoneTransfrom, matrices.buffer, this.currentBonePQ);
                    this.simpleDispatch(10, this.currentBoneTransfrom);
                }
                if (currentFrame < this.preFrame || currentFrame >= data.totalFrame - 1) {
                    this.simpleDispatch(5, data);
                }
                this.preFrame = currentFrame;
            }
        };
        return SkeletonAnimation;
    }(rf.MiniDispatcher));
    rf.SkeletonAnimation = SkeletonAnimation;
    var SkeletonFilter = (function (_super) {
        __extends(SkeletonFilter, _super);
        function SkeletonFilter() {
            var _this = _super.call(this, "skeleton_") || this;
            _this.useQua2mat = true;
            _this.vertex = SkeletonFilter.VERTEX;
            return _this;
        }
        SkeletonFilter.VERTEX = {
            def: "\nattribute vec4 index;\nattribute vec4 weight;\nuniform vec4 bones[ 100 ];\n",
            func: "\nmat4 getBoneMatrix( const in float i ) {\n    float d = i * 2.0;\n    vec4 qua = bones[ int(d) ];\n    vec4 pos = bones[ int(d + 1.0) ];\n    return qua2mat(qua, pos);\n}\n",
            code: "\nmat4 skinMatrix = mat4( 0.0 );\nskinMatrix += weight.x * getBoneMatrix( index.x );\nskinMatrix += weight.y * getBoneMatrix( index.y );\nskinMatrix += weight.z * getBoneMatrix( index.z );\nskinMatrix += weight.w * getBoneMatrix( index.w );\nn = vec4( skinMatrix * vec4( n, 0.0 ) ).xyz;\np = skinMatrix * p;\n"
        };
        SkeletonFilter.FRAGMENT = {
            def: "\n",
            code: "\n"
        };
        return SkeletonFilter;
    }(rf.FilterBase));
    rf.SkeletonFilter = SkeletonFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(variables) {
            var _this = _super.call(this, variables ? variables : rf.vertex_mesh_variable) || this;
            _this.invSceneTransform = rf.newMatrix3D();
            _this.nativeRender = true;
            _this.tm = rf.defaultTimeMixer;
            return _this;
        }
        Mesh.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            if (updateStatus === void 0) { updateStatus = 0; }
            updateStatus = _super.prototype.updateSceneTransform.call(this, updateStatus, parentSceneTransform);
            if (updateStatus & 1) {
                var _a = this, invSceneTransform = _a.invSceneTransform, sceneTransform = _a.sceneTransform;
                invSceneTransform.m3_invert(sceneTransform, false);
            }
            return updateStatus;
        };
        Mesh.prototype.renderShadow = function (sun, p, c, worldTranform, now, interval) {
            var _a = this, geometry = _a.geometry, sceneTransform = _a.sceneTransform, skAnim = _a.skAnim, skData = _a.skData;
            geometry.vertex.uploadContext(p);
            worldTranform.m3_append(sun.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
            if (undefined != skAnim) {
                skAnim.uploadContext(sun, this, p, now, interval);
                skData = skAnim;
            }
            if (undefined != skData) {
                skData.skeleton.vertex.uploadContext(p);
                rf.context3D.setProgramConstantsFromVector("bones", skData.matrices, 4, true);
            }
        };
        Mesh.prototype.render = function (camera, option) {
            var interval = option.interval, now = option.now;
            var _a = this, geometry = _a.geometry, material = _a.material, skAnim = _a.skAnim, _visible = _a._visible, skData = _a.skData;
            if (undefined != geometry && undefined != material && _visible) {
                var b = material.uploadContext(camera, this, now, interval);
                if (true == b) {
                    var c = rf.context3D;
                    var program = material.program;
                    if (undefined != skAnim) {
                        if (!this.shadowCast) {
                            skAnim.uploadContext(camera, this, program, now, interval);
                        }
                    }
                    if (undefined != skData) {
                        skData.skeleton.vertex.uploadContext(program);
                        rf.context3D.setProgramConstantsFromVector("bones", skData.matrices, 4, true);
                    }
                    geometry.uploadContext(camera, this, program, now, interval);
                    var _b = this, shadowTarget = _b.shadowTarget, shadowMatrix = _b.shadowMatrix;
                    if (shadowTarget) {
                        c.setProgramConstantsFromMatrix("sunmvp", shadowMatrix);
                    }
                    try {
                        c.drawTriangles(geometry.index, geometry.numTriangles);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
            _super.prototype.render.call(this, camera, option);
        };
        Mesh.prototype.onRecycle = function () {
            var skAnim = this.skAnim;
            if (skAnim) {
                this.skAnim = null;
            }
            _super.prototype.onRecycle.call(this);
        };
        return Mesh;
    }(rf.SceneObject));
    rf.Mesh = Mesh;
    var KFMMesh = (function (_super) {
        __extends(KFMMesh, _super);
        function KFMMesh(material, variables) {
            var _this = _super.call(this, variables) || this;
            _this.mediump = false;
            _this.material = material;
            _this.defaultAnim = "stand.kf";
            return _this;
        }
        KFMMesh.prototype.load = function (url) {
            this.id = url;
            url += "mesh.km";
            rf.loadRes(rf.RES_PERFIX, url, this.loadCompelte, this, 2);
        };
        KFMMesh.prototype.loadCompelte = function (e) {
            if (e.type == 4) {
                var url = e.currentTarget.url;
                var id = this.id;
                var o = e.data;
                if (url.indexOf(id) != -1) {
                    this.setKFM(o);
                }
            }
        };
        KFMMesh.prototype.setKFM = function (kfm) {
            if (!this.tm) {
                this.tm = rf.defaultTimeMixer;
            }
            if (!kfm.inited) {
                kfm.inited = true;
                if (!kfm.skeletonData) {
                    if ((kfm.skeleton instanceof rf.Skeleton) == false) {
                        kfm.skeletonData = kfm.skeleton;
                        kfm.skeleton = undefined;
                    }
                }
                if (!kfm.skeleton && kfm.skeletonData) {
                    kfm.skeleton = new rf.Skeleton(kfm.skeletonData, this.id);
                }
            }
            var mesh = kfm.mesh, skeleton = kfm.skeleton, materialData = kfm.material, anims = kfm.anims, shadowCast = kfm.shadowCast, sun = kfm.sun;
            var _a = this, material = _a.material, geometry = _a.geometry, defaultAnim = _a.defaultAnim;
            var c = rf.context3D;
            this.kfm = kfm;
            if (!geometry) {
                this.geometry = geometry = new rf.GeometryBase(this.variables);
            }
            geometry.setData(mesh);
            if (!material) {
                this.material = material = this.createMaterial();
            }
            material.setData(materialData);
            material.diffTex.url = this.id + "diff.png";
            if (skeleton) {
                var skAnim = this.skAnim = skeleton.createAnimation();
                this.skData = skAnim;
                skAnim.on(10, this.skinAnimChangeHandler, this);
                skeleton.on(4, this.animationLoadCompleteHandler, this);
                if (defaultAnim && anims && anims.indexOf(defaultAnim) != -1) {
                    this.playAnim(defaultAnim);
                }
            }
            if (this.shadowCast) {
                rf.scene.childChange = true;
            }
            this.calHitarea();
            this.simpleDispatch(4);
        };
        KFMMesh.prototype.removeFromStage = function () {
            _super.prototype.removeFromStage.call(this);
            var _a = this, skAnim = _a.skAnim, shadowCast = _a.shadowCast;
            if (shadowCast) {
                rf.scene.childChange = true;
            }
        };
        KFMMesh.prototype.calHitarea = function () {
            var _a = this.kfm.mesh, hitarea = _a.hitarea, vertex = _a.vertex, data32PerVertex = _a.data32PerVertex, nameLabelY = _a.nameLabelY;
            if (!hitarea) {
                var vd = new Float32Array(vertex);
                var l = Number.MAX_VALUE;
                var t = -Number.MAX_VALUE;
                var r = -Number.MAX_VALUE;
                var b = Number.MAX_VALUE;
                var front = -Number.MAX_VALUE;
                var back = Number.MAX_VALUE;
                var len = vd.length;
                for (var i = 0; i < len; i += data32PerVertex) {
                    var x = vd[i];
                    var y = vd[i + 1];
                    var z = vd[i + 2];
                    if (front < z) {
                        front = z;
                    }
                    else if (back > z) {
                        back = z;
                    }
                    if (l > x) {
                        l = x;
                    }
                    else if (r < x) {
                        r = x;
                    }
                    if (t < y) {
                        t = y;
                    }
                    else if (b > y) {
                        b = y;
                    }
                }
                this.hitArea.clean();
                rf.clone({ left: l, right: r, top: t, bottom: b, front: front, back: back }, this.hitArea);
            }
            else {
                this.hitArea.clean();
                rf.clone(hitarea, this.hitArea);
            }
            this.hitArea.scale(rf.OBJECT2D_SCALE);
            return this.hitArea;
        };
        Object.defineProperty(KFMMesh.prototype, "nameLabelY", {
            get: function () {
                var mesh = this.kfm.mesh;
                return mesh.nameLabelY == undefined ? 2 : mesh.nameLabelY;
            },
            enumerable: true,
            configurable: true
        });
        KFMMesh.prototype.createMaterial = function () {
            return new rf.Material();
        };
        KFMMesh.prototype.playAnim = function (name, refresh) {
            if (refresh === void 0) { refresh = false; }
            var _a = this, skAnim = _a.skAnim, tm = _a.tm, mediump = _a.mediump;
            if (!skAnim) {
                return;
            }
            if (name.lastIndexOf(".kf") == -1) {
                name += ".kf";
            }
            if (this.currentAnim == name && !refresh) {
                return;
            }
            this.currentAnim = name;
            var skeleton = skAnim.skeleton;
            var anim = skeleton.animations[name];
            if (!anim) {
                rf.loadRes(rf.RES_PERFIX, this.id + name, skeleton.loadAnimationComplete, skeleton, 2);
                skeleton.on(4, this.skeletonAnimLoadComplete, this);
            }
            else {
                skAnim.play(anim, tm, mediump);
            }
        };
        KFMMesh.prototype.skeletonAnimLoadComplete = function (e) {
            var _a = this, skAnim = _a.skAnim, currentAnim = _a.currentAnim, mediump = _a.mediump, tm = _a.tm;
            if (!skAnim) {
                return;
            }
            var anim = e.data;
            if (anim.name == currentAnim) {
                e.currentTarget.off(e.type, this.skeletonAnimLoadComplete, this);
                skAnim.play(anim, tm, mediump);
            }
        };
        KFMMesh.prototype.animationLoadCompleteHandler = function (e) {
            e.currentTarget.off(e.type, this.animationLoadCompleteHandler, this);
            var anim = e.data;
            if (anim.name == this.currentAnim) {
                this.playAnim(this.currentAnim, true);
            }
        };
        KFMMesh.prototype.onRecycle = function () {
            var skAnim = this.skAnim;
            if (skAnim) {
                skAnim.skeleton.off(4, this.animationLoadCompleteHandler, this);
            }
            this.defaultAnim = undefined;
            this.currentAnim = undefined;
            this.id = undefined;
            this.kfm = undefined;
            _super.prototype.onRecycle.call(this);
        };
        KFMMesh.prototype.bindMesh = function (skeletonName, mesh) {
            var _a = this, boneContainer = _a.boneContainer, skAnim = _a.skAnim;
            if (!boneContainer) {
                this.boneContainer = boneContainer = {};
            }
            var display = boneContainer[skeletonName];
            if (!display) {
                boneContainer[skeletonName] = display = new rf.SceneObject();
                this.addChild(display);
            }
            display.addChild(mesh);
        };
        KFMMesh.prototype.skinAnimChangeHandler = function (event) {
            var boneTrasnform = event.data;
            var boneContainer = this.boneContainer;
            for (var key in boneContainer) {
                var bone = boneTrasnform[key];
                if (bone) {
                    boneContainer[key].setTransform(bone);
                }
            }
        };
        return KFMMesh;
    }(Mesh));
    rf.KFMMesh = KFMMesh;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.particle_Perfix = "particle/";
    rf.particle_Texture_Perfix = "tex/particle/";
    rf.particle_test_now = 0;
    var ParticleGeometry = (function (_super) {
        __extends(ParticleGeometry, _super);
        function ParticleGeometry() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParticleGeometry.prototype.initRuntime = function (data) {
            var nodes = data.nodes, mesh = data.mesh, runtime = data.runtime;
            this.setData(mesh);
            this.initData(runtime);
            if (nodes["p_follow"]) {
                this.followData = new Float32Array(runtime.props.length * 8);
            }
        };
        ParticleGeometry.prototype.updateFollow = function (particle) {
            var followData = this.followData;
            var data = particle.data, followQua = particle.followQua, followPos = particle.followPos, now = particle.now, followSca = particle.followSca;
            var runtime = data.runtime;
            var props = runtime.props;
            now = now * 1000;
            for (var i = 0; i < props.length; i++) {
                var vo = props[i];
                var f = (now - vo.startTime) / vo.totalTime;
                var k = (f - Math.floor(f)) * vo.totalTime;
                if (k < rf.frameInterval * 2) {
                    var temp = i * 8;
                    followData[temp] = followQua[0];
                    followData[temp + 1] = followQua[1];
                    followData[temp + 2] = followQua[2];
                    followData[temp + 3] = followQua[3];
                    followData[temp + 4] = followPos[0] / followSca[0];
                    followData[temp + 5] = followPos[1] / followSca[1];
                    followData[temp + 6] = followPos[2] / followSca[2];
                }
            }
        };
        ParticleGeometry.prototype.uploadContext = function (camera, mesh, program, now, interval) {
            var c = rf.context3D;
            var sceneTransform = mesh.sceneTransform, sk_st = mesh.sk_st, tm = mesh.tm, data = mesh.data, followMatrix3D = mesh.followMatrix3D;
            var setting = data.setting, nodes = data.nodes, runtime = data.runtime;
            var vertexBuffer = runtime.vertexBuffer;
            this.vertex.uploadContext(program);
            vertexBuffer.uploadContext(program);
            var worldTranform = rf.TEMP_MATRIX3D;
            var rot = rf.TEMP_VECTOR3D;
            worldTranform.m3_append(camera.worldTranform, false, sceneTransform);
            c.setProgramConstantsFromMatrix("mvp", worldTranform);
            if (nodes["p_billboard"]) {
                var maxtrix = followMatrix3D ? followMatrix3D : sceneTransform;
                worldTranform.m3_append(camera.sceneTransform, false, maxtrix);
                if (nodes["p_rotation2head"]) {
                    c.setProgramConstantsFromMatrix("mv", worldTranform);
                }
                worldTranform.m3_decompose(undefined, rot, undefined, 1);
                worldTranform.m3_rotation(rot.w, rot, false, rf_m3_identity);
                c.setProgramConstantsFromMatrix("invm", worldTranform);
            }
            var node = nodes["p_segment_color"];
            if (node) {
                var segmentData = node.data;
                if (segmentData instanceof ArrayBuffer) {
                    node.data = segmentData = new Float32Array(segmentData);
                }
                c.setProgramConstantsFromVector("p_segment_color", segmentData, 4);
            }
            node = nodes["p_sprite_sheet_anim"];
            if (node) {
                var data_2 = node.data;
                if (data_2 instanceof ArrayBuffer) {
                    node.data = data_2 = new Float32Array(data_2);
                }
                c.setProgramConstantsFromVector("p_sprite_sheet_anim", data_2, 4);
            }
            if (nodes["p_follow"]) {
                this.updateFollow(mesh);
                c.setProgramConstantsFromVector("followData", this.followData, 4);
            }
            var time = (tm.now - sk_st) / 1000 * setting.speed;
            mesh.now = time;
            c.setProgramConstantsFromVector("now", time, 1, false);
            return worldTranform;
        };
        return ParticleGeometry;
    }(rf.GeometryBase));
    rf.ParticleGeometry = ParticleGeometry;
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.sk_st = 0;
            _this.now = 0;
            return _this;
        }
        Particle.prototype.updateSceneTransform = function (updateStatus, parentSceneTransform) {
            var followMatrix3D = this.followMatrix3D;
            if (followMatrix3D) {
                if (this.status & 1) {
                    this.updateTransform();
                    updateStatus |= 1;
                }
                var _a = this, scene_3 = _a.scene, transform = _a.transform, sceneTransform = _a.sceneTransform, invSceneTransform = _a.invSceneTransform, followPos = _a.followPos, followQua = _a.followQua, followSca = _a.followSca;
                followMatrix3D.m3_append(parentSceneTransform, false, transform);
                followMatrix3D.m3_decompose(followPos, followQua, followSca, 2);
                sceneTransform.set(scene_3.sceneTransform);
                sceneTransform.m3_scale(followSca[0], followSca[1], followSca[2], true, scene_3.sceneTransform);
                invSceneTransform.m3_invert(sceneTransform, false);
            }
            else {
                updateStatus = _super.prototype.updateSceneTransform.call(this, updateStatus, parentSceneTransform);
            }
            return updateStatus;
        };
        Particle.prototype.load = function (url) {
            if (url.lastIndexOf(".pa") == -1) {
                url += ".pa";
            }
            if (url.indexOf("://") == -1) {
                url = rf.particle_Perfix + url;
            }
            this.url = url;
            rf.loadRes(rf.RES_PERFIX, url, this.loadCompelte, this, 2);
        };
        Particle.prototype.loadCompelte = function (e) {
            if (e.type == 4) {
                this.play(e.data);
            }
            else {
                this.remove();
            }
        };
        Particle.prototype.play = function (data) {
            this.data = data;
            var settingData = data.setting, meshData = data.mesh, materialData = data.material, nodes = data.nodes;
            var _a = this, geometry = _a.geometry, material = _a.material;
            if (!geometry) {
                this.geometry = geometry = new ParticleGeometry();
            }
            geometry.initRuntime(data);
            if (!material) {
                this.material = material = new ParticleMaterial();
            }
            materialData.cull = 0;
            material.setData(materialData);
            var rot = settingData.rot;
            if (rot) {
                if (rot instanceof ArrayBuffer) {
                    settingData.rot = rot = new Float32Array(rot);
                }
                this.setRot(rot[0], rot[1], rot[2]);
            }
            if (nodes["p_follow"]) {
                this.followMatrix3D = rf.newMatrix3D();
                this.followPos = rf.newVector3D();
                this.followQua = rf.newVector3D();
                this.followSca = rf.newVector3D();
            }
            if (undefined == this.sk_st) {
                this.sk_st = rf.defaultTimeMixer.now;
            }
        };
        return Particle;
    }(rf.Mesh));
    rf.Particle = Particle;
    var ParticleMaterial = (function (_super) {
        __extends(ParticleMaterial, _super);
        function ParticleMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ParticleMaterial.prototype.getTextUrl = function (data) {
            return rf.particle_Texture_Perfix + data.url;
        };
        ParticleMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            var c = rf.context3D;
            var _a = this, program = _a.program, diffTex = _a.diffTex;
            if (!diffTex) {
                return false;
            }
            var b = this.checkTexs(diffTex);
            if (false == b) {
                return false;
            }
            if (!program) {
                this.program = program = this.createProgram(mesh);
            }
            c.setProgram(program);
            this.uploadContextSetting();
            var t;
            if (undefined != diffTex) {
                t = c.textureObj[diffTex.key];
                t.uploadContext(program, "diff");
            }
            return true;
        };
        ParticleMaterial.prototype.createProgram = function (mesh) {
            var nodes = mesh.data.nodes;
            var key = "";
            for (var k in nodes) {
                var node_1 = nodes[k];
                key += node_1.key + "_";
            }
            var c = rf.context3D;
            var p = c.programs[key];
            if (p) {
                return p;
            }
            var node = nodes["p_time"];
            var vertexDefine = "";
            var vertexFunctions = this.timeNode(node);
            var fragmentDefine = "";
            var fragmentFunctions = "";
            node = nodes["p_velocity"];
            if (node) {
                vertexDefine += "#define VELOCITY\n";
            }
            node = nodes["p_accelerition"];
            if (node) {
                vertexDefine += "#define ACCELERITION\n";
            }
            node = nodes["p_init_rotation"];
            if (node) {
                vertexDefine += "#define ROTATION\n";
            }
            node = nodes["p_vrotation"];
            if (node) {
                vertexDefine += "#define VROTATION\n";
            }
            node = nodes["p_rotation2head"];
            if (node) {
                vertexDefine += "#define ROTATION_HEAD\n";
            }
            node = nodes["p_scale"];
            if (node) {
                vertexFunctions += this.scaleNode(node);
                vertexDefine += "#define SCALE\n";
            }
            node = nodes["p_billboard"];
            if (node) {
                vertexDefine += "#define BILLBOARD\n";
            }
            node = nodes["p_position"];
            if (node) {
                vertexDefine += "#define POSITION\n";
            }
            node = nodes["p_segment_color"];
            if (node) {
                vertexFunctions += this.segmentColorNode(node);
                vertexDefine += "#define SegmentColor\n";
                fragmentDefine += "#define SegmentColor\n";
            }
            node = nodes["p_follow"];
            if (node) {
                vertexFunctions += this.followNode(node);
                vertexDefine += "#define FOLLOW\n";
            }
            node = nodes["p_sprite_sheet_anim"];
            if (node) {
                fragmentFunctions += this.spriteSheetNode(node);
                fragmentDefine += "#define SPRITE_SHEET\n";
            }
            var vertexCode = "\n                " + vertexDefine + "\n\n                precision mediump float;\n\n                attribute vec3 " + "pos" + ";\n                attribute vec2 " + "uv" + ";\n                attribute vec4 " + "p_time" + ";\n                attribute vec3 " + "p_velocity" + ";\n                attribute vec3 " + "p_accelerition" + ";\n                attribute vec4 " + "p_init_rotation" + ";\n                attribute vec4 " + "p_vrotation" + ";\n                attribute vec4 " + "p_scale" + ";\n                attribute vec3 " + "p_position" + ";\n\n                uniform mat4 " + "mvp" + ";\n                uniform mat4 " + "invm" + ";\n                uniform mat4 " + "mv" + ";\n\n                uniform float " + "now" + ";\n                \n\n                varying vec2 vUV;\n                varying vec2 vTime;\n                varying vec4 vSegMul;\n                varying vec4 vSegAdd;\n\n                void quaXpos(in vec4 qua,inout vec3 pos){\n                    vec4 temp = vec4(cross(qua.xyz,pos.xyz) + (qua.w * pos.xyz) , -dot(qua.xyz,pos.xyz));\n                    pos = cross(temp.xyz,-qua.xyz) + (qua.w * temp.xyz) - (temp.w * qua.xyz);\n                }\n\n                " + vertexFunctions + "\n\n                \n\n                void main(void) {\n                    vec3 b_pos = " + "pos" + ";\n                    vec3 p_pos = vec3(0.0);\n                    vec3 b_veo = vec3(0.0);\n                    vec4 temp = vec4(0.0);\n                    \n                    //\u5148\u5904\u7406\u65F6\u95F4  vec2 timeNode(float now,in vec3 pos,in vec4 time)\n                    vec2 time = timeNode(" + "now" + ",b_pos," + "p_time" + ");\n\n#ifdef VELOCITY\n                    //\u5904\u7406\u901F\u5EA6\n                    b_veo += " + "p_velocity" + ";\n                    p_pos += (time.xxx * b_veo);\n#endif\n                    \n                   \n#ifdef ACCELERITION \n                    //\u52A0\u901F\u5EA6\n                    temp = vec4(" + "p_accelerition" + " * time.x,0.0); //at;\n                    b_veo += temp.xyz;                              //vt = v0+a*t;\n                    p_pos += temp.xyz * time.x * 0.5;               //s = v0*t + a*t*t*0.5;\n#endif\n\n#ifdef ROTATION     \n                    //\u521D\u59CB\u5316\u65CB\u8F6C\u89D2\u5EA6\n                    quaXpos(" + "p_init_rotation" + ",b_pos);\n#endif\n\n#ifdef VROTATION    \n                        //\u65CB\u8F6C\u52A8\u753B\n                    temp = " + "p_vrotation" + ";\n                    temp.w *= time.x;\n                    temp.xyz *= sin(temp.w);\n                    temp.w = cos(temp.w);\n                    quaXpos(temp,b_pos);\n#endif\n\n#ifdef ROTATION_HEAD    \n                    // b_veo = vec3(-1.0,0.0,0.0);\n                    //if b_veo.yz is (0,0) ,change it to (0.00001,0);\n                    b_veo.y += step(b_veo.y+b_veo.z,0.0) * 0.00001;\n    #ifdef BILLBOARD\n                    temp = " + "mv" + " * vec4(b_veo,0.0);\n                    temp.xyz = normalize(vec3(temp.xy,0.0));\n                    b_pos =  b_pos * mat3(\n                        temp.x,-temp.y,0.0,\n                        temp.y,temp.x,0.0,\n                        0.0,0.0,1.0);\n    #else\n                    b_veo = normalize(b_veo);\n                    vec3 xAxis = vec3(1.0,0.0,0.0);\n                    temp.w = dot(b_veo,xAxis);\n                    temp.xyz = normalize(cross(xAxis,b_veo));\n\n                    //\u4E24\u500D\u89D2\u516C\u5F0F\u83B7\u5F97 cos sin\n                    //cos2a = cosa^2 - sina^2 = 2cosa^2 - 1 = 1 - 2sina^2;\n                    //cosa = sqt((1 + cos2a)/2);\n                    //sina = sqt((1 - cos2a)/2);\n\n                    temp.xyz *= sqrt( (1.0-temp.w) * 0.5);\n                    temp.w = sqrt((1.0 + temp.w) * 0.5);\n                    quaXpos(temp,b_pos);\n                   \n    #endif\n#endif\n\n#ifdef SCALE\n                    //\u7F29\u653E\n                    scaleNode(" + "p_scale" + ",time,b_pos);\n#endif\n\n#ifdef BILLBOARD\n                    b_pos = (vec4(b_pos,0.0) * " + "invm" + ").xyz;\n#endif\n\n#ifdef POSITION\n                    b_pos += " + "p_position" + ";\n#endif\n\n\n#ifdef FOLLOW\n                    follow(b_pos,p_pos);\n#endif\n\n\n#ifdef SegmentColor\n                    segmentColorNode(time);\n#endif\n\n                    vUV = " + "uv" + ";\n                    vTime = time;\n                    gl_Position = " + "mvp" + " * vec4(b_pos + p_pos,1.0);\n                }\n";
            var fragmentCode = "\n                precision mediump float;\n\n                " + fragmentDefine + "\n\n                " + fragmentFunctions + "\n\n                uniform sampler2D " + "diff" + ";\n\n                varying vec2 vUV;\n                varying vec2 vTime;\n                varying vec4 vSegMul;\n                varying vec4 vSegAdd;\n\n                void main(void){\n                    vec2 tUV = vUV;\n#ifdef SPRITE_SHEET\n                    // segmentColorNode(vTime,tUV);\n                    segmentColorNode(vTime,tUV);\n#endif\n                    vec4 c = texture2D(" + "diff" + ", tUV);\n                    // c = vec4(vTime.y);\n                    // c.w = 1.0;\n#ifdef SegmentColor\n                    c *= vSegMul;\n                    c += vSegAdd;\n#endif\n                    gl_FragColor = c;\n                    // gl_FragColor = vec4(vTime.yyy,1.0);\n                }\n\n            ";
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        ParticleMaterial.prototype.timeNode = function (info) {
            var vcode = "\n                vec2 timeNode(float now,inout vec3 pos,in vec4 time){\n                    //time: x:startTime, y:durtion,z:delay+durtion,w:1/durtion;\n                    //o: time, time * 1/durtion;\n\n                    now = now - time.x;\n                    pos *= step(0.0,now);\n                    \n                    vec2 o = vec2(0.0,0.0);\n            ";
            if (info.usesDuration) {
                if (info.usesLooping) {
                    if (info.usesDelay) {
                        vcode += "\n                    o.x = mod(now , time.z);\n                    pos *= step(o.x,time.y);\n                        ";
                    }
                    else {
                        vcode += "\n                    o.x = mod(now , time.y);  \n                        ";
                    }
                }
                else {
                    vcode += "\n                    o.x = now;\n                    pos *= step(now,time.y); \n                    ";
                }
            }
            else {
                vcode += "\n                    o.x = now;\n                    pos *= step(now,time.y); \n                ";
            }
            vcode += "\n                    o.y = o.x * time.w;\n                    return o;\n                }\n            ";
            return vcode;
        };
        ParticleMaterial.prototype.scaleNode = function (info) {
            var vcode = "\n                void scaleNode(in vec4 scale,in vec2 time,inout vec3 pos){\n                    float temp = 0.0;";
            if (info.usesCycle) {
                if (info.usesPhase) {
                    vcode += "\n                    temp += sin(scale.z * time.y + scale.w);";
                }
                else {
                    vcode += "\n                    temp = sin(scale.z * time.y);";
                }
            }
            else {
                vcode += "\n                    temp = time.y;";
            }
            vcode += "\n                    temp = (temp * scale.y) + scale.x;\n            ";
            switch (info.scaleType) {
                case 0:
                    vcode += "\n                    pos.xyz *= temp;";
                    break;
                case 1:
                    vcode += "\n                    pos.x *= temp;";
                    break;
                case 2:
                    vcode += "\n                    pos.y *= temp;";
                    break;
                case 3:
                    vcode += "\n                    pos.z *= temp;";
                    break;
            }
            vcode += "\n                }\n            ";
            return vcode;
        };
        ParticleMaterial.prototype.followNode = function (info) {
            var code = "\n    attribute vec2 " + "p_follow" + ";\n    uniform vec4 followData[60];\n    void follow(inout vec3 pos, in vec3 t_pos){\n        // #ifndef BILLBOARD\n            quaXpos(followData[int(" + "p_follow" + ".x * 2.0)],pos);\n        // #endif\n        pos += followData[int(" + "p_follow" + ".x * 2.0 + 1.0)].xyz;\n    }\n";
            return code;
        };
        ParticleMaterial.prototype.segmentColorNode = function (info) {
            var data = info.data, usesMul = info.usesMul, usesAdd = info.usesAdd, add = info.add, mul = info.mul, len = info.len;
            if (data instanceof ArrayBuffer) {
                info.data = data = new Float32Array(info.data);
            }
            var vcode = "\n                uniform vec4 " + "p_segment_color" + "[" + data.length / 4 + "];\n                void segmentColorNode(in vec2 time){\n                    vec4 life = " + "p_segment_color" + "[0];\n                    vec4 temp = vec4(0.0);";
            if (usesMul) {
                vcode += "\n                    vec4 mul = " + "p_segment_color" + "[" + mul + "];";
            }
            else {
                vcode += "\n                    vec4 mul = vec4(1.0);";
            }
            if (usesAdd) {
                vcode += "\n                    vec4 add = " + "p_segment_color" + "[" + add + "];";
            }
            else {
                vcode += "\n                    vec4 add = vec4(0.0);";
            }
            if (len > 0) {
                vcode += "\n                    temp.x = min(life.x , time.y);";
                if (usesMul) {
                    vcode += "\n                    mul += temp.x * " + "p_segment_color" + "[" + (mul + 2) + "];";
                }
                if (usesAdd) {
                    vcode += "\n                    add += temp.x * " + "p_segment_color" + "[" + (add + 2) + "];";
                }
            }
            if (len > 1) {
                vcode += "\n                    temp.x = min(life.y , max(0.0 , time.y - life.x));";
                if (usesMul) {
                    vcode += "\n                    mul += temp.x * " + "p_segment_color" + "[" + (mul + 3) + "];";
                }
                if (usesAdd) {
                    vcode += "\n                    add += temp.x * " + "p_segment_color" + "[" + (add + 3) + "];";
                }
            }
            if (len > 2) {
                vcode += "\n                    temp.x = min(life.z , max(0.0 , temp.x - life.y));";
                if (usesMul) {
                    vcode += "\n                    mul += temp.x * " + "p_segment_color" + "[" + (mul + 4) + "];";
                }
                if (usesAdd) {
                    vcode += "\n                    add += temp.x * " + "p_segment_color" + "[" + (add + 4) + "];";
                }
            }
            if (len > 3) {
                vcode += "\n                    temp.x = min(life.w , max(0.0 , temp.x - life.z));";
                if (usesMul) {
                    vcode += "\n                    mul += temp.x * " + "p_segment_color" + "[" + (mul + 5) + "];";
                }
                if (usesAdd) {
                    vcode += "\n                    add += temp.x * " + "p_segment_color" + "[" + (add + 5) + "];";
                }
            }
            if (len == 0) {
                vcode += "\n                    temp.y = time.y;";
            }
            else {
                switch (len) {
                    case 1:
                        vcode += "\n                    temp.y = max(0.0,time.y - life.x);";
                        break;
                    case 2:
                        vcode += "\n                    temp.y = max(0.0,time.y - life.y);";
                        break;
                    case 3:
                        vcode += "\n                    temp.y = max(0.0,time.y - life.z);";
                        break;
                    case 4:
                        vcode += "\n                    temp.y = max(0.0,time.y - life.w);";
                        break;
                }
            }
            if (usesMul) {
                vcode += "\n                    mul += temp.y * " + "p_segment_color" + "[" + (mul + 1) + "];";
            }
            if (usesAdd) {
                vcode += "\n                    add += temp.y * " + "p_segment_color" + "[" + (add + 1) + "];";
            }
            vcode += "\n                    vSegMul = mul;\n                    vSegAdd = add;";
            vcode += "\n                }";
            return vcode;
        };
        ParticleMaterial.prototype.spriteSheetNode = function (info) {
            var rows = info.rows, usesCycle = info.usesCycle, usesPhase = info.usesPhase;
            var code = "\n    uniform vec4 " + "p_sprite_sheet_anim" + "[2];\n    void segmentColorNode(in vec2 time,inout vec2 uv){\n        vec4 data = " + "p_sprite_sheet_anim" + "[0];\n        vec4 info = " + "p_sprite_sheet_anim" + "[1];\n        float index = floor(time.y * data.x);\n        uv.x = (uv.x + mod(index, data.y)) * data.z;\n        uv.y = (uv.y + floor(index / data.y)) * data.w;\n    }\n";
            return code;
        };
        return ParticleMaterial;
    }(rf.Material));
    rf.ParticleMaterial = ParticleMaterial;
    var TestPartilce = (function (_super) {
        __extends(TestPartilce, _super);
        function TestPartilce() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestPartilce.prototype.moveTest = function (tweener) {
            var z = this._z;
            if (z > 1) {
                z = -2;
            }
            else {
                z = 2;
            }
            rf.tweenTo({ z: z }, 2000, rf.defaultTimeMixer, this).complete = this.moveTest.bind(this);
        };
        return TestPartilce;
    }(Particle));
    rf.TestPartilce = TestPartilce;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var Raycaster = (function () {
        function Raycaster(far, near) {
            if (near === void 0) { near = 0; }
            this.near = 0;
            this.far = 10000;
            this.ray = new rf.Ray();
            this.near = near;
            this.far = far;
        }
        Raycaster.prototype.setFromCamera = function (mousex, mousey, camera) {
            if ((camera && camera.isPerspectiveCamera)) {
                this.ray.origin.set([camera.pos[0], camera.pos[1], camera.pos[2], 1]);
                this.ray.direction.set([mousex, mousey, 0.9999, 1]);
                rf.TEMP_MATRIX3D.m3_invert(camera.len);
                rf.TEMP_MATRIX3D.m3_transformVector(this.ray.direction, this.ray.direction);
                if (this.ray.direction.w != 0) {
                    this.ray.direction.v4_scale(1 / this.ray.direction.w);
                }
                camera.transform.m3_transformVector(this.ray.direction, this.ray.direction);
                this.ray.direction.v3_sub(this.ray.origin, this.ray.direction);
                this.ray.direction.v3_normalize();
            }
            else if ((camera && camera.isOrthographicCamera)) {
                this.ray.origin.set([mousex, mousey, 0.0, 1]);
                camera.worldTranform.m3_transformVector(this.ray.origin, this.ray.origin);
                this.ray.direction.set([0, 0, 1, 1]);
                camera.transform.m3_transformVector(this.ray.direction, this.ray.direction);
            }
            else {
                console.error('Raycaster: Unsupported camera type.');
            }
        };
        Raycaster.prototype.intersectObject = function (object, intersects, recursive) {
            if (object.visible === false)
                return;
            if (object.mouseEnabled) {
                object.raycast(this, intersects);
            }
            if (object.mouseChildren && recursive) {
                var childrens = object.childrens;
                for (var i = 0; i < childrens.length; i++) {
                    var child = childrens[i];
                    if (child instanceof rf.SceneObject) {
                        this.intersectObject(child, intersects, true);
                    }
                }
            }
        };
        Raycaster.prototype.intersectObjects = function (arr, recursive, intersects) {
            var result = intersects || [];
            for (var i = 0, l = arr.length; i < l; i++) {
                var child = arr[i];
                if (child instanceof rf.SceneObject) {
                    this.intersectObject(child, result, recursive);
                }
            }
            result.sort(Raycaster.disSort);
            return result;
        };
        Raycaster.disSort = function (a, b) {
            return a.distance - b.distance;
        };
        return Raycaster;
    }());
    rf.Raycaster = Raycaster;
})(rf || (rf = {}));
var rf;
(function (rf) {
    rf.skill_Perfix = "skill/";
    rf.skill_event_define = {};
    function skill_setup() {
        var define = rf.skill_event_define;
        define[4] = rf.PosFilter;
        define[3] = rf.ScaleFilter;
        define[2] = rf.RotFilter;
        define[31] = rf.ColorTransformFilter;
        define[5] = rf.UVAnimFilter;
        define[30] = rf.TexChannelFilter;
    }
    rf.skill_setup = skill_setup;
    var Skill = (function (_super) {
        __extends(Skill, _super);
        function Skill() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.sk_st = 0;
            return _this;
        }
        Skill.prototype.load = function (url) {
            if (url.lastIndexOf(".sk") == -1) {
                url += ".sk";
            }
            if (url.indexOf("://") == -1) {
                url = rf.skill_Perfix + url;
            }
            rf.loadRes(rf.RES_PERFIX, url, this.loadCompelte, this, 1);
        };
        Skill.prototype.loadCompelte = function (e) {
            if (e.type == 4) {
                this.play(e.data);
            }
            else {
                this.remove();
            }
        };
        Skill.prototype.play = function (data) {
            if (!this.tm) {
                this.tm = rf.newTimeMixer(this);
            }
            this.data = data;
            this.lines = [];
            for (var i = 0; i < data.lines.length; i++) {
                var element = data.lines[i];
                var line = new SkillLine();
                line.play(element, this);
                this.lines.push(line);
            }
            this.reset();
        };
        Skill.prototype.reset = function () {
            var _a = this, lines = _a.lines, tm = _a.tm;
            if (lines) {
                for (var i = 0; i < lines.length; i++) {
                    lines[i].reset();
                }
                if (tm.target == this) {
                    rf.skillTick.addTick(this);
                    this.update(0, 0);
                }
            }
        };
        Skill.prototype.update = function (now, interval) {
            var _a = this, lines = _a.lines, tm = _a.tm, follow = _a.follow;
            if (!lines) {
                return;
            }
            if (follow) {
                var _x = follow._x, _y = follow._y, _z = follow._z;
                this.setPos(_x, _y, _z);
            }
            if (tm.target == this) {
                rf.tm_add(tm, interval);
                var close_1 = true;
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (line.closed == false) {
                        line.update(now, interval);
                        close_1 = false;
                    }
                }
                if (close_1) {
                    rf.skillTick.removeTick(this);
                    this.remove();
                }
            }
            else {
                for (var i = 0; i < lines.length; i++) {
                    lines[i].update(now, interval);
                }
            }
        };
        return Skill;
    }(rf.MapObject));
    rf.Skill = Skill;
    var SkillLine = (function (_super) {
        __extends(SkillLine, _super);
        function SkillLine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.loop = 0;
            return _this;
        }
        SkillLine.prototype.play = function (data, skill) {
            var _a = this, runtimes = _a.runtimes, tm = _a.tm;
            this.tm = tm = rf.newTimeMixer(this, -skill.sk_st, skill.tm);
            var creates = data.creates, events = data.events;
            this.skill = skill;
            this.data = data;
            this.loop = data.loop;
            if (!runtimes) {
                this.runtimes = runtimes = [];
            }
            for (var i = 0; i < creates.length; i++) {
                var mesh_1 = void 0;
                var element = creates[i];
                if (element.type == 256) {
                    mesh_1 = new SkillMesh();
                    mesh_1.load(element.url);
                }
                else if (element.type == 257) {
                    mesh_1 = new SkillParticle();
                    mesh_1.load(element.url);
                }
                else if (element.type == 259) {
                    mesh_1 = new SkillSkill();
                    mesh_1.setSceneModel(2);
                    mesh_1.setPos(element.x, element.y, element.z);
                    mesh_1.setRot(element.rx, element.ry, element.rz);
                    mesh_1.load(element.url);
                }
                mesh_1.tm = tm;
                mesh_1.visible = false;
                mesh_1.sk_st = element.time;
                runtimes.push(mesh_1);
                skill.container.addChild(mesh_1);
                this.addEvents(mesh_1, events);
            }
        };
        SkillLine.prototype.addEvents = function (target, events) {
            var filters = target.filters;
            for (var key in events) {
                var element = events[key];
                if (!element)
                    continue;
                var type = element.type;
                var filter = filters[type];
                if (filter) {
                    filter.reset();
                }
                else {
                    var CLS = rf.skill_event_define[type];
                    if (CLS) {
                        filters[type] = filter = new CLS();
                    }
                }
                if (filter) {
                    filter.target = target;
                    filter.setEvent(element);
                }
            }
        };
        SkillLine.prototype.update = function (now, interval) {
            var _a = this, data = _a.data, tm = _a.tm, runtimes = _a.runtimes, loop = _a.loop;
            var events = data.events, duration = data.duration;
            now = tm.now;
            if (now >= duration) {
                if (data.loop > 0 && loop <= 1) {
                    this.closed = true;
                    for (var i = 0; i < runtimes.length; i++) {
                        var target = runtimes[i];
                        target.visible = false;
                    }
                    return true;
                }
                else {
                    if (data.loop > 0) {
                        this.loop--;
                    }
                    tm.now = now = now % duration;
                    this.reset(now);
                }
            }
            for (var i = 0; i < runtimes.length; i++) {
                var target = runtimes[i];
                if (now > target.sk_st) {
                    if (!target._visible) {
                        target.visible = true;
                    }
                    target.update(now, interval);
                    var filters = target.filters;
                    for (var j in events) {
                        var filter = filters[j];
                        if (filter) {
                            filter.update(now, interval);
                        }
                    }
                }
                else {
                    if (target._visible) {
                        target.visible = false;
                    }
                }
            }
            return false;
        };
        SkillLine.prototype.reset = function (now) {
            if (now === void 0) { now = 0; }
            var _a = this, data = _a.data, runtimes = _a.runtimes, tm = _a.tm, skill = _a.skill;
            var events = data.events;
            tm.now = now - skill.sk_st;
            this.closed = false;
            for (var i = 0; i < runtimes.length; i++) {
                var target = runtimes[i];
                var filters = target.filters;
                for (var j in events) {
                    var filter = filters[j];
                    if (filter) {
                        filter.reset();
                    }
                }
            }
        };
        SkillLine.prototype.onRecycle = function () {
            var _a = this, data = _a.data, runtimes = _a.runtimes, tm = _a.tm, skill = _a.skill;
            for (var i = 0; i < runtimes.length; i++) {
                runtimes[i];
            }
        };
        return SkillLine;
    }(rf.MiniDispatcher));
    rf.SkillLine = SkillLine;
    var SkillMesh = (function (_super) {
        __extends(SkillMesh, _super);
        function SkillMesh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SkillMesh;
    }(rf.KFMMesh));
    rf.SkillMesh = SkillMesh;
    var SkillParticle = (function (_super) {
        __extends(SkillParticle, _super);
        function SkillParticle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SkillParticle;
    }(rf.Particle));
    rf.SkillParticle = SkillParticle;
    var SkillSkill = (function (_super) {
        __extends(SkillSkill, _super);
        function SkillSkill() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SkillSkill;
    }(Skill));
    rf.SkillSkill = SkillSkill;
    var TestSkill = (function (_super) {
        __extends(TestSkill, _super);
        function TestSkill() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestSkill.prototype.play = function (data) {
            if (!this.tm) {
                this.tm = rf.newTimeMixer(this);
            }
            this.data = data;
            this.lines = [];
            for (var i = 0; i < data.lines.length; i++) {
                var element = data.lines[i];
                var line = new SkillLine();
                line.play(element, this);
                this.lines.push(line);
            }
            this.reset();
            rf.skillTick.removeTick(this);
            var bar = rf.singleton(rf.TimeBar);
            bar.setTm(this.tm);
            bar.setData(data.duration, 200);
            var tm = this.tm;
            tm.speed = 0;
            rf.ROOT.addChild(bar);
        };
        TestSkill.prototype.update = function (now, interval) {
            var _a = this, lines = _a.lines, tm = _a.tm;
            if (!lines) {
                return;
            }
            var close = true;
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                line.update(now, interval);
            }
        };
        return TestSkill;
    }(Skill));
    rf.TestSkill = TestSkill;
})(rf || (rf = {}));
var rf;
(function (rf) {
    function mesh_cut(mesh) {
        var cut = new CutMesh();
        var geometry = mesh.geometry, skData = mesh.skData, sceneTransform = mesh.sceneTransform, material = mesh.material;
        cut.geometry = geometry;
        if (skData) {
            cut.skData = {};
            cut.skData.skeleton = skData.skeleton;
            cut.skData.matrices = skData.matrices.clone();
        }
        var m = new rf.Material();
        m.setData(undefined);
        m.diffTex = mesh.material.diffTex;
        cut.material = m;
        cut.setTransform(sceneTransform);
        return cut;
    }
    rf.mesh_cut = mesh_cut;
    function mesh_fre_alpha_cut(mesh) {
        var cut = new CutMesh();
        var geometry = mesh.geometry, skData = mesh.skData, sceneTransform = mesh.sceneTransform, material = mesh.material;
        cut.geometry = geometry;
        if (skData) {
            cut.skData = {};
            cut.skData.skeleton = skData.skeleton;
            cut.skData.matrices = skData.matrices.clone();
        }
        var m = new rf.ColorMaterial(0xFFFFFF);
        m.setData(undefined);
        m.sun = false;
        cut.addFilter(new rf.FresnelAlphaFilter(1.0));
        cut.addFilter(new rf.ColorTransformFilter());
        m.diffTex = mesh.material.diffTex;
        cut.material = m;
        cut.setTransform(sceneTransform);
        return cut;
    }
    rf.mesh_fre_alpha_cut = mesh_fre_alpha_cut;
    var CutMesh = (function (_super) {
        __extends(CutMesh, _super);
        function CutMesh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CutMesh.prototype.render = function (camera, option) {
            _super.prototype.render.call(this, camera, option);
        };
        return CutMesh;
    }(rf.Mesh));
    rf.CutMesh = CutMesh;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var EventFilter = (function (_super) {
        __extends(EventFilter, _super);
        function EventFilter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.starttime = 0;
            return _this;
        }
        EventFilter.prototype.setEvent = function (event, tick) {
            if (tick === void 0) { tick = false; }
            this.skillEvent = event;
            this.reset();
            this.updatepro(this.pro);
            if (tick) {
                this.starttime = rf.engineNow;
                rf.Engine.addTick(this);
            }
        };
        EventFilter.prototype.getCurrentEvent = function (now, skillEvent) {
            if (!skillEvent) {
                skillEvent = this.skillEvent;
            }
            if (!skillEvent) {
                return undefined;
            }
            if (now > skillEvent.time) {
                while (skillEvent.next) {
                    if (skillEvent.next.time < now) {
                        skillEvent = skillEvent.next;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                while (skillEvent.pre) {
                    skillEvent = skillEvent.pre;
                    if (skillEvent.time <= now) {
                        break;
                    }
                }
            }
            this.currentEvent = skillEvent;
            return skillEvent;
        };
        EventFilter.prototype.reset = function () {
            var _a = this, skillEvent = _a.skillEvent, pro = _a.pro;
            this.currentEvent = skillEvent;
            this.needUpdate = true;
            for (var key in pro) {
                var v = skillEvent[key];
                if (v != undefined) {
                    pro[key] = v;
                }
            }
        };
        EventFilter.prototype.update = function (now, interval) {
            var _a = this, currentEvent = _a.currentEvent, pro = _a.pro, starttime = _a.starttime;
            now -= starttime;
            currentEvent = this.getCurrentEvent(now, currentEvent);
            var next = currentEvent.next;
            if (next) {
                rf.tween_lerp_pro(currentEvent, currentEvent.next, (now - currentEvent.time) / (next.time - currentEvent.time), pro);
            }
            else {
                this.needUpdate = false;
                for (var key in pro) {
                    var v = currentEvent[key];
                    if (v != undefined) {
                        pro[key] = v;
                    }
                }
                this.end();
            }
            this.updatepro(pro);
        };
        EventFilter.prototype.updatepro = function (pro) { };
        ;
        EventFilter.prototype.end = function () {
            rf.Engine.removeTick(this);
        };
        ;
        return EventFilter;
    }(rf.FilterBase));
    rf.EventFilter = EventFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ColorTransformFilter = (function (_super) {
        __extends(ColorTransformFilter, _super);
        function ColorTransformFilter() {
            var _this = _super.call(this, 31 + "") || this;
            _this.skey = 31 + "_";
            _this.mul = rf.newVector3D(1, 1, 1, 1);
            _this.add = rf.newVector3D(0, 0, 0, 0);
            _this.pro = { mr: 1, mg: 1, mb: 1, ma: 1, ar: 0, ag: 0, ab: 0, aa: 0 };
            _this.fragment = ColorTransformFilter.FRAGMENT;
            return _this;
        }
        ColorTransformFilter.prototype.updatepro = function (pro) {
            var _a = this, mul = _a.mul, add = _a.add;
            mul[0] = pro.mr;
            mul[1] = pro.mg;
            mul[2] = pro.mb;
            mul[3] = pro.ma;
            add[0] = pro.ar;
            add[1] = pro.ag;
            add[2] = pro.ab;
            add[3] = pro.aa;
        };
        ColorTransformFilter.prototype.setProgramConstants = function (context, program, target) {
            var _a = this, mul = _a.mul, add = _a.add;
            rf.context3D.setProgramConstantsFromVector("color_mul", mul, 4);
            rf.context3D.setProgramConstantsFromVector("color_add", add, 4);
        };
        ColorTransformFilter.prototype.alphaTo = function (from, to, durtion) {
            var event = { ma: 0, time: 0 };
            event.next = { ma: from, time: 100 };
            event.next.next = { ma: to, time: durtion + 100 };
            this.setEvent(event);
            this.starttime = rf.engineNow;
            rf.Engine.addTick(this);
        };
        ColorTransformFilter.prototype.end = function () {
            rf.Engine.removeTick(this);
        };
        ColorTransformFilter.FRAGMENT = {
            def: "\nuniform vec4 color_mul;\nuniform vec4 color_add;\n",
            code: "\ncolor  = color * color_mul + color_add;\n"
        };
        return ColorTransformFilter;
    }(rf.EventFilter));
    rf.ColorTransformFilter = ColorTransformFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TexFilter = (function (_super) {
        __extends(TexFilter, _super);
        function TexFilter(target, type) {
            var _this = _super.call(this, type) || this;
            _this.target = target;
            _this.readly = false;
            return _this;
        }
        TexFilter.prototype.setData = function (texData) {
            this.texData = texData;
            var tex = texData.tex, color = texData.color;
            if (tex) {
                this.source = rf.createUrlSource(tex, undefined, this.textureLoadComplete.bind(this));
            }
            else if (!this.color) {
                if (color === undefined) {
                    color = 0xCCCCCC;
                }
                this.color = rf.toRGB(color);
            }
        };
        TexFilter.prototype.textureLoadComplete = function (source) {
            this.readly = true;
            this.target.shader = true;
        };
        return TexFilter;
    }(rf.EventFilter));
    rf.TexFilter = TexFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var DiffFilter = (function (_super) {
        __extends(DiffFilter, _super);
        function DiffFilter() {
            var _this = _super.call(this, "diff_") || this;
            _this.vertex = DiffFilter.VERTEX;
            _this.fragment = DiffFilter.FRAGMENT;
            _this.readly = true;
            return _this;
        }
        DiffFilter.VERTEX = {
            def: "\nattribute vec2 uv;\nvarying vec2 vUV;\n",
            code: "\nvUV = uv;\n"
        };
        DiffFilter.FRAGMENT = {
            def: "\nuniform sampler2D diff;\nvarying vec2 vUV;\n",
            code: "\nvec4 color = texture2D(diff, vUV);\n"
        };
        return DiffFilter;
    }(rf.FilterBase));
    rf.DiffFilter = DiffFilter;
    var UIDiffFilter = (function (_super) {
        __extends(UIDiffFilter, _super);
        function UIDiffFilter() {
            var _this = _super.call(this, "uidiff_") || this;
            _this.vertex = UIDiffFilter.VERTEX;
            _this.fragment = UIDiffFilter.FRAGMENT;
            _this.readly = true;
            return _this;
        }
        UIDiffFilter.VERTEX = {
            def: "\nattribute vec4 uv;\nvarying vec3 vUV;\n",
            code: "\nvUV = uv.xyw;\n"
        };
        UIDiffFilter.FRAGMENT = {
            def: "\n    uniform sampler2D diff;\n    uniform sampler2D diff1;\n    varying vec3 vUV;\n    ",
            code: "\n    vec4 color;\n    if(vUV.z < 1.0){\n        color = texture2D(diff, vUV.xy);\n    }else if(vUV.z < 2.0){\n        color = texture2D(diff1, vUV.xy);\n    }\n    \n    "
        };
        return UIDiffFilter;
    }(rf.FilterBase));
    rf.UIDiffFilter = UIDiffFilter;
    var FillFilter = (function (_super) {
        __extends(FillFilter, _super);
        function FillFilter(color, alpha) {
            var _this = _super.call(this, "fill_") || this;
            _this.color = rf.toRGBA(color);
            _this.color[3] = alpha;
            _this.fragment = FillFilter.FRAGMENT;
            return _this;
        }
        FillFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromVector("diffcolor", this.color, 4);
        };
        FillFilter.FRAGMENT = {
            def: "\nuniform vec4 diffcolor;\n",
            code: "\nvec4 color = diffcolor;\n"
        };
        return FillFilter;
    }(rf.FilterBase));
    rf.FillFilter = FillFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var FresnelFilter = (function (_super) {
        __extends(FresnelFilter, _super);
        function FresnelFilter(type) {
            var _this = _super.call(this, type ? type : "fresnel_") || this;
            _this.vertex = FresnelFilter.VERTEX;
            _this.fragment = FresnelFilter.FRAGMENT;
            _this.eye = rf.newVector3D(0, 0, 0, 0);
            _this.useInvm = true;
            _this.pro = { fre: 0 };
            return _this;
        }
        FresnelFilter.prototype.updatepro = function (pro) {
            this.eye[3] = pro.fre;
        };
        FresnelFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            var eye = this.eye;
            var pos = camera.pos;
            eye.v3_normalize(pos);
            context.setProgramConstantsFromVector("fresnel", eye, 4);
        };
        FresnelFilter.prototype.tweenTo = function (from, to, durtion) {
            var event = { fre: from, time: 0 };
            event.next = { fre: to, time: durtion };
            this.setEvent(event);
            this.starttime = rf.engineNow;
            rf.Engine.addTick(this);
        };
        FresnelFilter.prototype.end = function () {
            rf.Engine.removeTick(this);
        };
        FresnelFilter.VERTEX = {
            def: "\nuniform vec4 fresnel;\nvarying vec2 vFresnel;\n",
            code: "\nvFresnel  =  vec2(pow(1.0 - dotValue(n,fresnel,invm),2.0),fresnel.w);\n",
        };
        FresnelFilter.FRAGMENT = {
            def: "\nvarying vec2 vFresnel;\n",
            code: "\ncolor.xyz *= (vFresnel.x * vFresnel.y +1.0) * color.w;\n// color.w = vFresnel;\n",
        };
        return FresnelFilter;
    }(rf.EventFilter));
    rf.FresnelFilter = FresnelFilter;
    var FresnelAlphaFilter = (function (_super) {
        __extends(FresnelAlphaFilter, _super);
        function FresnelAlphaFilter(value) {
            var _this = _super.call(this, "fresnelAlpha_") || this;
            _this.vertex = FresnelAlphaFilter.VERTEX;
            _this.fragment = FresnelAlphaFilter.FRAGMENT;
            _this.eye[3] = value;
            return _this;
        }
        FresnelAlphaFilter.VERTEX = {
            def: "\nuniform vec4 fresnel;\nvarying vec2 vFresnel;\n",
            code: "\nvFresnel  =  vec2(pow(1.0 - dotValue(n,fresnel,invm),fresnel.w),fresnel.w);\n",
        };
        FresnelAlphaFilter.FRAGMENT = {
            def: "\n// uniform vec4 fresnel_color;\nvarying vec2 vFresnel;\n",
            code: "\ncolor.xyz *= (vFresnel.x + 1.0);\n//  * fresnel_color.xyz;\ncolor.w *= vFresnel.x;\n",
        };
        return FresnelAlphaFilter;
    }(FresnelFilter));
    rf.FresnelAlphaFilter = FresnelAlphaFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var LiuguangFilter = (function (_super) {
        __extends(LiuguangFilter, _super);
        function LiuguangFilter(target, data) {
            var _this = _super.call(this, target, "liuguang_") || this;
            _this.v = rf.newVector3D();
            _this.setData(data);
            return _this;
        }
        LiuguangFilter.prototype.setData = function (setting) {
            _super.prototype.setData.call(this, setting);
            var v = this.v;
            var speed = setting.speed, scale = setting.scale, alpha = setting.alpha;
            this.speed = speed === undefined ? 0 : speed;
            v[1] = scale === undefined ? 1 : scale;
            v[2] = alpha === undefined ? 0.95 : alpha;
            v[3] = 1 / (1 - v[2]);
        };
        LiuguangFilter.prototype.textureLoadComplete = function (source) {
            this.readly = true;
            this.target.shader = true;
            var g = rf.gl;
            this.source.textureData = rf.context3D.getTextureData(name, false, g.NEAREST, g.NEAREST, g.REPEAT);
        };
        LiuguangFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            var _a = this, v = _a.v, source = _a.source, speed = _a.speed;
            source.uploadContext(program, "liuguangTex");
            v[0] = speed * rf.engineNow / 1000;
            context.setProgramConstantsFromVector("liuguang", v, 4);
        };
        return LiuguangFilter;
    }(rf.TexFilter));
    rf.LiuguangFilter = LiuguangFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var PosFilter = (function (_super) {
        __extends(PosFilter, _super);
        function PosFilter() {
            var _this = _super.call(this, 4 + "") || this;
            _this.skey = "";
            _this.pro = { x: 0, y: 0, z: 0 };
            return _this;
        }
        PosFilter.prototype.updatepro = function (pro) {
            this.target.setPos(pro.x, pro.y, pro.z);
        };
        return PosFilter;
    }(rf.EventFilter));
    rf.PosFilter = PosFilter;
    var ScaleFilter = (function (_super) {
        __extends(ScaleFilter, _super);
        function ScaleFilter() {
            var _this = _super.call(this, 3 + "") || this;
            _this.skey = "";
            _this.pro = { x: 1, y: 1, z: 1 };
            return _this;
        }
        ScaleFilter.prototype.updatepro = function (pro) {
            this.target.setSca(pro.x, pro.y, pro.z);
        };
        return ScaleFilter;
    }(rf.EventFilter));
    rf.ScaleFilter = ScaleFilter;
    var RotFilter = (function (_super) {
        __extends(RotFilter, _super);
        function RotFilter() {
            var _this = _super.call(this, 2 + "") || this;
            _this.skey = "";
            _this.pro = { x: 0, y: 0, z: 0 };
            return _this;
        }
        RotFilter.prototype.updatepro = function (pro) {
            this.target.setRot(pro.x, pro.y, pro.z);
        };
        return RotFilter;
    }(rf.EventFilter));
    rf.RotFilter = RotFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ShadowFilter = (function (_super) {
        __extends(ShadowFilter, _super);
        function ShadowFilter(target) {
            var _this = this;
            target.shadowTarget = true;
            _this = _super.call(this, target, "shadow_") || this;
            _this.v = rf.newVector3D();
            var func = "";
            var def = "uniform mat4 sunmvp;\nvarying vec4 vShadowUV;\n";
            var code = "vShadowUV = sunmvp * p;\n";
            _this.vertex = rf.newShaderCode(code, def, func);
            _this.readly = true;
            func =
                "\nfloat unpackRGBAToDepth( const in vec4 v ) {\n    return dot( v, UnpackFactors );\n}\n            \nfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n    return step( unpackRGBAToDepth( texture2D( depths, uv ) ) , compare );\n}\n";
            def =
                "\nuniform sampler2D shadow;\nvarying vec4 vShadowUV;\nconst float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\n";
            code =
                "\nvec3 sc = vShadowUV.xyz / vShadowUV.w;\nsc.xyz = sc.xyz * 0.5 + 0.5;\nfloat shadowValue = texture2DCompare(shadow, sc.xy,sc.z+0.001);\ncolor.xyz *= vec3(1.0 - shadowValue * 0.3);\n// color = texture2D( shadow , vShadowUV.xy );\n// color = vec4(vShadowUV.xyz,1.0);\n";
            _this.fragment = rf.newShaderCode(code, def, func);
            return _this;
        }
        ShadowFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            if (rf.ROOT.shadow.rtt) {
                rf.ROOT.shadow.rtt.uploadContext(program, "shadow");
                context.setProgramConstantsFromMatrix("sunmvp", this.target.shadowMatrix);
            }
        };
        return ShadowFilter;
    }(rf.TexFilter));
    rf.ShadowFilter = ShadowFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var SunFilter = (function (_super) {
        __extends(SunFilter, _super);
        function SunFilter() {
            var _this = _super.call(this, "sun_") || this;
            _this.vertex = SunFilter.VERTEX;
            _this.fragment = SunFilter.FROGMENT;
            _this.useInvm = true;
            return _this;
        }
        SunFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            var s;
            if (target) {
                s = target.scene;
            }
            else {
                s = rf.scene;
            }
            context.setProgramConstantsFromVector("lightDirection", s.sun.normalsize, 4);
        };
        SunFilter.VERTEX = {
            def: "\nuniform vec4 lightDirection;\nvarying float vDiffuse;\n",
            code: "\nvDiffuse =  clamp(dotValue(n,lightDirection,invm),0.1,1.0);\n",
        };
        SunFilter.FROGMENT = {
            def: "\nvarying float vDiffuse;\n",
            code: "\ncolor.xyz *= (vDiffuse * 0.6 + 1.0);\n",
        };
        return SunFilter;
    }(rf.FilterBase));
    rf.SunFilter = SunFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var TexChannelFilter = (function (_super) {
        __extends(TexChannelFilter, _super);
        function TexChannelFilter() {
            var _this = _super.call(this, undefined, 30 + "") || this;
            _this.skey = 30 + "_";
            _this.pro = { ou: 0, ov: 0, su: 1, sv: 1 };
            _this.uv = rf.newVector3D();
            _this.vertex = TexChannelFilter.VERTEX;
            _this.fragment = TexChannelFilter.FRAGMENT;
            return _this;
        }
        TexChannelFilter.prototype.setEvent = function (event, tick) {
            if (tick === void 0) { tick = false; }
            _super.prototype.setEvent.call(this, event, tick);
            rf.createUrlSource(event.url, undefined, this.textureLoadComplete.bind(this));
        };
        TexChannelFilter.prototype.updatepro = function (pro) {
            var uv = this.uv;
            uv[0] = pro.ou;
            uv[1] = pro.ov;
            uv[2] = pro.su;
            uv[3] = pro.sv;
        };
        TexChannelFilter.prototype.textureLoadComplete = function (source) {
            _super.prototype.textureLoadComplete.call(this, source);
            this.source = source;
            source.textureData = rf.context3D.getTextureData(this.source.name, false, 9728, 9728, this.skillEvent.repart);
        };
        TexChannelFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            context.setProgramConstantsFromVector("texChannelData", this.uv, 4);
            this.source.uploadContext(program, "texChannel");
        };
        TexChannelFilter.VERTEX = {
            def: "\nuniform vec4 texChannelData;\nvarying vec2 vTexUV;\n",
            code: "\nvTexUV = (uv.xy - 0.5) * texChannelData.zw + texChannelData.xy + 0.5;\n"
        };
        TexChannelFilter.FRAGMENT = {
            def: "\nuniform sampler2D texChannel;\nvarying vec2 vTexUV;\n",
            code: "\ncolor.w *= texture2D(texChannel, vTexUV).w;\n"
        };
        return TexChannelFilter;
    }(rf.TexFilter));
    rf.TexChannelFilter = TexChannelFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var UVAnimFilter = (function (_super) {
        __extends(UVAnimFilter, _super);
        function UVAnimFilter() {
            var _this = _super.call(this, 5 + "") || this;
            _this.skey = 5 + "_";
            _this.uv = rf.newVector3D();
            _this.pro = { ou: 0, ov: 0, su: 1, sv: 1 };
            _this.vertex = UVAnimFilter.VERTEX;
            return _this;
        }
        UVAnimFilter.prototype.updatepro = function (pro) {
            var uv = this.uv;
            uv[0] = pro.ou;
            uv[1] = pro.ov;
            uv[2] = pro.su;
            uv[3] = pro.sv;
        };
        UVAnimFilter.prototype.setProgramConstants = function (context, program, target, camera) {
            var uv = this.uv;
            context.setProgramConstantsFromVector("uvAnim", uv, 4);
        };
        UVAnimFilter.VERTEX = {
            def: "\nuniform vec4 uvAnim;\n",
            code: "\nvUV = (vUV.xy - vec2(0.5)) * uvAnim.zw + uvAnim.xy + vec2(0.5);\n"
        };
        return UVAnimFilter;
    }(rf.EventFilter));
    rf.UVAnimFilter = UVAnimFilter;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var ColorMaterial = (function (_super) {
        __extends(ColorMaterial, _super);
        function ColorMaterial(color, alpha) {
            if (color === void 0) { color = 0xFFFFFF; }
            if (alpha === void 0) { alpha = 1.0; }
            var _this = _super.call(this) || this;
            _this.color = color;
            _this.alpha = alpha;
            _this.setData(undefined);
            return _this;
        }
        ColorMaterial.prototype.setColor = function (color, alpha) {
            this.color = color;
            this.alpha = alpha;
            this.change = true;
        };
        ColorMaterial.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
            this.cull = 1028;
        };
        ColorMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            return _super.prototype.uploadContext.call(this, camera, mesh, now, interval);
        };
        ColorMaterial.prototype.initFilters = function (mesh) {
            _super.prototype.initFilters.call(this, mesh);
            var filters = mesh.filters;
            var _a = this, color = _a.color, alpha = _a.alpha;
            delete filters["diff_"];
            delete filters["discard_"];
            filters["fill_"] = new rf.FillFilter(color, alpha);
        };
        return ColorMaterial;
    }(rf.Material));
    rf.ColorMaterial = ColorMaterial;
})(rf || (rf = {}));
var rf;
(function (rf) {
    var StandardMaterial = (function (_super) {
        __extends(StandardMaterial, _super);
        function StandardMaterial() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StandardMaterial.prototype.uploadContext = function (camera, mesh, now, interval) {
            return false;
        };
        StandardMaterial.prototype.createProgram = function (mesh) {
            var p;
            var c = rf.context3D;
            var vertexCode;
            var fragmentCode;
            var key;
            p = c.createProgram(vertexCode, fragmentCode, key);
            return p;
        };
        return StandardMaterial;
    }(rf.Material));
    rf.StandardMaterial = StandardMaterial;
})(rf || (rf = {}));
//# sourceMappingURL=stage3d.js.map
global.rf = rf;global.rf_v3_identity = rf_v3_identity;global.rf_m3_identity = rf_m3_identity;global.rf_m2_identity = rf_m2_identity;global.rf_m3_temp = rf_m3_temp;console.log("publish:version:trunk date:Mon Jan 21 2019 12:03:30 GMT+0800 (中国标准时间)");