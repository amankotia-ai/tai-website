import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { OPEN_DEMO_BOOKING_MODAL_EVENT } from '../utils/demoBookingModal';

type FormState = {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  phone: string;
  role: string;
  primaryGoal: string;
};

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  workEmail: '',
  company: '',
  phone: '',
  role: '',
  primaryGoal: '',
};

const weekdayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM'] as const;

function getStartOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getStartOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSelectableDate(date: Date) {
  const today = getStartOfDay(new Date());
  const day = date.getDay();
  return date >= today && day !== 0 && day !== 6;
}

function findFirstAvailableDate(month: Date) {
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day += 1) {
    const candidate = new Date(month.getFullYear(), month.getMonth(), day);
    if (isSelectableDate(candidate)) return candidate;
  }
  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  return findFirstAvailableDate(nextMonth);
}

function formatMonth(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

type StepHeaderProps = {
  isActive: boolean;
  isDone: boolean;
  number: 1 | 2;
  label: string;
};

function StepHeader({ isActive, isDone, number, label }: StepHeaderProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium tracking-tight transition-colors
          ${isDone || isActive ? 'bg-[#D61D1F] text-white' : 'bg-[#F5F5F5] text-[#9CA3AF]'}`}
      >
        {isDone ? (
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-3" aria-hidden="true">
            <path fillRule="evenodd" d="M16.704 5.29a.75.75 0 010 1.06l-7.07 7.07a.75.75 0 01-1.06 0L3.296 8.143a.75.75 0 011.06-1.06l4.748 4.747 6.54-6.54a.75.75 0 011.06 0z" clipRule="evenodd" />
          </svg>
        ) : (
          number
        )}
      </span>
      <p
        className={`text-[13px] font-medium tracking-[-0.01em] transition-colors
          ${isActive ? 'text-[#111111]' : 'text-[#9CA3AF]'}`}
      >
        {label}
      </p>
    </div>
  );
}

/* ── Shared field wrapper ── */
function FieldLabel({ children, label, error }: { children: React.ReactNode; label: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-[#374151] tracking-[-0.01em]">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-[11px] text-[#D61D1F]">{error}</span>
      ) : null}
    </label>
  );
}

const inputBase =
  'w-full rounded-[10px] border bg-white px-3 py-2 text-[13px] font-normal text-[#111111] tracking-[-0.01em] outline-none placeholder:text-[#C4C9D3] transition-colors';
const inputNormal = 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#D61D1F] focus:shadow-[0_0_0_3px_rgba(214,29,31,0.08)]';
const inputError = 'border-[#D61D1F] focus:border-[#D61D1F] focus:shadow-[0_0_0_3px_rgba(214,29,31,0.08)]';

export default function DemoBookingModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(() => findFirstAvailableDate(getStartOfMonth(new Date())));
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [visibleMonth, setVisibleMonth] = useState<Date>(() => getStartOfMonth(new Date()));
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
    setIsConfirmed(false);
    setSelectedTime('');
    setErrors({});
  };

  const openModal = () => {
    const firstAvailableDate = findFirstAvailableDate(getStartOfMonth(new Date()));
    setVisibleMonth(getStartOfMonth(firstAvailableDate));
    setSelectedDate(firstAvailableDate);
    setSelectedTime('');
    setForm(initialFormState);
    setStep(1);
    setIsConfirmed(false);
    setIsOpen(true);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleOpen = () => openModal();
    window.addEventListener(OPEN_DEMO_BOOKING_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_DEMO_BOOKING_MODAL_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [isOpen]);

  const calendarCells = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const mondayOffset = (firstDay + 6) % 7;

    const cells: Array<Date | null> = [];
    for (let i = 0; i < mondayOffset; i += 1) cells.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }
    return cells;
  }, [visibleMonth]);

  const stepOneReady = useMemo(() => {
    if (!form.firstName.trim()) return false;
    if (!form.lastName.trim()) return false;
    if (!form.workEmail.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) return false;
    if (!form.company.trim()) return false;
    if (!form.role.trim()) return false;
    if (!form.primaryGoal.trim()) return false;
    return true;
  }, [form]);

  const validateStepOne = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!form.workEmail.trim()) nextErrors.workEmail = 'Work email is required.';
    if (form.workEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) nextErrors.workEmail = 'Enter a valid email.';
    if (!form.company.trim()) nextErrors.company = 'Company is required.';
    if (!form.role.trim()) nextErrors.role = 'Select a role.';
    if (!form.primaryGoal.trim()) nextErrors.primaryGoal = 'Select a primary goal.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToStepTwo = async () => {
    if (!validateStepOne()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          workEmail: form.workEmail,
          company: form.company,
          phone: form.phone,
          role: form.role,
          primaryGoal: form.primaryGoal,
        }),
      });
      if (!res.ok) throw new Error('Submit failed');
      setStep(2);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime) return;
    setIsConfirmed(true);
  };

  const onFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onChangeMonth = (direction: 'prev' | 'next') => {
    setVisibleMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + (direction === 'next' ? 1 : -1), 1));
  };

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.38)] p-4 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-label="Get a demo"
    >
      {/* Backdrop close */}
      <button type="button" aria-label="Close modal backdrop" className="absolute inset-0" onClick={closeModal} />

      {/* Modal card */}
      <div
        className={`relative z-10 w-full overflow-hidden rounded-[22px] border border-[#EBEBEB] bg-white shadow-[0_24px_64px_rgba(15,23,42,0.18)] transition-all
          ${step === 2 ? 'max-w-[660px]' : 'max-w-[480px]'}`}
      >
        {/* ── Top bar: stepper + close ── */}
        <div className="flex items-center justify-between border-b border-[#F0F0F0] bg-[#FAFAFA] px-5 py-3.5">
          <div className="flex items-center gap-3">
            <StepHeader isActive={step === 1} isDone={step === 2 || isConfirmed} number={1} label="Your details" />
            {/* connector */}
            <span className="h-px w-6 shrink-0 rounded-full bg-[#ECECEC]" />
            <StepHeader isActive={step === 2 || isConfirmed} isDone={isConfirmed} number={2} label="Pick a time" />
          </div>
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close demo booking"
            className="inline-flex size-7 items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-[#F3F3F3] hover:text-[#111111]"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-[14px]" aria-hidden="true">
              <path fillRule="evenodd" d="M4.22 4.22a.75.75 0 011.06 0L10 8.94l4.72-4.72a.75.75 0 011.06 1.06L11.06 10l4.72 4.72a.75.75 0 11-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 11-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* ── Confirmed state ── */}
        {isConfirmed ? (
          <div className="px-6 py-7">
            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[rgba(214,29,31,0.09)]">
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 text-[#D61D1F]" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 5.29a.75.75 0 010 1.06l-7.07 7.07a.75.75 0 01-1.06 0L3.296 8.143a.75.75 0 011.06-1.06l4.748 4.747 6.54-6.54a.75.75 0 011.06 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-[20px] font-medium tracking-[-0.02em] text-[#111111]">You're booked.</h3>
            <p className="mt-2 max-w-[380px] text-[14px] leading-6 text-[#4B5563]">
              Thanks {form.firstName}. Your demo is scheduled for <strong className="font-medium text-[#111111]">{formatDate(selectedDate)}</strong> at <strong className="font-medium text-[#111111]">{selectedTime}</strong>. We'll send a calendar invite to {form.workEmail}.
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-5 rounded-full bg-[#D61D1F] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#BF181A] transition-colors"
            >
              Done
            </button>
          </div>

        ) : step === 1 ? (
          /* ── Step 1: Contact details ── */
          <div className="px-6 py-6">
            <h3 className="font-['Inter'] text-[20px] font-medium tracking-[-0.02em] text-[#111111]">Tell us about your team</h3>
            <p className="mt-1.5 text-[14px] leading-6 text-[#4B5563]">
              A few details helps us tailor the demo to you.
            </p>

            <div className="mt-5 grid gap-3.5">
              {/* Name row */}
              <div className="grid gap-3 md:grid-cols-2">
                <FieldLabel label="First name" error={errors.firstName}>
                  <input
                    value={form.firstName}
                    onChange={(e) => onFieldChange('firstName', e.target.value)}
                    placeholder="Jane"
                    className={`${inputBase} ${errors.firstName ? inputError : inputNormal}`}
                  />
                </FieldLabel>
                <FieldLabel label="Last name" error={errors.lastName}>
                  <input
                    value={form.lastName}
                    onChange={(e) => onFieldChange('lastName', e.target.value)}
                    placeholder="Doe"
                    className={`${inputBase} ${errors.lastName ? inputError : inputNormal}`}
                  />
                </FieldLabel>
              </div>

              {/* Work email */}
              <FieldLabel label="Work email" error={errors.workEmail}>
                <input
                  type="email"
                  value={form.workEmail}
                  onChange={(e) => onFieldChange('workEmail', e.target.value)}
                  placeholder="jane@company.com"
                  className={`${inputBase} ${errors.workEmail ? inputError : inputNormal}`}
                />
              </FieldLabel>

              {/* Company */}
              <FieldLabel label="Company" error={errors.company}>
                <input
                  value={form.company}
                  onChange={(e) => onFieldChange('company', e.target.value)}
                  placeholder="Acme Inc."
                  className={`${inputBase} ${errors.company ? inputError : inputNormal}`}
                />
              </FieldLabel>

              {/* Role + Goal row */}
              <div className="grid gap-3 md:grid-cols-2">
                <FieldLabel label="Role" error={errors.role}>
                  <select
                    value={form.role}
                    onChange={(e) => onFieldChange('role', e.target.value)}
                    className={`${inputBase} ${errors.role ? inputError : inputNormal} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239CA3AF'%3E%3Cpath fill-rule='evenodd' d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E")] bg-[length:18px_18px] bg-no-repeat bg-[right_10px_center] pr-9`}
                  >
                    <option value="">Select role</option>
                    <option value="actor">Actor / Talent</option>
                    <option value="studio">Studio / Producer</option>
                    <option value="agency">Agency / Management</option>
                    <option value="legal">Legal / Business Affairs</option>
                  </select>
                </FieldLabel>
                <FieldLabel label="Primary goal" error={errors.primaryGoal}>
                  <select
                    value={form.primaryGoal}
                    onChange={(e) => onFieldChange('primaryGoal', e.target.value)}
                    className={`${inputBase} ${errors.primaryGoal ? inputError : inputNormal} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239CA3AF'%3E%3Cpath fill-rule='evenodd' d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E")] bg-[length:18px_18px] bg-no-repeat bg-[right_10px_center] pr-9`}
                  >
                    <option value="">Select use case</option>
                    <option value="castid">CastID verification</option>
                    <option value="licensing">Licensing workflows</option>
                    <option value="consent">Consent and compliance</option>
                    <option value="payments">Payments and settlement</option>
                  </select>
                </FieldLabel>
              </div>

              {/* Phone */}
              <FieldLabel label="Phone (optional)">
                <input
                  value={form.phone}
                  onChange={(e) => onFieldChange('phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={`${inputBase} ${inputNormal}`}
                />
              </FieldLabel>
            </div>

            {submitError && (
              <p className="mt-3 text-[12px] text-[#D61D1F]">{submitError}</p>
            )}
            <button
              type="button"
              onClick={goToStepTwo}
              disabled={!stepOneReady || isSubmitting}
              className={`mt-3 w-full rounded-full py-2.5 text-[14px] font-medium text-white tracking-[-0.01em] transition-colors
                ${stepOneReady && !isSubmitting ? 'bg-[#D61D1F] hover:bg-[#BF181A]' : 'bg-[#D61D1F]/40 cursor-not-allowed'}`}
            >
              {isSubmitting ? 'Saving…' : 'Continue →'}
            </button>
          </div>

        ) : (
          /* ── Step 2: Pick a time ── */
          <div className="px-6 pb-6 pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] font-medium text-[#4B5563] transition-colors hover:bg-[#F5F5F5] hover:text-[#111111]"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5" aria-hidden="true">
                <path fillRule="evenodd" d="M11.78 4.22a.75.75 0 010 1.06L7.06 10l4.72 4.72a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clipRule="evenodd" />
              </svg>
              Back
            </button>

            <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_200px]">
              {/* Calendar */}
              <div className="rounded-[14px] border border-[#EBEBEB] bg-white p-4">
                {/* Month nav */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onChangeMonth('prev')}
                    className="rounded-full p-1.5 text-[#9CA3AF] transition-colors hover:bg-[#F5F5F5] hover:text-[#111111]"
                    aria-label="Previous month"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                      <path fillRule="evenodd" d="M11.78 4.22a.75.75 0 010 1.06L7.06 10l4.72 4.72a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-[13px] font-medium tracking-[-0.01em] text-[#111111]">{formatMonth(visibleMonth)}</p>
                  <button
                    type="button"
                    onClick={() => onChangeMonth('next')}
                    className="rounded-full p-1.5 text-[#9CA3AF] transition-colors hover:bg-[#F5F5F5] hover:text-[#111111]"
                    aria-label="Next month"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                      <path fillRule="evenodd" d="M8.22 15.78a.75.75 0 010-1.06L12.94 10 8.22 5.28a.75.75 0 111.06-1.06l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 01-1.06 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Day grid */}
                <div className="mt-3 grid grid-cols-7 gap-1 text-center">
                  {weekdayLabels.map((label) => (
                    <p key={label} className="pb-1 text-[11px] font-medium tracking-wide text-[#9CA3AF]">{label}</p>
                  ))}
                  {calendarCells.map((date, index) => {
                    if (!date) return <div key={`empty-${index}`} className="h-7" />;

                    const disabled = !isSelectableDate(date);
                    const isSelected =
                      date.getFullYear() === selectedDate.getFullYear() &&
                      date.getMonth() === selectedDate.getMonth() &&
                      date.getDate() === selectedDate.getDate();

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime('');
                        }}
                        className={`h-7 rounded-[8px] text-[12px] font-medium tracking-[-0.01em] transition-colors
                          ${isSelected
                            ? 'bg-[#D61D1F] text-white'
                            : disabled
                              ? 'text-[#D1D5DB] cursor-default'
                              : 'text-[#111111] hover:bg-[rgba(214,29,31,0.08)]'
                          }`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div className="rounded-[14px] border border-[#EBEBEB] bg-white p-3">
                <p className="mb-2.5 px-1 text-[12px] font-medium tracking-[-0.01em] text-[#111111]">{formatDate(selectedDate)}</p>
                <div className="space-y-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`w-full rounded-[10px] border px-3 py-2 text-[12px] font-medium tracking-[-0.01em] transition-colors
                        ${selectedTime === slot
                          ? 'border-[#D61D1F] bg-[rgba(214,29,31,0.07)] text-[#D61D1F]'
                          : 'border-[#EBEBEB] bg-[#FAFAFA] text-[#374151] hover:border-[#D61D1F]/30 hover:bg-[rgba(214,29,31,0.04)]'
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={confirmBooking}
              disabled={!selectedTime}
              className={`mt-5 w-full rounded-full py-2.5 text-[14px] font-medium text-white tracking-[-0.01em] transition-colors
                ${selectedTime ? 'bg-[#D61D1F] hover:bg-[#BF181A]' : 'bg-[#D61D1F]/40 cursor-not-allowed'}`}
            >
              Confirm booking
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
