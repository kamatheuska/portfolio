export default function ProjectCard({ title }) {
  return (
    <div className="project-card card">
      <div className="card-content">
        <div className="content">
          { title }
        </div>
      </div>
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
        </figure>
      </div>
    </div>
  )
}