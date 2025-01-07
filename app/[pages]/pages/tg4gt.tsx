"use client";

import {IoIosArrowBack} from "react-icons/io";
import React, {useEffect, useState, useRef} from "react";

import Header from "@/app/[pages]/components/Header";

import LoremText from "@/app/components/LoremText";
import {useTranslation} from "react-i18next";
import Footer from "@/app/components/Footer";
import ContactForm from "@/app/components/ContactForm";

export default function Tg4gt({page_namespace}: { page_namespace: string }) {

    const [activeKey, setActiveKey] = useState("description"); // Начальная вкладка

    const {t: tg4gt} = useTranslation('tg4gt');
    const {t: misc} = useTranslation('misc');
    const HtmlString = ({text}: { text: string }) => (
        <span dangerouslySetInnerHTML={{__html: text}}/>
    );

    const isMessageRequired = false;

    return (

        <>

            <Header width="550" page_namespace={page_namespace} activeKey={activeKey} setActiveKey={setActiveKey}/>

            <main className="flex-grow container mx-auto px-3 pt-3"
                  style={{maxWidth: '550px'}}>

                {/*<LoremText paragraphs={5}/>*/}
                {activeKey === "description" && (
                    <div>

                        <HtmlString text={tg4gt('text')}/>
                        {/*<LoremText paragraphs={6}/>*/}
                    </div>
                )}

                {activeKey === "i_want" && (
                    <div className="-max-w-[400px] -mx-auto">

                        <ContactForm
                            isMessageRequired={isMessageRequired}
                            page={page_namespace}
                            formMessageBefore={tg4gt('form_text_before')}
                            formMessageAfter={tg4gt('form_text_after')}
                            onSubmitSuccess={() => {
                            }}/>

                    </div>
                )}

            </main>

            <Footer width="550"/>
        </>

    )
}