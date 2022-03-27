import React from "react";
import Spacetune from "../../../assets/spacetuneWidth.png";
import Music from "../../../assets/music.png";
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";
import { Footer } from "../home/footer";

export default function Home() {
  const features = [
    {
      name: "Competitive exchange rates",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: GlobeAltIcon,
    },
    {
      name: "No hidden fees",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: ScaleIcon,
    },
    {
      name: "Transfers are instant",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: LightningBoltIcon,
    },
    {
      name: "Mobile notifications",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: AnnotationIcon,
    },
  ];
  return (
    <div>
      <>
      <div className="pt-24 pb-36 mx-auto px-4 sm:px-8 bg-black">
        <div className="text-center space-y-4">
          <h1 className="text-white font-bold text-4xl md:text-5xl">
            Optimize your website for
            <span className="text-indigo-600"> Search engine</span>
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum
          </p>
        </div>
        <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
          <a
            href="javascript:void(0)"
            className="px-10 py-3.5 w-full bg-indigo-600 text-white text-center rounded-md shadow-md block sm:w-auto"
          >
            Get started
          </a>
          <a
            href="javascript:void(0)"
            className="px-10 py-3.5 w-full text-white text-center border rounded-md duration-300 hover:font-semibold hover:text-indigo-600 hover:bg-white hover:shadow block sm:w-auto"
          >
            Try it out
          </a>
        </div>
      </div>
      <div className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-navbar-color  text-white">
        <div className="">
          <div className="flex flex-wrap justify-center mx-4">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                <h2
                  className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-4
                  "
                >
                  Our Recent News
                </h2>
                <p className="text-base text-gray-300 text-body-color">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8">
                  <img src={Music} alt="image" className="w-full" />
                </div>
                <div>
                  <span
                    className="
                     bg-primary
                     rounded
                     inline-block
                     text-center
                     py-1
                     px-4
                     text-xs
                     leading-loose
                     font-semibold
                     text-white
                     mb-5
                     "
                  >
                    Dec 22, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="
                        font-semibold
                        text-xl
                        sm:text-2xl
                        lg:text-xl
                        xl:text-2xl
                        mb-4
                        inline-block
                        text-dark
                        hover:text-primary
                        "
                    >
                      Meet AutoManage, the best AI management tools
                    </a>
                  </h3>
                  <p className="text-base text-body-color">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
              <a
                    href="javascript:void(0)"
                    className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black
                     transition
                     "
                  >
                    View Details
                  </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8">
                  <img src={Music} alt="image" className="w-full" />
                </div>
                <div>
                  <span
                    className="
                     bg-primary
                     rounded
                     inline-block
                     text-center
                     py-1
                     px-4
                     text-xs
                     leading-loose
                     font-semibold
                     text-white
                     mb-5
                     "
                  >
                    Mar 15, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="
                        font-semibold
                        text-xl
                        sm:text-2xl
                        lg:text-xl
                        xl:text-2xl
                        mb-4
                        inline-block
                        text-dark
                        hover:text-primary
                        "
                    >
                      How to earn more money as a wellness coach
                    </a>
                  </h3>
                  <p className="text-base text-body-color">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
              <a
                    href="javascript:void(0)"
                    className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black
                     transition
                     "
                  >
                    View Details
                  </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="max-w-[370px] mx-auto mb-10">
                <div className="rounded overflow-hidden mb-8">
                  <img src={Music} alt="image" className="w-full" />
                </div>
                <div>
                  <span
                    className="
                     bg-primary
                     rounded
                     inline-block
                     text-center
                     py-1
                     px-4
                     text-xs
                     leading-loose
                     font-semibold
                     text-white
                     mb-5
                     "
                  >
                    Jan 05, 2023
                  </span>
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="
                        font-semibold
                        text-xl
                        sm:text-2xl
                        lg:text-xl
                        xl:text-2xl
                        mb-4
                        inline-block
                        text-dark
                        hover:text-primary
                        "
                    >
                      The no-fuss guide to upselling and cross selling
                    </a>
                  </h3>
                  <p className="text-base text-body-color">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
              <a
                    href="javascript:void(0)"
                    className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-black
                     transition
                     "
                  >
                    View Details
                  </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-gray-300 pt-20 lg:pt-[120px] pb-10 lg:pb-20">
        <div className="w-5/6">
          <h2
            className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-dark
                  mb-12
                  flex justify-center
                  "
          >
            Our Recent News
          </h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 xl:w-1/3 px-4">
              <div className="bg-white rounded-lg overflow-hidden mb-10">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-01.jpg"
                  alt="image"
                  className="w-full"
                />
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                    >
                      50+ Best creative website themes & templates
                    </a>
                  </h3>
                  <p className="text-base text-body-color leading-relaxed mb-7">
                    Lorem ipsum dolor sit amet pretium consectetur adipiscing
                    elit. Lorem consectetur adipiscing elit.
                  </p>
                  <a
                    href="javascript:void(0)"
                    className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-white
                     transition
                     "
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-4">
              <div className="bg-white rounded-lg overflow-hidden mb-10">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-02.jpg"
                  alt="image"
                  className="w-full"
                />
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                    >
                      The ultimate UX and UI guide to card design
                    </a>
                  </h3>
                  <p className="text-base text-body-color leading-relaxed mb-7">
                    Lorem ipsum dolor sit amet pretium consectetur adipiscing
                    elit. Lorem consectetur adipiscing elit.
                  </p>
                  <a
                    href="javascript:void(0)"
                    className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-white
                     transition
                     "
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-4">
              <div className="bg-white rounded-lg overflow-hidden mb-10">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-03.jpg"
                  alt="image"
                  className="w-full"
                />
                <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                    <a
                      href="javascript:void(0)"
                      className="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                    >
                      Creative Card Component designs graphic elements
                    </a>
                  </h3>
                  <p className="text-base text-body-color leading-relaxed mb-7">
                    Lorem ipsum dolor sit amet pretium consectetur adipiscing
                    elit. Lorem consectetur adipiscing elit.
                  </p>
                  <a
                    href="javascript:void(0)"
                    className="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-primary hover:text-white
                     transition
                     "
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 bg-navbar-color text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-300 font-semibold tracking-wide uppercase">
              Spacetune
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              A better way to send music
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-white">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-400">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <Footer logo={Spacetune} />
    </>
    </div>
  );
}
