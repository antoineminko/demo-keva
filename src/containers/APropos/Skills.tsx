'use client';
import { skillsSection } from '@/lib/content/skills';
import { SkillIcon, Wrapper } from '@/components';

import { getSectionAnimation } from '@/styles/animations';

const Skills = () => {
  const { title, skills } = skillsSection;
  // Flatten all skills from all categories into one array
  const allSoftwareSkills = skills.flatMap(skillGroup => skillGroup.softwareSkills);

  return (
    <Wrapper id="skills" {...getSectionAnimation}>
      <h2 className="text-center heading-secondary">{title}</h2>

      <div className="flex flex-wrap justify-center gap-4 mt-12 max-w-4xl mx-auto">
        {/* Icons removed as per user request */}
      </div>
    </Wrapper>
  );
};

export default Skills;
