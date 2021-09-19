import ProjectCard from 'components/ProjectCard';
import TitleModal from 'components/modal/TitleModal';
import { useState } from "react";
import projects from 'projects/config';


export default function Home() {
  const [showGrid, setShowGrid] = useState(false);

  function showProjectGrid() {
    setShowGrid(true);
  }

  return (
    <div className="home">
      {
        showGrid && (
          <div className="home__project-grid">
            {
              projects.map((project, i) => (
                <ProjectCard
                  key={`${project.id}-${i}`}
                  {...project}
                />
              ))
            }
          </div>
        )
      }
      <TitleModal
        onShowProjects={showProjectGrid}
        showProjects={showGrid}
      ></TitleModal>
    </div>
  )
}