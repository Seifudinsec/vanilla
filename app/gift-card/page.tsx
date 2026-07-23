'use client';

import { useState, FormEvent, useId } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function GiftCardPage() {
  // Amount States
  const [amountMode, setAmountMode] = useState<'preset' | 'custom'>('preset');
  const [presetAmount, setPresetAmount] = useState<number>(2000);
  const [customAmount, setCustomAmount] = useState<string>('');

  // Personal Message State
  const [personalMessage, setPersonalMessage] = useState<string>('');

  // Recipient Details States
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [recipientPhone, setRecipientPhone] = useState<string>('');

  // Your Details States
  const [yourName, setYourName] = useState<string>('');
  const [yourEmail, setYourEmail] = useState<string>('');

  // Delivery Date States
  const [deliveryDateMode, setDeliveryDateMode] = useState<'now' | 'later'>('now');
  const [deliveryDate, setDeliveryDate] = useState<string>('');

  // Mobile Accordion Step (1 to 4)
  const [activeMobileStep, setActiveMobileStep] = useState<number>(1);

  // Submission State
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Helper: Active Gift Card Value
  const getActiveAmount = (): number => {
    if (amountMode === 'custom') {
      const parsed = parseFloat(customAmount);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return presetAmount;
  };

  // Helper: Format Currency
  const formatCurrency = (val: number): string => {
    return `KES ${val.toLocaleString('en-US')}`;
  };

  // Preset Options
  const presets = [1000, 2000, 3000, 5000];

  // Mobile Accordion Toggle
  const toggleStep = (stepNum: number) => {
    setActiveMobileStep(activeMobileStep === stepNum ? 0 : stepNum);
  };

  // Validation
  const validateForm = (): string => {
    const amount = getActiveAmount();
    if (amount < 500 || amount > 50000) {
      return 'Please select or enter a valid amount (KES 500 – 50,000).';
    }
    if (!recipientName.trim()) {
      return "Please enter the recipient's name.";
    }
    if (!recipientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      return 'Please enter a valid recipient email address.';
    }
    if (!recipientPhone.trim() || recipientPhone.replace(/\D/g, '').length < 9) {
      return 'Please enter a valid WhatsApp number.';
    }
    if (!yourName.trim()) {
      return 'Please enter your name.';
    }
    if (!yourEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(yourEmail)) {
      return 'Please enter a valid email address.';
    }
    if (deliveryDateMode === 'later' && !deliveryDate) {
      return 'Please choose a delivery date.';
    }
    return '';
  };

  // Form Submit Handler
  const handleProceed = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1800);
  };

  // Icons
  const Icons = {
    Gift: () => (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    Users: () => (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    User: () => (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    Calendar: () => (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    Eye: () => (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    ChevronDown: ({ className }: { className?: string }) => (
      <svg className={className} width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
    Lock: () => (
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    WhatsApp: () => (
      <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.503 4.94 1.505 5.548 0 10.064-4.512 10.068-10.066.002-2.69-1.043-5.22-2.943-7.12S14.39 3.01 11.702 3.01c-5.552 0-10.069 4.513-10.073 10.067-.001 1.887.494 3.73 1.433 5.372L1.968 22.07l3.8-1.246c1.378.75 2.784 1.33 4.879 1.33zm11.233-7.518c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.488-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.492-.51-.675-.52-.172-.007-.368-.009-.565-.009-.196 0-.517.074-.787.374-.27.3-1.03 1.007-1.03 2.457 0 1.45 1.055 2.85 1.2 3.05.145.2 2.073 3.167 5.023 4.442.702.303 1.25.485 1.677.62.704.223 1.345.192 1.85.117.564-.083 1.78-.727 2.03-1.429.25-.701.25-1.3.175-1.429-.075-.13-.275-.2-.575-.35z" />
      </svg>
    ),
    Mail: () => (
      <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Nav />

      {/* SUCCESS SCREEN OVERLAY */}
      {success && (
        <div className="success-overlay" role="dialog" aria-modal="true" aria-labelledby="success-title">
          <div className="success-card">
            <div className="success-lottie-wrap">
              <DotLottieReact
                src="https://lottie.host/86190713-3f59-41e8-906e-4315d1879dab/RvvQrwJGSB.lottie"
                loop
                autoplay
                style={{ width: '200px', height: '200px' }}
              />
            </div>
            <h3 id="success-title" className="success-title">Request Received</h3>
            <p className="success-body">
              We have processed your gift card request of <strong>{formatCurrency(getActiveAmount())}</strong>. A checkout link is being prepared and will be sent to both <strong>{recipientEmail || 'the recipient'}</strong> and WhatsApp number instantly.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setError('');
                setAmountMode('preset');
                setPresetAmount(2000);
                setCustomAmount('');
                setPersonalMessage('');
                setRecipientName('');
                setRecipientEmail('');
                setRecipientPhone('');
                setYourName('');
                setYourEmail('');
                setDeliveryDateMode('now');
                setDeliveryDate('');
              }}
              className="payment-btn"
            >
              Order Another Card
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="giftcard-hero">
        <div className="container">
          <div className="giftcard-hero-grid">
            <div className="giftcard-hero-text">
              <p className="eyebrow">The Perfect Gift</p>
              <h1>A little card, <br /><em>big moments.</em></h1>
              <p>
                Surprise someone with the Vanilla Café gift card. Good for great coffee, tasty bites and even better memories.
              </p>
            </div>
            <div className="giftcard-hero-visual">
              {/* Decorative Hand-drawn Arrow */}
              <div className="doodle-arrow-wrapper">
                <svg viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M 20 10 Q 75 75 130 20" className="doodle-arrow-path" />
                  <path d="M 115 22 L 130 20 L 126 35" className="doodle-arrow-path" />
                  <path d="M 68 40 C 60 30, 52 42, 68 52 C 84 42, 76 30, 68 40" className="doodle-arrow-path" />
                </svg>
              </div>

              {/* Tilted Card */}
              <div className="giftcard-hero-card-tilt">
                <div className="visual-card-header">
                  <div>
                    <div className="card-logo">Vanilla</div>
                    <div className="card-type">Gift Card</div>
                  </div>
                </div>
                <div className="visual-card-middle">
                  <div className="card-signature">Good things, well made.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHECKOUT & FORM SECTION */}
      <section className="giftcard-checkout-section">
        <div className="container">
          <div className="checkout-card-container">
            <form onSubmit={handleProceed} className="checkout-grid" noValidate>
              {error && (
                <div className="form-error" role="alert">{error}</div>
              )}

              {/* LEFT COLUMN: FORM DETAILS (DESKTOP) / ACCORDIONS (MOBILE) */}
              <div className="checkout-form-container">
                
                {/* 1. DESKTOP VIEW (STACKED FORMS) */}
                <div className="desktop-form-container">
                  <div className="checkout-form-section">
                    
                    {/* Step 1: Gift Card Details */}
                    <div>
                      <div className="form-section-header">
                        <span className="section-icon"><Icons.Gift /></span>
                        <h3>Gift Card Details</h3>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Select Amount</label>
                        <div className="amount-selector-grid" role="radiogroup" aria-label="Select gift card amount">
                          {presets.map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => {
                                setAmountMode('preset');
                                setPresetAmount(val);
                              }}
                              className={`amount-btn ${amountMode === 'preset' && presetAmount === val ? 'active' : ''}`}
                              aria-pressed={amountMode === 'preset' && presetAmount === val}
                            >
                              KES {val.toLocaleString()}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setAmountMode('custom')}
                            className={`amount-btn ${amountMode === 'custom' ? 'active' : ''}`}
                            aria-pressed={amountMode === 'custom'}
                          >
                            Other Amount
                          </button>
                        </div>

                        {amountMode === 'custom' && (
                          <div className="custom-amount-wrapper">
                            <label className="form-label" htmlFor="custom-amount-desktop">Custom Amount (KES)</label>
                            <input
                              id="custom-amount-desktop"
                              type="number"
                              min="500"
                              max="50000"
                              placeholder="e.g. 2500"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              className="form-input-text"
                            />
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="personal-message-desktop">Add a Personal Message (optional)</label>
                        <div className="textarea-wrapper">
                          <textarea
                            id="personal-message-desktop"
                            maxLength={120}
                            placeholder="Write a heartfelt message... (we'll include this with your gift card)"
                            value={personalMessage}
                            onChange={(e) => setPersonalMessage(e.target.value)}
                            className="form-textarea"
                          />
                          <span className="char-count">{personalMessage.length}/120</span>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Recipient Details */}
                    <div>
                      <div className="form-section-header">
                        <span className="section-icon"><Icons.Users /></span>
                        <h3>Recipient Details</h3>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor="recipient-name-desktop">Recipient Name</label>
                        <input
                          id="recipient-name-desktop"
                          type="text"
                          placeholder="e.g. Aisha"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          className="form-input-text"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="recipient-email-desktop">Email Address</label>
                        <input
                          id="recipient-email-desktop"
                          type="email"
                          placeholder="e.g. aisha@example.com"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          className="form-input-text"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Phone Number (WhatsApp)</label>
                        <div className="phone-input-wrapper">
                          <div className="country-select-box">
                            <img src="https://flagcdn.com/w40/ke.png" alt="Kenya Flag" className="kenya-flag-svg" />
                            <span>+254</span>
                          </div>
                          <input
                            id="recipient-phone-desktop"
                            type="tel"
                            placeholder="712 345 678"
                            value={recipientPhone}
                            onChange={(e) => setRecipientPhone(e.target.value)}
                            className="phone-input-text"
                          />
                        </div>
                        <p className="phone-disclaimer">We'll send the gift card to both email & WhatsApp</p>
                      </div>
                    </div>

                    {/* Step 3: Your Details */}
                    <div>
                      <div className="form-section-header">
                        <span className="section-icon"><Icons.User /></span>
                        <h3>Your Details</h3>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="your-name-desktop">Your Name</label>
                          <input
                            id="your-name-desktop"
                            type="text"
                            placeholder="e.g. Sam"
                            value={yourName}
                            onChange={(e) => setYourName(e.target.value)}
                            className="form-input-text"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="your-email-desktop">Your Email</label>
                          <input
                            id="your-email-desktop"
                            type="email"
                            placeholder="e.g. sam@example.com"
                            value={yourEmail}
                            onChange={(e) => setYourEmail(e.target.value)}
                            className="form-input-text"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 4: Delivery Date */}
                    <div>
                      <div className="form-section-header">
                        <span className="section-icon"><Icons.Calendar /></span>
                        <h3>Delivery Date</h3>
                      </div>
                      
                      <div className="form-group">
                        <div className="select-date-wrapper">
                          <span className="select-date-icon"><Icons.Calendar /></span>
                          <select
                            id="delivery-mode-desktop"
                            value={deliveryDateMode}
                            onChange={(e) => setDeliveryDateMode(e.target.value as 'now' | 'later')}
                            className="form-select"
                          >
                            <option value="now">Send Now</option>
                            <option value="later">Schedule for Later</option>
                          </select>
                          <span className="form-select-arrow">▼</span>
                        </div>
                      </div>

                      {deliveryDateMode === 'later' && (
                        <div className="form-group custom-amount-wrapper">
                          <label className="form-label" htmlFor="delivery-date-desktop">Choose Delivery Date</label>
                          <input
                            id="delivery-date-desktop"
                            type="date"
                            min={today}
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            className="custom-date-picker"
                          />
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={submitting} className="payment-btn">
                      <Icons.Lock /> {submitting ? 'Processing...' : 'PROCEED TO PAYMENT'}
                    </button>

                  </div>
                </div>

                {/* 2. MOBILE VIEW (ACCORDION STEPS) */}
                <div className="mobile-accordions-container">
                  
                  {/* Step 1 Accordion */}
                  <div className={`accordion-step ${activeMobileStep === 1 ? 'open' : ''}`}>
                    <button
                      type="button"
                      onClick={() => toggleStep(1)}
                      className="accordion-header"
                      aria-expanded={activeMobileStep === 1}
                      aria-controls="accordion-content-1"
                    >
                      <div className="accordion-header-title">
                        <span className="accordion-icon-wrapper">1</span>
                        <h4>Gift Card Details</h4>
                      </div>
                      <Icons.ChevronDown className="arrow-toggle" />
                    </button>
                    {activeMobileStep === 1 && (
                      <div id="accordion-content-1" className="accordion-content">
                        <div className="form-group" style={{ marginTop: '16px' }}>
                          <label className="form-label">Select Amount</label>
                          <div className="amount-selector-grid" role="radiogroup" aria-label="Select gift card amount">
                            {presets.map((val) => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => {
                                  setAmountMode('preset');
                                  setPresetAmount(val);
                                }}
                                className={`amount-btn ${amountMode === 'preset' && presetAmount === val ? 'active' : ''}`}
                                aria-pressed={amountMode === 'preset' && presetAmount === val}
                              >
                                KES {val.toLocaleString()}
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={() => setAmountMode('custom')}
                              className={`amount-btn ${amountMode === 'custom' ? 'active' : ''}`}
                              aria-pressed={amountMode === 'custom'}
                            >
                              Other Amount
                            </button>
                          </div>

                          {amountMode === 'custom' && (
                            <div className="custom-amount-wrapper">
                              <label className="form-label" htmlFor="custom-amount-mobile">Custom Amount (KES)</label>
                              <input
                                id="custom-amount-mobile"
                                type="number"
                                min="500"
                                max="50000"
                                placeholder="e.g. 2500"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                className="form-input-text"
                              />
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="personal-message-mobile">Add a Personal Message (optional)</label>
                          <div className="textarea-wrapper">
                            <textarea
                              id="personal-message-mobile"
                              maxLength={120}
                              placeholder="Write a heartfelt message... (we'll include this with your gift card)"
                              value={personalMessage}
                              onChange={(e) => setPersonalMessage(e.target.value)}
                              className="form-textarea"
                            />
                            <span className="char-count">{personalMessage.length}/120</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 2 Accordion */}
                  <div className={`accordion-step ${activeMobileStep === 2 ? 'open' : ''}`}>
                    <button
                      type="button"
                      onClick={() => toggleStep(2)}
                      className="accordion-header"
                      aria-expanded={activeMobileStep === 2}
                      aria-controls="accordion-content-2"
                    >
                      <div className="accordion-header-title">
                        <span className="accordion-icon-wrapper">2</span>
                        <h4>Recipient Details</h4>
                      </div>
                      <Icons.ChevronDown className="arrow-toggle" />
                    </button>
                    {activeMobileStep === 2 && (
                      <div id="accordion-content-2" className="accordion-content">
                        <div className="form-group" style={{ marginTop: '16px' }}>
                          <label className="form-label" htmlFor="recipient-name-mobile">Recipient Name</label>
                          <input
                            id="recipient-name-mobile"
                            type="text"
                            placeholder="e.g. Aisha"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            className="form-input-text"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="recipient-email-mobile">Email Address</label>
                          <input
                            id="recipient-email-mobile"
                            type="email"
                            placeholder="e.g. aisha@example.com"
                            value={recipientEmail}
                            onChange={(e) => setRecipientEmail(e.target.value)}
                            className="form-input-text"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Phone Number (WhatsApp)</label>
                          <div className="phone-input-wrapper">
                            <div className="country-select-box">
                              <img src="https://flagcdn.com/w40/ke.png" alt="Kenya Flag" className="kenya-flag-svg" />
                              <span>+254</span>
                            </div>
                            <input
                              id="recipient-phone-mobile"
                              type="tel"
                              placeholder="712 345 678"
                              value={recipientPhone}
                              onChange={(e) => setRecipientPhone(e.target.value)}
                              className="phone-input-text"
                            />
                          </div>
                          <p className="phone-disclaimer">We'll send the gift card to both email & WhatsApp</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 3 Accordion */}
                  <div className={`accordion-step ${activeMobileStep === 3 ? 'open' : ''}`}>
                    <button
                      type="button"
                      onClick={() => toggleStep(3)}
                      className="accordion-header"
                      aria-expanded={activeMobileStep === 3}
                      aria-controls="accordion-content-3"
                    >
                      <div className="accordion-header-title">
                        <span className="accordion-icon-wrapper">3</span>
                        <h4>Your Details</h4>
                      </div>
                      <Icons.ChevronDown className="arrow-toggle" />
                    </button>
                    {activeMobileStep === 3 && (
                      <div id="accordion-content-3" className="accordion-content">
                        <div className="form-group" style={{ marginTop: '16px' }}>
                          <label className="form-label" htmlFor="your-name-mobile">Your Name</label>
                          <input
                            id="your-name-mobile"
                            type="text"
                            placeholder="e.g. Sam"
                            value={yourName}
                            onChange={(e) => setYourName(e.target.value)}
                            className="form-input-text"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="your-email-mobile">Your Email</label>
                          <input
                            id="your-email-mobile"
                            type="email"
                            placeholder="e.g. sam@example.com"
                            value={yourEmail}
                            onChange={(e) => setYourEmail(e.target.value)}
                            className="form-input-text"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 4 Accordion */}
                  <div className={`accordion-step ${activeMobileStep === 4 ? 'open' : ''}`}>
                    <button
                      type="button"
                      onClick={() => toggleStep(4)}
                      className="accordion-header"
                      aria-expanded={activeMobileStep === 4}
                      aria-controls="accordion-content-4"
                    >
                      <div className="accordion-header-title">
                        <span className="accordion-icon-wrapper">4</span>
                        <h4>Delivery Date</h4>
                      </div>
                      <Icons.ChevronDown className="arrow-toggle" />
                    </button>
                    {activeMobileStep === 4 && (
                      <div id="accordion-content-4" className="accordion-content">
                        <div className="form-group" style={{ marginTop: '16px' }}>
                          <div className="select-date-wrapper">
                            <span className="select-date-icon"><Icons.Calendar /></span>
                            <select
                              id="delivery-mode-mobile"
                              value={deliveryDateMode}
                              onChange={(e) => setDeliveryDateMode(e.target.value as 'now' | 'later')}
                              className="form-select"
                            >
                              <option value="now">Send Now</option>
                              <option value="later">Schedule for Later</option>
                            </select>
                            <span className="form-select-arrow">▼</span>
                          </div>
                        </div>

                        {deliveryDateMode === 'later' && (
                          <div className="form-group custom-amount-wrapper">
                            <label className="form-label" htmlFor="delivery-date-mobile">Choose Delivery Date</label>
                            <input
                              id="delivery-date-mobile"
                              type="date"
                              min={today}
                              value={deliveryDate}
                              onChange={(e) => setDeliveryDate(e.target.value)}
                              className="custom-date-picker"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* RIGHT COLUMN: PREVIEW & BENEFITS */}
              <div className="preview-sidebar-wrap">
                <div className="preview-sidebar">
                  
                  <div className="preview-header">
                    <Icons.Eye />
                    <h3>Gift Card Preview</h3>
                  </div>

                  {/* Visual Gift Card rendering (Dynamic) */}
                  <div className="visual-card-preview-box">
                    {/* Golden Ginkgo Leaves Vector illustration */}
                    <svg className="ginkgo-leaf-bg" viewBox="0 0 100 100" fill="none" stroke="#c7a27c" strokeWidth="0.8" opacity="0.15">
                      <path d="M 50 85 Q 46 55 42 40 Q 20 32 10 48 Q 5 25 28 15 Q 50 10 60 25 Q 78 30 88 52 Q 72 68 50 85 Z" />
                      <path d="M 50 85 Q 56 68 68 58 Q 85 62 95 50 Q 90 28 72 22 Q 54 22 42 32 Q 38 48 50 85 Z" strokeDasharray="2, 2" />
                    </svg>

                    <div className="visual-card-header">
                      <div>
                        <div className="visual-card-logo">Vanilla</div>
                        <div className="visual-card-type">Gift Card</div>
                      </div>
                    </div>
                    <div className="visual-card-middle">
                      <div className="visual-card-signature">Good things, well made.</div>
                    </div>
                    <div className="visual-card-footer">
                      <div className="visual-card-value">
                        <span className="value-label">Value</span>
                        <span className="value-amount">{formatCurrency(getActiveAmount())}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message note preview */}
                  <div className="visual-note-preview-box">
                    <div className="note-recipient">To: {recipientName || 'Aisha'}</div>
                    <div className="note-body">
                      {personalMessage ||
                        "Happy Birthday!\nMay your day be as wonderful as your coffee order. Enjoy! ☕❤️"}
                    </div>
                    <div className="note-sender">From: {yourName || 'Sam'}</div>
                  </div>

                  {/* Delivery benefits details */}
                  <div className="benefits-list">
                    <div className="benefit-item">
                      <div className="benefit-icon-wrapper">
                        <Icons.WhatsApp />
                      </div>
                      <div className="benefit-text">
                        <h4>Sent to WhatsApp</h4>
                        <p>The gift card will be sent to the recipient's WhatsApp number instantly.</p>
                      </div>
                    </div>

                    <div className="benefit-item">
                      <div className="benefit-icon-wrapper">
                        <Icons.Mail />
                      </div>
                      <div className="benefit-text">
                        <h4>Sent to Email</h4>
                        <p>A beautiful gift card will be delivered to the recipient's email inbox.</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only payment button at the bottom of the preview column */}
                  <div className="mobile-only-payment-btn-wrap">
                    <button type="submit" disabled={submitting} className="payment-btn">
                      <Icons.Lock /> {submitting ? 'Processing...' : 'PROCEED TO PAYMENT'}
                    </button>
                  </div>

                </div>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* THREE-COLUMN FEATURES BAR */}
      <section className="giftcard-features-bar">
        <div className="container">
          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon-wrapper">
                ☕
              </div>
              <div className="feature-text">
                <h4>More than just coffee</h4>
                <p>Good for drinks, bites and all the cozy moments.</p>
              </div>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper">
                ♡
              </div>
              <div className="feature-text">
                <h4>Always a good idea</h4>
                <p>Perfect for birthdays, thank-yous or just because.</p>
              </div>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper">
                🍃
              </div>
              <div className="feature-text">
                <h4>Beautifully delivered</h4>
                <p>Instantly to WhatsApp and Email.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
