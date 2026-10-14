import ModuleModal from "../../../components/rbac/modules/ModuleModal.tsx";
import useModuleList from "../../../hooks/rbac/modules/page/useModuleList.ts";
import useModuleTableColumns from "../../../hooks/rbac/modules/page/useModuleTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";
import useModuleModal from "../../../hooks/rbac/modules/page/useModuleModal.ts";
import ModuleEditModal from "../../../components/rbac/modules/ModuleEditModal.tsx";
import type {Module} from "../../../types/role.ts";

export default function ModulePage(){
    const { modules, fetchModules, loading, loadError} = useModuleList()

    const moduleModals = useModuleModal({
        onSaved: () => fetchModules()
    })

    const columns = useModuleTableColumns({
        onDetail: moduleModals.openDetail,
        onEdit: moduleModals.openEdit
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam modulu"
                actionLabel="Pridat modul"
                onAction={moduleModals.openCreate}
            />

            <Table<Module>
                columns={columns}
                data={modules}
                getRowKey={(module) => module.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam moduly..."
                emptyMessage="Nebyly nalezeny zadne moduly"
            />

            {moduleModals.selectedModule && (
                <ModuleModal
                    module={moduleModals.selectedModule}
                    onClose={moduleModals.closeDetail}
                    onRefresh={moduleModals.refreshSelectedModule}
                />
            )}

            <ModuleEditModal
                key={`${moduleModals.showEditModal}-${moduleModals.editingModule?.id ?? "new"}`}
                show={moduleModals.showEditModal}
                module={moduleModals.editingModule}
                onClose={moduleModals.closeEdit}
                onSaved={fetchModules}
            />
        </div>
    )
}