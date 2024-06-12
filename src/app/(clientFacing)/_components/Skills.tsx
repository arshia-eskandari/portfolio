// Somewhere in your project files
import { H2 } from "@/components/ui/Typography";
import { getSkills } from "../_actions/skills";
import SearchableSkills from "./SearchableSkills";

export default async function Skills() {
  const skills = await getSkills();
  const skillsArray = skills.skills || [];

  return (
    <div id="skills" className="relative overflow-hidden my-12">
      <H2 className="mb-6 pt-6 pb-6 text-center">Skills</H2>
      <SearchableSkills skillsArray={skillsArray} />
    </div>
  );
}
