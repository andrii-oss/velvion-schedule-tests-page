import FooterTop from "./FooterTop";
import FooterCenter from "./FooterCenter";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className=" w-full bg-dark ">
      <div className="lmobile:max-w-[95vw] w-full mx-auto px-6 py-10 2xl:p-[80px]">
        <FooterTop/>
        <FooterCenter/>
        <FooterBottom/>
      </div>
    </footer>
  );
}
