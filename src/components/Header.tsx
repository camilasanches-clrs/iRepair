import {Link} from 'react-router-dom'

export function Header() {
    return (
        <header className="bg-gray-800 text-white p-4 mb-4 rounded">
            <h1 className="flex justify-center items-center text-xl font-bold">iRepair</h1>
            <nav className="flex justify-center items-center gap-4 mt-2">
                <Link to="/" >Dashboard</Link>
                <Link to="/clients" >Clients</Link>
                <Link to="/service-orders" >Service Orders</Link>
            </nav>
        </header>
    );
}