'use client';
import EditorSidebar from '@/components/resume/EditorSidebar';
import ResumePreview from '@/components/resume/forms/ResumePreview';
import '@/styles/resumeEditor.css';

export default function ResumeEditorPage() {
    return (
        <div className="resume-editor-layout">
            {/* LEFT */}
            <div className="editor-column">
                <EditorSidebar />
            </div>

            {/* RIGHT */}
            <div className="preview-column">
                <ResumePreview />
            </div>
        </div>
    );
}
