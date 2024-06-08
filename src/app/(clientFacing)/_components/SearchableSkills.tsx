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
      <div className="p-3">
        <Input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded border"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4 px-3">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, index) => (
            <div key={index} className="rounded bg-gray-200 p-4 shadow">
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
