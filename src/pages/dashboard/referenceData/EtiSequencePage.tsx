import type {EtiSequence} from "../../../types/etiSequence.ts";
import useEtiSeqList from "../../../hooks/referenceData/etiSeq/useEtiSeqList.ts";
import useEtiSeqTableColumns from "../../../hooks/referenceData/etiSeq/useEtiSeqTableColumns.ts";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";

export default function EtiSequencePage(){
    const {etiSequences, loading, error} = useEtiSeqList()

    const columns = useEtiSeqTableColumns()

    return(
        <div className="container-fluid">
            <PageHeader
                title="Eti sequence"
            />

            <Table<EtiSequence>
                columns={columns}
                data={etiSequences}
                getRowKey={(sequence) => sequence.id}
                loading={loading}
                error={error}
                loadingText="Nacitam sekvence"
                emptyMessage="Nepodarilo se nacist eti sekvence"
            />
        </div>
    )
}