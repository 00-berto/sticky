"use client";

import { useEffect, useRef, useState } from "react";
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import MultiplayerIcon from "../svg/MultiplayerIcon";
import { isElectron } from "@/lib/isElectron";

export default function BottomInfobar() {
    const [date, setDate] = useState<Date>(undefined);
    const [inputValue, setInputValue] = useState("untitled");
    const inputRef = useRef(null);

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
            <div className="h-min flex justify-between bg-white p-1 px-3 border-t border-lightgray">
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
                        className="w-min ring-0 outline-0 m-auto text-center text-darkgray"
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

                <div className="w-full my-auto flex justify-end gap-2 font-bold text-lightgray">
                    <MultiplayerIcon className="size-6"/>
                    {!isElectron() && <span className="">Sticky</span>}
                    <QuestionMarkCircleIcon className="size-6 my-auto" />
                </div>
            </div>
        </>
    )
}