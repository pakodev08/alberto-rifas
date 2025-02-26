export default MetodoPago;
type MetodoPago = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const MetodoPago: import("svelte").Component<{
    selectedTicket: any;
    ticketValue: any;
    totalZelle: any;
}, {}, "">;
type $$ComponentProps = {
    selectedTicket: any;
    ticketValue: any;
    totalZelle: any;
};
