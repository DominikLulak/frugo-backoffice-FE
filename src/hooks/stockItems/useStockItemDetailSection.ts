import type {KeyValueRow} from "../../components/common/KeyValueTable.tsx";
import type {StockItemDetail} from "../../types/stock.ts";

export type StockItemDetailSection = {
    title: string;
    rows: KeyValueRow[];
}

export default function useStockItemDetailSection(
    stockItem: StockItemDetail
):StockItemDetailSection[]{
    return [
        {
            title: "Produkt",
            rows:[
                {label: "Kategorie", value: stockItem.categoryCode},
                {label: "Typ Produktu", value: stockItem.productType},
                {label: "Nazev Produktu", value: stockItem.productName},
                {label: "Kod Produktu", value: stockItem.productCode},
                {label: "Cislo nadrazene palety", value: stockItem.palletNumber ?? "-"},
                {label: "ETI Cislo", value: stockItem.etiNumber},
            ]
        },
        {
            title: "Skladova polozka",
            rows: [
                {label: "Typ baleni", value: stockItem.packagingType},
                {label: "Mnozstvi v baleni", value: stockItem.quantityPerPackage + " kg"},
                {label: "Typ podbaleni", value: stockItem.subpackageType ?? "-"},
                {label: "Mnozstvi v podbaleni", value: stockItem.quantityPerSubpackage ?? "-"  + " kg"},
                {label: "Celkove mnozstvi", value: stockItem.quantity + " kg"},
                {label: "Rezervovane mnozstvi", value: stockItem.allocatedQuantity + " kg"},
                {label: "Volne mnozstvi", value: stockItem.availableQuantity + " kg"},
            ]
        },
        {
            title: "Puvod a expirace",
            rows: [
                {label: "Zeme puvodu", value: stockItem.countryOfOrigin},
                {label: "Datum prijmu", value: stockItem.receivedAt.replace("T", " ").substring(0,19)},
                {label: "Datum expirace", value: stockItem.expirationDate},
            ]
        },
        {
            title: "Umisteni",
            rows: [
                {label: "Sklad", value: stockItem.warehouseCode},
                {label: "Lokace", value: stockItem.locationCode},
            ]
        }
    ]
}