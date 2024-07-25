"use client";

import GridCard from "@/components/grid card/GridCard";
import SlideNganh from "@/components/slide/SlideNganh";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Nganh } from "@/util/type";
import LoadingCss from "@/components/loading/LoadingCss";
import Footer from "@/components/footer/Footer";


type data = {
  id: number;
  name: string;
}


export default function Giaodien() {

  const params = useSearchParams();
  const [list, setList] = useState<Nganh[]>([]);
  const [slugNganh, setSlugNganh] = useState<data>({ id: 0, name: '' });
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    callAllNganh();
  }, [params]);

  const callAllNganh = async () => {
    const res = await fetch(`${process.env.URL_BACKEND}/api/v1/nganh`);
    const result = await res.json();
    if (result.EC === 1) {
      setLoading(false)
      setList(result.data);
      findIdNganh(result.data);
    }

  };


  // find id, name nganh from list
  const findIdNganh = (arr: Nganh[]) => {

    let itemFind = arr.find((item, idx) => item.slug == params.get('nganh'));

    if (itemFind && itemFind.id) {
      setSlugNganh({ id: itemFind.id, name: itemFind.name })
    } else {
      setSlugNganh({ id: 0, name: '' });
    }

  }
  if (isLoading) return <LoadingCss />
  return (
    <>
      <div className="bg-body py-5">
        <div className="container">
          <div className="px-3">
            <SlideNganh list={list} />
            {
              slugNganh && slugNganh.name ?
                <div className="mt-10 px-4 py-1 capitalize rounded bg-blue-600 w-fit mx-auto text-white text-xl font-semibold">{slugNganh.name}</div>
                :
                <div className="mt-10 px-4 py-1 capitalize rounded bg-blue-600 w-fit mx-auto text-white text-xl font-semibold">Tất cả</div>

            }

            <GridCard slugNganh={slugNganh} />

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
