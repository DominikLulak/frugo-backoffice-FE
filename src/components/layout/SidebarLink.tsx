import {NavLink} from "react-router-dom";

type Props = {
    to: string;
    label: string;
    disabled?: boolean;
}

export default function SidebarLink({to, label, disabled}: Props){
    if (disabled) {
        return (
            <div className="btn btn-dark w-100 text-start mb-2 opacity-50 pe-none cursor-not-allowed">
                {label}
            </div>
        );
    }

    return(
        <NavLink
            to={to}
            end
            className={({isActive}) =>
                isActive
                    ? "btn btn-outline-light w-100 text-start mb-2"
                    : "btn btn-dark w-100 text-start mb-2"
            }
        >
            {label}
        </NavLink>
    )
}