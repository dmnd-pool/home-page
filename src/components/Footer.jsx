import Logo from './Logo.jsx';
import Button from './Button.jsx';
import { LINKS } from '../config/links.js';

const LEGAL = [
  { label: 'Terms of service', href: LINKS.terms },
  { label: 'Privacy policy', href: LINKS.privacy },
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-bg-default px-4 py-20 lg:px-6 lg:py-30 xl:px-30">
      <div className="mx-auto flex w-full flex-col gap-8 lg:max-w-[1200px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-8">
            <a
              href={LINKS.home}
              className="text-header-strong lg:text-header-alt"
              aria-label="DMND home"
            >
              <Logo width={57} height={24} />
            </a>
            <Button variant="tertiary" size="small" href={LINKS.linkedin} label="Linkedin" />
            <Button variant="tertiary" size="small" href={LINKS.x} label="X" />
          </div>

          <div className="flex items-center gap-8">
            {LEGAL.map((l) => (
              <Button key={l.label} variant="tertiary" size="small" href={l.href} label={l.label} />
            ))}
          </div>
        </div>

        <div className="-mb-px h-px w-full bg-border-default/50" />

        <div className="flex flex-col gap-1">
          <p className="text-sm text-header-default">
            &copy; {YEAR} DMND pool. all rights reserved.
          </p>
          <p className="text-xs text-body-alt">
            DMND is a trading name of Guru Protocol Ltd, a company registered in England and Wales
            (Company No. 15235937). Registered office: 85 Great Portland Street, London, England, W1W
            7LT.
          </p>
        </div>
      </div>
    </footer>
  );
}
