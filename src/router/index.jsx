import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MarketingLayout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import CampaignList from '../pages/campaigns/CampaignList';
import PerformanceAnalysis from '../pages/analytics/PerformanceAnalysis';
import UserSegments from '../pages/audience/UserSegments';
import PointsManagement from '../pages/rewards/PointsManagement';
import ContestList from '../pages/competitions/ContestList';
import MarqueeActivity from '../pages/marquee/MarqueeActivity';
import MarqueeDemo from '../pages/marquee/MarqueeDemo';
import WheelGame from '../pages/wheelPage/WheelGame';
import PlaceholderPage from '../pages/PlaceholderPage';

// 创建路由配置
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketingLayout />,
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
      // 跑马灯活动
      {
        path: 'marquee',
        element: <MarqueeActivity />,
      },
      {
        path: 'marquee-demo',
        element: <MarqueeDemo />,
      },
      // 大转盘活动
      {
        path: 'wheel-game',
        element: <WheelGame />,
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

export default router;
