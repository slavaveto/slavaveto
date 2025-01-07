"use client";

import React from "react";
import {Alert} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import Link from "next/link";
//import {Link} from "@nextui-org/react";
import CustomAlert from "@/app/components/CustomAlert";

import {TbArrowBackUp} from "react-icons/tb";

import classNames from "classnames";
import Footer from "@/app/components/Footer";

export default function Error ({page_namespace}: { page_namespace: string }) {

    const {t: misc} = useTranslation('misc');

    return (
<>
        <main className="flex-grow container mx-auto">

            <div className=" fixed inset-0 flex items-center -justify-center mx-auto px-3
        translate-y-[-10%] xs450:translate-y-[-10%]"
                 style={{maxWidth: '550px',}}>


                <CustomAlert
                    color="danger"
                    showIcon={true}
                    title={misc('error_page_title')}
                    description={misc('error_page_message')}>

                    <div className="pl-0 flex w-full -justify-center  pt-[30px] pb-[15px]">


                        <Link className="flex flex-row text-primary-500 hover:text-primary-400 transition items-center"
                              href="/"

                        > <TbArrowBackUp size={24} className=""/> <span
                            className="pl-4 text-[14px]">{misc('return_home')}</span> </Link>


                    </div>

                </CustomAlert>




            </div>

        </main>

    <Footer width="550" />
</>
    )
}