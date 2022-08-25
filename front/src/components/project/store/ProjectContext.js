import React, { useState } from 'react';

const ProjectContext = React.createContext({
  isAdding: false,
  isEditing: false,
  setIsAdding: (value) => {},
  setIsEditing: (value) => {},
  setProjectId: (value) => {},

  //test
  getProjectId: (value) => {},
});

export const ProjectContextProvider = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //Test
  const [projectId, setProjectId] = useState([]);

  const getProjectId = (editProjectId) => {
    setProjectId((prevState) =>
      projectId.includes(editProjectId)
        ? prevState
        : [...prevState, editProjectId]
    );
  };
  //

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
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
