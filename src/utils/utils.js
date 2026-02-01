export const cleanPayload = (obj) => {
    if (Array.isArray(obj)) {
        return obj
            .map(cleanPayload)
            .filter(
                item =>
                    item !== null &&
                    item !== undefined &&
                    (typeof item !== 'object' || Object.keys(item).length > 0)
            );
    }

    if (typeof obj === 'object' && obj !== null) {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (
                value === '' ||
                value === null ||
                value === undefined ||
                (Array.isArray(value) && value.length === 0)
            ) {
                return acc;
            }

            const cleanedValue = cleanPayload(value);

            if (
                cleanedValue !== undefined &&
                !(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0)
            ) {
                acc[key] = cleanedValue;
            }

            return acc;
        }, {});
    }

    return obj;
};
