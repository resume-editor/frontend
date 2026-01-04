import './resumePreview.css'

export default function ResumePreview() {
    return (
        <div className="preview-wrapper">
            <img
                src="/sample-thumbnail.png"
                alt="Resume Preview"
                className="preview-image"
            />

            <button className="btn btn-secondary">Download PDF</button>
        </div>
    );
}
