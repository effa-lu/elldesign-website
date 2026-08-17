export default function MediaPlaceholder({label="IMAGE", className=""}:{label?:string; className?:string}) {
  return <div className={`mediaPlaceholder ${className}`}><span>{label}</span></div>;
}
