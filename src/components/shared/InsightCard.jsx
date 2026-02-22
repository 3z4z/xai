import Button from "./Button";
import DataEvolution from "./DataEvolution";

export default function InsightCard({ step, index }) {
  return (
    <article
      key={index}
      className="insight-card absolute w-full flex flex-col md:flex-row gap-12 items-center"
    >
      <span className="max-lg:hidden absolute xl:-left-20 lg:left-12 xl:-top-20 lg:-top-40 max-xl:text-[16rem] text-[20rem] font-bold opacity-[0.03] select-none pointer-events-none">
        {index + 1}
      </span>

      <div className="flex-1 space-y-6 z-10">
        <div className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-sm font-mono uppercase tracking-tighter bg-primary/5">
          Phase {index + 1}
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gradient">
          {step.title}
        </h2>
        <h3 className="md:text-lg lg:text-xl xl:text-2xl font-medium text-base-content/60 uppercase tracking-widest opacity-60">
          {step.subtitle}
        </h3>
        <p className="text-lg md:text-xl leading-relaxed text-base-content/80 max-w-xl">
          {step.text}
        </p>

        <div className="flex flex-wrap gap-3 pt-4">
          {step.features.map((feature) => (
            <Button key={feature}>{feature}</Button>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full aspect-square bg-linear-to-br from-primary/10 to-transparent rounded-3xl border border-primary/5 flex items-center justify-center relative group overflow-hidden max-md:max-w-[520px] max-sm:max-w-[400px] max-md:px-6">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[32px_32px]" />
        <div className="relative w-full aspect-square max-w-[520px]">
          <div className="absolute inset-0">
            <DataEvolution step={index} />
          </div>
        </div>
      </div>
    </article>
  );
}
