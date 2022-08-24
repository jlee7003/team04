import React from 'react';

import ProjectCard from './ProjectCard';
import { ProjectContextProvider } from './store/ProjectContext';

const Project = () => {
  return (
    <ProjectContextProvider>
      <ProjectCard />
    </ProjectContextProvider>
  );
};

export default Project;
