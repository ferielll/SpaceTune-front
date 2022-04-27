import { React, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "antd/lib/modal/Modal";
import Answer from "./Answer";

function DisplaySurveys({ survey }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex items-center mt-2">
      {survey.map((s, i) => {
        return (
          <Card key={i} border="primary" className="w-1/2 h-40 mx-2">
            <Card.Body>
              <Card.Title>
                <strong>Survey: </strong> {s.quizName}
              </Card.Title>
              <Card.Text>
                <strong>Description: </strong> {s.quizDescription}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="mt-2 text-center">
              <span
                className="font-bold text-blue-500"
                onClick={() => {
                  setSelectedQuiz(s._id);
                  setShowModal(true);
                }}
              >
                Answer this quiz
              </span>
              <i
                className="bi bi-pencil-fill"
                style={{
                  fontSize: "1rem",
                  color: "cornflowerblue",
                  marginLeft: "0.4em",
                }}
              ></i>
            </Card.Footer>
          </Card>
        );
      })}
      {showModal && (
        <Answer
          idPreview={selectedQuiz}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default DisplaySurveys;
