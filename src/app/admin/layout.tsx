import { Dropdown, NavLink, Sidebar } from "@/components/admin/Sidebar";
import {
  Camera,
  CircleUserRound,
  FolderKanban,
  History,
  Info,
  ListChecks,
  ListCollapse,
  MonitorStop,
  PieChart,
  LogOut,
  BookCheck
} from "lucide-react";
import { logout } from "./_actions/logout";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <NavLink href="/admin" icon={<PieChart className="mr-2 h-4 w-4" />}>
          Dashboard
        </NavLink>
        <NavLink href="/admin/media" icon={<Camera className="mr-2 h-4 w-4" />}>
          Media
        </NavLink>
        <Dropdown
          label="Sections"
          icon={<ListCollapse className="mr-2 h-4 w-4" />}
        >
          <NavLink
            href="/admin/hero"
            icon={<MonitorStop className="mr-2 h-4 w-4" />}
          >
            Hero
          </NavLink>
          <NavLink href="/admin/about" icon={<Info className="mr-2 h-4 w-4" />}>
            About
          </NavLink>
          <NavLink
            href="/admin/experiences"
            icon={<History className="mr-2 h-4 w-4" />}
          >
            Experiences
          </NavLink>
          <NavLink
            href="/admin/projects"
            icon={<FolderKanban className="mr-2 h-4 w-4" />}
          >
            Projects
          </NavLink>
          <NavLink
            href="/admin/skills"
            icon={<ListChecks className="mr-2 h-4 w-4" />}
          >
            Skills
          </NavLink>
          <NavLink
            href="/admin/contact"
            icon={<CircleUserRound className="mr-2 h-4 w-4" />}
          >
            Contact
          </NavLink>
          <NavLink
            href="/admin/articles"
            icon={<BookCheck className="mr-2 h-4 w-4" />}
          >
            Articles
          </NavLink>
        </Dropdown>
        <form
          action={async () => {
            "use server";
            await logout();
          }}
        >
          <button
            type="submit"
            className={cn(
              "focus-visible:bg-secondary focus-visible:text-secondary",
              "hover:bg-secondary hover:text-secondary-foreground",
              "flex items-center rounded-2xl p-4",
              "w-full",
            )}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </form>
      </Sidebar>
      <div className="my-6 ml-28 mr-4 h-full w-full md:ml-[250px]">
        <div className="md:ml-6">{children}</div>
      </div>
    </div>
  );
}
