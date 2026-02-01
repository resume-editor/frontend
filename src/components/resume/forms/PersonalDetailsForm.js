import './personalDetailsForm.css';

export default function PersonalDetailsForm({ data, onChange }) {
    const handleChange = (key, value) => {
        onChange({ ...data, [key]: value });
    };

    return (
        <div className="form-group">
            <input
                placeholder="Summary"
                value={data.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
            />
            <input
                placeholder="Full Name"
                value={data.full_name}
                onChange={(e) => handleChange('full_name', e.target.value)}
            />
            <input
                placeholder="Email"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
            />
            <input
                placeholder="Phone"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
            />
            <input
                placeholder="LinkedIn"
                value={data.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
            />
            <input
                placeholder="GitHub / Portfolio"
                value={data.github}
                onChange={(e) => handleChange('github', e.target.value)}
            />
        </div>
    );
}
