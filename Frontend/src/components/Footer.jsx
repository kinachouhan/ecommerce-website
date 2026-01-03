import { TbHexagonLetterKFilled } from "react-icons/tb";
import { Wrapper } from "./Wrapper";


export const Footer = () => {
    return (
        <Wrapper>
            <div>
                <div className="flex justify-between py-12 ">
                    <div className="w-[40%]">
                        <h1 className="flex items-center text-3xl font-semibold py-5"><TbHexagonLetterKFilled /> <span>Kina's Store</span></h1>
                        <p className="text-sm">Welcome to our e-commerce store, your one-stop destination for the latest fashion trend and high-quality products. We are committed to providing you with an expectional shopping experience, offering a wide range of items to suit your style and needs.</p>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold py-5">COMPANY</h1>
                        <ul className="text-sm flex gap-2 flex-col">
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Delivery</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold py-5">GET IN TOUCH</h1>
                        <p className="py-2">+91 9755997066</p>
                        <p>contact@kina'sstore.com</p>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-black/20">

                </div>
                <div className="py-8 flex items-center font-semibold justify-center">
                    <p>Copyright@kina'sstore.com - All Rights Reserved</p>
                </div>
            </div>
        </Wrapper>
    )
}