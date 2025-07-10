"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ClientOnly from "./ClientOnly";
import FooterColumn from "@/components/FooterColumn";

type Props = {};

function Footer({}: Props) {
  const [country, setCountry] = useState("India");

  const itemData = [
    ["ABOUT", "Newsroom", "Learn about new features", "Letter from our founders", "Careers", "Investors"],
    ["Support", "Help Center", "AirCover", "Cancellation options", "Safety information", "Report a neighborhood concern"],
    ["Community", "Newsroom", "Learn about new features", "Letter from our founders", "Careers", "Investors"],
    ["Hosting","Try hosting","AirCover for Hosts","Explore hosting resources","Safety information","How to host responsibly"],
  ];

  useEffect(() => {
    const lookupKey = process.env.NEXT_PUBLIC_LOOKUP_KEY;
    if (!lookupKey) {
      console.warn('NEXT_PUBLIC_LOOKUP_KEY is not set');
      return;
    }

    fetch(`https://extreme-ip-lookup.com/json/?key=${lookupKey}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch country');
        }
        return res.json();
      })
      .then((data) => setCountry(data.country))
      .catch((error) => {
        console.error('Error fetching country:', error);
        // Keep the default country value
      });
  }, []);

  const footerColumns = itemData.map((item, index) => (
    <FooterColumn key={`footer-column-${index}`} index={index} data={item} />
  ));

  return (
    <ClientOnly>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600">
        {footerColumns}
        <p className="text-sm">{country}</p>
      </div>
    </ClientOnly>
  );
}

export default Footer;
