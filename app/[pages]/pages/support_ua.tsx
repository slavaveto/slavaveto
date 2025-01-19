"use client";

import React from "react";
import {Spinner} from "@nextui-org/react";

import Footer from "@/app/components/Footer";
import LocalText from "@/app/assets/localText";
import ReturnHome from "@/app/assets/returnHome";
import usePageTransition from "@/app/assets/usePageTransition";

let isFirstLoad = true;

export default function Page({namespace}: { namespace: string }) {

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
                    <main className="flex-grow container mx-auto px-3 pt-[25px]"
                          style={{maxWidth: '550px'}}>

                        <div className="flex flex-col">
                            <img width={150}
                                 className="rounded mb-[20px]"
                                 src="/support_ua.jpg"
                            />

                            <LocalText text={"content"} ns={"support_ua"}/>

                            <ReturnHome onNavigateAction={handleNavigation}/>

                        </div>

                    </main>

                    <Footer width="550"/>

                </div>
            </div>
        </>
    )
}