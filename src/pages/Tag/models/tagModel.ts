import { useCallback, useState } from 'react';

interface TagModelState {
  id?: number;
  name?: string;
  typeId?: number;
}
export default function TagModel() {
  const [updatedTag, setUpdatedTag] = useState<TagModelState>({});
  const addUpdatedTag = useCallback((value: TagModelState) => {
    setUpdatedTag((prevValue) => ({ ...prevValue, ...value }));
  }, []);
  return { updatedTag, addUpdatedTag };
}
