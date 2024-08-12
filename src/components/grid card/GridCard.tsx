"use client";

import Card from "../card/Card";
import "../card/card.scss";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
    const [page, setPage] = useState<any>('1');
    const limitt = 16;    //16
    const [totall, setTotal] = useState(1);

    const pathname = usePathname();

    //e: React.ChangeEvent<unknown>
    const handlePaginate = (page: number, g: number) => {

        // if (searchParams.get("nganh"))
        //     route.push(`/giao-dien?page=${page}&nganh=${searchParams.get("nganh")}`);
        // else
        //     route.push(`/giao-dien?page=${page}&nganh=all`);
        if (pathname === "/giao-dien")
            route.push(`/giao-dien?page=${page}`);
        else route.push(`${pathname}?page=${page}`);

    };

    useEffect(() => {
        if (searchParams.get("page"))
            setPage(searchParams.get("page"));
    }, [searchParams]);


    useEffect(() => {
        //nếu click nganh
        if (slugNganh.id && slugNganh.id != 0) {    // ngành cha
            callTemplateByIdParent(slugNganh.id);
        } else callAllTemplate();
        if (slugNganh.idDetail && +slugNganh.idDetail !== 0) {      // ngành con
            callTemplateByIdChild(slugNganh.idDetail);

        }

    }, [slugNganh, page]);



    const callTemplateByIdChild = async (id: number) => {
        // ko phân trang
        const res = await fetch(
            `${process.env.URL_BACKEND}/api/v1/paginate_template_byidnganh/${id}?page=1&limit=999`

        );

        const result = await res.json();

        if (result.EC === 1) {
            let d = result.list;
            setListTemplate(d);
            setTotal(result?.data?.total);

        }
    };

    const callTemplateByIdParent = async (id: number) => {
        const res = await fetch(
            `${process.env.URL_BACKEND}/api/v1/listchildnganh/${id}?page=${page}&limit=${limitt}`

        );

        const result = await res.json();

        if (result.EC === 1) {
            let d = result.list;
            setListTemplate(d);
            setTotal(result?.data?.total);

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
            setTotal(result?.data?.total);

        }
    };

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

            {
                slugNganh.idDetail && +slugNganh.idDetail !== 0 ?
                    <> </>
                    :
                    <Box
                        sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
                    >
                        <Stack spacing={2}>
                            <Pagination
                                current={+page}
                                pageSize={limitt}
                                onChange={(p: number, g: number) => handlePaginate(p, g)}
                                total={totall}

                            />
                        </Stack>
                    </Box>
            }


        </>
    );
};

export default GridCard;
