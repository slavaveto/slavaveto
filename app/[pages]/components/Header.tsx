"use client";


import Link from "next/link";
//import {Link} from "@nextui-org/react";
import {IoIosArrowBack} from "react-icons/io";
import React from "react";
import {useRouter} from "next/navigation";
import {supabase} from "@/app/assets/supabaseClient";
import {TbArrowBackUp} from "react-icons/tb";
import { Tabs, Tab } from "@nextui-org/react";
import {useTranslation} from "react-i18next";

interface HeaderProps {
    width: string;
    page_namespace: string;
    disableAllTabs?: boolean; // Новый пропс для отключения всех вкладок
}

interface TabsProps {
    activeKey: string;
    setActiveKey: (key: string) => void;
}

// Объединяем оба интерфейса
type CombinedProps = HeaderProps & TabsProps;


export default function Header({width, page_namespace, activeKey, setActiveKey, disableAllTabs = false}: CombinedProps) {

    const {t} = useTranslation(page_namespace);
    const {t: misc} = useTranslation('misc');

    //const page_title = t("title");

    const page_title = page_namespace === "message"
        ? misc("message_page_title")
        : page_namespace === "request"
            ? misc("request_page_title")
            : t("title");

    return (
        <header className="-header_bg -opacity-90 backdrop-blur-xl"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                }}
        >

            <div className="container flex mx-auto px-3 flex-col  "
                 style={{maxWidth: `${width}px`}}>

                <div className="flex flex-row md:hidden items-start">
                    <Link
                        href="/"
                        className="flex items-center text-default-500 hover:text-primary-400 transition"
                    >
                        <TbArrowBackUp size={26} className="-ml-[4px] mt-[24px] font-medium"/>
                    </Link>

                    <div className="text-2xl ml-[30px]  pt-[25px] pb-[20px] text-primary -font-semibold leading-[26px]">
                        {page_title}



                    </div>

                </div>

                <div className="hidden md:block flex flex-col items-start">
                    <Link
                        color="foreground"
                        href="/"
                        className="mt-5 mb-4 flex flex-row items-center text-default-500 hover:text-primary-400 transition"
                    >
                        {/*<IoIosArrowBack className="-ml-[8px]" size={26}/>*/}
                        <TbArrowBackUp size={26} className="-ml-[4px] font-medium"/>
                        {/*<p className=" mb-[1px] -font-semibold">{ui('return_home')}</p>*/}
                        <p className=" mb-[0px] -font-semibold ml-2">
                            {misc("return_home")}

                        </p>

                    </Link>

                    <div className="text-2xl -ml-[1px] pb-[20px] text-primary -font-semibold leading-[26px]">
                        {page_title}                    </div>

                </div>


                    {!disableAllTabs && ( // Условно рендерим вкладки только если disableAllTabs === false
                        <Tabs
                            fullWidth
                            color="default"
                            aria-label="Tabs variants"
                            variant="underlined"
                            selectedKey={activeKey} // Передаем текущее значение из основного компонента
                            onSelectionChange={(key) => setActiveKey(key as string)} // Изменяем активную вкладку
                            classNames={{
                                tabList: "flex w-full mb-[5px] px-0 gap-3 mx-0 p-0 pb-[1px] pt-0 justify-between ",
                                tab: "w-full py-[20px] m-0 border-b border-divider pb-[25px] md:pb-[25px]",
                                cursor: "w-full  bg-primary -mb-[2px] h-[2px]",
                            }}
                            style={{
                                position: "sticky",
                                top: 0,
                            }}
                        >
                            <Tab key="description" title={misc("tab1")}/>
                            <Tab key="i_want" title={misc("tab2")}/>
                            <Tab key="payment" title={misc("tab3")}/>
                        </Tabs>
                    )}


                </div>


        </header>

)
}