"use client";

import { useEffect, useRef, useState } from "react";

export default function Workspace() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionStart, setSelectionStart] = useState<{ x: number, y: number } | null>(null);
    const [selectionEnd, setSelectionEnd] = useState<{ x: number, y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.outerWidth
            canvas.height = window.outerHeight;
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsSelecting(true);
        setSelectionStart({ x: e.clientX, y: e.clientY });
        setSelectionEnd({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isSelecting) {
            setSelectionEnd({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context) {
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

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
    );
}