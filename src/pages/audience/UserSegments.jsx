import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Row,
  Col,
  Statistic,
  Modal,
  Form,
  theme,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  TeamOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const { Search } = Input;

const UserSegments = () => {
  const {
    token: { colorText },
  } = theme.useToken();

  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSegment, setEditingSegment] = useState(null);
  const [form] = Form.useForm();

  // 模拟数据
  const segments = [
    {
      key: '1',
      name: '高价值用户',
      description: '消费金额高、活跃度高的用户群体',
      criteria: '消费金额 > 1000元 AND 活跃天数 > 30天',
      userCount: 1250,
      status: '活跃',
      creator: '张三',
      createTime: '2024-01-15',
      lastUpdate: '2024-01-20',
    },
    {
      key: '2',
      name: '新注册用户',
      description: '最近30天内注册的新用户',
      criteria: '注册时间 > 30天前',
      userCount: 3200,
      status: '活跃',
      creator: '李四',
      createTime: '2024-01-10',
      lastUpdate: '2024-01-18',
    },
    {
      key: '3',
      name: '流失风险用户',
      description: '超过60天未登录的用户',
      criteria: '最后登录时间 < 60天前',
      userCount: 890,
      status: '活跃',
      creator: '王五',
      createTime: '2024-01-08',
      lastUpdate: '2024-01-15',
    },
    {
      key: '4',
      name: '女性用户',
      description: '性别为女性的用户群体',
      criteria: '性别 = 女性',
      userCount: 4500,
      status: '活跃',
      creator: '赵六',
      createTime: '2024-01-05',
      lastUpdate: '2024-01-12',
    },
    {
      key: '5',
      name: '一线城市用户',
      description: '居住在一线城市的用户',
      criteria: '城市 IN (北京, 上海, 广州, 深圳)',
      userCount: 2800,
      status: '活跃',
      creator: '钱七',
      createTime: '2024-01-03',
      lastUpdate: '2024-01-10',
    },
  ];

  const columns = [
    {
      title: '分群名称',
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
      title: '筛选条件',
      dataIndex: 'criteria',
      key: 'criteria',
      ellipsis: true,
      render: (criteria) => (
        <Tag
          color="blue"
          style={{
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {criteria}
        </Tag>
      ),
    },
    {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount',
      sorter: (a, b) => a.userCount - b.userCount,
      render: (count) => count.toLocaleString(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color="green">{status}</Tag>,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<EyeOutlined />}>
            查看
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const filteredSegments = segments.filter(
    (segment) =>
      segment.name.toLowerCase().includes(searchText.toLowerCase()) ||
      segment.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (record) => {
    setEditingSegment(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setEditingSegment(null);
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

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: colorText }}>用户分群管理</h2>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总分群数"
              value={segments.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={segments.reduce((sum, s) => sum + s.userCount, 0)}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="活跃分群"
              value={segments.filter((s) => s.status === '活跃').length}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均用户数"
              value={Math.round(
                segments.reduce((sum, s) => sum + s.userCount, 0) /
                  segments.length
              )}
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
              placeholder="搜索分群名称或描述"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Select placeholder="状态筛选" style={{ width: '100%' }} allowClear>
              <Select.Option value="活跃">活跃</Select.Option>
              <Select.Option value="暂停">暂停</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Select
              placeholder="创建人筛选"
              style={{ width: '100%' }}
              allowClear
            >
              {Array.from(new Set(segments.map((s) => s.creator))).map(
                (creator) => (
                  <Select.Option key={creator} value={creator}>
                    {creator}
                  </Select.Option>
                )
              )}
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
              style={{ width: '100%' }}
            >
              创建分群
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 分群表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredSegments}
          scroll={{ x: 'max-content' }}
          pagination={{
            total: filteredSegments.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          size="middle"
        />
      </Card>

      {/* 创建/编辑分群模态框 */}
      <Modal
        title={editingSegment ? '编辑分群' : '创建分群'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="分群名称"
            rules={[{ required: true, message: '请输入分群名称' }]}
          >
            <Input placeholder="请输入分群名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="分群描述"
            rules={[{ required: true, message: '请输入分群描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入分群描述" />
          </Form.Item>
          <Form.Item
            name="criteria"
            label="筛选条件"
            rules={[{ required: true, message: '请输入筛选条件' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="请输入筛选条件，例如：消费金额 > 1000元 AND 活跃天数 > 30天"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserSegments;
