import React from "react";
import LocalText from "@/app/assets/localText";
import Image from 'next/image';

const ProjBanner: React.FC<{ pageKey: string }> = ({pageKey}) => {

    if (pageKey === "supervision") {
        return (
            <div
                className="flex  w-full -h-full items-cente -h-[200px] rounded-small bg-default-200 --bg-content3
            hover:brightness-105 transition
            flex-row -justify-between items-center px-[8px]  sm:px-[12px] pt-[15px] pb-[10px]
            "
                style={{
                    // aspectRatio: "2 / 1", // Отношение ширины к высоте
                }}
            >

                    <div className="w-[24%] xs390:w-[24%] -xs414:w-[26%] pointer-events-none">
                        <img
                            src="/me.png"
                            alt="Описание изображения"
                            loading="lazy"
                            className="block dark:hidden w-full h-auto rounded-full -rounded-small bg-default-300"
                        />
                        <img
                            src="/me_dark.png"
                            alt="Описание изображения"
                            loading="lazy"
                            className="hidden dark:block w-full h-auto rounded-full  -rounded-small bg-default-300"
                        />
                        <div className={"text-center font-medium text-[14px]"}>
                            <LocalText text={"trainer_l"} ns={`supervision`}/>
                        </div>
                    </div>

                    <div className="flex flex-col w-[52%] -xs414:w-[48%] -flex-grow -justify-center -pt-[15px] text-center pointer-events-none ">

                        <div className={"text-danger -font-medium text-[18px] -xs390:text-[20px] sm:text-[22px]"}
                        >
                            <LocalText text={"banner_title"} ns={`supervision`}/>
                        </div>

                        <div className={"text-[11px] xs414:text-[12px] italic mt-[5px]"}>
                            <LocalText text={"banner_subtitle"} ns={`supervision`}/>
                        </div>

                    </div>

                    <div className="w-[24%] xs390:w-[24%] -xs414:w-[26%] pointer-events-none">
                        <img
                            src="/kate.jpg"
                            alt="Описание изображения"
                            className="block dark:hidden brightness-105 w-full h-auto rounded-full -rounded-small"
                        />
                        <img
                            src="/kate_dark.jpg"
                            alt="Описание изображения"
                            className="hidden dark:block w-full h-auto rounded-full -rounded-small"
                        />
                        <div className={"text-center font-medium text-[14px]"}>
                            <LocalText text={"trainer_r"} ns={`supervision`}/>
                        </div>
                    </div>

            </div>
        );
    }




    if (pageKey === "tg4gt") {
        return (
            <div
                className="flex  w-full h-full items-cente min-h-[140px] sm:h-[170px] rounded-small bg-default-200 --bg-content3
            hover:brightness-105 transition
            flex-row -justify-between items-center pl-[8px]  sm:pl-[12px] pt-[15px] pb-[15px]
            "
                style={{
                    // aspectRatio: "2 / 1", // Отношение ширины к высоте
                }}
            >

                {/*<div className="w-[26%] xs390:w-[26%] xs414:w-[28%] pointer-events-none">*/}
                {/*    <img*/}
                {/*        src="/me.png"*/}
                {/*        alt="Описание изображения"*/}
                {/*        className="block dark:hidden w-full h-auto rounded-full -rounded-small bg-default-300"*/}
                {/*    />*/}
                {/*    <img*/}
                {/*        src="/me_dark.png"*/}
                {/*        alt="Описание изображения"*/}
                {/*        className="hidden dark:block w-full h-auto rounded-full  -rounded-small bg-default-300"*/}
                {/*    />*/}
                {/*    <div className={"text-center font-medium text-[14px]"}>*/}
                {/*        /!*<LocalText text={"trainer"} ns={`tg4gt`}/>*!/*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="flex flex-col flex-grow -w-[74%] -xs414:w-[72%]  -flex-grow -justify-center -pt-[15px] text-center pointer-events-none ">

                    <div className={"text-danger -font-medium text-[18px] -xs390:text-[20px] sm:text-[22px]"}
                    >
                        <LocalText text={"banner_title"} ns={`tg4gt`}/>
                    </div>

                    <div className={"text-[11px] xs414:text-[12px] italic mt-[5px]"}>
                        <LocalText text={"banner_subtitle"} ns={`tg4gt`}/>
                    </div>

                </div>



            </div>
        );
    }
};

export default ProjBanner;