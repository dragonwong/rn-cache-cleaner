# rn-cache-cleaner

react native 缓存清理基本法。

RN 在打包脚本时容易产生缓存，影响到日常开发，尤其是更改了 babel 之后，如果不清缓存必定不生效，这是坠痛苦的。下面总结了几种清缓存的方法，一点微小的贡献，谢谢大家。

## 脚本清理法

Too simple 的脚本清理大法。

```
node clean.js [-p <path>] [-e <entryPath>]
```

- `path` 为项目路径，默认为当前路径。
- `entryPath` 为入口文件相对 `path` 的路径。如果入口文件就在项目根目录，此参数可省。

举例：

```
# 基本款
node clean.js -p '/Users/yayu.wang/hotelrn'
# 指定入口款
node clean.js -p '/Users/yayu.wang/hotelrn' -e './example/test'
```

## 人工清理法

如果懒得搞脚本，可以用人工方式清理，我个人觉得这是坠吼的，屡试不爽。

1. 在 node 环境中获取系统临时文件夹路径

    ```js
    node
    > os.tmpdir()
    '/var/folder/your/own/path'
    ```

2. 清空该文件夹

    ```bash
    cd '/var/folder/your/own/path' && rm -rf *
    ```

不用担心，将来如果出了偏差，等于是我也有责任的。

## 服务钦定法

这是坠暴力的方法，强制打包程序每次都更新缓存，excited！

修改文件 `node_modules/react-native/packager/react-packager/src/Bundler/index.js` 中：

```js
this._cache = new Cache({
    resetCache: opts.resetCache,
    cacheKey: cacheKeyParts.join('$'),
});
```

`resetCache` 强制钦定为 `true`。

这个方法有一个吼，当你发现服务器（发布机器）上存在缓存，但不能（不方便或不敢）跑上去删，在这修改下再发一版，就吼了。

## 简单总结下

以上都是实践过真实可行的，无论你用哪种方式，别忘了重启服务哦，蛤蛤 口..口

## 拓展阅读：清缓存的原理

看到你们这样热情啊，一句话不说也不好，以上这些方法绝非无中生有的东西，方案都来自于源码：

```
# 1. 关键字 Cache
node_modules/react-native/packager/react-packager/src/Bundler/index.js
# 2. 关键字 getCacheFilePath
node_modules/react-native/packager/react-packager/src/DependencyResolver/Cache/index.js
# 3. 关键字 getCacheFilePath
node_modules/react-native/packager/react-packager/src/DependencyResolver/Cache/lib/getCacheFilePath.js
```

看完这三段，你就识得了。
