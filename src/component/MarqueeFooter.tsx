import { useEffect, useRef } from "react";
import Image from "next/image";


interface TeamMember{
  name: string;
  role: string;
  image: string;
}

const MarqueeFooter: React.FC = () => {
  const marqueeRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const marqueeElementDisplayed = getComputedStyle(root).getPropertyValue(
      "--marquee-elements-footer-displayed"
    );

    if (marqueeRef.current) {
      root.style.setProperty(
        "--marquee-footer-elements",
        String(marqueeRef.current.children.length)
      );

      const numbersElementToClone = Number(marqueeElementDisplayed);
      const originalChildren = Array.from(marqueeRef.current.children).slice(
        0,
        numbersElementToClone
      );

      originalChildren.forEach((child) => {
        if(marqueeRef.current){
          const clone = child.cloneNode(true);
        marqueeRef.current.appendChild(clone);
        }
      });
    }

    return () => {
      if (marqueeRef.current) {
        const totalElements = marqueeRef.current.children.length;
        const originalElement = Number(marqueeElementDisplayed);

        for (let i = 0; i >= originalElement; i++) {
          marqueeRef.current.children[i].remove();
        }
        root.style.removeProperty("--marquee-footer-elements");
      }
    };
  }, []);

  const teamMembers = [
    {
      name: "Abby",
      role: "CEO",
      image: "/Abby.svg",
    },
    {
      name: "Riki",
      role: "CTO",
      image: "/Riki.svg",
    },
    {
      name: "Andre",
      role: "CMO",
      image: "/Andre.svg",
    },
    {
      name: "Irfan",
      role: "Designer",
      image: "/Irfan.svg",
    },
  ];

  return (
    <ul ref={marqueeRef} className="marquee-footer-content">
      {teamMembers.map((member, index) => (
        <li key={index}>
          <div className="flex flex-col flex-start rounded-[1.25rem] h-[19.75rem] w-[17.5rem] p-6 card">
            <div className="flex flex-col items-center justify-center">
              <Image
                className="mb-5"
                src={member.image}
                alt={member.name}
                width={80}
                height={80}
              />
              <h4 className="flex text-center font-manropeRegular font-semibold text-lg">
                {member.name}
              </h4>
              <p className="text-base font-normal text-blue-500 mb-2">
                {member.role}
              </p>
              <p className="font-manropeRegular text-base text-center">
                Former co-founder of Opendoor. Early staff at Spotify and
                Clearbit.
              </p>
              <div className="flex mt-4 gap-4">
                <Image
                  src="/linkedin-icon.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
                <Image
                  src="/twitter-icon.svg"
                  alt="twitter"
                  width={20}
                  height={20}
                />
                <Image src="/web-icon.svg" alt="web" width={20} height={20} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MarqueeFooter;