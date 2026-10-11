import type {EmployeeDetail} from "../../../../types/employee.ts";

type Props = {
    employee: EmployeeDetail;
    onCreate: () => void;
    onDelete: (employeeDetail: EmployeeDetail)=> void;
}

export default function EmployeeModalTable({employee, onCreate, onDelete}: Props){
    return(
        <div className="table-responsive">
            <h6>Osobni udaje</h6>
            <table className="table table-sm">
                <tbody>
                <tr>
                    <th>Osobni cislo</th>
                    <td>{employee.employeeNumber}</td>
                </tr>
                <tr>
                    <th>Jmeno</th>
                    <td>{employee.name}</td>
                </tr>
                <tr>
                    <th>Adresa</th>
                    <td>{employee.address}</td>
                </tr>
                <tr>
                    <th>Mesto</th>
                    <td>{employee.city}</td>
                </tr>
                <tr>
                    <th>PSC</th>
                    <td>{employee.postalCode}</td>
                </tr>
                <tr>
                    <th>Datum narozeni</th>
                    <td>{employee.birthDate}</td>
                </tr>
                </tbody>
            </table>

            <h6 className="mt-4">Praovni udaje</h6>
            <table className="table table-sm">
                <tbody>
                <tr>
                    <th>Datum nastupu</th>
                    <td>{employee.hireDate}</td>
                </tr>
                <tr>
                    <th>Smena</th>
                    <td>{employee.shiftCode}</td>
                </tr>
                <tr>
                    <th>Oddeleni</th>
                    <td>{employee.departmentName}</td>
                </tr>
                <tr>
                    <th>Pracovni pozice</th>
                    <td>{employee.jobPositionName}</td>
                </tr>
                <tr>
                    <th>Aktivni</th>
                    <td>{employee.active ? "Ano" : "Ne"}</td>
                </tr>
                <tr>
                    <th>Datum okonceni smlouvy</th>
                    <td>{employee.terminationDate ?? "-"}</td>
                </tr>
                <tr>
                    <th>Uzivatelske jmeno systemu</th>
                    <td>{employee.systemUsername}</td>
                </tr>
                </tbody>
            </table>

            <h6 className="mt-4">Kontaktni udaje</h6>
            <table className="table table-sm">
                <tbody>
                <tr>
                    <th>Telefon</th>
                    <td>{employee.phone}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{employee.email}</td>
                </tr>
                </tbody>
            </table>

            <h6 className="mt-4">Prihlasovaci udaje</h6>

            {!employee.loginUsername && (
                <button
                    type="button"
                    className="btn btn-success btn-sm mb-3"
                    onClick={onCreate}
                >
                    Vytovrit login
                </button>
            )}
            {employee.loginUsername && (
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => onDelete(employee)}
                >
                    Odstranit
                </button>
            )}

            <table className="table table-sm">
                <tbody>
                <tr>
                    <th>Login username</th>
                    <td>{employee.loginUsername ?? "-"}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}