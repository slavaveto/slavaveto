"use client";


import Link from "next/link";
import {IoIosArrowBack} from "react-icons/io";
import ClientTranslation from "@/app/[pages]/components/ClientTranslation";
import React from "react";

import LoremText from "@/app/components/LoremText";


export default function AboutPage ({ page_namespace }: { page_namespace: string }) {


    return (


            <div className="flex flex-col ">


                <LoremText paragraphs={5}/>



            </div>

    )
}