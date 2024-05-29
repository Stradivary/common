/**
 * add prefix "use" because we will be using these as hook.
 *
 * Zustand recommend to use single store,
 * but I choose to use multiple store with following reason:
 *
 * 1. Zustand store is already more like Redux's reducer/slice.
 *    It's already straight forward to get/set state in component
 * 2. Even multiple store can be combined in single store, the states
 *    won't be grouped by reducer/slice like they did in Redux.
 *    So there is possibility a conflict of state name and takes time to debug,
 *    since we setup the store splitted in multiple files anyway
 */

export { default as useAuthStore } from './auth.store';
export { default as useOpportunityStore } from './opportunity.store';
export { default as useCollabToolsStore } from './collabtools.store';
export { default as useSidebarStore } from './sidebar.store';
export { default as useAgreementFormStore } from './agreement.store';
export { default as useLoaderStore } from './loader.store';
export { default as useModalStore } from './modal-error-surrounding.store';
