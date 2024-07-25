"use client"
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs({ nameNganh }: any) {
    
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" >
                <Link className='xs:text-xs text-sm hover:text-blue-600' href="/">
                    TRANG CHỦ
                </Link>
                <Link className='xs:text-xs text-sm hover:text-blue-600 uppercase' href={{
                    pathname: '/giao-dien',
                    query: {
                       nganh: nameNganh.slug
                    },
                }}>
                    {nameNganh.name}
                </Link>
            </Breadcrumbs>
        </div>
    );
}
