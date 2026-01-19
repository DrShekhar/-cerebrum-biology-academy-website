/**
 * Codebase Search Tool
 *
 * Semantic search across the Cerebrum codebase using grep and glob patterns.
 * In production, this could be enhanced with vector embeddings for true semantic search.
 */
interface SearchParams {
    query: string;
    fileTypes?: string[];
    maxResults?: number;
}
export declare function searchCodebase(params: SearchParams): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export {};
//# sourceMappingURL=codebase-search.d.ts.map