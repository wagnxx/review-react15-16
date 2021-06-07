import React from 'react';
import 'antd/dist/antd.css';
import { Switch, Link, } from 'react-router-dom';
import RoutesRoot from '../routes';

import { Layout, Menu, Breadcrumb } from 'antd';


const { Header, Content, Footer } = Layout;

export default function Dashboard() {

  return (
    <>

      <Layout className="layout">
        <Header
          style={{ zIndex: '999' }}
        >

          <Menu
            theme="dark"
            mode="horizontal"
            // mode="inline"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/login">login</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/product">product</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/manage">manage</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/hooks">hooks</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/RouterTestPage">RouterTestPage</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/CustReduxPage">CustReduxPage</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/SchedulePage">源码&fiber</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/immutable">immutable</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/basic">basic</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            padding: '0 10px',
            height: 'calc(100vh - 88px)',
            overflow: 'scroll',
          }}
        >
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <div style={{ background: '#fff', minHeight: 280 }}>
            <Switch>
              <RoutesRoot />
            </Switch>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
            reactJS系列及周边 ©2021 Created by wangxx
        </Footer>  */}
      </Layout>

    </>




  );
}
