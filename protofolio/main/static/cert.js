/* =============================================
   cert.js
   ============================================= */

// Certificate detail data
const CERTS = {
  aws:    { title:'Introduction to Machine Learning', issuer:'Amazon Web Services', icon:'☁️', gradient:'linear-gradient(135deg,#ff9900,#e65c00)', pdfUrl:'/static/aws_cert.pdf' },
  cisco:  { title:'Introduction to Data Science',     issuer:'Cisco Networking Academy', icon:'🌐', gradient:'linear-gradient(135deg,#0ea5e9,#0284c7)', pdfUrl:'/static/cisco_cert.pdf' },
  excel:  { title:'Introduction to MS Excel',       issuer:'Microsoft & Simplilearn', icon:'📊', gradient:'linear-gradient(135deg,#107c41,#185c37)', pdfUrl:'/static/excel_cert.pdf' },
  ai:     { title:'Yuva AI for All',                issuer:'INDIAai & NASSCOM',       icon:'🤖', gradient:'linear-gradient(135deg,#f26522,#d94600)', pdfUrl:'/static/ai_cert.pdf' },
  docker: { title:'Docker Certified Associate',   issuer:'Docker Inc.',          icon:'🐳',gradient:'linear-gradient(135deg,#2496ed,#1a6fb5)', year:'2022', issued:'April 22, 2022',    expires:'April 22, 2025',   id:'DCA-2022-RK-0135',     level:'Associate',    score:'88%',            desc:'Covers Docker Engine, images, containers, networking, volumes, Swarm orchestration, and security for containerizing production applications.', skills:['Docker Engine','Dockerfile','Compose','Swarm','Networking','Volumes','Registry','Security','BuildKit','Multi-stage Builds'] },
  github: { title:'GitHub Actions Certification', issuer:'GitHub',               icon:'🐙',gradient:'linear-gradient(135deg,#555,#999)',      year:'2024', issued:'January 18, 2024',   expires:'January 18, 2027', id:'GH-ACT-2024-RK-0304',  level:'Certified',    score:'91%',            desc:'Validates expertise in automating CI/CD workflows using GitHub Actions, including custom actions, secrets management, matrix builds, and cloud deployments.', skills:['GitHub Actions','CI/CD','YAML Workflows','Secrets','Matrix Builds','Container Jobs','Reusable Workflows','Environments','Self-hosted Runners','OIDC'] },
};

const KEYS      = ['aws','cisco','excel','ai','docker','github'];
const TOTAL     = KEYS.length;
const SPEED     = 0.006;
let   angle     = -Math.PI / 2;
let   paused    = false;
let   animFrame = null;

function getSceneSize() {
  const scene = document.getElementById('certOrbitScene');
  if (!scene) return { cx: 350, cy: 350, r: 260, tw: 140, th: 185 };
  const w = scene.offsetWidth;
  const h = scene.offsetHeight;
  const tw = Math.min(140, w * 0.19);
  const th = tw * (185 / 140);
  const r  = (w / 2) - tw / 2 - 10;
  return { cx: w/2, cy: h/2, r, tw, th };
}

function placeThumb(el, i, currentAngle, geo) {
  const { cx, cy, r, tw, th } = geo;
  const a  = currentAngle + (i / TOTAL) * 2 * Math.PI;
  const x  = cx + r * Math.cos(a) - tw / 2;
  const y  = cy + r * Math.sin(a) - th / 2;
  const tilt = Math.sin(a) * 8;
  el.style.width   = tw + 'px';
  el.style.height  = th + 'px';
  el.style.left    = x + 'px';
  el.style.top     = y + 'px';
  el.style.transform = `rotate(${tilt}deg)`;
}

function animateOrbit() {
  if (!paused) {
    angle += SPEED;
  }
  const geo = getSceneSize();
  KEYS.forEach((key, i) => {
    const el = document.getElementById('ct-' + key);
    if (el) placeThumb(el, i, angle, geo);
  });
  animFrame = requestAnimationFrame(animateOrbit);
}

function initCertOrbit() {
  const scene = document.getElementById('certOrbitScene');
  if (!scene) return;
  scene.addEventListener('mouseenter', () => paused = true);
  scene.addEventListener('mouseleave', () => paused = false);
  const geo = getSceneSize();
  KEYS.forEach((key, i) => {
    const el = document.getElementById('ct-' + key);
    if (el) placeThumb(el, i, angle, geo);
  });
  animateOrbit();
}

function openCert(key) {
  const cert = CERTS[key];
  if (!cert) return;
  paused = true;
  if (cert.pdfUrl) {
    document.getElementById('certModalPage').innerHTML = `
      <div class="cert-full-page" style="padding: 0; background: #fff; height: 80vh; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="background: ${cert.gradient}; padding: 1rem; color: white; font-weight: 700; font-size: 1.2rem; display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
          <span>${cert.icon}</span> <span>${cert.issuer} - ${cert.title}</span>
        </div>
        <iframe src="${cert.pdfUrl}" width="100%" height="100%" style="border:none; flex-grow: 1;"></iframe>
      </div>
    `;
  } else {
    document.getElementById('certModalPage').innerHTML = `
      <div class="cert-full-page">
        <div class="cfp-banner" style="--banner-grad:${cert.gradient}">
          <div class="cfp-banner-inner">
            <div class="cfp-logo" style="background:${cert.gradient}">${cert.icon}</div>
            <div class="cfp-header-text">
              <div class="cfp-issuer">${cert.issuer}</div>
              <div class="cfp-title">${cert.title}</div>
            </div>
          </div>
        </div>
        <div class="cfp-body">
          <p class="cfp-desc">${cert.desc}</p>
          <div class="cfp-grid">
            <div class="cfp-meta-item"><span>Issued</span><strong>${cert.issued}</strong></div>
            <div class="cfp-meta-item"><span>Expires</span><strong>${cert.expires}</strong></div>
            <div class="cfp-meta-item"><span>Credential ID</span><strong>${cert.id}</strong></div>
            <div class="cfp-meta-item"><span>Level</span><strong>${cert.level}</strong></div>
            <div class="cfp-meta-item"><span>Score</span><strong>${cert.score}</strong></div>
          </div>
          <div class="cfp-skills">
            <strong>Skills Verified:</strong>
            <div class="cfp-tags">
              `;
    cert.skills.forEach(s => {
      document.getElementById('certModalPage').innerHTML += `<span style="background:${cert.gradient};-webkit-background-clip:text;-webkit-text-fill-color:transparent;border:1px solid currentColor;">${s}</span>`;
    });
    document.getElementById('certModalPage').innerHTML += `
            </div>
          </div>
        </div>
      </div>
    `;
  }
  document.getElementById('certModal').classList.add('open');
  if(window.globalLenis) window.globalLenis.stop();
}

function closeCertModal() {
  document.getElementById('certModal').classList.remove('open');
  paused = false;
  if(window.globalLenis) window.globalLenis.start();
}

document.addEventListener('DOMContentLoaded', () => {
  initCertOrbit();
  const cbtn = document.getElementById('certCloseBtn');
  if(cbtn) cbtn.addEventListener('click', closeCertModal);
  const cmod = document.getElementById('certModal');
  if(cmod) {
    cmod.addEventListener('click', (e) => {
      if(e.target === cmod) closeCertModal();
    });
  }
});
