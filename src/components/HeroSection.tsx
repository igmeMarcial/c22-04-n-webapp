"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="min-h-[80vh] w-full bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-600 font-medium"
          >
            Label goes here
          </motion.span>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900"
          >
            Lorem Ipsum simply
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-600 max-w-xl"
          >
            Welcome to Burger Bliss, where we take your cravings to a whole new
            level! Our mouthwatering burgers are made from 100% beef and are
            served on freshly baked buns.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button size="lg" className="rounded-full">
              Explore
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] lg:h-[500px] bg-slate-200 rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-white/20" />
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-24 h-24 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
