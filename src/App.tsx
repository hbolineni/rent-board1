/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  useReducedMotion,
} from 'motion/react';
import { Plus, X, ArrowUpRight, Check, PhoneCall, Calendar, Mail } from 'lucide-react';

const BOOKING_URL =
  'https://cal.com/himavarthanraobolineni/20-min-ai-business-discovery-call-with-hima';
const EMAIL = 'hbolineni@gmail.com';
const OWNER_NAME = 'Himavarthan rao bolineni';
const BUSINESS_NAME = 'Rent Status Board';
const CITY = 'Bengaluru';
const PRICE_TEXT = 'Rs 25,000 setup + Rs 4,000 a month';

// Rich picture component with graceful fallback to custom-crafted panel
interface RichPictureProps {
  src: string;
  alt: string;
  badgeText?: string;
  initialsOrNumber: string;
  className?: string;
  isArch?: boolean;
}

function RichPicture({
  src,
  alt,
  badgeText,
  initialsOrNumber,
  className = '',
  isArch = false,
}: RichPictureProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#1A1A1A] via-[#1E2A38] to-[#8A5A2B]/80 flex items-center justify-center select-none ${
        isArch ? 'rounded-t-[140px] md:rounded-t-[180px] rounded-b-[28px]' : 'rounded-[28px]'
      } ${className}`}
    >
      {/* Film grain layer */}
      <div className="film-grain" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E08A1E]/20 via-transparent to-transparent pointer-events-none" />

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover relative z-10"
        />
      ) : null}

      {/* Fallback rich panel if picture is missing or errors */}
      {hasError && (
        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center w-full h-full">
          <div className="relative flex items-center justify-center">
            {/* Soft marigold aura */}
            <div className="absolute w-40 h-40 bg-[#E08A1E]/20 rounded-full blur-2xl" />
            <span className="text-outline-serif text-8xl md:text-9xl font-serif tracking-tight select-none">
              {initialsOrNumber}
            </span>
          </div>
          {badgeText && (
            <p className="mt-4 text-[#FAF3E6]/70 text-xs tracking-widest uppercase font-medium">
              {badgeText}
            </p>
          )}
          {/* Subtle architectural hairline accents */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#FAF3E6]/30 text-[11px] font-mono">
            <span>{BUSINESS_NAME}</span>
            <span>{CITY}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Magnetic Button with cursor tracking and smooth release
function MagneticButton({
  children,
  href,
  className = '',
  target = '_blank',
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.22;
    const distanceY = (e.clientY - centerY) * 0.22;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none ${className}`}
    >
      {children}
    </motion.a>
  );
}

// Logo icon that renders logo.png or crisp monogram
function BrandLogo() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-[#FAF3E6] border border-[#1A1A1A]/10 shadow-xs shrink-0">
        {!imgError ? (
          <img
            src="/logo.png"
            alt={BUSINESS_NAME}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="font-serif font-bold text-[#E08A1E] text-lg leading-none">R</span>
        )}
      </div>
      <span className="font-serif text-xl tracking-tight font-semibold">{BUSINESS_NAME}</span>
    </div>
  );
}

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverInk, setIsOverInk] = useState(false);
  const [activeTab, setActiveTab] = useState<'without' | 'with'>('without');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll tracking for problem section lighting words
  const problemContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: problemProgress } = useScroll({
    target: problemContainerRef,
    offset: ['start 85%', 'end 40%'],
  });

  // Scroll tracking for step vertical progress line
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsContainerRef,
    offset: ['start 60%', 'end 75%'],
  });
  const stepsLineHeight = useTransform(stepsProgress, [0, 1], ['0%', '100%']);

  // Parallax for Hero arch image
  const { scrollY } = useScroll();
  const archParallax = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 45]);

  // Track scroll position and detect ink section intersection for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > 40);

      // Ink sections to detect
      const inkSections = document.querySelectorAll('[data-ink-section="true"]');
      let overInk = false;
      const barHeight = 70;

      inkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= barHeight && rect.bottom >= barHeight) {
          overInk = true;
        }
      });
      setIsOverInk(overInk);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Words for the problem sentence
  const problemSentence =
    'The rent due date passes in silence, you wonder who has paid and who has not, and by the time you check bank receipts the month has already begun to slip away.';
  const problemWords = problemSentence.split(' ');

  // What I do cards data
  const whatIDoCards = [
    {
      num: '01',
      title: 'The Monthly Status Board',
      imageSrc: '/work-1.jpg',
      today: 'You search through bank messages and paper notes to recall which tenant has paid.',
      withBoard:
        "You open one page on your phone that shows every tenant's rent status for the month.",
    },
    {
      num: '02',
      title: 'The n8n Follow-Up Form',
      imageSrc: '/work-2.jpg',
      today: 'Late payments go unnoticed until weeks have passed and rent is overdue.',
      withBoard: 'A small n8n form marks the late ones for a call the same day.',
    },
    {
      num: '03',
      title: 'Same-Day Owner Calling',
      imageSrc: '/work-3.jpg',
      today:
        'You delay uncomfortable follow-ups because you do not know who is behind until the month slips away.',
      withBoard:
        'You see who is behind on your phone and call that person before the month slips away.',
    },
  ];

  // Pinned section horizontal scroll calculation
  const pinnedRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pinnedScrollProgress } = useScroll({
    target: pinnedRef,
    offset: ['start start', 'end end'],
  });
  const cardsX = useTransform(
    pinnedScrollProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '-67%']
  );

  // Before and after items
  const withoutItems = [
    'Sitting down in the evening to match bank credits with tenant names.',
    'Wondering which tenant sent rent and who forgot.',
    'Writing reminders late at night after the month has already advanced.',
    'Going to bed unsure if every house is accounted for.',
  ];

  const withItems = [
    'Opening your phone in the afternoon to see every house on one page.',
    'Spotting the late tenant marked by the n8n form right away.',
    'Calling that person the same day before the month slips away.',
    'Enjoying your evening knowing every tenant’s status is clear.',
  ];

  // Questions and answers
  const faqs = [
    {
      q: 'Who is this for?',
      a: 'I am serving to the home owners who have tenants in their buildings.',
    },
    {
      q: 'What exactly do you set up?',
      a: "You give the owner one page that shows every tenant's rent status for the month, and a small n8n form that marks the late ones for a call the same day. He opens it on his phone, sees who is behind, and calls that person before the month slips away.",
    },
    {
      q: 'How long does setup take?',
      a: 'The setup timeline is agreed on the call.',
    },
    {
      q: 'What does it cost?',
      a: PRICE_TEXT,
    },
    {
      q: 'How do we start?',
      a: 'Book a 20 minute call to discuss your houses and how you collect rent.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF3E6] text-[#1A1A1A] selection:bg-[#E08A1E] selection:text-[#1A1A1A]">
      {/* 1. TOP BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          !isScrolled
            ? 'bg-transparent py-6'
            : isOverInk
            ? 'bg-[#1A1A1A] text-[#FAF3E6] border-b border-[#FAF3E6]/15 py-4 shadow-md'
            : 'bg-[#FAF3E6] text-[#1A1A1A] border-b border-[#1A1A1A]/10 py-4 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div
              className={`transition-all duration-200 rounded-xl ${
                isOverInk ? 'p-1.5 bg-[#FAF3E6] text-[#1A1A1A]' : 'p-0.5'
              }`}
            >
              <img
                src="/logo.png"
                alt={BUSINESS_NAME}
                className="w-7 h-7 object-contain rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span
              className={`font-serif text-xl tracking-tight font-medium ${
                isOverInk ? 'text-[#FAF3E6]' : 'text-[#1A1A1A]'
              }`}
            >
              {BUSINESS_NAME}
            </span>
          </a>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium tracking-tight">
            <a
              href="#what-i-do"
              className={`transition-opacity hover:opacity-100 ${
                isOverInk ? 'text-[#FAF3E6]/80 hover:text-[#FAF3E6]' : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
              }`}
            >
              What I do
            </a>
            <a
              href="#how-it-works"
              className={`transition-opacity hover:opacity-100 ${
                isOverInk ? 'text-[#FAF3E6]/80 hover:text-[#FAF3E6]' : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
              }`}
            >
              How it works
            </a>
            <a
              href="#about"
              className={`transition-opacity hover:opacity-100 ${
                isOverInk ? 'text-[#FAF3E6]/80 hover:text-[#FAF3E6]' : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
              }`}
            >
              About
            </a>
          </nav>

          {/* Pill action */}
          <div className="flex items-center gap-4">
            <MagneticButton
              href={BOOKING_URL}
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[#E08A1E] text-[#1A1A1A] hover:bg-[#E08A1E]/90 shadow-xs"
            >
              Book a call
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* 2. HERO */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Words */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center">
            {/* Context line */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#8A5A2B] text-sm md:text-base font-semibold tracking-wide uppercase mb-4"
            >
              For I am serving to the home owners in {CITY}
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-[44px] sm:text-[60px] md:text-[76px] lg:text-[84px] leading-[1.0] text-[#1A1A1A] tracking-tight mb-8"
            >
              Every month's rent, <span className="italic text-[#E08A1E]">seen</span> before it
              slips.
            </motion.h1>

            {/* Plain explanation line */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#1A1A1A]/85 text-lg md:text-xl leading-[1.6] max-w-[64ch] mb-10"
            >
              You give the owner one page that shows every tenant's rent status for the month, and a
              small n8n form that marks the late ones for a call the same day. He opens it on his
              phone, sees who is behind, and calls that person before the month slips away.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <MagneticButton
                href={BOOKING_URL}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold bg-[#E08A1E] text-[#1A1A1A] hover:bg-[#E08A1E]/90 shadow-sm"
              >
                Book a 20 minute call
              </MagneticButton>

              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-[#1A1A1A]/75 hover:text-[#1A1A1A] underline underline-offset-4 decoration-[#1A1A1A]/20 hover:decoration-[#1A1A1A] transition-colors py-2 px-1"
              >
                <Mail className="w-4 h-4 text-[#8A5A2B]" />
                Email {EMAIL}
              </a>
            </motion.div>
          </div>

          {/* Right Column: Tall Arch Picture & Corner Card */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              style={{ y: archParallax }}
              className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[4/5]"
            >
              {/* Tall Arch Picture */}
              <div className="w-full h-full rounded-t-[160px] rounded-b-[28px] overflow-hidden shadow-xl border border-[#1A1A1A]/10 relative bg-[#1E2A38]">
                <RichPicture
                  src="/me.jpg"
                  alt={OWNER_NAME}
                  initialsOrNumber="HB"
                  badgeText="Home Owner & Founder"
                  isArch={true}
                />
              </div>

              {/* Floating corner card */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-4 -left-4 md:-left-8 bg-[#FAF3E6] border border-[#1A1A1A]/12 rounded-2xl p-4 shadow-lg max-w-[240px] z-20"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E08A1E]" />
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#8A5A2B] font-semibold">
                    Direct Setup
                  </span>
                </div>
                <p className="text-xs md:text-sm font-medium text-[#1A1A1A] leading-snug">
                  {OWNER_NAME}, founder of {BUSINESS_NAME}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM (Full-width ink section) */}
      <section
        ref={problemContainerRef}
        data-ink-section="true"
        className="relative bg-[#1A1A1A] text-[#FAF3E6] py-28 md:py-36 px-6 md:px-12 overflow-hidden border-y border-[#FAF3E6]/10"
      >
        <div className="film-grain" />

        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-[#E08A1E] mb-8">
            The Reality for Home Owners
          </p>

          <h2 className="font-serif text-[36px] sm:text-[46px] md:text-[62px] lg:text-[72px] leading-[1.1] tracking-tight">
            {problemWords.map((word, index) => {
              const start = index / problemWords.length;
              const end = (index + 1) / problemWords.length;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(problemProgress, [start, end], [0.22, 1]);

              return (
                <motion.span
                  key={index}
                  style={shouldReduceMotion ? { opacity: 1 } : { opacity }}
                  className="inline-block mr-2.5 transition-colors"
                >
                  {word}
                </motion.span>
              );
            })}
          </h2>
        </div>
      </section>

      {/* 4. WHAT I DO (Pinned Section with Horizontal Sliding Cards) */}
      <section
        id="what-i-do"
        ref={pinnedRef}
        className="relative bg-[#FAF3E6] border-b border-[#1A1A1A]/10"
      >
        {/* On desktop: sticky pinned viewport */}
        <div className="hidden lg:block h-[260vh] relative">
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-12 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8A5A2B] font-semibold">
                What I Set Up
              </span>
              <h2 className="font-serif text-5xl xl:text-6xl text-[#1A1A1A] tracking-tight mt-1">
                The setup for your houses.
              </h2>
            </div>

            {/* Sliding Cards Track */}
            <div className="relative overflow-visible">
              <motion.div style={{ x: cardsX }} className="flex gap-8 w-max">
                {whatIDoCards.map((card) => (
                  <div
                    key={card.num}
                    className="w-[68vw] max-w-[780px] bg-[#FAF3E6] border border-[#1A1A1A]/12 rounded-[28px] overflow-hidden p-6 shadow-sm flex flex-col justify-between shrink-0"
                  >
                    {/* Top 60% Picture */}
                    <div className="w-full h-[360px] rounded-[20px] overflow-hidden relative mb-6">
                      <RichPicture
                        src={card.imageSrc}
                        alt={card.title}
                        initialsOrNumber={card.num}
                        badgeText={card.title}
                      />
                    </div>

                    {/* Card Content */}
                    <div>
                      <div className="flex items-baseline justify-between mb-3 border-b border-[#1A1A1A]/10 pb-3">
                        <h3 className="font-serif text-3xl text-[#1A1A1A] font-semibold">
                          {card.title}
                        </h3>
                        <span className="font-serif text-2xl text-[#8A5A2B]">{card.num}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-6 pt-2 text-base">
                        <div className="bg-[#1A1A1A]/4 rounded-2xl p-4">
                          <p className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60 font-semibold mb-1">
                            Today:
                          </p>
                          <p className="text-[#1A1A1A]/85 leading-relaxed">{card.today}</p>
                        </div>
                        <div className="bg-[#E08A1E]/10 border border-[#E08A1E]/20 rounded-2xl p-4">
                          <p className="text-xs font-mono uppercase tracking-wider text-[#8A5A2B] font-bold mb-1">
                            With Rent Status Board:
                          </p>
                          <p className="text-[#1A1A1A] font-medium leading-relaxed">
                            {card.withBoard}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* On Phone & Tablet: Swipeable & Stacked Cards */}
        <div className="block lg:hidden py-16 px-6">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A5A2B] font-semibold">
              What I Set Up
            </span>
            <h2 className="font-serif text-4xl text-[#1A1A1A] tracking-tight mt-1">
              The setup for your houses.
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {whatIDoCards.map((card) => (
              <div
                key={card.num}
                className="w-full bg-[#FAF3E6] border border-[#1A1A1A]/12 rounded-[28px] overflow-hidden p-5 shadow-xs"
              >
                <div className="w-full h-[240px] rounded-[20px] overflow-hidden relative mb-5">
                  <RichPicture
                    src={card.imageSrc}
                    alt={card.title}
                    initialsOrNumber={card.num}
                    badgeText={card.title}
                  />
                </div>

                <div className="flex items-baseline justify-between mb-3 border-b border-[#1A1A1A]/10 pb-2">
                  <h3 className="font-serif text-2xl text-[#1A1A1A] font-semibold">{card.title}</h3>
                  <span className="font-serif text-xl text-[#8A5A2B]">{card.num}</span>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="bg-[#1A1A1A]/4 rounded-xl p-3.5">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#1A1A1A]/60 font-semibold mb-1">
                      Today:
                    </p>
                    <p className="text-[#1A1A1A]/85">{card.today}</p>
                  </div>
                  <div className="bg-[#E08A1E]/10 border border-[#E08A1E]/20 rounded-xl p-3.5">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#8A5A2B] font-bold mb-1">
                      With Rent Status Board:
                    </p>
                    <p className="text-[#1A1A1A] font-medium">{card.withBoard}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEFORE AND AFTER */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8A5A2B] font-semibold">
            Your Evening
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight mt-1 mb-8">
            How your month feels.
          </h2>

          {/* Two-position switch */}
          <div className="inline-flex items-center p-1.5 bg-[#1A1A1A]/8 rounded-full border border-[#1A1A1A]/10 shadow-inner">
            <button
              onClick={() => setActiveTab('without')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'without'
                  ? 'bg-[#1A1A1A] text-[#FAF3E6] shadow-sm'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
              }`}
            >
              Without {BUSINESS_NAME}
            </button>
            <button
              onClick={() => setActiveTab('with')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'with'
                  ? 'bg-[#E08A1E] text-[#1A1A1A] shadow-sm'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
              }`}
            >
              With {BUSINESS_NAME}
            </button>
          </div>
        </div>

        {/* Stacked crossfade container with no empty moment */}
        <div className="relative min-h-[290px] md:min-h-[240px] bg-[#FAF3E6] border border-[#1A1A1A]/12 rounded-[28px] p-6 md:p-10 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'without' ? (
              <motion.div
                key="without"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col justify-center gap-4"
              >
                <div className="flex items-center gap-2 mb-2 text-[#8A5A2B] font-mono text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#8A5A2B]" />
                  Without {BUSINESS_NAME}
                </div>
                <ul className="space-y-3.5">
                  {withoutItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed"
                    >
                      <span className="mt-1 text-[#8A5A2B] font-serif text-sm">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="with"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col justify-center gap-4"
              >
                <div className="flex items-center gap-2 mb-2 text-[#E08A1E] font-mono text-xs uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#E08A1E]" />
                  With {BUSINESS_NAME}
                </div>
                <ul className="space-y-3.5">
                  {withItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 text-[#1A1A1A] font-medium text-base md:text-lg leading-relaxed"
                    >
                      <span className="mt-1 text-[#E08A1E] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. HOW WE START */}
      <section
        id="how-it-works"
        className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-[#1A1A1A]/10"
      >
        <div className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8A5A2B] font-semibold">
            The Process
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight mt-1">
            How we start.
          </h2>
        </div>

        {/* Vertical steps with filling line */}
        <div ref={stepsContainerRef} className="relative pl-10 md:pl-16 space-y-14 md:space-y-16">
          {/* Background vertical hairline */}
          <div className="absolute left-3.5 md:left-5 top-4 bottom-4 w-[2px] bg-[#1A1A1A]/15" />

          {/* Filling vertical accent line */}
          <motion.div
            style={{ height: stepsLineHeight }}
            className="absolute left-3.5 md:left-5 top-4 w-[2px] bg-[#E08A1E] origin-top"
          />

          {/* Step 1 */}
          <div className="relative group">
            <div className="absolute -left-10 md:-left-16 top-0 w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#FAF3E6] border-2 border-[#E08A1E] flex items-center justify-center font-serif text-sm md:text-base font-semibold text-[#1A1A1A] shadow-xs">
              1
            </div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-semibold mb-2">
                A 20 minute call
              </h3>
              <p className="text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed max-w-[62ch]">
                We talk through your houses and how you collect rent from your tenants today.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div className="absolute -left-10 md:-left-16 top-0 w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#FAF3E6] border-2 border-[#E08A1E] flex items-center justify-center font-serif text-sm md:text-base font-semibold text-[#1A1A1A] shadow-xs">
              2
            </div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-semibold mb-2">
                A plan for your houses
              </h3>
              <p className="text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed max-w-[62ch]">
                We outline the phone page and how the n8n form will fit your tenants.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="absolute -left-10 md:-left-16 top-0 w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#FAF3E6] border-2 border-[#E08A1E] flex items-center justify-center font-serif text-sm md:text-base font-semibold text-[#1A1A1A] shadow-xs">
              3
            </div>
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-semibold mb-2">
                I set it up and show your team
              </h3>
              <p className="text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed max-w-[62ch]">
                I configure the board, connect the form, and walk you through it on your phone so
                you see who is behind before the month slips away.
              </p>

              {/* Exact Price Line under step 3 */}
              <div className="mt-8 p-6 bg-[#FAF3E6] border-2 border-[#8A5A2B]/25 rounded-2xl inline-block max-w-full">
                <p className="text-xs font-mono uppercase tracking-wider text-[#8A5A2B] font-semibold mb-1">
                  Investment
                </p>
                <p className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-bold">
                  {PRICE_TEXT}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT ME (Written as a short letter) */}
      <section
        id="about"
        className="py-24 md:py-32 px-6 md:px-12 max-w-3xl mx-auto border-t border-[#1A1A1A]/10"
      >
        <div className="bg-[#FAF3E6] border border-[#1A1A1A]/12 rounded-[28px] p-8 md:p-14 shadow-sm relative overflow-hidden">
          {/* Header with small round profile */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-[#1A1A1A]/15 shrink-0 bg-[#1E2A38]">
              <RichPicture
                src="/me.jpg"
                alt={OWNER_NAME}
                initialsOrNumber="HB"
                className="rounded-full"
              />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8A5A2B] font-semibold block">
                Home Owner in {CITY}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] font-semibold">
                A note from {OWNER_NAME}
              </h2>
            </div>
          </div>

          {/* Letter Body in slightly larger reading size */}
          <div className="space-y-4 text-[19px] md:text-[21px] leading-[1.7] text-[#1A1A1A]/90 font-normal">
            <p>
              I am the Home owner have 3 to 4 houses and have tenants in my building. I have served
              the tenants.
            </p>
            <p>
              When rent falls behind without clear sight, days turn into weeks. I built this single
              page and form for myself first, to see every tenant's status on my phone and call
              the same day before the month slips away.
            </p>
          </div>

          {/* Handwritten signature in Caveat font */}
          <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#8A5A2B] mb-1">
                Warm regards,
              </p>
              <p className="font-script text-4xl text-[#1A1A1A] font-bold">Himavarthan</p>
            </div>

            <MagneticButton
              href={BOOKING_URL}
              className="px-6 py-3 rounded-full text-sm font-semibold bg-[#E08A1E] text-[#1A1A1A] hover:bg-[#E08A1E]/90 shadow-xs"
            >
              Book a 20 minute call with Himavarthan
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 8. QUESTIONS (Accordion of 5 questions answered only from details) */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-[#1A1A1A]/10">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8A5A2B] font-semibold">
            Common Inquiries
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight mt-1">
            Questions.
          </h2>
        </div>

        <div className="divide-y divide-[#1A1A1A]/12 border-y border-[#1A1A1A]/12">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div key={index} className="py-6 transition-colors">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                >
                  <span className="font-serif text-[24px] md:text-[28px] text-[#1A1A1A] group-hover:text-[#8A5A2B] transition-colors leading-tight">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center shrink-0 text-[#1A1A1A] transition-transform duration-200">
                    {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-base md:text-lg text-[#1A1A1A]/85 leading-relaxed max-w-[64ch]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL INVITATION (On Ink) */}
      <section
        data-ink-section="true"
        className="relative bg-[#1A1A1A] text-[#FAF3E6] py-28 md:py-36 px-6 md:px-12 text-center border-t border-[#FAF3E6]/10"
      >
        <div className="film-grain" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-[#E08A1E] mb-6">
            Ready to Start
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#FAF3E6] mb-8 leading-[1.05]">
            Let's give your evenings back.
          </h2>

          <p className="text-[#FAF3E6]/75 text-lg md:text-xl max-w-[56ch] mb-10 leading-relaxed">
            See every tenant's status on one page and call before the month slips away.
          </p>

          <MagneticButton
            href={BOOKING_URL}
            className="px-10 py-4 rounded-full text-base md:text-lg font-semibold bg-[#E08A1E] text-[#1A1A1A] hover:bg-[#E08A1E]/90 shadow-md mb-8"
          >
            Book a 20 minute call
          </MagneticButton>

          <a
            href={`mailto:${EMAIL}`}
            className="text-sm md:text-base text-[#FAF3E6]/70 hover:text-[#FAF3E6] underline underline-offset-4 decoration-[#FAF3E6]/30 hover:decoration-[#FAF3E6] transition-colors"
          >
            Email: {EMAIL}
          </a>
        </div>
      </section>

      {/* 10. FOOTER (On Ink) */}
      <footer
        data-ink-section="true"
        className="relative bg-[#1A1A1A] text-[#FAF3E6] py-14 px-6 md:px-12 border-t border-[#FAF3E6]/10"
      >
        <div className="film-grain" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo on small cream panel & City */}
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#FAF3E6] rounded-xl shadow-xs">
              <img
                src="/logo.png"
                alt={BUSINESS_NAME}
                className="w-7 h-7 object-contain rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <p className="font-serif text-lg text-[#FAF3E6] font-semibold">{BUSINESS_NAME}</p>
              <p className="text-xs font-mono text-[#FAF3E6]/60 uppercase tracking-wider">{CITY}</p>
            </div>
          </div>

          {/* Three contact links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#FAF3E6]/80 font-medium">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E08A1E] transition-colors"
            >
              Book a call
            </a>
            <span className="text-[#FAF3E6]/30">•</span>
            <a href={`mailto:${EMAIL}`} className="hover:text-[#E08A1E] transition-colors">
              {EMAIL}
            </a>
            <span className="text-[#FAF3E6]/30">•</span>
            <a href="#what-i-do" className="hover:text-[#E08A1E] transition-colors">
              What I do
            </a>
          </div>

          {/* Year and Business name */}
          <p className="text-xs font-mono text-[#FAF3E6]/50">
            2026 {BUSINESS_NAME}
          </p>
        </div>
      </footer>

      {/* Sticky Phone Bar: Sticks to bottom on mobile after hero scrolls away */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#1A1A1A]/95 backdrop-blur-md border-t border-[#FAF3E6]/10 transition-transform duration-300 ${
          isScrolled ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-full text-sm font-semibold bg-[#E08A1E] text-[#1A1A1A] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
        >
          Book a 20 minute call
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
