// 九宫抽奖使用示例
// 这个文件展示了如何在其他组件中集成九宫抽奖功能

import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import NineGridLottery from './NineGridLottery';
import NineGridDemo from './NineGridDemo';

// 示例1：在弹窗中显示九宫抽奖
const LotteryModalExample = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        打开九宫抽奖
      </Button>
      <Modal
        title="九宫抽奖活动"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        footer={null}
      >
        <NineGridDemo />
      </Modal>
    </>
  );
};

// 示例2：条件渲染九宫抽奖
const ConditionalLotteryExample = () => {
  const [showLottery, setShowLottery] = useState(false);
  const [userPoints, setUserPoints] = useState(100);

  const handleStartLottery = () => {
    if (userPoints >= 10) {
      setUserPoints(prev => prev - 10);
      setShowLottery(true);
    } else {
      message.error('积分不足，无法参与抽奖！');
    }
  };

  const handleLotteryComplete = (prize) => {
    setShowLottery(false);
    message.success(`恭喜获得：${prize.name}`);
  };

  return (
    <div>
      <div>当前积分：{userPoints}</div>
      <Button 
        type="primary" 
        onClick={handleStartLottery}
        disabled={userPoints < 10}
      >
        消耗10积分抽奖
      </Button>
      
      {showLottery && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)' }}>
          <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
            <NineGridDemo />
            <Button 
              style={{ position: 'absolute', top: 20, right: 20 }}
              onClick={() => setShowLottery(false)}
            >
              关闭
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// 示例3：自定义奖品配置
const CustomPrizesExample = () => {
  const [customPrizes, setCustomPrizes] = useState([
    {
      id: 1,
      name: '现金红包',
      description: '100元现金',
      probability: 5,
      color: '#ff4d4f',
      type: 'grand',
      status: 'active',
      quantity: 10,
      remaining: 10,
      icon: '💰'
    },
    {
      id: 2,
      name: '购物券',
      description: '50元购物券',
      probability: 15,
      color: '#faad14',
      type: 'major',
      status: 'active',
      quantity: 50,
      remaining: 50,
      icon: '🎫'
    },
    // ... 更多自定义奖品
  ]);

  return (
    <div>
      <h3>自定义奖品配置</h3>
      <NineGridLottery 
        prizes={customPrizes}
        onPrizesChange={setCustomPrizes}
      />
    </div>
  );
};

// 示例4：抽奖结果回调
const LotteryWithCallbackExample = () => {
  const [lotteryResults, setLotteryResults] = useState([]);

  const handleLotteryResult = (result) => {
    setLotteryResults(prev => [...prev, {
      ...result,
      timestamp: new Date().toLocaleString()
    }]);
    
    // 可以在这里调用API保存结果
    console.log('抽奖结果：', result);
  };

  return (
    <div>
      <h3>抽奖结果记录</h3>
      <NineGridDemo onResult={handleLotteryResult} />
      
      <div style={{ marginTop: 20 }}>
        <h4>历史记录：</h4>
        {lotteryResults.map((result, index) => (
          <div key={index} style={{ padding: 8, border: '1px solid #eee', margin: 4 }}>
            {result.timestamp} - {result.name}: {result.description}
          </div>
        ))}
      </div>
    </div>
  );
};

// 示例5：响应式九宫抽奖
const ResponsiveLotteryExample = () => {
  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
      <h3>响应式九宫抽奖</h3>
      <div style={{ 
        width: '100%', 
        maxWidth: '600px', 
        margin: '0 auto',
        padding: '20px'
      }}>
        <NineGridDemo />
      </div>
    </div>
  );
};

export {
  LotteryModalExample,
  ConditionalLotteryExample,
  CustomPrizesExample,
  LotteryWithCallbackExample,
  ResponsiveLotteryExample
};

// 使用说明：
/*
1. 基础使用：
   import { LotteryModalExample } from './usage-example';
   <LotteryModalExample />

2. 条件渲染：
   import { ConditionalLotteryExample } from './usage-example';
   <ConditionalLotteryExample />

3. 自定义配置：
   import { CustomPrizesExample } from './usage-example';
   <CustomPrizesExample />

4. 结果回调：
   import { LotteryWithCallbackExample } from './usage-example';
   <LotteryWithCallbackExample />

5. 响应式设计：
   import { ResponsiveLotteryExample } from './usage-example';
   <ResponsiveLotteryExample />
*/ 