import {NavLink} from "react-router-dom";

type Props = {
    to: string;
    label: string;
}

export default function SidebarLink({to, label}: Props){
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