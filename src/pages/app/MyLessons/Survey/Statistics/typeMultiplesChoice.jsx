import { React } from "react";
import { Bar } from "react-chartjs-2";
import { chartColors } from "./colors";

const TypeMultiplesChoice = ({ views }) => {
  let answers = [];
  let counter = [];

  for (const [key, value] of Object.entries(views.choices)) {
    answers.push(key);
    counter.push(value);
  }
  const dataBar = {
    labels: answers,
    datasets: [
      {
        label: "users answer",
        backgroundColor: chartColors,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: counter,
      },
    ],
  };
  return (
    <div className="w-1/3 mx-2">
      <h5 className="text-red-500 font-semibold">
        Question {views.nq}: {views.question}
      </h5>
      <Bar data={dataBar} width={50} height={50} />
    </div>
  );
};

export default TypeMultiplesChoice;
