import './personalDetailsForm.css'

export default function PersonalDetailsForm() {
    return (
        <div className="form-group">
            <input placeholder="Full Name" />
            <input placeholder="Email" />
            <input placeholder="Phone" />
            <input placeholder="LinkedIn" />
            <input placeholder="GitHub / Portfolio" />
        </div>
    );
}
