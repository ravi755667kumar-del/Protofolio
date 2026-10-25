import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    topic: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#04161c] overflow-hidden border-t border-[#2dd4bf]/15">
      {/* Background glow */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#2dd4bf]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#0f766e]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-[#22D3EE] text-xs font-semibold tracking-widest uppercase">
            <span>💬</span>
            <span>Let's Talk</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact{' '}
            <span className="bg-gradient-to-r from-[#22D3EE] via-sky-300 to-teal-200 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base max-w-xl mx-auto">
            Whether you have a machine learning challenge, a full-stack project, or an internship opportunity, my inbox is always open.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels & Status */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  collaborate?
                </span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Feel free to reach out directly via email or connect on LinkedIn and GitHub. I respond promptly within 24 hours.
              </p>
            </div>

            {/* Channels */}
            <div className="space-y-3">
              {/* Phone Channel */}
              <a
                href="tel:+917464059133"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    📞
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Phone / WhatsApp</p>
                    <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      +91 7464059133
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-emerald-300 text-sm">
                  ↗
                </span>
              </a>

              {/* Email Channel */}
              <a
                href="mailto:Ravikumar755667@gmail.com"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
                    📧
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Email</p>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      Ravikumar755667@gmail.com
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-cyan-300 text-sm">
                  ↗
                </span>
              </a>

              <a
                href="https://linkedin.com/in/ravi-kumar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    💼
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">LinkedIn</p>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      linkedin.com/in/ravi-kumar
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-cyan-300 text-sm">
                  ↗
                </span>
              </a>

              <a
                href="https://github.com/ravi755667kumar-del"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    🐙
                  </span>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">GitHub</p>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      github.com/ravi755667kumar-del
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 group-hover:text-cyan-300 text-sm">
                  ↗
                </span>
              </a>
            </div>

            {/* Availability status badge */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-3.5">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
              <div>
                <p className="text-sm font-bold text-white">
                  Currently Available
                </p>
                <p className="text-xs text-slate-400">
                  Open to internships, freelance projects &amp; collaborations
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#1E293B]/90 border border-[#22D3EE]/20 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-1">Send a Message</h3>
            <p className="text-xs text-[#94A3B8] mb-6">
              Fill in the form and I will get back to you shortly ✉️
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#0B1120] border border-[#22D3EE]/50 text-center space-y-3">
                <span className="text-4xl">🚀</span>
                <h4 className="text-lg font-bold text-white">Message Sent!</h4>
                <p className="text-sm text-[#94A3B8]">
                  Thank you for reaching out, {formData.firstName || 'friend'}. I'll get back to your email at {formData.email || 'soon'}!
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ firstName: '', lastName: '', email: '', topic: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Ravi"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-white/10 focus:border-[#22D3EE] focus:outline-none text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-white/10 focus:border-[#22D3EE] focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ravi@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-white/10 focus:border-[#22D3EE] focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subject / Topic
                  </label>
                  <select
                    required
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081b30] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm"
                  >
                    <option value="" disabled>Select a topic…</option>
                    <option value="Machine Learning Project">Machine Learning Project</option>
                    <option value="Full-stack Opportunity">Full-stack Opportunity</option>
                    <option value="Internship / Job">Internship / Job</option>
                    <option value="Just Saying Hi">Just Saying Hi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity…"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-white/10 focus:border-[#22D3EE] focus:outline-none text-white text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-[#22D3EE] via-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-[#22D3EE]/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <span>🚀</span>
                </button>

                <p className="text-[11px] text-center text-[#94A3B8]">
                  🔒 Your information is safe. I never share personal data.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
