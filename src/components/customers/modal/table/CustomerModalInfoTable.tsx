import type {CustomerDetail} from "../../../../types/customer.ts";

type Props = {
    customerDetail: CustomerDetail;
}

export default function CustomerModalInfoTable({customerDetail}:Props){
    return(
        <div className="table-responsive">
            <h6>Udaje zakaznika</h6>

            <table className="table table-sm">
                <tbody>
                    <tr>
                        <th>Nazev / Jmeno</th>
                        <td>{customerDetail.name}</td>
                    </tr>
                    <tr>
                        <th>ICO</th>
                        <td>{customerDetail.companyId ?? "-"}</td>
                    </tr>
                    <tr>
                        <th>Zeme</th>
                        <td>{customerDetail.countryCode}</td>
                    </tr>
                    <tr>
                        <th>Mesto</th>
                        <td>{customerDetail.city}</td>
                    </tr>
                    <tr>
                        <th>PSC</th>
                        <td>{customerDetail.postalCode}</td>
                    </tr>
                    <tr>
                        <th>Ulice</th>
                        <td>{customerDetail.street}</td>
                    </tr>
                    <tr>
                        <th>Cislo popisne</th>
                        <td>{customerDetail.houseNumber}</td>
                    </tr>
                    <tr>
                        <th>Registrovany</th>
                        <td>{customerDetail.registered ? "Ano" : "Ne"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}