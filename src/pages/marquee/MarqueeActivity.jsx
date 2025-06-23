import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Slider,
  Switch,
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
} from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  SettingOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CopyOutlined,
  SaveOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import './marquee.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const MarqueeActivity = () => {
  const [form] = Form.useForm();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(50);
  const [isVisible, setIsVisible] = useState(true);
  const [marqueeItems, setMarqueeItems] = useState([
    { id: 1, text: '🎉 限时优惠！全场商品8折起，快来抢购吧！', status: 'active', priority: 1 },
    { id: 2, text: '🔥 新用户注册即送100积分，立即体验！', status: 'active', priority: 2 },
    { id: 3, text: '📱 下载APP，享受专属优惠券！', status: 'paused', priority: 3 },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  // 跑马灯容器引用
  const marqueeRef = useRef(null);

  // 模拟跑马灯动画
  useEffect(() => {
    if (!isPlaying || !isVisible) return;

    const interval = setInterval(() => {
      if (marqueeRef.current) {
        const container = marqueeRef.current;
        const scrollAmount = 1;
        container.scrollLeft += scrollAmount;
        
        // 当滚动到末尾时，重置到开始位置
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
    }, 100 - currentSpeed); // 速度越快，间隔越短

    return () => clearInterval(interval);
  }, [isPlaying, isVisible, currentSpeed]);

  // 处理播放/暂停
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    message.success(isPlaying ? '跑马灯已暂停' : '跑马灯已开始播放');
  };

  // 处理速度变化
  const handleSpeedChange = (value) => {
    setCurrentSpeed(value);
  };

  // 处理可见性切换
  const handleVisibilityChange = (checked) => {
    setIsVisible(checked);
    message.success(checked ? '跑马灯已显示' : '跑马灯已隐藏');
  };

  // 添加新的跑马灯项目
  const handleAddItem = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 编辑跑马灯项目
  const handleEditItem = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // 删除跑马灯项目
  const handleDeleteItem = (id) => {
    setMarqueeItems(prev => prev.filter(item => item.id !== id));
    message.success('跑马灯项目已删除');
  };

  // 切换项目状态
  const handleToggleStatus = (id) => {
    setMarqueeItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'active' ? 'paused' : 'active' }
          : item
      )
    );
  };

  // 保存跑马灯项目
  const handleSaveItem = () => {
    form.validateFields().then(values => {
      if (editingItem) {
        // 编辑现有项目
        setMarqueeItems(prev => 
          prev.map(item => 
            item.id === editingItem.id 
              ? { ...item, ...values }
              : item
          )
        );
        message.success('跑马灯项目已更新');
      } else {
        // 添加新项目
        const newItem = {
          id: Date.now(),
          ...values,
          status: 'active',
        };
        setMarqueeItems(prev => [...prev, newItem]);
        message.success('跑马灯项目已添加');
      }
      setIsModalVisible(false);
    });
  };

  // 复制跑马灯代码
  const handleCopyCode = () => {
    const code = `<div class="marquee-container" style="overflow: hidden; white-space: nowrap;">
  <div class="marquee-content" style="display: inline-block; animation: marquee ${100 - currentSpeed}s linear infinite;">
    ${marqueeItems.filter(item => item.status === 'active').map(item => item.text).join(' | ')}
  </div>
</div>`;
    
    navigator.clipboard.writeText(code).then(() => {
      message.success('跑马灯代码已复制到剪贴板');
    });
  };

  // 表格列配置
  const columns = [
    {
      title: '内容',
      dataIndex: 'text',
      key: 'text',
      render: (text) => (
        <div style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'default'} 
          text={status === 'active' ? '活跃' : '暂停'} 
        />
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => <Tag color="blue">{priority}</Tag>,
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
              onClick={() => handleEditItem(record)}
            />
          </Tooltip>
          <Tooltip title={record.status === 'active' ? '暂停' : '激活'}>
            <Button 
              type="text" 
              icon={record.status === 'active' ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
              onClick={() => handleToggleStatus(record.id)}
            />
          </Tooltip>
          <Popconfirm
            title="确定要删除这个跑马灯项目吗？"
            onConfirm={() => handleDeleteItem(record.id)}
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

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        {/* 跑马灯预览 */}
        <Col span={24}>
          <Card 
            title={
              <Space>
                <Title level={4} style={{ margin: 0 }}>跑马灯营销活动</Title>
                <Badge count={marqueeItems.filter(item => item.status === 'active').length} />
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
                  onClick={handleCopyCode}
                >
                  复制代码
                </Button>
              </Space>
            }
          >
            {previewMode && (
              <Alert
                message="预览模式"
                description="当前处于预览模式，可以实时查看跑马灯效果"
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
            
            {/* 跑马灯展示区域 */}
            <div 
              ref={marqueeRef}
              className="marquee-preview"
              style={{
                opacity: isVisible ? 1 : 0.3,
                marginBottom: 16,
              }}
            >
              <div
                className="marquee-content"
                style={{
                  animationDuration: `${100 - currentSpeed}s`,
                  animationPlayState: isPlaying ? 'running' : 'paused',
                }}
              >
                {marqueeItems
                  .filter(item => item.status === 'active')
                  .map(item => item.text)
                  .join(' | ')}
              </div>
            </div>

            {/* 控制面板 */}
            <div className="marquee-controls">
              <Row gutter={16}>
                <Col span={6}>
                  <Button
                    type={isPlaying ? 'default' : 'primary'}
                    icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                    onClick={handlePlayPause}
                    block
                  >
                    {isPlaying ? '暂停' : '播放'}
                  </Button>
                </Col>
                <Col span={6}>
                  <div>
                    <Text>速度: {currentSpeed}</Text>
                    <Slider
                      min={10}
                      max={90}
                      value={currentSpeed}
                      onChange={handleSpeedChange}
                      style={{ marginTop: 8 }}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div>
                    <Text>显示状态</Text>
                    <div style={{ marginTop: 8 }}>
                      <Switch
                        checked={isVisible}
                        onChange={handleVisibilityChange}
                        checkedChildren="显示"
                        unCheckedChildren="隐藏"
                      />
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      setIsPlaying(false);
                      setTimeout(() => setIsPlaying(true), 100);
                    }}
                    block
                  >
                    重置
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* 跑马灯项目管理 */}
        <Col span={24}>
          <Card
            title="跑马灯项目管理"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddItem}
              >
                添加项目
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={marqueeItems}
              rowKey="id"
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* 活动统计 */}
        <Col span={12}>
          <Card title="活动统计">
            <Row gutter={16}>
              <Col span={12}>
                <div className="marquee-stats">
                  <div className="marquee-stats-number" style={{ color: '#1890ff' }}>
                    {marqueeItems.length}
                  </div>
                  <div className="marquee-stats-label">总项目数</div>
                </div>
              </Col>
              <Col span={12}>
                <div className="marquee-stats">
                  <div className="marquee-stats-number" style={{ color: '#52c41a' }}>
                    {marqueeItems.filter(item => item.status === 'active').length}
                  </div>
                  <div className="marquee-stats-label">活跃项目</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* 使用说明 */}
        <Col span={12}>
          <Card title="使用说明">
            <Paragraph>
              <ul>
                <li>跑马灯会自动循环播放所有活跃状态的项目</li>
                <li>可以通过优先级调整项目的显示顺序</li>
                <li>支持暂停/激活单个项目</li>
                <li>可以调整播放速度和显示状态</li>
                <li>复制代码可以集成到其他页面</li>
              </ul>
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* 添加/编辑跑马灯项目模态框 */}
      <Modal
        title={editingItem ? '编辑跑马灯项目' : '添加跑马灯项目'}
        open={isModalVisible}
        onOk={handleSaveItem}
        onCancel={() => setIsModalVisible(false)}
        okText="保存"
        cancelText="取消"
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ priority: 1, status: 'active' }}
        >
          <Form.Item
            name="text"
            label="跑马灯内容"
            rules={[{ required: true, message: '请输入跑马灯内容' }]}
          >
            <TextArea
              rows={3}
              placeholder="请输入要显示的跑马灯内容，支持emoji表情"
              maxLength={200}
              showCount
            />
          </Form.Item>
          
          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select placeholder="选择优先级">
              <Option value={1}>高优先级</Option>
              <Option value={2}>中优先级</Option>
              <Option value={3}>低优先级</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="选择状态">
              <Option value="active">活跃</Option>
              <Option value="paused">暂停</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MarqueeActivity; 