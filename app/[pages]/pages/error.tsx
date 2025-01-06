"use client";

import React from "react";
import {Alert} from "@nextui-org/react";
import ClientTranslation from "@/app/[pages]/components/ClientTranslation";
import {useTranslation} from "react-i18next";
import Link from "next/link";
//import {Link} from "@nextui-org/react";

import {TbArrowBackUp} from "react-icons/tb";

import classNames from "classnames";

export default function Error ({page_namespace}: { page_namespace: string }) {

    const {t: misc} = useTranslation('misc');

    return (

        <main className="flex-grow container mx-auto">

            <div className=" fixed inset-0 flex items-center -justify-center mx-auto px-3
        translate-y-[-10%] xs450:translate-y-[-10%]"
                 style={{maxWidth: '550px',}}>


                <Alert
                    classNames={{
                        base: classNames(
                            "bg-default-50 dark:bg-background shadow-sm",
                            "border-1 border-default-200 dark:border-default-100",
                            "relative before:content-[''] before:absolute before:z-10",
                            "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
                            "rounded-l-none border-l-0",
                            "before:bg-warning"
                        ),
                        mainWrapper: "pt-[8px] text-medium",
                        iconWrapper: "dark:bg-transparent",
                        description: "pt-[20px]"

                    }}
                    color="warning"
                    title={misc('error_page_title')}
                    description={misc('error_page_message')}
                    variant="faded"
                >


                    <div className="pl-0 flex w-full -justify-center  pt-[30px] ">


                        <Link className="flex flex-row text-primary-500 hover:text-primary-400 transition items-center"
                              href="/"

                        > <TbArrowBackUp size={24} className=""/> <span
                            className="pl-4 text-[14px]">{misc('return_home')}</span> </Link>


                    </div>

                </Alert>


            </div>

        </main>

    )
}