export default Numeros;
type Numeros = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Numeros: import("svelte").Component<{
    rangoValue: any;
    onrago: any;
    numeross: any;
}, {}, "">;
type $$ComponentProps = {
    rangoValue: any;
    onrago: any;
    numeross: any;
};
