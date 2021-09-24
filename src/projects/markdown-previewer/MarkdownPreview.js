import marked from 'marked';
import DOMPurify from 'dompurify';


export default function MarkdownPreview({ show, text, children }) {
  function convertedSanitizedMarkdownText() {
    const markdown = marked(text, { gfm: true, breaks: true });
    return DOMPurify.sanitize(markdown);
  }

  return (
    <div className={
      'markdown-preview box ' +
      (show ? '' : 'markdown-preview--hide')
    }>
      <div className="markdown-preview__container">
        { children }
        <h2 className="markdown-preview__label has-text-right is-italic has-text-weight-bold has-text-grey mb-2">
          Preview
        </h2>
        <div 
          className="markdown-preview__text"
          dangerouslySetInnerHTML={{__html: convertedSanitizedMarkdownText() }}
        >
        </div>
      </div>
    </div>
  )
}
