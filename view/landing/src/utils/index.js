// eslint-disable-next-line import/prefer-default-export
export function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export const isStage = () => process.env.VUE_APP_ENV === 'stage';
