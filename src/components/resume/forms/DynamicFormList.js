export default function DynamicFormList({
    value = [],
    onChange,
    FormComponent,
    emptyItem,
    addLabel,
}) {

    const addItem = () => {
        onChange([...value, { ...emptyItem }]);
    };

    const updateItem = (index, key, val) => {
        const updated = [...value];
        updated[index][key] = val;
        onChange(updated);
    };

    const deleteItem = (index) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <>
            {value.map((item, index) => (
                <div key={index} className="form-set">
                    <FormComponent
                        data={item}
                        onChange={(k, v) => updateItem(index, k, v)}
                    />
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteItem(index)}
                    >
                        Delete
                    </button>
                </div>
            ))}

            <button className="btn btn-secondary btn-sm" onClick={addItem}>
                + {addLabel}
            </button>
        </>
    );
}
