/**
 * @file createHash.js
 * @author lihuanji
 *
 * 为build后文件生成hash
 * 用于原生增量更新
 */

const glob = require('glob');
const fs = require('fs');
const md5 = require('md5');

const files = glob.sync('dist/**', { nodir: true });

const hashArray = [];

let i = 0;

files.forEach((v) => {
    fs.readFile(v, (err, buf) => {
        hashArray.push({
            file: v.substr(5),
            hash: md5(buf)
        });

        i++;

        if (i === files.length) {
            fs.writeFileSync('./dist/manifest.json', JSON.stringify(hashArray));
        }
    });
});
