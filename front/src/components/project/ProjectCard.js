import React, { useContext } from 'react';

import { Card, Button } from 'react-bootstrap';
import ProjectAddForm from './ProjectAddForm';
import ProjectCardElement from './ProjectCardElement';
import ProjectEditElement from './ProjectCardEditElement';
import ProjectContext from './store/ProjectContext';

const ProjectCard = () => {
  const context = useContext(ProjectContext);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        {context.isEditing ? (
          <ProjectEditElement projects={context.projects} />
        ) : (
          <ProjectCardElement projects={context.projects} />
        )}
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
        {context.isAdding && <ProjectAddForm />}
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
