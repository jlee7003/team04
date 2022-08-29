import { Card, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { UserStateContext } from "../../App";
import CertificateCard from "./CertificateCard";
import CertificateForm from "./CertificateForm";
import * as Api from "../../api";
import displayToggleCss from "../../styles/displayToggle.css";

const Certificate = ({ isEditable, paramsUserId }) => {
  const userState = useContext(UserStateContext);
  const id = userState?.user?.id;

  const [isEditing, setIsEditing] = useState(false);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    getData();
  }, [paramsUserId]);

  async function getData() {
    const getRes = await Api.get(
      "certificates",
      paramsUserId ? paramsUserId : id
    );
    const datas = getRes.data;
    let dataArr = [];
    dataArr = datas.map((ele) => [ele.id, ele.title, ele.content, ele.day]);
    setArr(dataArr);
  }

  return (
    <Card className="mb-2 ms-3 mr-5">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {arr.map((ele, idx) => {
          return (
            <>
              <CertificateCard
                key={ele}
                arr={arr}
                idx={idx}
                setArr={setArr}
                isEditable={isEditable}
              ></CertificateCard>
            </>
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
        {isEditable&&(
          <>
          <Button
            className="btn btn-primary toggleTarget"
            onClick={() => setIsEditing(true)}
            >
            +
            </Button>
          </>
        )}
        </div>
        {isEditing && (
          <CertificateForm
            arr={arr}
            setArr={setArr}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          ></CertificateForm>
        )}
      </Card.Body>
    </Card>
  );
};

export default Certificate;
