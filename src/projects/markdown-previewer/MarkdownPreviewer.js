import { useLayoutEffect, useState } from 'react';

import initialMarkdown from './initialData'
import MarkdownPreview from './MarkdownPreview';
import MarkdownEditor from './MarkdownEditor';
import { isMobile } from 'utils';


export default function MarkdownPreviewer() {
  const [ editorText, setEditorText ] = useState(initialMarkdown);
  const [ showPreview, setShowPreview ] = useState(initialMarkdown);

  useLayoutEffect(() => {
    setShowPreview(isMobile());
  }, [])

  const toggleShowPreview = () => {
    setShowPreview(!showPreview);
  }
  
  return (
    <div className="markdown-previewer">
      <div className="container">
        <header>
          <h1 className="title is-1 is-size-5-mobile">Markdown Previewer</h1>
        </header>
        <div className="markdown-previewer__container">
          <MarkdownEditor
            setEditorText={text => setEditorText(text)}
            show={!showPreview}
            text={editorText}
          >
            <button
              className="markdown-previewer__button mb-3 button is-link"
              onClick={toggleShowPreview}
            >
              Preview
            </button>
          </MarkdownEditor>
          <MarkdownPreview
            text={editorText}
            show={showPreview}
          >
            <button
              className="markdown-previewer__button mb-3 button is-warning"
              onClick={toggleShowPreview}
            >
              Edit
            </button>
          </MarkdownPreview>
        </div>
      </div>
    </div>
  );
}
