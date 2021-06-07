import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link
} from 'react-router-dom';
import './index.css'

import IndexDBPage from './demos/indexDB/indexDB'
import SocketPage from './demos/socket'
import CssGridPage from './demos/css/cssGrid'

import { Layout, Menu } from 'antd';
import { useState } from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,

} from '@ant-design/icons';
import { useWindowResized } from '../../contexts/WindowResizeContextProvider';

const { Header, Content, Sider } = Layout;



export default () => {
    const [collapsed, setCollapsed] = useState(true);
    const { isPhoneClient } = useWindowResized();

    const siderComp = collapsed ? '' : (
        <Sider theme='light' trigger={null} collapsible collapsed={collapsed}
            width={isPhoneClient ? '100%' : null}
        >
            <Menu theme='light' mode={collapsed ? "horizontal" : "vertical"} defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/basic/indexDB'>indexDB</Link></Menu.Item>
                <Menu.Item key="12"><Link to='/basic/socket'>SocketPage</Link></Menu.Item>
                <Menu.Item key="13"><Link to='/basic/cssGridPage'>CssGridPage</Link></Menu.Item>

            </Menu>
        </Sider>
    );


    return <Router>

        <Layout>
            <Header style={{ background: '#fff', borderBottom: '1px solid #ddd', padding: 0 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                })}
                该页面包含基础
            </Header>

            <Layout>
                {
                    isPhoneClient ?
                        <Layout>
                            {siderComp}

                        </Layout> :

                        siderComp
                }
                <Content>
                    <Switch>
                        <Route path='/basic/indexDB' component={IndexDBPage} />
                        <Route path='/basic/socket' component={SocketPage} />
                        <Route path='/basic/cssGridPage' component={CssGridPage} />
                        <Redirect path="/basic" exact to={{ pathname: '/basic/socket' }} />
                    </Switch>
                </Content>
            </Layout>

        </Layout>
    </Router>

}