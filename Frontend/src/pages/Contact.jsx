import { Subscribe } from "../components/Subscribe"
import { Wrapper } from "../components/Wrapper"

export const Contact = () => {
    return (
        <Wrapper>
            <div className="px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <h1 className="text-gray-700 text-2xl sm:text-3xl text-center py-8 sm:py-12">
                    CONTACT <span className="text-black">US _____</span>
                </h1>

                {/* Content */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center">
                    {/* Image */}
                    <div className="w-full md:w-[40%] flex justify-center">
                        <img
                            className="w-full max-w-sm md:max-w-full object-contain"
                            src="https://forverecommerceclothing.vercel.app/assets/contact_img-CyOum2vk.png"
                            alt="Contact"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col justify-center gap-6 text-sm sm:text-base text-center md:text-left">
                        <h1 className="text-xl sm:text-2xl text-gray-800 font-bold">
                            Our Store
                        </h1>
                        <p>
                            Noida Sector 126 <br />
                            Uttar Pradesh, 22301
                        </p>
                        <p>
                            Tel: 0000000000 <br />
                            Email: contact@kina'sstore.com
                        </p>

                        <h1 className="text-xl sm:text-2xl text-gray-800 font-bold">
                            Careers at Kina's Store
                        </h1>
                        <p>Learn more about our teams and job openings.</p>

                        <button className="border border-black px-4 py-2 w-fit mx-auto md:mx-0 hover:bg-black hover:text-white transition">
                            Explore Jobs
                        </button>
                    </div>
                </div>

                {/* Subscribe */}
                <div className="pt-16 sm:pt-20">
                    <Subscribe />
                </div>
            </div>
        </Wrapper>
    )
}
