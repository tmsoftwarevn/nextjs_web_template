"use client";
import Image from "next/image";
import "./card.scss";
import { IoMdAdd } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { useRouter } from "next/navigation";

type Props = {
    item: any
}

const Card = ({ item }: Props) => {

    const route = useRouter();
    const handleViewDetail = (slug: string) => {
        // slug ko được trùng
        //console.log(slug);
        route.push(`/giao-dien/${slug}`)
    }
    const handleViewWeb = (link: string) => {
       
        //console.log(link);
        window.open(link, '_blank', 'noopener,noreferrer');
        
    }

    return (
        <>

            <div className=" ">

                <Image alt="dsf" src={`${process.env.URL_BACKEND}/images/${item.image}`}
                    width="0"
                    height="0"
                    sizes="100vw"

                    className="w-full h-auto"
                />

                <div className="text-center py-3 px-3 text-blue-600 leading-5 font-semibold">{item.name}</div>
                <div className="card-hover ">
                    <div className="chitiet w-[140px] grid gap-3">
                        <div
                            onClick={() => handleViewWeb(item.link)}
                            className="chitiet-btn rounded-[5px] w-full flex  mx-auto items-center text-center justify-center font-semibold text-white xs:text-sm px-4 py-2 bg-yellow-500 text-sm">
                            <IoMdEye className="text-xl font-bold" />
                            <div className="">Xem thử</div>

                        </div>
                        <div
                            onClick={() => handleViewDetail(item.slug)}
                            className="chitiet-btn rounded-[5px] w-full mx-auto flex items-center text-center justify-center font-semibold text-white xs:text-sm px-4 py-2 bg-sky-400 text-sm">
                            <IoMdAdd className="text-xl font-bold" />
                            <div className="">Xem chi tiết</div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    );
}

export default Card;