import type {ModuleDetail, RoleDetail} from "../../../../types/role.ts";
import useModuleList from "../../modules/page/useModuleList.ts";
import {useEffect, useMemo, useState} from "react";
import {getModuleDetail} from "../../../../api/ModuleApi.ts";

export default function useRoleAvailablePermissions(role: RoleDetail){
    const {
        modules, loading: modulesLoading, loadError: modulesError
    } = useModuleList()

    const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null)
    const [moduleDetail, setModuleDetail] = useState<ModuleDetail | null>(null)
    const [selectedPermissionId, setSelectedPermissionId] = useState<number | null>(null)
    const [loadingPermissions, setLoadingPermissions] = useState(false)
    const [permissionsError, setPermissionsError] = useState("")


    useEffect(() => {
        setModuleDetail(null);
        setSelectedPermissionId(null);
        setPermissionsError("");

        if (selectedModuleId === null) {
            setLoadingPermissions(false);
            return;
        }

        let cancelled = false;

        const fetchModuleDetail = async () => {
            try {
                setLoadingPermissions(true);

                const data = await getModuleDetail(selectedModuleId);

                if (!cancelled) {
                    setModuleDetail(data);
                }
            } catch {
                if (!cancelled) {
                    setPermissionsError(
                        "Nepodařilo se načíst oprávnění modulu."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoadingPermissions(false);
                }
            }
        };

        void fetchModuleDetail();

        return () => {
            cancelled = true;
        };
    }, [selectedModuleId]);


    const availablePermission = useMemo(() => {
        const assignedPermissionId = new Set(
            role.permissions.map((permission) => permission.id)
        )

        return (moduleDetail?.permissions ?? []).filter(
            (permission) => !assignedPermissionId.has(permission.id)
        )
    }, [role.permissions, moduleDetail])

    const selectedModule = (moduleId: number | null) => {
        setSelectedModuleId(moduleId)
        setSelectedPermissionId(null)
    }

    const selectedPermission = (permissionId: number | null) => {
        setSelectedPermissionId(permissionId)
    }

    return{
        modules, selectedModuleId, selectedPermissionId, availablePermission, modulesLoading, modulesError,
        loadingPermissions, permissionsError, selectedModule, selectedPermission
    }
}