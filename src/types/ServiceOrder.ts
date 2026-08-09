
export type Status = 'open' | 'in_progress' | 'done';

export interface ServiceOrder {
    id: number;
    clientId: number;
    device: string;
    issue: string;
    status: Status;
    created_at: string;
}

export interface NewServiceOrder {
    clientId: number;
    device: string;
    issue: string;
    status?: Status;
}