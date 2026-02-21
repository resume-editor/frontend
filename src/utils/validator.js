export const validate = async(schema, data) => {
    const { value, error } = schema.validate(data)

    return { value, error }
}