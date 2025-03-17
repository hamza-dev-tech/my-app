"use client";
import CountUp from "react-countup";

const stats = [
  { num: 4, text: "Years of Experience" },
  { num: 5, text: "Technologies mastered" },
  { num: 34, text: "Projects completed" },
  { num: 85, text: "Happy clients" },
  { num: 450, text: "Code commits" },
];

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="mx-auto container px-4">
        <div className="grid grid-cols-2 gap-6 max-w-[90vw] mx-auto text-center sm:grid-cols-3 xl:flex xl:flex-wrap xl:justify-start xl:text-left">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center xl:flex-row xl:items-center xl:justify-start gap-2"
            >
              <CountUp
                end={item.num}
                duration={5}
                delay={2}
                className="text-3xl sm:text-4xl xl:text-6xl font-extrabold text-primary-accent"
              />
              <p className="text-white/80 text-sm sm:text-base leading-snug max-w-[120px] sm:max-w-[150px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
