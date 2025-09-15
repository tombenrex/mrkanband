export default function Title({ text }) {
  return (
    <>
      <h1 className="frijole-regular text-3xl sm:text-4xl md:text-5xl lg:text-8xl text-center text-white mt-5 border-b-2 pb-2">
        {text}
      </h1>
    </>
  );
}
