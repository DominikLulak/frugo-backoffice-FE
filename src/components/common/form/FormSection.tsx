import type {ReactNode} from "react";

type Props = {
    title?: string;
    children: ReactNode
}

export default function FormSection({title, children}: Props){
    return(
        <section>
            {title && (
                <h6 className="mb-4">{title}</h6>
            )}
            {children}
        </section>
    )
}