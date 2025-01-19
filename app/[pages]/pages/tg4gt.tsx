'use client';

import React, {useState, useCallback, useEffect} from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {Spinner} from "@nextui-org/react";
import usePageTransition from "@/app/assets/usePageTransition";
import LocalText from "@/app/assets/localText";
import ContactForm from "@/app/components/ContactForm";
import LoremText from "@/app/assets/loremText";

let isFirstLoad = true;

export default function Page({namespace}: { namespace: string }) {

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
                <div
                    className="fixed inset-0 flex justify-center items-center h-screen
                        translate-y-[-5vh] xs450:translate-y-[-5vh]">
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
                            activeTab={activeTab} setActiveTab={setActiveTab}/>

                    <main className="flex-grow container mx-auto px-3"
                          style={{maxWidth: '500px'}}>



                        {activeTab === "description" && (
                            <div>
                                <LocalText text={"tab1_content"} ns={`${namespace}`}/>
                                {/*<LoremText paragraphs={6}/>*/}
                            </div>
                        )}

                        {activeTab === "i_want" && (
                            <div className="-max-w-[400px] -mx-auto">
                                <ContactForm
                                    isMessageRequired={isMessageRequired}
                                    namespace={namespace}
                                    onSubmitSuccess={() => {
                                    }}/>

                            </div>
                        )}

                        {activeTab === "payment" && (
                            <div>
                                <LoremText paragraphs={6}/>
                            </div>
                        )}




                    </main>
                    <Footer width="500"/>
                </div>
            </div>

        </>
    )
}
