
# 政策研究与分析平台

使用typescript+tailwindcss+react+vite+npm构建项目

## 技术栈选择原因

1. 使用typescript，可以避免一些低级错误，提高开发效率
2. 使用tailwindcss，可以提高开发效率，减少css代码量
3. 使用react，可以提高开发效率，减少代码量
4. 使用vite，可以提高开发效率，减少打包时间
5. 使用npm，可以提高开发效率，减少安装依赖时间

## 项目功能

1. 政策搜索页面
   - 关键词搜索
   - 高级筛选功能
   - 时间范围选择

2. 政策分析页面
   - 搜索结果展示
   - 政策文本编辑器
   - AI自动生成政策综述

## 项目结构

src/
├── assets/ # 静态资源
├── components/ # 通用组件
├── pages/ # 页面组件
│ ├── PolicySearch/ # 政策搜索页面
│ └── PolicyAnalysis/ # 政策分析页面
├── services/ # API 服务
├── types/ # TypeScript 类型定义
├── utils/ # 工具函数
├── App.tsx # 根组件
└── main.tsx # 入口文件