import './personalDetailsForm.css'

export default function EducationDetailsForm({ data, onChange }) {
    return (
        <div className="form-group">
            <input placeholder="Grade" value={data.grade} onChange={(e) => onChange('grade', e.target.value)} />
            <input placeholder="Degree" value={data.degree} onChange={(e) => onChange('degree', e.target.value)} />
            <input placeholder="Start Year" type="number" value={data.start_year} onChange={(e) => onChange('start_year', e.target.value)} />
            <input placeholder="End Year" type="number" value={data.end_year} onChange={(e) => onChange('end_year', e.target.value)} />
            <input placeholder="Institute" value={data.institution} onChange={(e) => onChange('institution', e.target.value)} />
        </div>
    );
}