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
      <div className="px-[1px] py-3 pb-6">
        <Input
          type="text"
          placeholder="Search skills here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border"
        />
      </div>
      <div className="flex flex-wrap justify-start gap-4">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="animated-button shine flex h-10 items-center justify-center rounded-2xl bg-[#050041] px-4 py-2 text-sm font-medium text-white shadow"
            >
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
