import React, { useContext, useState } from 'react';

import { Form, Button, Col } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
import ProjectContext from './store/ProjectContext';

const ProjectAddForm = () => {
  const context = useContext(ProjectContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // const currentDate = new Date();

  const submitHandler = () => {
    const project = {
      name,
      description,
      date: `${fromDate} ~ ${toDate}`,
      id: Math.random().toString(),
    };

    context.setProjects((prevState) => [project, ...prevState]);

    setName('');
    setDescription('');
    setFromDate('');
    setToDate('');

    context.setIsAdding(false);
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="프로젝트 제목"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            placeholder="상세 내역"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3 row">
          <Col className="col-auto">
            <Form.Control
              type="date"
              onChange={(e) => setFromDate(e.target.value)}
              // defaultValue={currentDate}
            />
            {/* <DatePicker
              selected={currentDate}
              onChange={(e) => setFromDate(() => e.getTime())}
            /> */}
          </Col>
          <Col className="col-auto">
            <Form.Control
              type="date"
              onChange={(e) => setToDate(e.target.value)}
              // defaultValue={currentDate}
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
