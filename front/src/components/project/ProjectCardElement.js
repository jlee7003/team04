import React, { useState } from 'react';

import { Form, Button, Col, Card } from 'react-bootstrap';

const ProjectCardElement = (props) => {
  const [projectValues, setProjectValues] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setProjectValues({ ...projectValues, [name]: value });
  };

  const submitHandler = (editProjectId) => {
    props.setProjectIdList(
      props.projectIdList.filter((array) => array !== editProjectId)
    );

    props.editProject(projectValues, editProjectId);
  };

  return props.projects.map((project) =>
    props.projectIdList.includes(project.id) ? (
      <Form key={project.id}>
        <Form.Group>
          <Form.Control
            name="title"
            type="text"
            onChange={onChangeHandler}
            defaultValue={project.title}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            name="content"
            type="text"
            onChange={onChangeHandler}
            defaultValue={project.content}
          />
        </Form.Group>
        <Form.Group className="mt-3 row">
          <Col className="col-auto">
            <Form.Control
              name="startDay"
              type="date"
              onChange={onChangeHandler}
              defaultValue={project.startDay}
            />
          </Col>
          <Col className="col-auto">
            <Form.Control
              name="endDay"
              type="date"
              onChange={onChangeHandler}
              defaultValue={project.endDay}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3 text-center">
          <Col>
            <Button
              variant="primary"
              className="me-3"
              onClick={() => submitHandler(project.id)}
            >
              확인
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                props.setProjectIdList(
                  props.projectIdList.filter((array) => array !== project.id)
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
            {project.title} <br />
            <span className="text-muted">{project.content}</span> <br />
            <span className="text-muted">{`${project.startDay} ~ ${project.endDay}`}</span>
          </Col>
          {props.isEditable && (
            <Col className="col-lg-1">
              <Button
                variant="outline-info"
                size="sm"
                className="mr-3 btn btn-outline-info btn-sm"
                onClick={() => props.getProjectIdList(project.id)}
              >
                편집
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                className="mr-3 btn btn-outline-info btn-sm"
                onClick={() => props.deleteProject(project.id)}
              >
                삭제
              </Button>
            </Col>
          )}
        </div>
      </Card.Text>
    )
  );
};

export default ProjectCardElement;
