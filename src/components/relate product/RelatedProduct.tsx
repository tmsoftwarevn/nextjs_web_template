"use client";
import "./slide.scss";
import Slider from "react-slick";
import Card from "../card/Card";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

let settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};
const RelatedProduct = ({ detail }: any) => {
    //let arr = ['1', '2', '3', '4'];
    const [list, setList] = useState([]);
    const sliderRef = useRef<Slider>(null);

    const next = () => {
        sliderRef.current?.slickNext();
    };
    const previous = () => {
        sliderRef.current?.slickPrev();
    };

    useEffect(() => {
        call_related_template();
    }, [detail]);
  
    const call_related_template = async () => {
        const res = await fetch(
            `${process.env.URL_BACKEND}/api/v1/relate_template/${detail.id_nganh}`
        );
        const result = await res.json();
        if (result.EC === 1) {
            setList(result.data);
        }
    };

    return (
        <div className="mb-10">
            <p className="text-2xl text-blue-600 font-semibold uppercase mt-10 mb-5">
                Sản phẩm tương tự
            </p>

            <div className="relative">
                <Slider ref={sliderRef} {...settings} >
                    {list.map((item, idx) => {
                        return (
                            <div
                                key={`fsdf${idx}`}
                                className="shadow-gray-400 mb-2 card shadow-md "
                            >
                                <Card item={item} />
                            </div>
                        );
                    })}

                </Slider>

                <button className="arrow-left-tr" onClick={previous}>
                    <div className="arrow-left-tr__icon">
                        <MdKeyboardArrowLeft />
                    </div>
                </button>

                <button className="arrow-right-tr" onClick={next}>
                    <div className="arrow-right-tr__icon">
                        <MdKeyboardArrowRight />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default RelatedProduct;
