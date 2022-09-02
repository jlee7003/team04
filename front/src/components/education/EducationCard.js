import React, { useState, useContext } from "react";
import "../../../src/styles/index.css";
import EducationForm from "./EducationForm";
import * as Api from "../../api";
import { Col, Button } from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import { useLocation } from "react-router";
import { UserStateContext } from "../../App";
import ErrorModalContext from "../stores/ErrorModalContext";

function EducationCard({ educations, setEducations, isEditable }) {
  const errorModalContext = useContext(ErrorModalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [byEditbtn, setByEditbtn] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const userState = useContext(UserStateContext);
  const id = userState?.user?.id;
  let { state } = useLocation();
  if (state === null || typeof state === "object") {
    state = id;
  }
  const toggleEditEducationForm = (id) => {
    if (targetId === id && isEditing) {
      setTargetId(null);
      setIsEditing(false);
    } else {
      setTargetId(id);
      setIsEditing(true);
    }
  };

  const confirmEditEducation = (targetEducation) => {
    const resultEducations = [...educations];
    resultEducations[
      resultEducations.findIndex(
        (education) => education.id === targetEducation.id
      )
    ] = {
      ...targetEducation,
    };
    setEducations([...resultEducations]);
    cancelEditEducation();
  };

  const cancelEditEducation = () => {
    setIsEditing(false);
    setTargetId(null);
  };

  const onRemove = async (educationid) => {
    setEducations(
      educations.filter((education) => education.id !== educationid)
    );

    try {
      await Api.delete(`education/${educationid}`);
    } catch (err) {
      errorModalContext.setModalText(
        `${err.message} // 학력 데이터를 삭제하는 과정에서 문제가 발생했습니다.`
      );
    }
    console.log("삭제 완료", educationid);
  };

  const EditHandle = () => {
    setByEditbtn(true);
  };

  return (
    <div>
      <div>
        {educations.map((education, index) => {
          return (
            <div key={education.id} className="mb-4 card-text">
              <div className="align-items-center row">
                {!isEditing && (
                  <div className="col">
                    <div className="text-muted">{education.school}</div>
                    <div className="text-muted">
                      {education.major} ({education.position})
                    </div>
                  </div>
                )}
                {!isEditing && id === state && isEditable ? (
                  <Col className="col-lg-1 col">
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="me-1 mb-1 mr-3 btn btn-outline-info btn-sm toggleTarget"
                      onClick={() => {
                        toggleEditEducationForm(education.id);
                        EditHandle();
                      }}
                    >
                      편집
                    </Button>
                    <DeleteButton
                      educationid={education.id}
                      onRemove={onRemove}
                    ></DeleteButton>
                  </Col>
                ) : null}
              </div>
              {isEditing && education.id === targetId && (
                <EducationForm
                  education={{
                    ...education,
                  }}
                  onConfirm={confirmEditEducation}
                  onCancel={cancelEditEducation}
                  byEditbtn={byEditbtn}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EducationCard;
