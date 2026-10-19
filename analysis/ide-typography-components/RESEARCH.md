# IDE 字号、行高与组件尺度研究

研究整理与方案设计：**钱佳丽**  
资料核对：2026-10-19 · v1.0  
研究对象：IntelliJ IDEA、VS Code、Cursor、TRAE、Xcode；Fleet 仅作历史参考。

## 1. 结论先行

以 IJ 的 UI 默认 13 与本次组件库 13/16 为基准，先建立**文字字号、文字行高、组件高度**三套独立 token，再按任务组合。按钮与输入框在本库中可见高度 28、圆角 4，外层高度 40；表格行高 24；弹窗圆角 8。这些值有具体组件边界，不能统称“IDE 行高”。

建议保留标准密度，并给中文混排、长说明等任务提供 14/20 的可读方案；16/24 作为可选大字方案。容器与控件同步放大，保留垂直余量。该建议基于几何与阅读任务推断，**尚未做用户效率实验**，不宣称“最优”或给出效率增幅。

## 2. 口径与证据范围

- 官方规范：描述产品设计方向，不等于每个版本每个位置的实测值。
- Figma 组件：直接读取用户指定 Int UI Kit Community 的节点、结构、尺寸、样式和截图。库的当前内容未提供可追溯发布版本号，记录读取日期与节点，不冒称 IDEA 2026.2 的逐项实现。
- 源码：VS Code 固定提交 `f9444d6d3ce7a745125e1d864b3fc6dfe02a9656`（2026-10-19 主线快照），不是安装稳定版。计算值显式标注。
- 本机实测：本轮未安装和采集五款产品。因此 Cursor、TRAE、Xcode 的未确认数值保留待测；不借 VS Code 补造其默认值。
- 单位：本库设计逻辑单位在网页以 CSS px 实现；原生设置中的 pt 与截图物理像素保留原口径，不未经校准直接换算。设备倍率、UI 缩放、字体回退都会影响实际显示。

## 3. 产品对照

| 产品 | UI 字号 | UI 文字行高 | 编辑器 | 行容器 | 按钮 / 圆角 | 证据 |
|---|---|---|---|---|---|---|
| IntelliJ IDEA | 13（官方默认） | 16px（本库 UI） | 字号可配；1.2 行高因子 | 24px（本库表格） | 28px / R4（本库） | S01, S02, S03, S04 |
| VS Code | 13px（workbench 基础） | 18.2px（13 × 1.4） | macOS 12/18；Win/Linux 14/19 px | 22px（Explorer） | 26px¹ / R4（基础按钮） | S05, S06, S07 |
| Cursor | 待测 | 待测 | 编辑器 / 终端分别可配 | 待测 | 待测 | S08 |
| TRAE | 待测 | 待测 | Editor 设置可调整 | 待测 | 待测 | S09 |
| Xcode | 待测；macOS 参考 13pt | 待测 | Code / Prose / Console 分开配置 | 待测 | 待测 | S10, S11 |

### IntelliJ IDEA

官方字号文档、本次 Community 库及实际运行版本不是同一证据层。UI 默认 13 与库中 13/16 相符；编辑器参数不能套到菜单、表格。库的尺寸以设计逻辑单位记录，网页按 CSS px 实现。

### VS Code

取 2026-10-19 主线提交 f9444d6，而非某个已安装稳定版。18.2px 仅为 workbench 继承样式的计算值；具体控件有覆盖。¹26px=16+4×2+1×2，来自基础按钮样式，不代表所有按钮。编辑器取默认选项、EditorZoom=0。

### Cursor

官方文档可确认字体可配置，未给出可靠默认值。Agents Window 与 IDE 要分开采样。共享生态和相似外观不能证明其尺寸等于 VS Code。

### TRAE

官方文档可确认主题、字体、window 等设置入口，未公布尺寸。需分别采集编辑区、导航区及 AI 对话区；导入 VS Code / Cursor 设置后不应再叫“出厂默认值”。

### Xcode

13pt 来自 Apple 平台指南，不是 Xcode 实测。原生 pt、网页 CSS px、截图物理像素不直接混比；同一显示器与缩放条件下再采集。

### Fleet 的处理

Fleet 已于 2025-12-22 停止下载；官方文章在 2026 年 5 月补充其演进为 Air。因此只保留历史背景，不加入当前产品尺寸比较。[S12]

### 从对照中可以得出的判断

1. **13 是有依据的起点，不是全行业统一值。** IJ 官方与 VS Code 基础样式提供支持；其他产品数据不足，不做精确排名。
2. **同字号不代表同密度。** 文本行框与列表行高不同；源码继承值可能被组件覆盖。VS 的 18.2px 不能直接作为所有侧栏条目的文字行高。
3. **编辑器有独立逻辑。** VS 默认行高由平台因子与字体大小计算；IJ 文档描述可配置因子。两者的单位与算法不同，不把倍数直接比较为谁更疏或更紧。
4. **设置可迁移性降低“默认值”可比性。** Cursor、TRAE 支持调整字体；导入用户配置或改变 UI 缩放后，采样必须记录状态。

## 4. IJ 组件拆解

| 组件 | 字号 / 文字行高 | 可见大小 | 外层高度或大小 | 圆角 | 节点 |
|---|---|---|---|---|---|
| Primary button | 13 / 16 | 28 | 40 | 4 | 146:52068 |
| Secondary button | 13 / 16 | 28 | 40 | 4 | 146:52058 |
| Input | 13 / 16 | 28 | 40 | 4 | 7399:46819 |
| Checkbox | 13 / 16 | 16 × 16 | 32 | 3² | 3590:81640 |
| Tabs | 13 / 16 | 41 | 41 | 2³ | 5664:81616 |
| Table row | 13 / 16 | 24 | 24 | 0 | 7278:46644 |
| Dialog | 13 / 16 | 883 × 495 | 883 × 495 | 8 | 7070:146270 |

- **Primary button**：最小标签宽 48，左右 padding 12；外层上下各 6。
- **Secondary button**：描边 1；用内描边保留固定高度，避免状态切换引起位移。
- **Input**：默认宽 224；文字距左 9；Focus 节点 7399:46991，蓝色 2px 内描边。
- **Checkbox**：图文间距 8，外层上下各 8；²3px 为 unchecked 3590:81636 边框，checked 使用原 SVG。
- **Tabs**：Selected 顶部 12、底部 10、指示条高 3；³仅指示条圆角，不是整个页签。
- **Table row**：单行表格行高 24、左右 padding 8；本报告长文本表格为换行扩展，非原尺寸样本。
- **Dialog**：此样本尺寸，非所有弹窗固定尺寸；标题区 33、底栏 57、描边 0.5、阴影 0 8 40 / 30%。

### 40 / 28 / 16 的关系

主按钮默认外层高度 `40 = 6 + 28 + 6`；可见控件高度 28，其中 16px 文字行框与上下空间共同组成内容。字号 13 不等于可见字形高度。Figma 外层用于布局，不能在未测命中行为时直接叫作“40px 点击热区”。网页示例的实际按钮元素为 28px，外层 wrapper 为 40px。

### 圆角的使用原则

- 按钮、输入框：R4，保持密集表单的一致边界。
- 弹窗：R8，用在较大的独立表面。
- 复选框：未选中边框 R3；选中状态直接复用原 SVG。
- 页签：R2 仅是 3px 高指示条的圆角，不是整个页签。
- 表格行：无统一圆角需求；不要为了“统一 R8”把每个行项做成卡片。

本库不是唯一规范。若用户指定产品版本的实现与 Community 库不同，以该产品实测为另一条证据保留，不强行平均。

### 与仓库既有 token 的差异

仓库 `deveco-intui-kit/src/tokens.css` 的 H1 为 20/24、段落为 13/18、代码为 13/22，属于已有实现记录；当前 JetBrains Typography 页面 H1 为默认 +5（默认13时为18）。本研究采用 18px 阅读标题和已读组件的 13/16，不将旧实现值、官方文档和本次库节点混称一套版本。研究正文 13/22 与统计大数字属于报告排版扩展，不冒充库内 UI 字号阶梯。

## 5. 可执行方案

| 方案 | UI 字号 / 行高 | 列表行高 | 按钮 / 输入高度 | 基础圆角 | 336px 列表完整行数 |
|---|---|---|---|---|---|
| IJ 标准 | 13 / 16 | 24 | 28 | 4 | 14 |
| 可读方案（建议） | 14 / 20 | 28 | 32 | 4 | 12 |
| 大字方案（建议） | 16 / 24 | 32 | 36 | 4 | 10，余16px |

计算：`完整行数 = floor(336 / 行容器高度)`，不计标题栏与工具栏，它们在该固定视口之外。与标准方案相比，可读方案完整行数少 2，大字方案少 4。这只说明几何容量，不能证明任务完成时间变快或变慢。

默认提供 IJ 标准供密集工作台使用；长中文说明优先通过段落行高与内容区宽度改善，而不是让所有菜单和图标一起缩放。对有更大字号需求的用户，提供可记忆的阅读密度设置；焦点、溢出、省略和键盘操作也要同步验证。

### 延续之前的文件树方案

用户已确认的 20px 箭头容器、20px 文件图标容器、16px 文件名、4px 图文间距保留为**项目参数**。若继续使用 28px 文件行高，建议验证 20px 文字行框，上下余量各 4px。它服务目录扫描任务；本次 16/24、32px 行高的大字通用方案服务更舒展的设置列表，两者不互相覆盖。

## 6. 页面还原与交付

研究网站使用指定 Int UI Kit 的 Button、Input、Checkbox、Tabs、Table 和 Dialog 结构与样式，以原生 HTML/CSS/JS 实现可复用组件；不是 Figma 实例或官方发布的 Web 组件包。

弹窗原样本外框为 883×495、R8，保留 33px 标题区、57px 底栏及原图标资源。中间 Appearance 设置内容为本研究组合。基准状态 13/16、24px 预览行、28px 控件，尺寸调整后明确成为“方案参数”。页面不是原生 IntelliJ 截图，也不拿它反证竞品尺寸。

Inter 字体本地提供并保留 SIL OFL 许可；中文回退到 PingFang SC / Microsoft YaHei / 系统 sans-serif，字形可能随系统变化。原 SVG 按固有尺寸使用，没有重绘替代。组件节点、资源、变体、扩展详见 `component-map.json`。

网页提供：产品筛选与口径展开、组件交互状态、尺寸边界开关、三档密度与自定义参数、当前 CSS 导出、设置弹窗、CSV / Markdown / JSON 下载。界面图 `assets/settings-preview.png` 来自最终浏览器页面。

## 7. 下一轮验证与限制

1. 安装目标版本，记录构建号、OS、主题、系统倍率、UI / 编辑器缩放、字体与导入配置状态。
2. 固定中英文样本、长文件名与相同视口，分别采 UI、编辑器、终端、AI 区。
3. 原生应用用可核对的属性与标定截图测量；浏览器计算样式只证明本研究实现，不等于竞品实测。
4. 对 13/16、14/20、16/24 进行任务验证：定位设置、阅读说明、选择条目；记录截断、误点、定位时间与主观舒适度。未开展的实验不写成已证实结论。

## 8. 来源

- **S01 · 官方规范** — [JetBrains · Typography](https://plugins.jetbrains.com/docs/intellij/typography.html)。UI 使用 Inter；默认 13；H1 为默认 +5、H2 为默认 +3；提示为默认 −1。文档日期 2025-11-06。
- **S02 · Figma 组件** — [Int UI Kit · 按钮 / 输入框](https://www.figma.com/design/3q89XhaMGImDOPJwvfEpd7/Int-UI-Kit--Community-?node-id=146-52068)。Light / Active：文字 13/16；主按钮可见高 28、外层高 40、圆角 4。输入框 7399:46819 为 224 × 40，内容 224 × 28。
- **S03 · Figma 组件** — [Int UI Kit · 复选框 / 页签 / 表格 / 弹窗](https://www.figma.com/design/3q89XhaMGImDOPJwvfEpd7/Int-UI-Kit--Community-?node-id=7070-146270)。逐节点读取尺寸与截图；复选框 3590:81636、3590:81640；页签 5664:81616；表格 7278:46644；弹窗 7070:146270。
- **S04 · 官方设置** — [IntelliJ IDEA 2026.2 · Editor Font](https://www.jetbrains.com/help/idea/settings-editor-font.html)。编辑器字号用 points；默认行高因子为 1.2，可调整。文档日期 2026-08-17。未据此推算 UI 行高。
- **S05 · 固定源码** — [VS Code · workbench 基础样式](https://github.com/microsoft/vscode/blob/f9444d6d3ce7a745125e1d864b3fc6dfe02a9656/src/vs/workbench/browser/media/style.css#L48)。主线快照 f9444d6，2026-10-19。基础字号 13px、行高 1.4em；组件可覆盖。
- **S06 · 固定源码** — [VS Code · editor fontInfo](https://github.com/microsoft/vscode/blob/f9444d6d3ce7a745125e1d864b3fc6dfe02a9656/src/vs/editor/common/config/fontInfo.ts#L14)。默认字号 macOS 12 / Windows 与 Linux 14；默认 lineHeight=0 时按 macOS 1.5、其他平台 1.35 计算并四舍五入。EditorZoom=0 时分别为 18px、19px。
- **S07 · 固定源码** — [VS Code · Button / Input / Explorer](https://github.com/microsoft/vscode/blob/f9444d6d3ce7a745125e1d864b3fc6dfe02a9656/src/vs/base/browser/ui/button/button.css#L6)。基础文字按钮 12/16，padding 4px 8px，border 1px、radius 4px；单行总高据此算得 26px。explorerViewer.ts 中 ITEM_HEIGHT=22。Input 基类 radius=4，无统一固定高度。
- **S08 · 官方设置** — [Cursor · Themes and appearance](https://cursor.com/help/customization/themes)。编辑器与终端字号可分别调节；IDE 与 Agents Window 的入口有区别。该页未公布组件尺寸与默认字体数值。
- **S09 · 官方设置** — [TRAE · IDE 设置总览](https://docs.trae.cn/ide_ide-settings)。提供主题和 Editor 字体、word-wrap、window 等参数设置。该页未给出默认字号、行高、圆角。
- **S10 · 官方设置** — [Apple · Xcode workspace themes](https://developer.apple.com/documentation/xcode/customizing-your-workspace-using-themes)。Code / Prose / Console 字体可分别配置，并可覆盖个别文本类型；页面未给出统一默认字号。已读取官方 DocC JSON 正文。
- **S11 · 平台参考** — [Apple HIG · Typography](https://developer.apple.com/design/human-interface-guidelines/typography)。macOS 平台默认字号参考为 13pt；不是对 Xcode 导航器或控件的测量。已读取官方 DocC JSON 正文。
- **S12 · 历史状态** — [JetBrains · The Future of Fleet](https://blog.jetbrains.com/fleet/2025/12/the-future-of-fleet/)。Fleet 自 2025-12-22 起停止下载；文章 2026 年 5 月补充 Fleet 演进为 Air。本研究仅保留历史上下文。

补充源码定位：

- [VS Code inputBox.css](https://github.com/microsoft/vscode/blob/f9444d6d3ce7a745125e1d864b3fc6dfe02a9656/src/vs/base/browser/ui/inputbox/inputBox.css)
- [VS Code explorerViewer.ts](https://github.com/microsoft/vscode/blob/f9444d6d3ce7a745125e1d864b3fc6dfe02a9656/src/vs/workbench/contrib/files/browser/views/explorerViewer.ts#L77)
- [Int UI Kit 输入框](https://www.figma.com/design/3q89XhaMGImDOPJwvfEpd7/Int-UI-Kit--Community-?node-id=7399-46819)

组件与原始产品材料归各自作者；本次研究整理、比较与建议署名钱佳丽。此署名不改变既有仓库材料及组件的作者归属。
