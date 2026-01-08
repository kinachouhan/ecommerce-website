import { TbHexagonLetterKFilled } from "react-icons/tb";
import { Wrapper } from "./Wrapper";

export const Footer = () => {
    return (
        <Wrapper>
            <div className="px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row md:justify-between py-12 gap-8">
                    {/* About Section */}
                    <div className="md:w-[40%]">
                        <h1 className="flex items-center text-2xl sm:text-3xl font-semibold py-5 gap-2">
                            <TbHexagonLetterKFilled /> <span>Kina's Store</span>
                        </h1>
                        <p className="text-sm sm:text-base">
                            Welcome to our e-commerce store, your one-stop destination for the latest fashion trend and high-quality products. We are committed to providing you with an exceptional shopping experience, offering a wide range of items to suit your style and needs.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold py-5">COMPANY</h1>
                        <ul className="text-sm sm:text-base flex flex-col gap-2">
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold py-5">GET IN TOUCH</h1>
                        <p className="py-1 sm:py-2 text-sm sm:text-base">+91 9755997066</p>
                        <p className="text-sm sm:text-base">contact@kina'sstore.com</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-black/20"></div>

                {/* Copyright */}
                <div className="py-8 flex items-center justify-center font-semibold text-sm sm:text-base">
                    <p>Copyright @kina'sstore.com - All Rights Reserved</p>
                </div>
            </div>
        </Wrapper>
    )
}
