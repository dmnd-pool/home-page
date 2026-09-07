import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Logo from './Logo.jsx';
import Sun from './icons/Sun.jsx';
import Moon from './icons/Moon.jsx';
import HamburgerMenu from './icons/HamburgerMenu.jsx';
import Close from './icons/Close.jsx';
import Button from './Button.jsx';
import { cx } from '../lib/cx.js';
import { LINKS } from '../config/links.js';

/**
 * Top navigation. 1200 wide inside the 1440 frame, 24px of padding top and bottom
 * giving the drawn 84px height.
 *
 * The design deliberately strips the bottom border at 1440: the library component
 * draws a 0.5px rule, and that instance keeps the weight but removes the paint, so
 * no line renders. At 375 the rule IS painted, so it is drawn below lg only, as an
 * inset shadow rather than a border so it adds no height to the 72.
 *
 * The current page is signalled by full opacity plus a 0.5px underline; the other
 * links sit dimmed. That is an instance override in the file rather than a
 * component state, so it is reproduced literally.
 *
 * TWO THINGS HERE ARE NOT IN THE DESIGN, because the design has no answer for them
 * and shipping the drawn version would ship a broken page:
 *
 *  - The mobile menu. The file draws a hamburger with nothing behind it, and every
 *    nav link hidden below lg -- which leaves a phone with no navigation at all.
 *    The overlay below is invented: it borrows the section padding, the type ramp
 *    and the button variants already on the page rather than introducing anything,
 *    but a designer has not seen it.
 *  - The theme toggle. Same story: a control is drawn, no dark frame exists. The
 *    palette it switches to is derived in global.css.
 */
const LINK_ITEMS = [
  { label: 'Home', href: LINKS.home, current: true },
  { label: 'Slice', href: LINKS.slice, current: false },
  { label: 'Blog', href: LINKS.blog, current: false },
  { label: 'Docs', href: LINKS.docs, current: false },
];

const THEME_COLOR = { light: '#fafafa', dark: '#050505' };

const PILL =
  'flex size-10 items-center justify-center rounded-lg bg-btn-bg p-3 text-btn-text transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

const TOGGLE =
  'text-icon-alt transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

/**
 * The theme lives on <html>, not in React state.
 *
 * index.html stamps `data-theme` inline before the first paint, which is the only
 * way to avoid a light flash on a dark reload -- React does not run until long
 * after that. Making React the owner would mean re-deciding the theme during
 * hydration and fighting an attribute that is already correct, so the DOM stays
 * the source of truth and React subscribes to it.
 *
 * `useSyncExternalStore` is the primitive for exactly that shape, and a
 * MutationObserver is what turns an attribute into something subscribable: the
 * toggle and the OS listener both just write to <html>, and every reader updates
 * from the observer rather than from a second copy of the state that could drift.
 *
 * The Sun/Moon swap needs none of this -- it is a CSS `dark:` variant. The only
 * thing React needs the value for is the button's label.
 */
const subscribeToTheme = (onChange) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};

const readTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

// The server has no DOM, and neither does the very first paint of a fresh load
// before the inline script runs. Light is the designed default either way.
const readThemeOnServer = () => 'light';

function useTheme() {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, readThemeOnServer);

  const apply = useCallback((next, persist) => {
    const root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next]);
    if (persist) {
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* Storage unavailable: the choice just will not survive the next load. */
      }
    }
  }, []);

  useEffect(() => {
    // Follow the OS only while the reader has not made a choice of their own.
    const osDark = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => {
      let chosen = null;
      try {
        chosen = localStorage.getItem('theme');
      } catch {
        /* Treat unreadable storage as "no choice made". */
      }
      if (chosen !== 'dark' && chosen !== 'light') apply(event.matches ? 'dark' : 'light', false);
    };
    osDark.addEventListener('change', onChange);
    return () => osDark.removeEventListener('change', onChange);
  }, [apply]);

  const toggle = useCallback(() => {
    apply(readTheme() === 'dark' ? 'light' : 'dark', true);
  }, [apply]);

  return {
    toggle,
    label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
  };
}

function ThemeToggle({ label, onToggle }) {
  return (
    <button type="button" aria-label={label} onClick={onToggle} className={TOGGLE}>
      <span className="dark:hidden">
        <Sun />
      </span>
      <span className="hidden dark:block">
        <Moon />
      </span>
    </button>
  );
}

export default function Nav() {
  const { toggle, label } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const openButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus, scroll lock and the key handlers all belong to "the menu is open",
  // so they live in one effect that sets up on open and tears down on close.
  useEffect(() => {
    if (!open) return undefined;

    const menu = menuRef.current;
    const openButton = openButtonRef.current;
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    // Locking the body rather than the html element keeps iOS Safari from
    // scrolling the page behind the overlay.
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !menu) return;

      // Keep Tab inside the dialog: without this the focus ring walks off into
      // the page behind, which is still rendered underneath.
      const items = [...menu.querySelectorAll('a[href], button:not([disabled])')].filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Rotating to landscape can cross the lg breakpoint, which hides the panel
    // by stylesheet but would otherwise leave the body scroll-locked behind it.
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = (event) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
      document.body.style.overflow = '';
      (previouslyFocused instanceof HTMLElement ? previouslyFocused : openButton)?.focus();
    };
  }, [open]);

  return (
    <>
      <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 shadow-[inset_0_-0.5px_0_0_var(--color-border-default)] lg:py-6 lg:shadow-none xl:px-0">
        <div className="flex items-center gap-12">
          <a
            href={LINKS.home}
            className="text-body-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label="DMND home"
          >
            <Logo width={64} height={27} />
          </a>
          <div className="hidden items-center gap-12 lg:flex">
            {LINK_ITEMS.map((l) => (
              <Button
                key={l.label}
                variant="tertiary"
                size="default"
                href={l.href}
                link={l.current}
                dim={!l.current}
                label={l.label}
                aria-current={l.current ? 'page' : undefined}
              />
            ))}
          </div>
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle label={label} onToggle={toggle} />
          <Button variant="tertiary" size="default" href={LINKS.signIn} label="Sign in" />
          <Button variant="primary" size="small" href={LINKS.startMining} label="Start mining" />
        </div>

        {/* Mobile actions: the design pairs the theme toggle with a 40px dark menu
            pill. The design inks the hamburger with the border grey; `btn-text` is
            the same value to the eye and is the token that follows the button's
            fill into dark mode, where a border grey would not. */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle label={label} onToggle={toggle} />
          <button
            ref={openButtonRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className={PILL}
          >
            <HamburgerMenu />
          </button>
        </div>
      </nav>

      {/*
        Hidden with the `hidden` attribute rather than a class so it is inert for
        assistive technology and unfocusable while closed. It stays mounted so the
        markup is in the pre-rendered HTML either way.
      */}
      <div
        ref={menuRef}
        id="mobile-menu"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-0 z-50 flex flex-col bg-bg-default lg:hidden"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-body-default">
            <Logo width={64} height={27} />
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className={PILL}
          >
            <Close />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-12 overflow-y-auto px-6 pt-8 pb-10">
          <ul className="flex flex-col gap-6">
            {LINK_ITEMS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-current={l.current ? 'page' : undefined}
                  // Every link in the panel is an in-page anchor, so the panel
                  // has to get out of the way for the jump to be visible.
                  onClick={() => setOpen(false)}
                  className={cx(
                    'font-heading text-3xl font-medium transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                    l.current ? 'text-header-default' : 'text-body-alt',
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4">
            <Button
              variant="secondary"
              size="default"
              href={LINKS.signIn}
              label="Sign in"
              className="w-full"
              onClick={() => setOpen(false)}
            />
            <Button
              variant="primary"
              size="default"
              href={LINKS.startMining}
              label="Start mining"
              className="w-full"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
