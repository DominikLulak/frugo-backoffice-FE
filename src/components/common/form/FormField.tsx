import type {ReactNode} from "react";

type Props = {
    label: string;
    children: ReactNode;
}

export default function FormField({
    label,
    children
}:Props){
    return(
        <div className="mb=3">
            <label className="form-label">
                {label}
            </label>

            {children}
        </div>
    )
}