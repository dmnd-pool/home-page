import Button from '../Button.jsx';
import Art from '../Art.jsx';
import { ctaTexture, ctaTextureMobile } from '../../lib/art.js';
import { LINKS } from '../../config/links.js';

export default function Cta() {
  return (
    <section className="relative h-[799px] overflow-hidden bg-bg-primary shadow-[inset_0_0_0_0.5px_var(--color-border-default)] lg:h-[412px]">
      <Art
        src={ctaTexture}
        srcMobile={ctaTextureMobile}
        adaptive
        className="pointer-events-none absolute top-[316px] left-0 h-[483px] w-full max-w-none object-cover object-bottom select-none lg:top-0 lg:left-[616px] lg:h-[412px] lg:w-[824px] lg:object-fill"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pt-20 pb-0 lg:py-30 xl:px-0">
        <div className="flex w-full flex-col gap-8 lg:max-w-[500px]">
          <h2 className="font-heading text-3xl font-semibold text-body-alt lg:text-4xl">
            {'Fair payouts. Full control. '}
            <span className="text-body-default lg:text-header-alt">Stratum V2 starts here.</span>
          </h2>
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:flex-wrap lg:items-center">
            <Button
              variant="primary"
              size="small"
              sizeLg="default"
              pillSm
              href={LINKS.startMining}
              label="Join now"
            />
            <Button
              variant="tertiary"
              size="small"
              sizeLg="default"
              href={LINKS.institutions}
              link
              label="Mining at institutional scale? Talk to us"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
