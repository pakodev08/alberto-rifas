export default Banner;
type Banner = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Banner: import("svelte").Component<{
    rangoValue?: any;
    ticketValue: any;
    formData: any;
    fechaSorteo: any;
    premioMayor: any;
    totalZelle: any;
    findNumber: any;
    numbersAvailable: any;
    selectedTicket: any;
    mainPhone: any;
}, {}, "rangoValue">;
type $$ComponentProps = {
    rangoValue?: any;
    ticketValue: any;
    formData: any;
    fechaSorteo: any;
    premioMayor: any;
    totalZelle: any;
    findNumber: any;
    numbersAvailable: any;
    selectedTicket: any;
    mainPhone: any;
};
