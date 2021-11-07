export default function MarkdownEditor({
  children,
  setEditorText,
  text,
  show,
}) {
  return (
    <div
      className={'markdown-editor box ' + (show ? '' : 'markdown-editor--hide')}
    >
      <div className="markdown-editor__container">
        {children}
        <h2 className="markdown-editor__label has-text-right is-italic has-text-weight-bold has-text-white mb-2">
          Editor
        </h2>
        <textarea
          id="editor"
          value={text}
          className="markdown-editor__textarea"
          onChange={(e) => setEditorText(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
