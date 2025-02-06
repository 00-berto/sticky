"use client";

import { useEffect, useRef, useState } from "react";
import { iconVariants, Tool } from "@/lib/types/Tool";
import clsx from "clsx";
import { setTool } from "@/lib/slices/selectedToolSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Drawer from "@/components/workspace/Drawer";

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
            <div className="bg-white dark:bg-darkgray flex flex-row gap-1.5 outline-1 w-min mx-auto outline-lightgray dark:outline-black rounded-2xl p-2 drop-shadow-lg">
                <ToolButton tool={"select"} activeTool={tool} onClick={() => onClick("select")}/>
                <ToolButton tool={"sticky"} activeTool={tool} onClick={() => onClick("sticky")}/>

                <div id={"drawerBtn"} onClick={toggleDrawerMenu} className={clsx("cursor-pointer rounded-xl p-2.5 transition-colors ease duration-100", { "hover:bg-lightgray/30 hover:dark:bg-lightgray/20 text-lightgray dark:text-white bg-white dark:bg-darkgray": !showDrawer }, { "bg-primary text-white": showDrawer })}>
                    {iconVariants["drawer"]}
                </div>
            </div>
        </div>
    )
}

function ToolButton({ tool, activeTool, onClick }: { tool: Tool, activeTool: string, onClick: any }) {
    return (
        <div onClick={onClick} className={clsx("cursor-pointer rounded-xl p-2.5 transition-colors ease duration-100", { "hover:bg-lightgray/20 hover:dark:bg-lightgray/20 text-lightgray dark:text-white bg-white dark:bg-darkgray": activeTool != tool }, { "bg-primary text-white": activeTool == tool })}>
            {iconVariants[tool]}
        </div>
    )
}

