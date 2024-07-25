"use client";

import Card from "../card/Card";
import "../card/card.scss";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Pagination } from "antd";

type Template = {
    name: string;
    slug: string;
    image: string;
    link: string;
};

const GridCard = ({ slugNganh }: any) => {
    const route = useRouter();
    const searchParams = useSearchParams();

    const [listTemplate, setListTemplate] = useState<Template[]>([]);
    const [page, setPage] = useState<any>(1);

    const limit = 12; //12

    const [total, setTotal] = useState<any>(1);

    //e: React.ChangeEvent<unknown>
    const handlePaginate = (page: number, g: number) => {

        route.push(`/giao-dien?page=${page}&nganh=${searchParams.get("nganh")}`);
    };

    useEffect(() => {
        if (searchParams.get("page"))
            setPage(searchParams.get("page"));
    }, [searchParams]);


    useEffect(() => {
        //nếu click nganh
        if (slugNganh.id && slugNganh.id != 0) {
            callTemplateById(slugNganh.id);
        } else callAllTemplate();

    }, [slugNganh, page]);

    //console.log('dddd', slugNganh);

    const callTemplateById = async (id: number) => {
        const res = await fetch(
            `${process.env.URL_BACKEND}/api/v1/paginate_template_byidnganh/${id}?page=${page}&limit=${limit}`
        );

        const result = await res.json();

        if (result.EC === 1) {
            let d = result.list;
            setListTemplate(d);
            setTotal(result.data.totalPage);
        }
    };

    const callAllTemplate = async () => {
        const res = await fetch(
            `${process.env.URL_BACKEND}/api/v1/paginate_template?page=${page}&limit=${limit}`
        );
        const result = await res.json();

        if (result.EC === 1) {
            let d = result.list;
            //d = d.concat(d);
            setListTemplate(d);
            setTotal(result.data.totalPage);
        }
    };

    return (
        <>
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

export default GridCard;
