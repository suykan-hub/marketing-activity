import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Form,
  Space,
  Typography,
  Divider,
  Tag,
  Badge,
  Alert,
  message,
  Modal,
  Table,
  Tooltip,
  Popconfirm,
  ColorPicker,
  InputNumber,
  Switch,
  Slider,
  Progress,
  Statistic,
} from 'antd';
import {
  PlayCircleOutlined,
  SettingOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CopyOutlined,
  SaveOutlined,
  ReloadOutlined,
  TrophyOutlined,
  GiftOutlined,
  StarOutlined,
  FireOutlined,
  HeartOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import './nineGrid.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const NineGridLottery = () => {
  const [form] = Form.useForm();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPrize, setEditingPrize] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(100);
  const [autoSpin, setAutoSpin] = useState(false);
  const [spinInterval, setSpinInterval] = useState(null);
  const [spinCount, setSpinCount] = useState(0);
  const [totalSpins, setTotalSpins] = useState(0);
  
  // 默认奖项配置（9个格子）
  const [prizes, setPrizes] = useState([
    { 
      id: 1, 
      name: '一等奖', 
      description: 'iPhone 15 Pro', 
      probability: 2, 
      color: '#ff4d4f', 
      type: 'grand',
      status: 'active',
      quantity: 1,
      remaining: 1,
      icon: <CrownOutlined />
    },
    { 
      id: 2, 
      name: '二等奖', 
      description: 'AirPods Pro', 
      probability: 5, 
      color: '#faad14', 
      type: 'major',
      status: 'active',
      quantity: 3,
      remaining: 3,
      icon: <TrophyOutlined />
    },
    { 
      id: 3, 
      name: '三等奖', 
      description: '100元优惠券', 
      probability: 10, 
      color: '#52c41a', 
      type: 'minor',
      status: 'active',
      quantity: 10,
      remaining: 10,
      icon: <GiftOutlined />
    },
    { 
      id: 4, 
      name: '四等奖', 
      description: '50元优惠券', 
      probability: 15, 
      color: '#1890ff', 
      type: 'minor',
      status: 'active',
      quantity: 20,
      remaining: 20,
      icon: <StarOutlined />
    },
    { 
      id: 5, 
      name: '五等奖', 
      description: '20元优惠券', 
      probability: 20, 
      color: '#722ed1', 
      type: 'minor',
      status: 'active',
      quantity: 50,
      remaining: 50,
      icon: <HeartOutlined />
    },
    { 
      id: 6, 
      name: '六等奖', 
      description: '10元优惠券', 
      probability: 25, 
      color: '#13c2c2', 
      type: 'minor',
      status: 'active',
      quantity: 100,
      remaining: 100,
      icon: <FireOutlined />
    },
    { 
      id: 7, 
      name: '七等奖', 
      description: '5元优惠券', 
      probability: 30, 
      color: '#eb2f96', 
      type: 'minor',
      status: 'active',
      quantity: 200,
      remaining: 200,
      icon: <GiftOutlined />
    },
    { 
      id: 8, 
      name: '八等奖', 
      description: '2元优惠券', 
      probability: 35, 
      color: '#fa8c16', 
      type: 'minor',
      status: 'active',
      quantity: 500,
      remaining: 500,
      icon: <StarOutlined />
    },
    { 
      id: 9, 
      name: '谢谢参与', 
      description: '下次再来', 
      probability: 58, 
      color: '#8c8c8c', 
      type: 'consolation',
      status: 'active',
      quantity: 999,
      remaining: 999,
      icon: <HeartOutlined />
    },
  ]);

  const [spinHistory, setSpinHistory] = useState([]);
  const [animationPath, setAnimationPath] = useState([]);
  const gridRef = useRef(null);

  // 九宫格路径（顺时针）
  const gridPath = [0, 1, 2, 5, 8, 7, 6, 3];

  // 开始抽奖
  const startSpin = () => {
    if (isSpinning) return;
    
    const activePrizes = prizes.filter(p => p.status === 'active' && p.remaining > 0);
    if (activePrizes.length === 0) {
      message.error('没有可用的奖项！');
      return;
    }

    setIsSpinning(true);
    setSelectedPrize(null);

    // 根据概率随机选择奖项
    const totalProbability = activePrizes.reduce((sum, p) => sum + p.probability, 0);
    let random = Math.random() * totalProbability;
    let selectedPrize = null;
    
    for (const prize of activePrizes) {
      random -= prize.probability;
      if (random <= 0) {
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
    
    setAnimationPath(path);
    
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
        
        // 更新奖项剩余数量
        if (selectedPrize.type !== 'consolation') {
          setPrizes(prev => 
            prev.map(p => 
              p.id === selectedPrize.id 
                ? { ...p, remaining: Math.max(0, p.remaining - 1) }
                : p
            )
          );
        }
        
        // 添加到历史记录
        setSpinHistory(prev => [{
          id: Date.now(),
          prize: selectedPrize,
          timestamp: new Date().toLocaleString(),
          type: selectedPrize.type
        }, ...prev.slice(0, 49)]); // 保留最近50条记录
        
        setSpinCount(prev => prev + 1);
        setTotalSpins(prev => prev + 1);
        
        // 显示中奖消息
        if (selectedPrize.type === 'consolation') {
          message.info(`很遗憾，${selectedPrize.description}`);
        } else {
          message.success(`恭喜您获得${selectedPrize.name}：${selectedPrize.description}！`);
        }
      }
    }, spinSpeed);

    return () => clearInterval(stepInterval);
  };

  // 停止自动抽奖
  const stopAutoSpin = () => {
    if (spinInterval) {
      clearInterval(spinInterval);
      setSpinInterval(null);
    }
    setAutoSpin(false);
  };

  // 开始自动抽奖
  const startAutoSpin = () => {
    if (autoSpin) return;
    
    setAutoSpin(true);
    const interval = setInterval(() => {
      startSpin();
    }, 3000); // 每3秒抽一次
    
    setSpinInterval(interval);
  };

  // 添加奖项
  const handleAddPrize = () => {
    setEditingPrize(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 编辑奖项
  const handleEditPrize = (record) => {
    setEditingPrize(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // 删除奖项
  const handleDeletePrize = (id) => {
    setPrizes(prev => prev.filter(p => p.id !== id));
    message.success('奖项删除成功');
  };

  // 切换奖项状态
  const handleToggleStatus = (id) => {
    setPrizes(prev => 
      prev.map(p => 
        p.id === id 
          ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
          : p
      )
    );
  };

  // 保存奖项
  const handleSavePrize = () => {
    form.validateFields().then(values => {
      if (editingPrize) {
        setPrizes(prev => 
          prev.map(p => 
            p.id === editingPrize.id 
              ? { ...p, ...values }
              : p
          )
        );
        message.success('奖项更新成功');
      } else {
        const newPrize = {
          ...values,
          id: Date.now(),
          status: 'active',
          remaining: values.quantity,
          icon: <GiftOutlined />
        };
        setPrizes(prev => [...prev, newPrize]);
        message.success('奖项添加成功');
      }
      setIsModalVisible(false);
    });
  };

  // 重置抽奖
  const handleResetLottery = () => {
    setPrizes(prev => 
      prev.map(p => ({ ...p, remaining: p.quantity }))
    );
    setSpinHistory([]);
    setSpinCount(0);
    setTotalSpins(0);
    setCurrentIndex(0);
    message.success('抽奖已重置');
  };

  // 复制配置
  const handleCopyConfig = () => {
    const config = {
      prizes: prizes,
      settings: {
        spinSpeed,
        autoSpin
      }
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    message.success('配置已复制到剪贴板');
  };

  // 奖项表格列配置
  const columns = [
    {
      title: '奖项',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <span style={{ color: record.color }}>{record.icon}</span>
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '概率',
      dataIndex: 'probability',
      key: 'probability',
      render: (value) => `${value}%`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '剩余',
      dataIndex: 'remaining',
      key: 'remaining',
      render: (value, record) => (
        <Badge 
          count={value} 
          color={value > 0 ? 'green' : 'red'}
          showZero
        />
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEditPrize(record)}
          />
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleToggleStatus(record.id)}
          />
          <Popconfirm
            title="确定要删除这个奖项吗？"
            onConfirm={() => handleDeletePrize(record.id)}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 渲染九宫格
  const renderGrid = () => {
    return (
      <div className="nine-grid-container">
        <div className="nine-grid">
          {prizes.map((prize, index) => (
            <div
              key={prize.id}
              className={`grid-item ${currentIndex === index ? 'active' : ''} ${prize.status === 'inactive' ? 'disabled' : ''}`}
              style={{
                backgroundColor: prize.color,
                opacity: prize.status === 'inactive' ? 0.5 : 1,
              }}
            >
              <div className="prize-icon">{prize.icon}</div>
              <div className="prize-name">{prize.name}</div>
              <div className="prize-desc">{prize.description}</div>
              {prize.remaining > 0 && (
                <div className="prize-count">{prize.remaining}</div>
              )}
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
                <span>九宫抽奖活动</span>
                <Tag color="blue">进行中</Tag>
              </Space>
            }
            extra={
              <Space>
                <Button
                  icon={<SettingOutlined />}
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? '编辑模式' : '预览模式'}
                </Button>
                <Button icon={<CopyOutlined />} onClick={handleCopyConfig}>
                  复制配置
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleResetLottery}>
                  重置
                </Button>
              </Space>
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
                  title="剩余奖项"
                  value={prizes.filter(p => p.remaining > 0).length}
                  prefix={<GiftOutlined />}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title="抽奖设置" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text>抽奖速度</Text>
                <Slider
                  min={50}
                  max={200}
                  value={spinSpeed}
                  onChange={setSpinSpeed}
                  marks={{
                    50: '慢',
                    100: '正常',
                    200: '快'
                  }}
                />
              </div>
              
              <div>
                <Text>自动抽奖</Text>
                <Switch
                  checked={autoSpin}
                  onChange={autoSpin ? stopAutoSpin : startAutoSpin}
                />
              </div>
              
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddPrize}
                block
              >
                添加奖项
              </Button>
            </Space>
          </Card>
          
          <Card title="最近抽奖记录" size="small" style={{ marginTop: 16 }}>
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {spinHistory.slice(0, 10).map((record) => (
                <div key={record.id} style={{ marginBottom: 8 }}>
                  <Space>
                    <span style={{ color: record.prize.color }}>
                      {record.prize.icon}
                    </span>
                    <Text>{record.prize.name}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {record.timestamp}
                    </Text>
                  </Space>
                </div>
              ))}
              {spinHistory.length === 0 && (
                <Text type="secondary">暂无抽奖记录</Text>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="奖项管理" style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={prizes}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </Card>

      {/* 奖项编辑弹窗 */}
      <Modal
        title={editingPrize ? '编辑奖项' : '添加奖项'}
        open={isModalVisible}
        onOk={handleSavePrize}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="奖项名称"
                rules={[{ required: true, message: '请输入奖项名称' }]}
              >
                <Input placeholder="如：一等奖" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="奖项类型"
                rules={[{ required: true, message: '请选择奖项类型' }]}
              >
                <Select placeholder="选择奖项类型">
                  <Option value="grand">特等奖</Option>
                  <Option value="major">大奖</Option>
                  <Option value="minor">小奖</Option>
                  <Option value="consolation">安慰奖</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="description"
            label="奖项描述"
            rules={[{ required: true, message: '请输入奖项描述' }]}
          >
            <Input placeholder="如：iPhone 15 Pro" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="probability"
                label="中奖概率(%)"
                rules={[{ required: true, message: '请输入中奖概率' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder="如：5"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="quantity"
                label="奖品数量"
                rules={[{ required: true, message: '请输入奖品数量' }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: '100%' }}
                  placeholder="如：10"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="color"
                label="背景颜色"
                rules={[{ required: true, message: '请选择背景颜色' }]}
              >
                <ColorPicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 中奖结果弹窗 */}
      <Modal
        title="恭喜中奖！"
        open={!!selectedPrize}
        onOk={() => setSelectedPrize(null)}
        onCancel={() => setSelectedPrize(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedPrize(null)}>
            关闭
          </Button>
        ]}
      >
        {selectedPrize && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, color: selectedPrize.color, marginBottom: 16 }}>
              {selectedPrize.icon}
            </div>
            <Title level={3} style={{ color: selectedPrize.color }}>
              {selectedPrize.name}
            </Title>
            <Paragraph>{selectedPrize.description}</Paragraph>
            {selectedPrize.type !== 'consolation' && (
              <Alert
                message="奖品将在24小时内发放到您的账户"
                type="success"
                showIcon
              />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NineGridLottery; 