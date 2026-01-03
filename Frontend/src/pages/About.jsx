import { Subscribe } from "../components/Subscribe"
import { Wrapper } from "../components/Wrapper"

export const About = () => {
    return (
        <Wrapper>
            <div>
                <div>
                    <h1 className="text-gray-700 text-3xl text-center p-12 ">About <span className="text-black">US ______</span></h1>
                    <div className="flex w-full gap-8">
                        <div className="w-[40%]">
                            <img src="https://forverecommerceclothing.vercel.app/assets/about_img-BAJyTXw9.png" />
                        </div>
                        <div className="w-1/2 flex flex-col gap-8">
                            <p>
                                Kina's Store was born out of a passion for innovation and a desire to revolutionize the way people experience quality, trust, and value. From the very beginning, our mission has been to create products that blend cutting-edge technology with thoughtful design, delivering solutions that stand the test of time. We believe in pushing boundaries, embracing change, and building a future where excellence is not an option—but a standard.
                            </p>
                            <p>
                                Since our inception, we've worked tirelessly to curate a diverse selection of products that meet the highest standards of quality and reliability. Every item we offer is carefully chosen to ensure it delivers exceptional performance, lasting value, and a seamless experience for our customers. Our commitment to excellence drives us to continuously evolve, adapt, and exceed expectations in everything we do.
                            </p>
                            <h1 className="font-bold">Our Mission</h1>
                            <p>
                                Our mission at Forever is to empower customers with choice, convenience, and confidence in every decision they make. We strive to create a seamless experience by offering high-quality products, transparent processes, and reliable service. By putting our customers at the center of everything we do, we aim to build lasting relationships based on trust and satisfaction.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="py-12">
                    <h1 className="text-3xl text-gray-700 py-8">WHY <span className="text-black">CHOOSE US ______</span></h1>
                    <div className="flex gap-4  ">
                        <div className="border border-black/20 p-12 rounded-sm">
                            <h1 className="font-bold py-5">Quality Assurance:</h1>
                            <p className="text-gray-700">We meticulously select and vet each product to ensure it meets our stringent standards for quality, performance, and durability.</p>
                        </div>
                        <div className="border border-black/20 p-12 rounded-sm">
                            <h1 className="font-bold py-5">Convenience:</h1>
                            <p className="text-gray-700">With our user-friendly interface and hassle-free ordering process, shopping becomes a seamless and enjoyable experience.</p>
                        </div>
                        <div className="border border-black/20 p-12 rounded-sm">
                            <h1 className="font-bold py-5">Exceptional Customer Service:</h1>
                            <p className="text-gray-700">Our team of dedicated professionals is here to assist you every step of the way, ensuring your questions are answered and your concerns are resolved promptly.</p>
                        </div>
                    </div>
                </div>
                <Subscribe/>
            </div>
        </Wrapper>
    )
}