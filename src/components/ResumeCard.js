'use client';
import { useRouter } from 'next/navigation';
import '../styles/resumeCard.css';

export default function ResumeCard({ template }) {
  const router = useRouter();

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div
        className="resume-card"
        onClick={() => router.push(`/resume/${template.id}/edit`)}
      >
        <div className="resume-thumbnail">
          <img
            src={template.thumbnail}
            alt={template.name}
            className="resume-image"
          />
        </div>

        <div className="resume-info">
          <span>{template.name}</span>
        </div>
      </div>
    </div>
  );
}
