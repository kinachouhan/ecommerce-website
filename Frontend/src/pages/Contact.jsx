import { Subscribe } from "../components/Subscribe"
import { Wrapper } from "../components/Wrapper"

export const Contact =()=>{
     return(
       <Wrapper>
          <div>
            <div>
                <h1 className="text-gray-700 text-3xl text-center p-12 ">CONTACT <span className="text-black">US _____</span></h1>
                <div className="flex gap-12 justify-center items-center">
                    <div className="w-[40%]">
                        <img src="https://forverecommerceclothing.vercel.app/assets/contact_img-CyOum2vk.png"/>
                    </div>
                    <div className="flex flex-col justify-center gap-8" >
                        <h1 className="text-2xl text-gray-800 font-bold ">Our Store</h1>
                        <p>Noida Sector 126 <br/> Uttar Pradesh , 22301</p>
                        <p>Tel: 0000000000 <br/> Email: contact@kina'sstore.com</p>
                        <h1 className="text-2xl text-gray-800 font-bold ">Careers at Kina's Store</h1>
                        <p>Learn more about out teams and job openings.</p>
                        <button className="border border-black p-2 hover:bg-black hover:text-white cursor-pointer">Explore Jobs</button>
                    </div>
                </div>
                <div className="pt-20">
                    <Subscribe/>
                </div>
            </div>
        </div>
       </Wrapper>
     )
}