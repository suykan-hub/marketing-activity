import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Input, Select, DatePicker, Row, Col, Statistic, theme } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Search } = Input;
const { RangePicker } = DatePicker;

const CampaignList = () => {
  const {
    token: { colorText },
  } = theme.useToken();

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 模拟数据
  const campaigns = [
    {
      key: '1',
      name: '双11促销活动',
      type: '邮件营销',
      status: '进行中',
      participants: 1250,
      conversion: 8.5,
      budget: 5000,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      creator: '张三',
    },
    {
      key: '2',
      name: '新年抽奖活动',
      type: '竞赛活动',
      status: '已完成',
      participants: 890,
      conversion: 12.3,
      budget: 3000,
      startDate: '2024-01-10',
      endDate: '2024-01-20',
      creator: '李四',
    },
    {
      key: '3',
      name: '会员专享优惠',
      type: '推送通知',
      status: '进行中',
      participants: 2100,
      conversion: 6.8,
      budget: 2000,
      startDate: '2024-01-08',
      endDate: '2024-03-08',
      creator: '王五',
    },
    {
      key: '4',
      name: '产品体验活动',
      type: '线下活动',
      status: '已结束',
      participants: 450,
      conversion: 15.2,
      budget: 8000,
      startDate: '2024-01-05',
      endDate: '2024-01-12',
      creator: '赵六',
    },
    {
      key: '5',
      name: '春季新品发布',
      type: '邮件营销',
      status: '计划中',
      participants: 0,
      conversion: 0,
      budget: 6000,
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      creator: '钱七',
    },
  ];

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a style={{ color: colorText }}>{text}</a>,
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
          '计划中': 'orange',
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
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => `¥${budget.toLocaleString()}`,
      sorter: (a, b) => a.budget - b.budget,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" size="small" icon={<EyeOutlined />}>查看</Button>
          <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: colorText }}>营销活动列表</h2>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总活动数"
              value={campaigns.length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="进行中"
              value={campaigns.filter(c => c.status === '进行中').length}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总参与人数"
              value={campaigns.reduce((sum, c) => sum + c.participants, 0)}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总预算"
              value={campaigns.reduce((sum, c) => sum + c.budget, 0)}
              prefix="¥"
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选 */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} lg={8}>
            <Search
              placeholder="搜索活动名称"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Select
              placeholder="状态筛选"
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Select.Option value="all">全部状态</Select.Option>
              <Select.Option value="进行中">进行中</Select.Option>
              <Select.Option value="已完成">已完成</Select.Option>
              <Select.Option value="已结束">已结束</Select.Option>
              <Select.Option value="计划中">计划中</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Button type="primary" icon={<PlusOutlined />} style={{ width: '100%' }}>
              创建活动
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 活动表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredCampaigns}
          pagination={{
            total: filteredCampaigns.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default CampaignList; 