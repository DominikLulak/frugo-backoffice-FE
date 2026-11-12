import type {Product} from "../../../types/product.ts";
import useProductsList from "../../../hooks/products/productsPage/useProductsList.ts";
import useProductsFilters from "../../../hooks/products/productsPage/useProductsFilters.ts";
import useProductTableColumns from "../../../hooks/products/productsPage/useProductTableColumns.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Filters from "../../../components/common/filters/Filters.tsx";
import Table from "../../../components/common/Table.tsx";
import ProductEditModal from "../../../components/products/ProductEditModal.tsx";
import useProductsTable from "../../../hooks/products/productsPage/useProductsTable.ts";

export default function ProductsPage(){

    const {
        products, filters, updateFilters,
        fetchProducts, loading, loadError,
        selectedProduct, showEditModal,
        actionError, setActionError,
        openCreate, openEdit, closeEdit, handleToggleSale
    } = useProductsList()

    const {stockStatus, setStockStatus, filteredProducts,
        getRowClass, getStockStatusLabel} = useProductsTable(products)

    const filterFields = useProductsFilters({
        filters, updateFilters, setStockStatus, stockStatus
    })

    const columns = useProductTableColumns({
        onEdit: openEdit,
        onToggleSale: handleToggleSale,
        getStockStatusLabel
    })

    const handleFilter = async () => {
        await fetchProducts(true, filters)
    }

    const handleSave = async () => {
        await fetchProducts(true, filters)
    }

    return(
        <div className="container-fluid">
            <PageHeader
                title="Produkty"
                actionLabel="Pridat produkty"
                onAction={openCreate}
            />

            <Filters
                fields={filterFields}
                onSubmit={handleFilter}
            />

            <Table<Product>
                columns={columns}
                data={filteredProducts}
                getRowKey={(product) => product.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam produkty..."
                emptyMessage="Nebyly nalezeny zadne produkty"
                getRowClassName={getRowClass}
            />

            {actionError && (
                <div className="alert alert-danger alert-dismissible mt-3">
                    {actionError}

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setActionError("")}
                    />
                </div>
            )}

            <ProductEditModal
                key={`${showEditModal}-${selectedProduct?.id ?? "new"}`}
                show={showEditModal}
                product={selectedProduct}
                onClose={closeEdit}
                onSaved={handleSave}
            />
        </div>
    );
}