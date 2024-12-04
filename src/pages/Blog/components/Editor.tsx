import { Editor } from '@bytemd/react';
import { useState, useEffect } from 'react';
import gfm from '@bytemd/plugin-gfm';
import math from '@bytemd/plugin-math-ssr';
import highlight from '@bytemd/plugin-highlight-ssr';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import zhHans from 'bytemd/locales/zh_Hans.json';
import 'highlight.js/styles/default.css';
import 'bytemd/dist/index.css';
import 'katex/dist/katex.css';
import 'juejin-markdown-themes/dist/juejin.min.css';
const plugins = [gfm(), highlight(), math(), breaks(), frontmatter(), gemoji()];

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
