import './personalDetailsForm.css'

export default function ProjectDetailsForm({ data, onChange }) {
    return (
        <div className="form-group">
            <input
                placeholder="Name"
                value={data.name || ''}
                onChange={(e) => onChange('name', e.target.value)}
            />
            <input
                placeholder="Tools Used / Tech Stack"
                value={data.tools || ''}
                onChange={(e) => onChange('tools', e.target.value)}
            />
            <input
                placeholder="Description"
                value={data.description || ''}
                onChange={(e) => onChange('description', e.target.value)}
            />
        </div>
    );
}
