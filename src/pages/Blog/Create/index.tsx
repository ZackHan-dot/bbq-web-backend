import type { ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ByteMDEditor } from '../components/Editor';
import { addBlog, updateBlog, getBlogTags } from '@/services/ant-design-pro/api';
import { useLocation, useModel, useNavigate } from '@umijs/max';
import { parseSearch } from '@/utils/func';

interface formValue {
  title: string;
  slug: string;
  description: string;
  published: boolean;
  tags: number[];
  content: string;
  coverLink?: string;
}

const BlogCreate: React.FC = () => {
  const [tagList, setTagList] = useState<API.TagListItem[]>([]);
  const { initialState } = useModel('@@initialState');
  const { updatedBlog } = useModel('Blog.blogModel');
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const formRef = useRef<
    ProFormInstance<{
      title: string;
      slug: string;
      description: string;
      published: boolean;
      tags: number[];
      content: string;
      coverLink?: string;
    }>
  >();

  const getTagList = async () => {
    const { code, data, message: msg } = await getBlogTags();
    if (code === 200) {
      setTagList(
        data.map((item: { id: number; name: string }) => ({ label: item.name, value: item.id })),
      );
    } else {
      message.error(msg);
    }
  };

  const createBlog = async (values: any) => {
    const { code, message: msg } = await addBlog({
      ...values,
      userId: initialState?.currentUser?.id,
    });
    if (code === 200) {
      message.success('创建成功');
      navigate('/blog', { replace: true });
    } else {
      message.error(msg);
    }
  };

  const doUpdateBlog = async (values: any) => {
    const { id } = parseSearch(location.search);
    const { code, message: msg } = await updateBlog(+id!, {
      ...values,
      userId: initialState?.currentUser?.id,
    });
    if (code === 200) {
      message.success('更新成功');
      navigate('/blog', { replace: true });
    } else {
      message.error(msg);
    }
  };

  useEffect(() => {
    if (location.search) {
      const { title, slug, description, published, tags, content, coverLink } = updatedBlog || {};
      if (formRef.current) {
        formRef.current.setFieldsValue({
          title,
          slug,
          description,
          published,
          tags,
          content,
          coverLink,
        });
      }
      setIsEdit(true);
    }
    getTagList();
  }, [location, updatedBlog, formRef.current]);

  const submit = useCallback(() => {
    return isEdit ? doUpdateBlog : createBlog;
  }, [isEdit]);

  return (
    <PageContainer title={isEdit ? '更新博客' : '创建博客'}>
      <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 6 }}>
        <ProForm<formValue>
          onFinish={submit()}
          formRef={formRef}
          formKey="create-blog-form"
          initialValues={{
            title: '',
            slug: '',
            description: '',
            published: false,
            tags: [],
            content: '',
            coverLink: '',
          }}
          autoFocusFirstInput
        >
          <ProFormText
            colProps={{ span: 24 }}
            name="title"
            label="标题"
            rules={[{ required: true, message: '请填写标题' }]}
          />
          <ProFormText
            colProps={{ span: 24 }}
            name="slug"
            label="slug"
            rules={[{ required: true, message: '请填写slug' }]}
          />
          <ProFormTextArea
            colProps={{ span: 24 }}
            name="description"
            label="描述"
            rules={[{ required: true, message: '请填写描述' }]}
          />
          <ProFormTextArea colProps={{ span: 24 }} name="coverLink" label="封面链接" />
          <ProFormSwitch colProps={{ span: 24 }} name="published" label="是否发布" />
          <ProFormSelect
            colProps={{ span: 24 }}
            name="tags"
            label="标签"
            fieldProps={{ mode: 'multiple', options: tagList }}
            rules={[{ required: true, message: '请选择标签' }]}
          />
          <Form.Item
            name="content"
            label="内容"
            valuePropName="value"
            rules={[{ required: true, message: '请填写内容' }]}
          >
            <ByteMDEditor />
          </Form.Item>
        </ProForm>
      </div>
    </PageContainer>
  );
};

export default BlogCreate;
