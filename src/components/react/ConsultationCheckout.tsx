import { useState } from 'react';
import {
  Clock, User, MapPin, Phone, Mail, FileText,
  CheckCircle, ChevronRight, ChevronLeft, Calendar,
  Shield, Star, Zap, ArrowRight, MessageSquare
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  requirements: string;
  preferredDate: string;
  preferredTime: string;
}

interface DurationOption {
  hours: number;
  label: string;
  price: number;
  badge?: string;
  description: string;
  features: string[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const RATE_PER_HOUR = 2000;

const DURATION_OPTIONS: DurationOption[] = [
  {
    hours: 1,
    label: '1 Hour',
    price: 2000,
    description: 'Quick consultation for focused questions and brief solution scoping.',
    features: [
      'Problem diagnosis & advice',
      'Technology recommendation',
      'Q&A session',
      'Summary email after meeting',
    ],
  },
  {
    hours: 2,
    label: '2 Hours',
    price: 4000,
    badge: 'Most Popular',
    description: 'In-depth session for requirement analysis and solution design.',
    features: [
      'Everything in 1-hour',
      'Detailed requirement analysis',
      'Solution architecture overview',
      'Effort & cost estimation',
      'Roadmap discussion',
    ],
  },
  {
    hours: 4,
    label: '4 Hours',
    price: 8000,
    badge: 'Best Value',
    description: 'Full discovery workshop for complex projects and end-to-end planning.',
    features: [
      'Everything in 2-hour',
      'Full project discovery workshop',
      'Tech stack recommendation',
      'Detailed project breakdown',
      'Milestone & sprint planning',
      'Written proposal draft',
    ],
  },
];

const TIME_SLOTS = [
  '9:00 AM – 10:00 AM',
  '10:00 AM – 11:00 AM',
  '11:00 AM – 12:00 PM',
  '1:00 PM – 2:00 PM',
  '2:00 PM – 3:00 PM',
  '3:00 PM – 4:00 PM',
  '4:00 PM – 5:00 PM',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const getTodayDateString = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // min tomorrow
  return today.toISOString().split('T')[0];
};

// ─── Step Indicator ──────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  const steps = ['Choose Package', 'Your Details', 'Review & Pay'];
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => {
        const num = i + 1;
        const isActive = num === step;
        const isDone = num < step;
        return (
          <div key={num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isDone
                    ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                    : isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-4 ring-blue-100'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle className="w-5 h-5" /> : num}
              </div>
              <span className={`text-xs mt-1.5 font-medium whitespace-nowrap hidden sm:block ${
                isActive ? 'text-blue-600' : isDone ? 'text-green-600' : 'text-slate-400'
              }`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 sm:mb-0 transition-all ${isDone ? 'bg-green-400' : 'bg-slate-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Package Selection ───────────────────────────────────────────────

function PackageStep({
  selected,
  onSelect,
  onNext,
}: {
  selected: number;
  onSelect: (h: number) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Choose Your Consultation Package</h2>
        <p className="text-slate-500 mt-2">All sessions are conducted via video call. Rate: {formatCurrency(RATE_PER_HOUR)}/hour</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {DURATION_OPTIONS.map((opt) => {
          const isSelected = selected === opt.hours;
          return (
            <button
              key={opt.hours}
              onClick={() => onSelect(opt.hours)}
              className={`relative text-left rounded-2xl border-2 p-6 transition-all hover:shadow-md focus:outline-none ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              {opt.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                  opt.badge === 'Most Popular' ? 'bg-blue-600 text-white' : 'bg-amber-400 text-amber-900'
                }`}>
                  {opt.badge}
                </span>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isSelected ? 'bg-blue-600' : 'bg-slate-100'}`}>
                <Clock className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
              </div>

              <div className="mb-1">
                <span className="text-2xl font-bold text-slate-900">{opt.label}</span>
              </div>
              <div className="text-3xl font-extrabold text-blue-600 mb-3">
                {formatCurrency(opt.price)}
              </div>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{opt.description}</p>

              <ul className="space-y-2">
                {opt.features.map((f) => (
                  <li key={f} className="flex items-start text-sm text-slate-600 gap-2">
                    <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-blue-500' : 'text-green-500'}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {isSelected && (
                <div className="mt-4 py-2 bg-blue-600 text-white text-sm font-semibold text-center rounded-lg">
                  ✓ Selected
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-500">
        <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-green-500" />Secure Payment</div>
        <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400" />Expert Consultants</div>
        <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-blue-500" />Instant Booking</div>
        <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-teal-500" />Free Reschedule</div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selected}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Continue to Details
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Customer Details ─────────────────────────────────────────────────

function DetailsStep({
  data,
  onChange,
  onNext,
  onBack,
  selectedHours,
}: {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  selectedHours: number;
}) {
  const opt = DURATION_OPTIONS.find((o) => o.hours === selectedHours)!;

  const isValid =
    data.name.trim() &&
    data.email.trim() &&
    data.phone.trim() &&
    data.address.trim() &&
    data.city.trim() &&
    data.requirements.trim() &&
    data.preferredDate &&
    data.preferredTime;

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all placeholder:text-slate-400';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Enter Your Details</h2>
        <p className="text-slate-500 mt-2">We'll use these to confirm your booking and send meeting details.</p>
      </div>

      {/* Selected package summary bar */}
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-blue-800">{opt.label} Consultation</div>
            <div className="text-xs text-blue-500">Package selected</div>
          </div>
        </div>
        <div className="text-xl font-extrabold text-blue-700">{formatCurrency(opt.price)}</div>
      </div>

      <div className="space-y-5">
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={data.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="Your full name"
                className={`${inputClass} pl-10`}
                required
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="email"
                value={data.email}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="you@example.com"
                className={`${inputClass} pl-10`}
                required
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Mobile Number <span className="text-red-500">*</span></label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
              <span className="text-sm font-medium text-slate-500">🇮🇳 +91</span>
            </div>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="98765 43210"
              className={`${inputClass} pl-16`}
              maxLength={10}
              required
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">10-digit Indian mobile number. Used for booking confirmation via WhatsApp/SMS.</p>
        </div>

        {/* Address */}
        <div>
          <label className={labelClass}>Street Address <span className="text-red-500">*</span></label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={data.address}
              onChange={(e) => onChange('address', e.target.value)}
              placeholder="House No., Street, Area"
              className={`${inputClass} pl-10`}
              required
            />
          </div>
        </div>

        {/* City + Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>City <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => onChange('city', e.target.value)}
              placeholder="e.g. Chennai"
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>PIN Code</label>
            <input
              type="text"
              value={data.pincode}
              onChange={(e) => onChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="6-digit PIN code"
              className={inputClass}
              maxLength={6}
            />
          </div>
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Preferred Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={data.preferredDate}
                onChange={(e) => onChange('preferredDate', e.target.value)}
                min={getTodayDateString()}
                className={`${inputClass} pl-10`}
                required
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Preferred Time Slot <span className="text-red-500">*</span></label>
            <select
              value={data.preferredTime}
              onChange={(e) => onChange('preferredTime', e.target.value)}
              className={`${inputClass} bg-white`}
              required
            >
              <option value="" disabled>Select a time slot</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              What do you want to discuss? <span className="text-red-500">*</span>
            </span>
          </label>
          <textarea
            value={data.requirements}
            onChange={(e) => onChange('requirements', e.target.value)}
            rows={4}
            placeholder="Briefly describe your project, the challenges you're facing, or the questions you'd like answered in this consultation session..."
            className={`${inputClass} resize-none`}
            required
          />
          <p className="text-xs text-slate-400 mt-1">This helps our consultant prepare for the session in advance.</p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Review Order
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Review & Pay ─────────────────────────────────────────────────────

function ReviewStep({
  data,
  selectedHours,
  onBack,
  onConfirm,
  paying,
}: {
  data: FormData;
  selectedHours: number;
  onBack: () => void;
  onConfirm: () => void;
  paying: boolean;
}) {
  const opt = DURATION_OPTIONS.find((o) => o.hours === selectedHours)!;
  const gst = Math.round(opt.price * 0.18);
  const total = opt.price + gst;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Review Your Booking</h2>
        <p className="text-slate-500 mt-2">Please confirm your details before proceeding to payment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: details summary */}
        <div className="lg:col-span-3 space-y-4">
          {/* Package */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Consultation Package</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{opt.label} Consultation</div>
                  <div className="text-sm text-slate-500">Video call via Google Meet / Zoom</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800">{formatCurrency(opt.price)}</div>
                <div className="text-xs text-slate-400">{formatCurrency(RATE_PER_HOUR)}/hr</div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Session Schedule</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-400 mb-1">Preferred Date</div>
                <div className="font-semibold text-slate-800">{data.preferredDate}</div>
              </div>
              <div>
                <div className="text-slate-400 mb-1">Time Slot</div>
                <div className="font-semibold text-slate-800">{data.preferredTime}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-slate-400 text-sm mb-1">Topic / Requirements</div>
              <div className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 leading-relaxed">{data.requirements}</div>
            </div>
          </div>

          {/* Client details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Your Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700 font-medium">{data.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700">{data.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700">+91 {data.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-700">{data.city}{data.pincode ? ` – ${data.pincode}` : ''}</span>
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-500">
              <MapPin className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
              {data.address}, {data.city}{data.pincode ? ` – ${data.pincode}` : ''}
            </div>
          </div>
        </div>

        {/* Right: price summary */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-2xl p-6 sticky top-6 text-white">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-5">Order Summary</h3>

            <div className="space-y-3 text-sm border-b border-slate-700 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-300">Consultation ({opt.hours}hr)</span>
                <span className="font-medium">{formatCurrency(opt.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">GST @ 18%</span>
                <span className="font-medium">{formatCurrency(gst)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-base font-bold text-white">Total Payable</span>
              <span className="text-2xl font-extrabold text-blue-400">{formatCurrency(total)}</span>
            </div>

            {/* Pay via Paytm */}
            <button
              onClick={onConfirm}
              disabled={paying}
              className="w-full flex items-center justify-center gap-3 bg-[#00BAF2] hover:bg-[#00a8dc] disabled:opacity-70 text-white font-bold py-4 rounded-xl text-base shadow-lg transition-all"
            >
              {paying ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Redirecting to Paytm...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 48 48" className="w-6 h-6" fill="currentColor">
                    <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm-2 28l-8-8 2.8-2.8L22 26.4l9.2-9.2L34 20l-12 12z"/>
                  </svg>
                  Pay {formatCurrency(total)} via Paytm
                </>
              )}
            </button>

            <p className="text-xs text-slate-500 text-center mt-3 leading-relaxed">
              By paying, you agree to our{' '}
              <a href="/terms_condition" className="text-blue-400 hover:underline">Terms &amp; Conditions</a>{' '}
              and{' '}
              <a href="/refund_policy" className="text-blue-400 hover:underline">Refund Policy</a>.
            </p>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-green-400" />
              256-bit SSL Secured · Powered by Paytm
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start mt-6">
        <button
          onClick={onBack}
          disabled={paying}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Edit Details
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Booking Confirmed ────────────────────────────────────────────────

function ConfirmedStep({ data, selectedHours }: { data: FormData; selectedHours: number }) {
  const opt = DURATION_OPTIONS.find((o) => o.hours === selectedHours)!;
  const bookingRef = `SABI-${Date.now().toString().slice(-6)}`;

  return (
    <div className="text-center py-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
      <p className="text-slate-500 mb-1">Thank you, <strong className="text-slate-700">{data.name}</strong>!</p>
      <p className="text-slate-500 mb-8">A confirmation has been sent to <strong className="text-slate-700">{data.email}</strong> and <strong className="text-slate-700">+91 {data.phone}</strong>.</p>

      <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-left">
        <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-4">Booking Summary</div>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-500">Booking Reference</span>
            <span className="font-mono font-bold text-green-700">{bookingRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Package</span>
            <span className="font-semibold">{opt.label} Consultation</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date</span>
            <span className="font-semibold">{data.preferredDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Time Slot</span>
            <span className="font-semibold">{data.preferredTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount Paid</span>
            <span className="font-bold text-green-700">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(opt.price + Math.round(opt.price * 0.18))}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 max-w-md mx-auto mb-8 text-sm text-slate-600 leading-relaxed text-left">
        <div className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4" /> What happens next?
        </div>
        <ol className="space-y-2 list-decimal list-outside ml-4">
          <li>Our team will review your booking and requirements within <strong>2 business hours</strong>.</li>
          <li>You'll receive a <strong>Google Meet / Zoom link</strong> via email and WhatsApp before the session.</li>
          <li>Your consultant will prepare a personalised agenda based on your requirements.</li>
          <li>Join the call on time and make the most of your session!</li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all"
        >
          Back to Home
        </a>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all"
        >
          Contact Us
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ConsultationCheckout() {
  const [step, setStep] = useState(1);
  const [selectedHours, setSelectedHours] = useState(0);
  const [paying, setPaying] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    requirements: '',
    preferredDate: '',
    preferredTime: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    setPaying(true);
    // In production: call your backend to generate Paytm order token,
    // then invoke window.Paytm.CheckoutJS or redirect to Paytm payment URL.
    // For demo/review: simulate redirect delay then show confirmation.
    setTimeout(() => {
      setPaying(false);
      setStep(4);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10">
        {step < 4 && <StepIndicator step={step} />}

        {step === 1 && (
          <PackageStep
            selected={selectedHours}
            onSelect={setSelectedHours}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <DetailsStep
            data={formData}
            onChange={updateField}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            selectedHours={selectedHours}
          />
        )}
        {step === 3 && (
          <ReviewStep
            data={formData}
            selectedHours={selectedHours}
            onBack={() => setStep(2)}
            onConfirm={handlePayment}
            paying={paying}
          />
        )}
        {step === 4 && (
          <ConfirmedStep data={formData} selectedHours={selectedHours} />
        )}
      </div>
    </div>
  );
}
