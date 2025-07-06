import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Alert,
  message,
  Modal,
  Statistic,
  Progress,
  Divider,
} from 'antd';
import {
  PlayCircleOutlined,
  TrophyOutlined,
  GiftOutlined,
  StarOutlined,
  HeartOutlined,
  FireOutlined,
  CrownOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import './nineGrid.css';

const { Title, Text, Paragraph } = Typography;

const NineGridDemo = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [spinCount, setSpinCount] = useState(0);
  const [totalSpins, setTotalSpins] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // 演示奖品配置
  const prizes = [
    {
      id: 1,
      name: '特等奖',
      description: 'iPhone 15 Pro',
      color: '#ff4d4f',
      icon: <CrownOutlined />,
      probability: 1,
    },
    {
      id: 2,
      name: '一等奖',
      description: 'AirPods Pro',
      color: '#faad14',
      icon: <TrophyOutlined />,
      probability: 3,
    },
    {
      id: 3,
      name: '二等奖',
      description: '100元优惠券',
      color: '#52c41a',
      icon: <GiftOutlined />,
      probability: 8,
    },
    {
      id: 4,
      name: '三等奖',
      description: '50元优惠券',
      color: '#1890ff',
      icon: <StarOutlined />,
      probability: 15,
    },
    {
      id: 5,
      name: '四等奖',
      description: '20元优惠券',
      color: '#722ed1',
      icon: <HeartOutlined />,
      probability: 25,
    },
    {
      id: 6,
      name: '五等奖',
      description: '10元优惠券',
      color: '#13c2c2',
      icon: <FireOutlined />,
      probability: 35,
    },
    {
      id: 7,
      name: '六等奖',
      description: '5元优惠券',
      color: '#eb2f96',
      icon: <GiftOutlined />,
      probability: 45,
    },
    {
      id: 8,
      name: '七等奖',
      description: '2元优惠券',
      color: '#fa8c16',
      icon: <StarOutlined />,
      probability: 55,
    },
    {
      id: 9,
      name: '谢谢参与',
      description: '下次再来',
      color: '#8c8c8c',
      icon: <HeartOutlined />,
      probability: 100,
    },
  ];

  // 九宫格路径（顺时针）
  const gridPath = [0, 1, 2, 5, 8, 7, 6, 3];

  // 开始抽奖
  const startSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);
    setShowResult(false);

    // 根据概率随机选择奖项
    const random = Math.random() * 100;
    let selectedPrize = null;
    
    for (const prize of prizes) {
      if (random <= prize.probability) {
        selectedPrize = prize;
        break;
      }
    }

    // 找到选中奖项在九宫格中的位置
    const targetIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    
    // 生成动画路径（多转几圈再停在目标位置）
    const spins = 3 + Math.random() * 2; // 3-5圈
    const totalSteps = spins * 8 + targetIndex;
    const path = [];
    
    for (let i = 0; i < totalSteps; i++) {
      path.push(gridPath[i % 8]);
    }
    
    // 执行动画
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < path.length) {
        setCurrentIndex(path[currentStep]);
        currentStep++;
      } else {
        clearInterval(stepInterval);
        setIsSpinning(false);
        setSelectedPrize(selectedPrize);
        setShowResult(true);
        
        setSpinCount(prev => prev + 1);
        setTotalSpins(prev => prev + 1);
        
        // 显示中奖消息
        if (selectedPrize.name === '谢谢参与') {
          message.info(`很遗憾，${selectedPrize.description}`);
        } else {
          message.success(`恭喜您获得${selectedPrize.name}：${selectedPrize.description}！`);
        }
      }
    }, 150);

    return () => clearInterval(stepInterval);
  };

  // 重置抽奖
  const handleReset = () => {
    setSpinCount(0);
    setTotalSpins(0);
    setCurrentIndex(0);
    setSelectedPrize(null);
    setShowResult(false);
    message.success('抽奖已重置');
  };

  // 渲染九宫格
  const renderGrid = () => {
    return (
      <div className="nine-grid-container">
        <div className="nine-grid">
          {prizes.map((prize, index) => (
            <div
              key={prize.id}
              className={`grid-item ${currentIndex === index ? 'active' : ''}`}
              style={{
                backgroundColor: prize.color,
              }}
            >
              <div className="prize-icon">{prize.icon}</div>
              <div className="prize-name">{prize.name}</div>
              <div className="prize-desc">{prize.description}</div>
            </div>
          ))}
        </div>
        <div className="center-button">
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            onClick={startSpin}
            disabled={isSpinning}
            loading={isSpinning}
            style={{ width: 80, height: 80, borderRadius: '50%' }}
          >
            开始
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col span={16}>
          <Card
            title={
              <Space>
                <TrophyOutlined />
                <span>九宫抽奖演示</span>
                <Text type="secondary">体验抽奖效果</Text>
              </Space>
            }
            extra={
              <Button icon={<ReloadOutlined />} onClick={handleReset}>
                重置
              </Button>
            }
          >
            {renderGrid()}
            
            <Divider />
            
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="今日抽奖次数"
                  value={spinCount}
                  prefix={<PlayCircleOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="总抽奖次数"
                  value={totalSpins}
                  prefix={<TrophyOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="中奖概率"
                  value={selectedPrize ? selectedPrize.probability : 0}
                  suffix="%"
                  prefix={<GiftOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title="活动说明" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="活动规则"
                description="点击开始按钮即可参与抽奖，每个奖项都有不同的中奖概率。"
                type="info"
                showIcon
              />
              
              <Alert
                message="奖品说明"
                description="奖品将在24小时内发放到您的账户，请及时查收。"
                type="success"
                showIcon
              />
              
              <div>
                <Text strong>奖项概率分布：</Text>
                {prizes.slice(0, 5).map((prize) => (
                  <div key={prize.id} style={{ marginTop: 8 }}>
                    <Space>
                      <span style={{ color: prize.color }}>{prize.icon}</span>
                      <Text>{prize.name}</Text>
                      <Text type="secondary">{prize.probability}%</Text>
                    </Space>
                    <Progress
                      percent={prize.probability}
                      strokeColor={prize.color}
                      size="small"
                      showInfo={false}
                    />
                  </div>
                ))}
              </div>
            </Space>
          </Card>
          
          {showResult && selectedPrize && (
            <Card title="抽奖结果" size="small" style={{ marginTop: 16 }}>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 48, color: selectedPrize.color, marginBottom: 16 }}>
                  {selectedPrize.icon}
                </div>
                <Title level={4} style={{ color: selectedPrize.color }}>
                  {selectedPrize.name}
                </Title>
                <Paragraph>{selectedPrize.description}</Paragraph>
                {selectedPrize.name !== '谢谢参与' && (
                  <Alert
                    message="奖品将在24小时内发放到您的账户"
                    type="success"
                    showIcon
                  />
                )}
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default NineGridDemo; 