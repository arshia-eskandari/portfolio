import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getAbout } from "./admin/about/_actions/about";
import { getHero } from "./admin/hero/_actions/hero";
import { getSkills } from "./(clientFacing)/_actions/skills";
import { getExperiences } from "./(clientFacing)/_actions/experiences";
import { getProjects } from "./(clientFacing)/_actions/projects";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getHero();
  const about = await getAbout();
  const skills = await getSkills();
  const experiences = await getExperiences();
  const projects = await getProjects();
  const keywords = [...(skills.skills || [])];
  experiences.forEach((e) => keywords.push(e.company, e.location, e.jobTitle));
  projects.forEach((p) => keywords.push(p.projectTitle));

  return {
    title: "Arshia Eskandari",
    description: `${hero.text} ${about.text}`,
    keywords,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
