export default function DbPreviewSidebar() {
  const links = ["Overview", "Insights", "Automation", "Settings", "Profile"];
  return (
    <aside className="space-y-1">
      {links.map((l, i) => (
        <div
          key={i}
          className={`py-1.5 w-full px-3 rounded-lg cursor-pointer ${i === 0 ? "bg-secondary/35 text-base-content" : "hover:bg-secondary/15"}`}
        >
          <span className={i === 0 ? "opacity-100" : "opacity-75"}>{l}</span>
        </div>
      ))}
    </aside>
  );
}
