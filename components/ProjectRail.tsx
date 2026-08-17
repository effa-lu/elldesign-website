const projects = [
  {
    number: "01",
    title: "TRANSCULTURAL JOURNEY",
    subtitle: "Spatial choreography / moving architecture",
    image: "/images/project-01.svg",
  },
  {
    number: "02",
    title: "MEMENTO",
    subtitle: "Architecture / boundary / spatial experience",
    image: "/images/project-02.svg",
  },
  {
    number: "03",
    title: "TRON KIRK",
    subtitle: "Adaptive reuse / light / ritual space",
    image: "/images/project-03.svg",
  },
];

export default function ProjectRail() {
  return (
    <section className="work-section" id="work">
      <div className="section-head">
        <p>SELECTED WORK</p>
        <p>DRAG / SCROLL →</p>
      </div>
      <div className="project-rail">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <img src={project.image} alt="" />
            <div className="project-meta">
              <span>{project.number}</span>
              <div>
                <h2>{project.title}</h2>
                <p>{project.subtitle}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
