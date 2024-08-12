"use client";
import "./slide.scss";
import Slider from "react-slick";
import Image from "next/image";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { useRouter } from "next/navigation";
import { Nganh } from "@/util/type";
import { GoSearch } from "react-icons/go";

let settings = {
    autoplay: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
        // {
        //   breakpoint: 992,
        //   settings: {
        //     slidesToShow: 3,
        //   },
        // },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 3,
            },
        },
    ],
};


interface ListNganh {
    list: Nganh[];
}
const SlideNganh: React.FC<ListNganh> = ({ list }) => {

    const sliderRef = useRef<Slider>(null);
    const route = useRouter();

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

    };

    const next = () => {
        sliderRef.current?.slickNext();
    };
    const previous = () => {
        sliderRef.current?.slickPrev();
    };

    const handleClickSearch = () => {
        route.push(`/tim-kiem?s=${inputValue}`)
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        //console.log('ttttt', event.key)
        if (event.key === 'Enter') {
            handleClickSearch();
        }
    };

    return (
        <>
            <h2 className="text-2xl cursor-pointer font-semibold text-blue-600 text-center mb-10"
                onClick={() => route.push('/giao-dien?page=1')}
            >
                TRANG CHỦ KHO GIAO DIỆN 

            </h2>

            <div className="relative">
                <Slider ref={sliderRef} {...settings}>
                    {list && list.map((item, idx) => {
                        return (
                            <div key={`spc${idx}`}>
                                <div className="mr-5 cursor-pointer"
                                //`/giao-dien?page=1&nganh=${item.slug}`
                                    onClick={() => { route.push(`/${item.slug}`) }}
                                >
                                    <Image
                                        src={`${process.env.URL_BACKEND}/images/${item.image}`}
                                        width={50}
                                        height={50}
                                        alt="fdsfd"
                                        className="mx-auto flex"
                                    />
                                    <div className="mt-3 uppercase text-blue-600 text-center font-semibold text-sm">
                                        {item.name}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>

                {/* <button className="arrow-left-tr" onClick={previous}>
                    <div className="arrow-left-tr__icon">
                        <MdKeyboardArrowLeft />
                    </div>
                </button>
                <button className="arrow-right-tr" onClick={next}>
                    <div className="arrow-right-tr__icon">
                        <MdKeyboardArrowRight />
                    </div>
                </button> */}
            </div>

            <div className="mt-10 inline-flex items-center rounded-[35px] p-[10px] pl-5 w-full bg-violet-100 h-10"

            >
                <input
                    className="w-full outline-none bg-transparent placeholder:text-gray-600 placeholder:font-semibold"
                    placeholder="Tìm kiếm"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <div
                    onClick={handleClickSearch}
                    className='p-1 cursor-pointer bg-blue-400 hover:bg-blue-500 rounded-full text-2xl'>
                    <GoSearch className='text-white' />
                </div>
                
            </div>
        </>
    );
};

export default SlideNganh;
