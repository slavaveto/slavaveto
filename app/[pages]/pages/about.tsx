'use client';

import React, {useEffect} from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {Spinner} from "@nextui-org/react";
import usePageTransition from "@/app/assets/usePageTransition";
import LocalText from "@/app/assets/localText";
import LoremText from "@/app/assets/loremText";

let isFirstLoad = true;

export default function Page({namespace}: { namespace: string }) {

    // Прокрутка страницы вверх при каждой загрузке
    useEffect(() => {
        window.scrollTo(0, 0); // Прокрутка страницы вверх
    }, []);

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
                    <Header width="500" namespace={namespace} onNavigateAction={handleNavigation}/>

                    <main className="flex-grow container mx-auto px-3 pt-[10px]"
                          style={{maxWidth: '500px'}}>

                        <LocalText text={"content"} ns={`${namespace}`}/>

                        {/*<LoremText paragraphs={6}/>*/}

                    </main>
                    <Footer width="500"/>
                </div>
            </div>

        </>
    )
}
