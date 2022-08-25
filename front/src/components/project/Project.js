import React from 'react';

import ProjectCard from './ProjectCard';

const Project = ({ portfolioOwnerId, isEditable }) => {
  return (
    <ProjectCard portfolioOwnerId={portfolioOwnerId} isEditable={isEditable} />
  );
};

export default Project;
