"use client";

import React from "react";
import {Alert} from "@nextui-org/react";
import ClientTranslation from "@/app/[pages]/components/ClientTranslation";
import {useTranslation} from "react-i18next";
import {Link} from "@nextui-org/react";

import { TbArrowBackUp } from "react-icons/tb";
import {IoIosArrowBack} from "react-icons/io";


export default function ErrorPage ({ page_namespace }: { page_namespace: string }) {

    const { t } = useTranslation(page_namespace);
    const { t: ui } = useTranslation('ui');


    return (

        <div className=" fixed inset-0 flex items-center justify-center mx-auto px-3
        translate-y-[-10%] xs450:translate-y-[-10%]"
              style={{ maxWidth: '550px',  }}>




            <Alert color="warning" title="" description="">

                <div className="pt-[9px] font-medium">
                    {t('title')}
                </div>

                <div className="py-3 flex w-full justify-center h-[100px] ml-[-36px]">


                    <Link className="" href="/"> <TbArrowBackUp size={26} className="font-medium" /> <span className="pl-4">{ui('return_home')}</span> </Link>


                </div>
            </Alert>


        </div>

    )
}