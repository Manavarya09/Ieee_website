"use client";

import React, { useEffect, useState } from 'react';
import TeamCard from '@/components/TeamCard';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
}

const TeamPage: React.FC = () => {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Fetch team data from the API
    fetch('/api/team')
      .then((response) => response.json())
      .then((data) => setTeamData(data))
      .catch((error) => console.error('Error fetching team data:', error));
  }, []);

  // Filter members into Chair Council and Core Council
  const chairCouncil = teamData.filter((member) =>
    ['Chair', 'Vice Chair', 'Secretary', 'Treasurer'].includes(member.role)
  );

  const coreCouncil = teamData.filter(
    (member) => !['Chair', 'Vice Chair', 'Secretary', 'Treasurer'].includes(member.role)
  );

  return (
    <div style={{ backgroundColor: '#0a192f', color: '#ccd6f6', padding: '2rem' }}>
      {/* Our Mission Section */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Mission</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          We exist to connect students with knowledge, mentorship, and real-world experience, turning ideas into impactful solutions within the IEEE community.
        </p>
      </section>

      {/* What We Do Section */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>What We Do</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Events Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#112240',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              width: '250px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <i className="bi bi-calendar-event" style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }}></i>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Events</h3>
            <p style={{ fontSize: '1rem', color: '#8892b0' }}>Meetups & Networking</p>
          </div>

          {/* Competitions Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#112240',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              width: '250px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <i className="bi bi-trophy" style={{ fontSize: '2.5rem', color: '#facc15', marginBottom: '1rem' }}></i>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Competitions</h3>
            <p style={{ fontSize: '1rem', color: '#8892b0' }}>Tech Challenges</p>
          </div>

          {/* Workshops Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#112240',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              width: '250px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <i className="bi bi-tools" style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '1rem' }}></i>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Workshops</h3>
            <p style={{ fontSize: '1rem', color: '#8892b0' }}>Hands-On Learning</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Meet Our Team</h2>
        <p style={{ fontSize: '1.2rem', color: '#8892b0', marginBottom: '2rem' }}>
          Meet the minds driving innovation and community at IEEE BPDC.
        </p>

        {/* Chair Council Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Chair Council</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
            {chairCouncil.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Core Council Section */}
        <section>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Core Council</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
            {coreCouncil.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default TeamPage;

/* CSS for 3D hover effect */
<style jsx>{`
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: perspective(1000px) rotateX(10deg) rotateY(10deg);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`}</style>
