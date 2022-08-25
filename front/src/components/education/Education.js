import { Card } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import EducationForm from "./EducationForm";
import EducationCard from "./EducationCard";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
const Education = ({ isEditable, paramsUserId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const toggleAddEducationForm = () => {
    setIsAdding(!isAdding);
  };

  const [educations, setEducations] = useState([]);
  const userState = useContext(UserStateContext);
  const educationid = userState.user.id;
  // const educationid = "a1c1764c-3288-4174-b432-2f49afd96d9d";
  // 추가 - 확인 함수
  const confirmAddEducation = (targetEducation) => {
    // TODO : 학교이름, 전공 유효성 검사
    targetEducation.id = Date.now();
    const resultEducations = [...educations, targetEducation];
    setEducations([...resultEducations]);
    setIsAdding(false);
  };
  console.log(educations, "educations");
  console.log(window.location);

  const cancelAddEducation = () => {
    setIsAdding(false);
  };
  //paramsUserId  = 선택한 유저 아이디 가져오기
  console.log();
  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("educationList", paramsUserId).then((res) =>
      setEducations(res.data)
    );
  }, [paramsUserId]);

  return (
    <Card className="mb-2 ms-3 mr-5 ">
      <Card.Body>
        <Card.Title>학력</Card.Title>
        <EducationCard educations={educations} setEducations={setEducations} />
      </Card.Body>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {isEditable ? (
          <button className="btn btn-primary" onClick={toggleAddEducationForm}>
            +
          </button>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          margin: "0 0 1rem 0",
        }}
      >
        {isAdding ? (
          <EducationForm
            onConfirm={confirmAddEducation}
            onCancel={cancelAddEducation}
            education={{
              id: null,
              school: "",
              major: "",
              position: "재학중",
            }}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default Education;
