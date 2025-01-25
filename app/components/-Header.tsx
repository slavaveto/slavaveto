"use client";
import React, {useState, useCallback, useEffect} from 'react';
import Link from "next/link";
import {TbArrowBackUp} from "react-icons/tb";
import LocalText from "@/app/assets/localText";
import {Tab, Tabs, Chip} from "@nextui-org/react";
import { motion } from "framer-motion";

interface HeaderProps {
    width: string;
    namespace?: string;
    onNavigateAction: (href: string) => void; // Новый проп для обработки переходов
    activeTab?: string;
    setActiveTab?: (key: string) => void;
}

export default function Header({width, namespace, activeTab, setActiveTab, onNavigateAction}: HeaderProps) {

    // Проверяем, нужно ли рендерить вкладки
    const shouldRenderTabs = !activeTab || !setActiveTab;

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
<>



            <header className="-footer_bg -opacity-90 backdrop-blur-xl mb-[20px]"
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 50,
                    }}
            >


                {!isScrolled && (

                    <motion.div
                        className="banner"
                        initial={{opacity: 1}}
                        animate={{opacity: isScrolled ? 0 : 1}}
                        transition={{duration: 0.5}}
                        style={{visibility: isScrolled ? "hidden" : "visible"}}
                    >
                        <div className="banner flex mx-auto px-3 flex-col "
                             style={{maxWidth: `${width}px`}}
                        >
                            <div className={"w-full flex justify-end items-center text-[14px]"}                            >
                                В группе осталось<Chip color="danger" className={"mx-3 h-[20px] "}> 4 </Chip>свободных места!
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="main_info container flex mx-auto px-3 flex-col  "
                     style={{maxWidth: `${width}px`}}>



                    <div className=" flex flex-row -md:hidden md:ml-[-43px] items-start">

                        <Link
                            href="/"
                            onClick={(e) => {
                                e.preventDefault(); // Предотвращаем стандартное поведение
                                onNavigateAction("/"); // Вызываем fade-out и навигацию
                            }}

                            className="flex items-center mr-[20px] text-default-500 --hover:text-primary-400 transition"
                        >
                            <TbArrowBackUp size={26} className="ml-[-4px] mt-[24px] font-medium"/>
                        </Link>

                        <div className="text-2xl  pt-[25px] pb-[20px] text-primary -font-semibold leading-[26px]">
                            <LocalText text={"page_title"} ns={`${namespace}`}/>
                        </div>
                    </div>

                    {/*<div className="hidden -md:block flex flex-col items-start">*/}
                    {/*    <Link*/}
                    {/*        color="foreground"*/}
                    {/*        href="/"*/}
                    {/*        className="mt-5 mb-4 flex flex-row items-center text-default-500 hover:text-primary-400 transition"*/}
                    {/*    >*/}
                    {/*        /!*<IoIosArrowBack className="-ml-[8px]" size={26}/>*!/*/}
                    {/*        <TbArrowBackUp size={26} className="-ml-[4px] font-medium"/>*/}
                    {/*        /!*<p className=" mb-[1px] -font-semibold">{ui('return_home')}</p>*!/*/}
                    {/*        <p className=" mb-[0px] -font-semibold ml-2">*/}
                    {/*            <LocalText text={"return_home"} ns={`misc`}/>*/}
                    {/*        </p>*/}
                    {/*    </Link>*/}
                    {/*    <div className="text-2xl -ml-[1px] pb-[20px] text-primary -font-semibold leading-[26px]">*/}
                    {/*        <LocalText text={"page_title"} ns={`${namespace}`}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {!shouldRenderTabs && ( // Условно рендерим вкладки только если disableAllTabs === false
                        <Tabs
                            fullWidth
                            color="default"
                            aria-label="Tabs variants"
                            variant="underlined"
                            selectedKey={activeTab} // Передаем текущее значение из основного компонента
                            onSelectionChange={(key) => setActiveTab(key as string)} // Изменяем активную вкладку
                            classNames={{
                                tabList: "flex w-full mb-[5px] px-0 gap-3 mx-0 p-0 pb-[1px] pt-0 justify-between ",
                                tab: "w-full py-[20px] m-0 border-b border-divider pb-[20px] md:pb-[20px]",
                                cursor: "w-full  bg-primary -mb-[2px] h-[2px]",
                            }}
                            style={{
                                position: "sticky",
                                top: 0,
                            }}
                        >

                            <Tab key="description" title={<LocalText text={"tab1_title"} ns={`${namespace}`}/>}/>
                            <Tab key="i_want" title={<LocalText text={"tab2_title"} ns={`${namespace}`}/>}/>
                            <Tab key="payment" title={<LocalText text={"tab3_title"} ns={`${namespace}`}/>}/>
                        </Tabs>
                    )}

                </div>
            </header>

        </>
    )
    }