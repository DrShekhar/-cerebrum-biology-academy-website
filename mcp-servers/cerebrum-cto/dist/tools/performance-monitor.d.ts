/**
 * Performance Monitor Tool
 *
 * Runs performance analysis using Lighthouse and bundle analysis.
 */
interface PerformanceParams {
    url?: string;
    type?: 'lighthouse' | 'bundle' | 'both';
}
export declare function checkPerformance(params: PerformanceParams): Promise<{
    content: {
        type: string;
        text: string;
    }[];
}>;
export {};
//# sourceMappingURL=performance-monitor.d.ts.map