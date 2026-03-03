'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],
  ],
};

const Editor = ({ value, onChange, placeholder }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      className="bg-white rounded-lg"
      placeholder={placeholder || 'Write your story...'}
    />
  );
};

export default Editor;
