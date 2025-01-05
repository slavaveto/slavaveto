"use client";


import Link from "next/link";
import {IoIosArrowBack} from "react-icons/io";
import ClientTranslation from "@/app/[pages]/components/ClientTranslation";
import React from "react";
import {useRouter} from "next/navigation";
import {supabase} from "@/app/assets/supabaseClient";
import {TbArrowBackUp} from "react-icons/tb";
import { Tabs, Tab } from "@nextui-org/react";

interface HeaderProps {
    width: string;
    page_namespace: string;
}

interface TabsProps {
    activeKey: string;
    setActiveKey: (key: string) => void;
}

// Объединяем оба интерфейса
type CombinedProps = HeaderProps & TabsProps;


export default function Header({ width, page_namespace, activeKey, setActiveKey }: CombinedProps) {


    return (
        <header className="-header_bg -opacity-90 backdrop-blur-xl"
                style={{
                    position: 'sticky',
                    top: 0
                }}
        >

            <div className="container flex mx-auto px-3  items-center "
                 style={{maxWidth: `${width}px`}}>

                <div className="flex flex-col ">

                    <Link
                        color="foreground"
                        href="/"
                        className="mt-5 mb-4 flex flex-row items-center"
                    >
                        {/*<IoIosArrowBack className="-ml-[8px]" size={26}/>*/}
                        <TbArrowBackUp size={26} className="-ml-[4px] font-medium"/>
                        {/*<p className=" mb-[1px] -font-semibold">{ui('return_home')}</p>*/}
                        <p className=" mb-[0px] -font-semibold ml-2">
                            <ClientTranslation phrase_key="return_home" namespace="ui"/>
                        </p>

                    </Link>

                    <div className="text-2xl -ml-[1px] mb-1 text-primary -font-semibold leading-[26px]">
                        <ClientTranslation phrase_key="title" namespace={page_namespace}/>
                    </div>
                </div>

            </div>



            <Tabs
                fullWidth
                color="default"
                aria-label="Tabs variants"
                variant="underlined"
                selectedKey={activeKey} // Передаем текущее значение из основного компонента
                onSelectionChange={(key) => setActiveKey(key as string)} // Изменяем активную вкладку
                classNames={{
                    tabList: "flex w-full px-0 mx-0 justify-between",
                    tab: "w-full py-[20px] m-0 ",
                    cursor: "w-full color-primary group-data-[selected=true]:text-[#06b6d4]",
                }}
                style={{
                    position: "sticky",
                    top: 0,
                }}
            >
                <Tab key="description" title="Описание" />
                <Tab key="i_want" title="Хочу с вами!" />
                <Tab key="payment" title="Оплата" />
            </Tabs>

        </header>

    )
}