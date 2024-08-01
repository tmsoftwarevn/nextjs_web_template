"use client";
import Detail from "@/components/detail template/Detail";
import Grid from "@/components/detail template/Grid";
import Footer from "@/components/footer/Footer";
import LoadingCss from "@/components/loading/LoadingCss";
import RelatedProduct from "@/components/relate product/RelatedProduct";
import { useEffect, useState } from "react";

type Props = {
    params: {
        slug: string;
    };
};

type Detail = {
    id: number;
    name: string;
    image: string;
    slug: string;
    link: string;
    description: string;
    title: string;
    meta_des: string;
    id_nganh: number

}
const Slug = ({ params }: Props) => {
    const [isLoading, setLoading] = useState(true)
    const [detail, setDetail] = useState<Detail>({
        id: 0,
        name: 'string',
        image: 'string',
        slug: 'string',
        link: 'string',
        description: 'string',
        title: 'string',
        meta_des: 'string',
        id_nganh: 0
    });
    const [nameNganh, setNameNganh] = useState('');


    useEffect(() => {
        call_detail_template();

    }, [])

    useEffect(() => {
        if (detail.id_nganh)
            call_get_name_idNganh(detail.id);

    }, [detail])

    //console.log('id detail: ', detail)
    const call_get_name_idNganh = async (id: number) => {
        const res = await fetch(
            `${process.env.URL_BACKEND}/api/v1/name_nganh/${id}`
        );
        const result = await res.json();
        if (result && result.EC === 1) {
            setNameNganh(result.data);
        }
    }
    const call_detail_template = async () => {
        const res = await fetch(
            `${process.env.URL_BACKEND}/api/v1/detail_template/${params.slug}`
        );
        const result = await res.json();
        if (result && result.EC === 1) {
            setLoading(false)
            setDetail(result.data);
        }
    }
    if (isLoading) return <LoadingCss />
    return (
        <>
            <div className="my-5 px-3">
                <div className="container">
                    <Grid detail={detail} nameNganh={nameNganh} />
                    <Detail detail={detail} />
                    <RelatedProduct detail={detail} />
                </div>

            </div>

            <Footer />

        </>
    )

}

export default Slug;