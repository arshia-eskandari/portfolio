import { Experience } from "@prisma/client";

export function sortExperiences(experiences: Experience[]) {
  experiences.sort((a, b) => {
    if (!a.endDate && b.endDate) return -1;
    if (a.endDate && !b.endDate) return 1;

    if (a.endDate && b.endDate) {
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    }

    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return experiences;
}
