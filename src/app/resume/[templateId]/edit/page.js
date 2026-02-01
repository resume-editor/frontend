'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTemplate } from '@/context/TemplateContext';
import EditorSidebar from '@/components/resume/EditorSidebar';
import dynamic from 'next/dynamic';
import '@/styles/resumeEditor.css';
import { findTemplate } from '@/services/resumeService';


const ResumePreview = dynamic(
    () => import('@/components/resume/forms/ResumePreview'),
    { ssr: false }
);

export default function ResumeEditorPage() {
    const { templateId } = useParams();
    const { selectedTemplate, setSelectedTemplate } = useTemplate();

    const [pdfBase64, setPdfBase64] = useState(''); // <-- store generated PDF here

    useEffect(() => {
        if (!selectedTemplate) {
            findTemplate(templateId)
                .then((data) => {
                    console.log('Selected Template: ', data);
                    setSelectedTemplate(data.data);
                })
                .catch((error) => console.error('Error while finding template: ', error));
        } else {
            console.log('Template Already selected: ', selectedTemplate);
        }
    }, [templateId, selectedTemplate, setSelectedTemplate]);

    if (!selectedTemplate) {
        return <div>Loading template...</div>;
    }

    return (
        <div className="resume-editor-layout">
            <div className="editor-column">
                <EditorSidebar
                    template={selectedTemplate}
                    onPdfGenerated={(base64) => setPdfBase64(base64)}
                />
            </div>

            <div className="preview-column">
                <ResumePreview pdfBase64={pdfBase64} />
            </div>
        </div>
    );
}
