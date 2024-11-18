import { blog, getBlogTags, removeBlog } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useNavigate } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.BlogListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeBlog({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const Blog: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.BlogListItem[]>([]);
  const [tagList, setTagList] = useState<API.TagListItem[]>([]);
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate('/blog/create', { replace: true });
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
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.blog.chosen" defaultMessage="已选择" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.blog.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.blog.batchDeletion" defaultMessage="批量删除" />
          </Button>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default Blog;
