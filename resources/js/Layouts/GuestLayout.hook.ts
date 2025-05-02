import { useEffect, useState } from "react";

import { pay1, pay2, pay3, pay4 } from "@/images";
import { ListItem } from "@/types/AuthLayout.types";
export function useAuthLayout() {
  const [infographicIndexInView, setInfographicIndexInView] = useState(0);

  const infographics: ListItem[] = [
    {
      id: "1",
      name: "Smart Payments, Smarter Timing",
      description:
        "Automate payments with sunrise and sunset triggers. ClimaPay aligns financial actions with natural cycles for enhanced control.",
      image: pay1,
    },
    {
      id: "2",
      name: "Cross-Bank Efficiency",
      description:
        "Make seamless interbank and intrabank transfers. Our intuitive flow screens are built for real-time execution.",
      image: pay2,
    },
    {
      id: "3",
      name: "Stay Ahead with Weather Intelligence",
      description:
        "Integrated weather updates help inform your payment strategies—ideal for agriculture, logistics, and travel sectors.",
      image: pay3,
    },
    {
      id: "4",
      name: "ClimaPay: Secure. Seamless. Scalable.",
      description:
        "Your trusted payment solution, combining reliability with a beautifully designed interface for the modern era.",
      image: pay4,
    },
  ];

  useEffect(() => {
    const infographicInterval = setInterval(() => {
      setInfographicIndexInView((index) =>
        index === infographics.length - 1 ? 0 : index + 1
      );
    }, 4000);

    return () => {
      clearInterval(infographicInterval);
    };
  }, []);

  return { infographics, infographicIndexInView };
}
