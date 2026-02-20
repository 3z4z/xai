export default function SectionTitle({ title, subText }) {
  return (
    <header className="pt-20 pb-16 flex flex-col items-center justify-center text-center z-10">
      <h2 className="text-5xl text-gradient font-bold mb-3">{title}</h2>
      <p>{subText}</p>
    </header>
  );
}
