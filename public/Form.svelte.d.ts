export default Form;
type Form = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Form: import("svelte").Component<{
    formData: any;
    numeross: any;
    seleccionados: any;
}, {}, "">;
type $$ComponentProps = {
    formData: any;
    numeross: any;
    seleccionados: any;
};
