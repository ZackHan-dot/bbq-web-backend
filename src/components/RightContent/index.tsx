import { HomeOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import { Tooltip } from 'antd';

const { UMI_APP_BLOG_URL } = process.env;

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};

export const JumpToBlog = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open(UMI_APP_BLOG_URL, '_self');
      }}
    >
      <Tooltip title="跳转到博客首页">
        <HomeOutlined />
      </Tooltip>
    </div>
  );
};
