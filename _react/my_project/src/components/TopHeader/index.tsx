import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './style.scss';

export default function TopHeader(props: { collapsed: boolean; setCollapsed: Function }) {
	const { collapsed, setCollapsed } = props;

	return (
		<div className="topHeader">
			{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
				className: 'trigger',
				onClick: () => setCollapsed(!collapsed)
			})}
		</div>
	);
}
