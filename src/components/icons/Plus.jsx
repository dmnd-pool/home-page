/**
 * Solar `Add`, 16x16. Two 1px bars.
 *
 * The design draws the two bars in two different greys, and that is kept -- but
 * the vertical one is drawn as a literal #262626 in the Figma export, which is a
 * bug the moment the page has a dark theme: on the dark secondary fill the bar
 * lands at #262626 on #1f1f1f and all but disappears, leaving a "+" that reads as
 * a "-". It takes the icon token instead, which is the same #262626 in light and
 * follows the theme in dark.
 */
export default function Plus({ className }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3.5" y="7.5" width="9" height="1" fill="currentColor" />
      <rect x="7.5" y="3.5" width="1" height="9" fill="var(--color-icon-default)" />
    </svg>
  );
}
