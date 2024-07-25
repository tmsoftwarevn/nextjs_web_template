"use client"

import GridCard from "@/components/grid card/GridCard";
import SlideNganh from "@/components/slide/SlideNganh";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";


export default function Home() {

  const route = useRouter();

  type data = {
    id: number;
    name: string;
  }

  const [slugNganh, setSlugNganh] = useState<data>({ id: 0, name: '' });

  useEffect(() =>{
    route.push('/giao-dien');
    
  },[])

  return (
    <>
     
      <div className="bg-body py-5">
        <div className="container">
          <div className="px-2">
            {/* <SlideNganh setSlugNganh={setSlugNganh} />
            {
              slugNganh && slugNganh.name ?
                <div className="mt-10 px-4 py-1 capitalize rounded bg-blue-600 w-fit mx-auto text-white text-xl font-semibold">{slugNganh.name}</div>
                :
                <div className="mt-10 px-4 py-1 capitalize rounded bg-blue-600 w-fit mx-auto text-white text-xl font-semibold">Tất cả</div>

            }

            <GridCard slugNganh={slugNganh} /> */}

          </div>
        </div>
      </div>
     
    </>
  );
}
