import React from 'react';
import { Row, Col, Card, Statistic, Progress, Table, Tag, Space, Button, theme } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  TrophyOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const Dashboard = () => {
  const {
    token: { colorText, colorTextSecondary },
  } = theme.useToken();

  // 统计数据
  const stats = [
    {
      title: '总用户数',
      value: 12580,
      prefix: <UserOutlined />,
      suffix: <ArrowUpOutlined style={{ color: '#52c41a' }} />,
      suffixText: '+12%',
      color: '#1890ff',
    },
    {
      title: '活跃活动',
      value: 24,
      prefix: <MailOutlined />,
      suffix: <ArrowUpOutlined style={{ color: '#52c41a' }} />,
      suffixText: '+8%',
      color: '#52c41a',
    },
    {
      title: '参与竞赛',
      value: 156,
      prefix: <TrophyOutlined />,
      suffix: <ArrowUpOutlined style={{ color: '#52c41a' }} />,
      suffixText: '+15%',
      color: '#faad14',
    },
    {
      title: '收入增长',
      value: 15680,
      prefix: <DollarOutlined />,
      suffix: <ArrowDownOutlined style={{ color: '#ff4d4f' }} />,
      suffixText: '-3%',
      color: '#ff4d4f',
    },
  ];

  // 最近活动数据
  const recentActivities = [
    {
      key: '1',
      campaign: '双11促销活动',
      type: '邮件营销',
      status: '进行中',
      participants: 1250,
      conversion: 8.5,
      date: '2024-01-15',
    },
    {
      key: '2',
      campaign: '新年抽奖活动',
      type: '竞赛活动',
      status: '已完成',
      participants: 890,
      conversion: 12.3,
      date: '2024-01-10',
    },
    {
      key: '3',
      campaign: '会员专享优惠',
      type: '推送通知',
      status: '进行中',
      participants: 2100,
      conversion: 6.8,
      date: '2024-01-08',
    },
    {
      key: '4',
      campaign: '产品体验活动',
      type: '线下活动',
      status: '已结束',
      participants: 450,
      conversion: 15.2,
      date: '2024-01-05',
    },
  ];

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'campaign',
      key: 'campaign',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const colorMap = {
          '邮件营销': 'blue',
          '竞赛活动': 'green',
          '推送通知': 'orange',
          '线下活动': 'purple',
        };
        return <Tag color={colorMap[type]}>{type}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colorMap = {
          '进行中': 'green',
          '已完成': 'blue',
          '已结束': 'default',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '参与人数',
      dataIndex: 'participants',
      key: 'participants',
      sorter: (a, b) => a.participants - b.participants,
    },
    {
      title: '转化率',
      dataIndex: 'conversion',
      key: 'conversion',
      render: (conversion) => `${conversion}%`,
      sorter: (a, b) => a.conversion - b.conversion,
    },
    {
      title: '创建日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" size="small">查看</Button>
          <Button type="link" size="small">编辑</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: colorText }}>营销工具仪表板</h2>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={
                  <span style={{ fontSize: '14px', marginLeft: '8px' }}>
                    {stat.suffix}
                    <span style={{ color: stat.suffix.props.style.color }}>
                      {stat.suffixText}
                    </span>
                  </span>
                }
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* 转化率图表 */}
        <Col xs={24} lg={12}>
          <Card title="本月转化率趋势" style={{ height: 300 }}>
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Progress
                type="circle"
                percent={75}
                format={(percent) => `${percent}%`}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                size={120}
              />
              <p style={{ marginTop: 16, color: colorTextSecondary }}>
                整体转化率表现良好，较上月提升 5%
              </p>
            </div>
          </Card>
        </Col>

        {/* 用户活跃度 */}
        <Col xs={24} lg={12}>
          <Card title="用户活跃度分析" style={{ height: 300 }}>
            <div style={{ padding: '20px 0' }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: colorText }}>日活跃用户</span>
                  <span style={{ color: colorText }}>85%</span>
                </div>
                <Progress percent={85} strokeColor="#52c41a" />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: colorText }}>周活跃用户</span>
                  <span style={{ color: colorText }}>92%</span>
                </div>
                <Progress percent={92} strokeColor="#1890ff" />
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: colorText }}>月活跃用户</span>
                  <span style={{ color: colorText }}>78%</span>
                </div>
                <Progress percent={78} strokeColor="#faad14" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 最近活动表格 */}
      <Card title="最近活动" style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={recentActivities}
          pagination={false}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default Dashboard; 