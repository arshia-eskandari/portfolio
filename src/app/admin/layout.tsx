import { Dropdown, NavLink, Sidebar } from "../../components/admin/Sidebar";
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
} from "lucide-react";

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
        </Dropdown>
        <NavLink href="/admin/media" icon={<Camera className="mr-2 h-4 w-4" />}>
          Media
        </NavLink>
      </Sidebar>
      <div className="mx-10 my-6 w-full">{children}</div>
    </div>
  );
}
