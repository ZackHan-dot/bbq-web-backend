import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';
import { useState, useEffect } from 'react';
import zhHans from 'bytemd/locales/zh_Hans.json';
import 'bytemd/dist/index.css';

const plugins = [gfm()];

interface ByteMDEditorProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
}
export const ByteMDEditor = (props: ByteMDEditorProps) => {
  const { id, value: propsValue, onChange } = props;
  const [editorValue, setEditorValue] = useState(propsValue || '');

  useEffect(() => {
    // 当外部传递的 value 发生变化时，更新内部状态
    if (propsValue !== undefined) {
      setEditorValue(propsValue);
    }
  }, [propsValue]);

  const handleEditorValueChange = (value: string) => {
    setEditorValue(value);
    onChange?.(value);
  };

  return (
    <div id={id}>
      <Editor
        value={editorValue}
        plugins={plugins}
        locale={zhHans}
        onChange={handleEditorValueChange}
      />
    </div>
  );
};
