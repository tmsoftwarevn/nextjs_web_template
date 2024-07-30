"use client";

import Card from "../card/Card";
import "../card/card.scss";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Flex, Pagination } from "antd";

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
    const [page, setPage] = useState<any>('1');

    const limitt = 5;    //12

    const [totall, setTotal] = useState(1);

    //e: React.ChangeEvent<unknown>
    const handlePaginate = (page: number, g: number) => {

        if (searchParams.get("nganh"))
            route.push(`/giao-dien?page=${page}&nganh=${searchParams.get("nganh")}`);
        route.push(`/giao-dien?page=${page}&nganh=all`);

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

    const callTemplateById = async (id: number) => {
        const res = await fetch(
            // `${process.env.URL_BACKEND}/api/v1/paginate_template_byidnganh/${id}?page=${page}&limit=${limit}`
            `${process.env.URL_BACKEND}/api/v1/listchildnganh/${id}?page=${page}&limit=${limitt}`

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
            `${process.env.URL_BACKEND}/api/v1/paginate_template?page=${page}&limit=${limitt}`
        );
        const result = await res.json();

        if (result.EC === 1) {
            let d = result.list;
            //d = d.concat(d);

            setListTemplate(d);
            setTotal(result.data.totalPage);
        }
    };
    console.log('llllll', page, limitt, totall)

    return (
        <>
            <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-5">
                {listTemplate &&
                    listTemplate.map((item, idx) => {
                        return (

                            <div key={`d4sk${idx}`} className="col-span-1 shadow-gray-400 card shadow-md">

                                <Card item={item} />

                            </div>

                        );
                    })}
            </div>

            <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
            >
                <Stack spacing={2}>
                    <Pagination
                        // current={+page}
                        // pageSize={limitt}
                        current={1}
                        pageSize={5}
                        onChange={(p: number, g: number) => handlePaginate(p, g)}
                        total={15}
                    />
                </Stack>
            </Box>


        </>
    );
};

export default GridCard;
