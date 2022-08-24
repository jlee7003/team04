import React, {useState} from "react";
import {Button, Form, Col, Row} from "react-bootstrap";
import "../../../src/index.css";

const EducationForm = ({
                           onConfirm,
                           onCancel,
                           education,
                       }) => {

    const [targetEducation, setTargetEducation] = useState({
        ...education,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTargetEducation({
            ...targetEducation,
            [name]: value,
        });
    }

    const handleConfirm = () => {
        onConfirm({...targetEducation});
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Form className="margin10">
            <input
                className="form-control"
                placeholder="학교 이름"
                name="schoolName"
                value={targetEducation.schoolName}
                onChange={handleChange}
            ></input>
            <br/>
            <input
                className="form-control"
                placeholder="전공"
                name="major"
                value={targetEducation.major}
                onChange={handleChange}
            ></input>
            <br/>
            <div className="mb-3 mt-3">
                <div className="form-check form-check-inline">
                    <input
                        name="position"
                        type="radio"
                        id="radio-add-1"
                        className="form-check-input"
                        value="재학중"
                        checked={targetEducation.position === '재학중'}
                        onChange={handleChange}
                    ></input>
                    <label title="" htmlFor="radio-add-1" className="form-check-label">
                        재학중
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        name="position"
                        type="radio"
                        id="radio-add-2"
                        className="form-check-input"
                        value="학사졸업"
                        checked={targetEducation.position === '학사졸업'}
                        onChange={handleChange}
                    ></input>
                    <label title="" htmlFor="radio-add-2" className="form-check-label">
                        학사졸업
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        name="position"
                        type="radio"
                        id="radio-add-3"
                        className="form-check-input"
                        value="석사졸업"
                        checked={targetEducation.position === '석사졸업'}
                        onChange={handleChange}
                    ></input>
                    <label title="" htmlFor="radio-add-3" className="form-check-label">
                        석사졸업
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        name="position"
                        type="radio"
                        id="radio-add-4"
                        className="form-check-input"
                        value="박사졸업"
                        checked={targetEducation.position === '박사졸업'}
                        onChange={handleChange}
                    ></input>
                    <label title="" htmlFor="radio-add-4" className="form-check-label">
                        박사졸업
                    </label>
                </div>
            </div>
            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{span: 20}}>
                    <Button variant="primary" type="button" className="me-3" onClick={handleConfirm}>
                        확인
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
};
export default EducationForm;
