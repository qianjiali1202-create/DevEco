# IDE Typography & Components

研究整理与方案设计：钱佳丽 · 2026-10-19

- [交互研究](index.html)：结论、5 款 IDE 对照、IJ 组件拆解、密度实验、设置页面还原。
- [完整研究](RESEARCH.md) / [对照 CSV](comparison.csv) / [证据 JSON](sources.json)
- [组件来源与扩展](component-map.json)
- [设置界面图](assets/settings-preview.png) / [研究概览图](assets/overview.png)

静态 HTML/CSS/JS，无构建、无后端。以 DevEco 仓库根目录启动静态服务，打开 `analysis/ide-typography-components/`；也可双击 index.html。跨研究与返回门户链接依赖原仓库相对目录。

Figma 文件为用户指定的 Int UI Kit Community；组件是读取节点后的代码实现。源码值、规范值、推导值和建议分开呈现。Cursor、TRAE、Xcode 的未验证尺寸明确待测；Fleet 仅作历史背景。

`data.js` 与 `sources.json` 保存同一组研究数据；修改结论时同步 RESEARCH.md、CSV、摘要、导出与截图。新增组件须读取真实节点并更新 component-map.json。

本页默认 Light。Inter 使用官方 OFL 许可，见 assets/Inter-LICENSE.txt；中文使用系统回退。组件原资源和产品资料的来源保留，研究署名不覆盖其作者归属。
