import FooterTop from "./FooterTop";
import FooterCenter from "./FooterCenter";

export default function Footer() {
  return (
    <footer className=" w-full bg-dark ">
      <div className="lmobile:max-w-[95vw] w-full mx-auto px-6 py-10 2xl:p-[80px]">
        <FooterTop />
        <FooterCenter />
        <p className="text-center sm:text-left text-sm text-white pt-8 sm:pt-14">
          © {new Date().getFullYear()} Velvion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
