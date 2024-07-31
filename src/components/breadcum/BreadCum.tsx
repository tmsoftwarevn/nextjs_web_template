"use client"

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import './breadcum.scss';


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs({ nameNganh }: any) {

    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" className='css-brc !mb-7'>
                <Link className='xs:text-xs text-md hover:text-blue-600 text-gray-600' href="/">
                    TRANG CHỦ
                </Link>
                <Link className='xs:text-xs text-md hover:text-blue-600 uppercase text-gray-600' href={{
                    pathname: '/giao-dien',
                    query: {
                        //    nganh: nameNganh.slug
                        c: nameNganh.slug
                    },
                }}>
                    {nameNganh.name}
                </Link>
            </Breadcrumbs>
        </div>
    );
}
