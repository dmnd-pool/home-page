import Button from '../Button.jsx';
import Art from '../Art.jsx';
import { heroWarehouse, heroWarehouseMobile } from '../../lib/art.js';
import { LINKS } from '../../config/links.js';

export default function Hero() {
  return (
    <section className="relative mt-10 h-[716px] overflow-hidden bg-bg-default lg:h-auto lg:min-h-[716px] lg:pb-[323px] xl:h-[716px] xl:pb-0">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-[14px] pt-16 lg:px-6 xl:absolute xl:inset-x-0 xl:top-16 xl:flex-row xl:items-start xl:px-0 xl:pt-0">
        <div className="flex w-full flex-col gap-2 xl:w-[693px] xl:shrink-0">
          <h1 className="font-heading text-4xl tracking-normal lg:text-5xl">
            <span className="font-medium text-header-alt">
              You choose
              <br />
            </span>
            <span className="font-normal text-body-alt">
              {' the blocks you mine.'}
              <br className="hidden lg:inline" />{' '}
              <span className="font-medium text-header-alt">Not the pool.</span>
            </span>
          </h1>
        </div>

        <div className="flex flex-1 flex-col gap-6 xl:items-end">
          <p className="w-full text-base text-body-alt xl:w-[483px] xl:text-right">
            Mine with a pool without giving the pool control of your block. Your Bitcoin node
            builds the template; DMND validates declared job, accounts for shares, and pays you
            for pooled mining.
          </p>
          <div className="flex flex-wrap items-center gap-2 xl:justify-end">
            <Button variant="primary" size="default" href={LINKS.startMining} label="Start mining" />
            <Button
              variant="secondary"
              size="default"
              href={LINKS.institutions}
              label="Speak with us"
            />
          </div>
        </div>
      </div>

      <Art
        src={heroWarehouse}
        srcMobile={heroWarehouseMobile}
        adaptive
        loading="eager"
        fetchPriority="high"
        className="pointer-events-none absolute bottom-0 left-0 h-[228px] w-[375px] max-w-none select-none lg:h-[323px] lg:w-[1030.785px]"
      />
    </section>
  );
}
