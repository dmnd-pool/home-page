import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Button from './components/Button.jsx';
import { LINKS } from './config/links.js';

export default function NotFound() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-default pt-6 lg:pt-0">
        <Nav current="none" />
      </header>

      <main className="mx-auto flex w-full max-w-[760px] flex-col items-start gap-6 px-6 py-24 lg:py-32">
        <p className="text-sm font-medium tracking-wide text-body-alt uppercase">Error 404</p>
        <h1 className="font-heading text-2xl font-medium tracking-tight text-header-default lg:text-3xl lg:tracking-normal">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-base text-body-alt">
          The link may be out of date, or the page may have moved. Try one of these instead.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" href={LINKS.home} label="Back to home" />
          <Button variant="secondary" href={LINKS.slice} label="SLICE" />
          <Button variant="secondary" href={LINKS.apiDocs} label="API docs" />
          <Button variant="secondary" href={LINKS.trustCenter} label="Trust center" />
        </div>
      </main>

      <Footer />
    </>
  );
}
