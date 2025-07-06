import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import { Select, Space, InputNumber } from 'antd';
import React, { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  min?: number;
  max?: number;
  reward?: number;
  unit?: number;
  rangeType?: number;
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    min: 10,
    max: 10,
    reward: 100,
    unit: 1,
    rangeType: 1,
  },
  {
    id: 624691229,
    min: 10,
    max: 10,
    reward: 40,
    unit: 2,
    rangeType: 2,
  },
];

const Reports: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom'
  );

  const handleUnitChange = (value: number, record: DataSourceType) => {
    const newData = dataSource.map((item) =>
      item.id === record.id ? { ...item, unit: value } : item
    );
    setDataSource(newData);
  };

  const handleTypeChange = (value: number, record: DataSourceType) => {
    const newData = dataSource.map((item) =>
      item.id === record.id ? { ...item, rangeType: value } : item
    );
    setDataSource(newData);
  };

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: (
        <Space align="center">
          <span style={{ lineHeight: '32px' }}>规模区间</span>
          <Select
            options={[
              { label: 'W', value: 1 },
              { label: 'KW', value: 2 },
              { label: 'MW', value: 3 },
            ]}
            value={1}
          />
          <Select
            options={[
              { label: '左含右不含', value: 1 },
              { label: '左不含右含', value: 2 },
              { label: '左右都包含', value: 3 },
            ]}
            value={1}
          />
        </Space>
      ),
      dataIndex: 'min',
      render: (text, record) => (
        <Space align="center">
          <span>{record.min}</span>
          <span>-</span>
          <span>{record.max}</span>
          <Select
            size="small"
            options={[
              { label: 'W', value: 1 },
              { label: 'KW', value: 2 },
              { label: 'MW', value: 3 },
            ]}
            value={record.unit || 1}
            onChange={(value) => handleUnitChange(value, record)}
            style={{ width: 60 }}
          />
          <Select
            size="small"
            options={[
              { label: '左含右不含', value: 1 },
              { label: '左不含右含', value: 2 },
              { label: '左右都包含', value: 3 },
            ]}
            value={record.rangeType || 1}
            onChange={(value) => handleTypeChange(value, record)}
            style={{ width: 80 }}
          />
        </Space>
      ),
      renderFormItem: (schema, config, form) => {
        return (
          <Space>
            <InputNumber
              placeholder="最小值"
              style={{ width: 80 }}
              onChange={(value) => {
                form.setFieldValue('min', value);
              }}
            />
            <span>-</span>
            <InputNumber
              placeholder="最大值"
              style={{ width: 80 }}
              onChange={(value) => {
                form.setFieldValue('max', value);
              }}
            />
            <Select
              size="small"
              options={[
                { label: 'W', value: 1 },
                { label: 'KW', value: 2 },
                { label: 'MW', value: 3 },
              ]}
              style={{ width: 60 }}
              onChange={(value) => {
                form.setFieldValue('unit', value);
              }}
            />
            <Select
              size="small"
              options={[
                { label: '左含右不含', value: 1 },
                { label: '左不含右含', value: 2 },
                { label: '左右都包含', value: 3 },
              ]}
              style={{ width: 80 }}
              onChange={(value) => {
                form.setFieldValue('rangeType', value);
              }}
            />
          </Space>
        );
      },
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },
      width: '40%',
    },
    {
      title: '奖励标准',
      dataIndex: 'reward',
      tooltip: '可编辑，使用form.getFieldValue可以获取到值',
      readonly: false,
      width: '15%',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '复合字段示例',
      dataIndex: 'composite',
      width: '25%',
      render: (text, record) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <span>数量: {record.min || 0}</span>
            <Select
              size="small"
              options={[
                { label: '个', value: 'piece' },
                { label: '件', value: 'item' },
                { label: '套', value: 'set' },
              ]}
              value={record.unit || 1}
              onChange={(value) => handleUnitChange(value, record)}
              style={{ width: 50, marginLeft: 8 }}
            />
          </div>
          <div>
            <span>状态: </span>
            <Select
              size="small"
              options={[
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
              ]}
              value={record.rangeType || 1}
              onChange={(value) => handleTypeChange(value, record)}
              style={{ width: 60 }}
            />
          </div>
        </Space>
      ),
      renderFormItem: (schema, config, form) => {
        return (
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Space>
              <span>数量:</span>
              <InputNumber
                placeholder="数量"
                style={{ width: 80 }}
                onChange={(value) => {
                  form.setFieldValue('min', value);
                }}
              />
              <Select
                size="small"
                options={[
                  { label: '个', value: 'piece' },
                  { label: '件', value: 'item' },
                  { label: '套', value: 'set' },
                ]}
                style={{ width: 50 }}
                onChange={(value) => {
                  form.setFieldValue('unit', value);
                }}
              />
            </Space>
            <Space>
              <span>状态:</span>
              <Select
                size="small"
                options={[
                  { label: '启用', value: 1 },
                  { label: '禁用', value: 0 },
                ]}
                style={{ width: 60 }}
                onChange={(value) => {
                  form.setFieldValue('rangeType', value);
                }}
              />
            </Space>
          </Space>
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        headerTitle="可编辑表格"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={
          position !== 'hidden'
            ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
            : false
        }
        loading={false}
        toolBarRender={() => [
          <ProFormRadio.Group
            key="render"
            fieldProps={{
              value: position,
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
        ]}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" collapsible>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};

export default Reports;
