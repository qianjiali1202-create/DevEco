# 钱佳丽 · Tree Lab / DevEco 项目背景

仅在用户明确继续本项目时使用。以下是 2026-10-15 本次对话的记录；先检查当前文件、远端分支和部署状态，再修改。

## 项目位置与署名

- 研究整理与方案设计：钱佳丽。
- GitHub 账号：`qianjiali1202-create`。
- 目标仓库：`https://github.com/qianjiali1202-create/DevEco`。
- 启动页分类：`分析与研究`，目录数据中 `id: 'analysis'`。
- 完整材料目录：`analysis/ide-tree-lab/`。
- 原作品集地址：`https://qianjiali1202-create.github.io/portfolio/ide-tree-lab/`。
- 参考启动页：`https://cinnnnnnndy.github.io/DevEco/`，原有其他研究保留原作者归属。
- 合入记录：`0cf30f5a4c9714f41e051c5313e2957f1df879e6`。这不是对未来最新分支的断言。
- 合入后当时 DevEco Pages 返回 404；不要将这个历史结果当成当前状态，也不要声称已经部署。

以上记录不构成对新提交、跨仓库发布或改动第三方仓库的长期授权；依据当前用户请求和会话确定范围。

## 用户已确认的当前方案

| 参数 | 标准模式 | 紧凑备选 |
|---|---:|---:|
| 箭头布局容器 | 20px | 20px |
| 文件图标布局容器 | 20px | 20px |
| 文件名字号 | 16px | 16px |
| 箭头槽至图标容器 | 4px | 4px |
| 图标容器至名称 | **4px** | **4px** |
| 每级缩进 | 20px | 16px |
| 行高 | 28px | 28px |
| 根级左边距 | 8px | 8px |

24px 缩进是对照方案。标准与紧凑模式属于待验证的设计建议。原来的 14px 字号 / 16px 图标 / 6px 图文间距是独立的基础参考，不应误覆盖当前方案。

IDE 原型中的 Int UI Kit 原始文件图形为 16px，居中放入 20px 容器。用户指定的 4px 是容器到名称的布局间距；图形墨迹到名称可能更宽。

以根节点 `d=0` 计算：`X = 8 + d × I + 20 + 4 + 20 + 4`。`d=4` 时标准模式 X=136px，紧凑模式 X=120px；名称空间增加 16px，不代表任务效率已经提高。

## 页面与文件

- 路由：`#overview`、`#compare`、`#solution`、`#lab`、`#ide`、`#type`、`#guidelines`、`#sources`。
- `index.html`：页面外壳、可见署名、返回研究分类。
- `data.js` / `app.js` / `styles.css`：研究数据、布局演示、实验与方案导出。
- `ide-preview.js` / `ide-preview.css`：完整 IDE 交互效果。
- `assets/ide-standard.png`、`assets/ide-compact.png`：两档效果图。
- `assets/ij/manifest.json`：组件资源映射与来源。
- `README.md`、`RESEARCH.md`：独立阅读的说明与研究结论，均含署名。

Figma 来源为 Int UI Kit Community：文件 key `3q89XhaMGImDOPJwvfEpd7`。最初链接节点 `733:46971` 属于字体相关内容，IDE 参照节点为 Main Window `7070:138481`。节点和资源可能变化，使用前重新确认，不依赖临时下载地址。
