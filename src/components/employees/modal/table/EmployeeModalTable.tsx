import type {EmployeeDetail} from "../../../../types/employee.ts";
import useEmployeeDetailSection from "../../../../hooks/employee/useEmployeeDetailSection.ts";
import KeyValueTable from "../../../common/KeyValueTable.tsx";

type Props = {
    employee: EmployeeDetail;
    onCreate: () => void;
    onDelete: (employeeDetail: EmployeeDetail)=> void;
}

export default function EmployeeModalTable({employee, onCreate, onDelete}: Props){
    const sections = useEmployeeDetailSection(employee);

    return(
        <div className="table-responsive">
            {sections.map((section) => (
                <section key={section.title}>
                    <h6 className="mt-4">{section.title}</h6>

                    {section.title === "Přihlašovací údaje" && (
                        <>
                            {!employee.loginUsername && (
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm mb-3"
                                    onClick={onCreate}
                                >
                                    Vytvorit login
                                </button>
                            )}

                            {employee.loginUsername && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger ms-2 mb-3"
                                    onClick={() => onDelete(employee)}
                                >
                                    Odstranit
                                </button>
                            )}
                        </>
                    )}

                    <KeyValueTable rows={section.rows}/>
                </section>
            ))}
        </div>
    )
}