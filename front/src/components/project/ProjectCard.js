import React, { useContext, useState, useCallback, useEffect } from 'react';
import * as Api from '../../api';

import { Card, Button } from 'react-bootstrap';
import ProjectAddForm from './ProjectAddForm';
import ProjectCardElement from './ProjectCardElement';
import ProjectEditElement from './ProjectCardEditElement';
import ProjectContext from './store/ProjectContext';

const ProjectCard = ({ portfolioOwnerId, isEditable }) => {
  const context = useContext(ProjectContext);
  const [projects, setProjects] = useState([]);

  const fetchProjects = useCallback(async () => {
    const getUsers = await Api.get('users', portfolioOwnerId);
    const userData = { ...getUsers.data };

    const getProjects = await Api.get('projects', userData.email);
    const projectsData = [...getProjects.data];

    setProjects(() => [...projectsData]);
  }, [portfolioOwnerId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {context.isEditing ? (
          <ProjectEditElement
            isEditable={isEditable}
            projects={projects}
            deleteProject={deleteProject}
            editProject={editProject}
          />
        ) : (
          <ProjectCardElement
            isEditable={isEditable}
            projects={projects}
            deleteProject={deleteProject}
            editProject={editProject}
          />
        )}
        {isEditable && (
          <div className="mt-3 text-center mb-4 row">
            <div className="col-sm-20">
              <Button
                className="btn btn-primary"
                onClick={() => context.setIsAdding(true)}
              >
                +
              </Button>
            </div>
          </div>
        )}
        {context.isAdding && <ProjectAddForm fetchProjects={fetchProjects} />}
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
