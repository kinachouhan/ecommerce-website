import { Subscribe } from "../components/Subscribe"
import { Wrapper } from "../components/Wrapper"

export const About = () => {
    return (
        <Wrapper>
            <div className="px-4 sm:px-6 lg:px-8">
                {/* About Header */}
                <h1 className="text-gray-700 text-2xl sm:text-3xl text-center py-8 sm:py-12">
                    About <span className="text-black">US ______</span>
                </h1>

                {/* About Content */}
                <div className="flex flex-col md:flex-row w-full gap-8">
                    {/* Image */}
                    <div className="w-full md:w-[40%] flex justify-center">
                        <img
                            className="w-full max-w-sm md:max-w-full object-contain"
                            src="https://forverecommerceclothing.vercel.app/assets/about_img-BAJyTXw9.png"
                            alt="About"
                        />
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6 text-sm sm:text-base">
                        <p>
                            Kina's Store was born out of a passion for innovation and a desire to revolutionize the way people experience quality, trust, and value. From the very beginning, our mission has been to create products that blend cutting-edge technology with thoughtful design, delivering solutions that stand the test of time.
                        </p>
                        <p>
                            Since our inception, we've worked tirelessly to curate a diverse selection of products that meet the highest standards of quality and reliability. Every item we offer is carefully chosen to ensure it delivers exceptional performance and lasting value.
                        </p>
                        <h1 className="font-bold text-base sm:text-lg">Our Mission</h1>
                        <p>
                            Our mission at Forever is to empower customers with choice, convenience, and confidence in every decision they make. By putting our customers at the center of everything we do, we aim to build lasting relationships based on trust and satisfaction.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="py-12">
                    <h1 className="text-2xl sm:text-3xl text-gray-700 py-8">
                        WHY <span className="text-black">CHOOSE US ______</span>
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="border border-black/20 p-6 sm:p-8 rounded-sm">
                            <h1 className="font-bold py-3">Quality Assurance:</h1>
                            <p className="text-gray-700 text-sm sm:text-base">
                                We meticulously select and vet each product to ensure it meets our stringent standards for quality, performance, and durability.
                            </p>
                        </div>

                        <div className="border border-black/20 p-6 sm:p-8 rounded-sm">
                            <h1 className="font-bold py-3">Convenience:</h1>
                            <p className="text-gray-700 text-sm sm:text-base">
                                With our user-friendly interface and hassle-free ordering process, shopping becomes a seamless and enjoyable experience.
                            </p>
                        </div>

                        <div className="border border-black/20 p-6 sm:p-8 rounded-sm">
                            <h1 className="font-bold py-3">Exceptional Customer Service:</h1>
                            <p className="text-gray-700 text-sm sm:text-base">
                                Our team of dedicated professionals is here to assist you every step of the way.
                            </p>
                        </div>
                    </div>
                </div>

                <Subscribe />
            </div>
        </Wrapper>
    )
}
