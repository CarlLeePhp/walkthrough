export interface Walkthrough {
    id: number;
    date: string;
    species: string; // Ovine
    departmentId: number;
    departmentName: string;
    shift: string; // D/S, N/S
    time: string;
    auditorId: number;
    auditorName: string;
    actionId: number;
    actionDes: string;
    compliant: string; // boolean -> string, true -> Yes, false -> No
    status: string; // Open, Closed
    comments: string;
    correctiveAction: string;
}
