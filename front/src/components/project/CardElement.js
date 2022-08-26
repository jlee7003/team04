import React, { useContext } from 'react';

import ListForm from './UI/ListForm';
import EditForm from './UI/EditForm';
import AuthContext from './stores/AuthContext';

const CardElement = (props) => {
  const context = useContext(AuthContext);

  return props.data.map((project) =>
    context.editIdList.includes(project.id) ? (
      <EditForm
        project={project}
        key={project.id}
        DATA_ENDPOINT={props.DATA_ENDPOINT}
        callFetch={props.callFetch}
      />
    ) : (
      <ListForm
        isEditable={props.isEditable}
        project={project}
        key={project.id}
        DATA_ENDPOINT={props.DATA_ENDPOINT}
        callFetch={props.callFetch}
      />
    )
  );
};

export default CardElement;
