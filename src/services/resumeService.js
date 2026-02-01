import apiClient from "./apiClient"

export const findTemplate = async (template_id) => {
    const response = await apiClient.get(`/template/${template_id}`)
    return response.data
}

export const generateResume = async ({
    name,
    full_name,
    email,
    phone,
    linkedin,
    github,
    summary, skills = [], education = [], experience = [], projects = []
},
{
    job_id,
    template_id
}) => {
    const response = await apiClient.post('/resume/generate', {
        job_id, template_id, name,
        data: {
            full_name,
            email,
            phone,
            linkedin,
            github,
            summary,
            skills,
            education,
            experience,
            projects
        }
    })

    return response.data
}