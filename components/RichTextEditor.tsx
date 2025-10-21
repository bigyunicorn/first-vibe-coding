import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EditorButton: React.FC<{ onMouseDown: (e: React.MouseEvent) => void; children: React.ReactNode; title: string }> = ({ onMouseDown, children, title }) => (
  <button
    type="button"
    title={title}
    onMouseDown={onMouseDown}
    className="p-2 text-gray-600 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
  >
    {children}
  </button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // This effect syncs the editor's content with the `value` prop.
  // It only updates the DOM if the `value` prop is different from the editor's current HTML.
  // This prevents React from re-rendering the content on every keystroke, which would
  // reset the cursor position and cause the backward typing issue.
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleCommand = (command: string) => {
    document.execCommand(command, false);
    if (editorRef.current) {
        editorRef.current.focus();
        // After executing a command, the DOM is changed. We need to sync this change
        // back to the parent component's state.
        onChange(editorRef.current.innerHTML);
    }
  };
  
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
      <div className="p-2 bg-gray-100 border-b border-gray-300 flex items-center space-x-2">
        <EditorButton onMouseDown={(e) => {e.preventDefault(); handleCommand('bold')}} title="Bold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" transform="scale(0.8) translate(2,2)" filter="url(#bold-filter)"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></filter><defs><filter id="bold-filter"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></filter></defs><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5h3.5a3.5 3.5 0 0 1 0 7H8V5zm0 7h4.5a3.5 3.5 0 0 1 0 7H8v-7z"></path></svg>
        </EditorButton>
        <EditorButton onMouseDown={(e) => {e.preventDefault(); handleCommand('italic')}} title="Italic">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5L14 19"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19h14"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h14"></path></svg>
        </EditorButton>
        <EditorButton onMouseDown={(e) => {e.preventDefault(); handleCommand('underline')}} title="Underline">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19h14"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5v10a4 4 0 1 0 8 0V5"></path></svg>
        </EditorButton>
        <div className="h-6 w-px bg-gray-300"></div>
        <EditorButton onMouseDown={(e) => {e.preventDefault(); handleCommand('insertUnorderedList')}} title="Bulleted List">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /><circle cx="2" cy="6" r="1" /><circle cx="2" cy="12" r="1" /><circle cx="2" cy="18" r="1" /></svg>
        </EditorButton>
        <EditorButton onMouseDown={(e) => {e.preventDefault(); handleCommand('insertOrderedList')}} title="Numbered List">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" /><text x="3" y="7.5" fontSize="3">1</text><text x="3" y="13.5" fontSize="3">2</text><text x="3" y="19.5" fontSize="3">3</text></svg>
        </EditorButton>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={e => onChange(e.currentTarget.innerHTML)}
        className="prose max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;
