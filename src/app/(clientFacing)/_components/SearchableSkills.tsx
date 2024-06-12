"use client";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function SearchableSkills({
  skillsArray,
}: {
  skillsArray: string[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = skillsArray.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="py-3 px-[1px]">
        <Input
          type="text"
          placeholder="Search skills here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded border"
        />
      </div>
      <div className="flex flex-wrap justify-start gap-4">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, index) => (
            <div key={index} className="rounded-lg bg-[#222B58] p-4 shadow text-white">
              {skill}
            </div>
          ))
        ) : (
          <p>No skills matched your search.</p>
        )}
      </div>
    </div>
  );
}
