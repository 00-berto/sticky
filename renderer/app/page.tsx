import BottomInfobar from "@/components/workspace/BottomInfobar";
import Toolbar from "@/components/workspace/Toolbar";
import Workspace from "@/components/workspace/Workspace";

export default function Home() {
    return (
        <div className={"h-screen w-screen overflow-hidden flex flex-col justify-end items-center gap-5"}>
            <div className="absolute top-0 left-0 bottom-0 right-0 overflow-hidden z-0">
                <Workspace/>
            </div>
            <div className="z-10">
                <Toolbar/>
            </div>
            <div className="w-full z-10">
                <BottomInfobar />
            </div>
        </div>
    )
}