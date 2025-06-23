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
} from '@ant-design/icons';
import './wheel.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const WheelGame = () => {
  const [form] = Form.useForm();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPrize, setEditingPrize] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState(50);
  const [autoSpin, setAutoSpin] = useState(false);
  const [spinInterval, setSpinInterval] = useState(null);
  
  // 默认奖项配置
  const [prizes, setPrizes] = useState([
    { 
      id: 1, 
      name: '一等奖', 
      description: 'iPhone 15 Pro', 
      probability: 5, 
      color: '#ff4d4f', 
      type: 'grand',
      status: 'active',
      quantity: 1,
      remaining: 1
    },
    { 
      id: 2, 
      name: '二等奖', 
      description: 'AirPods Pro', 
      probability: 10, 
      color: '#faad14', 
      type: 'major',
      status: 'active',
      quantity: 3,
      remaining: 3
    },
    { 
      id: 3, 
      name: '三等奖', 
      description: '100元优惠券', 
      probability: 20, 
      color: '#52c41a', 
      type: 'minor',
      status: 'active',
      quantity: 10,
      remaining: 10
    },
    { 
      id: 4, 
      name: '四等奖', 
      description: '50元优惠券', 
      probability: 25, 
      color: '#1890ff', 
      type: 'minor',
      status: 'active',
      quantity: 20,
      remaining: 20
    },
    { 
      id: 5, 
      name: '谢谢参与', 
      description: '下次再来', 
      probability: 40, 
      color: '#8c8c8c', 
      type: 'consolation',
      status: 'active',
      quantity: 999,
      remaining: 999
    },
  ]);

  const [spinHistory, setSpinHistory] = useState([]);
  const wheelRef = useRef(null);

  // 计算转盘角度
  const calculateWheelAngles = () => {
    const totalProbability = prizes.filter(p => p.status === 'active').reduce((sum, p) => sum + p.probability, 0);
    let currentAngle = 0;
    
    return prizes.map(prize => {
      if (prize.status !== 'active') return { ...prize, startAngle: 0, endAngle: 0 };
      
      const angle = (prize.probability / totalProbability) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      
      return { ...prize, startAngle, endAngle };
    });
  };

  // 开始转盘
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

    // 计算目标角度
    const wheelAngles = calculateWheelAngles();
    const targetPrize = wheelAngles.find(p => p.id === selectedPrize.id);
    const targetAngle = targetPrize.startAngle + (targetPrize.endAngle - targetPrize.startAngle) / 2;
    
    // 计算旋转角度（多转几圈再停在目标位置）
    const spins = 5 + Math.random() * 3; // 5-8圈
    const finalRotation = currentRotation + (spins * 360) + (360 - targetAngle);
    
    // 动画持续时间
    const duration = 3000 + (spinSpeed * 20); // 3-5秒
    
    // 执行动画
    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
    }

    // 动画结束后处理结果
    setTimeout(() => {
      setIsSpinning(false);
      setCurrentRotation(finalRotation % 360);
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
      }, ...prev.slice(0, 9)]); // 保留最近10条记录
      
      message.success(`恭喜获得：${selectedPrize.name} - ${selectedPrize.description}`);
    }, duration);
  };

  // 自动转盘
  useEffect(() => {
    if (autoSpin && !isSpinning) {
      const interval = setInterval(() => {
        startSpin();
      }, 5000); // 每5秒转一次
      setSpinInterval(interval);
    } else if (!autoSpin && spinInterval) {
      clearInterval(spinInterval);
      setSpinInterval(null);
    }

    return () => {
      if (spinInterval) {
        clearInterval(spinInterval);
      }
    };
  }, [autoSpin, isSpinning]);

  // 添加新奖项
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
    setPrizes(prev => prev.filter(prize => prize.id !== id));
    message.success('奖项已删除');
  };

  // 切换奖项状态
  const handleToggleStatus = (id) => {
    setPrizes(prev => 
      prev.map(prize => 
        prize.id === id 
          ? { ...prize, status: prize.status === 'active' ? 'inactive' : 'active' }
          : prize
      )
    );
  };

  // 保存奖项
  const handleSavePrize = () => {
    form.validateFields().then(values => {
      if (editingPrize) {
        // 编辑现有奖项
        setPrizes(prev => 
          prev.map(prize => 
            prize.id === editingPrize.id 
              ? { ...prize, ...values, remaining: values.quantity }
              : prize
          )
        );
        message.success('奖项已更新');
      } else {
        // 添加新奖项
        const newPrize = {
          id: Date.now(),
          ...values,
          status: 'active',
          remaining: values.quantity,
        };
        setPrizes(prev => [...prev, newPrize]);
        message.success('奖项已添加');
      }
      setIsModalVisible(false);
    });
  };

  // 重置转盘
  const handleResetWheel = () => {
    setCurrentRotation(0);
    setSelectedPrize(null);
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
    message.success('转盘已重置');
  };

  // 复制配置代码
  const handleCopyConfig = () => {
    const config = {
      prizes: prizes,
      settings: {
        spinSpeed,
        autoSpin,
      }
    };
    
    navigator.clipboard.writeText(JSON.stringify(config, null, 2)).then(() => {
      message.success('配置代码已复制到剪贴板');
    });
  };

  // 表格列配置
  const columns = [
    {
      title: '奖项名称',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <Space>
          <div style={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            backgroundColor: record.color 
          }} />
          {name}
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
      render: (probability) => `${probability}%`,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const typeMap = {
          grand: { text: '特等奖', color: 'red' },
          major: { text: '大奖', color: 'orange' },
          minor: { text: '小奖', color: 'green' },
          consolation: { text: '安慰奖', color: 'default' },
        };
        const config = typeMap[type] || { text: type, color: 'default' };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '剩余数量',
      dataIndex: 'remaining',
      key: 'remaining',
      render: (remaining, record) => (
        <Badge 
          count={remaining} 
          showZero 
          style={{ backgroundColor: remaining > 0 ? '#52c41a' : '#ff4d4f' }}
        />
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status === 'active' ? '启用' : '禁用'} 
        />
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEditPrize(record)}
            />
          </Tooltip>
          <Tooltip title={record.status === 'active' ? '禁用' : '启用'}>
            <Button 
              type="text" 
              icon={record.status === 'active' ? <EyeOutlined /> : <PlayCircleOutlined />}
              onClick={() => handleToggleStatus(record.id)}
            />
          </Tooltip>
          <Popconfirm
            title="确定要删除这个奖项吗？"
            onConfirm={() => handleDeletePrize(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const wheelAngles = calculateWheelAngles();

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* 大转盘展示 */}
        <Col span={16}>
          <Card 
            title={
              <Space>
                <Title level={4} style={{ margin: 0 }}>大转盘游戏</Title>
                <Badge count={prizes.filter(p => p.status === 'active').length} />
              </Space>
            }
            extra={
              <Space>
                <Button 
                  type={previewMode ? 'primary' : 'default'}
                  icon={<EyeOutlined />}
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? '退出预览' : '预览模式'}
                </Button>
                <Button 
                  icon={<CopyOutlined />}
                  onClick={handleCopyConfig}
                >
                  复制配置
                </Button>
              </Space>
            }
          >
            {previewMode && (
              <Alert
                message="预览模式"
                description="当前处于预览模式，可以测试转盘效果"
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
            
            {/* 转盘容器 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: 400,
              position: 'relative'
            }}>
              {/* 转盘 */}
              <div 
                ref={wheelRef}
                className="wheel-container"
                style={{
                  transform: `rotate(${currentRotation}deg)`,
                  transition: isSpinning ? 'none' : 'transform 0.1s ease-out',
                }}
              >
                {wheelAngles.map((prize, index) => (
                  <div
                    key={prize.id}
                    className="wheel-segment"
                    style={{
                      transform: `rotate(${prize.startAngle}deg)`,
                      backgroundColor: prize.color,
                      opacity: prize.status === 'active' ? 1 : 0.3,
                    }}
                  >
                    <div className="wheel-text">
                      {prize.name}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 指针 */}
              <div className="wheel-pointer" />
              
              {/* 中心按钮 */}
              <div className="wheel-center">
                <Button
                  type="primary"
                  size="large"
                  icon={<PlayCircleOutlined />}
                  onClick={startSpin}
                  disabled={isSpinning}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSpinning ? '转动中...' : '开始'}
                </Button>
              </div>
            </div>

            {/* 控制面板 */}
            <div className="wheel-controls">
              <Row gutter={16}>
                <Col span={8}>
                  <div>
                    <Text>转盘速度: {spinSpeed}</Text>
                    <Slider
                      min={10}
                      max={100}
                      value={spinSpeed}
                      onChange={setSpinSpeed}
                      style={{ marginTop: 8 }}
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <Text>自动转盘</Text>
                    <div style={{ marginTop: 8 }}>
                      <Switch
                        checked={autoSpin}
                        onChange={setAutoSpin}
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                      />
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={handleResetWheel}
                    block
                  >
                    重置转盘
                  </Button>
                </Col>
              </Row>
            </div>

            {/* 中奖结果 */}
            {selectedPrize && (
              <Alert
                message={`恭喜获得：${selectedPrize.name}`}
                description={selectedPrize.description}
                type="success"
                showIcon
                style={{ marginTop: 16 }}
              />
            )}
          </Card>
        </Col>

        {/* 奖项管理和统计 */}
        <Col span={8}>
          <Row gutter={[0, 16]}>
            {/* 奖项管理 */}
            <Col span={24}>
              <Card
                title="奖项管理"
                extra={
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={handleAddPrize}
                  >
                    添加奖项
                  </Button>
                }
              >
                <Table
                  columns={columns}
                  dataSource={prizes}
                  rowKey="id"
                  pagination={false}
                  size="small"
                  scroll={{ y: 300 }}
                />
              </Card>
            </Col>

            {/* 转盘统计 */}
            <Col span={24}>
              <Card title="转盘统计">
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="wheel-stats">
                      <div className="wheel-stats-number" style={{ color: '#1890ff' }}>
                        {prizes.length}
                      </div>
                      <div className="wheel-stats-label">总奖项数</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="wheel-stats">
                      <div className="wheel-stats-number" style={{ color: '#52c41a' }}>
                        {prizes.filter(p => p.status === 'active').length}
                      </div>
                      <div className="wheel-stats-label">启用奖项</div>
                    </div>
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: 16 }}>
                  <Col span={12}>
                    <div className="wheel-stats">
                      <div className="wheel-stats-number" style={{ color: '#faad14' }}>
                        {prizes.filter(p => p.remaining > 0).length}
                      </div>
                      <div className="wheel-stats-label">有库存奖项</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="wheel-stats">
                      <div className="wheel-stats-number" style={{ color: '#ff4d4f' }}>
                        {spinHistory.length}
                      </div>
                      <div className="wheel-stats-label">今日转盘次数</div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* 转盘历史 */}
            <Col span={24}>
              <Card title="转盘历史" size="small">
                {spinHistory.length === 0 ? (
                  <Text type="secondary">暂无转盘记录</Text>
                ) : (
                  <div style={{ maxHeight: 200, overflow: 'auto' }}>
                    {spinHistory.map(record => (
                      <div key={record.id} style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <Text strong>{record.prize.name}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {record.timestamp}
                          </Text>
                        </div>
                        <Tag color="blue">{record.prize.description}</Tag>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 添加/编辑奖项模态框 */}
      <Modal
        title={editingPrize ? '编辑奖项' : '添加奖项'}
        open={isModalVisible}
        onOk={handleSavePrize}
        onCancel={() => setIsModalVisible(false)}
        okText="保存"
        cancelText="取消"
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ type: 'minor', status: 'active', probability: 10, quantity: 1 }}
        >
          <Form.Item
            name="name"
            label="奖项名称"
            rules={[{ required: true, message: '请输入奖项名称' }]}
          >
            <Input placeholder="例如：一等奖" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="奖项描述"
            rules={[{ required: true, message: '请输入奖项描述' }]}
          >
            <Input placeholder="例如：iPhone 15 Pro" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="probability"
                label="中奖概率 (%)"
                rules={[{ required: true, message: '请输入中奖概率' }]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  style={{ width: '100%' }}
                  placeholder="例如：10"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="奖品数量"
                rules={[{ required: true, message: '请输入奖品数量' }]}
              >
                <InputNumber
                  min={1}
                  style={{ width: '100%' }}
                  placeholder="例如：1"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
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
            <Col span={12}>
              <Form.Item
                name="color"
                label="转盘颜色"
                rules={[{ required: true, message: '请选择转盘颜色' }]}
              >
                <ColorPicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default WheelGame; 