import React, { useContext, useState } from 'react';
import * as Api from '../../api';

import ProjectContext from './store/ProjectContext';
import { Form, Button, Col } from 'react-bootstrap';

const ProjectAddForm = (props) => {
  const context = useContext(ProjectContext);

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
      id: Math.random().toString(),
    };

    context.setIsAdding(false);

    Api.post('projects', project);

    props.fetchProjects();

    setTitle('');
    setContent('');
    setStartDay('');
    setEndDay('');
  };

  return (
    <>
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
            {/* <DatePicker
              selected={currentDate}
              onChange={(e) => setFromDate(() => e.getTime())}
            /> */}
          </Col>
          <Col className="col-auto">
            <Form.Control
              type="date"
              onChange={(e) => setEndDay(e.target.value)}
            />
            {/* <DatePicker
              selected={currentDate}
              onChange={(e) => setToDate(() => e.getTime())}
            /> */}
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
              onClick={() => context.setIsAdding(false)}
            >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default ProjectAddForm;
