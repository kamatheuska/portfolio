import * as env from '@/constants/envs';

export const envMixin = () => ({
    computed: {
        $env() {
            return {
                ...env,
            };
        },
    },
});
