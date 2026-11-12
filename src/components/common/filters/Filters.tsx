import FormInput from "../form/FormInput.tsx";

export type FilterOption = {
    label: string;
    value: string;
}

type TextFilterField = {
    name: string;
    type: "text";
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
}

type SelectFilterField = {
    name: string;
    type: "select";
    value: string;
    placeholder?: string;
    options: FilterOption[];
    onChange: (value: string) => void;
}

export type FilterField = TextFilterField | SelectFilterField;

type Props = {
    fields: FilterField[];
    onSubmit: () => void;
}

export default function Filters({fields, onSubmit}:Props){
    return(
        <div className="row g-2 mb-4">
            {fields.map((field) => {
                if(field.type === "text"){
                    return (
                        <FormInput
                            key={field.name}
                            value={field.value}
                            placeholder={field.placeholder}
                            onChange={field.onChange}
                        />
                    )
                }

                return (
                    <div className="col-md-2" key={field.name}>
                        <select
                            className="form-control"
                            value={field.value}
                            onChange={(event) =>
                                field.onChange(event.target.value)
                            }
                        >
                            {field.placeholder && (
                                <option value="">
                                    {field.placeholder}
                                </option>
                            )}

                            {field.options.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )
            })}

            <div className="col-12 d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}
                >
                    Filtrovat
                </button>
            </div>
        </div>
    )
}