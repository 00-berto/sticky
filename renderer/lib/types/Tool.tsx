import { ReactElement } from "react";
import CursorToolIcon from "@/components/svg/CursorToolIcon";
import StickyNoteToolIcon from "@/components/svg/StickyNoteToolIcon";
import ToolsToolIcon from "@/components/svg/ToolsToolIcon";

export type Tool = "select" | "sticky" | "drawer"

export const iconVariants: { [key in Tool]: ReactElement } = {
    select: <CursorToolIcon className={"size-5 m-auto"}/>,
    sticky: <StickyNoteToolIcon className={"size-5 m-auto"}/>,
    drawer: <ToolsToolIcon className={"size-5 m-auto"}/>
};