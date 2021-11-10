import ProjectCard from 'components/ProjectCard';
import TitleModal from 'components/modal/TitleModal';
import { useState } from 'react';
import projects from 'projects/config';
import { isGreaterThanTablet } from 'utils';

export default function Home() {
  const [showGrid, setShowGrid] = useState(false);

  const showProjectGrid = () => {
    setShowGrid(true);
  };
  const showModal = () => (showGrid ? isGreaterThanTablet() : true);
  return (
    <div className="home">
      {!showModal() && (
        <header>
          <h1 className="title is-1">React Projects</h1>
        </header>
      )}
      {showGrid && (
        <div className="home__project-grid">
          {projects.map((project, i) => (
            <ProjectCard key={`${project.id}-${i}`} {...project} />
          ))}
        </div>
      )}
      <TitleModal show={showModal()} onShowProjects={showProjectGrid} showProjects={showGrid}></TitleModal>
    </div>
  );
}
