"use client";

import { CheckIcon, ComputerDesktopIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";
import { useTheme } from "next-themes";

export default function Drawer({ ref }: { ref: any}) {

    return (
        <div ref={ref} className={"w-80 h-100 bg-white dark:bg-darkgray rounded-2xl outline-1 outline-lightgray dark:outline-black p-2 drop-shadow-lg mx-auto flex flex-col gap-2"}>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="size-4.5 text-lightgray" aria-hidden="true"/>
                </div>
                <input
                    type="text"
                    name="challenge"
                    id="challenge"
                    autoComplete={"off"}
                    className="outline outline-none w-full rounded-xl bg-lightestgray dark:bg-darkestgray py-1.5 pl-9 pr-5 text-darkgray dark:text-lightgray placeholder:text-lightgray placeholder sm:text-sm sm:leading-6"
                    placeholder="Cerca..."
                />
            </div>
            <div className="flex flex-col gap-2 min-size-full ">
                <ThemeDrawer/>
            </div>
        </div>
    )
}

export function DrawerButton({ Icon, text, onClickAction, RightIcon }: { Icon?: ReactElement, text: string, onClickAction: () => void, RightIcon?: ReactElement }) {
    const close = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
        cancelable: true
    });

    const realOnClick = () => {
        onClickAction();
        document.dispatchEvent(close)
    }

    return (
        <button onClick={realOnClick} className={"flex outline-0 flex-row gap-2 p-1.5 px-2.5 text-sm rounded-lg hover:bg-lightgray/40 hover:dark:bg-lightgray/20 text-darkgray dark:text-lightestgray items-center justify-between"}>
            <div className="flex flex-row gap-2 my-auto items-center w-full">
                {Icon}
                <div className="">{text}</div>
            </div>
            <div className="flex m-auto items-center justify-end mr-1">
                {RightIcon}
            </div>
        </button>
    )
}

function ThemeDrawer() {
    const { theme, setTheme } = useTheme();


    return (
        <div className={"flex flex-col w-full gap-0.5 mt-1"}>
            <div className="w-full text-sm ml-3 font-extrabold text-lightgray select-none">Tema</div>
            <DrawerButton
                Icon={<ComputerDesktopIcon className={"size-4"}/>}
                text={"Tema automatico"}
                onClickAction={() => {
                    setTheme("system")
                }}
                RightIcon={theme == "system" && <CheckIcon className={"size-4"}/> }
            />
            <DrawerButton
                Icon={<SunIcon className={"size-4"}/>}
                text={"Tema chiaro"}
                onClickAction={() => {
                    setTheme("light")
                }}
                RightIcon={theme == "light" && <CheckIcon className={"size-4"}/> }
            />
            <DrawerButton
                Icon={<MoonIcon className={"size-4"}/>}
                text={"Tema scuro"}
                onClickAction={() => {
                    setTheme("dark")
                }}
                RightIcon={theme == "dark" && <CheckIcon className={"size-4"}/> }
            />
        </div>
    )
}