"use client";
import CountUp from "react-countup";

const stats = [
  {
    num: 4,
    text: "Years of Experience",
  },
  {
    num: 50,
    text: "Projects completed",
  },
  {
    num: 50,
    text: "Code commits",
  },
  {
    num: 5,
    text: "Technologies mastered",
  },
  {
    num: 100,
    text: "Happy clients",
  },
];

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0 ">
        <div className="mx-auto container">
      <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none"> 
        {stats.map((item, index) => {
          return (
            <div
              key={index}
              className="flex-1 flex items-center justify-center gap-4 xl:justify-start"
            >
              <CountUp
                end={item.num}
                duration={5}
                delay={2}
                className="text-4xl xl:text-6xl font-extrabold text-primary-accent"
              />
              <p className={`${item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} text-white/80 leading-snug`}>{item.text}</p>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default Stats;
