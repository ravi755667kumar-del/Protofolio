# 🚀 Ravi Kumar — Developer & AI/ML Engineer Portfolio

Welcome to the official portfolio repository for **Ravi Kumar**, a Full-Stack Developer and aspiring **AI/ML Engineer** pursuing a B.Tech in AI & Data Science at Grace College of Engineering.

This project features a modern, interactive single-page portfolio with glassmorphic UI elements, custom JavaScript animations, responsive layout design, and a full Django backend setup with modular template components.

---

## 🌟 Key Features

- **⚡ Interactive Hero Section**:
  - **Dynamic Typewriter Subtitle**: Cycles through developer roles seamlessly.
  - **3D Swinging ID Card**: Interactive ID badge with hover flip card physics and custom barcode/QR graphics.
  - **Floating Particles**: Animated background canvas with micro-interaction glow.
- **🙋‍♂️ About Me & Bio**:
  - Highlights academic record (CGPA: 7.8/10), AI/ML internship background at Matt Engineering Solution, and core competencies.
- **⏳ Experience & Education Timeline**:
  - Vertical timeline mapping academic journey and industrial internship milestones.
- **💻 Categorized Skills & Tech Cloud**:
  - 4-column structured grid (*Core & Web*, *AI & Deep Learning*, *Data Science & BI*, *Tools & Platforms*).
  - Tech Chip Cloud featuring interactive colored badge tags for tools like Python, Django, TensorFlow, Scikit-learn, Pandas, NumPy, SQL, Power BI, Docker, and FastAPI.
- **📁 Featured Projects**:
  - **Movie Recommendation System**: Personalized suggestion engine built with Python & data processing pipelines.
  - **House Price Prediction Model**: Regression model utilizing Scikit-learn & Pandas for real estate valuation.
  - **Language Detector**: Web application powered by Django and Natural Language Processing (NLP).
  - **E-commerce Website**: Full-stack web application for retail using Django, HTML, CSS, and JS.
- **🛸 3D Orbiting Certification Gallery**:
  - Smooth 6-thumbnail rotating orbit around a central hub (`requestAnimationFrame` loop).
  - Interactive full-screen modal system embedded with real PDF viewers for **AWS Machine Learning** and **Cisco Data Science** certificates.
- **🔤 Scramble Text Animations**:
  - Cyberpunk-inspired text scramble effect triggering on section headers upon scroll reveal and mouse hover.
- **📩 Responsive Contact Section**:
  - Clean contact channels (Email, LinkedIn, GitHub), real-time availability indicator, and working message form with CSRF protection.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System, Glassmorphism, HSL Tokens), Vanilla JavaScript (ES6+, IntersectionObserver, Canvas/RAF Animations)
- **Backend Framework**: Django 5.x (Python)
- **Design & Typography**: Outfit & JetBrains Mono Google Fonts
- **Data Science & ML Stack**: Python, TensorFlow, Scikit-learn, Pandas, NumPy, NLP, Matplotlib, Power BI

---

## 📁 Project Structure

```
profolio/
├── index.html                  # Standalone Single-Page Application
├── style.css                   # Core Design System & Tokens
├── main.css                    # Section Layouts & Animations
├── cert.css                    # 3D Orbit & Modal CSS
├── main.js                     # Scroll Reveal, Scramble Text, Typewriter, Particle FX
├── cert.js                     # 3D Orbit Physics & PDF Viewer Modal System
├── profile.png                 # Enhanced Profile Photo
├── aws_cert.pdf                # AWS ML Certificate
├── cisco_cert.pdf              # Cisco Data Science Certificate
├── protofolio/                 # Django Project Root
│   ├── manage.py
│   ├── protofolio/             # Django Settings & Routing
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── main/                   # Main Django App
│       ├── views.py
│       ├── static/             # Static Assets (CSS, JS, Images, PDFs)
│       └── templates/          # Modular Django Templates
│           ├── index.html      # Master Template (Includes all sections)
│           ├── navbar.html
│           ├── home.html
│           ├── about.html
│           ├── experience.html
│           ├── skills.html
│           ├── projects.html
│           ├── certs.html
│           ├── contact.html
│           └── footer.html
└── README.md
```

---

## 🚀 How to Run the Project

### Option 1: Standalone HTML (Frontend Preview)

Simply open `index.html` directly in any standard web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Django Web Server (Full-Stack Mode)

1. **Activate Virtual Environment**:
   ```powershell
   # Windows PowerShell
   .\venv\Scripts\Activate.ps1
   ```

2. **Navigate to Django Project Directory**:
   ```bash
   cd protofolio
   ```

3. **Run Database Migrations (Optional)**:
   ```bash
   python manage.py migrate
   ```

4. **Start Development Server**:
   ```bash
   python manage.py runserver
   ```

5. **View Application**:
   Open your browser and navigate to `http://127.0.0.1:8000/`.

---

## 📬 Contact & Connect

- **Name**: Ravi Kumar
- **Email**: [Ravikumar755667@gmail.com](mailto:Ravikumar755667@gmail.com)
- **LinkedIn**: [linkedin.com/in/ravi-kumar](https://linkedin.com/in/ravi-kumar)
- **GitHub**: [github.com/ravikumar-dev](https://github.com/ravikumar-dev)

---

*© 2024-2026 Ravi Kumar. All rights reserved.*
