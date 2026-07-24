import { cookies } from "next/headers";

export type PatientId = "sarah" | "james" | "maya";

export type PatientData = {
  id: PatientId;
  patient: {
    name: string;
    age: number;
    pronouns: string;
    location: string;
    primaryCare: string;
    insurance: { plan: string; deductible: number; deductibleMet: number; oopMax: number; oopMet: number };
  };
  personaBlurb: string;
  personaColor: string;
  conditions: { id: string; name: string; since: string; status: string; icd: string }[];
  medications: {
    id: string; name: string; brand: string; dose: string; frequency: string;
    prescriber: string; started: string; for: string; adherence: number;
    sideEffects: string[]; refillsLeft: number | null; nextRefill: string | null;
  }[];
  interactions: { id: string; drugs: string[]; severity: string; plain: string; action: string }[];
  labs: {
    id: string; name: string; value: number | string; unit: string; date: string;
    reference: string; status: string; trend: number[]; trendDates: string[];
  }[];
  symptoms: { id: string; date: string; region: string; label: string; severity: number; notes: string }[];
  documents: { id: string; name: string; type: string; date: string; pages: number; source: string; status: string }[];
  insights: {
    id: string; tag: string; severity: string; title: string; body: string;
    sources: string[]; action: string; date: string;
  }[];
  providers: {
    id: string; name: string; specialty: string; practice: string;
    distance: number; rating: number; reviews: number; inNetwork: boolean;
    telehealth: boolean; nextAvailable: string; estimatedCost: number; role: string;
  }[];
  timeline: { id: string; date: string; kind: "diagnosis" | "medication" | "lab" | "symptom" | "visit" | "document" | "insight"; label: string; detail: string }[];
  upcomingAppointments: { id: string; provider: string; specialty: string; date: string; time: string; reason: string; location: string; prepReady: boolean }[];
  wearable: { restingHeartRate: number[]; sleepHours: number[]; steps: number[]; bpSystolic: number[] };
  chatSuggestions: string[];
  heroInsight: {
    tag: string;
    title: React.ReactNode | string;
    accentWord: string;
    accentColor: string;
    body: string;
  };
  quickStats: { label: string; value: string; hint: string }[];
};

const sarah: PatientData = {
  id: "sarah",
  patient: {
    name: "Sarah Chen",
    age: 42,
    pronouns: "she/her",
    location: "Naperville, IL",
    primaryCare: "Dr. Marcus Reid, MD — Naperville Internal Medicine",
    insurance: { plan: "BlueCross PPO 3000", deductible: 3000, deductibleMet: 1840, oopMax: 6500, oopMet: 2210 },
  },
  personaBlurb: "Working mom, multiple chronic conditions across three specialists.",
  personaColor: "var(--teal)",
  conditions: [
    { id: "c1", name: "Type 2 Diabetes", since: "2019-04", status: "active", icd: "E11.9" },
    { id: "c2", name: "Hypertension", since: "2017-08", status: "active", icd: "I10" },
    { id: "c3", name: "Hypothyroidism", since: "2021-02", status: "active", icd: "E03.9" },
    { id: "c4", name: "GERD", since: "2023-11", status: "active", icd: "K21.9" },
    { id: "c5", name: "Vitamin D Deficiency", since: "2024-01", status: "monitoring", icd: "E55.9" },
  ],
  medications: [
    { id: "m1", name: "Metformin", brand: "Glucophage", dose: "1000 mg", frequency: "twice daily", prescriber: "Dr. Reid", started: "2019-04-18", for: "Type 2 Diabetes", adherence: 0.94, sideEffects: ["nausea", "diarrhea", "metallic taste"], refillsLeft: 2, nextRefill: "2026-08-04" },
    { id: "m2", name: "Lisinopril", brand: "Prinivil", dose: "20 mg", frequency: "once daily", prescriber: "Dr. Reid", started: "2017-08-22", for: "Hypertension", adherence: 0.88, sideEffects: ["dry cough", "dizziness", "elevated potassium"], refillsLeft: 4, nextRefill: "2026-09-11" },
    { id: "m3", name: "Levothyroxine", brand: "Synthroid", dose: "75 mcg", frequency: "once daily, morning", prescriber: "Dr. Patel (Endo)", started: "2021-02-09", for: "Hypothyroidism", adherence: 0.97, sideEffects: ["insomnia if overdosed", "palpitations"], refillsLeft: 3, nextRefill: "2026-08-19" },
    { id: "m4", name: "Omeprazole", brand: "Prilosec", dose: "20 mg", frequency: "once daily", prescriber: "Dr. Reid", started: "2023-11-30", for: "GERD", adherence: 0.82, sideEffects: ["headache", "B12 deficiency (long-term)", "bone density loss"], refillsLeft: 1, nextRefill: "2026-07-30" },
    { id: "m5", name: "Vitamin D3", brand: "OTC", dose: "2000 IU", frequency: "once daily", prescriber: "Self", started: "2024-02-01", for: "Vitamin D Deficiency", adherence: 0.7, sideEffects: [], refillsLeft: null, nextRefill: null },
  ],
  interactions: [
    { id: "i1", drugs: ["Metformin", "Omeprazole"], severity: "moderate", plain: "Long-term omeprazole may lower B12 absorption. Metformin already carries B12 depletion risk. Combined, worth a B12 check every 6-12 months.", action: "Ask Dr. Reid to add serum B12 to your next lab panel." },
    { id: "i2", drugs: ["Lisinopril", "Ibuprofen (OTC)"], severity: "moderate", plain: "NSAIDs like ibuprofen can reduce lisinopril's blood pressure effect and stress your kidneys. You logged ibuprofen 3× last week.", action: "Prefer acetaminophen for pain when possible, or ask about a kidney-safe alternative." },
    { id: "i3", drugs: ["Levothyroxine", "Calcium (Vitamin D3 with calcium)"], severity: "minor", plain: "Calcium can bind levothyroxine and reduce absorption. Space them at least 4 hours apart.", action: "Take levothyroxine on waking; take vitamin D + calcium with lunch." },
  ],
  labs: [
    { id: "l1", name: "HbA1c", value: 7.3, unit: "%", date: "2026-06-14", reference: "< 7.0 (ADA target)", status: "above", trend: [8.4, 8.1, 7.7, 7.5, 7.4, 7.3], trendDates: ["2024-06","2024-12","2025-04","2025-08","2026-02","2026-06"] },
    { id: "l2", name: "LDL Cholesterol", value: 118, unit: "mg/dL", date: "2026-06-14", reference: "< 100", status: "above", trend: [142, 138, 129, 124, 121, 118], trendDates: ["2024-06","2024-12","2025-04","2025-08","2026-02","2026-06"] },
    { id: "l3", name: "TSH", value: 2.8, unit: "mIU/L", date: "2026-06-14", reference: "0.4 – 4.0", status: "normal", trend: [4.9, 3.6, 2.9, 2.7, 2.8, 2.8], trendDates: ["2024-06","2024-12","2025-04","2025-08","2026-02","2026-06"] },
    { id: "l4", name: "Vitamin D (25-OH)", value: 24, unit: "ng/mL", date: "2026-06-14", reference: "30 – 100", status: "below", trend: [18, 21, 23, 25, 24, 24], trendDates: ["2024-06","2024-12","2025-04","2025-08","2026-02","2026-06"] },
    { id: "l5", name: "eGFR", value: 76, unit: "mL/min/1.73m²", date: "2026-06-14", reference: "> 90", status: "monitor", trend: [88, 84, 81, 79, 77, 76], trendDates: ["2024-06","2024-12","2025-04","2025-08","2026-02","2026-06"] },
    { id: "l6", name: "Blood Pressure", value: 138, unit: "/86 mmHg", date: "2026-07-20", reference: "< 130/80", status: "above", trend: [148, 144, 141, 139, 138, 138], trendDates: ["2024-06","2024-12","2025-04","2025-08","2026-02","2026-07"] },
  ],
  symptoms: [
    { id: "s1", date: "2026-07-22", region: "chest", label: "Occasional heartburn after dinner", severity: 3, notes: "Worse when eating past 8pm" },
    { id: "s2", date: "2026-07-21", region: "head", label: "Mild headache, right side", severity: 2, notes: "Cleared after water" },
    { id: "s3", date: "2026-07-19", region: "throat", label: "Persistent dry cough", severity: 4, notes: "Started ~10 days ago, worse at night" },
    { id: "s4", date: "2026-07-18", region: "leg", label: "Ankle swelling, left", severity: 3, notes: "Noticed after long drive" },
    { id: "s5", date: "2026-07-15", region: "general", label: "Fatigue mid-afternoon", severity: 4, notes: "Every day this week" },
    { id: "s6", date: "2026-07-12", region: "stomach", label: "Nausea, mild", severity: 2, notes: "30 min after metformin" },
    { id: "s7", date: "2026-07-08", region: "chest", label: "Heartburn again", severity: 4, notes: "Woke me up at 2am" },
  ],
  documents: [
    { id: "d1", name: "Metabolic Panel — Quest Diagnostics", type: "Lab Report", date: "2026-06-14", pages: 4, source: "Quest Portal", status: "processed" },
    { id: "d2", name: "Cardiology Consult — Dr. Yamamoto", type: "Consult Note", date: "2026-05-02", pages: 2, source: "Uploaded PDF", status: "processed" },
    { id: "d3", name: "Prescription — Levothyroxine renewal", type: "Prescription", date: "2026-04-19", pages: 1, source: "Photo upload", status: "processed" },
    { id: "d4", name: "Discharge Summary — ER visit 3/8", type: "Discharge", date: "2026-03-08", pages: 3, source: "Uploaded PDF", status: "processed" },
    { id: "d5", name: "Thyroid Panel — LabCorp", type: "Lab Report", date: "2026-02-11", pages: 2, source: "LabCorp Portal", status: "processed" },
    { id: "d6", name: "Insurance EOB — Q1 Statement", type: "EOB", date: "2026-04-05", pages: 6, source: "Uploaded PDF", status: "processing" },
  ],
  insights: [
    { id: "in1", tag: "Possible side effect", severity: "moderate", title: "Your dry cough may be from Lisinopril.", body: "A dry, persistent cough is reported in ~10% of patients on ACE inhibitors like Lisinopril. Your cough started 10 days ago and hasn't cleared. Worth mentioning at your next visit — an ARB (e.g. losartan) is a common alternative if this is the cause.", sources: ["Your symptom log (7/19–7/22)", "Lisinopril label — DailyMed", "AHA 2024 hypertension guideline"], action: "Bring this up with Dr. Reid", date: "2026-07-22" },
    { id: "in2", tag: "Lab trend", severity: "moderate", title: "Kidney function drifting down over 24 months.", body: "Your eGFR has moved from 88 → 76 mL/min/1.73m² since June 2024. Still within normal range, but the direction is worth watching, especially with diabetes and hypertension in the picture.", sources: ["Metabolic panels 6/2024 → 6/2026", "KDIGO 2024 CKD guideline"], action: "Ask about repeat labs in 3 months instead of 6", date: "2026-06-15" },
    { id: "in3", tag: "Interaction watch", severity: "minor", title: "Timing matters: Levothyroxine + calcium", body: "You take Vitamin D3 (with calcium) at breakfast, same time as Levothyroxine. Calcium binds levothyroxine — you may only be absorbing ~70% of your thyroid dose.", sources: ["Levothyroxine label — DailyMed"], action: "Move Vitamin D3 to lunch", date: "2026-07-10" },
    { id: "in4", tag: "Screening reminder", severity: "low", title: "Diabetic eye exam due next month.", body: "ADA recommends annual dilated eye exams for T2D. Your last one was August 2025. In-network options within 5 miles: Dr. Nguyen (Naperville Eye), Dr. Blake (Retina Associates).", sources: ["ADA Standards of Care 2026", "Your visit history"], action: "Book with Dr. Nguyen — $30 copay", date: "2026-07-05" },
    { id: "in5", tag: "Symptom pattern", severity: "low", title: "Heartburn clusters with late dinners.", body: "5 of your last 6 heartburn logs happened on days you ate dinner after 8pm. Not a diagnosis — just a pattern worth knowing.", sources: ["Your symptom log (past 90 days)"], action: "Try dinner before 7pm for 2 weeks", date: "2026-07-20" },
  ],
  providers: [
    { id: "p1", name: "Dr. Marcus Reid, MD", specialty: "Internal Medicine", practice: "Naperville Internal Medicine", distance: 2.1, rating: 4.8, reviews: 214, inNetwork: true, telehealth: true, nextAvailable: "2026-08-04", estimatedCost: 30, role: "Primary Care" },
    { id: "p2", name: "Dr. Aiko Yamamoto, MD", specialty: "Cardiology", practice: "Edward-Elmhurst Heart", distance: 4.4, rating: 4.9, reviews: 178, inNetwork: true, telehealth: true, nextAvailable: "2026-08-18", estimatedCost: 60, role: "Specialist" },
    { id: "p3", name: "Dr. Sanjay Patel, MD", specialty: "Endocrinology", practice: "DuPage Endocrine Group", distance: 6.8, rating: 4.7, reviews: 92, inNetwork: true, telehealth: false, nextAvailable: "2026-09-02", estimatedCost: 60, role: "Specialist" },
    { id: "p4", name: "Dr. Linh Nguyen, OD", specialty: "Ophthalmology", practice: "Naperville Eye Associates", distance: 3.2, rating: 4.8, reviews: 156, inNetwork: true, telehealth: false, nextAvailable: "2026-08-11", estimatedCost: 30, role: "Screening" },
    { id: "p5", name: "Dr. Reed Blake, MD", specialty: "Ophthalmology", practice: "Retina Associates of IL", distance: 8.9, rating: 4.6, reviews: 74, inNetwork: true, telehealth: false, nextAvailable: "2026-08-06", estimatedCost: 45, role: "Screening" },
  ],
  timeline: [
    { id: "t1", date: "2017-08-22", kind: "diagnosis", label: "Diagnosed: Hypertension", detail: "Dr. Reid — starts Lisinopril 10mg" },
    { id: "t2", date: "2019-04-18", kind: "diagnosis", label: "Diagnosed: Type 2 Diabetes", detail: "HbA1c 8.9, Dr. Reid — starts Metformin 500mg BID" },
    { id: "t3", date: "2021-02-09", kind: "diagnosis", label: "Diagnosed: Hypothyroidism", detail: "TSH 6.8, Dr. Patel — starts Levothyroxine 50mcg" },
    { id: "t4", date: "2023-11-30", kind: "diagnosis", label: "Diagnosed: GERD", detail: "Dr. Reid — starts Omeprazole 20mg" },
    { id: "t5", date: "2024-01-14", kind: "lab", label: "Vitamin D low: 18 ng/mL", detail: "Starts D3 2000 IU OTC" },
    { id: "t6", date: "2025-08-20", kind: "visit", label: "Annual eye exam — normal", detail: "Dr. Nguyen — no retinopathy" },
    { id: "t7", date: "2026-03-08", kind: "visit", label: "ER visit — chest pain, ruled out", detail: "Discharged same day, likely GERD flare" },
    { id: "t8", date: "2026-05-02", kind: "visit", label: "Cardiology consult — Dr. Yamamoto", detail: "Stress test normal, continue current meds" },
    { id: "t9", date: "2026-06-14", kind: "lab", label: "HbA1c 7.3 — improving", detail: "Down from 7.5 six months ago" },
    { id: "t10", date: "2026-07-08", kind: "symptom", label: "Heartburn recurrence begins", detail: "First of a cluster of 5 logs" },
    { id: "t11", date: "2026-07-13", kind: "symptom", label: "Dry cough starts", detail: "Persistent, worse at night" },
    { id: "t12", date: "2026-07-22", kind: "insight", label: "AI: Cough may be Lisinopril side effect", detail: "Sourced to symptom log + drug label" },
  ],
  upcomingAppointments: [
    { id: "a1", provider: "Dr. Marcus Reid", specialty: "Internal Medicine", date: "2026-08-04", time: "10:20 AM", reason: "Med review — cough + BP", location: "Naperville Internal Medicine", prepReady: true },
    { id: "a2", provider: "Dr. Linh Nguyen", specialty: "Ophthalmology", date: "2026-08-11", time: "2:00 PM", reason: "Annual diabetic eye exam", location: "Naperville Eye Associates", prepReady: false },
  ],
  wearable: {
    restingHeartRate: [64,66,65,67,68,66,67,65,68,69,68,67,66,67],
    sleepHours: [6.2,6.8,7.1,5.9,6.5,7.4,7.0,6.3,6.9,7.2,6.7,6.5,7.1,6.8],
    steps: [4210,6120,3890,7020,5480,2890,8140,6720,4180,5590,6810,3120,7440,6280],
    bpSystolic: [134,138,136,140,138,135,139,137,141,138,136,139,138,137],
  },
  chatSuggestions: [
    "Why is my HbA1c still above 7?",
    "Could my cough be from a medication?",
    "What should I ask Dr. Reid at my next visit?",
    "Am I due for any screenings?",
    "Explain my last lab results in plain English.",
  ],
  heroInsight: {
    tag: "Needs attention · Possible side effect",
    title: "Your dry cough may be caused by Lisinopril.",
    accentWord: "dry cough",
    accentColor: "var(--coral)",
    body: "You've logged a dry cough on 4 of the last 10 days, and it hasn't cleared. About 10% of ACE-inhibitor patients develop this exact side effect. Worth mentioning at your Aug 4 visit — an ARB like losartan is a common alternative.",
  },
  quickStats: [
    { label: "Records unified", value: "32", hint: "across 4 portals" },
    { label: "Active meds", value: "5", hint: "1 interaction flag" },
    { label: "AI insights", value: "12", hint: "this month" },
  ],
};

const james: PatientData = {
  id: "james",
  patient: {
    name: "James Whitmore",
    age: 68,
    pronouns: "he/him",
    location: "Aurora, IL",
    primaryCare: "Dr. Elena Cortez, MD — Rush-Copley Primary Care",
    insurance: { plan: "Medicare Part B + Aetna Supplement Plan G", deductible: 240, deductibleMet: 240, oopMax: 0, oopMet: 0 },
  },
  personaBlurb: "Retired plumber, cardiac patient on 7 medications with slowly declining kidney function.",
  personaColor: "var(--coral)",
  conditions: [
    { id: "c1", name: "Atrial Fibrillation", since: "2022-05", status: "active", icd: "I48.91" },
    { id: "c2", name: "Heart Failure (HFrEF)", since: "2024-02", status: "active", icd: "I50.22" },
    { id: "c3", name: "Hypertension", since: "2018-01", status: "active", icd: "I10" },
    { id: "c4", name: "Type 2 Diabetes", since: "2020-06", status: "active", icd: "E11.9" },
    { id: "c5", name: "Chronic Kidney Disease, Stage 3a", since: "2025-04", status: "monitoring", icd: "N18.30" },
  ],
  medications: [
    { id: "m1", name: "Apixaban", brand: "Eliquis", dose: "5 mg", frequency: "twice daily", prescriber: "Dr. Sun (Cardio)", started: "2022-05-14", for: "AFib — stroke prevention", adherence: 0.96, sideEffects: ["bruising", "GI bleed risk"], refillsLeft: 2, nextRefill: "2026-08-08" },
    { id: "m2", name: "Metoprolol Succinate", brand: "Toprol XL", dose: "50 mg", frequency: "once daily", prescriber: "Dr. Sun", started: "2022-05-14", for: "AFib rate control + HF", adherence: 0.93, sideEffects: ["fatigue", "cold hands", "dizziness"], refillsLeft: 3, nextRefill: "2026-08-20" },
    { id: "m3", name: "Furosemide", brand: "Lasix", dose: "40 mg", frequency: "once daily, AM", prescriber: "Dr. Sun", started: "2024-02-18", for: "Heart Failure", adherence: 0.88, sideEffects: ["dehydration", "low potassium", "hearing changes"], refillsLeft: 1, nextRefill: "2026-07-30" },
    { id: "m4", name: "Losartan", brand: "Cozaar", dose: "50 mg", frequency: "once daily", prescriber: "Dr. Cortez", started: "2024-03-01", for: "Hypertension + HF (ARB)", adherence: 0.91, sideEffects: ["elevated potassium", "dizziness"], refillsLeft: 4, nextRefill: "2026-09-01" },
    { id: "m5", name: "Atorvastatin", brand: "Lipitor", dose: "40 mg", frequency: "once daily, evening", prescriber: "Dr. Cortez", started: "2020-07-10", for: "Cholesterol + cardiac risk", adherence: 0.9, sideEffects: ["muscle aches", "elevated liver enzymes"], refillsLeft: 5, nextRefill: "2026-09-15" },
    { id: "m6", name: "Metformin", brand: "Glucophage", dose: "500 mg", frequency: "twice daily", prescriber: "Dr. Cortez", started: "2020-06-05", for: "Type 2 Diabetes", adherence: 0.94, sideEffects: ["GI upset", "B12 depletion"], refillsLeft: 3, nextRefill: "2026-08-25" },
    { id: "m7", name: "Potassium Chloride", brand: "K-Dur", dose: "20 mEq", frequency: "once daily", prescriber: "Dr. Sun", started: "2024-05-01", for: "Prevent low K from Lasix", adherence: 0.75, sideEffects: ["nausea", "GI irritation"], refillsLeft: 2, nextRefill: "2026-08-12" },
  ],
  interactions: [
    { id: "i1", drugs: ["Apixaban", "Ibuprofen (OTC)"], severity: "moderate", plain: "You logged ibuprofen for knee pain 4× last month. NSAIDs meaningfully raise GI bleeding risk when combined with apixaban — an anticoagulant.", action: "Switch to acetaminophen for knee pain. Confirm with Dr. Sun before any dose over 3g/day." },
    { id: "i2", drugs: ["Losartan", "Potassium Chloride", "Furosemide"], severity: "moderate", plain: "Losartan raises potassium. K-Dur supplements potassium. Lasix lowers it. This balance shifts with any dose change — your last K was 4.8 (upper-normal).", action: "Do not adjust any of these three doses without labs. Watch for muscle weakness or arrhythmia." },
    { id: "i3", drugs: ["Metformin", "Contrast dye (imaging)"], severity: "minor", plain: "Your eGFR is 52. If any imaging with IV contrast is scheduled, metformin must be held per FDA guidance to prevent lactic acidosis.", action: "Flag your kidney status any time imaging is ordered." },
  ],
  labs: [
    { id: "l1", name: "BNP", value: 385, unit: "pg/mL", date: "2026-07-10", reference: "< 100", status: "above", trend: [520, 480, 440, 410, 390, 385], trendDates: ["2024-04","2024-10","2025-04","2025-10","2026-04","2026-07"] },
    { id: "l2", name: "eGFR", value: 52, unit: "mL/min/1.73m²", date: "2026-07-10", reference: "> 60", status: "below", trend: [64, 60, 58, 56, 54, 52], trendDates: ["2024-04","2024-10","2025-04","2025-10","2026-04","2026-07"] },
    { id: "l3", name: "HbA1c", value: 6.9, unit: "%", date: "2026-07-10", reference: "< 7.5 (older adults)", status: "normal", trend: [7.4, 7.2, 7.1, 7.0, 6.9, 6.9], trendDates: ["2024-04","2024-10","2025-04","2025-10","2026-04","2026-07"] },
    { id: "l4", name: "Potassium", value: 4.8, unit: "mEq/L", date: "2026-07-10", reference: "3.5 – 5.0", status: "monitor", trend: [4.2, 4.4, 4.5, 4.6, 4.7, 4.8], trendDates: ["2024-04","2024-10","2025-04","2025-10","2026-04","2026-07"] },
    { id: "l5", name: "LDL Cholesterol", value: 78, unit: "mg/dL", date: "2026-07-10", reference: "< 70 (cardiac hx)", status: "above", trend: [110, 98, 92, 88, 82, 78], trendDates: ["2024-04","2024-10","2025-04","2025-10","2026-04","2026-07"] },
    { id: "l6", name: "Blood Pressure", value: 128, unit: "/78 mmHg", date: "2026-07-20", reference: "< 130/80", status: "normal", trend: [142, 138, 134, 131, 129, 128], trendDates: ["2024-04","2024-10","2025-04","2025-10","2026-04","2026-07"] },
  ],
  symptoms: [
    { id: "s1", date: "2026-07-22", region: "leg", label: "Ankle swelling, both sides", severity: 4, notes: "Socks leaving deep marks by evening" },
    { id: "s2", date: "2026-07-21", region: "chest", label: "Fluttering heartbeat, brief", severity: 3, notes: "Lasted about 30 seconds, resolved" },
    { id: "s3", date: "2026-07-19", region: "general", label: "Fatigue climbing stairs", severity: 4, notes: "New — first floor to second is now hard" },
    { id: "s4", date: "2026-07-18", region: "general", label: "Weight up 3 lbs from last week", severity: 3, notes: "Not eating differently" },
    { id: "s5", date: "2026-07-15", region: "leg", label: "Calf cramping at night", severity: 3, notes: "Both legs" },
    { id: "s6", date: "2026-07-10", region: "general", label: "Bruising on arm", severity: 2, notes: "Small bump, big bruise — apixaban expected" },
  ],
  documents: [
    { id: "d1", name: "Cardiology Echo Report", type: "Imaging", date: "2026-07-01", pages: 3, source: "Rush Portal", status: "processed" },
    { id: "d2", name: "Renal Panel — Quest", type: "Lab Report", date: "2026-07-10", pages: 4, source: "Quest Portal", status: "processed" },
    { id: "d3", name: "Cardiology Follow-up — Dr. Sun", type: "Consult Note", date: "2026-06-15", pages: 2, source: "Uploaded PDF", status: "processed" },
    { id: "d4", name: "Medicare EOB — Q2", type: "EOB", date: "2026-07-05", pages: 8, source: "Uploaded PDF", status: "processed" },
    { id: "d5", name: "Discharge Summary — HF admission", type: "Discharge", date: "2024-02-18", pages: 5, source: "Uploaded PDF", status: "processed" },
  ],
  insights: [
    { id: "in1", tag: "Needs attention · Heart failure signal", severity: "moderate", title: "Weight + ankle swelling suggest fluid overload.", body: "You gained 3 lbs this week and logged bilateral ankle swelling and fatigue climbing stairs — classic early HF decompensation. Your BNP has also risen slightly (390 → 385 is stable but higher than target). Worth calling Dr. Sun before waiting for your next visit.", sources: ["Your symptom log (7/15–7/22)", "Weight log", "BNP trend 2024–2026", "AHA HF self-monitoring guideline"], action: "Call Dr. Sun's nurse line today", date: "2026-07-22" },
    { id: "in2", tag: "Interaction watch", severity: "moderate", title: "Ibuprofen + apixaban raises bleeding risk.", body: "You logged ibuprofen for knee pain 4× in the last 30 days. Combined with your daily apixaban this significantly raises GI bleeding risk. Acetaminophen is safer for chronic joint pain in your case.", sources: ["Your OTC log", "Apixaban label — DailyMed", "AGS Beers Criteria 2023"], action: "Switch to acetaminophen; discuss with Dr. Sun", date: "2026-07-20" },
    { id: "in3", tag: "Lab trend", severity: "moderate", title: "Kidney function crossed CKD threshold.", body: "Your eGFR is 52 — that's Stage 3a CKD. Given diabetes + hypertension + heart failure this needs closer monitoring. Some of your meds (metformin, apixaban) have dose considerations below 50.", sources: ["Metabolic panels 2024–2026", "KDIGO 2024 CKD guideline"], action: "Confirm nephrology referral", date: "2026-07-10" },
    { id: "in4", tag: "Screening reminder", severity: "low", title: "Annual flu + updated COVID vaccine due.", body: "Given HF and CKD you're in a high-risk group. Both vaccines are covered $0 under Medicare Part B.", sources: ["CDC ACIP 2026", "Your vaccination history"], action: "Book at Walgreens (0.4 mi)", date: "2026-07-05" },
  ],
  providers: [
    { id: "p1", name: "Dr. Elena Cortez, MD", specialty: "Internal Medicine", practice: "Rush-Copley Primary Care", distance: 1.8, rating: 4.7, reviews: 148, inNetwork: true, telehealth: true, nextAvailable: "2026-08-12", estimatedCost: 0, role: "Primary Care" },
    { id: "p2", name: "Dr. Michael Sun, MD", specialty: "Cardiology", practice: "Rush Heart & Vascular", distance: 3.2, rating: 4.9, reviews: 312, inNetwork: true, telehealth: true, nextAvailable: "2026-07-28", estimatedCost: 0, role: "Specialist" },
    { id: "p3", name: "Dr. Priya Ramamurthy, MD", specialty: "Nephrology", practice: "Kidney Specialists of IL", distance: 5.6, rating: 4.8, reviews: 96, inNetwork: true, telehealth: false, nextAvailable: "2026-08-19", estimatedCost: 0, role: "Referral" },
    { id: "p4", name: "Walgreens Pharmacy", specialty: "Pharmacy + Vaccines", practice: "Walgreens #4218", distance: 0.4, rating: 4.4, reviews: 88, inNetwork: true, telehealth: false, nextAvailable: "Walk-in", estimatedCost: 0, role: "Vaccines" },
  ],
  timeline: [
    { id: "t1", date: "2018-01-15", kind: "diagnosis", label: "Diagnosed: Hypertension", detail: "Dr. Cortez — starts Lisinopril" },
    { id: "t2", date: "2020-06-05", kind: "diagnosis", label: "Diagnosed: Type 2 Diabetes", detail: "HbA1c 7.8, starts Metformin" },
    { id: "t3", date: "2022-05-14", kind: "diagnosis", label: "Diagnosed: Atrial Fibrillation", detail: "Dr. Sun — starts Apixaban + Metoprolol" },
    { id: "t4", date: "2024-02-18", kind: "visit", label: "Hospital admission — Heart Failure", detail: "6 days, started Furosemide + Losartan" },
    { id: "t5", date: "2025-04-10", kind: "lab", label: "eGFR drops below 60 — CKD Stage 3", detail: "Renal referral placed" },
    { id: "t6", date: "2026-06-15", kind: "visit", label: "Cardiology follow-up", detail: "Echo shows EF 38% (stable)" },
    { id: "t7", date: "2026-07-10", kind: "lab", label: "Renal panel — eGFR 52", detail: "Continued decline" },
    { id: "t8", date: "2026-07-15", kind: "symptom", label: "New: fatigue climbing stairs", detail: "First HF decompensation signal" },
    { id: "t9", date: "2026-07-22", kind: "insight", label: "AI: HF decompensation flag raised", detail: "Weight + swelling + fatigue pattern" },
  ],
  upcomingAppointments: [
    { id: "a1", provider: "Dr. Michael Sun", specialty: "Cardiology", date: "2026-07-28", time: "9:00 AM", reason: "Follow-up for fluid overload", location: "Rush Heart & Vascular", prepReady: true },
    { id: "a2", provider: "Dr. Priya Ramamurthy", specialty: "Nephrology", date: "2026-08-19", time: "11:15 AM", reason: "CKD Stage 3 initial consult", location: "Kidney Specialists of IL", prepReady: false },
  ],
  wearable: {
    restingHeartRate: [72,74,76,78,72,74,80,78,82,76,74,72,80,84],
    sleepHours: [5.8,6.1,5.4,6.3,5.9,6.0,5.6,5.8,5.5,6.2,5.7,5.9,5.4,5.6],
    steps: [1820,2140,1620,2380,1970,1520,2210,1880,1710,2050,2280,1740,1580,1660],
    bpSystolic: [130,128,132,126,128,130,127,129,128,131,128,129,128,127],
  },
  chatSuggestions: [
    "Am I in heart failure decompensation?",
    "Is ibuprofen safe with my meds?",
    "Should I call my cardiologist today?",
    "What does my BNP number mean?",
    "Which of my meds are affected by my kidneys?",
  ],
  heroInsight: {
    tag: "Needs attention · Heart failure signal",
    title: "Fluid gain + fatigue may be early HF decompensation.",
    accentWord: "fluid gain + fatigue",
    accentColor: "var(--coral)",
    body: "You've gained 3 lbs this week, both ankles are swelling, and climbing stairs is suddenly hard — the exact pattern Dr. Sun asked you to watch for. Don't wait for your July 28 visit — call the nurse line today.",
  },
  quickStats: [
    { label: "Meds active", value: "7", hint: "3 cardiac" },
    { label: "eGFR", value: "52", hint: "Stage 3a CKD" },
    { label: "Interactions", value: "3", hint: "2 need action" },
  ],
};

const maya: PatientData = {
  id: "maya",
  patient: {
    name: "Maya Patel",
    age: 24,
    pronouns: "she/her",
    location: "Chicago, IL",
    primaryCare: "Dr. Rachel Kim, MD — Northwestern Primary Care",
    insurance: { plan: "BlueCross HMO 6900 (marketplace)", deductible: 6900, deductibleMet: 480, oopMax: 9100, oopMet: 620 },
  },
  personaBlurb: "Just diagnosed with PCOS, managing anxiety and migraine on a high-deductible plan.",
  personaColor: "var(--leaf)",
  conditions: [
    { id: "c1", name: "Polycystic Ovary Syndrome", since: "2026-05", status: "active", icd: "E28.2" },
    { id: "c2", name: "Generalized Anxiety Disorder", since: "2024-09", status: "active", icd: "F41.1" },
    { id: "c3", name: "Migraine without aura", since: "2025-03", status: "active", icd: "G43.009" },
    { id: "c4", name: "Vitamin D Deficiency", since: "2026-05", status: "monitoring", icd: "E55.9" },
  ],
  medications: [
    { id: "m1", name: "Metformin", brand: "Glucophage", dose: "500 mg", frequency: "twice daily", prescriber: "Dr. Kim", started: "2026-05-20", for: "PCOS — insulin resistance", adherence: 0.78, sideEffects: ["nausea", "diarrhea", "GI upset (early weeks)"], refillsLeft: 2, nextRefill: "2026-08-15" },
    { id: "m2", name: "Spironolactone", brand: "Aldactone", dose: "50 mg", frequency: "once daily", prescriber: "Dr. Kim", started: "2026-05-20", for: "PCOS — androgen blocking", adherence: 0.85, sideEffects: ["elevated potassium", "dizziness", "menstrual changes"], refillsLeft: 3, nextRefill: "2026-08-20" },
    { id: "m3", name: "Sertraline", brand: "Zoloft", dose: "100 mg", frequency: "once daily", prescriber: "Dr. Rivera (Psych)", started: "2024-10-05", for: "Anxiety", adherence: 0.92, sideEffects: ["GI upset early", "yawning", "sexual dysfunction"], refillsLeft: 4, nextRefill: "2026-09-05" },
    { id: "m4", name: "Sumatriptan", brand: "Imitrex", dose: "50 mg", frequency: "PRN for migraine", prescriber: "Dr. Kim", started: "2025-03-14", for: "Acute migraine", adherence: 1.0, sideEffects: ["flushing", "chest tightness", "drowsiness"], refillsLeft: 2, nextRefill: "2026-11-01" },
    { id: "m5", name: "Vitamin D3", brand: "OTC", dose: "4000 IU", frequency: "once daily", prescriber: "Dr. Kim", started: "2026-05-25", for: "Vitamin D deficiency", adherence: 0.65, sideEffects: [], refillsLeft: null, nextRefill: null },
  ],
  interactions: [
    { id: "i1", drugs: ["Spironolactone", "Potassium (high-K foods)"], severity: "moderate", plain: "Spironolactone raises potassium. Combined with a very potassium-heavy diet (banana + coconut water + spinach same day, per your logs), risk of hyperkalemia is real. Not urgent, but worth knowing.", action: "Spread high-K foods across days, not stacked." },
    { id: "i2", drugs: ["Sumatriptan", "Sertraline"], severity: "minor", plain: "Both act on serotonin. Serotonin syndrome risk is very low at your doses but exists. Symptoms to watch: agitation, sweating, muscle twitching, high temp after a triptan dose.", action: "If any of those symptoms appear within hours of Imitrex, stop and call Dr. Rivera." },
    { id: "i3", drugs: ["Metformin", "Alcohol"], severity: "minor", plain: "Heavy alcohol + metformin raises lactic acidosis risk. Occasional drinks are fine; binges are not.", action: "Cap at ≤ 2 drinks per occasion." },
  ],
  labs: [
    { id: "l1", name: "Fasting Glucose", value: 108, unit: "mg/dL", date: "2026-05-15", reference: "< 100", status: "above", trend: [98, 102, 108], trendDates: ["2024-06","2025-06","2026-05"] },
    { id: "l2", name: "HbA1c", value: 5.7, unit: "%", date: "2026-05-15", reference: "< 5.7", status: "monitor", trend: [5.2, 5.4, 5.7], trendDates: ["2024-06","2025-06","2026-05"] },
    { id: "l3", name: "Testosterone (free)", value: 8.2, unit: "pg/mL", date: "2026-05-15", reference: "0.5 – 6.5", status: "above", trend: [6.8, 7.4, 8.2], trendDates: ["2024-06","2025-06","2026-05"] },
    { id: "l4", name: "Vitamin D (25-OH)", value: 18, unit: "ng/mL", date: "2026-05-15", reference: "30 – 100", status: "below", trend: [22, 20, 18], trendDates: ["2024-06","2025-06","2026-05"] },
    { id: "l5", name: "TSH", value: 2.1, unit: "mIU/L", date: "2026-05-15", reference: "0.4 – 4.0", status: "normal", trend: [1.9, 2.0, 2.1], trendDates: ["2024-06","2025-06","2026-05"] },
    { id: "l6", name: "Potassium", value: 4.4, unit: "mEq/L", date: "2026-05-15", reference: "3.5 – 5.0", status: "normal", trend: [4.1, 4.2, 4.4], trendDates: ["2024-06","2025-06","2026-05"] },
  ],
  symptoms: [
    { id: "s1", date: "2026-07-22", region: "head", label: "Migraine, right side", severity: 7, notes: "Skipped lunch, only slept 5h" },
    { id: "s2", date: "2026-07-20", region: "stomach", label: "Nausea after metformin", severity: 4, notes: "Better if I take it with food" },
    { id: "s3", date: "2026-07-18", region: "general", label: "Anxiety spike before work meeting", severity: 5, notes: "" },
    { id: "s4", date: "2026-07-15", region: "head", label: "Tension headache", severity: 3, notes: "Screen fatigue day" },
    { id: "s5", date: "2026-07-10", region: "head", label: "Migraine", severity: 8, notes: "Skipped breakfast + long day" },
    { id: "s6", date: "2026-07-05", region: "general", label: "Fatigue, mid-cycle", severity: 4, notes: "" },
  ],
  documents: [
    { id: "d1", name: "PCOS Diagnostic Workup — Northwestern", type: "Consult Note", date: "2026-05-15", pages: 4, source: "MyChart", status: "processed" },
    { id: "d2", name: "Pelvic Ultrasound Report", type: "Imaging", date: "2026-05-08", pages: 2, source: "MyChart", status: "processed" },
    { id: "d3", name: "Metabolic + Hormone Panel", type: "Lab Report", date: "2026-05-15", pages: 5, source: "MyChart", status: "processed" },
    { id: "d4", name: "Therapy notes — Dr. Rivera", type: "Consult Note", date: "2026-06-20", pages: 1, source: "Uploaded PDF", status: "processed" },
    { id: "d5", name: "Marketplace EOB — Q2", type: "EOB", date: "2026-07-01", pages: 4, source: "Uploaded PDF", status: "processing" },
  ],
  insights: [
    { id: "in1", tag: "Symptom pattern", severity: "moderate", title: "Migraines strongly correlated with skipped meals + short sleep.", body: "Both of your July migraines followed a day where you slept < 6 hours AND skipped a meal. Tension headaches don't follow this pattern. This is worth mentioning to Dr. Kim — preventive migraine strategy could target both triggers.", sources: ["Your symptom log (past 60 days)", "Your sleep tracker", "Your meal log"], action: "Try: 3 meals/day + 7h sleep minimum for 2 weeks; log any change", date: "2026-07-22" },
    { id: "in2", tag: "Lab trend", severity: "moderate", title: "You're on the doorstep of prediabetes.", body: "Fasting glucose 108, HbA1c 5.7 — both are officially 'prediabetes'. Metformin is already helping, but PCOS + this trajectory means the next 12 months matter. Small-scale changes now (strength training, 20g protein at breakfast) have outsized effect at your age.", sources: ["Your labs 2024–2026", "ADA PCOS Standards 2026"], action: "Ask about a registered dietitian referral — covered under your plan", date: "2026-07-15" },
    { id: "in3", tag: "Cost saver", severity: "low", title: "Your Imitrex is $340 out of pocket — a generic saves ~$300.", body: "You're on high-deductible until you hit $6,420 more. Generic sumatriptan is $28 at Costco pharmacy without insurance. Ask Dr. Kim to switch the Rx label from brand to generic.", sources: ["Your pharmacy claim (July)", "GoodRx price comparison", "Your BlueCross plan detail"], action: "Text Dr. Kim to update the script", date: "2026-07-12" },
    { id: "in4", tag: "Interaction watch", severity: "minor", title: "Sumatriptan + Zoloft: know the syndrome signs.", body: "Not urgent — most people take these safely — but serotonin syndrome is real. If within a few hours of Imitrex you feel jittery, sweaty, or muscle-twitchy, stop and call.", sources: ["FDA drug label — sumatriptan", "AAN 2019 migraine guideline"], action: "Save this in your notes app", date: "2026-07-08" },
  ],
  providers: [
    { id: "p1", name: "Dr. Rachel Kim, MD", specialty: "Internal Medicine", practice: "Northwestern Primary Care", distance: 1.1, rating: 4.8, reviews: 224, inNetwork: true, telehealth: true, nextAvailable: "2026-08-06", estimatedCost: 90, role: "Primary Care" },
    { id: "p2", name: "Dr. Elena Rivera, PsyD", specialty: "Psychology", practice: "Lakeview Wellness", distance: 2.3, rating: 4.9, reviews: 87, inNetwork: true, telehealth: true, nextAvailable: "2026-07-30", estimatedCost: 45, role: "Therapy" },
    { id: "p3", name: "Alicia Nakamura, RD", specialty: "Registered Dietitian", practice: "Northwestern Nutrition", distance: 1.1, rating: 4.7, reviews: 42, inNetwork: true, telehealth: true, nextAvailable: "2026-08-02", estimatedCost: 0, role: "Referral" },
    { id: "p4", name: "Costco Pharmacy", specialty: "Pharmacy", practice: "Costco #248", distance: 4.8, rating: 4.5, reviews: 130, inNetwork: false, telehealth: false, nextAvailable: "Walk-in", estimatedCost: 0, role: "Rx savings" },
  ],
  timeline: [
    { id: "t1", date: "2024-09-08", kind: "diagnosis", label: "Diagnosed: Generalized Anxiety Disorder", detail: "Dr. Rivera — starts CBT" },
    { id: "t2", date: "2024-10-05", kind: "medication", label: "Started Sertraline 50mg", detail: "For anxiety" },
    { id: "t3", date: "2025-03-14", kind: "diagnosis", label: "Diagnosed: Migraine without aura", detail: "First triptan Rx" },
    { id: "t4", date: "2026-05-08", kind: "visit", label: "Pelvic ultrasound — polycystic ovaries", detail: "Bilateral, confirming PCOS" },
    { id: "t5", date: "2026-05-15", kind: "diagnosis", label: "Diagnosed: PCOS", detail: "Starts Metformin + Spironolactone" },
    { id: "t6", date: "2026-06-20", kind: "visit", label: "Therapy session — Dr. Rivera", detail: "Discussed PCOS impact on mental health" },
    { id: "t7", date: "2026-07-10", kind: "symptom", label: "Bad migraine", detail: "8/10 severity" },
    { id: "t8", date: "2026-07-22", kind: "insight", label: "AI: Migraine trigger pattern found", detail: "Meals + sleep" },
  ],
  upcomingAppointments: [
    { id: "a1", provider: "Dr. Elena Rivera", specialty: "Psychology", date: "2026-07-30", time: "6:00 PM", reason: "Regular therapy check-in", location: "Lakeview Wellness (telehealth)", prepReady: true },
    { id: "a2", provider: "Alicia Nakamura, RD", specialty: "Registered Dietitian", date: "2026-08-02", time: "12:30 PM", reason: "PCOS nutrition consult", location: "Northwestern Nutrition (telehealth)", prepReady: false },
  ],
  wearable: {
    restingHeartRate: [62,64,63,65,66,64,65,63,64,66,65,64,63,65],
    sleepHours: [5.4,6.1,7.0,4.8,6.8,7.2,5.5,6.3,7.4,5.1,6.6,7.0,5.9,6.4],
    steps: [7820,8940,6210,9410,7580,10200,4820,8130,9600,7420,8580,10310,7280,8940],
    bpSystolic: [116,118,115,120,117,118,116,119,118,117,116,119,117,118],
  },
  chatSuggestions: [
    "What triggers my migraines?",
    "Am I actually prediabetic?",
    "How can I lower my Imitrex cost?",
    "Is Spironolactone safe with my diet?",
    "What should I ask my dietitian?",
  ],
  heroInsight: {
    tag: "Symptom pattern found",
    title: "Your migraines follow skipped meals + short sleep.",
    accentWord: "skipped meals + short sleep",
    accentColor: "var(--teal)",
    body: "Both July migraines came after a night under 6 hours of sleep AND a skipped meal. Tension headaches don't follow this pattern. Preventive strategy could target both.",
  },
  quickStats: [
    { label: "Records", value: "18", hint: "since PCOS Dx" },
    { label: "OOP left", value: "$8,480", hint: "high-deductible plan" },
    { label: "Trigger match", value: "2 of 2", hint: "migraines this month" },
  ],
};

export const patients: Record<PatientId, PatientData> = { sarah, james, maya };

export const patientList: { id: PatientId; name: string; blurb: string }[] = [
  { id: "sarah", name: "Sarah Chen", blurb: "42 · chronic disease · 3 specialists" },
  { id: "james", name: "James Whitmore", blurb: "68 · cardiac + CKD · Medicare" },
  { id: "maya", name: "Maya Patel", blurb: "24 · new PCOS Dx · marketplace plan" },
];

export async function getActivePatient(): Promise<PatientData> {
  const store = await cookies();
  const id = (store.get("carenova-patient")?.value as PatientId) || "sarah";
  return patients[id] ?? patients.sarah;
}
