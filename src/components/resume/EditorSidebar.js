'use client';

import { useState } from 'react';
import { generateResume } from '@/services/resumeService';
import EditorSection from './EditorSection';
import PersonalDetailsForm from './forms/PersonalDetailsForm';
import ExperienceDetailsForm from './forms/ExperienceDetailsForm';
import EducationDetailsForm from './forms/EducationDetailsForm';
import ProjectDetailsForm from './forms/ProjectDetailsForm';
import AchievementsForm from './forms/AchievementForm';
import DynamicFormList from './forms/DynamicFormList';
import { cleanPayload } from '@/utils/utils';

export default function EditorSidebar({ template, onPdfGenerated }) {

    // 🔑 job lifecycle
    const [jobId, setJobId] = useState(null);

    // 🧠 Resume data
    const [personal, setPersonal] = useState({
        full_name: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        summary: '',
    });

    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [projects, setProjects] = useState([]);
    const [achievements, setAchievements] = useState([]);

    // 🚀 Create / Update resume
    const handleCreateResume = async () => {
        try {
            const rawPayload = {
                ...personal,
                skills: skills,
                experience,
                education,
                projects,
                achievements,
            };

            const id = {
                ...(jobId
                    ? { job_id: jobId }             // update existing job
                    : { template_id: template.id } // create new job
                )
            }

            const payload = cleanPayload(rawPayload)
            const response = await generateResume(payload, id);

            // 💾 Save job_id for next calls
            if (response?.data?.job_id && !jobId) {
                setJobId(response.data.job_id);
            }

            if (response?.data?.pdf && onPdfGenerated) {
                onPdfGenerated(response.data.pdf);
            }

            console.log('Resume generated:', response);

        } catch (err) {
            console.error('Generate resume failed', err);
        }
    };

    return (
        <div className="editor-sidebar">
            <h3>Edit Resume</h3>

            {/* PERSONAL DETAILS */}
            <EditorSection title="Personal Details">
                <PersonalDetailsForm data={personal} onChange={setPersonal} />
            </EditorSection>

            {/* SKILLS */}
            <EditorSection title="Skills">
                <DynamicFormList
                    value={skills.map((s) => ({ skill: s }))}
                    onChange={(updatedArray) => setSkills(updatedArray.map(item => item.skill))}
                    FormComponent={({ data, onChange }) => (
                        <input
                            value={data.skill}
                            onChange={(e) => onChange('skill', e.target.value)}
                            placeholder="Skill"
                            style={{ flex: 1, padding: '6px' }}
                        />
                    )}
                    emptyItem={{ skill: '' }}
                    addLabel="Skill"
                />

            </EditorSection>

            {/* EXPERIENCE */}
            <EditorSection title="Experience">
                <DynamicFormList
                    value={experience}
                    onChange={setExperience}
                    FormComponent={ExperienceDetailsForm}
                    emptyItem={{
                        role: '',
                        organization: '',
                        start_date: '',
                        end_date: '',
                        description: '',
                    }}
                    addLabel="Experience"
                />
            </EditorSection>

            {/* EDUCATION */}
            <EditorSection title="Education">
                <DynamicFormList
                    value={education}
                    onChange={setEducation}
                    FormComponent={EducationDetailsForm}
                    emptyItem={{
                        degree: '',
                        institution: '',
                        start_year: '',
                        end_year: '',
                        grade: '',
                    }}
                    addLabel="Education"
                />
            </EditorSection>

            {/* PROJECTS */}
            <EditorSection title="Projects">
                <DynamicFormList
                    value={projects}
                    onChange={setProjects}
                    FormComponent={ProjectDetailsForm}
                    emptyItem={{
                        name: '',
                        tools: '',
                        description: '',
                    }}
                    addLabel="Project"
                />
            </EditorSection>

            {/* ACHIEVEMENTS */}
            <EditorSection title="Achievements">
                <DynamicFormList
                    value={achievements}
                    onChange={setAchievements}
                    FormComponent={AchievementsForm}
                    emptyItem={{
                        title: '',
                        description: '',
                    }}
                    addLabel="Achievement"
                />
            </EditorSection>

            <button
                className="btn btn-primary"
                onClick={handleCreateResume}
                style={{ width: '100%', marginTop: '12px' }}
            >
                {jobId ? 'Update Resume' : 'Create Resume'}
            </button>
        </div>
    );
}
