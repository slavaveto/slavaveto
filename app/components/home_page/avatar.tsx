//"use client";

import {useTranslation} from 'react-i18next';

export default function Avatar() {

    const { t: ui } = useTranslation('ui');
    const { t: home } = useTranslation('home');


    return (
        <>
            <div
                className="flex flex-row items-center justify-between -xs414:justify-center -xs450:pr-6 -xs390:gap-10">
                <img
                    src={home("title_image")}
                    alt="Описание изображения"
                    className="block dark:hidden w-[120px] rounded-full  border-3 border-white"
                    style={{boxShadow: "0 0px 10px rgba(0, 0, 0, 0.2)"}}
                />
                <img
                    src={`${home("title_image_dark")}`}
                    alt="Описание изображения"
                    className="hidden dark:block w-[120px] rounded-full  border-0"
                    style={{boxShadow: "0 0px 10px rgba(0, 0, 0, 0.2)"}}
                />
                <div>
                    <div className="-pl-10 justify-end justify-center">
                        <p className="font-medium text-[26px] xs375:text-[29px] xs414:text-[30px] xs450:text-[32px] leading-5 pb-1">{home('title')}</p>
                        <p className="leading-4 text-sm italic w-full text-right -text-center pr-[5px]">{home('subtitle')} </p>
                    </div>
                </div>

            </div>
            <div style={{whiteSpace: 'pre-line'}}>
                {home('greeting')}
            </div>
        </>

    );
}

