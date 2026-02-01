import './personalDetailsForm.css'

export default function AchievementsForm({ data, onChange }) {
    return (
        <div className="form-group">
            <input placeholder="Title" value={data.title} onChange={(e) => onChange('title', e.target.value)} />
            <input placeholder="Description" value={data.description} onChange={(e) => onChange('description', e.target.value)} />
        </div>
    );
}
