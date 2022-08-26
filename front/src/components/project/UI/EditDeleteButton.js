import React, { useContext } from 'react';
import * as Api from '../../../api';

import AuthContext from '../stores/AuthContext';
import { Col, Button } from 'react-bootstrap';

const EditDeleteButton = (props) => {
  const context = useContext(AuthContext);

  const checkDelete = async (id) => {
    const isConfirm = true;

    if (isConfirm) {
      await confirmDelete(id);
    }
  };

  const confirmDelete = async (id) => {
    await Api.delete(props.DATA_ENDPOINT, id);
    await props.callFetch();
  };

  const getIdList = (id) => {
    context.setEditIdList((prevState) =>
      context.editIdList.includes(id) ? prevState : [...prevState, id]
    );
  };

  return (
    <Col className="col-lg-1">
      <Button
        variant="outline-info"
        size="sm"
        className="mr-3 btn btn-outline-info btn-sm"
        onClick={() => {
          getIdList(props.project.id);
        }}
      >
        편집
      </Button>
      <Button
        variant="outline-info"
        size="sm"
        className="mr-3 btn btn-outline-info btn-sm"
        onClick={() => checkDelete(props.project.id)}
      >
        삭제
      </Button>
    </Col>
  );
};

export default EditDeleteButton;
