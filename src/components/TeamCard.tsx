"use client";

import React, { useRef } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Hover Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y / height) - 0.5) * 12;
    const rotateY = ((x / width) - 0.5) * -12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      className="group perspective"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="transition-all duration-500 ease-out transform-style preserve-3d p-8 rounded-2xl 
        bg-white/10 backdrop-blur-xl border border-white/20 hover:shadow-xl shadow-white/10"
      >
        <div className="text-center">
          {/* Image */}
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
              <img 
                src={member.photo || "/uploads/team/placeholder.jpg"} 
                alt={member.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Name & Role */}
          <h3 className="text-2xl font-semibold text-white mb-1">{member.name}</h3>
          <p className="text-white/80 text-lg mb-4">{member.role}</p>

          {/* Social Icons */}
          <div className="flex justify-center space-x-4">
            {member.socials?.instagram && (
              <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-300 transition duration-200">
                <i className="bi bi-instagram text-xl"></i>
              </a>
            )}
            {member.socials?.linkedin && (
              <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-300 transition duration-200">
                <i className="bi bi-linkedin text-xl"></i>
              </a>
            )}
            {member.socials?.github && (
              <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition duration-200">
                <i className="bi bi-github text-xl"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;