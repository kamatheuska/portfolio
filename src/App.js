import { Router } from '@reach/router'

import DrumMachine from 'projects/drum-machine/DrumMachine';
import MarkdownPreviewer from 'projects/markdown-previewer/MarkdownPreviewer';
import Home from 'components/Home';
import Navigation from 'components/Navigation';
import { projectsRoutes as projects } from 'routes';


function App() {
  return (
    <div className="app">
      <Navigation></Navigation>
      <main>
        <Router>
          <Home path="/" />
          <DrumMachine path={ projects.drumMachine.path } />
          <MarkdownPreviewer path={ projects.markdownPreviewer.path } />
        </Router>
      </main>
    </div>
  );
}

export default App;
