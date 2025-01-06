"use client";



import {IoIosArrowBack} from "react-icons/io";
import ClientTranslation from "@/app/[pages]/components/ClientTranslation";
import React, { useEffect, useState, useRef } from "react";

import Header from "@/app/[pages]/components/Header";


import LoremText from "@/app/components/LoremText";
import {Tabs, Tab} from "@nextui-org/react";




export default function Tg4gtPage ({ page_namespace }: { page_namespace: string }) {

    const [activeKey, setActiveKey] = useState("description"); // Начальная вкладка


    return (

        <>

            <Header width="550" page_namespace={page_namespace} activeKey={activeKey} setActiveKey={setActiveKey}/>

            <main className="flex-grow container mx-auto px-3 pt-3"
                  style={{maxWidth: '550px'}}>

                {/*<LoremText paragraphs={5}/>*/}
                {activeKey === "description" && (
                    <div>
                        <LoremText paragraphs={6}/>
                    </div>
                )}

            </main>


            </>

            )
            }