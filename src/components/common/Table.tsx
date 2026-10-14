import type {ReactNode} from "react";

export type TableColumn<T> = {
    key: string;
    header: string;
    render: (item: T) => ReactNode
}

type Props<T> = {
    columns: TableColumn<T>[];
    data: T[];
    getRowKey: (item: T) => string | number;
    loading?: boolean;
    error?: string;
    loadingText?: string;
    emptyMessage?: string;
    className?: string;
}

export default function Table<T>({
    columns,
    data,
    getRowKey,
    loading,
    error,
    loadingText,
    emptyMessage,
    className
}:Props<T>){
    return(
        <div className="table-responsive">
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {loading ? (
                <p>{loadingText}</p>
            ) : (
                <table className={`table ${className ?? ""}`.trim()}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key} scope="col">
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center p-4"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={getRowKey(item)}>
                                    {columns.map((column) => (
                                        <td key={column.key}>
                                            {column.render(item)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}