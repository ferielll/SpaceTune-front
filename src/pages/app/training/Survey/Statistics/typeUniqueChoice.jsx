import { React } from "react";
import { Doughnut } from "react-chartjs-2";
import { chartColors } from "./colors";

const TypeUniqueChoice = ({ views }) => {
  let answers = [];
  let counter = [];

  for (const [key, value] of Object.entries(views.choices)) {
    answers.push(key);
    counter.push(value);
  }

  const pieData = {
    maintainAspectRatio: false,
    responsive: true,
    labels: answers,
    datasets: [
      {
        data: counter,
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  };
  return (
    <div className="w-1/3">
      <h5>
        Question {views.nq}: {views.question}
      </h5>
      <Doughnut data={pieData} />
    </div>
  );
};

export default TypeUniqueChoice;
