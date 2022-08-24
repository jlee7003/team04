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
  const [projectId, setProjectId] = useState([]);

  const getProjectId = (editProjectId) => {
    setProjectId((prevState) =>
      projectId.includes(editProjectId)
        ? [...prevState, ...projectId]
        : [...prevState, ...projectId, editProjectId]
    );
  };
  //

  const editProject = (editValues, editProjectId) =>
    setProjects(
      projects.map((project) =>
        project.id === editProjectId ? { ...project, ...editValues } : project
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
        setProjectId,
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
