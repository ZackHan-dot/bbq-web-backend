// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?: number;
    username?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type ResponseResult = {
    code?: number;
    data?: any;
    message?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type BlogListItem = {
    id?: number;
    title?: string;
    description?: string;
    published?: boolean;
    user?: any;
    tags: { id: number }[];
    createdAt: Date;
    updatedAt: Date;
    labels?: { name: string; color: string }[];
  };

  type BlogList = {
    code?: number;
    data?: {
      items?: BlogListItem[];
      /** 列表的内容总数 */
      total?: number;
    };
    message?: string;
  };

  type TagListItem = {
    label?: string;
    value?: string;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type TagTableItem = {
    id?: number;
    name?: string;
    icon?: string;
    iconDark?: string;
    tagType?: TagType;
    tagTypeName?: string;
    createdAt: Date;
    updatedAt: Date;
  };

  type TagType = {
    id?: number;
    name?: number;
    createdAt: Date;
  };
}
