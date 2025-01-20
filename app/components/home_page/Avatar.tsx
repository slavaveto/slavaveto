"use client";
import React from "react";
import LocalText from "@/app/assets/localText";
import Image from 'next/image';


export default function Avatar() {

    return (
        <>
            <div
                className="flex flex-row items-center justify-between -pr-[20px]  -xs390:gap-10"
            >
                <Image
                    src="/me.jpg"
                    alt="Описание изображения"
                    // layout="responsive"
                    width={120} // Пропорции, не конкретная ширина
                    height={120} // Пропорции, не конкретная высота
                    priority // Флаг для прелоадинга
                    className="block dark:hidden w-[120px] rounded-full  border-3 border-white"
                    style={{boxShadow: "0 0px 10px rgba(0, 0, 0, 0.2)"}}
                />
                <Image
                    src="/me_dark.jpg"
                    alt="Описание изображения"
                    width={120} // Пропорции, не конкретная ширина
                    height={120} // Пропорции, не конкретная высота
                    priority // Флаг для прелоадинга
                    className="hidden dark:block w-[120px] rounded-full  border-0"
                    style={{boxShadow: "0 0px 10px rgba(0, 0, 0, 0.2)"}}
                />
                <div className="flex w-full justify-end -items-center -justify-center mt-[2px]">
                    <div className="-pl-10  ">
                        <p className="font-medium text-[28px] xs390:text-[29px] xs414:text-[30px] sm:text-[32px] leading-5 pb-1"><LocalText text="title" ns="home"/></p>
                        <p className="leading-4 text-sm italic w-full text-right -text-center pr-[5px]"><LocalText text="subtitle" ns="home"/> </p>
                    </div>
                </div>

            </div>
            <LocalText text="greeting" ns="home"/>

        </>

    );
}

