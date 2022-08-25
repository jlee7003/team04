import React from 'react';

import ProjectCard from './ProjectCard';
import { ProjectContextProvider } from './store/ProjectContext';

const Project = ({ portfolioOwnerId, isEditable }) => {
  return (
    <ProjectContextProvider>
      <ProjectCard portfolioOwnerId={portfolioOwnerId} />
    </ProjectContextProvider>
  );
};

export default Project;
