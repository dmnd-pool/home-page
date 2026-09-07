/**
 * Joins class names, dropping anything falsy.
 *
 * This replaces Astro's `class:list`, which the components leaned on to switch a
 * class from a boolean. `clsx` would do the same thing, but the whole surface
 * used here is "ignore false and null", so it is not worth a dependency.
 */
export const cx = (...parts) => parts.filter(Boolean).join(' ');
