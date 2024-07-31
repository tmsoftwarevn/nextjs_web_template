"use client";
import Footer from "@/components/footer/Footer";
import GridSearch from "@/components/grid card/GridSearch";
import LoadingCss from "@/components/loading/LoadingCss";
import SlideNganh from "@/components/slide/SlideNganh";
import { Nganh } from "@/util/type";
import { useEffect, useState } from "react";


export default function TimKiem() {

  const [list, setList] = useState<Nganh[]>([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    callAllNganh();
  }, []);

  const callAllNganh = async () => {
    // const res = await fetch(`${process.env.URL_BACKEND}/api/v1/nganh`);
    const res = await fetch(`${process.env.URL_BACKEND}/api/v1/nganh_parent`);
    const result = await res.json();
    if (result.EC === 1) {
      setLoading(false)
      setList(result.data);

    }

  };

  if (isLoading) return <LoadingCss />
  return (
    <>
      <div className="bg-body py-5">
        <div className="container">
          <div className="px-2">
            <SlideNganh list={list} />
            <GridSearch />
          </div>
        </div>
      </div>

      <Footer />
      
    </>
  );
}
