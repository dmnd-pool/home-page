export default function BlockBuilding() {
  return (
    <section className="overflow-hidden bg-bg-default px-4 py-20 lg:px-6 lg:py-30 xl:px-30">
      <div className="mx-auto w-full shadow-[inset_0_0_0_0.5px_var(--color-border-default)] lg:max-w-[1200px]">
        <div className="flex flex-col justify-between gap-10 px-6 py-12 lg:flex-row lg:items-center lg:px-16">
          <div className="flex w-full flex-col gap-2 lg:w-[377px] lg:shrink-0">
            <h2 className="font-heading text-3xl font-medium text-body-alt">
              {'Block building '}
              <br />
              <span className="text-header-default">via job declaration</span>
            </h2>
          </div>

          <p className="w-full text-base text-body-alt lg:w-[401px] lg:text-right">
            Your template, built on your own node, the foundation every layer stands on.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="block-hatch h-12 bg-bg-primary shadow-[inset_0.5px_0_0_0_var(--color-border-default),inset_-0.5px_0_0_0_var(--color-border-default),inset_0_-0.5px_0_0_var(--color-border-default)] lg:bg-transparent lg:shadow-[inset_0.5px_0.5px_0_0_var(--color-border-default),inset_-0.5px_0_0_0_var(--color-border-default)]"
        />
      </div>
    </section>
  );
}
