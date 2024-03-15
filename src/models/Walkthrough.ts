import { Auditor } from "./Auditor";
import { Department } from "./Department";
import { Action } from "./Action";
import { Followup } from "./Followup";

export interface Walkthrough {
    id: number,
    date: string,
    species: string, // Ovine
    department: Department,
    shift: string, // D/S, N/S
    time: string,
    auditor: Auditor,
    action: Action,
    compliant: boolean,
    status: string, // Open, Closed
    comments: string,
    correctiveAction: string,
    followups: Followup[]
}