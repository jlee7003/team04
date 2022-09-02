import { Col } from 'react-bootstrap';
import EditDeleteButton from './EditDeleteButton';

const ProjectCard = (props) => {
  return (
    <div className="mb-4">
      <div className="align-items-center row">
        <Col id="widthx" style={{ width: '584px' }}>
          {props.project.title} <br />
          <span className="text-muted">{props.project.content}</span> <br />
          <span className="text-muted">{`${
            props.project.startDay.split('T')[0]
          } ~ ${props.project.endDay.split('T')[0]}`}</span>
        </Col>
        {props.isEditable && (
          <EditDeleteButton
            project={props.project}
            callFetch={props.callFetch}
            editIdList={props.editIdList}
            setEditIdList={props.setEditIdList}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
