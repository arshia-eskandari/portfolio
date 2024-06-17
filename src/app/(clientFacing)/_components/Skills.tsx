import { H2 } from "@/components/ui/Typography";
import { getClientSkills } from "../_actions/skills";
import SearchableSkills from "./SearchableSkills";

export default async function Skills() {
  const skills = await getClientSkills();
  const skillsArray = skills.skills || [];

  return (
    <div id="skills" className="relative overflow-hidden my-12">
      <H2 className="mb-6 pt-6 pb-6 text-center">Skills</H2>
      <SearchableSkills skillsArray={skillsArray} />
    </div>
  );
}
