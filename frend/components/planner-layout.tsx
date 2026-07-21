"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Navigation,
  Globe,
  Map,
  Compass,
  Car,
  Bus,
  Train,
  Plane,
  Building2,
  Palmtree,
  Tent,
  CheckCircle,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Bed,
  Home,
  Layers,
  Sun
} from "lucide-react";
import DestinationSearch, { Destination, popularDestinations } from "./destination-search";
import BudgetSlider from "./budget-slider";
import TripTypeCards from "./trip-type-cards";
import MapComponent from "./map";

// Premium localized mock spots database supporting interactive modifications
const initialSpotsData: Record<string, ActivitySpot[]> = {
  "Kyoto, Japan": [
    {
      name: "The Thousand Kyoto",
      lat: 34.9875,
      lng: 135.7611,
      category: "hotel",
      rating: 4.8,
      description: "Zen-modern luxury retreat with sustainable architectural details.",
      photo: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80",
      openingHours: "24/7 Check-in",
      entryFee: "$250/night",
      bestTime: "All Year",
      visitTime: "Overnight",
      distance: "0.2 km",
    },
    {
      name: "Gion Minami House",
      lat: 35.0021,
      lng: 135.7729,
      category: "hotel",
      rating: 4.4,
      description: "Cozy budget apartments in Kyoto's traditional Geisha district.",
      photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      openingHours: "10:00 AM - 6:00 PM",
      entryFee: "$80/night",
      bestTime: "Spring",
      visitTime: "Overnight",
      distance: "0.4 km",
    },
    {
      name: "Ritz-Carlton Kyoto",
      lat: 35.0125,
      lng: 135.7725,
      category: "hotel",
      rating: 4.9,
      description: "Elite riverfront resort offering exceptional Japanese hospitality and luxury.",
      photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
      openingHours: "24/7 Check-in",
      entryFee: "$650/night",
      bestTime: "Autumn",
      visitTime: "Overnight",
      distance: "1.1 km",
    },
    {
      name: "Kinkaku-ji (Golden Pavilion)",
      lat: 35.0394,
      lng: 135.7292,
      category: "museum",
      rating: 4.9,
      description: "Zen temple covered in gold leaf overlooking mirror pond.",
      photo: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
      openingHours: "9:00 AM - 5:00 PM",
      entryFee: "¥500",
      bestTime: "Morning",
      visitTime: "1.5 hours",
      distance: "6.2 km",
    },
    {
      name: "Nishiki Market Street",
      lat: 35.005,
      lng: 135.7649,
      category: "restaurant",
      rating: 4.6,
      description: "Five blocks of shopping packed with local seafood and street skewers.",
      photo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80",
      openingHours: "10:00 AM - 6:00 PM",
      entryFee: "Free entry",
      bestTime: "12:00 PM",
      visitTime: "2 hours",
      distance: "0.8 km",
    },
    {
      name: "Kiyomizu-dera Temple",
      lat: 34.9949,
      lng: 135.785,
      category: "nature",
      rating: 4.9,
      description: "Scenic wooden temple set against lush green hillsides.",
      photo: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=400&q=80",
      openingHours: "6:00 AM - 6:00 PM",
      entryFee: "¥400",
      bestTime: "Sunset",
      visitTime: "2 hours",
      distance: "2.1 km",
    },
  ],
  "Tokyo, Japan": [
    {
      name: "Andaz Tokyo Toranomon Hills",
      lat: 35.6669,
      lng: 139.7486,
      category: "hotel",
      rating: 4.9,
      description: "Premium skyscraper luxury hotel with spectacular skyline views.",
      photo: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80",
      openingHours: "24/7",
      entryFee: "$580/night",
      bestTime: "All Year",
      visitTime: "Overnight",
      distance: "Center",
    },
    {
      name: "Asakusa Capsule Inn",
      lat: 35.7118,
      lng: 139.7915,
      category: "hotel",
      rating: 4.2,
      description: "Sleek capsule design for budget-focused solo travelers.",
      photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      openingHours: "24/7",
      entryFee: "$45/night",
      bestTime: "Summer",
      visitTime: "Overnight",
      distance: "5.1 km",
    },
    {
      name: "Senso-ji Temple",
      lat: 35.7148,
      lng: 139.7967,
      category: "museum",
      rating: 4.8,
      description: "Tokyo's oldest and most iconic ancient temple complex.",
      photo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80",
      openingHours: "6:00 AM - 5:00 PM",
      entryFee: "Free",
      bestTime: "Morning",
      visitTime: "1.5 hours",
      distance: "5.4 km",
    },
    {
      name: "Rokurinsha Ramen",
      lat: 35.6813,
      lng: 139.7678,
      category: "restaurant",
      rating: 4.7,
      description: "Famous dipping noodles in the heart of Tokyo Station.",
      photo: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80",
      openingHours: "7:30 AM - 10:30 PM",
      entryFee: "¥1,300 Avg",
      bestTime: "Lunch",
      visitTime: "45 mins",
      distance: "Inside Station",
    },
  ],
};

export interface ActivitySpot {
  name: string;
  lat: number;
  lng: number;
  category: "hotel" | "restaurant" | "museum" | "attraction" | "nature" | "nightlife" | "hidden";
  rating: number;
  openingHours: string;
  entryFee: string;
  bestTime: string;
  description: string;
  photo: string;
  visitTime: string;
  distance: string;
}

export default function PlannerLayout() {
  const [isMobile, setIsMobile] = useState(false);

  // Responsive design listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Form State
  const [destination, setDestination] = useState<Destination>(popularDestinations[0]);
  const [startDate, setStartDate] = useState("2026-10-15");
  const [endDate, setEndDate] = useState("2026-10-22");
  
  // Travelers Stepper States
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelerDetails, setTravelerDetails] = useState({ adults: 2, children: 0, infants: 0 });

  const handleIncrementTraveler = (type: "adults" | "children" | "infants") => {
    setTravelerDetails((prev) => {
      const copy = { ...prev };
      if (type === "adults") copy.adults = Math.min(15, copy.adults + 1);
      if (type === "children") copy.children = Math.min(10, copy.children + 1);
      if (type === "infants") copy.infants = Math.min(5, copy.infants + 1);
      
      const tot = copy.adults + copy.children + copy.infants;
      setTravelersCount(tot);
      return copy;
    });
  };

  const handleDecrementTraveler = (type: "adults" | "children" | "infants") => {
    setTravelerDetails((prev) => {
      const copy = { ...prev };
      if (type === "adults") copy.adults = Math.max(1, copy.adults - 1);
      if (type === "children") copy.children = Math.max(0, copy.children - 1);
      if (type === "infants") copy.infants = Math.max(0, copy.infants - 1);

      const tot = copy.adults + copy.children + copy.infants;
      setTravelersCount(tot);
      return copy;
    });
  };

  const [budget, setBudget] = useState(3500);
  const [interests, setInterests] = useState<string[]>(["adventure", "cultural"]);
  const [duration, setDuration] = useState("7 Days");
  const [transport, setTransport] = useState<"walking" | "driving" | "flight" | "train" | "bus">("driving");
  const [accommodation, setAccommodation] = useState("Hotel");

  // Compact Filter Chips States
  const [activeChips, setActiveChips] = useState<string[]>([
    "Budget Friendly",
    "Hidden Gems"
  ]);

  const allChips = [
    "Budget Friendly",
    "Luxury",
    "Hidden Gems",
    "Avoid Crowds",
    "Nightlife",
    "Family Friendly",
    "Nature",
    "Food",
    "Photography",
    "Adventure",
    "Culture",
    "Shopping"
  ];

  const toggleChip = (chip: string) => {
    if (activeChips.includes(chip)) {
      setActiveChips(activeChips.filter(c => c !== chip));
    } else {
      setActiveChips([...activeChips, chip]);
    }
  };

  // Map Filter Overlay States
  const [showAttractions, setShowAttractions] = useState(true);
  const [showHotels, setShowHotels] = useState(true);
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showRoute, setShowRoute] = useState(true);
  const [mapStyle, setMapStyle] = useState<"dark" | "satellite">("dark");
  const [resetTrigger, setResetTrigger] = useState(0);

  // Generated Itinerary States
  const [loading, setLoading] = useState(false);
  const [spots, setSpots] = useState<ActivitySpot[]>([]);
  const [timelinePlan, setTimelinePlan] = useState<ActivitySpot[]>([]);

  // Mobile View Toggles
  const [mobileMapOpen, setMobileMapOpen] = useState(false);

  // Month navigation: default to October 2026 (index 9)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = October

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const parseDate = (dStr: string) => {
    if (!dStr) return null;
    const parts = dStr.split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  };

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (!start || (start && end)) {
      setStartDate(formatDate(clickedDate));
      setEndDate("");
    } else if (clickedDate < start) {
      setStartDate(formatDate(clickedDate));
    } else {
      setEndDate(formatDate(clickedDate));
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calculateDaysCount = () => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);
    if (start && end) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 1;
  };

  const getDayClass = (day: number) => {
    const dateObj = new Date(currentYear, currentMonth, day);
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (start && dateObj.getTime() === start.getTime()) {
      return "bg-yellow-400 text-slate-950 font-bold rounded-full relative z-10 shadow-md shadow-yellow-400/20";
    }
    if (end && dateObj.getTime() === end.getTime()) {
      return "bg-yellow-400 text-slate-950 font-bold rounded-full relative z-10 shadow-md shadow-yellow-400/20";
    }
    if (start && end && dateObj > start && dateObj < end) {
      return "bg-yellow-400/10 text-yellow-400 rounded-none hover:bg-yellow-400/20";
    }
    return "text-slate-400 hover:bg-slate-900/50 hover:text-slate-100 rounded-full";
  };

  // Sync Initial Destination Center Coordinates
  useEffect(() => {
    const mainSpot: ActivitySpot = {
      name: destination.name,
      lat: destination.lat,
      lng: destination.lng,
      category: "hidden",
      rating: 5.0,
      description: `Target center. Advisory: ${destination.advisory}`,
      photo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80",
      openingHours: "24/7",
      entryFee: "N/A",
      bestTime: "Anytime",
      visitTime: "Full visit",
      distance: "0 km"
    };

    const filteredRecommendations = getInteractiveFilteredSpots();
    setSpots([mainSpot, ...filteredRecommendations]);
    setTimelinePlan([]);
  }, [destination, budget, interests]);

  const getInteractiveFilteredSpots = (): ActivitySpot[] => {
    const list = initialSpotsData[destination.name] || [
      {
        name: `${destination.name} Palace`,
        lat: destination.lat + 0.003,
        lng: destination.lng - 0.002,
        category: "attraction",
        rating: 4.8,
        description: "Historic cultural building.",
        photo: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=400&q=80",
        openingHours: "9 AM - 5 PM",
        entryFee: "Free",
        bestTime: "Morning",
        visitTime: "2h",
        distance: "0.6 km",
      },
      {
        name: `Cozy Local Cafe`,
        lat: destination.lat - 0.002,
        lng: destination.lng + 0.003,
        category: "restaurant",
        rating: 4.6,
        description: "Fabulous local delicacies and tea.",
        photo: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=80",
        openingHours: "8 AM - 8 PM",
        entryFee: "$15 Avg",
        bestTime: "Afternoon",
        visitTime: "1h",
        distance: "0.4 km",
      }
    ];

    const budgetFiltered = list.map(spot => {
      if (spot.category === "hotel") {
        if (budget < 1500) {
          return {
            ...spot,
            name: `${destination.name.split(",")[0]} Backpacker Inn`,
            entryFee: "$35/night",
            description: "Highly rated budget hostel lodging.",
            rating: 4.3
          };
        } else if (budget > 7500) {
          return {
            ...spot,
            name: `Aman ${destination.name.split(",")[0]}`,
            entryFee: "$950/night",
            description: "World-class luxury sanctuary.",
            rating: 5.0
          };
        }
      }
      return spot;
    });

    let filtered = budgetFiltered;
    if (interests.includes("adventure")) {
      filtered = [
        ...filtered,
        {
          name: `${destination.name.split(",")[0]} Outdoor Trails`,
          lat: destination.lat - 0.006,
          lng: destination.lng + 0.005,
          category: "nature",
          rating: 4.7,
          description: "Stunning forest trails with epic view overlooks.",
          photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
          openingHours: "Daylight Hours",
          entryFee: "Free",
          bestTime: "Sunrise",
          visitTime: "3 hours",
          distance: "4.2 km",
        }
      ];
    }

    return filtered;
  };

  const handleCreateJourney = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const generatedPlan = getInteractiveFilteredSpots();
      setSpots(generatedPlan);
      setTimelinePlan(generatedPlan);

      if (isMobile) {
        setMobileMapOpen(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTimelineClick = (spot: ActivitySpot) => {
    setResetTrigger((prev) => prev + 1);
    setDestination((prev) => ({
      ...prev,
      lat: spot.lat,
      lng: spot.lng
    }));
  };

  const resetMapView = () => {
    setResetTrigger((prev) => prev + 1);
  };

  // Generate calendar days grid
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);

  const daysGrid = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    daysGrid.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysGrid.push({ day: i, isCurrentMonth: true });
  }
  const remaining = 42 - daysGrid.length;
  for (let i = 1; i <= remaining; i++) {
    daysGrid.push({ day: i, isCurrentMonth: false });
  }

  return (
    <div className="min-h-screen text-slate-150 flex flex-col md:flex-row relative bg-[#050814]">
      
      {/* 1. LEFT SIDE PLANNER PANEL (Static 60% width, independently scrollable) */}
      <div className="w-full md:w-[60%] h-screen overflow-y-auto bg-[#050814] px-4 md:px-6 py-5 space-y-4 flex flex-col justify-between scrollbar-thin shrink-0">
        <div className="space-y-4">
          {/* Header */}
          <div className="border-b border-slate-850 pb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-sans">GoTraveller AI Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 font-serif mt-0.5">Planner Dashboard</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleCreateJourney} className="space-y-4">
            
            {/* SECTION 1: Destination (Full Width) */}
            <DestinationSearch
              onSelect={(dest) => setDestination(dest)}
              defaultValue={destination.name}
            />

            {/* SECTION 2: Top Information Row (Start Date, End Date, Travelers) */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_2.2fr] gap-4 items-end">
              {/* Start Date */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Start Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                    className="w-full bg-[#050810] border border-slate-800 rounded-xl py-2 pl-9 pr-2 text-xs text-slate-200 focus:outline-none focus:border-yellow-400/50 h-[38px]"
                  />
                </div>
              </div>

              {/* End Date */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  End Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                    className="w-full bg-[#050810] border border-slate-800 rounded-xl py-2 pl-9 pr-2 text-xs text-slate-200 focus:outline-none focus:border-yellow-400/50 h-[38px]"
                  />
                </div>
              </div>

              {/* Travelers (Inline steppers) */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Travelers
                </label>
                <div className="bg-[#050810]/75 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2 h-auto">
                  {/* Adults */}
                  <div className="flex sm:flex-col items-center justify-between sm:justify-center text-center w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-slate-850/60 pb-3 sm:pb-0 sm:pr-3 last:border-0 last:pb-0 last:pr-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Adults</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleDecrementTraveler("adults")}
                        className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center text-sm transition-colors active:scale-95 shrink-0"
                      >
                        -
                      </button>
                      <span className="text-sm font-extrabold text-slate-100 w-5 text-center select-none">{travelerDetails.adults}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrementTraveler("adults")}
                        className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center text-sm transition-colors active:scale-95 shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex sm:flex-col items-center justify-between sm:justify-center text-center w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-slate-850/60 pb-3 sm:pb-0 sm:px-3 last:border-0 last:pb-0 last:px-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Children</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleDecrementTraveler("children")}
                        className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center text-sm transition-colors active:scale-95 shrink-0"
                      >
                        -
                      </button>
                      <span className="text-sm font-extrabold text-slate-100 w-5 text-center select-none">{travelerDetails.children}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrementTraveler("children")}
                        className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center text-sm transition-colors active:scale-95 shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex sm:flex-col items-center justify-between sm:justify-center text-center w-full sm:w-1/3 sm:pl-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Infants</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleDecrementTraveler("infants")}
                        className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center text-sm transition-colors active:scale-95 shrink-0"
                      >
                        -
                      </button>
                      <span className="text-sm font-extrabold text-slate-100 w-5 text-center select-none">{travelerDetails.infants}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrementTraveler("infants")}
                        className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center text-sm transition-colors active:scale-95 shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: Calendar & Compact Summary Card Row */}
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-3 items-stretch">
              
              {/* Calendar Grid wrapper (65%) */}
              <div className="bg-[#050810]/75 border border-slate-800/85 rounded-xl p-3 space-y-2 font-sans">
                {/* Month navigation header */}
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">
                    {months[currentMonth]} {currentYear}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 text-center">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayName) => (
                    <span key={dayName} className="text-[8px] font-bold text-slate-600 uppercase tracking-wider">
                      {dayName}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 text-center gap-y-0.5">
                  {daysGrid.map((cell, idx) => {
                    if (!cell.isCurrentMonth) {
                      return (
                        <span
                          key={idx}
                          className="text-[10px] text-slate-800 py-1 flex items-center justify-center pointer-events-none select-none"
                        >
                          {cell.day}
                        </span>
                      );
                    }
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDayClick(cell.day)}
                        className={`text-[10px] py-1 flex items-center justify-center transition-all ${getDayClass(
                          cell.day
                        )}`}
                      >
                        {cell.day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Compact Summary Card (35%) */}
              <div className="bg-[#050810]/75 border border-slate-800/85 rounded-xl p-3 flex flex-col justify-between space-y-2 font-sans text-xs">
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Trip Details</span>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between border-b border-slate-850 pb-1">
                      <span className="text-slate-450">Duration</span>
                      <span className="font-semibold text-slate-250">{duration}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-850 pb-1">
                      <span className="text-slate-450">Total Days</span>
                      <span className="font-bold text-yellow-400">{calculateDaysCount()} Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450">Nights</span>
                      <span className="font-semibold text-slate-250">{calculateDaysCount() - 1 > 0 ? calculateDaysCount() - 1 : 0} Nights</span>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-400/5 border border-yellow-400/10 rounded-lg p-2 text-[9px] text-slate-400 leading-normal">
                  ✈️ <span className="font-bold text-slate-200">Trip Scope:</span> Planning a bespoke {accommodation.toLowerCase()} trip to {destination.name.split(",")[0]} for {travelersCount} traveler{travelersCount > 1 ? "s" : ""}.
                </div>
              </div>
            </div>

            {/* SECTION 4: Estimated Budget Slider */}
            <BudgetSlider onChange={(val) => setBudget(val)} />

            {/* SECTION 5: Trip Types Single Row */}
            <TripTypeCards selectedIds={interests} onChange={(ids) => setInterests(ids)} />

            {/* SECTION 6: Transportation Preferences (5 columns single row) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
                Transportation Preference
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: "driving", label: "Car", icon: Car },
                  { id: "bus", label: "Bus", icon: Bus },
                  { id: "train", label: "Train", icon: Train },
                  { id: "flight", label: "Flight", icon: Plane },
                  { id: "walking", label: "Walking", icon: Compass },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = transport === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTransport(item.id as any)}
                      className={`p-2.5 rounded-xl border bg-[#050810]/55 flex flex-col items-center gap-1 text-center transition-all ${
                        isSelected
                          ? "border-yellow-400 bg-yellow-400/5 text-yellow-400 font-bold"
                          : "border-slate-800 text-slate-400 hover:border-slate-700/60 hover:text-slate-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[9px] font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 7: Accommodation Preferences (5 columns single row) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
                Accommodation Type
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { id: "hotel", label: "Hotel", icon: Building2 },
                  { id: "resort", label: "Resort", icon: Palmtree },
                  { id: "hostel", label: "Hostel", icon: Bed },
                  { id: "camping", label: "Camping", icon: Tent },
                  { id: "apartment", label: "Apartment", icon: Home },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = accommodation.toLowerCase() === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAccommodation(item.label)}
                      className={`p-2.5 rounded-xl border bg-[#050810]/55 flex flex-col items-center gap-1 text-center transition-all ${
                        isSelected
                          ? "border-yellow-400 bg-yellow-400/5 text-yellow-400 font-bold"
                          : "border-slate-800 text-slate-400 hover:border-slate-700/60 hover:text-slate-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[9px] font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 8: AI Planning Filters (Compact chips) */}
            <div className="space-y-2 pt-2 border-t border-slate-850">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-350">
                AI Planning Filters
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allChips.map((chip) => {
                  const isSelected = activeChips.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(chip)}
                      className={`px-3 py-1.5 rounded-full border text-[9px] font-bold select-none transition-all ${
                        isSelected
                          ? "bg-yellow-400 border-yellow-400 text-slate-950 shadow-md shadow-yellow-400/10"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 9: Center Button */}
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full max-w-sm bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/30 text-slate-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-yellow-400/15 active:scale-[0.99]"
              >
                <Sparkles className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span className="text-xs uppercase tracking-wider font-bold">{loading ? "Generating Your Route..." : "Create My Journey"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Simulated Itinerary Output */}
        {timelinePlan.length > 0 && (
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-yellow-400 space-y-2 mt-4">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
              <h3 className="font-serif text-sm font-bold text-yellow-400">
                Generated Itinerary
              </h3>
              <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <CheckCircle className="w-3 h-3" />
                <span>Ready</span>
              </span>
            </div>
            <div className="space-y-2 font-sans text-[11px] text-slate-300">
              <p className="font-bold text-white">Custom plan to {destination.name} is calculated successfully:</p>
              <ul className="space-y-1.5">
                {timelinePlan.map((spot, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-yellow-400 font-bold">Day {idx + 1}:</span>
                    <span>Visit {spot.name} ({spot.category}) for {spot.visitTime}.</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 2. RIGHT SIDE MAP PANEL (Static 40% width, relative, full height, never scrollable) */}
      <div
        className={`w-full md:w-[40%] h-screen relative overflow-hidden bg-[#070b16] shrink-0 ${
          mobileMapOpen ? "fixed inset-0 z-30" : "hidden md:block"
        }`}
      >
        <MapComponent
          centerLat={destination.lat}
          centerLng={destination.lng}
          spots={spots}
          transportMode={transport}
          showAttractions={showAttractions}
          showHotels={showHotels}
          showRestaurants={showRestaurants}
          showRoute={showRoute}
          mapStyle={mapStyle}
          resetTrigger={resetTrigger}
        />

        {/* FLOATING QUICK ACTIONS (Bottom-Right of Map - Absolute Overlay) */}
        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-[9999] flex flex-col gap-3 pointer-events-auto">
          {/* Map Style Toggle */}
          <button
            type="button"
            onClick={() => setMapStyle((prev) => (prev === "dark" ? "satellite" : "dark"))}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all ${
              mapStyle === "satellite"
                ? "bg-blue-500 border-blue-400 text-white"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
            }`}
            title="Toggle Map Style"
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Reset View Center */}
          <button
            type="button"
            onClick={resetMapView}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center shadow-lg transition-colors"
            title="Reset Map Center"
          >
            <Navigation className="w-4 h-4 transform rotate-45" />
          </button>

          {/* Filter Attractions */}
          <button
            type="button"
            onClick={() => setShowAttractions((prev) => !prev)}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all ${
              showAttractions
                ? "bg-yellow-400 border-yellow-300 text-slate-950 font-bold"
                : "bg-slate-900 border-slate-800 text-slate-400"
            }`}
            title="Toggle Attractions"
          >
            <Compass className="w-4 h-4" />
          </button>

          {/* Filter Hotels */}
          <button
            type="button"
            onClick={() => setShowHotels((prev) => !prev)}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all ${
              showHotels
                ? "bg-blue-600 border-blue-500 text-white font-bold"
                : "bg-slate-900 border-slate-800 text-slate-400"
            }`}
            title="Toggle Hotels"
          >
            <Building2 className="w-4 h-4" />
          </button>

          {/* Filter Restaurants */}
          <button
            type="button"
            onClick={() => setShowRestaurants((prev) => !prev)}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all ${
              showRestaurants
                ? "bg-orange-500 border-orange-400 text-white font-bold"
                : "bg-slate-900 border-slate-800 text-slate-400"
            }`}
            title="Toggle Restaurants"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Filter Route Path Lines */}
          <button
            type="button"
            onClick={() => setShowRoute((prev) => !prev)}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all ${
              showRoute
                ? "bg-cyan-500 border-cyan-400 text-white font-bold"
                : "bg-slate-900 border-slate-800 text-slate-400"
            }`}
            title="Toggle Route Paths"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile View Navigation back to planner */}
        {mobileMapOpen && (
          <button
            type="button"
            onClick={() => setMobileMapOpen(false)}
            className="absolute top-4 left-4 z-40 bg-slate-950/80 border border-slate-800 text-slate-200 font-bold p-3 rounded-full flex items-center justify-center transition-colors"
          >
            ← Back to Form
          </button>
        )}
      </div>

      {/* Floating map expand button for mobile screens */}
      {!mobileMapOpen && (
        <button
          type="button"
          onClick={() => setMobileMapOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-20 bg-yellow-400 text-slate-950 font-bold p-4 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 animate-bounce"
        >
          <Map className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
