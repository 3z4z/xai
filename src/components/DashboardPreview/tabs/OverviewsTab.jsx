import { data, stats } from "@/utils/mockData";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function OverviewTab() {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-6 max-md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h-[320px] w-full lg:px-6 px-3 pt-8 pb-12 rounded-2xl bg-base-200 border border-primary/14 group cursor-pointer"
          >
            <h4 className="mb-4 font-medium opacity-75 group-hover:text-primary transition-all">
              Data Ingestion Flow
            </h4>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(70% 0.22 240)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(70% 0.22 240)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#ffffff16"
                />
                <XAxis
                  dataKey="name"
                  stroke="#789"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#789" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="oklch(70% 0.22 240)"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                  isAnimationActive={isInView}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-[320px] w-full lg:px-6 px-3 pt-8 pb-12 rounded-2xl bg-base-200 border border-secondary/14 group cursor-pointer"
          >
            <h4 className="mb-4 font-medium opacity-75 group-hover:text-secondary transition-all">
              Processing Efficiency
            </h4>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#ffffff16"
                />
                <XAxis dataKey="name" stroke="#789" fontSize={12} />
                <YAxis stroke="#789" fontSize={12} />
                <Tooltip
                  cursor={{ fill: "#ffffff05" }}
                  contentStyle={{ backgroundColor: "#111", border: "none" }}
                />
                <Bar
                  dataKey="pv"
                  fill="oklch(55% 0.23 300)"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={isInView}
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="p-6 rounded-2xl transition-all border border-primary/17 hover:border-primary/30 even:border-secondary/17 hover:even:border-secondary/30 shadow-none hover:shadow-xl shadow-primary/15 even:shadow-secondary/15 cursor-pointer group flex flex-col"
            >
              <p className="text-sm group-hover:text-primary group-even:group-hover:text-secondary transition-all opacity-60 group-hover:opacity-80">
                {stat.label}
              </p>

              <div className="flex items-end gap-2 mt-2">
                <h3 className="text-2xl font-bold opacity-80 group-hover:opacity-100">
                  {stat.value}
                </h3>
                <span className="text-xs text-success mb-1">{stat.change}</span>
              </div>

              <div className="flex-1 flex justify-end items-end">
                <p className="border border-primary/25 bg-primary/8 group-even:border-secondary/25 group-even:bg-secondary/8 p-2 rounded-xl size-11 flex items-center justify-center">
                  <stat.icon className="text-primary group-even:text-secondary" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="overflow-x-auto rounded-2xl border border-primary/15 bg-base-100"
      >
        <table className="table">
          <thead className="bg-primary/10">
            <tr>
              <th className="p-4 w-1/4">Source</th>
              <th className="p-4 w-1/4">Status</th>
              <th className="p-4 w-1/4">Confidence</th>
              <th className="p-4 w-1/4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="hover:bg-primary/5 transition-colors">
                <td className="p-4 font-mono text-sm">
                  AWS_S3_BUCKET_0{index + 1}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                    ACTIVE
                  </span>
                </td>
                <td className="p-4">{(95 + index).toFixed(1)}%</td>
                <td className="p-4 text-gray-500 text-sm">2 mins ago</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
