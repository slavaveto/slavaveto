"use client";

import React from "react";
import {Alert, Card, CardBody} from "@nextui-org/react";
import ClientTranslation from "@/app/[pages]/components/ClientTranslation";
import {useTranslation} from "react-i18next";
import Link from "next/link";
//import {Link} from "@nextui-org/react";

import {TbArrowBackUp} from "react-icons/tb";

export default function UkrainePage({page_namespace}: { page_namespace: string }) {

    const {t: misc} = useTranslation('misc');
    const HtmlString = ({text}: { text: string }) => (
        <span dangerouslySetInnerHTML={{__html: text}}/>
    );

    return (

        <main className="flex-grow container mx-auto px-3 pt-[20px]"
              style={{maxWidth: '550px'}}>

            <div className="flex flex-col">
                <img width={150}
                     className="rounded mb-[20px]"
                     src="StandWithUkraine.jpg"
                />

                <HtmlString text={misc('stand_with_ukraine')}/>

                <div className=" flex w-full   pt-[30px] ">

                    <Link
                        className="flex flex-row text-primary-500 hover:text-primary-400 transition items-center"
                        href="/"

                    > <TbArrowBackUp size={24} className=""/> <span
                        className="pl-4 text-[14px]">{misc('return_home')}</span>
                    </Link>


                </div>


            </div>


</main>

)
}