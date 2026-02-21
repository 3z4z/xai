export default function SectionTitle({ title, subText, className }) {
  return (
    <header
      className={`${className} lg:pt-20 pt-16 lg:pb-16 pb-12 flex flex-col items-center justify-center text-center z-10`}
    >
      <h2 className="lg:text-5xl md:text-4xl text-3xl text-gradient font-bold mb-3">
        {title}
      </h2>
      <p className="max-sm:text-sm opacity-80">{subText}</p>
    </header>
  );
}
