import Image from "next/image";
import BasicBreadcrumbs from "../breadcum/BreadCum";
import { useRouter } from "next/navigation";

const Grid = ({ detail, nameNganh }: any) => {
    const route = useRouter();

    return (
        <>
            <h2 className="text-2xl cursor-pointer font-semibold text-blue-600 text-center mb-10"
                onClick={() => route.push('/giao-dien?page=1')}
            >
                TRANG CHỦ KHO GIAO DIỆN
            </h2>

            <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
                <div className="grid-col-1">
                    <Image
                        src={`${process.env.URL_BACKEND}/images/${detail.image}`}
                        width="0"
                        height="0"
                        sizes="100vw"

                        className="w-full h-auto"
                       
                        alt="carousel"
                        priority
                    />
                </div>
                <div className="grid-col-1">

                    <BasicBreadcrumbs nameNganh={nameNganh} />
                    <h1 className="mt-2 text-2xl capitalize md:text-3xl font-semibold text-blue-600">
                        {detail.name}
                    </h1>

                    <div className="rounded-full w-fit cursor-pointer hover:bg-blue-700 mt-5 text-white font-semibold bg-blue-600 px-10 py-2"
                        onClick={() => window.open(detail.link, '_blank', 'noopener,noreferrer')}
                    >
                        XEM TRANG WEB THỰC TẾ
                    </div>

                    <div className="mt-10 p-2 bg-violet-100 border-dashed px-2 border-2 border-indigo-600">
                        <div className="text-2xl font-semibold text-blue-600">
                            Tại TM Software bạn sẽ nhận được
                        </div>
                        <div className="mt-3 grid gap-4">
                            <div className="flex items-center">
                                <Image src={'/tick.jpg'} width={20} height={20} alt="fdsf" />
                                <p>Miễn phí tư vấn SEO, Ads</p>
                            </div>
                            <div className="flex items-center">
                                <Image src={'/tick.jpg'} width={20} height={20} alt="fdsf" />
                                <p>Giao diện đẹp mắt chuẩn UI/UX</p>
                            </div>
                            <div className="flex items-center">
                                <Image src={'/tick.jpg'} width={20} height={20} alt="fdsf" />
                                <p>Tương thích đa nền tảng, thiết bị</p>
                            </div>
                            <div className="flex items-center">
                                <Image src={'/tick.jpg'} width={20} height={20} alt="fdsf" />
                                <p>Chuẩn SEO - Tiếp cận khách hàng</p>
                            </div>
                            <div className="flex items-center">
                                <Image src={'/tick.jpg'} width={20} height={20} alt="fdsf" />
                                <p>Tối ưu trải nghiệm người dùng giúp tăng tỷ lệ tiếp cận khách hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Grid;