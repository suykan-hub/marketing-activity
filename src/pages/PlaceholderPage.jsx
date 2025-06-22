import React from 'react';
import { Card, Typography, theme } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const PlaceholderPage = ({ title, description }) => {
  const {
    token: { colorText },
  } = theme.useToken();

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <SmileOutlined style={{ fontSize: '64px', color: '#1890ff', marginBottom: '24px' }} />
      <Title level={2} style={{ color: colorText, marginBottom: '16px' }}>
        {title || '页面开发中'}
      </Title>
      <Paragraph style={{ color: colorText, fontSize: '16px', marginBottom: '32px' }}>
        {description || '这个功能正在开发中，敬请期待！'}
      </Paragraph>
      <Card style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Paragraph style={{ color: colorText }}>
          这是一个占位页面，用于展示路由功能。在实际开发中，这里会显示具体的功能页面。
        </Paragraph>
      </Card>
    </div>
  );
};

export default PlaceholderPage; 