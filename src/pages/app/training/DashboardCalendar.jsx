import Breadcrumb from "../../../components/Breadcrum";
import Title from "../../../components/Title";
import { Fragment } from "react";
import { SideBar } from "../../../Layout/SideBar";
import { Calendar, Badge } from "antd";
import { CalendarIcon, DocumentIcon } from "@heroicons/react/outline";

const DashboardCalendar = () => {
  const items = [
    {
      name: "My lessons",
      icon: <DocumentIcon />,
      to: "/training/dashboardLessons/calendar",
    },
    {
      name: "Courses",
      icon: <DocumentIcon />,
      to: "courses",
    },
    {
      name: "Calendar",
      icon: <CalendarIcon />,
      to: "calendar",
    },
  ];

  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
        ];
        break;
      case 10:
        listData = [
          { type: "warning", content: "This is warning event." },
          { type: "success", content: "This is usual event." },
          { type: "error", content: "This is error event." },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "This is warning event" },
          {
            type: "success",
            content: "This is very long usual event。。....",
          },
          { type: "error", content: "This is error event 1." },
          { type: "error", content: "This is error event 2." },
          { type: "error", content: "This is error event 3." },
          { type: "error", content: "This is error event 4." },
        ];
        break;
      default:
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  return (
    <Fragment>
      <Breadcrumb title={"Dashboard > Calendar"} />
      <SideBar items={items} />
      <div className="flex flex-row justify-center pt-1 mx-auto">
        <div className="mt-4 px-2 w-full max-w-7xl lg:px-4">
          <div className="flex justify-between text-start w-full">
            <Title title="Calendar" />
          </div>
          <div>
            <Calendar
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardCalendar;
