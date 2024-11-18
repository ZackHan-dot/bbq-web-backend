import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Col, Row } from 'antd';
import React from 'react';
import './Welcome.less';

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer className="welcome-page">
      <Card
        style={{
          borderRadius: 8,
        }}
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <div className="title">👏👏👏，你好管理员，欢迎回到博客管理系统</div>
        <div className="slogan">创建、管理并优化你的博客内容吧！</div>
      </Card>
      <Row>
        <Col span={10}>
          <Card
            style={{
              borderRadius: 8,
              marginTop: 10,
              minHeight: 400,
            }}
            styles={{
              body: {
                backgroundImage:
                  initialState?.settings?.navTheme === 'realDark'
                    ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                    : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
              },
            }}
          >
            <div className="title">🔥🔥🔥，今日动态</div>
          </Card>
        </Col>
        <Col span={14}>
          <Card
            style={{
              borderRadius: 8,
              marginTop: 10,
              marginLeft: 10,
              minHeight: 400,
            }}
            styles={{
              body: {
                backgroundImage:
                  initialState?.settings?.navTheme === 'realDark'
                    ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                    : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
              },
            }}
          >
            <div className="title">🔧🔧🔧，快捷操作</div>
          </Card>
        </Col>
      </Row>
      <Card
        style={{
          borderRadius: 8,
          marginTop: 10,
          minHeight: 250,
        }}
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <div className="title">📈📈📈，统计分析</div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
