import './App.scss';
import 'assets/styles/reset.scss';
import { Router, Link } from '@reach/router'
import DrumMachine from 'projects/drum-machine/DrumMachine';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/projects/drum-machine">
          Drum Machine
        </Link>
      </nav>
      <Router>
        <DrumMachine path="/projects/drum-machine" />
      </Router>
    </div>
  );
}

export default App;
