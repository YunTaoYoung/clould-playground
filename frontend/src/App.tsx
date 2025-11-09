import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DatabaseOutlined, HistoryOutlined, SettingOutlined } from '@ant-design/icons';
import HomePage from './pages/HomePage';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginRight: '50px' }}>
            Cloud Playground
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            style={{ flex: 1, minWidth: 0 }}
            items={[
              {
                key: 'home',
                icon: <DatabaseOutlined />,
                label: <Link to="/">主题市场</Link>,
              },
              {
                key: 'history',
                icon: <HistoryOutlined />,
                label: <Link to="/history">练习历史</Link>,
              },
              {
                key: 'settings',
                icon: <SettingOutlined />,
                label: <Link to="/settings">设置</Link>,
              },
            ]}
          />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 16 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 380, borderRadius: 8 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/history"
                element={
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>练习历史</h2>
                    <p>功能开发中...</p>
                  </div>
                }
              />
              <Route
                path="/settings"
                element={
                  <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>设置</h2>
                    <p>功能开发中...</p>
                  </div>
                }
              />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Cloud Playground ©2025 - 技术学习平台
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
