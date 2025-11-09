import { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Tag, message, Spin } from 'antd';
import { PlayCircleOutlined, StopOutlined, DatabaseOutlined } from '@ant-design/icons';
import { themeService } from '../services/themeService';
import { Theme, ThemeStatus } from '../types';

const HomePage = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [activatingTheme, setActivatingTheme] = useState<string | null>(null);

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = async () => {
    setLoading(true);
    try {
      const response = await themeService.getAllThemes();
      if (response.success && response.data) {
        setThemes(response.data);
      } else {
        message.error(response.error || '加载主题失败');
      }
    } catch (error) {
      message.error('加载主题失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (themeId: string) => {
    setActivatingTheme(themeId);
    try {
      const response = await themeService.activateTheme(themeId);
      if (response.success) {
        message.success('主题激活成功');
        loadThemes();
      } else {
        message.error(response.error || '主题激活失败');
      }
    } catch (error) {
      message.error('主题激活失败');
      console.error(error);
    } finally {
      setActivatingTheme(null);
    }
  };

  const handleDeactivate = async (themeId: string) => {
    setActivatingTheme(themeId);
    try {
      const response = await themeService.deactivateTheme(themeId);
      if (response.success) {
        message.success('主题已停用');
        loadThemes();
      } else {
        message.error(response.error || '主题停用失败');
      }
    } catch (error) {
      message.error('主题停用失败');
      console.error(error);
    } finally {
      setActivatingTheme(null);
    }
  };

  const getStatusTag = (status: ThemeStatus) => {
    const statusConfig: Record<ThemeStatus, { color: string; text: string }> = {
      [ThemeStatus.NOT_ACTIVATED]: { color: 'default', text: '未激活' },
      [ThemeStatus.ACTIVATING]: { color: 'processing', text: '激活中' },
      [ThemeStatus.RUNNING]: { color: 'success', text: '运行中' },
      [ThemeStatus.STOPPING]: { color: 'warning', text: '停用中' },
      [ThemeStatus.STOPPED]: { color: 'default', text: '已停用' },
      [ThemeStatus.ERROR]: { color: 'error', text: '错误' },
    };

    const config = statusConfig[status];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const getActionButton = (theme: Theme) => {
    const isActivating = activatingTheme === theme.id;

    if (theme.status === ThemeStatus.RUNNING) {
      return (
        <Button
          danger
          icon={<StopOutlined />}
          onClick={() => handleDeactivate(theme.id)}
          loading={isActivating}
        >
          停用
        </Button>
      );
    }

    if (theme.status === ThemeStatus.NOT_ACTIVATED || theme.status === ThemeStatus.STOPPED) {
      return (
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          onClick={() => handleActivate(theme.id)}
          loading={isActivating}
        >
          激活
        </Button>
      );
    }

    return (
      <Button disabled loading>
        {theme.status === ThemeStatus.ACTIVATING ? '激活中...' : '停用中...'}
      </Button>
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>
        <DatabaseOutlined style={{ marginRight: '8px' }} />
        主题市场
      </h1>
      <p style={{ marginBottom: '24px', color: '#666' }}>
        选择一个主题开始学习，激活主题将自动在Kubernetes中部署所需的环境。
      </p>

      <Row gutter={[16, 16]}>
        {themes.map((theme) => (
          <Col xs={24} sm={12} md={8} lg={6} key={theme.id}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {theme.icon && <span style={{ fontSize: '20px' }}>{theme.icon}</span>}
                  <span>{theme.name}</span>
                </div>
              }
              extra={getStatusTag(theme.status)}
              actions={[getActionButton(theme)]}
            >
              <p style={{ minHeight: '60px', marginBottom: '12px' }}>{theme.description}</p>
              <div style={{ fontSize: '12px', color: '#999' }}>
                <div>分类: {theme.category}</div>
                <div>版本: {theme.version}</div>
                {theme.status === ThemeStatus.ERROR && theme.errorMessage && (
                  <div style={{ color: 'red', marginTop: '8px' }}>错误: {theme.errorMessage}</div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {themes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
          暂无可用主题
        </div>
      )}
    </div>
  );
};

export default HomePage;
