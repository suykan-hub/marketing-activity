import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, Input, Select, Row, Col, Statistic, Modal, Form, InputNumber, theme } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, GiftOutlined, UserOutlined, HistoryOutlined } from '@ant-design/icons';

const { Search } = Input;

const PointsManagement = () => {
  const {
    token: { colorText },
  } = theme.useToken();

  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [form] = Form.useForm();

  // 模拟数据
  const pointsRules = [
    {
      key: '1',
      name: '购物奖励',
      description: '用户购物时获得积分奖励',
      type: '获得',
      points: 100,
      condition: '消费金额 >= 100元',
      status: '启用',
      creator: '张三',
      createTime: '2024-01-15',
      usageCount: 1250,
    },
    {
      key: '2',
      name: '签到奖励',
      description: '用户每日签到获得积分',
      type: '获得',
      points: 10,
      condition: '每日签到',
      status: '启用',
      creator: '李四',
      createTime: '2024-01-10',
      usageCount: 8900,
    },
    {
      key: '3',
      name: '邀请好友',
      description: '邀请好友注册获得积分',
      type: '获得',
      points: 50,
      condition: '成功邀请1位好友',
      status: '启用',
      creator: '王五',
      createTime: '2024-01-08',
      usageCount: 320,
    },
    {
      key: '4',
      name: '积分兑换',
      description: '积分兑换优惠券',
      type: '消费',
      points: -200,
      condition: '兑换10元优惠券',
      status: '启用',
      creator: '赵六',
      createTime: '2024-01-05',
      usageCount: 450,
    },
    {
      key: '5',
      name: '积分过期',
      description: '积分超过1年自动过期',
      type: '消费',
      points: -100,
      condition: '积分超过365天',
      status: '暂停',
      creator: '钱七',
      createTime: '2024-01-03',
      usageCount: 120,
    },
  ];

  const columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a style={{ color: colorText }}>{text}</a>,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const color = type === '获得' ? 'green' : 'red';
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: '积分',
      dataIndex: 'points',
      key: 'points',
      render: (points) => (
        <span style={{ color: points > 0 ? '#52c41a' : '#ff4d4f', fontWeight: 'bold' }}>
          {points > 0 ? '+' : ''}{points}
        </span>
      ),
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: '触发条件',
      dataIndex: 'condition',
      key: 'condition',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === '启用' ? 'green' : 'default';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '使用次数',
      dataIndex: 'usageCount',
      key: 'usageCount',
      sorter: (a, b) => a.usageCount - b.usageCount,
      render: (count) => count.toLocaleString(),
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<HistoryOutlined />}>历史</Button>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>编辑</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const filteredRules = pointsRules.filter(rule =>
    rule.name.toLowerCase().includes(searchText.toLowerCase()) ||
    rule.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (record) => {
    setEditingRule(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setEditingRule(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log('Form values:', values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const totalPoints = pointsRules.reduce((sum, rule) => sum + rule.points, 0);
  const totalUsage = pointsRules.reduce((sum, rule) => sum + rule.usageCount, 0);

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: colorText }}>积分规则管理</h2>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总规则数"
              value={pointsRules.length}
              prefix={<GiftOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="启用规则"
              value={pointsRules.filter(r => r.status === '启用').length}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总使用次数"
              value={totalUsage}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均积分"
              value={Math.round(totalPoints / pointsRules.length)}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和操作 */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} lg={8}>
            <Search
              placeholder="搜索规则名称或描述"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Select
              placeholder="类型筛选"
              style={{ width: '100%' }}
              allowClear
            >
              <Select.Option value="获得">获得积分</Select.Option>
              <Select.Option value="消费">消费积分</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Select
              placeholder="状态筛选"
              style={{ width: '100%' }}
              allowClear
            >
              <Select.Option value="启用">启用</Select.Option>
              <Select.Option value="暂停">暂停</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ width: '100%' }}>
              创建规则
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 规则表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredRules}
          pagination={{
            total: filteredRules.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          size="middle"
        />
      </Card>

      {/* 创建/编辑规则模态框 */}
      <Modal
        title={editingRule ? '编辑积分规则' : '创建积分规则'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="规则名称"
            rules={[{ required: true, message: '请输入规则名称' }]}
          >
            <Input placeholder="请输入规则名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="规则描述"
            rules={[{ required: true, message: '请输入规则描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入规则描述" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="规则类型"
                rules={[{ required: true, message: '请选择规则类型' }]}
              >
                <Select placeholder="请选择规则类型">
                  <Select.Option value="获得">获得积分</Select.Option>
                  <Select.Option value="消费">消费积分</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="points"
                label="积分数量"
                rules={[{ required: true, message: '请输入积分数量' }]}
              >
                <InputNumber
                  placeholder="请输入积分数量"
                  style={{ width: '100%' }}
                  min={-10000}
                  max={10000}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="condition"
            label="触发条件"
            rules={[{ required: true, message: '请输入触发条件' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入触发条件，例如：消费金额 >= 100元" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="启用">启用</Select.Option>
              <Select.Option value="暂停">暂停</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PointsManagement; 