import React from 'react';
import { Card, Row, Col, Button, Typography, Divider, Space, theme } from 'antd';
import {
  SunOutlined,
  MoonOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ThemeDemo = () => {
  const {
    token: { colorText, colorTextSecondary, colorPrimary, colorSuccess, colorWarning, colorError },
  } = theme.useToken();

  return (
    <div style={{ padding: '24px 0' }}>
      <Title level={3} style={{ color: colorText, marginBottom: 24 }}>
        主题切换演示
      </Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="颜色系统" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong style={{ color: colorPrimary }}>主色调 (Primary)</Text>
                <div style={{ 
                  width: '100%', 
                  height: '20px', 
                  backgroundColor: colorPrimary, 
                  borderRadius: '4px',
                  marginTop: '8px'
                }} />
              </div>
              <div>
                <Text strong style={{ color: colorSuccess }}>成功色 (Success)</Text>
                <div style={{ 
                  width: '100%', 
                  height: '20px', 
                  backgroundColor: colorSuccess, 
                  borderRadius: '4px',
                  marginTop: '8px'
                }} />
              </div>
              <div>
                <Text strong style={{ color: colorWarning }}>警告色 (Warning)</Text>
                <div style={{ 
                  width: '100%', 
                  height: '20px', 
                  backgroundColor: colorWarning, 
                  borderRadius: '4px',
                  marginTop: '8px'
                }} />
              </div>
              <div>
                <Text strong style={{ color: colorError }}>错误色 (Error)</Text>
                <div style={{ 
                  width: '100%', 
                  height: '20px', 
                  backgroundColor: colorError, 
                  borderRadius: '4px',
                  marginTop: '8px'
                }} />
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="图标和状态" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: colorSuccess, fontSize: '16px' }} />
                <Text style={{ color: colorText }}>成功状态</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ExclamationCircleOutlined style={{ color: colorWarning, fontSize: '16px' }} />
                <Text style={{ color: colorText }}>警告状态</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <InfoCircleOutlined style={{ color: colorPrimary, fontSize: '16px' }} />
                <Text style={{ color: colorText }}>信息状态</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CloseCircleOutlined style={{ color: colorError, fontSize: '16px' }} />
                <Text style={{ color: colorText }}>错误状态</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="文本颜色" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={4} style={{ color: colorText, margin: 0 }}>
            主要文本颜色 - 用于标题和重要内容
          </Title>
          <Text style={{ color: colorText }}>
            普通文本颜色 - 用于正文内容
          </Text>
          <Text style={{ color: colorTextSecondary }}>
            次要文本颜色 - 用于辅助信息和说明文字
          </Text>
          <Paragraph style={{ color: colorTextSecondary, margin: 0 }}>
            这是一段较长的段落文本，用于展示在深色和浅色主题下的显示效果。
            文本应该保持良好的对比度和可读性。
          </Paragraph>
        </Space>
      </Card>

      <Card title="按钮样式">
        <Space wrap>
          <Button type="primary">主要按钮</Button>
          <Button>默认按钮</Button>
          <Button type="dashed">虚线按钮</Button>
          <Button type="text">文本按钮</Button>
          <Button type="link">链接按钮</Button>
        </Space>
      </Card>
    </div>
  );
};

export default ThemeDemo; 