import React, { useState } from 'react';
import * as Api from '../../api';

import { Form, Button, Col } from 'react-bootstrap';

const ProjectAddForm = (props) => {
  const [projectValues, setProjectValues] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setProjectValues({ ...projectValues, [name]: value });
  };

  const submitHandler = async () => {
    await Api.post('projects', projectValues);
    await props.fetchProjects();

    props.setIsAdding(false);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Control
          name="title"
          type="text"
          placeholder="프로젝트 제목"
          onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Control
          name="content"
          type="text"
          placeholder="상세 내역"
          onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mt-3 row">
        <Col className="col-auto">
          <Form.Control
            type="date"
            name="startDay"
            onChange={onChangeHandler}
          />
        </Col>
        <Col className="col-auto">
          <Form.Control type="date" name="endDay" onChange={onChangeHandler} />
        </Col>
      </Form.Group>
      <Form.Group className="mt-3 text-center">
        <Col>
          <Button variant="primary" className="me-3" onClick={submitHandler}>
            확인
          </Button>
          <Button variant="secondary" onClick={() => props.setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ProjectAddForm;
