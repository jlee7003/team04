import {
  Container,
  Col,
  Row,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import { useState, useContext } from 'react';
import { UserStateContext } from '../../App';
import * as Api from '../../api';
import styles from '../../styles/anime.css';

const CertificateForm = (props) => {
  const userState = useContext(UserStateContext);

  const [certificate, setCertificate] = useState('');
  const [details, setDetails] = useState('');
  const [day, setDay] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (certificate === '' || details === '' || day === '') {
      setIsEmpty(false);
      return;
    }

    setIsEmpty(true);

    const certificateObj = {
      title: certificate,
      content: details,
      day: day,
    };

    await Api.post('certificate', certificateObj);

    const getRes = await Api.get('certificate', userState.user.id);
    const datas = getRes.data;
    let dataArr = [];

    dataArr = datas.map((ele) => [ele.id, ele.title, ele.content, ele.day]);
    props.setArr(dataArr);
    setCertificate('');
    setDetails('');
    setDay('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateID">
        {!isEmpty && (
          <div className="text-danger text-center" style={{ styles }}>
            <span id="anime">빈 값이 있습니다.</span>
          </div>
        )}
        <FloatingLabel label="자격증 제목" className="mt-3 mb-3">
          <Form.Control
            type="text"
            autoComplete="on"
            value={certificate}
            placeholder="자격증 제목"
            onChange={(e) => setCertificate(e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="detailsID" className="mt-3">
        <FloatingLabel label="상세 내역" className="mb-3">
          <Form.Control
            type="text"
            autoComplete="on"
            value={details}
            placeholder="상세 내역"
            onChange={(e) => setDetails(e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="dayID" className="mt-3">
        <Form.Control
          type="date"
          autoComplete="on"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary ms-3" type="submit" onSubmit={handleSubmit}>
            확인
          </Button>
          <Button
            variant="secondary ms-3"
            onClick={() => props.setIsEditing(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CertificateForm;
