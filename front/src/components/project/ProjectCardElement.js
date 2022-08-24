import React, { useContext } from 'react';

import ProjectContext from './store/ProjectContext';
import { Card, Button, Col } from 'react-bootstrap';

const ProjectCardElement = (props) => {
  const context = useContext(ProjectContext);

  return props.projects.map((project) => (
    <Card.Text key={project.id}>
      <div className="align-items-center row">
        <Col>
          {project.name} <br />{' '}
          <span className="text-muted">{project.description}</span> <br />
          <span className="text-muted">{project.date}</span>
        </Col>
        <Col className="col-lg-1">
          <Button
            variant="outline-info"
            size="sm"
            className="mr-3 btn btn-outline-info btn-sm"
            onClick={() => context.setIsEditing(true)}
          >
            편집
          </Button>
        </Col>
      </div>
    </Card.Text>
  ));
};

export default ProjectCardElement;
