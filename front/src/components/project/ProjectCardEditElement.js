import React, { useState, useContext } from 'react';

import ProjectContext from './store/ProjectContext';
import { Form, Button, Col, Card } from 'react-bootstrap';

const ProjectEditElement = (props) => {
  const context = useContext(ProjectContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');

  const submitHandler = (editProjectId) => {
    let editedProject = {};

    if (title) {
      editedProject = { ...editedProject, title };
    }

    if (content) {
      editedProject = { ...editedProject, content };
    }

    if (startDay) {
      editedProject = { ...editedProject, startDay };
    }

    if (endDay) {
      editedProject = { ...editedProject, endDay };
    }

    props.editProject(editedProject, editProjectId);

    setTitle('');
    setContent('');
    setStartDay('');
    setEndDay('');
  };

  return props.projects.map((project) =>
    context.projectId.includes(project.id) ? (
      <Form key={project.id}>
        <Form.Group>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={project.title}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            onChange={(e) => setContent(e.target.value)}
            defaultValue={project.content}
          />
        </Form.Group>
        <Form.Group className="mt-3 row">
          <Col className="col-auto">
            <Form.Control
              type="date"
              // value={project.date.trim().split('~')[0]}
              onChange={(e) => setStartDay(e.target.value)}
              defaultValue={project.startDay}
            />
          </Col>
          <Col className="col-auto">
            <Form.Control
              type="date"
              // value={project.date.trim().split('~')[1]}
              onChange={(e) => setEndDay(e.target.value)}
              defaultValue={project.endDay}
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
            {project.title} <br />{' '}
            <span className="text-muted">{project.content}</span> <br />
            <span className="text-muted">{`${project.startDay} ~ ${project.endDay}`}</span>
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
              onClick={() => {
                props.deleteProject(project.id);
                props.fetchProjects();
              }}
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
