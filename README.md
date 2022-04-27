# Tampermokey vue template

use vue + scss build your userscript GUI

use eslint validate and format your code easily

## 开发环境 Require

- Node
- pnpm
- Git
- 推荐使用 vscode 进行开发

## 如何使用 Usage

1. clone code without git `degit imhucy/tampermokey-vue-template my-app`
  - if you don't install `degit` just `pnpm install -g degit`
- 检查 `header.js` 文件修改你需要引入的包
- `pnpm install`
- `pnpm dev`
- 将文件 `./test/header.js` 复制到 `TamperMonkey script` 编辑器.
- 删除`pages/Home.vue`里的内容改成你的页面
- 打开你要修改的网页 Enjoy it!
## 功能 Features

- 开发模式下保存代码自动刷新页面
- 再也不用 `Ctrl+V` 进行油猴脚本开发了
- 支持 Vue 2.x 的强大页面构建功能

## 感谢 Thanks

- [webpack-tampermonkey](https://github.com/momocow/webpack-tampermonkey)
- [SettingDust/webpack-tampermonkey](https://github.com/SettingDust/webpack-tampermonkey)

## 案例 Example

- [biliplus-material](https://github.com/SettingDust/biliplus-material)
- [RSSHelper](https://github.com/BangumiSystem/RSSHelper)
