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
  DatePicker,
  InputNumber,
  theme,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TrophyOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const { RangePicker } = DatePicker;

const ContestList = () => {
  const {
    token: { colorText },
  } = theme.useToken();

  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingContest, setEditingContest] = useState(null);
  const [form] = Form.useForm();

  // 模拟数据
  const contests = [
    {
      key: '1',
      name: '新年抽奖大赛',
      description: '新年期间的大型抽奖活动，奖品丰厚',
      type: '抽奖',
      status: '进行中',
      participants: 1250,
      maxParticipants: 2000,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      prize: 'iPhone 15',
      budget: 8000,
      creator: '张三',
      createTime: '2024-01-10',
    },
    {
      key: '2',
      name: '摄影作品征集',
      description: '征集用户摄影作品，评选最佳作品',
      type: '征集',
      status: '已完成',
      participants: 320,
      maxParticipants: 500,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      prize: '专业相机',
      budget: 5000,
      creator: '李四',
      createTime: '2023-12-25',
    },
    {
      key: '3',
      name: '知识问答挑战',
      description: '在线知识问答，测试用户知识水平',
      type: '问答',
      status: '进行中',
      participants: 890,
      maxParticipants: 1000,
      startDate: '2024-01-08',
      endDate: '2024-02-08',
      prize: 'iPad',
      budget: 3000,
      creator: '王五',
      createTime: '2024-01-05',
    },
    {
      key: '4',
      name: '创意设计大赛',
      description: '征集创意设计作品，展示用户创意',
      type: '设计',
      status: '计划中',
      participants: 0,
      maxParticipants: 300,
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      prize: 'MacBook',
      budget: 12000,
      creator: '赵六',
      createTime: '2024-01-20',
    },
    {
      key: '5',
      name: '短视频创作赛',
      description: '短视频创作比赛，展示用户创意',
      type: '视频',
      status: '已结束',
      participants: 450,
      maxParticipants: 600,
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      prize: 'GoPro相机',
      budget: 4000,
      creator: '钱七',
      createTime: '2023-11-25',
    },
  ];

  const columns = [
    {
      title: '竞赛名称',
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
        const colorMap = {
          抽奖: 'blue',
          征集: 'green',
          问答: 'orange',
          设计: 'purple',
          视频: 'cyan',
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
          进行中: 'green',
          已完成: 'blue',
          已结束: 'default',
          计划中: 'orange',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '参与人数',
      dataIndex: 'participants',
      key: 'participants',
      render: (participants, record) =>
        `${participants}/${record.maxParticipants}`,
      sorter: (a, b) => a.participants - b.participants,
    },
    {
      title: '奖品',
      dataIndex: 'prize',
      key: 'prize',
      ellipsis: true,
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => `¥${budget.toLocaleString()}`,
      sorter: (a, b) => a.budget - b.budget,
    },
    {
      title: '时间',
      key: 'time',
      render: (_, record) => (
        <div>
          <div>开始: {record.startDate}</div>
          <div>结束: {record.endDate}</div>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small" icon={<TrophyOutlined />}>
            排行榜
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

  const filteredContests = contests.filter(
    (contest) =>
      contest.name.toLowerCase().includes(searchText.toLowerCase()) ||
      contest.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (record) => {
    setEditingContest(record);
    form.setFieldsValue({
      ...record,
      dateRange: [record.startDate, record.endDate],
    });
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setEditingContest(null);
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

  const totalParticipants = contests.reduce(
    (sum, c) => sum + c.participants,
    0
  );
  const totalBudget = contests.reduce((sum, c) => sum + c.budget, 0);

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: colorText }}>竞赛活动管理</h2>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总竞赛数"
              value={contests.length}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="进行中"
              value={contests.filter((c) => c.status === '进行中').length}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总参与人数"
              value={totalParticipants}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总预算"
              value={totalBudget}
              prefix="¥"
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
              placeholder="搜索竞赛名称或描述"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Select placeholder="类型筛选" style={{ width: '100%' }} allowClear>
              <Select.Option value="抽奖">抽奖</Select.Option>
              <Select.Option value="征集">征集</Select.Option>
              <Select.Option value="问答">问答</Select.Option>
              <Select.Option value="设计">设计</Select.Option>
              <Select.Option value="视频">视频</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Select placeholder="状态筛选" style={{ width: '100%' }} allowClear>
              <Select.Option value="进行中">进行中</Select.Option>
              <Select.Option value="已完成">已完成</Select.Option>
              <Select.Option value="已结束">已结束</Select.Option>
              <Select.Option value="计划中">计划中</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
              style={{ width: '100%' }}
            >
              创建竞赛
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 竞赛表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredContests}
          scroll={{ x: 'max-content' }}
          pagination={{
            total: filteredContests.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          }}
          size="middle"
        />
      </Card>

      {/* 创建/编辑竞赛模态框 */}
      <Modal
        title={editingContest ? '编辑竞赛' : '创建竞赛'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="竞赛名称"
            rules={[{ required: true, message: '请输入竞赛名称' }]}
          >
            <Input placeholder="请输入竞赛名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="竞赛描述"
            rules={[{ required: true, message: '请输入竞赛描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入竞赛描述" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="竞赛类型"
                rules={[{ required: true, message: '请选择竞赛类型' }]}
              >
                <Select placeholder="请选择竞赛类型">
                  <Select.Option value="抽奖">抽奖</Select.Option>
                  <Select.Option value="征集">征集</Select.Option>
                  <Select.Option value="问答">问答</Select.Option>
                  <Select.Option value="设计">设计</Select.Option>
                  <Select.Option value="视频">视频</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Select.Option value="计划中">计划中</Select.Option>
                  <Select.Option value="进行中">进行中</Select.Option>
                  <Select.Option value="已完成">已完成</Select.Option>
                  <Select.Option value="已结束">已结束</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maxParticipants"
                label="最大参与人数"
                rules={[{ required: true, message: '请输入最大参与人数' }]}
              >
                <InputNumber
                  placeholder="请输入最大参与人数"
                  style={{ width: '100%' }}
                  min={1}
                  max={10000}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="budget"
                label="预算"
                rules={[{ required: true, message: '请输入预算' }]}
              >
                <InputNumber
                  placeholder="请输入预算"
                  style={{ width: '100%' }}
                  min={0}
                  max={100000}
                  prefix="¥"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="prize"
            label="奖品"
            rules={[{ required: true, message: '请输入奖品' }]}
          >
            <Input placeholder="请输入奖品" />
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="竞赛时间"
            rules={[{ required: true, message: '请选择竞赛时间' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContestList;
