import type { ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import React, { useRef } from 'react';
import { ByteMDEditor } from '../components/Editor';

const BlogCreate: React.FC = () => {
  const formRef = useRef<
    ProFormInstance<{
      title: string;
      slug: string;
      description: string;
      published: boolean;
      tags: string[];
      content: string;
      coverLink?: string;
    }>
  >();
  return (
    <PageContainer>
      <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 6 }}>
        <ProForm<{
          title: string;
          slug: string;
          description: string;
          published: boolean;
          tags: string[];
          content: string;
          coverLink?: string;
        }>
          onFinish={async (values) => {
            console.log(values);
          }}
          formRef={formRef}
          formKey="create-blog-form"
          request={async () => {
            return {};
          }}
          autoFocusFirstInput
        >
          <ProFormText colProps={{ span: 24 }} name="title" label="标题" />
          <ProFormText colProps={{ span: 24 }} name="slug" label="slug" />
          <ProFormTextArea colProps={{ span: 24 }} name="description" label="描述" />
          <ProFormTextArea colProps={{ span: 24 }} name="coverLink" label="封面链接" />
          <ProFormSwitch colProps={{ span: 24 }} name="published" label="是否发布" />
          <ProFormSelect colProps={{ span: 24 }} name="tags" label="标签" options={[]} />
          <Form.Item name="content" label="内容" valuePropName="value">
            <ByteMDEditor />
          </Form.Item>
        </ProForm>
      </div>
    </PageContainer>
  );
};

export default BlogCreate;
