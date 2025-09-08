# 如何添加翻译指南

本文档详细说明如何为 n8n 中文汉化脚本添加新的翻译，从发现页面元素到添加翻译的完整流程。

## 📋 目录

- [1. 发现需要翻译的元素](#1-发现需要翻译的元素)
- [2. 识别文本内容](#2-识别文本内容)
- [3. 添加翻译到脚本](#3-添加翻译到脚本)
- [4. 处理特殊情况](#4-处理特殊情况)
- [5. 测试新翻译](#5-测试新翻译)
- [6. 实用工具和技巧](#6-实用工具和技巧)
- [7. 完整示例](#7-完整示例)
- [8. 最佳实践](#8-最佳实践)

## 1. 发现需要翻译的元素

### 方法 A：使用浏览器开发者工具

1. 打开 n8n (http://localhost:5678)
2. 按 `F12` 打开开发者工具
3. 点击"元素选择器"图标（或按 `Ctrl+Shift+C` / `Cmd+Shift+C`）
4. 鼠标悬停在需要翻译的文本上
5. 点击该元素，在开发者工具中会高亮显示

### 方法 B：启用调试模式

编辑脚本文件，将 debug 设置为 true：

```javascript
// 在脚本第23行
const config = {
  debug: true, // 开启调试模式，控制台会显示所有翻译尝试
  translateDelay: 500,
  retranslateInterval: 2000,
  enableFloatingButton: true,
};
```

开启后，浏览器控制台会显示：

- ✅ 成功翻译的文本
- ❌ 未找到翻译的文本
- 🔄 翻译过程的详细信息

## 2. 识别文本内容

### 需要检查的内容类型

#### 2.1 普通文本元素

```html
<button>Create Workflow</button>
<span>Active</span>
<div>Settings</div>
```

#### 2.2 输入框占位符

```html
<input placeholder="Search workflows...">
<textarea placeholder="Enter description">
```

#### 2.3 提示和标题

```html
<div title="Click to execute">
  <button aria-label="Delete workflow">
    <span data-tooltip="Save changes"></span>
  </button>
</div>
```

#### 2.4 动态生成的内容

```javascript
// 这类内容通过 JavaScript 动态插入
element.textContent = "Workflow saved";
element.innerHTML = `<span>Executing ${count} nodes</span>`;
```

### 使用开发者工具检查

在控制台中运行以下命令查看元素详情：

```javascript
// 获取选中元素的所有文本相关属性
function inspectElement(element) {
  console.log({
    innerText: element.innerText,
    textContent: element.textContent,
    placeholder: element.placeholder,
    title: element.title,
    ariaLabel: element.getAttribute("aria-label"),
    dataTooltip: element.getAttribute("data-tooltip"),
    value: element.value,
  });
}

// 使用方法：
// 1. 在控制台输入 $0 获取当前选中的元素
// 2. 运行 inspectElement($0)
```

## 3. 添加翻译到脚本

### 3.1 基本翻译格式

打开 `n8n-chinese-advanced.user.js`，找到 `translations` 对象（约第 30 行）：

```javascript
const translations = {
  // 格式：'英文原文': '中文翻译',
  Workflows: "工作流",
  Settings: "设置",
  // ... 更多翻译
};
```

### 3.2 按类别组织翻译

将相关的翻译放在一起，使用注释分组：

```javascript
const translations = {
  // ===== 主导航 =====
  Workflows: "工作流",
  Credentials: "凭据",
  Executions: "执行记录",

  // ===== 工作流操作 =====
  "Create new workflow": "创建新工作流",
  Save: "保存",
  Execute: "执行",

  // ===== 节点相关 =====
  "Add node": "添加节点",
  "Configure node": "配置节点",
  "Delete node": "删除节点",

  // ===== 你的新翻译 =====
  "New Feature": "新功能",
  "Custom Action": "自定义操作",
};
```

### 3.3 添加新类别

如果现有类别不适合，创建新的分类：

```javascript
const translations = {
  // ... 现有翻译

  // ===== 数据库节点 =====
  Database: "数据库",
  Query: "查询",
  Insert: "插入",
  Update: "更新",
  "Delete Record": "删除记录",
  "Connection String": "连接字符串",
  "Table Name": "表名",
  Column: "列",
  "Primary Key": "主键",
};
```

## 4. 处理特殊情况

### 4.1 包含变量的动态文本

对于包含数字、名称等变量的文本，使用正则表达式：

```javascript
// 找到 regexTranslations 数组（约第580行）
const regexTranslations = [
  // 已有的规则...

  // 添加新规则
  {
    pattern: /Executing workflow "(.+)"/gi,
    replacement: '正在执行工作流 "$1"',
  },
  {
    pattern: /Connected to (.+)/gi,
    replacement: "已连接到 $1",
  },
  {
    pattern: /(\d+) seconds? ago/gi,
    replacement: "$1 秒前",
  },
  {
    pattern: /(\d+) minutes? ago/gi,
    replacement: "$1 分钟前",
  },
  {
    pattern: /Loading (\d+) of (\d+)/gi,
    replacement: "正在加载 $1 / $2",
  },
];
```

### 4.2 上下文相关的翻译

同一个词在不同场景可能需要不同翻译：

```javascript
const translations = {
  // 通用翻译
  Run: "运行",

  // 特定上下文的翻译（更具体的优先级更高）
  "Test Run": "测试运行",
  "Run History": "运行历史",
  "Run Now": "立即运行",
  "Run Every": "运行间隔",

  // Status 在不同上下文
  Status: "状态",
  "Connection Status": "连接状态",
  "Execution Status": "执行状态",
};
```

### 4.3 复合短语

对于由多个词组成的短语：

```javascript
const translations = {
  // 先翻译单个词
  Save: "保存",
  Template: "模板",
  Workflow: "工作流",

  // 再翻译组合
  "Save as Template": "另存为模板",
  "Save Workflow": "保存工作流",
  "Template Gallery": "模板库",
};
```

### 4.4 避免翻译的内容

某些技术术语或品牌名不应翻译：

```javascript
// 这些内容保持原样，不添加到翻译字典中：
// - API
// - JSON
// - URL
// - HTTP/HTTPS
// - OAuth
// - n8n
// - JavaScript
// - SQL
```

## 5. 测试新翻译

### 5.1 基本测试流程

1. **保存脚本文件**
2. **刷新 n8n 页面**（`F5` 或 `Ctrl+R`）
3. **导航到包含新翻译的页面**
4. **验证翻译效果**

### 5.2 使用控制台测试

在浏览器控制台中测试翻译函数：

```javascript
// 测试单个翻译
translateText("Your English Text");

// 批量测试
const testTexts = ["Create Workflow", "Save as Template", "Executing 5 nodes"];
testTexts.forEach((text) => {
  console.log(`"${text}" → "${translateText(text)}"`);
});
```

### 5.3 检查翻译覆盖率

```javascript
// 查找页面上所有未翻译的英文文本
function findUntranslatedText() {
  const untranslated = [];
  document.querySelectorAll("*").forEach((el) => {
    const text = (el.innerText || el.textContent || "").trim();
    if (text && /^[A-Za-z\s]+$/.test(text) && text.length > 2) {
      if (!translations[text]) {
        untranslated.push(text);
      }
    }
  });
  return [...new Set(untranslated)].sort();
}

console.table(findUntranslatedText());
```

## 6. 实用工具和技巧

### 6.1 批量提取需要翻译的文本

```javascript
// 在 n8n 页面的控制台运行此脚本
function extractAllTexts() {
  const texts = new Set();

  // 提取元素文本
  document.querySelectorAll("*").forEach((el) => {
    // 只获取直接文本节点
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
      const text = el.textContent.trim();
      if (text && /[A-Za-z]/.test(text) && text.length > 1) {
        texts.add(text);
      }
    }
  });

  // 提取属性值
  document
    .querySelectorAll("[placeholder], [title], [aria-label], [data-tooltip]")
    .forEach((el) => {
      ["placeholder", "title", "aria-label", "data-tooltip"].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (value && /[A-Za-z]/.test(value)) {
          texts.add(value);
        }
      });
    });

  // 按字母顺序排序并输出
  const sorted = Array.from(texts).sort();

  // 生成翻译字典格式
  const dictFormat = sorted.map((text) => `'${text}': '${text}',`).join("\n");

  console.log("=== 找到的文本 ===");
  console.log(sorted);
  console.log("\n=== 字典格式 ===");
  console.log(dictFormat);

  return sorted;
}

extractAllTexts();
```

### 6.2 快速定位元素

```javascript
// 高亮显示所有包含特定文本的元素
function highlightText(searchText) {
  document.querySelectorAll("*").forEach((el) => {
    if (el.textContent && el.textContent.includes(searchText)) {
      el.style.border = "2px solid red";
      el.style.backgroundColor = "yellow";
    }
  });
}

// 使用示例
highlightText("Workflow");
```

### 6.3 监控翻译效果

```javascript
// 实时监控页面变化和翻译情况
function monitorTranslations() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text && /^[A-Za-z\s]+$/.test(text)) {
              console.log("新增文本:", text);
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("开始监控页面文本变化...");
  return observer;
}

// 启动监控
const monitor = monitorTranslations();

// 停止监控
// monitor.disconnect();
```

## 7. 完整示例

### 示例：添加数据库节点的翻译

#### 步骤 1：发现需要翻译的元素

1. 在 n8n 中添加一个 MySQL 节点
2. 打开开发者工具
3. 发现以下未翻译的文本：
   - "Database"
   - "Operation"
   - "Execute Query"
   - "Insert"
   - "Update"
   - "Delete"

#### 步骤 2：检查文本位置

```javascript
// 在控制台确认文本
document.querySelectorAll("*").forEach((el) => {
  if (el.textContent === "Execute Query") {
    console.log("找到元素:", el);
    console.log("标签名:", el.tagName);
    console.log("类名:", el.className);
  }
});
```

#### 步骤 3：添加到翻译字典

```javascript
const translations = {
  // ... 现有翻译

  // ===== MySQL 节点 =====
  MySQL: "MySQL", // 保持原样
  Database: "数据库",
  "Execute Query": "执行查询",
  Insert: "插入",
  Update: "更新",
  Delete: "删除",
  Select: "查询",
  Table: "表",
  Column: "列",
  Where: "条件",
  "Order By": "排序",
  Limit: "限制",
  Query: "查询语句",
  "Query Parameters": "查询参数",
  Connection: "连接",
  Host: "主机",
  Port: "端口",
  "Database Name": "数据库名",
  Username: "用户名",
  Password: "密码",
  SSL: "SSL",
  "Use SSL": "使用 SSL",

  // ... 更多翻译
};
```

#### 步骤 4：处理动态内容

```javascript
const regexTranslations = [
  // ... 现有规则

  // 数据库相关的动态文本
  {
    pattern: /Connected to database "(.+)"/gi,
    replacement: '已连接到数据库 "$1"',
  },
  {
    pattern: /(\d+) rows? affected/gi,
    replacement: "影响了 $1 行",
  },
  {
    pattern: /Query executed in (\d+)ms/gi,
    replacement: "查询耗时 $1 毫秒",
  },
];
```

#### 步骤 5：测试

1. 保存脚本
2. 刷新 n8n 页面
3. 重新打开 MySQL 节点
4. 验证所有文本都已翻译

## 8. 最佳实践

### 8.1 翻译原则

1. **保持一致性**：相同的英文术语使用相同的中文翻译
2. **简洁明了**：使用常见、易懂的中文表达
3. **保留专业术语**：某些技术术语（如 API、JSON）保持英文
4. **考虑上下文**：根据具体使用场景选择合适的翻译
5. **避免直译**：优先使用符合中文习惯的表达

### 8.2 代码组织

1. **分类管理**：将相关翻译放在一起
2. **添加注释**：为特殊翻译添加说明
3. **保持顺序**：按字母顺序或功能分组排列
4. **定期清理**：删除不再使用的翻译

### 8.3 版本管理

```javascript
// 更新版本号
// @version      2.0.1

// 在文件顶部添加更新日志
/*
 * 更新日志：
 * v2.0.1 (2024-01-15)
 * - 添加 MySQL 节点翻译
 * - 修复时间显示翻译
 * - 优化动态文本匹配
 *
 * v2.0.0 (2024-01-10)
 * - 初始版本
 */
```

### 8.4 测试清单

- [ ] 基本界面元素正确显示
- [ ] 动态加载内容能够翻译
- [ ] 不影响 n8n 功能操作
- [ ] 代码编辑器不被翻译
- [ ] 翻译后文本不会重复翻译
- [ ] 浮动按钮正常工作（如果启用）
- [ ] 性能没有明显下降

### 8.5 常见问题解决

#### 问题：某些文本没有被翻译

**解决方案**：

1. 检查是否是动态加载的内容
2. 增加 `retranslateInterval` 的时间
3. 检查文本是否包含特殊字符
4. 使用调试模式查看具体原因

#### 问题：翻译影响了功能

**解决方案**：

1. 检查是否翻译了不该翻译的内容（如代码、变量名）
2. 在 `translateElement` 函数中添加排除规则
3. 使用更精确的选择器

#### 问题：页面加载变慢

**解决方案**：

1. 增加 `translateDelay` 的值
2. 减少 `retranslateInterval` 的频率
3. 优化翻译查找算法
4. 使用缓存机制避免重复翻译

## 贡献指南

如果你添加了新的翻译，欢迎：

1. Fork 项目仓库
2. 创建新分支：`git checkout -b add-translations`
3. 提交更改：`git commit -m "Add translations for XXX"`
4. 推送分支：`git push origin add-translations`
5. 提交 Pull Request

请在 PR 中说明：

- 添加了哪些翻译
- 测试了哪些场景
- 是否有特殊处理

## 联系方式

如有问题或建议，请：

- 提交 Issue：https://github.com/samzong/n8n-chinese/issues
- 发送邮件：[你的邮箱]
- 加入讨论组：[讨论组链接]

---

_本指南会持续更新，欢迎贡献更多实用技巧！_
