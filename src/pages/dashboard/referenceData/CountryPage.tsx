import type {Country} from "../../../types/referenceData.ts";
import useCountriesList from "../../../hooks/referenceData/countries/useCountriesList.ts";
import useCountryModal from "../../../hooks/referenceData/countries/useCountryModal.ts";
import useCountryTableColumns from "../../../hooks/referenceData/countries/useCountryTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";
import CountryEditModal from "../../../components/referenceData/countries/CountryEditModal.tsx";

export default function CountryPage(){
    const {countries, fetchCountries, loadingCountries, countriesError} = useCountriesList()
    const {
        editingCountry, showEditModal, openEdit, openCreate, closeEdit
    } = useCountryModal()

    const columns = useCountryTableColumns({
        onEdit: openEdit
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam zemi"
                actionLabel="Pridat novou zemi"
                onAction={openCreate}
            />

            <Table<Country>
                columns={columns}
                data={countries}
                getRowKey={(country) => country.id}
                loading={loadingCountries}
                error={countriesError}
                loadingText="Nacitam zeme..."
                emptyMessage="Nebyly nalezeny zadne zeme"
            />

            <CountryEditModal
                key={`${showEditModal}-${editingCountry?.id ?? "new"}`}
                show={showEditModal}
                country={editingCountry}
                onClose={closeEdit}
                onSaved={() => fetchCountries()}
            />
        </div>
    )
}