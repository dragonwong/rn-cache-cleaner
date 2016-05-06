'use strict';

/**
 * 清除缓存
 * @usage:
 * node clean.js -p '/Users/yayu.wang/hotelrn'
 * （如果你在 hotelrn 目录下，可以不加参数: node clean.js）
 */

let optimist = require('optimist');
let sysPath = require('path');
let fs = require('fs');
let crypto = require('crypto');
let os = require('os');

let filePath = optimist.argv.p || __dirname;
let cacheVersion = '3';

let rnVersion = require(sysPath.join(filePath, './node_modules/react-native/package.json')).version;
let pathKey = __dirname.split(sysPath.sep).join('-');
let mtime;

try {
    mtime = fs.statSync(sysPath.join(filePath, './node_modules/react-native/package.json')).mtime;
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
