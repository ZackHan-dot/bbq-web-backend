import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Col, Row } from 'antd';
import React from 'react';
import './Welcome.less';

interface InfoCardProps {
  title?: string;
  slogan?: string;
  style?: React.CSSProperties;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, slogan, style }) => {
  const { initialState } = useModel('@@initialState');
  return (
    <Card
      style={style}
      styles={{
        body: {
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        },
      }}
    >
      {title && <div className="title">{title}</div>}
      {slogan && <div className="slogan">{slogan}</div>}
    </Card>
  );
};

const Welcome: React.FC = () => {
  return (
    <PageContainer className="welcome-page">
      <InfoCard
        title="👏👏👏，你好管理员，欢迎回到博客管理系统"
        slogan="创建、管理并优化你的博客内容吧！"
        style={{ borderRadius: 8 }}
      />
      <Row>
        <Col span={10}>
          <InfoCard
            title="🔥🔥🔥，今日动态"
            style={{ borderRadius: 8, marginTop: 10, minHeight: 400 }}
          />
        </Col>
        <Col span={14}>
          <InfoCard
            title="🔧🔧🔧，快捷操作"
            style={{ borderRadius: 8, marginTop: 10, marginLeft: 10, minHeight: 400 }}
          />
        </Col>
      </Row>
      <InfoCard
        title="📈📈📈，统计分析"
        style={{ borderRadius: 8, marginTop: 10, minHeight: 250 }}
      />
    </PageContainer>
  );
};

export default Welcome;
