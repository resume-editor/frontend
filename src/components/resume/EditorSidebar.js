import EditorSection from './EditorSection';
import PersonalDetailsForm from './forms/PersonalDetailsForm';
// import ExperienceForm from './forms/ExperienceForm';

export default function EditorSidebar() {
    const handleCreateResume = () => {
        console.log('Creating resume...');
    };

    return (
        <>
            <h3>Edit Resume</h3>

            <EditorSection title="Personal Details">
                <PersonalDetailsForm />
            </EditorSection>

            {/* <EditorSection title="Experience">
                <ExperienceForm />
            </EditorSection> */}

            <EditorSection title="Skills">
                {/* SkillsForm */}
            </EditorSection>

            <EditorSection title="Education">
                {/* EducationForm */}
            </EditorSection>

            <EditorSection title="Projects">
                {/* ProjectsForm */}
            </EditorSection>

            <EditorSection title="Achievements">
                {/* AchievementsForm */}
            </EditorSection>

            <button className="btn btn-primary" onClick={handleCreateResume}>Create Resume</button>
        </>
    );
}
