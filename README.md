# rn-cache-cleaner

react native 缓存清理方法。

## 用法

```
node clean.js -p <path>
```

`<path>` 为项目路径，举例：

```
node clean.js -p '/Users/yayu.wang/hotelrn'
```

## 人工清理

如果觉得不保险，可以用人工方式暴力清理，这是坠吼的：

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

无论你用哪种方式，清理完了别忘了重启服务哦，口..口
