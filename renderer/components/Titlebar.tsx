"use client";

import { useEffect, useState } from "react";
import { isElectron } from "@/lib/isElectron";
import { XIcon } from "lucide-react";
import { MinusIcon } from "@heroicons/react/24/outline";

export default function Titlebar() {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if(isElectron()) {
           setShow(true);
        }
    }, []);

    if(!show) return null;

    return (
        <div className={"titlebar absolute w-full items-center z-15 text-black dark:text-lightestgray bg-lightestgray dark:bg-darkgray border-b border-lightgray dark:border-black"}>
            <div className="text-md py-2 px-4 justify-between items-center flex flex-row w-full font-extrabold h-10">
                Sticky
                {/*<div className="flex flex-row gap-2 items-center">*/}
                {/*    <MinusIcon className={"size-5 mt-2.5 hover:bg-red-500"}/>*/}
                {/*    <XIcon className={"size-5 hover:bg-red-500"}/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}