import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TypeTEXT from "./typeTEXT";
import TypeUniqueChoice from "./typeUniqueChoice";
import TypeMultipleChoices from "./typeMultiplesChoice";

function ViewStats() {
  //initialise Collect answer
  const [views, setViews] = useState({
    details: {},
    stats: [{ choices: [], question: "", typeQuestion: "" }],
  });

  //get idsurvey
  const idSurvey = useParams();

  //get survey details
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/spacetune/api/survey/viewStat/${idSurvey.idSurvey}`
      )
      .then((response) => {
        setViews(response.data);
      });
  }, [idSurvey.idSurvey]);

  return (
    <div className="w-3/4 p-10">
      <h1 className="text-base font-semibold uppercase">
        Dashboard: {views.details.quizName}
      </h1>
      <h1 className="text-base font-semibold uppercase">Description:</h1>
      <p className="text-base">{views.details.quizDescription}</p>

      <div className="mt-4">
        <div className="flex">
          {views.stats.map((s, i) => {
            let type = s.typeQuestion;
            switch (type) {
              case "text":
                return <TypeTEXT views={s} />;
              case "uniqueChoice":
                return <TypeUniqueChoice views={s} />;
              case "multipleChoice":
                return <TypeMultipleChoices views={s} />;
              default:
                break;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewStats;
