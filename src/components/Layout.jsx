import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Space,
  Typography,
  theme,
} from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MailOutlined,
  BarChartOutlined,
  TeamOutlined,
  GiftOutlined,
  TrophyOutlined,
  CalendarOutlined,
  FileTextOutlined,
  CustomerServiceOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MarketingLayout = ({ isDarkMode, onThemeChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 菜单项配置
  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '数据概览',
    },
    {
      key: 'campaigns',
      icon: <MailOutlined />,
      label: '营销活动',
      children: [
        {
          key: '/campaign-list',
          label: '活动列表',
        },
        {
          key: '/campaign-create',
          label: '创建活动',
        },
        {
          key: '/marquee',
          label: '跑马灯活动',
        },
        {
          key: '/marquee-demo',
          label: '跑马灯演示',
        },
        {
          key: '/wheel',
          label: '大转盘游戏',
        },
      ],
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: '数据分析',
      children: [
        {
          key: '/performance',
          label: '效果分析',
        },
        {
          key: '/conversion',
          label: '转化追踪',
        },
        {
          key: '/reports',
          label: '数据报表',
        },
      ],
    },
    {
      key: 'audience',
      icon: <TeamOutlined />,
      label: '受众管理',
      children: [
        {
          key: '/segments',
          label: '用户分群',
        },
        {
          key: '/tags',
          label: '标签管理',
        },
        {
          key: '/import',
          label: '数据导入',
        },
      ],
    },
    {
      key: 'rewards',
      icon: <GiftOutlined />,
      label: '奖励系统',
      children: [
        {
          key: '/points',
          label: '积分管理',
        },
        {
          key: '/coupons',
          label: '优惠券',
        },
        {
          key: '/loyalty',
          label: '会员体系',
        },
      ],
    },
    {
      key: 'competitions',
      icon: <TrophyOutlined />,
      label: '竞赛活动',
      children: [
        {
          key: '/contest-list',
          label: '竞赛列表',
        },
        {
          key: '/contest-create',
          label: '创建竞赛',
        },
        {
          key: '/leaderboard',
          label: '排行榜',
        },
      ],
    },
    {
      key: '/calendar',
      icon: <CalendarOutlined />,
      label: '活动日历',
    },
    {
      key: 'content',
      icon: <FileTextOutlined />,
      label: '内容管理',
      children: [
        {
          key: '/articles',
          label: '文章管理',
        },
        {
          key: '/banners',
          label: '横幅管理',
        },
        {
          key: '/media',
          label: '媒体库',
        },
      ],
    },
    {
      key: '/support',
      icon: <CustomerServiceOutlined />,
      label: '客服支持',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  // 用户下拉菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账户设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  // 处理菜单点击
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  // 获取当前选中的菜单项
  const getSelectedKeys = () => {
    const pathname = location.pathname;
    if (pathname === '/') return ['/'];

    // 查找匹配的菜单项
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.key === pathname) {
            return [child.key];
          }
        }
      } else if (item.key === pathname) {
        return [item.key];
      }
    }
    return [];
  };

  // 获取默认展开的菜单项
  const getDefaultOpenKeys = () => {
    const pathname = location.pathname;
    for (const item of menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.key === pathname) {
            return [item.key];
          }
        }
      }
    }
    return ['campaigns', 'analytics'];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={isDarkMode ? 'dark' : 'light'}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
          }}
        >
          <Title
            level={4}
            style={{ margin: 0, color: isDarkMode ? '#fff' : '#1890ff' }}
          >
            {collapsed ? 'MT' : '营销工具'}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={getSelectedKeys()}
          defaultOpenKeys={getDefaultOpenKeys()}
          style={{ borderRight: 0 }}
          theme={isDarkMode ? 'dark' : 'light'}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
            position: 'fixed',
            top: 0,
            right: 0,
            left: collapsed ? 80 : 200,
            zIndex: 999,
            height: 64,
            transition: 'left 0.2s ease',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <Space size="large">
            {/* 主题切换按钮 */}
            <Button
              type="text"
              icon={isDarkMode ? <BulbOutlined /> : <BulbFilled />}
              onClick={onThemeChange}
              style={{
                fontSize: '16px',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              title={isDarkMode ? '切换到浅色主题' : '切换到深色主题'}
            />
            <Button type="text" icon={<BellOutlined />} />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>管理员</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: '88px 24px 24px 24px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            transition: 'margin-left 0.2s ease',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MarketingLayout;
