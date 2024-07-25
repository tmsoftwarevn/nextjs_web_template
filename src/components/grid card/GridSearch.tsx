"use client";

import Card from "../card/Card";
import "../card/card.scss";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Pagination } from "antd";
import LoadingCss from "../loading/LoadingCss";

type Template = {
    name: string;
    slug: string;
    image: string;
    link: string;
};

const GridSearch = ({ slugNganh }: any) => {
    const route = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setLoading] = useState(true)
    const [listTemplate, setListTemplate] = useState<Template[]>([]);
    const [page, setPage] = useState<any>(1);

    const limit = 12; //12

    const [total, setTotal] = useState<any>(1);

    //e: React.ChangeEvent<unknown>
    const handlePaginate = (page: number, g: number) => {

        route.push(`?page=${page}&s=${searchParams.get('s')}`);
    };

    useEffect(() => {
        if (searchParams.get("page"))
            setPage(searchParams.get("page"));
    }, [searchParams]);

    useEffect(() => {
        //nếu click nganh
        callTemplate_bySearch();

    }, [page, searchParams]);


    const callTemplate_bySearch = async () => {
        const res = await fetch(
            `${process.env.URL_BACKEND}/api/v1/paginate_template_search?page=${page}&limit=${limit}&s=${searchParams.get('s')}`
        );
        const result = await res.json();

        if (result.EC === 1) {
            let d = result.list;
            //d = d.concat(d);
            setListTemplate(d);
            setTotal(result.data.totalPage);
            setLoading(false)
        }
    };
    if (isLoading) return <LoadingCss />
    if (!listTemplate.length) return (
        <div className="text-2xl text-center mt-5">
            <p className="text-blue-600">Không có kết quả tìm kiếm cho:</p>
            <p className="italic text-xl text-gray-400"> &apos;{searchParams.get('s')}&apos;</p>
        </div>
    )
    return (
        <>
        <div className="text-2xl text-center mt-5">
            <p className="text-blue-600">Kết quả tìm kiếm cho:</p>
            <p className="italic text-xl text-gray-400"> &apos;{searchParams.get('s')}&apos;</p>
        </div>
            <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-5">
                {listTemplate &&
                    listTemplate.map((item, idx) => {
                        return (
                            <>
                                <div key={`dsk${idx}`} className="col-span-1 shadow-gray-400 card shadow-md">

                                    <Card item={item} />

                                </div>
                            </>
                        );
                    })}
            </div>

            <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
            >
                <Stack spacing={2}>
                    <Pagination
                        current={page}
                        pageSize={limit}
                        onChange={(p: number, g: number) => handlePaginate(p, g)}
                        total={+total}
                    />
                </Stack>
            </Box>


        </>
    );
};

export default GridSearch;
