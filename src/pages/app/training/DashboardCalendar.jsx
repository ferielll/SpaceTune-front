import Breadcrumb from "../../../components/Breadcrum";
import Title from "../../../components/Title";
import { Fragment, useEffect, useState } from "react";
import { SideBar } from "../../../Layout/SideBar";
import { Calendar, Badge } from "antd";
import { CalendarIcon, DocumentIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useUser } from "../../../hooks/useUser";

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
  const [events, setevents] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `http://localhost:3000/spacetune/api/formation/getAllOnlineLessons/${user._id}`
        )
        .then((res) => setevents(res.data));
    }
    fetchData();
  }, []);

  function getListData(value) {
    let listData = [];
    if (events && events[value.date()]) {
      events.forEach((element) => {
        listData.push({
          type: "success",
          content: `${element.name}`,
        });
      });
    }
    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, i) => (
          <li key={i}>
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
