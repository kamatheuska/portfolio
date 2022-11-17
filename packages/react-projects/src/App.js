import { Routes, Route, Outlet } from 'react-router-dom';

import Calculator from './projects/calculator/Calculator';
import BreakClock from './projects/break-clock/BreakClock';
import DrumMachine from './projects/drum-machine/DrumMachine';
import MarkdownPreviewer from './projects/markdown-previewer/MarkdownPreviewer';
import Home from './components/Home';
import Navigation from './components/Navigation';
import { useEffect } from 'react';

function Layout() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  useEffect(() => {
    document.querySelector('#fcc_test_suite_wrapper').style.display = 'none'
  });

  return (
    <Routes>
      <Route path="/projects/react" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="drum-machine" element={<DrumMachine />} />
        <Route path="markdown-previewer" element={<MarkdownPreviewer />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="break-clock" element={<BreakClock />} />
      </Route>
    </Routes>
  );
}

export default App;
