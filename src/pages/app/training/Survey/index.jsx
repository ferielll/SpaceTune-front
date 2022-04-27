import { React, useState } from "react";
import Formquiz from "./FormSurvey";
import ListSurvey from "./ListSurvey";

const Survey = () => {
  const [survey, setSurvey] = useState({});
  const [editquiz, setEditquiz] = useState(null);
  return (
    <div className="flex justify-center">
      <div key={1} className="w-5/12">
        <ListSurvey survey={survey} setEditquiz={setEditquiz} />
      </div>
      <div key={2} className="w-6/12">
        <Formquiz
          setSurvey={setSurvey}
          editquiz={editquiz}
          setEditquiz={setEditquiz}
        />
      </div>
    </div>
  );
};

export default Survey;
