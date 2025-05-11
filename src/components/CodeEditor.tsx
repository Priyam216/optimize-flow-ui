
import { Editor } from "@monaco-editor/react";
import { useRef } from "react";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: string;
  height?: string;
}

const CodeEditor = ({ 
  value, 
  onChange, 
  readOnly = false, 
  language = "javascript",
  height = "100%"
}: CodeEditorProps) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="h-full w-full editor-container rounded-md overflow-hidden border border-border">
      <Editor
        height={height}
        language={language}
        value={value}
        theme="vs-dark"
        onChange={(value) => onChange && onChange(value || "")}
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 14,
          lineHeight: 1.5,
          renderLineHighlight: "all",
          padding: { top: 16, bottom: 16 },
          automaticLayout: true,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            verticalHasArrows: true,
            horizontalHasArrows: true,
            verticalScrollbarSize: 12,
            horizontalScrollbarSize: 12
          }
        }}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
