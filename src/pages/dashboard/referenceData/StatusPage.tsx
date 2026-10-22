import useStatusList from "../../../hooks/referenceData/status/useStatusList.ts";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";
import type {Status} from "../../../types/referenceData.ts";
import useStatusTableColumns from "../../../hooks/referenceData/status/useStatusTableColumns.ts";

export default function StatusPage(){
    const {statuses, loading, error} = useStatusList()

    const columns = useStatusTableColumns()

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam statusu"
            />

            <Table<Status>
                columns={columns}
                data={statuses}
                getRowKey={(status) => status.id}
                loading={loading}
                error={error}
                loadingText="Nacitam statusy"
                emptyMessage="Nebyli nalezeny zadne statusy"
            />

        </div>
    )
}