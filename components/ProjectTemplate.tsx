import MediaPlaceholder from "./MediaPlaceholder";
import ProjectSideNav from "./ProjectSideNav";

export default function ProjectTemplate({title, kicker, intro, accent="PROJECT", sections=[]}:{title:string;kicker:string;intro:string;accent?:string;sections?:{title:string;text:string;media?:string}[]}){
 return <section className="projectPage">
   <ProjectSideNav/>
   <div className="projectContent">
    <header className="projectHero">
      <p className="eyebrow">{kicker}</p>
      <div className="projectTitleBlock"><div className="projectColor"><span>{accent}</span><h1>{title}</h1></div><MediaPlaceholder label="PROJECT HERO IMAGE"/></div>
      <p className="projectIntro">{intro}</p>
    </header>
    <div id="details" className="projectSections">
      {sections.map((s,i)=><section className="projectSection" id={i===1?"process":undefined} key={s.title}>
        <div className="projectSectionCopy"><span>{String(i+1).padStart(2,"0")}</span><h2>{s.title}</h2><p>{s.text}</p></div>
        <MediaPlaceholder label={s.media || `PROJECT IMAGE ${i+1}`}/>
      </section>)}
    </div>
   </div>
 </section>
}
