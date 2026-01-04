export default function CardItem({ item }) {
    return (
        <div className="col-12 col-md-4">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                </div>
            </div>
        </div>
    );
}