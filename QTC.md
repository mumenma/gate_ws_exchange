吗，# TypeScript + Koa + Sequelize

## Reference

- [Node 安全指南](https://github.com/Tencent/secguide/blob/main/JavaScript%E5%AE%89%E5%85%A8%E6%8C%87%E5%8D%97.md#2)
- [Koa 错误处理](https://github.com/demopark/koa-docs-Zh-CN/blob/master/error-handling.md)

- [TypeScript Docs](https://www.typescriptlang.org/docs) : [TypeScript 中文网](https://ts.nodejs.cn/docs/)
- [TypeScript](https://github.com/zhongsp/TypeScript) : [TypeScript 使用指南手册](https://www.patrickzhong.com/TypeScript)
- [typescript-book](https://github.com/basarat/typescript-book)
    > 📚 The definitive guide to TypeScript and possibly the best TypeScript book 📖. Free and Open Source 🌹
- [typescript-book-chinese](https://github.com/jkchao/typescript-book-chinese) : [TypeScript Deep Dive 中文版](https://jkchao.github.io/typescript-book-chinese)
- [clean-code-typescript](https://github.com/labs42io/clean-code-typescript) : [TypeScript 代码整洁之道](https://github.com/pipiliang/clean-code-typescript)

- [2021.07.06 一篇够用的TypeScript总结](https://juejin.cn/post/6981728323051192357)
- [2020.09.14 一份不可多得的 TS 学习指南](https://juejin.cn/post/6872111128135073806)

------

- [koa](https://github.com/koajs/koa)
    > Expressive middleware for node.js using ES2017 async functions
- [koa-docs-Zh-CN](https://github.com/demopark/koa-docs-Zh-CN.git)
- [koa examples](https://github.com/koajs/examples)
- [koa-typescript-cms](https://github.com/murongg/koa-typescript-cms)

- [2023-02-09 Koa2 + Ts 项目结构搭建 保姆级教程](https://juejin.cn/post/7198116097320976442)
- [2022-07-30 基于Koa2+Mysql+Sequelize开发API接口](https://juejin.cn/post/7125867746172076069)
- [2021-12-21 Koa2 开发快速入门](https://juejin.cn/post/7044184318825988126)
- [2021-08-09 koa2+Ts项目的优雅使用和封装](https://juejin.cn/post/6994242530233548837)
- [2020-05-27 一杯茶的时间，上手 Koa2 + MySQL 开发](https://zhuanlan.zhihu.com/p/143998174)

------

- [Sequelize](https://github.com/sequelize/sequelize) : [docs](https://sequelize.org/)
    > Feature-rich ORM for modern Node.js and TypeScript, it supports PostgreSQL (with JSON and JSONB support), MySQL, MariaDB, SQLite, MS SQL Server, Snowflake, Oracle DB (v6), DB2 and DB2 for IBM i.
- [sequelize-docs-Zh-CN](https://github.com/demopark/sequelize-docs-Zh-CN) : [Sequelize 中文文档](https://www.sequelize.cn/)
- [sequelize `!:` 语法](https://sequelize.org/v5/manual/typescript.html)
- [sequelize-typescript](https://github.com/sequelize/sequelize-typescript)
    > Decorators and some other features for sequelize

- [egg](https://github.com/eggjs/egg) : [docs](https://www.eggjs.org/zh-CN)
    > 🥚 Born to build better enterprise frameworks and apps with Node.js & Koa

- [Docker 基础](https://fe.zuo11.com/server/docker.html)

## Solution

- > (sequelize) Warning: Model is declaring public class fields for attribute(s): "id",These class fields are shadowing Sequelize's attribute getters & setters.
    * [How to fix the incompatibility with Public Class Fields](https://github.com/sequelize/sequelize/issues/14300)
    * [公共类字段的注意事项](https://www.sequelize.cn/core-concepts/model-basics#%E5%85%AC%E5%85%B1%E7%B1%BB%E5%AD%97%E6%AE%B5%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

## install

```shell
$ yarn init # 初始化项目
$ yarn add -D typescript @types/node # 安装 TS 开发依赖
$ npx tsc --init # 初始 TS 项目
$ npx tsc # 编译 TS 项目
# 安装开发工具
#   ts-node : 编译 TS
#   ts-node-dev : 自动编译 TS，并重启 node 服务
#   nodemon : 实时监控代码变化，并重启 node 服务
#   npm-run-all : 执行多个脚本命令
$ yarn add -D ts-node ts-node-dev nodemon npm-run-all
# 安装 ESLint 
$ yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
# 安装 Prettier
$ yarn add -D prettier eslint-config-prettier
# 安装 koa 
$ yarn add koa
$ yarn add -D @types/koa
# 中间件 - body 解析
#   - 方案一 (推荐)  https://github.com/koajs/koa-body
$ yarn add koa-body
#   - 方案二  https://github.com/koajs/bodyparser
$ yarn add koa-bodyparser
$ yarn add -D @types/koa-bodyparser
# 中间件 - 路由
#   - 方案一 (推荐) @koa/router | https://github.com/koajs/router
$ yarn add @koa/router
$ yarn add -D @types/koa__router
#   - 方案二 koa-routers | https://github.com/ZijianHe/koa-router
$ yarn add koa-router 
$ yarn add -D @types/koa-router
# 中间件 - 日志
$ yarn add koa-logger
# 数据库
##  - mysql
$ yarn add mysql2
$ yarn add sequelize
# 日志
# log4js : https://github.com/log4js-node/log4js-node
$ yarn add log4js
# 运行
$ yarn dev
# 打包
$ yarn build

# 构建 docker 镜像 
$ docker build -t qtc-bot .
# 运行构建的 docker 容器
$ docker run --env-file ./.env --name qtc-bot -p 3000:3000 -d qtc-bot
# 进入容器 bash
$ docker exec -it qtc-bot bash
# 打包镜像
$ docker save -o qtc-bot.tar qtc-bot
# 导入打包镜像
$ docker load < qtc-bot.tar

# 查看容器信息
$ docker inspect qtc-bot
# 查看容器 IP
$ docker inspect qtc-mysql | grep IPAddress
# 创建 docker 网络
$ docker network create qtc-network
```

## GitHub Action

```yaml
name: Build docker and deploy to server.

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build docker image
        run: docker build . -t qtc-bot

      - name: Archive docker image
        run: docker save -o qtc-bot.tar qtc-bot

      - name: Deploy to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          source: "qtc-bot.tar"
          target: "/tmp" 
      
      - name: Generate key file
        run: |
          echo '${{ secrets.KEY }}' > key
          chmod 600 key
      
      - name: Load docker image and run container
        run: | 
          ssh -o StrictHostKeyChecking=no -i key ${{ secrets.USERNAME }}@${{ secrets.HOST }} << EOF  
            docker stop qtc-bot
            docker rm qtc-bot
            docker rmi qtc-bot
            docker load < /tmp/qtc-bot.tar   
            docker run --env-file ./.env --name qtc-bot -p 3000:3000 -d qtc-bot
            rm /tmp/qtc-bot.tar
          EOF
```
