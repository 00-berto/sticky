"use client";

import { useEffect, useRef, useState } from "react";
import { iconVariants, Tool } from "@/lib/types/Tool";
import clsx from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { setTool } from "@/lib/slices/selectedToolSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Toolbar() {
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const drawerRef = useRef<HTMLDivElement>(null);
    const tool = useAppSelector(state => state.tool.value)
    const dispatch = useAppDispatch();

    const toggleDrawerMenu = () => {
        setShowDrawer(!showDrawer);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const drawerBtn = document.getElementById("drawerBtn");
        if (drawerBtn && drawerBtn.contains(event.target as Node)) {
            return;
        }
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
            setShowDrawer(false);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setShowDrawer(false);
        }
    };

    useEffect(() => {
        if (showDrawer) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showDrawer]);

    const onClick = (value: Tool) => {
        dispatch(setTool(value))

    }

    return (
        <div className={"flex flex-col gap-2 items-center justify-center w-full"}>
            {showDrawer && <Drawer ref={drawerRef}/>}
            <div className="bg-white flex flex-row gap-1.5 outline-1 w-min mx-auto outline-lightgray rounded-2xl p-2 drop-shadow-lg">
                <ToolButton tool={"select"} activeTool={tool} onClick={() => onClick("select")}/>
                <ToolButton tool={"sticky"} activeTool={tool} onClick={() => onClick("sticky")}/>

                <div id={"drawerBtn"} onClick={toggleDrawerMenu} className={clsx("rounded-xl p-2.5 transition-colors ease duration-100", { "hover:bg-lightgray hover:text-white text-lightgray bg-white": !showDrawer }, { "bg-primary text-white": showDrawer })}>
                    {iconVariants["drawer"]}
                </div>
            </div>
        </div>
    )
}

function ToolButton({ tool, activeTool, onClick }: { tool: Tool, activeTool: string, onClick: any }) {
    return (
        <div onClick={onClick} className={clsx("rounded-xl p-2.5 transition-colors ease duration-100", { "hover:bg-lightgray hover:text-white text-lightgray bg-white": activeTool != tool }, { "bg-primary text-white": activeTool == tool })}>
            {iconVariants[tool]}
        </div>
    )
}

function Drawer({ ref }: { ref: any}) {
    return (
        <div ref={ref} className={"w-80 h-100 bg-white rounded-2xl outline-1 outline-lightgray p-2 drop-shadow-lg mx-auto"}>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="size-4.5 text-lightgray" aria-hidden="true"/>
                </div>
                <input
                    type="text"
                    name="challenge"
                    id="challenge"
                    autoComplete={"off"}
                    className="outline outline-none w-full rounded-xl bg-[#f0f0f0] py-1.5 pl-9 pr-5 text-darkgray placeholder:text-lightgray placeholder sm:text-sm sm:leading-6"
                    placeholder="Cerca..."
                />
            </div>
        </div>
    )
}