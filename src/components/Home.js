import ProjectCard from 'components/ProjectCard';
import TitleModal from 'components/modal/TitleModal';
import { useState } from "react";

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
            <ProjectCard title="Mi Project 1.2"/>
            <ProjectCard title="Mi Project 1.2"/>
            <ProjectCard title="Mi Project 1.2"/>
            <ProjectCard title="Mi Project 1.2"/>
            <ProjectCard title="Mi Project 1.2"/>
            <ProjectCard title="Mi Project 1.2"/>
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