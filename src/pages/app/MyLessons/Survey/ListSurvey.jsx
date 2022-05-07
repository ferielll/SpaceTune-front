import { React, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./survey.css";
import axios from "axios";
import { DeleteIcon } from "evergreen-ui";
import ConfirmModal from "../../../../components/Modal/ConfirmModal";
import { useLoading } from "../../../../hooks/useLoading";
import { Empty } from "antd";

function ListSurvey({ survey, setEditquiz }) {
  const [list, setlistSurvey] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { startLoading, stopLoading } = useLoading(false);
  const { id } = useParams();
  async function deleteQuiz(selectedItem) {
    startLoading();
    await axios
      .delete(
        `http://localhost:3000/spacetune/api/survey/deletesurvey/${selectedItem._id}`
      )
      .then((res) => {
        setShouldRefresh(!shouldRefresh);
      });
    stopLoading();
    setShowDeleteModal(false);
    setSelectedItem(null);
  }

  function handleSurveyID(e, i) {
    setEditquiz(list[i]._id);
  }

  useEffect(() => {
    //get UserConnected ID
    let token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/spacetune/api/survey/listSurveys/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      })
      .then((response) => {
        setlistSurvey(response.data.courses);
        console.log(response.data, "response");
      });
  }, [survey, shouldRefresh]);

  console.log(list, "list");

  return (
    <div className="mt-3">
      <h3 className="text-xl font-semibold">List quizs</h3>
      <div className="col-lg-10 col-md-12 col-sm-12 mt-4">
        <ListGroup className="list-group mt-2 ">
          {showDeleteModal && (
            <ConfirmModal
              title={`Are you sure to delete thie quiz "${selectedItem.quizName}" ?`}
              confirmButton="Delete"
              cancelButton="Cancel"
              onClickCancel={() => setShowDeleteModal(false)}
              onClickConfirm={() => deleteQuiz(selectedItem)}
            />
          )}
          {list.length !== 0 ? (
            list.map((survey, i) => {
              return (
                <ListGroup.Item key={i} className="list-group-item">
                  <div>
                    <strong
                      style={{ color: "#1c78fa" }}
                      className="text-uppercase mr-4"
                    >
                      {survey.quizName}
                    </strong>
                  </div>
                  <div className="mt-2">
                    <strong>Descirption: </strong>
                    <p style={{ textAlign: "justify" }}>
                      {survey.quizDescription}
                    </p>
                  </div>
                  <div className="mt-2">
                    <Link
                      style={{
                        textDecoration: "none",
                        position: "absolute",
                        top: "7px",
                        right: "20px",
                      }}
                      exact
                      to={`viewStat/${survey._id}`}
                      title="Take a look"
                    >
                      view stat
                    </Link>
                  </div>
                  <div className="d-flex ml-auto">
                    <span
                      title="Delete"
                      className="p-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedItem(survey);
                      }}
                    >
                      <DeleteIcon className="w-5  h-5" />
                    </span>
                    <span
                      title="Edit"
                      className="p-2"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        handleSurveyID(e, i);
                      }}
                    >
                      edit
                    </span>
                  </div>
                </ListGroup.Item>
              );
            })
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>Empty list</span>}
            />
          )}
        </ListGroup>
      </div>
    </div>
  );
}

export default ListSurvey;
