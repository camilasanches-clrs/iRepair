import type { Status } from '../types/ServiceOrder';
interface ServiceCardProps {
    id: number;
    nameClient: string;
    device: string;
    issue: string;
    status: Status;
    changeStatus: (id: number, newStatus: Status) => void;
    deleteOrder: (id: number) => void;
}



export const ServiceCard = (props: ServiceCardProps) => {

    function nextStatus(): Status{
        if (props.status === "open") {
            return "in_progress";
        }

        return "done";
 
    }

    function buttonAction() {
            if (props.status === "done") {
            props.deleteOrder(props.id);
        }
        else{
            props.changeStatus(props.id, nextStatus());
        }

    }

    
    return(
        <div className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">{props.nameClient}</h2>
            <p className="mb-1"><strong>Device: </strong> {props.device}</p>
            <p className="mb-1"><strong>Issue: </strong> {props.issue}</p>
            <p className="mb-1"><strong>Status: </strong> 
            <span className= {`px-2 py-1 rounded-full text-xs font-semibold ${props.status === 'open' ? 'bg-red-200 text-red-800' : props.status === 'in_progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{props.status}</span>
            </p>


            <button className="mt-3 bg-slate-700 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={buttonAction}>
                {props.status === "done" ? "Delete" : "Change Status"}
            </button>

        </div>
    )

}