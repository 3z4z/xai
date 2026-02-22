import { managementLinks, userLinks } from "@/utils/mockData";
import { LucideXCircle } from "lucide-react";

export default function DbPreviewSidebar({ activeTab, setActiveTab, onClose }) {
  const renderItem = (item) => {
    const isActive = activeTab === item.key;

    return (
      <div
        key={item.key}
        onClick={() => setActiveTab(item.key)}
        className={`py-1.5 w-full px-3 rounded-lg cursor-pointer flex items-center gap-2 ${
          isActive
            ? "bg-secondary/35 text-base-content"
            : "hover:bg-secondary/15"
        }`}
      >
        <item.icon
          className={`size-4 ${isActive ? "opacity-100" : "opacity-75"}`}
        />
        <span className={isActive ? "opacity-100" : "opacity-75"}>
          {item.title}
        </span>
      </div>
    );
  };

  return (
    <aside className="max-lg:pt-3 transition-all">
      <div className="lg:hidden max-lg:pb-3 flex justify-end w-full">
        <button onClick={onClose}>
          <LucideXCircle className="text-primary/50" />
        </button>
      </div>
      <p className="uppercase mb-2 text-base-content/65 font-thin">
        Management
      </p>
      <nav className="space-y-1 mb-4">{managementLinks.map(renderItem)}</nav>
      <p className="uppercase mb-2 text-base-content/65 font-thin">User</p>
      <nav className="space-y-1">{userLinks.map(renderItem)}</nav>
    </aside>
  );
}
