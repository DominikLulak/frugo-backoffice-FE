import {useLocation} from "react-router-dom";
import {type SidebarGroup, sidebarGroups} from "../../config/sidebarConfig.ts";
import {hasPermission} from "../../utils/permissions.ts";
import {useState} from "react";
import SidebarLink from "./SidebarLink.tsx";

export default function Sidebar(){
    const location = useLocation()

    const visibleGroups: SidebarGroup[] = sidebarGroups.map((group) => ({
        ...group,
        items: group.items.filter((item) => hasPermission(item.permission)),
    }))
        .filter((group) => group.items.length > 0);

    const [openGroups, setOpenGroups] = useState<string[]>(() =>
        visibleGroups.filter((group) => group.items.some((item) =>
            location.pathname === item.path
        ))
            .map((group) => group.id)
    );

    const toggleGroup = (groupId: string) => {
        setOpenGroups((previous) =>
            previous.includes(groupId)
                ? previous.filter((id) => id !== groupId)
                : [...previous, groupId]
        )
    }

    const menuButton = (active: boolean) =>
        `btn w-100 text-start d-flex justify-content-between align-items-center mb-2 ${
            active ? "btn-outline-light" : "btn-dark"
        }`;

    return(
            <div className="bg-dark text-white sidebar">
                <div className="p-3 border-bottom">
                    <h3 className="m-0">
                        Fru<span className="text-success">go</span>
                    </h3>
                </div>

                <div className="p-2">
                    {visibleGroups.map((group) => {
                        const isOpen = openGroups.includes(group.id)

                        const hasActiveItem = group.items.some(
                            (item) => item.path === location.pathname
                        )

                        return(
                            <div key={group.id}>
                                <button
                                    type="button"
                                    className={menuButton(
                                        isOpen || hasActiveItem
                                    )}
                                    onClick={() => toggleGroup(group.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{group.label}</span>
                                    <span>{isOpen ? "▲" : "▼"}</span>
                                </button>

                                {isOpen && (
                                    <div className="ms-3 mb-2">
                                        {group.items.map((item) => (
                                            <SidebarLink
                                                key={item.path}
                                                to={item.path}
                                                label={item.label}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}