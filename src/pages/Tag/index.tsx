import { getBlogTags, getTagTypeList, removeTag } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel, useNavigate } from '@umijs/max';
import { Button, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const handleRemove = async (blogId: number, refreshApi: () => void) => {
  try {
    const { code, message: msg } = await removeTag({
      id: blogId,
    });
    if (code === 200) {
      message.success('删除成功');
      refreshApi();
    } else {
      message.error(msg);
    }
  } catch (error) {
    message.error('删除失败，请重试');
  }
};

const Tag: React.FC = () => {
  const [currentOpTag, setCurrentOpTag] = useState<API.TagTableItem>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagTypeList, setTagTypeList] = useState<{ [key: string]: { text: string } }>({});
  const { addUpdatedTag } = useModel('Tag.tagModel');
  const actionRef = useRef<ActionType>(null);
  const navigate = useNavigate();
  const intl = useIntl();

  const handleEditTag = (entity: API.TagTableItem) => {
    addUpdatedTag(entity);
    navigate(`/tag/update?id=${entity.id}`, { replace: true });
  };

  const showModal = (entity: API.TagTableItem) => {
    setIsModalOpen(true);
    setCurrentOpTag(entity);
  };

  const columns: ProColumns<API.TagTableItem>[] = [
    {
      title: <FormattedMessage id="pages.tag.list.id" defaultMessage="标签ID" />,
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.tag.list.name" defaultMessage="标签名称" />,
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.tag.list.tagTypeName" defaultMessage="标签类型" />,
      dataIndex: 'tagTypeId',
      valueType: 'select',
      valueEnum: tagTypeList,
      renderText: (text: string, { tagTypeName }) => tagTypeName,
    },
    {
      title: <FormattedMessage id="pages.tag.list.createdAt" defaultMessage="创建日期" />,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.tag.list.updatedAt" defaultMessage="更新日期" />,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.tag.list.action" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '150px',
      hideInSearch: true,
      render: (text, entity) => {
        return (
          <div>
            <Button type="link" onClick={() => handleEditTag(entity)}>
              编辑
            </Button>
            <Button type="link" onClick={() => showModal(entity)}>
              删除
            </Button>
          </div>
        );
      },
    },
  ];

  const getTagTypes = async () => {
    const { code, data, message: msg } = await getTagTypeList();
    if (code === 200) {
      const tagTypeValueEnum = data.reduce((acc: any, cur: any) => {
        acc[cur.id] = { text: cur.name };
        return acc;
      }, {});
      setTagTypeList(tagTypeValueEnum);
    } else {
      message.error(msg);
    }
  };

  const getTagList = async (params: { name?: string; tagTypeId?: number; keyword?: string }) => {
    const {
      code,
      data,
      message: msg,
    } = await getBlogTags({ name: params.name, tagTypeId: params.tagTypeId });
    if (code === 200) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (item.tagType) {
            item.tagTypeName = item.tagType.name;
          }
        });
      }
      return {
        data: data || [],
        success: true,
      };
    } else {
      message.error(msg);
      return {
        success: false,
      };
    }
  };

  const handleCreateTag = () => {
    navigate('/tag/create', { replace: true });
  };

  const handleOk = async () => {
    const { id } = currentOpTag || {};
    await handleRemove(id!, () => actionRef.current?.reload());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getTagTypes();
  }, []);

  return (
    <PageContainer>
      <ProTable<API.TagTableItem>
        headerTitle={intl.formatMessage({
          id: 'pages.tag.title',
          defaultMessage: '标签列表',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleCreateTag}>
            <PlusOutlined /> <FormattedMessage id="pages.tag.add" defaultMessage="添加标签" />
          </Button>,
        ]}
        request={getTagList}
        columns={columns}
        pagination={false}
      />
      <Modal title="删除标签" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>确定要删除该标签？</p>
      </Modal>
    </PageContainer>
  );
};

export default Tag;
