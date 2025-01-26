"use client";
import React, { useState, useEffect, useRef } from "react";
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

    pageType?: string;
    mestLeft?: number | null; // Новый проп для значения Chip
    titleLines?: number | null;
}

export default function Header({
                                   width,
                                   namespace,
                                   activeTab,
                                   setActiveTab,
                                   onNavigateAction,

                                   pageType,
                                   mestLeft, // Используем chipValue
                                   titleLines
                               }: HeaderProps) {


    const shouldRenderTabs = !activeTab || !setActiveTab;


    const getMestLeftText = (value: number | null | undefined): React.ReactNode => {
        if (value === null || value === undefined) {
            return "Нет данных"; // Если значение отсутствует
        }
        if (value === 1) {
            return <LocalText text={"left_1"} ns={`projs`} />;
        }
        if ([2, 3, 4].includes(value)) {
            return <LocalText text={"left_2"} ns={`projs`} />;
        }
        // По умолчанию для других значений
        return <LocalText text={`left_5`} ns={`projs`} />;
    };


    const defaultHeight = pageType === "proj"
        ? (titleLines === 1 ? 160 : 189)
        : 74;
    const addHeight = pageType === "proj" ? 80 : 0;
    const addHeightScroll = pageType === "proj" ? 50 : 0;



    const [elementHeight, setElementHeight] = useState<number | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Функция для измерения высоты элемента
        const measureHeight = () => {
            if (titleRef.current) {
                const height = titleRef.current.getBoundingClientRect().height;
                setElementHeight(height); // Сохраняем высоту в состоянии
                console.log("Element height:", height);
            }
        };
        measureHeight(); // Выполняем измерение при загрузке компонента

    }, []);

    const [isScrolled, setIsScrolled] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false); // Отслеживает анимацию
    const [isBannerHiddenForever, setIsBannerHiddenForever] = useState(false); // Отслеживает состояние скрытия баннера

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 200); // Проверяем, превышает ли прокрутка 100px
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Завершение анимации баннера
    const handleBannerAnimationComplete = () => {
        if (!isBannerHiddenForever && isScrolled) {
            setIsBannerHiddenForever(true); // Баннер скрыт навсегда
        }
        setIsAnimating(false); // Анимация завершена
    };

    return (
        <>

        <motion.header
            className="sticky_header -footer_bg -opacity-90 backdrop-blur-xl "
            initial={{ y: 0, height: elementHeight ? elementHeight + addHeight : defaultHeight }}
            animate={{
                y: isScrolled ? -0 : 0, // Смещение вверх при прокрутке
                height: isBannerHiddenForever
                    ? (elementHeight ? elementHeight + addHeightScroll : 0)
                    : isScrolled
                        ? (elementHeight ? elementHeight + addHeightScroll : 0)
                        : elementHeight
                            ? elementHeight + addHeight // Прибавляем 47, если `elementHeight` определен
                            : defaultHeight, // Если `elementHeight` undefined, используем значение по умолчанию
            }}
            transition={{
                duration: 0.5, // Длительность анимации
                ease: "easeInOut", // Плавное начало и конец анимации
            }}


            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
            }}
        >
            {!isBannerHiddenForever && !shouldRenderTabs && (
                <motion.div
                    className="banner"
                    initial={{ y: 0, height: 30 }}
                    animate={{ y: isScrolled ? -100 : 0,
                        height: isScrolled ? 0 : 30,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    onAnimationStart={() => setIsAnimating(true)} // Анимация началась
                    onAnimationComplete={handleBannerAnimationComplete} // Завершение анимации
                    style={{
                        overflow: "hidden",
                    }}
                >
                    {mestLeft !== null && mestLeft !== undefined && (
                        <>
                            <div
                                className=" flex mx-auto px-3 flex-col"
                                style={{ maxWidth: `${width}px` }}
                            >
                                <div
                                    className={"w-full flex justify-end items-center text-[14px] pt-[10px]"}
                                >
                                    <LocalText text={"left"} ns={`projs`} />
                                    <span  className="chip mx-[8px] px-[10px] pt-[2px] pb-[0px] text-[14px] "
                                    >
                                    {mestLeft}
                                </span>
                                    {getMestLeftText(mestLeft)}
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            )}
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
                        <TbArrowBackUp size={26} className="ml-[-4px] mt-[25px] font-medium" />
                    </Link>

                    <div ref={titleRef}
                         className="text-2xl pt-[25px] pb-[20px] text-primary  -font-semibold leading-[26px]">
                        <LocalText text={"page_title"} ns={`${namespace}`} />
                    </div>
                </div>

                {pageType === "proj" && (
                    <Tabs
                        fullWidth
                        color="default"
                        aria-label="Tabs variants"
                        variant="underlined"
                        selectedKey={activeTab}
                        onSelectionChange={(key) => {
                            // Устанавливаем активную вкладку
                            setActiveTab?.(key as string);

                            // Сбрасываем скролл на уровень окна
                            window.scrollTo({
                                top: 100,
                                behavior: "smooth", // Быстрый скролл для предотвращения появления адресной строки
                            });

                            // // Если нужно сбрасывать только в контейнере:
                            // const container = document.querySelector(".sticky_header");
                            // if (container) {
                            //     container.scrollTo({
                            //         top: 0,
                            //         behavior: "smooth", // Плавный скролл для контейнера
                            //     });
                            // }
                        }}
                        classNames={{
                            tabList:
                                "flex w-full mb-[5px] px-0 gap-3 mx-0 p-0 pb-[1px] pt-0 justify-between h-[45px] ",
                            tab: "w-full py-[20px] m-0 border-b border-divider pb-[20px] md:pb-[20px] ",
                            cursor: "w-full  bg-primary -mb-[2px] h-[2px]",
                            tabContent: "group-data-[selected=true]:font-medium",
                        }}
                        style={{
                            position: "sticky",
                            top: 0,
                        }}
                    >
                        <Tab
                            key="description"
                            title={<LocalText text={"tab1_title"} ns={`projs`} />}
                        />
                        <Tab
                            key="i_want"
                            title={<LocalText text={"tab2_title"} ns={`projs`} />}
                        />
                        <Tab
                            key="payment"
                            title={<LocalText text={"tab3_title"} ns={`projs`} />}
                        />
                    </Tabs>
                )}
            </div>
        </motion.header>

        </>
    );
}