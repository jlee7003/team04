import React, { useState, useContext } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import CheckButton from './CheckButton';
import { Form, Col } from 'react-bootstrap';

const AddForm = (props) => {
  const context = useContext(AuthContext);

  const [dataValues, setdataValues] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setdataValues({ ...dataValues, [name]: value });
  };

  const callPost = async () => {
    await Api.post(props.DATA_ENDPOINT, dataValues);
    await props.callFetch();

    context.setIsAdding(false);
  };

  const setIsAddingFalse = () => {
    context.setIsAdding(false);
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
      <CheckButton
        className={'mt-3 text-center'}
        submitHandler={callPost}
        cancelHandler={setIsAddingFalse}
      />
    </Form>
  );
};

export default AddForm;
