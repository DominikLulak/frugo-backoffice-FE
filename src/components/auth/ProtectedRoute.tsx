import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";
import {hasPermission} from "../../utils/permissions.ts";

type Props = {
    permission: string;
    children: ReactNode;
};

export default function ProtectedRoute({permission, children}: Props){

    if(!hasPermission(permission)){
        return <Navigate to="/dashboard" replace />
    }

    return children;
}