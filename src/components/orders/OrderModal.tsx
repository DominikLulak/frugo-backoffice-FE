import "./orders.css"

type Props = {
    items: any[];
    onClose: () => void;
}

export default function OrderModal({items, onClose}: Props){
    return(
        <>
            <div className="modal-backdrop-custom">
                <div className="modal-custom">
                    <div className="modal-content-custom">

                        <div className="modal-header">
                            <h5>Položky objednávky</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Kategorie</th>
                                    <th>Název</th>
                                    <th>Varianta</th>
                                    <th>Množství</th>
                                </tr>
                                </thead>

                                <tbody>
                                {items.map((i, idx) => (
                                    <tr key={idx}>
                                        <td>{i.category}</td>
                                        <td>{i.name}</td>
                                        <td>{i.variant}</td>
                                        <td>{i.quantity}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}