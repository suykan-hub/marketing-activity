import React from 'react';
import { Card, Button, Space } from 'antd';
import NineGridLottery from './NineGridLottery';
import NineGridDemo from './NineGridDemo';

const TestPage = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Card title="九宫抽奖功能测试">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <h3>1. 完整功能版本（管理功能）</h3>
            <p>包含奖项管理、配置、统计等完整功能</p>
            <NineGridLottery />
          </div>
          
          <div>
            <h3>2. 演示版本（纯体验）</h3>
            <p>简化的抽奖体验，适合最终用户</p>
            <NineGridDemo />
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default TestPage; 