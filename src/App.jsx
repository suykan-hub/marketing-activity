import React, { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import MarketingLayout from './components/Layout';
import Dashboard from './components/Dashboard';
import CampaignList from './pages/campaigns/CampaignList';
import PerformanceAnalysis from './pages/analytics/PerformanceAnalysis';
import UserSegments from './pages/audience/UserSegments';
import PointsManagement from './pages/rewards/PointsManagement';
import ContestList from './pages/competitions/ContestList';
import PlaceholderPage from './pages/PlaceholderPage';
import 'antd/dist/reset.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 从 localStorage 读取主题设置，默认为浅色主题
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // 当主题改变时保存到 localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 主题配置
  const themeConfig = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      // 自定义主题色彩
      colorPrimary: '#1890ff',
      colorSuccess: '#52c41a',
      colorWarning: '#faad14',
      colorError: '#ff4d4f',
      colorInfo: '#1890ff',
      borderRadius: 0,
    },
  };

  // 创建带有主题props的路由
  const routerWithTheme = createBrowserRouter([
    {
      path: '/',
      element: <MarketingLayout isDarkMode={isDarkMode} onThemeChange={handleThemeChange} />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        // 营销活动
        {
          path: 'campaign-list',
          element: <CampaignList />,
        },
        {
          path: 'campaign-create',
          element: (
            <PlaceholderPage title="创建活动" description="创建新的营销活动" />
          ),
        },
        {
          path: 'campaign-templates',
          element: (
            <PlaceholderPage title="活动模板" description="管理和使用活动模板" />
          ),
        },
        // 数据分析
        {
          path: 'performance',
          element: <PerformanceAnalysis />,
        },
        {
          path: 'conversion',
          element: (
            <PlaceholderPage
              title="转化追踪"
              description="追踪和分析用户转化路径"
            />
          ),
        },
        {
          path: 'reports',
          element: (
            <PlaceholderPage title="数据报表" description="生成和查看数据报表" />
          ),
        },
        // 受众管理
        {
          path: 'segments',
          element: <UserSegments />,
        },
        {
          path: 'tags',
          element: (
            <PlaceholderPage title="标签管理" description="管理用户标签和分类" />
          ),
        },
        {
          path: 'import',
          element: (
            <PlaceholderPage title="数据导入" description="导入用户数据和信息" />
          ),
        },
        // 奖励系统
        {
          path: 'points',
          element: <PointsManagement />,
        },
        {
          path: 'coupons',
          element: (
            <PlaceholderPage title="优惠券管理" description="创建和管理优惠券" />
          ),
        },
        {
          path: 'loyalty',
          element: (
            <PlaceholderPage title="会员体系" description="管理会员等级和权益" />
          ),
        },
        // 竞赛活动
        {
          path: 'contest-list',
          element: <ContestList />,
        },
        {
          path: 'contest-create',
          element: (
            <PlaceholderPage title="创建竞赛" description="创建新的竞赛活动" />
          ),
        },
        {
          path: 'leaderboard',
          element: (
            <PlaceholderPage title="排行榜" description="查看竞赛排行榜" />
          ),
        },
        // 其他页面
        {
          path: 'calendar',
          element: (
            <PlaceholderPage title="活动日历" description="查看活动时间安排" />
          ),
        },
        {
          path: 'articles',
          element: (
            <PlaceholderPage title="文章管理" description="管理营销文章和内容" />
          ),
        },
        {
          path: 'banners',
          element: (
            <PlaceholderPage title="横幅管理" description="管理网站横幅和广告" />
          ),
        },
        {
          path: 'media',
          element: (
            <PlaceholderPage
              title="媒体库"
              description="管理图片、视频等媒体资源"
            />
          ),
        },
        {
          path: 'support',
          element: (
            <PlaceholderPage title="客服支持" description="客服工单和帮助中心" />
          ),
        },
        {
          path: 'settings',
          element: (
            <PlaceholderPage title="系统设置" description="系统配置和参数设置" />
          ),
        },
      ],
    },
  ]);

  return (
    <ConfigProvider locale={zhCN} theme={themeConfig}>
      <RouterProvider router={routerWithTheme} />
    </ConfigProvider>
  );
}

export default App;
