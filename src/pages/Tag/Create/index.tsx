import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { addTag, getTagTypeList, updateTag } from '@/services/ant-design-pro/api';
import { message } from 'antd';
import { useLocation, useModel, useNavigate } from '@umijs/max';
import { parseSearch } from '@/utils/func';

interface formValue {
  id: number;
  name: string;
  typeId: number;
}

const TagCreate: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [tagTypeList, setTagTypeList] = useState<{ label: string; value: number }[]>([]);
  const { updatedTag } = useModel('Tag.tagModel');
  const formRef = useRef<ProFormInstance<formValue>>();

  const navigate = useNavigate();
  const location = useLocation();

  const doUpdateTag = async (values: any) => {
    const { id } = parseSearch(location.search);
    const { code, message: msg } = await updateTag(+id!, {
      ...values,
    });
    if (code === 200) {
      message.success('更新成功');
      navigate('/tag', { replace: true });
    } else {
      message.error(msg);
    }
  };

  const createTag = async (values: any) => {
    const { code, message: msg } = await addTag({
      ...values,
    });
    if (code === 200) {
      message.success('创建成功');
      navigate('/tag', { replace: true });
    } else {
      message.error(msg);
    }
  };

  const getTagTypes = async () => {
    const { code, data, message: msg } = await getTagTypeList();
    if (code === 200) {
      setTagTypeList(
        data.map((item: { id: number; name: string }) => ({ label: item.name, value: item.id })),
      );
    } else {
      message.error(msg);
    }
  };

  const submit = useCallback(() => {
    return isEdit ? doUpdateTag : createTag;
  }, [isEdit]);

  useEffect(() => {
    if (location.search) {
      const { name, typeId } = updatedTag || {};
      formRef.current?.setFieldsValue({
        name,
        typeId: +typeId!,
      });
      setIsEdit(true);
    }
    getTagTypes();
  }, []);

  return (
    <PageContainer title={isEdit ? '更新标签' : '创建标签'}>
      <div style={{ background: '#FFFFFF', padding: 16, borderRadius: 6 }}>
        <ProForm<formValue>
          onFinish={submit()}
          formRef={formRef}
          formKey="create-tag-form"
          initialValues={{
            name: '',
            typeId: null,
          }}
          autoFocusFirstInput
        >
          <ProFormText
            colProps={{ span: 24 }}
            name="name"
            label="标签名"
            rules={[{ required: true, message: '请填写标签名' }]}
          />
          <ProFormSelect
            colProps={{ span: 24 }}
            name="typeId"
            label="标签类型"
            fieldProps={{ options: tagTypeList }}
            rules={[{ required: true, message: '请选择标签类型' }]}
          />
        </ProForm>
      </div>
    </PageContainer>
  );
};

export default TagCreate;
