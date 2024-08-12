"use client";

import GridCard from "@/components/grid card/GridCard";
import SlideNganh from "@/components/slide/SlideNganh";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { data, Nganh } from "@/util/type";
import LoadingCss from "@/components/loading/LoadingCss";
import Footer from "@/components/footer/Footer";
import SelectMenu from "@/components/select/SelectMenu";

type Props = {
    params: {
        slug: string;
    };
};

const NganhCha = ({ params }: Props) => {


    const [list, setList] = useState<Nganh[]>([]);
    const [slugNganh, setSlugNganh] = useState<data>({ id: 0, name: '', idDetail: 0 });
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        callAllNganh_parentId();
    }, [params.slug]);

    const callAllNganh_parentId = async () => {
        const res = await fetch(`${process.env.URL_BACKEND}/api/v1/nganh_parent`);
        const result = await res.json();
        if (result.EC === 1) {
            setLoading(false)
            setList(result.data);
            findIdNganh(result.data);
        }
    };
    // find id, name nganh from list
    const findIdNganh = (arr: Nganh[]) => {

        let itemFind = arr.find((item, idx) => item.slug == params.slug);

        // set slug, id cho grid card để hiển thị

        if (itemFind && itemFind.id) {
            setSlugNganh({ id: itemFind.id, name: itemFind.name, idDetail: 0 })
        } else {
            setSlugNganh({ id: 0, name: '', idDetail: 0 });
        }

    }
    console.log('slug nganh: ', slugNganh)

    const handleSelectMenu = (detail: data) => {
        if (detail.id === 0 && detail.idDetail === 0) {

            findIdNganh(list)
        } else
            setSlugNganh({ id: 0, name: detail.name, idDetail: detail.idDetail });
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
                                <div className="sm:flex block mt-10 items-center relative">
                                    <div className=" px-6 py-1 uppercase rounded bg-blue-600 w-fit mx-auto text-white text-lg font-semibold">{slugNganh.name}</div>
                                    <div className="text-end w-fit mt-5 sm:mt-0 sm:absolute right-0 top-0">
                                        <SelectMenu slugNganh={slugNganh} handleSelectMenu={handleSelectMenu} list={list} />
                                    </div>

                                </div>
                                :
                                <div className="mt-10 px-6 py-1 uppercase rounded bg-blue-600 w-fit mx-auto text-white text-lg font-semibold">Tất cả</div>

                        }

                        <GridCard slugNganh={slugNganh} />

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default NganhCha;