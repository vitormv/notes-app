import { getEnvironment } from 'src/functions/environment';

/**
 * Returns true if the current environment is "development".
 *
 * @return {boolean}
 */
export const isDevelopment = () => getEnvironment() === 'development';
