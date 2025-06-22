import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tag, theme } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const PerformanceAnalysis = () => {
  const {
    token: { colorText },
  } = theme.useToken();

  // 模拟数据
  const performanceData = [
    { month: '1月', revenue: 12000, cost: 8000, profit: 4000, conversion: 8.5 },
    { month: '2月', revenue: 15000, cost: 9000, profit: 6000, conversion: 9.2 },
    { month: '3月', revenue: 18000, cost: 11000, profit: 7000, conversion: 10.1 },
    { month: '4月', revenue: 22000, cost: 13000, profit: 9000, conversion: 11.5 },
    { month: '5月', revenue: 25000, cost: 15000, profit: 10000, conversion: 12.3 },
    { month: '6月', revenue: 28000, cost: 17000, profit: 11000, conversion: 13.1 },
  ];

  const channelData = [
    { name: '邮件营销', value: 35, color: '#1890ff' },
    { name: '社交媒体', value: 25, color: '#52c41a' },
    { name: '搜索引擎', value: 20, color: '#faad14' },
    { name: '直接访问', value: 15, color: '#ff4d4f' },
    { name: '其他', value: 5, color: '#722ed1' },
  ];

  const campaignPerformance = [
    {
      key: '1',
      campaign: '双11促销活动',
      channel: '邮件营销',
      impressions: 50000,
      clicks: 2500,
      ctr: 5.0,
      conversions: 250,
      conversionRate: 10.0,
      revenue: 12500,
      roas: 2.5,
    },
    {
      key: '2',
      campaign: '新年抽奖活动',
      channel: '社交媒体',
      impressions: 30000,
      clicks: 1800,
      ctr: 6.0,
      conversions: 180,
      conversionRate: 10.0,
      revenue: 9000,
      roas: 3.0,
    },
    {
      key: '3',
      campaign: '会员专享优惠',
      channel: '推送通知',
      impressions: 40000,
      clicks: 2000,
      ctr: 5.0,
      conversions: 160,
      conversionRate: 8.0,
      revenue: 8000,
      roas: 4.0,
    },
    {
      key: '4',
      campaign: '产品体验活动',
      channel: '线下活动',
      impressions: 10000,
      clicks: 800,
      ctr: 8.0,
      conversions: 120,
      conversionRate: 15.0,
      revenue: 6000,
      roas: 0.75,
    },
  ];

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'campaign',
      key: 'campaign',
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      key: 'channel',
      render: (channel) => {
        const colorMap = {
          '邮件营销': 'blue',
          '社交媒体': 'green',
          '推送通知': 'orange',
          '线下活动': 'purple',
        };
        return <Tag color={colorMap[channel]}>{channel}</Tag>;
      },
    },
    {
      title: '展示次数',
      dataIndex: 'impressions',
      key: 'impressions',
      sorter: (a, b) => a.impressions - b.impressions,
    },
    {
      title: '点击次数',
      dataIndex: 'clicks',
      key: 'clicks',
      sorter: (a, b) => a.clicks - b.clicks,
    },
    {
      title: '点击率',
      dataIndex: 'ctr',
      key: 'ctr',
      render: (ctr) => `${ctr}%`,
      sorter: (a, b) => a.ctr - b.ctr,
    },
    {
      title: '转化次数',
      dataIndex: 'conversions',
      key: 'conversions',
      sorter: (a, b) => a.conversions - b.conversions,
    },
    {
      title: '转化率',
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      render: (rate) => `${rate}%`,
      sorter: (a, b) => a.conversionRate - b.conversionRate,
    },
    {
      title: '收入',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => `¥${revenue.toLocaleString()}`,
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: 'ROAS',
      dataIndex: 'roas',
      key: 'roas',
      render: (roas) => `${roas}x`,
      sorter: (a, b) => a.roas - b.roas,
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: colorText }}>效果分析</h2>
      
      {/* 关键指标 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总收入"
              value={28000}
              prefix="¥"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总成本"
              value={17000}
              prefix="¥"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="净利润"
              value={11000}
              prefix="¥"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均转化率"
              value={13.1}
              suffix="%"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* 收入趋势图 */}
        <Col xs={24} lg={16}>
          <Card title="收入趋势分析">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#1890ff" name="收入" />
                <Line type="monotone" dataKey="cost" stroke="#ff4d4f" name="成本" />
                <Line type="monotone" dataKey="profit" stroke="#52c41a" name="利润" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* 转化率趋势 */}
        <Col xs={24} lg={8}>
          <Card title="转化率趋势">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="conversion" fill="#faad14" name="转化率(%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* 渠道分布 */}
        <Col xs={24} lg={12}>
          <Card title="渠道分布">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* 关键指标进度 */}
        <Col xs={24} lg={12}>
          <Card title="关键指标完成情况">
            <div style={{ padding: '20px 0' }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: colorText }}>收入目标</span>
                  <span style={{ color: colorText }}>85%</span>
                </div>
                <Progress percent={85} strokeColor="#1890ff" />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: colorText }}>转化率目标</span>
                  <span style={{ color: colorText }}>92%</span>
                </div>
                <Progress percent={92} strokeColor="#52c41a" />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: colorText }}>ROAS目标</span>
                  <span style={{ color: colorText }}>78%</span>
                </div>
                <Progress percent={78} strokeColor="#faad14" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 活动效果详情 */}
      <Card title="活动效果详情">
        <Table
          columns={columns}
          dataSource={campaignPerformance}
          pagination={false}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default PerformanceAnalysis; 