import {
  LucideAtom,
  LucideCog,
  LucideGrid,
  LucideLightbulb,
  LucideUser2,
} from "lucide-react";

export default function DbPreviewSidebar() {
  const links = [
    { title: "Overview", icon: LucideGrid },
    { title: "Insights", icon: LucideLightbulb },
    { title: "Automation", icon: LucideAtom },
  ];
  const userLinks = [
    { title: "Profile", icon: LucideUser2 },
    { title: "Settings", icon: LucideCog },
  ];
  return (
    <header className="max-lg:hidden">
      <p className="uppercase mb-2 text-base-content/65 font-thin">
        Management
      </p>
      <aside className="space-y-1 mb-4">
        {links.map((l, i) => (
          <div
            key={i}
            className={`py-1.5 w-full px-3 rounded-lg cursor-pointer ${i === 0 ? "bg-secondary/35 text-base-content" : "hover:bg-secondary/15"} flex items-center gap-2`}
          >
            <l.icon
              className={`size-4 ${i === 0 ? "opacity-100" : "opacity-75"}`}
            />
            <span className={i === 0 ? "opacity-100" : "opacity-75"}>
              {l.title}
            </span>
          </div>
        ))}
      </aside>
      <p className="uppercase mb-2 text-base-content/65 font-thin">User</p>
      <aside className="space-y-1">
        {userLinks.map((l, i) => (
          <div
            key={i}
            className={`py-1.5 w-full px-3 rounded-lg cursor-pointer hover:bg-secondary/15 flex items-center gap-2`}
          >
            <l.icon className={`size-4 opacity-75`} />
            <span className="opacity-75">{l.title}</span>
          </div>
        ))}
      </aside>
    </header>
  );
}
