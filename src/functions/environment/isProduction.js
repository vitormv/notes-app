import { getEnvironment } from 'src/functions/environment';

/**
 * Returns true if the current environment is "production".
 *
 * @return {boolean}
 */
export const isProduction = () => getEnvironment() === 'production';
