import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Button, Select } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import './marquee.css';

const { Title, Text } = Typography;
const { Option } = Select;

const MarqueeDemo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(50);

  const demoTexts = [
    '🎉 限时优惠！全场商品8折起，快来抢购吧！',
    '🔥 新用户注册即送100积分，立即体验！',
    '📱 下载APP，享受专属优惠券！',
    '🎁 会员专享：生日当月双倍积分！',
    '⚡ 闪电发货：24小时内发货，极速送达！'
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>跑马灯效果演示</Title>
      <Text type="secondary">展示不同样式的跑马灯效果</Text>
      
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {/* 基础跑马灯 */}
        <Col span={24}>
          <Card title="基础跑马灯" extra={
            <Space>
              <Text>速度: {speed}</Text>
              <Select value={speed} onChange={handleSpeedChange} style={{ width: 100 }}>
                <Option value={30}>慢速</Option>
                <Option value={50}>中速</Option>
                <Option value={70}>快速</Option>
              </Select>
              <Button
                type={isPlaying ? 'default' : 'primary'}
                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={handlePlayPause}
              >
                {isPlaying ? '暂停' : '播放'}
              </Button>
            </Space>
          }>
            <div className="marquee-container" style={{ height: 60 }}>
              <div
                className="marquee-content"
                style={{
                  animationDuration: `${100 - speed}s`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                {demoTexts.join(' | ')}
              </div>
            </div>
          </Card>
        </Col>

        {/* 彩色跑马灯 */}
        <Col span={12}>
          <Card title="彩色跑马灯">
            <div className="marquee-container" style={{ 
              height: 50,
              background: 'linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)'
            }}>
              <div
                className="marquee-content"
                style={{
                  animationDuration: `${100 - speed}s`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {demoTexts.slice(0, 3).join(' | ')}
              </div>
            </div>
          </Card>
        </Col>

        {/* 小尺寸跑马灯 */}
        <Col span={12}>
          <Card title="小尺寸跑马灯">
            <div className="marquee-container" style={{ 
              height: 40,
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
            }}>
              <div
                className="marquee-content"
                style={{
                  animationDuration: `${100 - speed}s`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                  color: 'white',
                  fontSize: '14px',
                  padding: '8px 16px',
                }}
              >
                {demoTexts.slice(2, 4).join(' | ')}
              </div>
            </div>
          </Card>
        </Col>

        {/* 垂直跑马灯 */}
        <Col span={24}>
          <Card title="垂直跑马灯">
            <div style={{ 
              height: 120,
              overflow: 'hidden',
              background: 'linear-gradient(180deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: 6,
              border: '1px solid #d9d9d9',
            }}>
              <div
                style={{
                  animation: `vertical-marquee ${100 - speed}s linear infinite`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                  padding: '16px',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {demoTexts.map((text, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* 代码示例 */}
        <Col span={24}>
          <Card title="集成代码示例">
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '16px', 
              borderRadius: 6,
              overflow: 'auto',
              fontSize: '14px'
            }}>
{`<!-- HTML 结构 -->
<div class="marquee-container" style="height: 60px; overflow: hidden;">
  <div class="marquee-content" style="animation-duration: ${100 - speed}s;">
    ${demoTexts.join(' | ')}
  </div>
</div>

<!-- CSS 样式 -->
<style>
.marquee-container {
  background: linear-gradient(90deg, #f0f8ff 0%, #e6f7ff 50%, #f0f8ff 100%);
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  color: #1890ff;
  animation: marquee-scroll linear infinite;
}

@keyframes marquee-scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
</style>`}
            </pre>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MarqueeDemo; 