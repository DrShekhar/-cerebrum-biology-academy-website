/**
 * Tech Debt Tracker Tool
 *
 * Reads and updates the tech debt register in the CTO memory.
 */
interface ListParams {
    priority?: string;
    status?: string;
}
interface AddParams {
    title: string;
    description?: string;
    priority: string;
    effort?: string;
    impact?: string;
}
export declare function listTechDebt(params: ListParams): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export declare function addTechDebt(params: AddParams): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export {};
//# sourceMappingURL=tech-debt-tracker.d.ts.map