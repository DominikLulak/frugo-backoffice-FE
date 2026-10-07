import {useEffect, useState} from "react";
import type {Pallet, PalletWarehouseItem} from "../../../types/pallet.ts";
import {getPalletDetail, getPallets} from "../../../api/PalletsApi.ts";
import PalletModal from "../../../components/pallets/PalletModal.tsx";

export default function PalletPage(){
    const [pallets, setPallets] = useState<Pallet[]>([])
    const [selectedPallet, setSelectedPallet] = useState<Pallet | null>(null)
    const [selectedPalletItems, setSelectedPalletItems] = useState<PalletWarehouseItem[]>([])

    const [palletNumber, setPalletNumber] = useState("")
    const [locationCode, setLocationCode] = useState("")
    const [closed, setClosed] = useState<boolean | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPallets();
            setPallets(data)
        }
        fetchData()
    }, []);

    const handleFilter = async () => {
        const data = await getPallets(
            palletNumber,
            locationCode,
            closed
        )
        setPallets(data)
    }

    const openPallet = async (pallet: Pallet) => {
        const data = await getPalletDetail(pallet.id)
        setSelectedPallet(pallet)
        setSelectedPalletItems(data)
    }

    return(
        <div className="container-fluid">

            <h1>Palety</h1>

            <div className="row g-2 mb-4">

                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="ETI cislo"
                        value={palletNumber}
                        onChange={(e) => setPalletNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Lokace"
                        value={locationCode}
                        onChange={(e) => setLocationCode(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-control"
                        value={closed === null ? "" : String(closed)}
                        onChange={(e) => {
                            if(e.target.value === ""){
                                setClosed(null)
                            }else{
                                setClosed(e.target.value === "true")
                            }
                        }}
                    >
                        <option value="">Vse</option>
                        <option value="true">Uzavrena</option>
                        <option value="false">Otevrena</option>
                    </select>
                </div>

                <div className="col-md-1 d-grid">
                    <button
                        className="btn btn-primary"
                        onClick={handleFilter}
                    >
                        Filtrovat
                    </button>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ETI cislo</th>
                        <th>Lokace</th>
                        <th>Uzavrena</th>
                    </tr>
                </thead>

                <tbody>
                {pallets.map(pallet => (

                    <tr key={pallet.id}>

                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openPallet(pallet)}
                            >
                                {pallet.palletNumber}
                            </button>
                        </td>
                        <td>{pallet.locationCode}</td>
                        <td>{pallet.closed ? "Ano" : "Ne"}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedPallet && (
                <PalletModal
                    pallet={selectedPallet}
                    items={selectedPalletItems}
                    onClose={() => {
                        setSelectedPallet(null)
                        setSelectedPalletItems([])
                    }}
                />
            )}
        </div>
    )
}