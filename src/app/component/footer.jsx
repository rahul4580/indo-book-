"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" };
      const formattedTime = now.toLocaleTimeString("en-GB", options);
      setTime(formattedTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-white text-black ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
  <h2 className="text-8xl font-extrabold tracking-widest text-gray-900 uppercase drop-shadow-lg">
  Let’s Connect
</h2>
<p className="text-gray-500 mt-6 text-2xl tracking-wide">
  Feel free to reach out anytime!
</p>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        // className="flex flex-col  space-y-2"
      >
        <p className="text-5xl mt-[30vh] font-extrabold hover:text-gray-300 transition-colors duration-300 text-right pr-[5vw]">
  +91 8882410076
</p>
<p className="text-4xl -mt-1 font-extrabold hover:text-gray-300 transition-colors duration-300 text-right pr-[5vw]">
  kumararahul795@gmail.com
</p>

<br/>
<br/>
<br/>
<br/>
        <p className="text-gray-400">📍 New Delhi, India, Asia</p>
        <p className="text-gray-500">🕓 {time} (GMT+3)</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="flex space-x-6 mt-4"
      >
        <a
          href="https://www.instagram.com/ray_.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:scale-110 transition-transform duration-300 "
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/ray-b45153359/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:scale-110 transition-transform duration-300"
        >
          <FaLinkedin />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-gray-600 text-sm mt-6"
        style={{ width: "90vw", marginLeft: "75vw" }}
      >
        © {new Date().getFullYear()} Rahul Kumar. All rights reserved.
      </motion.div>
    </footer>
  );
}


