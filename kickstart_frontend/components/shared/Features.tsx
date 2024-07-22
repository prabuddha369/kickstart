import { features } from '@/constants';
import React from 'react'
import { FaCircle } from 'react-icons/fa';

const Features = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center  mt-32 p-16">
    <ul className="timeline timeline-vertical h-screen">
      {features.map((feature, index) => {
        
        if (index % 2 === 0) {
          return (
            <li key={index}>
                <hr className=" bg-gradient-to-r from-[#5611E7] to-[#BB0EE6] " />
              <div
                className={`timeline-start timeline-box bg-[${feature.color}] border-none`}
              >
                {feature.title}
              </div>
              <div className="timeline-middle">
                <FaCircle className="text-[#5611E7]" />
              </div>
              <hr className=" bg-gradient-to-r from-[#5611E7] to-[#BB0EE6] " />
            </li>
          );
        } else {
          return (
            <li key={index}>
                <hr className=" bg-gradient-to-r from-[#5611E7] to-[#BB0EE6] " />
                
              <div className="timeline-middle">
                <FaCircle className="text-[#5611E7]" />
              </div>
              <div
                className={`timeline-end timeline-box bg-[${feature.color}] border-none `}
              >
                {feature.title}
              </div>
              <hr className=" bg-gradient-to-r from-[#5611E7] to-[#BB0EE6] " />
            </li>
          );
        }
      })}
    </ul>
    </div>
  )
}

export default Features