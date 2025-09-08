// ==UserScript==
// @name         n8n-trans
// @namespace    https://github.com/samzong/n8n-trans
// @version      1.0.0
// @description  n8n workflow automation platform internationalization
// @author       samzong
// @match        http://localhost:5678/*
// @match        https://localhost:5678/*
// @match        http://127.0.0.1:5678/*
// @match        https://127.0.0.1:5678/*
// @match        http://*.n8n.io/*
// @match        https://*.n8n.io/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  // Performance optimized configuration
  const config = {
    translateDelay: 100, // Reduced delay for faster response
    retranslateInterval: 3000, // Check less frequently for better performance
    batchSize: 50, // Process elements in batches
    cacheSize: 10000, // Maximum cache entries
  };

  // Extended translation dictionary with all entries from both versions
  const translations = {
    // Main UI
    Workflows: "工作流",
    Credentials: "凭据",
    Executions: "执行记录",
    Templates: "模板",
    Settings: "设置",
    Help: "帮助",
    Documentation: "文档",
    Forum: "论坛",
    Examples: "示例",
    "About n8n": "关于 n8n",
    "Sign out": "登出",
    "Sign in": "登录",
    Register: "注册",

    // Workflow management
    "Create new workflow": "创建新工作流",
    "New Workflow": "新建工作流",
    "Open Workflow": "打开工作流",
    Save: "保存",
    "Save As": "另存为",
    Rename: "重命名",
    "Execute Workflow": "执行工作流",
    Execute: "执行",
    "Test Workflow": "测试工作流",
    "Stop Execution": "停止执行",
    Stop: "停止",
    Executing: "执行中",
    "Execution finished": "执行完成",
    "Waiting for webhook call": "等待 Webhook 调用",
    Active: "已激活",
    Inactive: "未激活",
    Activate: "激活",
    Deactivate: "停用",
    Delete: "删除",
    Duplicate: "复制",
    Download: "下载",
    "Import from URL": "从 URL 导入",
    "Import from File": "从文件导入",
    Import: "导入",
    Export: "导出",
    Share: "分享",
    Move: "移动",
    Pin: "固定",
    Unpin: "取消固定",

    // Node operations
    "Add node": "添加节点",
    "Add first step": "添加第一步",
    "On clicking 'Execute Workflow'": '点击"执行工作流"时',
    "When called by another workflow": "被其他工作流调用时",
    "At specified intervals": "按指定间隔",
    "On a schedule": "按计划",
    "On webhook call": "Webhook 调用时",
    "Search nodes...": "搜索节点...",
    "Search...": "搜索...",
    Regular: "常规",
    Trigger: "触发器",
    "Schedule Trigger": "计划触发器",
    Webhook: "Webhook",
    "Manual Trigger": "手动触发器",
    Cron: "Cron 定时器",
    Interval: "间隔",
    All: "全部",
    "Core Nodes": "核心节点",
    "Custom Nodes": "自定义节点",
    Recommended: "推荐",
    Communication: "通信",
    "Data Transformation": "数据转换",
    Flow: "流程控制",
    Files: "文件",
    Development: "开发",
    Utility: "实用工具",
    "Marketing & Content": "营销与内容",
    Miscellaneous: "其他",
    Analytics: "分析",
    "App Nodes": "应用节点",
    "Recently used": "最近使用",
    Actions: "操作",

    // Common nodes
    Start: "开始",
    Set: "设置",
    IF: "条件判断",
    Switch: "分支",
    Merge: "合并",
    Function: "函数",
    "Function Item": "函数项",
    Code: "代码",
    "HTTP Request": "HTTP 请求",
    Email: "邮件",
    "Send Email": "发送邮件",
    "Read Email": "读取邮件",
    Wait: "等待",
    "Split In Batches": "分批处理",
    "Loop Over Items": "循环处理",
    "Spreadsheet File": "电子表格文件",
    "Read Binary Files": "读取二进制文件",
    "Write Binary File": "写入二进制文件",
    "Move Binary Data": "移动二进制数据",
    Compression: "压缩",
    Crypto: "加密",
    "Date & Time": "日期时间",
    "HTML Extract": "HTML 提取",
    "RSS Feed Read": "读取 RSS 源",
    XML: "XML",
    FTP: "FTP",
    SSH: "SSH",
    LDAP: "LDAP",
    Redis: "Redis",
    MongoDB: "MongoDB",
    MySQL: "MySQL",
    PostgreSQL: "PostgreSQL",
    GraphQL: "GraphQL",

    // Node configuration
    Parameters: "参数",
    Input: "输入",
    Output: "输出",
    Options: "选项",
    "Execute Once": "执行一次",
    "Retry On Fail": "失败时重试",
    "Continue On Fail": "失败时继续",
    Paused: "已暂停",
    "Always Output Data": "始终输出数据",
    Notes: "备注",
    "Display note in flow?": "在流程中显示备注？",
    "Node Color": "节点颜色",
    Timezone: "时区",
    Timeout: "超时",
    Retry: "重试",
    "Max Tries": "最大尝试次数",
    "Wait Between Tries": "重试间隔",
    "On Error": "出错时",
    Continue: "继续",
    "Stop Workflow": "停止工作流",
    Ignore: "忽略",

    // Common parameters
    Resource: "资源",
    Operation: "操作",
    Authentication: "认证",
    Method: "方法",
    URL: "URL",
    Headers: "请求头",
    "Header Parameters": "头部参数",
    "Query Parameters": "查询参数",
    "Query String": "查询字符串",
    "Body Parameters": "请求体参数",
    Body: "请求体",
    "Body Content Type": "请求体内容类型",
    "JSON/RAW Parameters": "JSON/原始参数",
    "Response Format": "响应格式",
    Response: "响应",
    Pagination: "分页",
    "Ignore SSL Issues": "忽略 SSL 问题",
    Redirects: "重定向",
    "Follow Redirects": "跟随重定向",
    "Follow All Redirects": "跟随所有重定向",

    // Fields and values
    Field: "字段",
    Fields: "字段",
    Name: "名称",
    Value: "值",
    Key: "键",
    Property: "属性",
    Properties: "属性",
    Description: "描述",
    Type: "类型",
    String: "字符串",
    Number: "数字",
    Boolean: "布尔值",
    Array: "数组",
    Object: "对象",
    Binary: "二进制",
    Date: "日期",
    Label: "标签",
    Default: "默认",
    Required: "必需",
    Optional: "可选",
    Custom: "自定义",
    Enabled: "已启用",
    Disabled: "已禁用",
    True: "真",
    False: "假",
    Yes: "是",
    No: "否",
    None: "无",
    Empty: "空",
    Null: "空值",
    Undefined: "未定义",

    // Data handling
    "Input Data": "输入数据",
    "Output Data": "输出数据",
    "Binary Data": "二进制数据",
    JSON: "JSON",
    Table: "表格",
    Schema: "模式",
    Items: "数据项",
    Item: "数据项",
    Runs: "运行",
    Expression: "表达式",
    Fixed: "固定值",
    "Add Expression": "添加表达式",
    "Edit Expression": "编辑表达式",
    Test: "测试",
    Result: "结果",
    Preview: "预览",
    "Current Node": "当前节点",
    "Input Panel": "输入面板",
    "Output Panel": "输出面板",
    Reference: "引用",
    "Variable Selector": "变量选择器",
    Resolvable: "可解析",
    "Not Resolvable": "无法解析",

    // Expressions
    Expressions: "表达式",
    Variables: "变量",
    "Node Output Data": "节点输出数据",
    "Incoming Data": "传入数据",
    Nodes: "节点",
    Root: "根",
    Parent: "父级",
    "Item Index": "项索引",
    "Run Index": "运行索引",
    Workflow: "工作流",
    Execution: "执行",
    Environment: "环境",
    Environments: "环境",
    "Custom Variables": "自定义变量",
    Random: "随机",
    Helpers: "辅助函数",

    // Execution
    "Execution ID": "执行 ID",
    "Workflow ID": "工作流 ID",
    Status: "状态",
    Mode: "模式",
    Started: "开始时间",
    Finished: "结束时间",
    Duration: "持续时间",
    "Started At": "开始于",
    "Finished At": "结束于",
    "Execution Time": "执行时间",
    "Total Time": "总时间",
    Success: "成功",
    Error: "错误",
    Failed: "失败",
    Running: "运行中",
    Waiting: "等待中",
    Canceled: "已取消",
    Crashed: "已崩溃",
    Unknown: "未知",
    Manual: "手动",
    "Manual execution": "手动执行",
    "Test run": "测试运行",
    "Retry execution": "重试执行",
    "Webhook call": "Webhook 调用",
    Integrated: "集成",
    CLI: "命令行",
    Internal: "内部",

    // Workflow execution messages
    "Workflow execution started": "工作流执行已开始",
    "Workflow execution finished": "工作流执行已完成",
    "Workflow execution failed": "工作流执行失败",
    "Workflow execution canceled": "工作流执行已取消",
    "Workflow activated": "工作流已激活",
    "Workflow deactivated": "工作流已停用",
    "Workflow saved": "工作流已保存",
    "Workflow deleted": "工作流已删除",
    "Workflow imported successfully": "工作流导入成功",
    "Workflow exported successfully": "工作流导出成功",
    "Workflow updated": "工作流已更新",
    "Workflow created": "工作流已创建",

    // Credentials
    "Create New": "新建",
    "New Credential": "新建凭据",
    "Credential type": "凭据类型",
    "Credential Data": "凭据数据",
    "Credential Name": "凭据名称",
    "Delete Credential": "删除凭据",
    "Credential deleted": "凭据已删除",
    "Credential created": "凭据已创建",
    "Credential updated": "凭据已更新",
    Connection: "连接",
    Connected: "已连接",
    "Not connected": "未连接",
    "Test Connection": "测试连接",
    OAuth2: "OAuth2",
    "OAuth2 Callback URL": "OAuth2 回调 URL",
    "API Key": "API 密钥",
    "Access Token": "访问令牌",
    Username: "用户名",
    Password: "密码",
    Host: "主机",
    Port: "端口",
    Database: "数据库",
    SSL: "SSL",

    // Error messages
    Warning: "警告",
    Info: "信息",
    "No data": "无数据",
    "No items": "无数据项",
    "Invalid expression": "无效表达式",
    "Invalid input": "无效输入",
    "Connection lost": "连接丢失",
    "Connection failed": "连接失败",
    "Authentication failed": "认证失败",
    Unauthorized: "未授权",
    Forbidden: "禁止访问",
    "Not found": "未找到",
    "Rate limit exceeded": "超出速率限制",
    "Server error": "服务器错误",
    "Unknown error": "未知错误",
    "Please check your settings": "请检查您的设置",

    // UI Elements
    OK: "确定",
    Cancel: "取消",
    Confirm: "确认",
    Apply: "应用",
    Close: "关闭",
    Back: "返回",
    Next: "下一步",
    Previous: "上一步",
    Finish: "完成",
    Skip: "跳过",
    Add: "添加",
    Remove: "移除",
    Edit: "编辑",
    Update: "更新",
    Copy: "复制",
    "Copy to clipboard": "复制到剪贴板",
    Paste: "粘贴",
    Cut: "剪切",
    Undo: "撤销",
    Redo: "重做",
    Clear: "清除",
    "Clear all": "清除全部",
    Reset: "重置",
    "Reset all": "重置全部",
    Refresh: "刷新",
    Reload: "重新加载",
    Upload: "上传",
    Browse: "浏览",
    Choose: "选择",
    Select: "选择",
    "Select all": "全选",
    "Deselect all": "取消全选",
    Toggle: "切换",
    Expand: "展开",
    Collapse: "折叠",
    Show: "显示",
    Hide: "隐藏",
    View: "查看",
    Open: "打开",
    More: "更多",
    Less: "更少",
    Details: "详情",
    Advanced: "高级",
    Simple: "简单",

    // Time and date
    Now: "现在",
    Today: "今天",
    Yesterday: "昨天",
    Tomorrow: "明天",
    "This week": "本周",
    "Last week": "上周",
    "This month": "本月",
    "Last month": "上月",
    "This year": "今年",
    "Last year": "去年",
    "Last 7 days": "最近 7 天",
    "Last 14 days": "最近 14 天",
    "Last 30 days": "最近 30 天",
    "Last 60 days": "最近 60 天",
    "Last 90 days": "最近 90 天",
    "Custom range": "自定义范围",
    "Date range": "日期范围",
    "Start date": "开始日期",
    "End date": "结束日期",

    // Settings sections
    General: "常规",
    Personal: "个人",
    "Personal Settings": "个人设置",
    Users: "用户",
    "User Management": "用户管理",
    API: "API",
    "API Settings": "API 设置",
    "Community Nodes": "社区节点",
    "Environment Variables": "环境变量",
    Version: "版本",
    License: "许可证",
    Usage: "使用情况",
    "Usage and plan": "使用情况和计划",
    "Log Streaming": "日志流",
    "Audit Logs": "审计日志",
    "External Secrets": "外部密钥",
    SSO: "单点登录",
    SAML: "SAML",
    "Source Control": "源代码控制",
    Git: "Git",

    // User management
    "Invite User": "邀请用户",
    Invite: "邀请",
    Pending: "待定",
    Email: "邮箱",
    "Email address": "邮箱地址",
    "First name": "名字",
    "Last name": "姓氏",
    Role: "角色",
    Owner: "所有者",
    Member: "成员",
    Admin: "管理员",
    Editor: "编辑者",
    Viewer: "查看者",
    User: "用户",
    Guest: "访客",
    Permissions: "权限",
    "Last seen": "最后访问",
    Created: "创建时间",
    Updated: "更新时间",
    Modified: "修改时间",
    "Delete user": "删除用户",
    "Deactivate user": "停用用户",
    "Activate user": "激活用户",

    // Search and filter
    Search: "搜索",
    Filter: "筛选",
    Filters: "筛选器",
    Sort: "排序",
    "Sort by": "排序方式",
    Order: "顺序",
    Ascending: "升序",
    Descending: "降序",
    "Group by": "分组",
    Tags: "标签",
    "Add tag": "添加标签",
    "Remove tag": "移除标签",
    "No results found": "未找到结果",
    Showing: "显示",
    of: "共",
    results: "个结果",
    "per page": "每页",
    Page: "页",

    // Misc
    Loading: "加载中",
    "Loading...": "加载中...",
    Saving: "保存中",
    "Saving...": "保存中...",
    Deleting: "删除中",
    "Deleting...": "删除中...",
    Processing: "处理中",
    "Processing...": "处理中...",
    "Please wait": "请稍候",
    "Please wait...": "请稍候...",
    Working: "处理中",
    "Working...": "处理中...",
    Done: "完成",
    Ready: "就绪",
    Copied: "已复制",
    "Copied!": "已复制！",
    "Copy link": "复制链接",
    "Learn more": "了解更多",
    "Read more": "阅读更多",
    "Show more": "显示更多",
    "Show less": "显示较少",
    "View all": "查看全部",
    "View details": "查看详情",
    "Click here": "点击这里",
    "Drop files here": "将文件拖放到此处",
    "or click to browse": "或点击浏览",
    "No description": "无描述",
    "Not set": "未设置",
    "Not configured": "未配置",
    "Not available": "不可用",
    "Coming soon": "即将推出",
    Beta: "测试版",
    New: "新",
    Deprecated: "已弃用",
    Example: "示例",
    Examples: "示例",
    "Need help?": "需要帮助？",
    "Get help": "获取帮助",
    Support: "支持",
    Contact: "联系",
    Feedback: "反馈",
    "Report issue": "报告问题",
    "Request feature": "请求功能",
    "Share feedback": "分享反馈",
    Rate: "评分",
    Review: "评价",
    Sync: "同步",
    Syncing: "同步中",
    Synced: "已同步",
    Online: "在线",
    Offline: "离线",
    Disconnected: "已断开",
    Reconnecting: "重新连接中",
    "Active sessions": "活动会话",
    "Sign out everywhere": "在所有设备上登出",
  };

  // Enhanced regex patterns for complex translations
  const regexTranslations = [
    // Quantity patterns
    { pattern: /(\d+)\s+workflow(s)?/gi, replacement: "$1 个工作流" },
    { pattern: /(\d+)\s+execution(s)?/gi, replacement: "$1 次执行" },
    { pattern: /(\d+)\s+node(s)?/gi, replacement: "$1 个节点" },
    { pattern: /(\d+)\s+item(s)?/gi, replacement: "$1 个数据项" },
    { pattern: /(\d+)\s+error(s)?/gi, replacement: "$1 个错误" },
    { pattern: /(\d+)\s+warning(s)?/gi, replacement: "$1 个警告" },
    { pattern: /(\d+)\s+result(s)?/gi, replacement: "$1 个结果" },
    { pattern: /(\d+)\s+user(s)?/gi, replacement: "$1 个用户" },
    { pattern: /(\d+)\s+credential(s)?/gi, replacement: "$1 个凭据" },
    { pattern: /(\d+)\s+variable(s)?/gi, replacement: "$1 个变量" },

    // Time patterns
    { pattern: /(\d+)\s+second(s)?\s+ago/gi, replacement: "$1 秒前" },
    { pattern: /(\d+)\s+minute(s)?\s+ago/gi, replacement: "$1 分钟前" },
    { pattern: /(\d+)\s+hour(s)?\s+ago/gi, replacement: "$1 小时前" },
    { pattern: /(\d+)\s+day(s)?\s+ago/gi, replacement: "$1 天前" },
    { pattern: /(\d+)\s+week(s)?\s+ago/gi, replacement: "$1 周前" },
    { pattern: /(\d+)\s+month(s)?\s+ago/gi, replacement: "$1 个月前" },
    { pattern: /(\d+)\s+year(s)?\s+ago/gi, replacement: "$1 年前" },
    { pattern: /in\s+(\d+)\s+second(s)?/gi, replacement: "$1 秒后" },
    { pattern: /in\s+(\d+)\s+minute(s)?/gi, replacement: "$1 分钟后" },
    { pattern: /in\s+(\d+)\s+hour(s)?/gi, replacement: "$1 小时后" },

    // Status patterns
    { pattern: /Last updated: (.+)/gi, replacement: "最后更新：$1" },
    { pattern: /Created: (.+)/gi, replacement: "创建时间：$1" },
    { pattern: /Modified: (.+)/gi, replacement: "修改时间：$1" },
    { pattern: /Updated: (.+)/gi, replacement: "更新时间：$1" },
    { pattern: /Started: (.+)/gi, replacement: "开始时间：$1" },
    { pattern: /Finished: (.+)/gi, replacement: "结束时间：$1" },
    { pattern: /Version (\d+\.\d+\.\d+)/gi, replacement: "版本 $1" },
    { pattern: /v(\d+\.\d+\.\d+)/gi, replacement: "v$1" },

    // Pagination patterns
    { pattern: /Page (\d+) of (\d+)/gi, replacement: "第 $1 页，共 $2 页" },
    {
      pattern: /Showing (\d+)-(\d+) of (\d+)/gi,
      replacement: "显示 $1-$2，共 $3",
    },
    { pattern: /(\d+) of (\d+)/gi, replacement: "$1 / $2" },

    // Action patterns
    { pattern: /Successfully (.+)/gi, replacement: "成功$1" },
    { pattern: /Failed to (.+)/gi, replacement: "无法$1" },
    { pattern: /Unable to (.+)/gi, replacement: "无法$1" },
    { pattern: /Could not (.+)/gi, replacement: "无法$1" },
    { pattern: /Cannot (.+)/gi, replacement: "无法$1" },

    // File patterns
    { pattern: /(\d+)\s+file(s)?/gi, replacement: "$1 个文件" },
    { pattern: /(\d+)\s+folder(s)?/gi, replacement: "$1 个文件夹" },
    { pattern: /(\d+)\s+KB/gi, replacement: "$1 KB" },
    { pattern: /(\d+)\s+MB/gi, replacement: "$1 MB" },
    { pattern: /(\d+)\s+GB/gi, replacement: "$1 GB" },
  ];

  // Advanced caching system
  const translationCache = new Map();
  const elementCache = new WeakSet();
  const textNodeCache = new WeakMap();

  // Pre-compile regex patterns for better performance
  const compiledRegexPatterns = regexTranslations.map(
    ({ pattern, replacement }) => ({
      regex: pattern,
      replacement,
    })
  );

  // Optimized translation function with caching
  function translateText(text) {
    if (!text || typeof text !== "string") return text;

    const trimmedText = text.trim();
    if (!trimmedText) return text;

    // Check cache first
    if (translationCache.has(trimmedText)) {
      return translationCache.get(trimmedText);
    }

    let result = text;

    // Direct translation
    if (translations[trimmedText]) {
      result = text.replace(trimmedText, translations[trimmedText]);
      translationCache.set(trimmedText, result);
      return result;
    }

    // Case-insensitive match
    const lowerText = trimmedText.toLowerCase();
    for (const [key, value] of Object.entries(translations)) {
      if (key.toLowerCase() === lowerText) {
        result = text.replace(trimmedText, value);
        translationCache.set(trimmedText, result);
        return result;
      }
    }

    // Regex pattern matching
    let translatedText = text;
    let hasMatch = false;

    for (const { regex, replacement } of compiledRegexPatterns) {
      const newText = translatedText.replace(regex, replacement);
      if (newText !== translatedText) {
        translatedText = newText;
        hasMatch = true;
      }
    }

    // Partial match for compound texts
    if (!hasMatch) {
      for (const [key, value] of Object.entries(translations)) {
        // Skip single character translations to avoid false matches
        if (key.length < 2) continue;

        const regex = new RegExp(
          `\\b${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
          "gi"
        );
        const newText = translatedText.replace(regex, value);
        if (newText !== translatedText) {
          translatedText = newText;
          hasMatch = true;
        }
      }
    }

    // Cache the result
    if (hasMatch) {
      translationCache.set(trimmedText, translatedText);
    }

    // Clean cache if it gets too large
    if (translationCache.size > config.cacheSize) {
      const entriesToDelete = translationCache.size - config.cacheSize + 100;
      const keys = Array.from(translationCache.keys());
      for (let i = 0; i < entriesToDelete; i++) {
        translationCache.delete(keys[i]);
      }
    }

    return translatedText;
  }

  // Optimized element translation with better caching
  function translateElement(element) {
    // Skip if already cached
    if (elementCache.has(element)) return;

    // Skip certain elements
    if (element.tagName) {
      const tag = element.tagName.toUpperCase();
      if (["SCRIPT", "STYLE", "CODE", "PRE", "NOSCRIPT"].includes(tag)) {
        elementCache.add(element);
        return;
      }
    }

    // Skip editor elements
    if (
      element.classList &&
      (element.classList.contains("ace_editor") ||
        element.classList.contains("monaco-editor") ||
        element.classList.contains("cm-editor") ||
        element.classList.contains("expression-editor") ||
        element.classList.contains("codemirror"))
    ) {
      elementCache.add(element);
      return;
    }

    // Process text nodes
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        // Check if already processed
        if (textNodeCache.has(node)) {
          return NodeFilter.FILTER_SKIP;
        }

        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_SKIP;

        const parentTag = parent.tagName?.toUpperCase();
        if (
          ["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA", "NOSCRIPT"].includes(
            parentTag
          )
        ) {
          return NodeFilter.FILTER_SKIP;
        }

        // Skip editor elements
        if (
          parent.classList &&
          (parent.classList.contains("ace_editor") ||
            parent.classList.contains("monaco-editor") ||
            parent.classList.contains("cm-editor") ||
            parent.classList.contains("expression-editor") ||
            parent.classList.contains("codemirror"))
        ) {
          return NodeFilter.FILTER_SKIP;
        }

        const text = node.nodeValue;
        return text && text.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    // Batch process text nodes
    textNodes.forEach((node) => {
      const originalText = node.nodeValue;
      const translatedText = translateText(originalText);
      if (translatedText !== originalText) {
        node.nodeValue = translatedText;
      }
      textNodeCache.set(node, true);
    });

    // Translate attributes
    const attributes = [
      "placeholder",
      "title",
      "aria-label",
      "alt",
      "data-tooltip",
      "data-hint",
    ];
    attributes.forEach((attr) => {
      if (element.hasAttribute && element.hasAttribute(attr)) {
        const originalText = element.getAttribute(attr);
        if (originalText) {
          const translatedText = translateText(originalText);
          if (translatedText !== originalText) {
            element.setAttribute(attr, translatedText);
          }
        }
      }
    });

    // Special handling for input/textarea value
    if (
      (element.tagName === "INPUT" || element.tagName === "TEXTAREA") &&
      element.type !== "password" &&
      element.type !== "email" &&
      element.type !== "url" &&
      element.value
    ) {
      const originalValue = element.value.trim();
      if (originalValue && translations[originalValue]) {
        element.value = translations[originalValue];
      }
    }

    // Add to cache
    elementCache.add(element);
  }

  // Batch translation for better performance
  function translateBatch(elements) {
    const batch = [];
    for (let i = 0; i < elements.length && i < config.batchSize; i++) {
      if (!elementCache.has(elements[i])) {
        batch.push(elements[i]);
      }
    }

    batch.forEach((element) => translateElement(element));

    // Process remaining elements in next tick
    if (elements.length > config.batchSize) {
      const remaining = Array.from(elements).slice(config.batchSize);
      requestAnimationFrame(() => translateBatch(remaining));
    }
  }

  // Optimized page translation
  function translatePage() {
    const selector = [
      "div",
      "span",
      "p",
      "a",
      "button",
      "label",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "li",
      "td",
      "th",
      "dt",
      "dd",
      "nav",
      "section",
      "article",
      "input[placeholder]",
      "textarea[placeholder]",
      "[title]",
      "[aria-label]",
      "[alt]",
      "[data-tooltip]",
      "[data-hint]",
    ].join(",");

    const elements = document.querySelectorAll(selector);
    translateBatch(elements);
  }

  // Debounced mutation observer
  let observerTimeout;
  const observer = new MutationObserver((mutations) => {
    clearTimeout(observerTimeout);
    observerTimeout = setTimeout(() => {
      const nodesToTranslate = new Set();

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              nodesToTranslate.add(node);
              // Also collect child elements
              if (node.querySelectorAll) {
                const children = node.querySelectorAll("*");
                children.forEach((child) => nodesToTranslate.add(child));
              }
            } else if (node.nodeType === Node.TEXT_NODE) {
              const parent = node.parentElement;
              if (parent && !elementCache.has(parent)) {
                nodesToTranslate.add(parent);
              }
            }
          });
        } else if (mutation.type === "attributes") {
          nodesToTranslate.add(mutation.target);
        }
      });

      if (nodesToTranslate.size > 0) {
        translateBatch(Array.from(nodesToTranslate));
      }
    }, config.translateDelay);
  });

  // Start translation system
  function startTranslation() {
    // Initial translation
    translatePage();

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        "placeholder",
        "title",
        "aria-label",
        "alt",
        "data-tooltip",
        "data-hint",
        "value",
      ],
    });

    // Periodic check for missed elements
    setInterval(() => {
      const untranslated = document.querySelectorAll(
        "*:not([data-tr-checked])"
      );
      const toProcess = [];

      untranslated.forEach((element) => {
        element.setAttribute("data-tr-checked", "1");
        if (!elementCache.has(element)) {
          toProcess.push(element);
        }
      });

      if (toProcess.length > 0) {
        translateBatch(toProcess);
      }
    }, config.retranslateInterval);

    console.log("✅ n8n 中文汉化脚本加载成功！");
  }

  // Initialize
  function init() {
    // Pre-warm cache with common translations
    Object.keys(translations)
      .slice(0, 100)
      .forEach((key) => {
        translateText(key);
      });

    setTimeout(() => {
      startTranslation();

      // Handle SPA navigation
      let lastUrl = location.href;
      new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
          lastUrl = url;
          setTimeout(() => {
            // Clear element cache on navigation
            translatePage();
          }, 500);
        }
      }).observe(document, { subtree: true, childList: true });
    }, 1000);
  }

  // Start when ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
