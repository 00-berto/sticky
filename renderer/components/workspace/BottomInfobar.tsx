"use client";

import { useEffect, useRef, useState } from "react";
import { ComputerDesktopIcon, MoonIcon, QuestionMarkCircleIcon, SunIcon } from '@heroicons/react/24/outline'
import MultiplayerIconFill from "../svg/MultiplayerIconFill";
import { isElectron } from "@/lib/isElectron";
import { useTheme } from "next-themes";
import MultiplayerIcon from "@/components/svg/MultiplayerIcon";

export default function BottomInfobar() {
    const [date, setDate] = useState<Date>(undefined);
    const [inputValue, setInputValue] = useState("untitled");
    const inputRef = useRef(null);
    const { theme, setTheme } = useTheme();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1)
    }, [date, setDate])

    return (
        <>
            <div className="h-min flex justify-between bg-lightestgray dark:bg-darkgray p-1 px-3 border-t border-lightgray dark:border-black">
                <div className="w-full my-auto flex flex-row justify-start gap-2 font-bold">
                    {date ? 
                        <div className="flex gap-3 text-lightgray">
                            <span>{date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</span>
                            <span>•</span>
                            <span>{date.getDay().toString().padStart(2, '0')}.{date.getMonth().toString().padStart(2, '0')}.{date.getFullYear().toString().padStart(4, '0')}</span>
                        </div>
                    :
                        <>
                            ...
                        </>
                    }
                </div>

                <div className="w-full my-auto flex justify-center gap-0 font-bold align-text-bottom">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="w-min ring-0 outline-0 m-auto text-center text-darkestgray dark:text-white"
                        size={inputValue.length}
                        style={{ maxWidth: '80ch' }}
                        maxLength={80}
                        onBlur={() => {
                            if(inputValue.length <= 0) {
                                setInputValue("untitled")
                            }
                        }}
                        onFocus={() => inputRef.current.select()}
                        ref={inputRef}
                    />
                    {/* <span className="text-xs mt-auto mb-0.5 text-lightgray">.sticky</span> */}
                </div>

                <div className="w-full my-auto flex justify-end gap-2 font-bold text-lightgray items-center">
                    {theme === "light" && <SunIcon className={"size-5 cursor-pointer"} onClick={() => setTheme("dark")}/>}
                    {theme === "dark" && <MoonIcon className={"size-5 cursor-pointer"} onClick={() => setTheme("system")}/>}
                    {theme === "system" && <ComputerDesktopIcon className={"size-5 cursor-pointer"} onClick={() => setTheme("light")}/>}
                    <MultiplayerIcon className="size-6 stroke-2"/>
                    {!isElectron() && <span className="">Sticky</span>}
                    <QuestionMarkCircleIcon className="size-6 my-auto" />
                </div>
            </div>
        </>
    )
}