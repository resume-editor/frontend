'use client';
import { useRouter } from 'next/navigation';
import '../styles/resumeCard.css';
import { useTemplate } from '@/context/TemplateContext';

export default function ResumeCard({ template }) {
  const router = useRouter();
  const { setSelectedTemplate } = useTemplate();

  const handleClick = () => {
    setSelectedTemplate(template);   // ✅ store full object
    router.push(`/resume/${template.id}/edit`);
  }

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div
        className="resume-card"
        onClick={handleClick}
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
