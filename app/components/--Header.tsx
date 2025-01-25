"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";
import LocalText from "@/app/assets/localText";
import { Tab, Tabs, Chip } from "@nextui-org/react";
import { motion } from "framer-motion";

interface HeaderProps {
    width: string;
    namespace?: string;
    onNavigateAction: (href: string) => void;
    activeTab?: string;
    setActiveTab?: (key: string) => void;
    chipValue?: number | null; // Новый проп для значения Chip
}

export default function Header({
                                   width,
                                   namespace,
                                   activeTab,
                                   setActiveTab,
                                   onNavigateAction,
                                   chipValue, // Используем chipValue
                               }: HeaderProps) {
    const shouldRenderTabs = !activeTab || !setActiveTab;
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setScrollPosition(scrollTop); // Сохраняем текущее значение прокрутки
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Рассчитываем значение смещения `y` для header
    const calculateHeaderOffset = () => {
        if (scrollPosition > 1600) return -128; // Смещение -128px после 600px прокрутки
        if (scrollPosition > 100) return -28 - ((scrollPosition - 100) / 500) * (128 - 28); // Пропорциональное смещение
        return 0; // Нет смещения, если прокрутка меньше 100px
    };

    return (
        <motion.header
            className="-footer_bg -opacity-90 backdrop-blur-xl mb-[20px]"
            initial={{ y: 0 }}
            animate={{ y: calculateHeaderOffset() }} // Смещение `y` в зависимости от прокрутки
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
            }}
        >
            <motion.div
                className="banner"
                initial={{ y: 0 }}
                animate={{ y: scrollPosition > 100 ? -28 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                    overflow: "hidden",
                }}
            >
                {chipValue !== null && chipValue !== undefined && (
                    <div
                        className="banner flex mx-auto px-3 flex-col"
                        style={{ maxWidth: `${width}px` }}
                    >
                        <div
                            className={
                                "w-full flex justify-end items-center  text-[14px] pt-[4px]"
                            }
                        >
                            В группе осталось
                            <Chip
                                color="danger"
                                size="sm"
                                className="mx-3 px-4 text-[14px]"
                            >
                                {chipValue}
                            </Chip>
                            свободных места!
                        </div>
                    </div>
                )}
            </motion.div>

            <div
                className="main_info container flex mx-auto px-3 flex-col"
                style={{ maxWidth: `${width}px` }}
            >
                <div className="page_title flex flex-row -md:hidden md:ml-[-43px] items-start">
                    <Link
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateAction("/");
                        }}
                        className="flex items-center mr-[20px] text-default-500 --hover:text-primary-400 transition"
                    >
                        <TbArrowBackUp
                            size={26}
                            className="ml-[-4px] mt-[24px] font-medium"
                        />
                    </Link>

                    <div className="text-2xl pt-[25px] pb-[20px] text-primary -font-semibold leading-[26px]">
                        <LocalText text={"page_title"} ns={`${namespace}`} />
                    </div>
                </div>

                {!shouldRenderTabs && (
                    <Tabs
                        fullWidth
                        color="default"
                        aria-label="Tabs variants"
                        variant="underlined"
                        selectedKey={activeTab}
                        onSelectionChange={(key) =>
                            setActiveTab(key as string)
                        }
                        classNames={{
                            tabList:
                                "flex w-full mb-[5px] px-0 gap-3 mx-0 p-0 pb-[1px] pt-0 justify-between ",
                            tab: "w-full py-[20px] m-0 border-b border-divider pb-[20px] md:pb-[20px]",
                            cursor: "w-full  bg-primary -mb-[2px] h-[2px]",
                        }}
                        style={{
                            position: "sticky",
                            top: 0,
                        }}
                    >
                        <Tab
                            key="description"
                            title={
                                <LocalText
                                    text={"tab1_title"}
                                    ns={`${namespace}`}
                                />
                            }
                        />
                        <Tab
                            key="i_want"
                            title={
                                <LocalText
                                    text={"tab2_title"}
                                    ns={`${namespace}`}
                                />
                            }
                        />
                        <Tab
                            key="payment"
                            title={
                                <LocalText
                                    text={"tab3_title"}
                                    ns={`${namespace}`}
                                />
                            }
                        />
                    </Tabs>
                )}
            </div>
        </motion.header>
    );
}