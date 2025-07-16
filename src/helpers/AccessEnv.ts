export default class AccessEnv {

    private data:Record<string, string>;
    private static instance: AccessEnv;

    private init(): void {
        this.data = {};
    }

    static getInstance(): AccessEnv {
        if(!this.instance) {
            this.instance = new AccessEnv();
            this.instance.init();
        }
        return this.instance;
    }

    get(key: string): string | undefined {
        let value: string | undefined = this.data[key];
        if(!value) {
            value = process.env[key];
            if(value) this.data[key] = value;
        }
        return value;
    }   

}
