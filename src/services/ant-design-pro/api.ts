// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/users/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/users/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/auth/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/auth/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/Blog */
export async function blog(
  params: {
    // query
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    limit?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.BlogList>('/api/blogs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/blogs/update/:id */
export async function updateBlog(options?: { [key: string]: any }) {
  return request<API.BlogListItem>(`/api/blogs/update/${options?.id}`, {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/blogs/save */
export async function addBlog(options?: { [key: string]: any }) {
  return request<API.BlogListItem>('/api/blogs/save', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/** 删除规则 DELETE /api/blogs/delete */
export async function removeBlog(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/blogs/delete', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
