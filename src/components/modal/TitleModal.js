import { createPortal } from "react-dom";

const TitleModal = ({ onShowProjects, showProjects }) => {
  const element = (
    <div
      className={
        'title-modal ' +
        (showProjects && 'title-modal--is-disabled')
      }
    >
      <div
        className="title-modal__circle"
      >
        <h1 className="title  has-text-black is-1">React Projects</h1>
        {
          !showProjects && (
            <>
              <h2 className="subtitle is-5 mb-3">
                  for {' '}
                    <a href={process.env.REACT_APP_PORTFOLIO_URL} className="has-text-white" target="_blank" rel="noreferrer" >
                      Nicolas Ramirez Portfolio
                    </a>
              </h2>
              <button
                className="button is-primary"
                onClick={onShowProjects}
              >
                Show me
              </button>
            </>
          )
        }
      </div>
    </div>
  );
  return createPortal(element, document.getElementById('root'));
}

export default TitleModal;