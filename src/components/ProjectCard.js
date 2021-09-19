import { Link } from '@reach/router';

export default function ProjectCard({ title, id, thumbnailImage, description, path }) {
  return (
    <div className="project-card card" id={`project-${id}`} >
      <header className="card-header">
        <p className="card-header-title">
          { title }
        </p>
      </header>
      <div className="card-content">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={thumbnailImage} alt="Placeholder" />
          </figure>
        </div>
        <div className="content">
          { description }
        </div>
      </div>
      <footer className="card-footer">
        <Link to={path} className="card-footer-item">Open</Link>
      </footer>
    </div>
  )
}