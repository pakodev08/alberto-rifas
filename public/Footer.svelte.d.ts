export default Footer;
type Footer = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Footer: import("svelte").Component<{
    mainPhone: any;
}, {}, "">;
type $$ComponentProps = {
    mainPhone: any;
};
