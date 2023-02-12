import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps, MenuTheme } from 'antd';
import { MenuOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { getRightsList, getRightBuyId } from '@/api';
import { IRights } from '@/api/types';

const icons: any = {
	'/home': <MenuOutlined />,
	'/u': <UserOutlined />,
	'/r': <MessageOutlined />
};

export default function SideMenu(props: { collapsed: boolean }) {
	const { collapsed } = props;
	const navigate = useNavigate();

	const [rightsList, setRightsList] = useState<IRights[] | undefined>([]);

	useEffect(() => {
		getList();
	}, []);

	// 获取菜单列表
	const getList = async () => {
		const res = await getRightsList();
		const list = arrayToTree(res.data);

		setRightsList(list);
	};
	function arrayToTree(data: any) {
		const result = [];
		const obj = data.reduce((pre: any, cur: any) => {
			pre[cur.id] = cur;
			return pre;
		}, {});

		for (let item of data) {
			item.icon = icons[item.key];
			if (item.pagepermisson === 0) continue;
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

	const menuClick: MenuProps['onClick'] = ({ key }) => {
		navigate(key);
	};

	return (
		<div className="sideMenu">
			<div className="logo flex-center">{collapsed ? 'React' : 'React-antd'}</div>
			<Menu theme="dark" mode="inline" defaultSelectedKeys={['/home']} onClick={menuClick} items={rightsList} />
		</div>
	);
}
