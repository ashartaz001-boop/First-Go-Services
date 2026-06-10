// Data
const industries = [
  "IT & Technology","Healthcare","FMCG & Retail","Aviation",
  "Oil & Gas","BFSI","Real Estate","Telecom & Logistics",
  "Automobile","Building Materials",
];
const services = [
  {num:"01",icon:"⌘",title:"IT Solutions",body:"Elite talent sourcing across IT and consulting ecosystems — high-impact roles in development, data, cloud, and cybersecurity, building future-ready teams that accelerate digital transformation."},
  {num:"02",icon:"💼",title:"Non-IT Solutions",body:"Specialized recruitment across FMCG, Aviation, Oil & Gas, Manufacturing, BFSI, and more — ensuring talent fits both the role and culture for long-term organizational success."},
  {num:"03",icon:"👥",title:"Contractual Hiring",body:"Flexible, project-ready professionals tailored to your business needs — delivering speed, quality, and adaptability, scaling your workforce precisely when and how you need it."},
];
const approach = [
  {num:"01",title:"One-on-One Evaluation",body:"Every candidate undergoes rigorous personal assessment — beyond the CV to understand potential, character, and true fit."},
  {num:"02",title:"Culture-Fit Hiring",body:"We match talent to values, culture, and long-term vision — not just the job description."},
  {num:"03",title:"Quality Over Quantity",body:"Every submission is a deliberate, high-quality recommendation backed by our team's judgment."},
  {num:"04",title:"Long-Term Value",body:"Our success is measured by lasting placement impact — not just the hire, but value created for years to come."},
];
const brand = [
  {label:"Values Alignment",title:"Hire for Vision",body:"We don't just hire for roles — we hire for vision. Every candidate is aligned with your brand's values, culture, and long-term strategic goals."},
  {label:"Strong Execution",title:"People & Precision",body:"Our strength lies in deep industry understanding and a team that delivers precision, quality, and consistency across every engagement."},
  {label:"Transparency",title:"Excellent Execution",body:"A transparent, collaborative hiring process — from sourcing to placement — ensuring seamless communication and trust at every step."},
];

// Marquee
const mt = document.getElementById('marquee-track');
const items = [...industries, ...industries].map(i =>
  `<span class="marquee-item"><span class="dot">◆</span>${i}</span>`
).join('');
mt.innerHTML = items;

// Services
document.getElementById('services-grid').innerHTML = services.map(s => `
  <div class="service-card fu">
    <div class="svc-num">${s.num} — ${s.title}</div>
    <div class="svc-icon">${s.icon}</div>
    <h3 class="svc-title">${s.title}</h3>
    <p class="svc-body">${s.body}</p>
  </div>`).join('');

// Industries
document.getElementById('industries-grid').innerHTML = industries.map(i => `
  <div class="industry"><span class="dot"></span>${i}</div>`).join('');

// Approach
document.getElementById('approach-grid').innerHTML = approach.map(a => `
  <div class="approach-card fu">
    <div class="approach-num">${a.num}</div>
    <h4 class="approach-title">${a.title}</h4>
    <p class="approach-body">${a.body}</p>
  </div>`).join('');

// Brand
document.getElementById('brand-grid').innerHTML = brand.map(b => `
  <div class="brand-card fu">
    <div class="brand-label">${b.label}</div>
    <h4 class="brand-title">${b.title}</h4>
    <p class="brand-body">${b.body}</p>
  </div>`).join('');

// Fade-in observer
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fu').forEach(el => io.observe(el));

// Form — opens user's mail client (no backend in static version)
const form = document.getElementById('enquiry-form');
const statusEl = document.getElementById('form-status');
const btn = document.getElementById('submit-btn');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name || !data.email || !data.need || !data.message) {
    statusEl.textContent = "Please fill in all required fields."; statusEl.className = "form-status err"; return;
  }
  const subject = encodeURIComponent(`Enquiry from ${data.name} — ${data.need}`);
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || '-'}\nHiring Need: ${data.need}\n\nMessage:\n${data.message}`
  );
  window.location.href = `mailto:careers@firstgoservices.in?subject=${subject}&body=${body}`;
  statusEl.textContent = "Opening your email client…"; statusEl.className = "form-status ok";
});
