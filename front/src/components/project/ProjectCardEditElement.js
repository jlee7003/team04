import React, { useState, useContext } from 'react';

import ProjectContext from './store/ProjectContext';
import { Form, Button, Col, Card } from 'react-bootstrap';

const ProjectEditElement = (props) => {
  const context = useContext(ProjectContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const submitHandler = (editProjectId) => {
    const editedProject = {
      name,
      description,
      date: `${fromDate} ~ ${toDate}`,
    };

    context.editProject(editedProject, editProjectId);

    setName('');
    setDescription('');
    setFromDate('');
    setToDate('');
  };

  return props.projects.map((project) =>
    context.projectId.includes(project.id) ? (
      <Form key={project.id}>
        <Form.Group>
          <Form.Control
            type="text"
            onChange={(e) => setName(e.target.value)}
            defaultValue={project.name}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={project.description}
          />
        </Form.Group>
        <Form.Group className="mt-3 row">
          <Col className="col-auto">
            <Form.Control
              type="date"
              // value={project.date.trim().split('~')[0]}
              onChange={(e) => setFromDate(e.target.value)}
              defaultValue={project.date.trim().split('&')[0]}
            />
          </Col>
          <Col className="col-auto">
            <Form.Control
              type="date"
              // value={project.date.trim().split('~')[1]}
              onChange={(e) => setToDate(e.target.value)}
              defaultValue={project.toDate}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3 text-center">
          <Col>
            <Button
              variant="primary"
              className="me-3"
              onClick={() => {
                submitHandler(project.id);
                context.setIsEditing(false);
              }}
            >
              확인
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                context.setProjectId(
                  context.projectId.filter((array) => array !== project.id)
                );
              }}
            >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    ) : (
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
              onClick={() => {
                context.getProjectId(project.id);
                context.setIsEditing(true);
              }}
            >
              편집
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              className="mr-3 btn btn-outline-info btn-sm"
              onClick={() => context.deleteProject(project.id)}
            >
              삭제
            </Button>
          </Col>
        </div>
      </Card.Text>
    )
  );
};

export default ProjectEditElement;
