import React, { useState, useContext } from 'react';

import ProjectContext from './store/ProjectContext';
import { Form, Button, Col } from 'react-bootstrap';

const ProjectEditElement = (props) => {
  const context = useContext(ProjectContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const submitHandler = () => {
    const editedProject = {
      name,
      description,
      date: `${fromDate} ~ ${toDate}`,
    };

    context.editProject(editedProject);

    setName('');
    setDescription('');
    setFromDate('');
    setToDate('');
  };

  return props.projects.map((project) => (
    <Form key={project.id}>
      <Form.Group>
        <Form.Control
          type="text"
          value={this.name}
          onChange={(e) => this.setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3 row">
        <Col className="col-auto">
          <Form.Control
            type="date"
            // value={project.date.trim().split('~')[0]}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </Col>
        <Col className="col-auto">
          <Form.Control
            type="date"
            // value={project.date.trim().split('~')[1]}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mt-3 text-center">
        <Col>
          <Button
            variant="primary"
            className="me-3"
            onClick={() => {
              submitHandler();
            }}
          >
            확인
          </Button>
          <Button
            variant="secondary"
            onClick={() => context.setIsEditing(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  ));
};

export default ProjectEditElement;
