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

files.forEach((v) => {
    const file = fs.readFileSync(v);

    hashArray.push({
        file: v.substr(5),
        hash: md5(file)
    });
});

fs.writeFileSync('./dist/manifest.json', JSON.stringify(hashArray));
