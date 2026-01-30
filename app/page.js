import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-white flex flex-col gap-4 justify-center items-center h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold md:text-5xl flex gap-2 items-center justify-center text-3xl">
          Buy Me A Chai{" "}
          <span>
            <Image className="invertImg" src="/tea.gif" width={88} height={3} alt="buy me a chai" unoptimized={true}/>
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creators.
        </p>
        <p className="text-center md:text-left">A place where your fans can buy you a chai. Unleash the power of your community and get your projects funded.</p>
        <div className="gap-2 flex">
          <Link href={"/login"}>
          <button
            type="button"
            className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5"
          >
            Start Here
          </button>
          </Link>
          <Link href={"/about"}>
          <button
            type="button"
            className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5"
          >
            Read More
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">
          Your fans can buy you a chai.
        </h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-slate-400 rounded-full p-2"
              src="/man.gif"
              width={88}
              height={12}
              unoptimized={true}
              alt=""
            />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">
              Your fans are available to support you.
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-slate-400 rounded-full p-2"
              src="/coin.gif"
              width={88}
              height={12}
              unoptimized={true}
              alt=""
            />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">
              Your fans are willing to contribute financially.
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image
              className="bg-slate-400 rounded-full p-2"
              src="/group.gif"
              width={88}
              height={12}
              unoptimized={true}
              alt=""
            />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className="text-center">
              Your fans are ready to collaborate with you.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14 px-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">
          Learn more about us.
        </h2>
        {/* Responsive youtube embed */}
        <iframe className="w-full max-w-3xl aspect-video"
         src="https://www.youtube.com/embed/Tb1CLQuJOsE?si=gonR35k2EdL-bjhD" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
