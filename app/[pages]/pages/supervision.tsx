'use client';

import React, {useState, useCallback, useEffect} from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {Spinner, Chip, Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import usePageTransition from "@/app/assets/usePageTransition";
import LocalText from "@/app/assets/localText";
import ContactForm from "@/app/components/ContactForm";
import LoremText from "@/app/assets/loremText";
import CustomAlert from "@/app/components/CustomAlert";
import { motion, AnimatePresence } from "framer-motion";

let isFirstLoad = true;

export default function Page({namespace}: { namespace: string }) {

    const page_type = "proj"
    const mest_left = 4;
    const title_lines = 1

    // Прокрутка страницы вверх при каждой загрузке
    useEffect(() => {
        window.scrollTo(0, 0); // Прокрутка страницы вверх
    }, []);

    const isMessageRequired = false;
    const [activeTab, setActiveTab] = useState("description"); // Начальная вкладка


    const {
        isInternalTransition, hasCheckedTransition, animationReady, isExiting, showSpinner, handleNavigation
    } = usePageTransition(isFirstLoad, () => {
        isFirstLoad = false; // Сбрасываем глобальный флаг
    });

    return (
        <>
            {showSpinner && (
                <div className="spinner">
                    <Spinner/>
                </div>
            )}

            <div
                className={`page-transition ${
                    isExiting ? 'page-transition-fadeout' : !animationReady ? 'page-transition-fadein' : ''
                }`}
            >

                <div className="flex flex-col min-h-svh">
                    <Header width="500" namespace={namespace} onNavigateAction={handleNavigation}
                            activeTab={activeTab} setActiveTab={setActiveTab}
                            mestLeft={mest_left} pageType = {page_type} titleLines={title_lines}
                    />

                    <main className="flex-grow container mx-auto px-3 pt-[20px]"
                          style={{maxWidth: '500px'}}>

                        <AnimatePresence mode="wait">

                        {activeTab === "description" && (
                            <motion.div
                                key="description"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                            <div>
                                <LocalText text={"tab1_content"} ns={`${namespace}`}/>

                                <div className={"mt-12"}>
                                <LoremText paragraphs={6}/>
                                </div>

                            </div>
                            </motion.div>
                        )}

                        {activeTab === "i_want" && (
                            <motion.div
                                key="i_want" // Уникальный ключ
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                            <div className="-max-w-[400px] -mx-auto">
                                <ContactForm
                                    isMessageRequired={isMessageRequired}
                                    namespace={namespace}
                                    onNavigateAction={handleNavigation}
                                    onSubmitSuccess={() => {
                                    }}/>

                            </div>
                            </motion.div>
                        )}

                        {activeTab === "payment" && (
                            <motion.div
                                key="payment" // Уникальный ключ
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                            <div>
                                <CustomAlert
                                    color="success"
                                    showIcon={false}
                                    title=""
                                    description="">

                                    <div className="text-foreground p-0">
                                        <LocalText   text={"tab3_content"} ns={`${namespace}`}/>
                                    </div>

                                </CustomAlert>

                                <Tabs
                                    aria-label="Options"
                                    fullWidth
                                    className="m-0"
                                    classNames={{
                                        tabList: "mt-[20px] mb-[11px] ",
                                        panel: "p-0 pt-[15px] ",
                                    }}
                                >
                                    <Tab
                                        key="in_euro"
                                        title={<LocalText text="tab_in_euro" ns={`projs`} />}
                                    >
                                        <motion.div
                                            key="in_euro"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <LocalText text="tab_in_euro_text" ns={`projs`} />
                                        </motion.div>
                                    </Tab>
                                    <Tab
                                        key="in_grivni"
                                        title={<LocalText text="tab_in_grivni" ns={`projs`} />}
                                    >
                                        <motion.div
                                            key="in_grivni"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <LocalText text="tab_in_grivni_text" ns={`${namespace}`} />
                                        </motion.div>
                                    </Tab>
                                </Tabs>

                            </div>
                            </motion.div>
                        )}

                        </AnimatePresence>


                    </main>
                    <Footer width="500"/>
                </div>
            </div>

        </>
    )
}
