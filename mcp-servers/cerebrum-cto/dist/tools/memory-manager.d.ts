/**
 * Memory Manager Tool
 *
 * Reads and updates the CTO memory files.
 */
interface ReadParams {
    file: 'decisions' | 'learnings' | 'roadmap' | 'tech-debt' | 'all';
}
interface UpdateParams {
    file: 'decisions' | 'learnings' | 'roadmap' | 'tech-debt';
    content: string;
}
export declare function readMemory(params: ReadParams): Promise<{
    content: {
        type: string;
        text: string;
    }[];
    isError: boolean;
} | {
    content: {
        type: string;
        text: string;
    }[];
    isError?: undefined;
}>;
export declare function updateMemory(params: UpdateParams): Promise<{
    content: {
        type: string;
        text: string;
    }[];
    isError: boolean;
} | {
    content: {
        type: string;
        text: string;
    }[];
    isError?: undefined;
}>;
export {};
//# sourceMappingURL=memory-manager.d.ts.map