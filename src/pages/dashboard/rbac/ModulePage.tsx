import {useEffect, useState} from "react";
import type {Module, ModuleDetail} from "../../../types/role.ts";
import {getModuleDetail, getModules} from "../../../api/ModuleApi.ts";
import ModuleModal from "../../../components/rbac/ModuleModal.tsx";

export default function ModulePage(){
    const [modules, setModules] = useState<Module[]>([])
    const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getModules()
            setModules(data)
        }
        fetchData()
    }, []);

    const openModule = async (module: Module) => {
        const data = await getModuleDetail(module.id)
        setSelectedModule(data)
    }

    return(
        <div className="container-fluid">
            <h1>Seznam modulu</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Kod modulu</th>
                        <th>Jmeno modulu</th>
                    </tr>
                </thead>

                <tbody>
                {modules.map(module => (
                    <tr key={module.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openModule(module)}
                            >
                                {module.moduleCode}
                            </button>
                        </td>
                        <td>{module.moduleName}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedModule && (
                <ModuleModal
                    module={selectedModule}
                    onClose={() => setSelectedModule(null)}
                />
            )}
        </div>
    )
}