"use client";

import { useEffect, useState } from "react";
import { isElectron } from "@/lib/isElectron";

export default function Titlebar() {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        if(isElectron()) {
           setShow(true);
        }
    }, []);

    if(!show) return null;

    return (
        <div className={"titlebar absolute top-0 left-0 right-0 w-full items-center justify-center z-15"}>
            <div className="text-md py-2 px-4 font-extrabold text-black bg-white h-10 border-b border-lightgray">
                Sticky
            </div>
        </div>
    );
}