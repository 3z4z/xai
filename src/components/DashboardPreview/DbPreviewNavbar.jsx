import { LucideBellRing, LucideUser } from "lucide-react";
import BrandLogo from "../shared/BrandLogo";

export default function DbPreviewNavbar() {
  return (
    <nav className="p-4 flex justify-between items-center">
      <BrandLogo size={"small"} />
      <div className="flex gap-2 items-center">
        <button className="btn btn-ghost size-8.5 p-0 rounded-full ring-0 ring-transparent hover:ring-4 hover:ring-primary/25">
          <LucideBellRing className="size-4.5" />
        </button>
        <button className="btn btn-ghost bg-base-100 size-8.5 p-0 rounded-full ring-1 ring-primary/15 hover:ring-4 hover:ring-primary/25">
          <LucideUser className="size-4.5" />
        </button>
      </div>
    </nav>
  );
}
