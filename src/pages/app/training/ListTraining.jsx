import React from "react";
import Breadcrumb from "../../../components/Breadcrum";
import InputSearch from "../../../components/InputSearch";
import SideBar from "../../../Layout/SideBar";
import Test from "../../../assets/capture.png";
import music from "../../../assets/music.png";
import { Button } from "../../../components/Button";

const ListTraining = () => {
  const trainings = [
    {
      title: "What is SaaS? Software as a Service Explained",
      desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",
      img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      authorName: "Mohaned ben mansour",
      date: "Jan 1 2022",
      href: "javascript:void(0)",
    },
    {
      title: "A Quick Guide to WordPress Hosting",
      desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",
      img: Test,
      authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
      authorName: "Omar Elloumi",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "7 Promising VS Code Extensions Introduced in 2022",
      desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",
      img: music,
      authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
      authorName: "Feriel Hamrouni",
      date: "Feb 6 2022",
      href: "javascript:void(0)",
    },
    {
      title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
      desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
      img: "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
      authorName: "Lourin",
      date: "Mar 26 2022",
      href: "javascript:void(0)",
    },
  ];
  return (
    <div>
      <Breadcrumb title={"Training > List of trainings"} />
      <div className="flex flex-row pt-1">
        <section className="mt-6 mx-auto px-2 max-w-screen-xl lg:px-4">
          <div className="flex justify-between text-start">
            <div>
              <h1 className="text-4xl text-gray-800 font-semibold">
                List of trainings
              </h1>
              <p className="mt-3 text-gray-500">
                Trainings that are loved by the community. Updated every hour.
              </p>
            </div>
            <InputSearch />
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {trainings.map((items, key) => (
              <article
                className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
                key={key}
              >
                <a href={items.href}>
                  <img
                    src={items.img}
                    loading="lazy"
                    alt={items.title}
                    className="w-full h-48 rounded-t-md"
                  />
                  <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                    <div className="flex-none w-10 h-10 rounded-full">
                      <img
                        src={items.authorLogo}
                        className="w-full h-full rounded-full"
                        alt={items.authorName}
                      />
                    </div>
                    <div className="ml-3">
                      <span className="block text-gray-900">
                        {items.authorName}
                      </span>
                      <span className="block text-gray-400 text-sm">
                        {items.date}
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 ml-4 mr-2 mb-3">
                    <h3 className="text-xl text-gray-900">{items.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{items.desc}</p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ListTraining;
