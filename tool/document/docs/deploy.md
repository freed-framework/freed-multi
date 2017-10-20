### 文档系统部署说明

##### 构建流程：
文档服务器目前使用jenkins进行定时构建，间隔1小时从sourcecamp仓库中拉取代码并执行构建脚本。
jenkins相关信息：
- jenkins目录:jenkins通过yum安装，具体目录可以通过```find / -name jenkins```列出jenkins的各个目录。
- 文档serve目录:```/opt/application/document```
- 构建脚本位置:```/opt/application/silk-build.sh```

##### 构建主要流程:
1. 构建之前，jenkins会自动清理工作空间，把上次拉取的代码和构建的临时文件删除。然后执行以下脚本进行构建:
```bash
#!/bin/bash
#将node输出到环境变量中
export PATH=$PATH:/opt/environment/node-v6.9.1-linux-x64/bin;
#禁用ssl检查，然后从仓库中clone代码
env GIT_SSL_NO_VERIFY=true git clone https://username:password@sc.eff.com:3721/jingoal/mobile-silk;
cd mobile-silk;
#安装依赖
npm install;
#构建文档
npm run doc-dist;
#文档会构建到_site目录，构建完毕后，将构建的文档拷贝至serve目录
cp -r -f _site/* /opt/application/document
```
2. 在serve目录中，通过http-server对外提供http服务.
