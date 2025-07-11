# 营销工具 (Marketing Activity)

一个基于 React + Ant Design 的现代化营销工具管理系统。

## 功能特性

- 🎯 **数据概览** - 实时展示营销活动关键指标
- 📧 **营销活动** - 邮件营销、推送通知等活动管理
- 🎡 **大转盘游戏** - 概率抽奖转盘，支持动态配置奖项和概率
- 🎪 **跑马灯活动** - 动态跑马灯展示，支持多项目管理和实时控制
- 📊 **数据分析** - 效果分析、转化追踪、数据报表
- 👥 **受众管理** - 用户分群、标签管理、数据导入
- 🎁 **奖励系统** - 积分管理、优惠券、会员体系
- 🏆 **竞赛活动** - 竞赛创建、排行榜管理
- 📅 **活动日历** - 活动时间线管理
- 📝 **内容管理** - 文章、横幅、媒体库管理
- 🛠️ **系统设置** - 完整的系统配置
- 🌓 **主题切换** - 支持浅色/深色主题切换
- 🚀 **路由导航** - 完整的页面路由系统

## 技术栈

- **前端框架**: React 19
- **UI 组件库**: Ant Design 5
- **路由管理**: React Router 7
- **图表库**: Recharts
- **构建工具**: Vite
- **包管理器**: Yarn

## 快速开始

### 安装依赖

```bash
yarn install
```

### 启动开发服务器

```bash
yarn dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建生产版本

```bash
yarn build
```

### 预览生产版本

```bash
yarn preview
```

## 项目结构
│   ├── wheelPage/       # 大转盘游戏页面
│   │   ├── WheelGame.jsx
│   │   └── wheel.css

```
src/
├── components/          # 组件目录
│   ├── Layout.jsx      # 主布局组件（顶部header + 左侧菜单）
│   ├── Dashboard.jsx   # 仪表板页面
│   └── ThemeDemo.jsx   # 主题演示组件
├── pages/              # 页面目录
│   ├── campaigns/      # 营销活动页面
│   │   └── CampaignList.jsx
│   ├── marquee/        # 跑马灯活动页面
│   │   ├── MarqueeActivity.jsx
│   │   ├── MarqueeDemo.jsx
│   │   └── marquee.css
│   ├── analytics/      # 数据分析页面
│   │   └── PerformanceAnalysis.jsx
│   ├── audience/       # 受众管理页面
│   │   └── UserSegments.jsx
│   ├── rewards/        # 奖励系统页面
│   │   └── PointsManagement.jsx
│   ├── competitions/   # 竞赛活动页面
│   │   └── ContestList.jsx
│   └── PlaceholderPage.jsx  # 占位页面
├── router/             # 路由配置
│   └── index.jsx
├── assets/             # 静态资源
├── App.jsx            # 主应用组件
├── main.jsx           # 应用入口
└── index.css          # 全局样式
```

## 页面功能

### 已实现的页面
- **大转盘游戏** - 概率抽奖转盘系统，支持动态配置奖项、概率、颜色、数量，包含转盘动画、中奖历史、自动转盘等功能

#### 📊 数据概览 (Dashboard)
- 关键数据统计卡片
- 转化率趋势图表
- 用户活跃度分析
- 最近活动数据表格

#### 📧 营销活动
- **活动列表** - 完整的活动管理界面，包含搜索、筛选、分页功能
- **跑马灯活动** - 动态跑马灯展示系统，支持多项目管理、实时控制、速度调节、代码生成
- **跑马灯演示** - 展示不同样式的跑马灯效果，包含基础、彩色、小尺寸、垂直等多种样式
- 创建活动 (占位页面)
- 活动模板 (占位页面)

#### 📈 数据分析
- **效果分析** - 收入趋势分析、渠道分布、关键指标完成情况
- 转化追踪 (占位页面)
- 数据报表 (占位页面)

#### 👥 受众管理
- **用户分群** - 用户分群管理，支持创建、编辑、筛选功能
- 标签管理 (占位页面)
- 数据导入 (占位页面)

#### 🎁 奖励系统
- **积分管理** - 积分规则管理，支持获得/消费积分规则
- 优惠券 (占位页面)
- 会员体系 (占位页面)

#### 🏆 竞赛活动
- **竞赛列表** - 竞赛活动管理，包含参与人数、预算、奖品等信息
- 创建竞赛 (占位页面)
- 排行榜 (占位页面)

#### 其他功能页面
- 活动日历 (占位页面)
- 文章管理 (占位页面)
- 横幅管理 (占位页面)
- 媒体库 (占位页面)
- 客服支持 (占位页面)
- 系统设置 (占位页面)

## 布局说明

### 顶部 Header
- 左侧：菜单折叠/展开按钮
- 右侧：主题切换按钮、通知图标、用户头像和下拉菜单

### 左侧菜单
- 可折叠的侧边栏
- 多级菜单结构
- 图标和文字标签
- 支持菜单项展开/收起
- 自动适配深色/浅色主题
- 路由导航功能

### 主要内容区域
- 响应式布局
- 卡片式内容展示
- 数据统计和图表
- 完整的主题支持
- 路由内容渲染

## 路由系统

### 路由配置
- 使用 React Router 7 进行路由管理
- 支持嵌套路由结构
- 自动菜单高亮和展开
- 路由参数传递

### 页面导航
- 点击菜单项自动导航到对应页面
- 支持浏览器前进/后退
- URL 地址栏同步更新
- 页面刷新后保持当前路由

## 主题功能

### 主题切换
- 🌞 **浅色主题**: 默认主题，适合日间使用
- 🌙 **深色主题**: 护眼主题，适合夜间使用
- 💾 **自动保存**: 主题选择会自动保存到本地存储
- ⚡ **即时切换**: 点击主题按钮即可立即切换

### 主题特性
- 完整的颜色系统适配
- 所有组件自动主题化
- 平滑的过渡动画
- 良好的对比度和可读性

## 开发指南

### 添加新页面
1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/router/index.jsx` 中添加对应的路由配置
3. 在 `Layout.jsx` 中添加对应的菜单项

### 自定义主题
项目使用 Ant Design 的主题系统，可以通过 `ConfigProvider` 进行主题定制：

```jsx
const themeConfig = {
  algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    borderRadius: 6,
  },
};
```

### 主题相关开发
- 使用 `theme.useToken()` 获取主题变量
- 使用 `colorText`、`colorTextSecondary` 等变量确保文本颜色正确
- 避免使用硬编码的颜色值

### 路由开发
- 使用 `useNavigate()` 进行编程式导航
- 使用 `useLocation()` 获取当前路由信息
- 使用 `useParams()` 获取路由参数

## 许可证

MIT License
