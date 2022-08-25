import React, { useState } from 'react';
import * as Api from '../../api';

import { Form, Button, Col } from 'react-bootstrap';

const ProjectAddForm = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');

  const submitHandler = async () => {
    const project = {
      title,
      content,
      startDay,
      endDay,
    };

    console.log({ ...props });

    await Api.post('projects', project);
    await props.fetchProjects();

    props.setIsAdding(false);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세 내역"
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3 row">
        <Col className="col-auto">
          <Form.Control
            type="date"
            onChange={(e) => setStartDay(e.target.value)}
          />
        </Col>
        <Col className="col-auto">
          <Form.Control
            type="date"
            onChange={(e) => setEndDay(e.target.value)}
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
          <Button variant="secondary" onClick={() => props.setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default ProjectAddForm;
