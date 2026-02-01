export default function ExperienceDetailsForm({ data, onChange }) {
    return (
        <div>
            <input
                placeholder="Role"
                value={data.role}
                onChange={(e) => onChange('role', e.target.value)}
            />
            <input
                placeholder="Organization"
                value={data.organization}
                onChange={(e) => onChange('organization', e.target.value)}
            />
            <input
                placeholder="Start Date"
                value={data.start_date}
                onChange={(e) => onChange('start_date', e.target.value)}
            />
            <input
                placeholder="End Date"
                value={data.end_date}
                onChange={(e) => onChange('end_date', e.target.value)}
            />
            <input
                placeholder="Description"
                value={data.description}
                onChange={(e) => onChange('description', e.target.value)}
            />
        </div>
    );
}
