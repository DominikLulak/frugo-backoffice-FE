import "../modal.css"

type Employee = {
    personalNumber: string;
    firstName: string;
    lastName: string;
    position: string;
    phoneNumber: string;
    email: string;
    address: string;
    shift: string;
    hireDate: string;
    birthDate: string;
};

type Props = {
    employee: Employee | null;
    onClose: () => void;
}

export default function EmployeeModal({employee, onClose}: Props){
    if(!employee) return null

    return(
        <>
            <div className="modal-backdrop-custom" onClick={onClose}>
                <div className="modal-custom" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content-custom">

                        <div className="modal-header">
                            <h5>Zaměstnanec</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Osobní číslo</th>
                                    <th>Jméno</th>
                                    <th>Pracovní pozice</th>
                                    <th>Telefon</th>
                                    <th>Email</th>
                                    <th>Bdliště</th>
                                    <th>Směna</th>
                                    <th>Datum nástupu</th>
                                    <th>Datum narození</th>
                                </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>{employee.personalNumber}</td>
                                        <td>{employee.firstName} {employee.lastName}</td>
                                        <td>{employee.position}</td>
                                        <td>{employee.phoneNumber}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.address}</td>
                                        <td>{employee.shift}</td>
                                        <td>{employee.hireDate}</td>
                                        <td>{employee.birthDate}</td>
                                    </tr>
                                </tbody>
                             </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}