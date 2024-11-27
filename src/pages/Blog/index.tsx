import { blog, getBlogTags, removeBlog } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel, useNavigate } from '@umijs/max';
import { Button, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param blogId
 */
const handleRemove = async (blogId: number, refreshApi: () => void) => {
  try {
    const { code, message: msg } = await removeBlog({
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

const Blog: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [tagList, setTagList] = useState<API.TagListItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOpBlog, setCurrentOpBlog] = useState<API.BlogListItem>();
  const { addUpdatedBlog } = useModel('Blog.blogModel');
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate('/blog/create', { replace: true });
  };

  const showModal = (entity: API.BlogListItem) => {
    setIsModalOpen(true);
    setCurrentOpBlog(entity);
  };

  const handleEditBlog = (entity: API.BlogListItem) => {
    addUpdatedBlog({
      ...entity,
      tags: entity?.tags?.map((item) => item.id) || [],
    });
    navigate(`/blog/update?id=${entity.id}`, { replace: true });
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.BlogListItem>[] = [
    {
      title: <FormattedMessage id="pages.blog.list.title" defaultMessage="标题" />,
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.blog.list.user" defaultMessage="作者" />,
      dataIndex: 'author',
      hideInSearch: true,
      renderText: (val: string, record) => <span>{record?.user.username}</span>,
    },
    {
      title: <FormattedMessage id="pages.blog.list.published" defaultMessage="是否发布" />,
      dataIndex: 'published',
      hideInSearch: true,
      renderText: (val: boolean) => (val ? '是' : '否'),
    },
    {
      title: <FormattedMessage id="pages.blog.list.tags" defaultMessage="标签" />,
      dataIndex: 'tags',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        options: tagList,
      },
      renderText: (val: { name: string }[]) => val?.map((item) => item.name)?.join('，'),
    },
    {
      title: <FormattedMessage id="pages.blog.list.createdAt" defaultMessage="创建日期" />,
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.blog.list.updatedAt" defaultMessage="更新日期" />,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.blog.list.action" defaultMessage="操作" />,
      dataIndex: 'option',
      width: '150px',
      hideInSearch: true,
      render: (text, entity) => {
        return (
          <div>
            <Button type="link" onClick={() => handleEditBlog(entity)}>
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

  const getBlogList = async (params: {
    tags?: number[];
    title?: string;
    current?: number;
    pageSize?: number;
  }) => {
    const { tags, title, current, pageSize } = params;
    const {
      code,
      data,
      message: msg,
    } = await blog({
      tags,
      title,
      currentPage: current,
      limit: pageSize,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    });
    if (code === 200) {
      return {
        data: data?.items || [],
        total: data?.total || 0,
        success: true,
      };
    } else {
      message.error(msg);
      return {
        success: false,
      };
    }
  };

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

  const handleOk = async () => {
    const { id } = currentOpBlog || {};
    await handleRemove(id!, () => actionRef.current?.reload());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getTagList();
  }, []);

  return (
    <PageContainer>
      <ProTable<API.BlogListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.blog.title',
          defaultMessage: '博客列表',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleCreateBlog}>
            <PlusOutlined /> <FormattedMessage id="pages.blog.add" defaultMessage="添加博客" />
          </Button>,
        ]}
        request={getBlogList}
        columns={columns}
      />
      <Modal title="删除博客" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>确定要删除该博客？</p>
      </Modal>
    </PageContainer>
  );
};

export default Blog;
