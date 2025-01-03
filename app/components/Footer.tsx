"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import LangToggle from "@/app/components/LangToggle";


export default function Footer() {
    return (
        <footer className="header_bg flex h-[60px] mt-5 items-center ">
            <div className="container flex mx-auto px-3 -justify-between justify-end items-center max-w-custom">
                {/*<div>*/}
                {/*    <p className="font-medium text-lg leading-4 pb-1">Вячеслав Вето</p>*/}
                {/*    <p className="leading-4 text-sm italic">персональный сайт психолога</p>*/}
                {/*</div>*/}
                <div className="flex justify-end">
                    <div className="flex flex-col pr-2">
                        <LangToggle/>
                    </div>
                    <div className="flex flex-col">
                        <ThemeToggle/>
                    </div>
                </div>
            </div>
        </footer>
);
}

