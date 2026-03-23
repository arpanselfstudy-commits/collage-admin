// add types according to requirements
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
}
