'use strict';

/**
 * 清除缓存
 * @usage:
 * // 入口在根目录
 * node clean.js -p '/Users/yayu.wang/hotelrn'
 * // 入口在其他目录
 * node clean.js -p '/Users/yayu.wang/hotelrn' -e './example/test'
 * // 如果你在 hotelrn 目录下，可以不加参数 -p（-e 如有需要不可省）
 * node clean.js
 */

let optimist = require('optimist');
let sysPath = require('path');
let fs = require('fs');
let crypto = require('crypto');
let os = require('os');

let projectRoots = [];
let cacheVersion = '3';

if (optimist.argv.p) {
    projectRoots[0] =  optimist.argv.p;
} else {
    projectRoots[0] = __dirname;
}

if (optimist.argv.e) {
    projectRoots[1] =  sysPath.join(projectRoots[0], optimist.argv.e);
}

let rnVersion = require(sysPath.join(projectRoots[0], './node_modules/react-native/package.json')).version;
let pathKey = projectRoots.join(',').split(sysPath.sep).join('-');
let mtime;

try {
    mtime = fs.statSync(sysPath.join(projectRoots[0], './node_modules/react-native/packager/transformer.js')).mtime;
    mtime = String(mtime.getTime());
} catch (error) {
    mtime = '';
}

let cacheKey = ['react-packager-cache', rnVersion, cacheVersion, pathKey, mtime].join('$');
let hash = crypto.createHash('md5');

hash.update(cacheKey);

let cacheFilePath = sysPath.join(os.tmpdir(), hash.digest('hex'));

console.log('try to delete cache file: ' + cacheFilePath);

try {
    fs.unlinkSync(cacheFilePath);
} catch(e) {
    console.log('no file')
}
