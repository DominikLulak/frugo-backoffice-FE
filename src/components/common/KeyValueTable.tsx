export type KeyValueRow = {
    label: string;
    value: string | number;
}

type Props = {
    rows: KeyValueRow[]
}

export default function KeyValueTable({rows}: Props){
    return(
        <table className="table table-sm">
            <tbody>
                {rows.map((row) => (
                    <tr key={row.label}>
                        <th>{row.label}</th>
                        <td>{row.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}