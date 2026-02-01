// utils/date.js
export const formatLocalDate = (iso) => {
    return new Date(iso).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
};
