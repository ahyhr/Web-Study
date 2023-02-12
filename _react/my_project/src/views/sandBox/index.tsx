import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;
import TopHeader from '@/components/TopHeader';
import SideMenu from '@/components/SideMenu';
import './style.scss';

export default function SandBox() {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<div className="sandBox">
			<Layout className="layout">
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<SideMenu collapsed={collapsed} />
				</Sider>
				<Layout>
					<Header className="header">
						<TopHeader collapsed={collapsed} setCollapsed={setCollapsed} />
					</Header>
					<Content className="content">
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}
