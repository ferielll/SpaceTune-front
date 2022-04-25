import React, { useState, useEffect } from "react";
import "./survey.css";
import { Accordion, Form, Col, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { TrashIcon } from "evergreen-ui";
import { Button } from "antd";

const typeQuestion = [
  {
    label: "Multiple choice",
    value: "multipleChoice",
  },
  {
    label: "Unique choice",
    value: "uniqueChoice",
  },
  {
    label: "Short answer",
    value: "text",
  },
  {
    label: "Number",
    value: "number",
  },
];

let Select_Type_Question = typeQuestion.map((option, key) => (
  <option key={key} value={option.value}>
    {option.label}{" "}
  </option>
));

const Formquiz = ({ setquiz, editquiz, setEditquiz }) => {
  const [Formquiz, setFormquiz] = useState({
    id: uuidv4(),
    quizName: "",
    quizDescription: "",
    quizQuestions: [
      {
        question: "",
        typeQuestion: "",
        choices: ["", ""],
      },
    ],
  });

  //handle quizName & quizDescription
  let handleChange = (event) => {
    setFormquiz((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  //handle question
  function handleChangeQuestion(i, event) {
    const values = { ...Formquiz };
    values.quizQuestions[i].question = event.target.value;
    setFormquiz(values);
  }

  //handle type quesiton
  function handleChangeTypeQuestion(i, event) {
    const values = { ...Formquiz };
    values.quizQuestions[i].typeQuestion = event.target.value;
    setFormquiz(values);
  }

  //handle choices inputs
  function handleChangeChoices(i, c, event) {
    const values = { ...Formquiz };
    values.quizQuestions[i].choices[c] = event.target.value;
    setFormquiz(values);
  }

  //Add Accordion (Question)
  let handleAddClick = () => {
    let values = [...Formquiz.quizQuestions];
    values.push({
      question: "",
      typeQuestion: "",
      choices: ["", ""],
    });
    setFormquiz((prev) => ({ ...prev, quizQuestions: values }));
  };

  //Delete Accordion (Question)
  let handleDeleteClick = (i) => {
    const values = [...Formquiz.quizQuestions];
    values.splice(i, 1);
    setFormquiz((prev) => ({ ...prev, quizQuestions: values }));
  };

  //Add choice
  function handleAddChoice(i) {
    const values = { ...Formquiz };
    values.quizQuestions[i].choices.push("");
    setFormquiz(values);
  }

  //Remove choice from question[i]
  const handleRemoveChoice = (i, c) => {
    const values = [...Formquiz.quizQuestions];
    values[i].choices.splice(c, 1);
    setFormquiz((prev) => ({ ...prev, quizQuestions: values }));
  };

  //Clear Formquiz
  const clearState = () => {
    setFormquiz({
      quizName: "",
      quizDescription: "",
      quizQuestions: [
        {
          question: "",
          typeQuestion: "",
          choices: ["", ""],
        },
      ],
    });
    setEditquiz(null);
  };

  //Submit Formquiz
  let handleSubmit = (e) => {
    e.preventDefault();
    //get UserConnected ID
    let token = localStorage.getItem("token");
    axios
      .post("http://localhost:3000/spacetune/api/survey/create", Formquiz, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      })
      .then((res) => {
        const { _id, quizName, quizDescription } = res.data;
        setquiz(
          {
            _id,
            quizName,
            quizDescription,
          },
          console.log("success")
        );
      })
      .catch((error) => {
        console.log(error);
      });
    clearState();
  };

  //find the quiz to edit
  useEffect(() => {
    if (editquiz != null) {
      async function ViewOldquiz() {
        await axios
          .get(
            `http://localhost:3000/spacetune/api/survey/detailSurvey/${editquiz}`
          )
          .then((response) => {
            setFormquiz(response.data);
          });
      }
      ViewOldquiz();
    }
  }, [editquiz]);

  //Edit quiz
  const onClickEditQuiz = (e) => {
    e.preventDefault();
    //get UserConnected ID
    let token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:3000/spacetune/api/survey/updateSurvey/${editquiz}`,
        Formquiz,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      )
      .then((res) => {
        const { _id, quizName, quizDescription } = res.data;
        setquiz({ _id, quizName, quizDescription });
        setEditquiz(null);
      })
      .catch((error) => {
        console.log(error);
      });
    clearState();
  };

  return (
    <div key={Formquiz.id}>
      <Form id="quiz" name="quizQuestion" onSubmit={handleSubmit}>
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {editquiz ? "Edit" : "New"} QUIZ
            </h3>
            <div className="flex space-x-10">
              <button
                type="submit"
                onClick={(e) => {
                  editquiz && onClickEditQuiz(e);
                }}
              >
                {editquiz ? "Edit" : "Save"}
              </button>

              <Button
                size="middle"
                className={` text-black text-sm font-medium py-1 px-4 rounded-lg transition-duration-200
                           shadow-md hover:text-black `}
                onClick={clearState}
              >
                Cancel
              </Button>
            </div>
          </div>
          <Form.Group
            className="mb-3 mt-3 p-2 border border-solid"
            controlId="formBasicText"
          >
            <Form.Label>
              <h6>Title</h6>{" "}
            </Form.Label>
            <Form.Control
              name="quizName"
              value={Formquiz.quizName}
              onChange={handleChange}
              type="text"
            />
            <Form.Label className="mt-2">
              <h6> Description </h6>{" "}
            </Form.Label>
            <Form.Control
              as="textarea"
              name="quizDescription"
              style={{ height: "5em" }}
              value={Formquiz.quizDescription}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        {Formquiz.quizQuestions.map((question, i) => {
          return (
            <div key={i} className="mt-4">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Question {i + 1}</Accordion.Header>
                  <Accordion.Body>
                    <div className="flex items-center space-x-5">
                      <div className="w-3/4">
                        <Form.Group className="mb-3" controlId="formBasicText">
                          <Form.Text>
                            <strong>Question </strong>
                          </Form.Text>
                          <Form.Control
                            name="question"
                            className="mt-2"
                            type="text"
                            placeholder="Enter your question"
                            key={i}
                            value={question.question}
                            onChange={(e) => {
                              handleChangeQuestion(i, e);
                            }}
                          />
                        </Form.Group>
                      </div>
                      <div className="w-1/4">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Text>
                            {" "}
                            <strong> Type de question </strong>
                          </Form.Text>
                          <Form.Select
                            name="typeQuestion"
                            className="mt-2"
                            value={question.typeQuestion}
                            onChange={(e) => {
                              handleChangeTypeQuestion(i, e);
                            }}
                          >
                            <option></option>
                            {Select_Type_Question}
                          </Form.Select>
                        </Form.Group>
                      </div>
                    </div>
                    {question.choices.map((choice, c) => {
                      return (
                        <Form.Group key={c} className="mb-3">
                          {(() => {
                            switch (question.typeQuestion) {
                              case "uniqueChoice":
                                return (
                                  <Row key={c} className="flex items-center">
                                    <Col xs={1}>
                                      <Form.Check
                                        style={{ fontSize: "1.4em" }}
                                        type="radio"
                                        disabled={true}
                                      />
                                    </Col>
                                    <Col xs={10}>
                                      <Form.Control
                                        name="choice"
                                        placeholder="choice"
                                        value={choice}
                                        onChange={(e) => {
                                          handleChangeChoices(i, c, e);
                                        }}
                                      ></Form.Control>
                                    </Col>
                                    <Col xs={1}>
                                      <i
                                        className="w-7 h-7 cursor-pointer"
                                        onClick={(e) => {
                                          handleRemoveChoice(i, c, e);
                                        }}
                                      >
                                        X
                                      </i>
                                    </Col>
                                  </Row>
                                );
                              case "multipleChoice":
                                return (
                                  <Row key={c} className="flex items-center">
                                    <Col xs={1}>
                                      <Form.Check
                                        style={{ fontSize: "1.4em" }}
                                        type="checkbox"
                                        disabled={true}
                                      />
                                    </Col>
                                    <Col xs={10}>
                                      <Form.Control
                                        name="choice"
                                        placeholder="choice"
                                        value={choice}
                                        onChange={(e) => {
                                          handleChangeChoices(i, c, e);
                                        }}
                                      ></Form.Control>
                                    </Col>
                                    <Col xs={1}>
                                      <i
                                        className="w-7 h-7 cursor-pointer"
                                        onClick={(e) => {
                                          handleRemoveChoice(i, c, e);
                                        }}
                                      >
                                        X
                                      </i>
                                    </Col>
                                  </Row>
                                );
                              case "text":
                                if (c === 0)
                                  return (
                                    <Form.Control
                                      key={c}
                                      size="sm"
                                      name="text_input"
                                      type="text"
                                      onChange={(e) => {
                                        handleChangeChoices(i, c, e);
                                      }}
                                      placeholder="Enter your answer"
                                      disabled={true}
                                    />
                                  );
                                break;
                              case "number":
                                if (c === 0)
                                  return (
                                    <Form.Control
                                      key={c}
                                      size="sm"
                                      name="number_input"
                                      type="number"
                                      onChange={(e) => {
                                        handleChangeChoices(i, c, e);
                                      }}
                                      placeholder="Enter a number"
                                      disabled={true}
                                    />
                                  );
                                break;
                              default:
                                break;
                            }
                          })()}
                        </Form.Group>
                      );
                    })}
                    <div className="flex justify-between items-center">
                      {["multipleChoice", "uniqueChoice"].includes(
                        `${question.typeQuestion}`
                      ) ? (
                        <div>
                          <i
                            className="bi bi-plus add-icon"
                            onClick={(e) => {
                              handleAddChoice(i, e);
                            }}
                          >
                            add new choice
                          </i>
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {question.typeQuestion && (
                        <div className="flex justify-self-end">
                          <TrashIcon
                            className="w-10 h-10 text-red-400 cursor-pointer"
                            onClick={(e) => {
                              handleDeleteClick(i, e);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        })}
        <div>
          <Button
            size="sm"
            className="my-3 text-blue-500 border-blue-500"
            variant="outline-primary"
            onClick={handleAddClick}
          >
            {" "}
            + new question
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Formquiz;
