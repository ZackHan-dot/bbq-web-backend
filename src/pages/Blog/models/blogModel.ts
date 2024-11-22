import { useCallback, useState } from 'react';

interface BlogModelState {
  title?: string;
  slug?: string;
  description?: string;
  published?: boolean;
  tags?: number[];
  content?: string;
  coverLink?: string;
}
export default function BlogModel() {
  const [updatedBlog, setUpdatedBlog] = useState<BlogModelState>({});
  const addUpdatedBlog = useCallback((value: BlogModelState) => {
    setUpdatedBlog((prevValue) => ({ ...prevValue, ...value }));
  }, []);

  return { updatedBlog, addUpdatedBlog };
}
