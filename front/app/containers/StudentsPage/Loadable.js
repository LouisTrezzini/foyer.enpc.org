/**
 *
 * Asynchronously loads the component for StudentsPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
