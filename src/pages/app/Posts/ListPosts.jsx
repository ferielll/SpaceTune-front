import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import Breadcrumb from "../../../components/Breadcrum";
import InputSearch from "../../../components/InputSearch";
import Title from "../../../components/Title";
import Post from "../Post/Post";
import "./posts.css";

export default function ListPosts({ posts }) {
  return (
    <Fragment>
      <Breadcrumb title={"All posts"} />
      <div className="flex flex-row justify-center pt-1 mx-auto">
        <div className="mt-4 px-2 w-full max-w-7xl lg:px-4">
          <div className="flex justify-between text-start w-full">
            <Title
              title="Posts"
              subtitle="Posts that are loved by the community. Updated every hour."
            />
            <InputSearch />
          </div>
          <div className="my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((p) => (
              <Post post={p} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
