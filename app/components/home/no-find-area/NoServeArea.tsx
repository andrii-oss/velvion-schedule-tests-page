export default function NoServeArea() {
  return (
    <div className="mx-auto max-w-[528px]">
      <h1 className="text-[32px] sm:text-[42px] sm:leading-[46px] text-center mb-4 tracking-[-0.01em] font-medium">
        We don’t serve your area yet
      </h1>
      <p className="text-[16px] sm:text-[18px] sm:leading-[24px] text-center mb-[30px] ">
        Your CEP (zip code) is outside our current coverage. <br /> Would you
        like to join our waiting list?
      </p>
      <div className="max-w-[425px] w-full mx-auto flex gap-4">
        <button
          className="bg-transparent hover:bg-accent-color border-accent-color  border-2 hover:border-transparent hover:border w-full hover:text-white text-accent-color py-[14px] cursor-pointer transition-all duration-300 ease-out font-semibold"
          type="submit"
        >
          Go Back
        </button>
        <button
          className="bg-accent-color hover:bg-transparent border-transparent border-2  hover:border-accent-color hover:border w-full hover:text-accent-color text-white py-[14px] cursor-pointer transition-all duration-300 ease-out font-semibold"
          type="submit"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
