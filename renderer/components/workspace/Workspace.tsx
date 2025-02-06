"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useAppSelector } from "@/lib/hooks";
import { Caveat } from "next/font/google"

interface StickyNote {
    id: number;
    x: number;
    y: number;
    text: string;
}

export default function Workspace() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState<{ x: number, y: number } | null>(null);
    const [selectionEnd, setSelectionEnd] = useState<{ x: number, y: number } | null>(null);
    const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
    const [draggingNote, setDraggingNote] = useState<StickyNote | null>(null);
    const [selectedNotes, setSelectedNotes] = useState<StickyNote[]>([]);
    const tool = useAppSelector(state => state.tool.value);

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const context = canvas.getContext("2d");
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Delete" && selectedNotes.length > 0) {
                setStickyNotes(stickyNotes.filter(note => !selectedNotes.includes(note)));
                setSelectedNotes([]);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedNotes, stickyNotes]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (tool === "select") {
            const note = stickyNotes.find(note =>
                e.clientX >= note.x && e.clientX <= note.x + 100 &&
                e.clientY >= note.y && e.clientY <= note.y + 100
            );
            if (note) {
                setDraggingNote(note);
                setSelectedNotes(prev => prev.includes(note) ? prev : [...prev, note]);
                return;
            } else {
                setSelectedNotes([]);
            }
        } else if (tool === "sticky") {
            const newNote: StickyNote = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                text: ""
            };
            setStickyNotes([...stickyNotes, newNote]);
        }
        setIsSelecting(true);
        setSelectionStart({ x: e.clientX, y: e.clientY });
        setSelectionEnd({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isSelecting) {
            setSelectionEnd({ x: e.clientX, y: e.clientY });

            const x1 = Math.min(selectionStart!.x, e.clientX);
            const y1 = Math.min(selectionStart!.y, e.clientY);
            const x2 = Math.max(selectionStart!.x, e.clientX);
            const y2 = Math.max(selectionStart!.y, e.clientY);

            const selected = stickyNotes.filter(note =>
                note.x >= x1 && note.x <= x2 && note.y >= y1 && note.y <= y2
            );
            setSelectedNotes(selected);
        }
        if (draggingNote) {
            const updatedNotes = stickyNotes.map(note =>
                note.id === draggingNote.id ? { ...note, x: e.clientX, y: e.clientY } : note
            );
            setStickyNotes(updatedNotes);
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        setDraggingNote(null);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context && tool === "select") {
            context.clearRect(0, 0, canvas.width, canvas.height);
            if (isSelecting && selectionStart && selectionEnd) {
                context.fillStyle = "rgba(0, 171, 231, 0.2)";
                context.strokeStyle = "rgba(0, 171, 231, 1)";
                context.lineWidth = 1;
                context.lineJoin = "bevel";

                const x = Math.min(selectionStart.x, selectionEnd.x);
                const y = Math.min(selectionStart.y, selectionEnd.y);
                const width = Math.abs(selectionEnd.x - selectionStart.x);
                const height = Math.abs(selectionEnd.y - selectionStart.y);

                context.fillRect(x, y, width, height);
                context.strokeRect(x, y, width, height);
            }
        }
    }, [isSelecting, selectionStart, selectionEnd]);

    const updateNotePosition = (id: number, x: number, y: number) => {
        setStickyNotes(stickyNotes.map(note => note.id === id ? { ...note, x, y } : note));
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                className={clsx(
                    "dots-bg",
                    { "select-cursor": tool === "select" },
                    { "sticky-cursor": tool === "sticky" }
                )}
            />
            {stickyNotes.map(note => (
                <StickyNoteComponent
                    key={note.id}
                    note={note}
                    isSelected={selectedNotes.includes(note)}
                    setSelectedNotes={setSelectedNotes}
                    updateNotePosition={updateNotePosition}
                />
            ))}
        </div>
    );
}

const font = Caveat({
    subsets: ["latin"]
})

function StickyNoteComponent({ note, isSelected, setSelectedNotes, updateNotePosition }: { note: StickyNote, isSelected: boolean, setSelectedNotes: (notes: (prev) => any) => void, updateNotePosition: (id: number, x: number, y: number) => void }) {
    const [text, setText] = useState(note.text);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - note.x, y: e.clientY - note.y });
        setSelectedNotes(prev => prev.includes(note) ? prev : [...prev, note]);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && dragStart) {
            updateNotePosition(note.id, e.clientX - dragStart.x, e.clientY - dragStart.y);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragStart(null);
    };

    return (
        <div
            contentEditable
            suppressContentEditableWarning
            style={{
                top: note.y,
                left: note.x,
                outline: isSelected ? "3px solid #0094D8" : "none"
            }}
            className={font.className + " text-darkgray select-none leading-6 text-2xl font-bold absolute w-48 min-h-48 bg-[#FEE155] p-5 rounded-lg drop-shadow-lg outline-0"}
            onBlur={(e) => setText(e.currentTarget.innerText)}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {text}
        </div>
    );
}