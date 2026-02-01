'use client';

import { useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
import './resumePreview.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

export default function ResumePreview({ pdfBase64, fileName = 'resume.pdf' }) {
    const canvasRef = useRef(null);
    const renderTaskRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;

        // ---- 1️⃣ Draw white placeholder page (fits container) ----
        const containerWidth = container.clientWidth;
        const pageRatio = 210 / 297; // A4 ratio
        const placeholderHeight = containerWidth / pageRatio;

        canvas.width = containerWidth;
        canvas.height = placeholderHeight;
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${placeholderHeight}px`;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!pdfBase64) return;

        let cancelled = false;

        const renderPdf = async () => {
            try {
                renderTaskRef.current?.cancel();

                const binary = atob(pdfBase64);
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) {
                    bytes[i] = binary.charCodeAt(i);
                }

                const pdf = await pdfjs.getDocument({ data: bytes }).promise;
                if (cancelled) return;

                const page = await pdf.getPage(1);
                if (cancelled) return;

                // ---- 2️⃣ Fit PDF page to container width (NO CSS SCALING) ----
                const baseViewport = page.getViewport({ scale: 1 });
                const scale = containerWidth / baseViewport.width;
                const viewport = page.getViewport({ scale });

                // ---- 3️⃣ HiDPI crisp rendering ----
                const dpr = window.devicePixelRatio || 1;

                canvas.width = viewport.width * dpr;
                canvas.height = viewport.height * dpr;

                canvas.style.width = `${viewport.width}px`;
                canvas.style.height = `${viewport.height}px`;

                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                renderTaskRef.current = page.render({
                    canvasContext: ctx,
                    viewport,
                });

                await renderTaskRef.current.promise;
            } catch (err) {
                if (err?.name !== 'RenderingCancelledException') {
                    console.error('PDF render error:', err);
                }
            }
        };

        renderPdf();

        return () => {
            cancelled = true;
            renderTaskRef.current?.cancel();
        };
    }, [pdfBase64]);

    const handleDownload = () => {
        if (!pdfBase64) return;
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${pdfBase64}`;
        link.download = fileName;
        link.click();
    };

    return (
        <div className="preview-wrapper">
            <div className="top-bar">
                <button className="btn-primary" onClick={handleDownload} disabled={!pdfBase64}>
                    Download
                </button>
            </div>

            <div className="preview-container">
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}
