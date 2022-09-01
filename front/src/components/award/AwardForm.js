import {
  Container,
  Col,
  Row,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { useState, useContext } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import aniCss from "../../styles/anime.css";

const AwardForm = (props) => {
  const userState = useContext(UserStateContext);

  const [award, setAward] = useState("");
  const [details, setDetails] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (award === "" || details === "") {
      setIsEmpty(false);
      return;
    }

    setIsEmpty(true);

    const awardObj = {
      title: award,
      description: details,
    };

    await Api.post("award", awardObj);

    const res2 = await Api.get("awards", userState.user.id);
    const datas = res2.data;

    let dataArr = [];
    dataArr = datas.map((ele) => [ele.id, ele.title, ele.description]);
    props.setArr(dataArr);

    setAward("");
    setDetails("");
  };

  return (
    <Form onSubmit={handleSubmit} className="toggleTarget">
      <Form.Group controlId="awardID" className="mt-3 mb-3 form-floating">
        <Form.Label style={{ color: "black" }}> </Form.Label>
        {!isEmpty && (
          <div className="text-danger text-center" style={{ aniCss }}>
            <span id="anime">빈 값이 있습니다.</span>
          </div>
        )}
        <FloatingLabel
          label="수상 내역"
          className="mt-3 mb-3"
          style={{ color: "black" }}
        >
          <Form.Control
            type="text"
            autoComplete="on"
            value={award}
            placeholder="수상 내역"
            style={{ color: "black" }}
            onChange={(e) => setAward(e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group controlId="detailsID" className="mt-3 mb-3 form-floating">
        <FloatingLabel
          label="상세 내역"
          className="mt-3 mb-3"
          style={{ color: "black" }}
        >
          {" "}
          <Form.Control
            type="text"
            autoComplete="on"
            value={details}
            placeholder="상세 내역"
            style={{ color: "black" }}
            onChange={(e) => setDetails(e.target.value)}
          />
        </FloatingLabel>
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

export default AwardForm;
