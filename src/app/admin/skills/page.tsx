import { H2 } from "../../../components/ui/Typography";
import { addSkills, getSkills } from "./_actions/skills";
import SkillsForm from "./_components/SkillsForm";

export default async function AdminHero() {
  const skills = await getSkills();
  return (
    <div className="">
      <H2>Skills</H2>
      <SkillsForm skills={skills} action={addSkills} />
    </div>
  );
}
