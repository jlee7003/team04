import React, { useState } from 'react';

const ProjectContext = React.createContext({
  isAdding: false,
  setIsAdding: (value) => {},
  setIsEditing: (value) => {},
  setProjects: (value) => {},
  editProject: (value) => {},
});

export const ProjectContextProvider = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState([]);

  const editProject = (editValues) =>
    setProjects(
      projects.map((project) =>
        project.id === isEditing ? { ...project, editValues } : project
      )
    );

  return (
    <ProjectContext.Provider
      value={{
        isAdding,
        setIsAdding,
        isEditing,
        setIsEditing,
        projects,
        setProjects,
        editProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
