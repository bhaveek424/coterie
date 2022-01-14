import Head from "next/head";
import { Fragment, SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from "swr";
import NextImage from "next/image";

import { Post, Sub } from "../types";
import PostCard from "../components/PostCard";
import Link from "next/link";
import { useAuthState } from "../context/auth";

dayjs.extend(relativeTime);

export default function Home() {
  const { data: posts } = useSWR<Post[]>("/posts");
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");

  const { authenticated } = useAuthState();
  return (
    <Fragment>
      <Head>
        <title>Coterie: build communities</title>
        <link rel="icon" href="/images/coterie.svg" />
      </Head>
      <div className="container flex pt-4">
        {/* post feed */}
        <div className="w-full px-4 md:w-160 md:p-0">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
        {/* Sidebar */}
        <div className="hidden ml-6 md:block w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`/c/${sub.name}`}>
                    <a>
                      <NextImage
                        src={sub.imageUrl}
                        className="rounded-full cursor-pointer"
                        alt="Sub"
                        width={(6 * 16) / 4}
                        height={(6 * 16) / 4}
                      />
                    </a>
                  </Link>
                  <Link href={`/c/${sub.name}`}>
                    <a className="ml-2 font-bold hover:cursor-pointer">
                      /c/{sub.name}
                    </a>
                  </Link>
                  {/* <div className="mr-2 overflow-hidden rounded-full cursor-pointer">
                    <Link href={`/c/${sub.name}`}>
                      <NextImage
                        src={sub.imageUrl}
                        alt="Sub"
                        width={(6 * 16) / 4}
                        height={(6 * 16) / 4}
                      />
                    </Link>
                  </div> */}
                  {/* <Link href={`/c/${sub.name}`}>
                    {/* <a className="font-bold hover:cursor-pointer">
                      c/{sub.name}
                    </a> */}
                  {/* </Link>  */}
                  <p className="ml-auto font-med">{sub.postCount}</p>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 blue button">
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
