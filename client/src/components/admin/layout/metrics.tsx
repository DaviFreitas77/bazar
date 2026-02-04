import CountUp from "@/components/styles/countUp";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/ui/border-beam";
import ShinyText from "@/components/styles/shineText";

interface MetricItem {
  title: string;
  titleStyle?: string;
  value: number;
  valueStyle?: string;
  footer?: ReactNode;
  footerColor?: string;
  prefix?: string;
  styleCard?: string;
}

interface MetricsProps {
  items: MetricItem[];
}

export function Metrics({ items }: MetricsProps) {
  return (
    <section className="w-full py-4">
      <div className="relative  w-full overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sha">
        {items.map((item, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "anticipate",
            }}
            key={index}
            className={`relative overflow-hidden flex flex-col gap-4 px-4 border border-gray-200 rounded-lg bg-primary-200 h-40 justify-center ${item.styleCard ?? ""}`}
          >
            <BorderBeam size={50} duration={10} colorFrom="#cccc" colorTo="#ccc" delay={3} />

            <ShinyText text={`${item.title}`} speed={2} delay={3} color="#000" shineColor="#ffffff" spread={120} direction="left" yoyo={false} pauseOnHover={false} disabled={false} />

            <span className={`${item.valueStyle ?? "text-gray-700 font-semibold text-3xl"}`}>
              {item.prefix ? <CountUp from={0} to={item.value} separator="," direction="up" duration={1} className="count-up-text" prefix={item.prefix} /> : <CountUp from={0} to={item.value} separator="," direction="up" duration={1} className="count-up-text" />}
            </span>

            <span className={`text-sm ${item.footerColor ?? "text-gray-500"} min-h-4`}>{item.footer ?? ""}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
