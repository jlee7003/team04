import React, { useState, useEffect } from 'react';
import * as Api from '../../api';

import { Card, Button } from 'react-bootstrap';
import ProjectAddForm from './ProjectAddForm';
import ProjectCardElement from './ProjectCardElement';

const ProjectCard = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectIdList, setProjectIdList] = useState([]);

  const fetchProjects = async () => {
    const getUsers = await Api.get('users', portfolioOwnerId);
    const userData = { ...getUsers.data };

    const getProjects = await Api.get('projects', userData.email);
    const projectsData = [...getProjects.data];

    setProjects(projectsData);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const editProject = async (editValues, editProjectId) => {
    const project = {
      ...editValues,
    };

    await Api.patch('projects', editProjectId, project);
    await fetchProjects();
  };

  const deleteProject = async (deleteId) => {
    await Api.delete('projects', deleteId);
    await fetchProjects();
  };

  const getProjectIdList = (editProjectId) => {
    setProjectIdList((prevState) =>
      projectIdList.includes(editProjectId)
        ? prevState
        : [...prevState, editProjectId]
    );
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <ProjectCardElement
          isEditable={isEditable}
          projects={projects}
          projectIdList={projectIdList}
          deleteProject={deleteProject}
          editProject={editProject}
          setProjectIdList={setProjectIdList}
          getProjectIdList={getProjectIdList}
        />
        {isEditable && (
          <div className="mt-3 text-center mb-4 row">
            <div className="col-sm-20">
              <Button
                className="btn btn-primary"
                onClick={() => setIsAdding(true)}
              >
                +
              </Button>
            </div>
          </div>
        )}
        {isAdding && (
          <ProjectAddForm
            fetchProjects={fetchProjects}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
