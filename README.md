# n8n 汉化脚本

一个高性能的 n8n 工作流自动化平台中文汉化脚本。

> [!NOTE]
> 💡 灵感来自于 [maboloshi/github-chinese](https://github.com/maboloshi/github-chinese)，如果你也需要汉化 Github ，推荐使用。

## ✨ 功能特点

- 🚀 **极致性能优化** - 多级缓存系统，批量处理，智能防抖
- 📝 **完整翻译覆盖** - 560+ 翻译词条，涵盖所有主要功能
- 🔄 **智能正则匹配** - 支持动态文本、时间、数量等复杂模式
- 💾 **高效缓存机制** - Map/WeakMap/WeakSet 三级缓存，自动清理
- 🎯 **精准元素定位** - 智能跳过代码编辑器，避免误翻译
- ⚡ **实时动态翻译** - 支持 SPA 路由切换，动态内容加载

## 安装方法

### 方法一：使用 Tampermonkey（推荐）

1. 安装 Tampermonkey 浏览器扩展

   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. 打开 `n8n-chinese.user.js` 文件

3. 点击 Tampermonkey 的"安装"按钮

4. 访问你的 n8n 实例 (http://localhost:5678)，脚本将自动运行

### 方法二：使用 Greasemonkey（Firefox）

1. 安装 [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)

2. 打开 `n8n-chinese.user.js` 文件

3. 按照 Greasemonkey 的提示安装脚本

### 方法三：直接在浏览器控制台运行

1. 打开 n8n 页面 (http://localhost:5678)

2. 按 F12 打开开发者工具

3. 切换到控制台（Console）标签

4. 复制 `n8n-chinese.user.js` 中的代码（去掉用户脚本头部注释）

5. 粘贴到控制台并按回车执行

## 支持的 n8n 地址

脚本默认支持以下地址：

- http://localhost:5678
- https://localhost:5678
- http://127.0.0.1:5678
- https://127.0.0.1:5678
- http://_.n8n.io/_
- https://_.n8n.io/_

如需支持其他地址，请编辑脚本头部的 `@match` 规则。

## 自定义翻译

如需添加或修改翻译，编辑 `n8n-chinese.user.js` 文件中的 `translations` 对象：

```javascript
const translations = {
  "English Text": "中文翻译",
  // 添加更多翻译...
};
```

## 📚 已翻译内容

### 核心功能

- **工作流管理** - 创建、保存、执行、导入导出等
- **节点操作** - 100+ 节点类型翻译（HTTP、数据库、文件等）
- **凭据管理** - OAuth2、API Key、数据库连接等
- **执行记录** - 状态、时间、错误信息等

### 界面元素

- **主导航** - 工作流、凭据、执行记录、模板、设置等
- **编辑器** - 参数配置、表达式、数据预览等
- **数据面板** - 输入/输出数据、JSON/表格视图等
- **设置页面** - 用户管理、环境变量、API 设置等

### 动态内容

- **时间显示** - "3 分钟前"、"昨天"等相对时间
- **数量统计** - "5 个工作流"、"10 次执行"等
- **状态信息** - 成功、失败、运行中等各种状态
- **分页信息** - "第 1 页，共 5 页"等

## ⚙️ 性能优化

- **批量处理** - 每批处理 50 个元素，避免阻塞主线程
- **智能缓存** - 最多缓存 10,000 个翻译结果，自动清理
- **防抖处理** - 100ms 延迟，减少无效翻译
- **增量更新** - 只翻译新增或修改的元素

## 📝 注意事项

- 不会翻译代码编辑器中的内容
- 不影响 n8n 的任何功能和数据
- 首次加载可能需要 1-2 秒完成全部翻译

## 贡献

欢迎提交 Issue 或 Pull Request 来改进翻译内容。

## 许可证

MIT License
