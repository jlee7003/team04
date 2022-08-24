import React, { useState } from 'react';

const ProjectContext = React.createContext({
  isAdding: false,
  isEditing: false,
  setIsAdding: (value) => {},
  setIsEditing: (value) => {},
  setProjects: (value) => {},
  editProject: (value) => {},

  //test
  getProjectId: () => {},
});

export const ProjectContextProvider = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState([]);

  //Test
  const [projectId, getProjectId] = useState('');

  const editProject = (editValues) =>
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, editValues } : project
      )
    );

  const deleteProject = (id) => {
    const filteredProjects = projects.filter((project) => project.id !== id);

    setProjects(filteredProjects);
  };

  return (
    <ProjectContext.Provider
      value={{
        isAdding,
        setIsAdding,
        isEditing,
        setIsEditing,
        projectId,
        getProjectId,
        projects,
        setProjects,
        editProject,
        deleteProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
