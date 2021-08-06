import { DARK_THEME_CSS_CLASS } from '@/constants';
import * as envs from '@/constants/envs';

export const envMixin = () => ({
    computed: {
        $env() {
            return {
                ...envs,
            };
        },
    },
});

export const darkThemeMixin = () => ({
    methods: {
        $toggleBodyTheme({ isDark } = { isDark: false }) {
            const body = document.getElementsByTagName('body')[0];
            if (isDark) {
                return body.classList.add(DARK_THEME_CSS_CLASS);
            }

            body.classList.remove(DARK_THEME_CSS_CLASS);
        },
    },
});
