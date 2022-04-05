import Breadcrumb from "../../../components/Breadcrum";
import Title from "../../../components/Title";
import { Fragment, useState } from "react";
import { SideBar } from "../../../Layout/SideBar";
import { CalendarIcon, DocumentIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";

const Courses = () => {
  const location = useLocation();
  const items = [
    {
      name: "My lessons",
      icon: <DocumentIcon />,
      to: "/training/dashboardLessons/calendar",
    },
    {
      name: "Courses",
      icon: <DocumentIcon />,
      to: `${location.pathname}/courses`,
    },
    {
      name: "Calendar",
      icon: <CalendarIcon />,
      to: `${location.pathname}/courses`,
    },
  ];

  const Demo = () => {
    const [fileList, setFileList] = useState([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
    ]);

    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };

    const onPreview = async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };

    return (
      <ImgCrop rotate>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
    );
  };
  return (
    <Fragment>
      <Breadcrumb title={"Dashboard > Calendar"} />
      <SideBar items={items} />
      <div className="flex flex-row justify-center pt-1 mx-auto">
        <div className="mt-4 px-2 w-full max-w-7xl lg:px-4">
          <div className="flex justify-between text-start w-full">
            <Title title="Courses" />
          </div>
          <Demo />
        </div>
      </div>
    </Fragment>
  );
};

export default Courses;
