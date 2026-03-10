"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { subscribeToDocument } from '../lib/adminDb';
import LiveEditable from '../components/admin/LiveEditable';

const Federation: React.FC = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        const unsub = subscribeToDocument('site_content', 'federation', (data) => {
            if (data) setContent(data);
        });
        return () => unsub();
    }, []);

    const heroTitle = content?.heroTitle || "Stop Practising Alone.";
    const heroSubtext = content?.heroSubtext || "Join 128 years of Ayurveda credibility. Get patients, products, and a brand that works for you — while you stay independent.";
    const movementTitle = content?.movementTitle || "The Jammi Ayurveda Movement";
    const movementText = content?.movementText || "JAM is a cooperative federation of India's finest independent traditional healers. We provide the 128-year credibility, the pan-India patient network, and the clinical formulary. You provide the healing. Together, we reclaim the narrative of genuine Ayurveda.";

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitted');
    };

    const faqs = [
        {
            q: "Is JAM a franchise model?",
            a: "No. You remain 100% independent. JAM is a cooperative movement where authentic practitioners share resources, formulations, and credibility. You retain complete ownership of your clinic."
        },
        {
            q: "What is the requirement to join?",
            a: "You must be a qualified Ayurveda practitioner (BAMS / MD) with a dedicated clinic and a commitment to authentic practice over commercial shortcuts."
        },
        {
            q: "How does the wholesale pricing work?",
            a: "Members receive access to Jammi's entire 128-year formulary at an exclusive 25% wholesale discount. You dispense directly to your patients at MRP."
        },
        {
            q: "Is there a minimum monthly volume?",
            a: "No. We believe in prescribing what the patient needs, not meeting sales quotas. Order only what you require."
        },
        {
            q: "Can I be part of other networks?",
            a: "Yes. We respect your independence. However, members find that the clinical efficacy of Jammi formulations naturally becomes the core of their practice."
        }
    ];

    return (
        <div className="bg-background-light pt-[5rem]">

            {/* SECTION 1: Hero */}
            <section className="bg-forest relative overflow-hidden text-center py-24 lg:py-32">
                <div className="absolute inset-0 opacity-10 mix-blend-overlay grain-texture"></div>
                <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10">
                    <span className="text-forest bg-saffron font-bold uppercase tracking-widest text-[10px] mb-6 inline-block py-1 px-3 rounded-full shadow-sm">
                        JOIN THE MOVEMENT
                    </span>
                    <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 text-white tracking-tight">
                        <LiveEditable collection="site_content" docId="federation" field="heroTitle">{heroTitle}</LiveEditable>
                    </h1>
                    <p className="text-white/80 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                        <LiveEditable collection="site_content" docId="federation" field="heroSubtext" multiline>{heroSubtext}</LiveEditable>
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="#apply" className="w-full sm:w-auto text-center bg-saffron text-white font-bold px-8 py-4 rounded-sm hover:-translate-y-1 transition-transform uppercase tracking-widest text-sm shadow-xl shadow-saffron/20">
                            APPLY NOW — IT'S FREE
                        </a>
                        <a href="#benefits" className="w-full sm:w-auto text-center bg-transparent border-2 border-white/20 text-white font-bold px-8 py-4 rounded-sm hover:border-white transition-colors uppercase tracking-widest text-sm">
                            SEE WHAT MEMBERS GET
                        </a>
                    </div>
                </div>
            </section>

            {/* SECTION 2: The Problem */}
            <section className="py-20 lg:py-28 bg-cream border-b border-cream-dark">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-saffron uppercase tracking-widest mb-4">THE REALITY</h2>
                        <h3 className="text-3xl lg:text-4xl font-serif font-bold text-forest">Authentic Ayurveda is Losing to Marketing.</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: 'storefront', title: 'Fighting Big Pharma Alone', desc: 'Independent clinics are outspent by FMCG brands selling diluted "Ayurvedic" cosmetics.', field: 'prob1' },
                            { icon: 'inventory_2', title: 'Supply Chain Headaches', desc: 'Procuring authentic, compliant, and consistently effective medicines takes time away from healing.', field: 'prob2' },
                            { icon: 'trending_down', title: 'Limited Patient Reach', desc: 'Without a massive marketing budget, even the best practitioners struggle to build a steady patient flow.', field: 'prob3' }
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl border border-cream-dark text-center shadow-sm">
                                <span className="material-symbols-outlined text-saffron text-4xl mb-6">{card.icon}</span>
                                <h4 className="text-xl font-bold text-forest mb-3">
                                    <LiveEditable collection="site_content" docId="federation" field={`${card.field}Title`}>{card.title}</LiveEditable>
                                </h4>
                                <p className="text-forest/70 text-sm leading-relaxed">
                                    <LiveEditable collection="site_content" docId="federation" field={`${card.field}Desc`} multiline>{card.desc}</LiveEditable>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: The Fix (What JAM Is) */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-forest mb-6">
                                <LiveEditable collection="site_content" docId="federation" field="movementTitle">{movementTitle}</LiveEditable>
                            </h2>
                            <p className="text-forest/80 text-lg leading-relaxed mb-8">
                                <LiveEditable collection="site_content" docId="federation" field="movementText" multiline>{movementText}</LiveEditable>
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: 'Collective Power', desc: 'Leverage the strength of a national brand while keeping your clinic 100% yours.' },
                                    { title: 'Clinical Certainty', desc: 'Access 100+ AYUSH-licensed formulations proven over three generations.' },
                                    { title: 'Democratic Voice', desc: 'A movement run for practitioners, guided by clinical results, not just profits.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <span className="material-symbols-outlined text-saffron mt-1">arrow_forward</span>
                                        <div>
                                            <h5 className="font-bold text-forest mb-1">{item.title}</h5>
                                            <p className="text-forest/70 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-cream rounded-2xl p-8 border border-cream-dark flex items-center justify-center relative z-10">
                                <div className="text-center">
                                    <span className="material-symbols-outlined text-forest/20 text-9xl">hub</span>
                                    <p className="mt-4 font-bold text-forest/40 uppercase tracking-widest text-sm">Federation Network</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-full h-full border-2 border-saffron rounded-2xl z-0"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: What You Get */}
            <section id="benefits" className="py-20 lg:py-28 bg-forest text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-6">The Federation Advantage</h2>
                        <p className="text-white/70 max-w-2xl mx-auto">Everything you need to scale your practice without compromising your principles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: 'payments', title: '25% Wholesale Margins', desc: 'Direct access to the Jammi formulary at exclusive member pricing.', field: 'adv1' },
                            { icon: 'verified', title: 'Clinic Accreditation', desc: '"JAM Authorized" signage and digital badges for your practice.', field: 'adv2' },
                            { icon: 'people', title: 'Patient Referrals', desc: 'Direct routing of local patients from our digital platforms to your clinic.', field: 'adv3' },
                            { icon: 'menu_book', title: 'Clinical Protocols', desc: 'Access 128 years of documented efficacy and dosage guidelines.', field: 'adv4' },
                            { icon: 'forum', title: 'Peer Network', desc: 'Connect with elite practitioners for case discussions and mentorship.', field: 'adv5' },
                            { icon: 'campaign', title: 'Marketing Cover', desc: 'Benefit from JAM\'s national advertising and public trust campaigns.', field: 'adv6' }
                        ].map((benefit, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-saffron text-3xl mb-4">{benefit.icon}</span>
                                <h4 className="font-bold text-lg mb-2">
                                    <LiveEditable collection="site_content" docId="federation" field={`${benefit.field}Title`}>{benefit.title}</LiveEditable>
                                </h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    <LiveEditable collection="site_content" docId="federation" field={`${benefit.field}Desc`} multiline>{benefit.desc}</LiveEditable>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: The Amul Model */}
            <section className="py-20 lg:py-28 bg-cream border-b border-cream-dark">
                <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
                    <h2 className="text-xs font-bold text-forest uppercase tracking-widest mb-4">THE BLUEPRINT</h2>
                    <h3 className="text-3xl lg:text-4xl font-serif font-bold text-forest mb-8">Not a Franchise. A Cooperative.</h3>
                    <p className="text-forest/80 text-lg mb-12 max-w-3xl mx-auto">
                        Like Amul did for dairy farmers, JAM organizes independent Ayurveda practitioners under one trusted national brand. We handle the manufacturing, compliance, and large-scale brand building. You handle the patients. We share the success.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="bg-white p-8 rounded-2xl border-2 border-red-100 shadow-sm opacity-60">
                            <h4 className="font-bold text-red-800 mb-6 uppercase tracking-widest text-sm">The Corporate Model</h4>
                            <ul className="space-y-4 text-left text-sm text-forest/70">
                                <li className="flex gap-3"><span className="text-red-500">✕</span> You pay massive franchise fees.</li>
                                <li className="flex gap-3"><span className="text-red-500">✕</span> You lose your clinic's identity.</li>
                                <li className="flex gap-3"><span className="text-red-500">✕</span> Aggressive sales targets imposed.</li>
                                <li className="flex gap-3"><span className="text-red-500">✕</span> Profits flow upward to investors.</li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border-2 border-saffron shadow-lg relative transform md:-translate-y-2">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-forest text-saffron text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">The JAM Model</div>
                            <h4 className="font-bold text-forest mb-6 uppercase tracking-widest text-sm mt-2">The Federation Model</h4>
                            <ul className="space-y-4 text-left text-sm text-forest font-medium">
                                <li className="flex gap-3"><span className="text-amber-600">✓</span> Zero joining or franchise fees.</li>
                                <li className="flex gap-3"><span className="text-amber-600">✓</span> Your clinic remains 100% yours.</li>
                                <li className="flex gap-3"><span className="text-amber-600">✓</span> Prescribe only what patients need.</li>
                                <li className="flex gap-3"><span className="text-amber-600">✓</span> Margins and growth stay with the healer.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: Membership Tiers */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-forest mb-4">Membership Tiers</h2>
                        <p className="text-forest/70">Choose your level of engagement with the movement.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Tier 1 */}
                        <div className="bg-cream p-8 rounded-2xl border border-cream-dark flex flex-col">
                            <div className="mb-6">
                                <h3 className="font-bold text-forest text-xl mb-2">
                                    <LiveEditable collection="site_content" docId="federation" field="tier1Title">{content?.tier1Title || "Associate Member"}</LiveEditable>
                                </h3>
                                <div className="text-3xl font-bold text-forest mb-2">
                                    <LiveEditable collection="site_content" docId="federation" field="tier1Price">{content?.tier1Price || "Free"}</LiveEditable>
                                </div>
                                <p className="text-forest/60 text-sm">
                                    <LiveEditable collection="site_content" docId="federation" field="tier1Sub" multiline>{content?.tier1Sub || "For practitioners testing the waters."}</LiveEditable>
                                </p>
                            </div>
                            <ul className="space-y-4 flex-grow mb-8 text-sm text-forest/80">
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier1Point1">{content?.tier1Point1 || "Wholesale pricing catalog access"}</LiveEditable>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier1Point2">{content?.tier1Point2 || "Basic clinical protocols"}</LiveEditable>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier1Point3">{content?.tier1Point3 || "Monthly newsletter"}</LiveEditable>
                                </li>
                            </ul>
                            <a href="#apply" className="w-full block border-2 border-forest text-forest text-center py-3 rounded uppercase font-bold text-xs tracking-widest hover:bg-forest hover:text-white transition-colors">Select Tier</a>
                        </div>

                        {/* Tier 2 */}
                        <div className="bg-forest text-white p-8 rounded-2xl border-2 border-saffron shadow-2xl flex flex-col transform md:-translate-y-4 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-saffron text-forest font-bold uppercase tracking-widest text-[10px] px-4 py-1 rounded-full">RECOMMENDED</div>
                            <div className="mb-6 mt-2">
                                <h3 className="font-bold text-white text-xl mb-2">
                                    <LiveEditable collection="site_content" docId="federation" field="tier2Title">{content?.tier2Title || "Founding Member"}</LiveEditable>
                                </h3>
                                <div className="text-3xl font-serif text-saffron mb-2">
                                    <LiveEditable collection="site_content" docId="federation" field="tier2Price">{content?.tier2Price || "Invite Only"}</LiveEditable>
                                </div>
                                <p className="text-white/60 text-sm">
                                    <LiveEditable collection="site_content" docId="federation" field="tier2Sub" multiline>{content?.tier2Sub || "For committed partners growing with JAM."}</LiveEditable>
                                </p>
                            </div>
                            <ul className="space-y-4 flex-grow mb-8 text-sm text-white/90 border-t border-white/10 pt-6">
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier2Point1">{content?.tier2Point1 || "Permanent 25% Margin lock"}</LiveEditable>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier2Point2">{content?.tier2Point2 || "Active patient routing from jammi.in"}</LiveEditable>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier2Point3">{content?.tier2Point3 || "Full Clinic Accreditation Kit"}</LiveEditable>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier2Point4">{content?.tier2Point4 || "Peer network access & vote rights"}</LiveEditable>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier2Point5">{content?.tier2Point5 || "Dedicated account manager support"}</LiveEditable>
                                </li>
                            </ul>
                            <a href="#apply" className="w-full block bg-saffron text-white text-center py-3 rounded uppercase font-bold text-xs tracking-widest hover:bg-white hover:text-forest transition-colors">Apply For Founding Status</a>
                        </div>

                        {/* Tier 3 */}
                        <div className="bg-cream p-8 rounded-2xl border border-cream-dark flex flex-col">
                            <div className="mb-6">
                                <h3 className="font-bold text-forest text-xl mb-2">
                                    <LiveEditable collection="site_content" docId="federation" field="tier3Title">{content?.tier3Title || "Institution"}</LiveEditable>
                                </h3>
                                <div className="text-3xl font-bold text-forest mb-2">
                                    <LiveEditable collection="site_content" docId="federation" field="tier3Price">{content?.tier3Price || "Custom"}</LiveEditable>
                                </div>
                                <p className="text-forest/60 text-sm">
                                    <LiveEditable collection="site_content" docId="federation" field="tier3Sub" multiline>{content?.tier3Sub || "For multi-doctor clinics and hospitals."}</LiveEditable>
                                </p>
                            </div>
                            <ul className="space-y-4 flex-grow mb-8 text-sm text-forest/80">
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier3Point1">{content?.tier3Point1 || "Bulk supply chain integration"}</LiveEditable>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier3Point2">{content?.tier3Point2 || "White-label prescription options"}</LiveEditable>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-saffron">★</span>
                                    <LiveEditable collection="site_content" docId="federation" field="tier3Point3">{content?.tier3Point3 || "Clinical research partnerships"}</LiveEditable>
                                </li>
                            </ul>
                            <a href="#apply" className="w-full block border-2 border-forest text-forest text-center py-3 rounded uppercase font-bold text-xs tracking-widest hover:bg-forest hover:text-white transition-colors">Contact Us</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7: Social Proof Strip */}
            <section className="bg-saffron py-12 border-y-4 border-forest">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="flex flex-wrap justify-around text-center gap-8">
                        {[
                            { num: '300+', label: 'Active Federation Members' },
                            { num: '14', label: 'States Showing Growth' },
                            { num: '85k', label: 'Patients Treated via Network' }
                        ].map((stat, i) => (
                            <div key={i} className="text-white">
                                <div className="text-3xl lg:text-5xl font-serif font-bold mb-1">{stat.num}</div>
                                <div className="text-xs uppercase font-bold tracking-widest opacity-90">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 8: Apply Now Form */}
            <section id="apply" className="py-24 lg:py-32 bg-cream">
                <div className="max-w-3xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-forest mb-4">Join the Movement</h2>
                        <p className="text-forest/70 text-lg">Submit your application below to begin the verification process.</p>
                    </div>

                    {formStatus === 'idle' ? (
                        <form onSubmit={handleApply} className="bg-white p-8 sm:p-12 rounded-2xl border border-cream-dark/50 shadow-lg relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[url('/images/pattern-dots.svg')] opacity-10 rounded-tr-2xl"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-forest uppercase tracking-widest">Full Name / Dr. *</label>
                                    <input required type="text" className="w-full border-b-2 border-cream-dark py-3 outline-none focus:border-saffron bg-transparent transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-forest uppercase tracking-widest">Medical Registration No. *</label>
                                    <input required type="text" className="w-full border-b-2 border-cream-dark py-3 outline-none focus:border-saffron bg-transparent transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-forest uppercase tracking-widest">Phone Number *</label>
                                    <input required type="tel" className="w-full border-b-2 border-cream-dark py-3 outline-none focus:border-saffron bg-transparent transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-forest uppercase tracking-widest">Email Address *</label>
                                    <input required type="email" className="w-full border-b-2 border-cream-dark py-3 outline-none focus:border-saffron bg-transparent transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <label className="text-xs font-bold text-forest uppercase tracking-widest">Clinic Name & City *</label>
                                <input required type="text" className="w-full border-b-2 border-cream-dark py-3 outline-none focus:border-saffron bg-transparent transition-colors" />
                            </div>

                            <div className="text-center">
                                <button type="submit" className="bg-forest text-white font-bold px-12 py-5 rounded-sm hover:-translate-y-1 transition-transform uppercase tracking-widest text-sm shadow-xl w-full sm:w-auto">
                                    SUBMIT APPLICATION
                                </button>
                                <p className="text-forest/50 text-xs italic mt-4">We respect your privacy. All details remain confidential.</p>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-white text-center p-12 sm:p-16 rounded-2xl shadow-xl border border-cream-dark animate-fade-in relative z-10">
                            <div className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto mb-8">
                                <span className="material-symbols-outlined text-saffron text-4xl">how_to_reg</span>
                            </div>
                            <h3 className="text-3xl font-serif text-forest mb-4">Application Submitted.</h3>
                            <p className="text-forest/70 leading-relaxed max-w-md mx-auto mb-8">
                                Welcome to the first step. Our onboarding team is reviewing your credentials and will reach out via phone within 48 hours to complete verification.
                            </p>
                            <div className="text-forest font-bold border-b-2 border-saffron inline-block pb-1 uppercase tracking-widest text-sm">
                                The Movement Begins
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* SECTION 9: FAQ */}
            <section className="py-24 bg-white border-t border-cream-dark">
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-forest">Common Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Is JAM a franchise model?",
                                a: "No. You remain 100% independent. JAM is a cooperative movement where authentic practitioners share resources, formulations, and credibility. You retain complete ownership of your clinic.",
                                field: 'faq1'
                            },
                            {
                                q: "What is the requirement to join?",
                                a: "You must be a qualified Ayurveda practitioner (BAMS / MD) with a dedicated clinic and a commitment to authentic practice over commercial shortcuts.",
                                field: 'faq2'
                            },
                            {
                                q: "How does the wholesale pricing work?",
                                a: "Members receive access to Jammi's entire 128-year formulary at an exclusive 25% wholesale discount. You dispense directly to your patients at MRP.",
                                field: 'faq3'
                            },
                            {
                                q: "Is there a minimum monthly volume?",
                                a: "No. We believe in prescribing what the patient needs, not meeting sales quotas. Order only what you require.",
                                field: 'faq4'
                            },
                            {
                                q: "Can I be part of other networks?",
                                a: "Yes. We respect your independence. However, members find that the clinical efficacy of Jammi formulations naturally becomes the core of their practice.",
                                field: 'faq5'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-cream border border-cream-dark rounded-xl overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none hover:bg-cream-dark/30 transition-colors"
                                >
                                    <span className="font-bold text-forest pr-4">
                                        <LiveEditable collection="site_content" docId="federation" field={`${faq.field}Q`}>{faq.q}</LiveEditable>
                                    </span>
                                    <span className={`material-symbols-outlined text-saffron transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                                        add_circle
                                    </span>
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-forest/80 text-sm leading-relaxed border-t border-cream-dark pt-4">
                                        <LiveEditable collection="site_content" docId="federation" field={`${faq.field}A`} multiline>{faq.a}</LiveEditable>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Federation;
