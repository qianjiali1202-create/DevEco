# DevEco 仓库发布约定

仅在目标仓库是 `qianjiali1202-create/DevEco` 时读取。

## 仓库与地址

- 仓库：`https://github.com/qianjiali1202-create/DevEco`
- 默认分支：`main`
- Pages：`https://qianjiali1202-create.github.io/DevEco/`
- 当前发布方式：从 `main` 分支根目录发布。开始任务时仍需重新核对，不能把这里当作永久状态。
- 根目录 `.nojekyll` 必须保留，否则 `_shared` 等以下划线开头的目录不会完整发布。

## 内容位置

- 研究材料：`analysis/<slug>/`
- 可交互 Demo：`demos/<slug>/`
- 启动页目录：`site/catalog.js`
- 根入口：`index.html`
- 仓库说明：`README.md`
- 仓库级 Skills：`.agents/skills/<skill-name>/`

新增页面时更新 `site/catalog.js`，并检查根页面对 `site/catalog.js` 的缓存版本参数。不要为单个页面建立新的 Pages workflow。

## 提交身份

仓库主人账号为 `qianjiali1202-create`。当前提交历史中可确认的身份包括：

- `qianjiali1202-create <qianjiali1202@gmail.com>`
- `qianjiali1202-create <282194346+qianjiali1202-create@users.noreply.github.com>`

不要使用原仓库作者 `Cinnnnnnndy`、`Cindy_wxd` 或其邮箱。优先使用已认证的 GitHub 连接，不需要为了贡献图伪造身份。

## 发布验证

1. 获取 `main` 最新 SHA，确保更新基于当前远端。
2. 验证改动页面的 HTML、CSS、JS、JSON 和图片资源。
3. 推送后再次读取 `main`，确认指向新 commit。
4. 打开实际页面路径；需要绕过缓存时使用 `?v=<版本>`，但不要改变稳定路径。
5. 检查启动页能找到新条目，页面无脚本错误、资源错误或整页横向溢出。
