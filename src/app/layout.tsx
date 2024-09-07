import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getClientHero } from "./(clientFacing)/_actions/hero";
import { getClientAbout } from "./(clientFacing)/_actions/about";
import { getClientSkills } from "./(clientFacing)/_actions/skills";
import { getClientExperiences } from "./(clientFacing)/_actions/experiences";
import { getClientProjects } from "./(clientFacing)/_actions/projects";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata(): Promise<Metadata> {
  const [hero, about, skills, experiences, projects] = await Promise.all([
    getClientHero(),
    getClientAbout(),
    getClientSkills(),
    getClientExperiences(),
    getClientProjects(),
  ]);
  const keywords = [...(skills.skills || [])];
  experiences.forEach((e) => keywords.push(e.company, e.location, e.jobTitle));
  projects.forEach((p) => keywords.push(p.projectTitle));
  const { imageUrl } = about;

  return {
    title: "Arshia Eskandari",
    description: `${hero.text} ${about.text}`,
    keywords,
    openGraph: {
      images: [
        imageUrl ||
          "https://arshiaeskandari.s3.us-east-2.amazonaws.com/media/141d1189-2d82-4863-93d5-fa056698440b-arshia-transparent.png",
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
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
