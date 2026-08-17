import Link from "next/link";
export default function ProjectSideNav(){
  return <aside className="projectSideNav">
    <Link href="/work">Project</Link>
    <a href="#details">Details</a>
    <a href="#process">Process</a>
  </aside>
}
