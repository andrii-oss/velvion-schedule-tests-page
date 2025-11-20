export default function ComeBackLater() {
  return (
    <div className="mx-auto max-w-[625px]">
      <h1 className="text-[32px] sm:text-[42px] sm:leading-[52px] text-center mb-4 tracking-[-0.01em] font-medium">
        Thank you for checking your availability
      </h1>
      <p className="text-[16px] sm:text-[18px] sm:leading-[24px] text-center mb-[30px] ">
        We understand. You can come back anytime to see if Velvion is already available in your area.
      </p>
      <div className="max-w-[425px] w-full mx-auto">
        <button
          className="bg-accent-color hover:bg-transparent border-transparent border-2  hover:border-accent-color hover:border w-full hover:text-accent-color text-white py-[14px] cursor-pointer transition-all duration-300 ease-out font-semibold"
          type="submit"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
