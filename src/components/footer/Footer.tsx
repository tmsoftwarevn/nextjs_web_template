
import { SiZalo } from 'react-icons/si';
import './footer.scss';
import { FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { IoMdMail } from 'react-icons/io';
import { IoCall } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';

const Footer = () => {
    return (
        <div className="footer py-4 text-white">
            <div className="container px-3">

                <div className="text-center text-xl mb-5">
                    TM SOFTWARE là giải pháp công nghệ cho doanh nghiệp của bạn , giá trị cốt lõi TIN TƯỞNG - UY TÍN - TẬN TÂM
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="col-span-1 ">
                        <p className='ft '>
                            THÔNG TIN LIÊN HỆ
                        </p>

                        <ul className="ul-ft">
                            <li>
                                <MdLocationOn
                                    style={{
                                        marginRight: "8px",
                                        fontSize: "18px",
                                        marginBottom: "3px",
                                    }}
                                />
                                5/2A, Đường 112, Phường Phước Long A, Thành phố Thủ Đức, Hồ Chí Minh
                            </li>
                            <li
                                onClick={() => {
                                    window.open("tel:" + process.env.REACT_APP_PHONE);
                                }}
                                className='cursor-pointer'
                            >
                                <IoCall
                                    style={{
                                        marginRight: "8px",
                                        fontSize: "18px",
                                        marginBottom: "3px",
                                    }}
                                />
                                0979193037 - 0979249222
                            </li>
                            <li
                                onClick={() => {
                                    window.open("mailto:" + "info.tmsoftware.vn@gmail.com");
                                }}
                                className='cursor-pointer'
                            >
                                <IoMdMail
                                    style={{
                                        marginRight: "8px",
                                        fontSize: "18px",
                                        marginBottom: "3px",
                                    }}
                                />
                                info.tmsoftware.vn@gmail.com
                            </li>
                            <li
                                onClick={() => window.open("https://tmsoftware.vn/", "_blank")}
                                className='cursor-pointer'
                            >
                                <BiWorld
                                    style={{
                                        marginRight: "8px",
                                        fontSize: "18px",
                                        marginBottom: "3px",
                                    }}
                                />
                                tmsoftware.vn
                            </li>
                        </ul>

                        <div className="center-icon">
                            <div
                                className="g-fb"
                                onClick={() =>
                                    window.open('https://www.facebook.com/tmsoftwarevietnam', "_blank")
                                }
                            >
                                <FaFacebookF className="fb" />
                            </div>

                            <div
                                className="g-fb"
                            // onClick={() =>
                            //     window.open(process.env.REACT_APP_LINK_YOUTUBE, "_blank")
                            // }
                            >
                                <FaYoutube className="yt" />
                            </div>
                            <div
                                className="g-fb"
                            // onClick={() =>
                            //     window.open(process.env.REACT_APP_LINK_TIKTOK, "_blank")
                            // }
                            >
                                <FaTiktok className="tiktok" />
                            </div>
                            <div
                                className="g-fb"
                            // onClick={() =>
                            //     window.open(process.env.REACT_APP_URL_ZALO, "_blank")
                            // }
                            >
                                <SiZalo className="zalo" />
                            </div>
                        </div>

                    </div>
                    <div className="col-span-1 inline-block mx-auto">
                        <p className='ft'>
                            FANPAGE
                        </p>
                        <iframe
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftmsoftwarevietnam%3Flocale%3Dvi_VN&tabs=timeline&width=340&height=153&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=987326055981584"
                            width="340"
                            height="153"
                            style={{ border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                        </iframe>                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;