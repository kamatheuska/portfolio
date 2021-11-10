import { Router, Location } from '@reach/router';

import DrumMachine from 'projects/drum-machine/DrumMachine';
import MarkdownPreviewer from 'projects/markdown-previewer/MarkdownPreviewer';
import Home from 'components/Home';
import Navigation from 'components/Navigation';
import { projectsRoutes as projects, BASE_URL } from 'routes';
import Calculator from 'projects/calculator/Calculator';

function App() {
  return (
    <Location>
      {({ location }) => (
        <div className="app">
          <Navigation location={location}></Navigation>
          <main>
            <Router basepath={BASE_URL}>
              <Home path="/" />
              <DrumMachine path={projects.drumMachine.path} />
              <MarkdownPreviewer path={projects.markdownPreviewer.path} />
              <Calculator path={projects.calculator.path} />
            </Router>
          </main>
        </div>
      )}
    </Location>
  );
}

export default App;
