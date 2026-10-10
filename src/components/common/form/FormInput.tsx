type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "email" | "number" | "tel";
    disabled?: boolean;
    name?: string;
}

export default function FormInput({
    value,
    onChange,
    placeholder,
    type = "text",
    disabled = false,
    name
}:Props){
    return(
        <div className="col-md-2">
            <input
                className="form-control"
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    )
}