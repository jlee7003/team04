import React, { useState, useContext } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import CheckButton from './CheckButton';
import { Form, Col } from 'react-bootstrap';

const EditForm = (props) => {
  const context = useContext(AuthContext);
  const [dataValues, setDataValues] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setDataValues({ ...dataValues, [name]: value });
  };

  const confirmEdit = async (projectId) => {
    const editedValues = {
      ...dataValues,
    };

    context.setIdList(context.idList.filter((id) => id !== projectId));

    await Api.patch(props.DATA_ENDPOINT, projectId, editedValues);
    await props.callFetch();
  };

  const deleteId = () => {
    context.setIdList(context.idList.filter((id) => id !== props.project.id));
  };

  return (
    <Form>
      <Form.Group>
        <Form.Control
          name="title"
          type="text"
          onChange={onChangeHandler}
          defaultValue={props.project.title}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Control
          name="content"
          type="text"
          onChange={onChangeHandler}
          defaultValue={props.project.content}
        />
      </Form.Group>
      <Form.Group className="mt-3 row">
        <Col className="col-auto">
          <Form.Control
            name="startDay"
            type="date"
            onChange={onChangeHandler}
            defaultValue={props.project.startDay}
          />
        </Col>
        <Col className="col-auto">
          <Form.Control
            name="endDay"
            type="date"
            onChange={onChangeHandler}
            defaultValue={props.project.endDay}
          />
        </Col>
      </Form.Group>
      <CheckButton
        className={'mt-3 text-center'}
        submitHandler={confirmEdit}
        cancelHandler={deleteId}
        project={props.project}
      />
    </Form>
  );
};

export default EditForm;
