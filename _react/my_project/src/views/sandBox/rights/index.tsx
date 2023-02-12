import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Switch, message, Modal, Form, Input, Tag, Tooltip, Popconfirm } from 'antd';
const { Column, ColumnGroup } = Table;
import type { ColumnsType } from 'antd/es/table';
import type { FormInstance } from 'antd/es/form';
import './style.scss';
import { getRightsList, updateRights, deleteRight } from '@/api';
import type { IRights } from '@/api/types';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

export default function Rights() {
	const [rightsList, setRightsList] = useState<IRights[] | undefined>([]);
	const [open, setOpen] = useState(false);
	const [right, setRight] = useState<IRights>();
	const [form] = Form.useForm();

	useEffect(() => {
		getList();
	}, []);

	// 获取菜单列表
	const getList = async () => {
		const res = await getRightsList();
		const list = arrayToTree(res.data);
		setRightsList(list);
	};

	/** 转树形结构 */
	function arrayToTree(data: any) {
		const result = [];
		const obj = data.reduce((pre: any, cur: any) => {
			pre[cur.id] = cur;
			return pre;
		}, {});

		for (let item of data) {
			if (item.parent_id === 0) {
				result.push(item);
				continue;
			}
			if (item.parent_id in obj) {
				const parent = obj[item.parent_id];
				parent.children = parent.children || [];
				parent.children.push(item);
			}
		}
		return result;
	}

	// 切换显示状态
	const switchOnChange = async (checked: boolean, id: number) => {
		await updateRights(id, { pagepermisson: checked ? 1 : 0 });
		message.success('修改成功');
		getList();
	};

	// 打开弹窗
	const openModal = async (row: IRights) => {
		form.setFieldsValue(row);
		setRight(row);
		setOpen(true);
	};
	// 删除
	const delRight = async (id: number) => {
		await deleteRight(id);
		message.success('删除成功' + id);
		getList();
	};

	const onFinish = async (values: any) => {
		await updateRights(right?.id as number, values);
		message.success('修改成功');
		setOpen(false);
		getList();
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const columns: ColumnsType<IRights> = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'ID'
		},
		{
			title: '标题',
			dataIndex: 'label',
			key: 'label'
		},
		{
			title: '路径',
			dataIndex: 'key',
			key: 'key',
			render: (key: string) => <Tag color="orange">{key}</Tag>
		},
		{
			title: '是否显示',
			key: 'pagepermisson',
			dataIndex: 'pagepermisson',
			render: (key: number, { id }) => (
				<Switch checked={key === 1 ? true : false} onChange={(checked) => switchOnChange(checked, id)} />
			)
		},
		{
			title: '操作',
			key: '操作',
			render: (key: string, row: IRights) => (
				<Space wrap>
					<Tooltip title="编辑">
						<Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => openModal(row)} />
					</Tooltip>
					<Tooltip title="删除">
						<Popconfirm
							title="删除"
							description="确认要删除?"
							onConfirm={() => delRight(row.id)}
							okText="Yes"
							cancelText="No"
						>
							<Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
						</Popconfirm>
					</Tooltip>
				</Space>
			)
		}
	];

	return (
		<div>
			<Table columns={columns} dataSource={rightsList} />

			{/* 修改弹窗 */}
			<Modal title="编辑" centered open={open} onOk={() => form.submit()} onCancel={() => setOpen(false)} width={1000}>
				<Form
					form={form}
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item label="标题" name="label" rules={[{ required: true, message: 'Please input your username!' }]}>
						<Input value={right?.label} />
					</Form.Item>

					<Form.Item label="路径" name="key" rules={[{ required: true, message: 'Please input your password!' }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
