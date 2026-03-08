# 💖 ElderEase – Smart Monitoring for Safer Elderly Care
*A Real-Time Health Monitoring System for Elderly Well-Being*

**ElderEase** is a smart health monitoring system designed to support elderly individuals living independently.  
The system monitors vital health parameters such as **heart rate, oxygen saturation (SpO₂), and body temperature**, detects abnormal readings, and classifies health risks in real time.

The platform combines:

- **Lovable.dev** for the user interface and application experience
- **Node-RED** for real-time health data processing and monitoring logic

Together, they create a **scalable, modular monitoring architecture** capable of supporting future IoT health devices and predictive healthcare systems.

---

# 🎯 Project Objective

The goal of **ElderEase** is to build a **real-time elderly health monitoring system** that can detect abnormal vital signs early and provide safer, smarter care for elderly individuals living alone.

The system is designed to:

- Monitor vital health parameters
- Detect abnormal conditions in real time
- Provide clear health risk classification
- Build a scalable foundation for future healthcare systems

---

# 🚀 Live Demo

🔗 **Website:**  
https://your-website-link.com

🔗 **GitHub Repository:**  
https://github.com/ananyamishra13/ElderEase--Smart-Monitoring-for-Safer-Elderly-Care

🔗 **Demo Video:**  
https://youtu.be/tiA0m_hKLfs?si=AySEdns74uAB7kPm

---

# 🖥️ Tech Stack

## Frontend / Application
- **Lovable.dev**
- React
- JavaScript

## Backend / Data Processing
- **Node-RED**
- Node.js

## Data Handling
- JSON message structure
- Real-time event-driven pipeline

## Development Tools
- Git
- GitHub

---

# 🌟 Features

## 📊 Vital Health Monitoring

The system processes health parameters including:

- Heart Rate
- Oxygen Saturation (SpO₂)
- Body Temperature

These readings are analyzed in real time to detect abnormal conditions.

---

## ✅ Data Validation Module

Incoming health readings are validated to ensure they fall within realistic physiological ranges.

Validation ranges:

- Heart Rate → **40 – 180 bpm**
- SpO₂ → **70 – 100 %**
- Temperature → **34 – 42 °C**

Invalid readings are flagged before entering the analysis pipeline.

---

## 🧠 Decision Engine

The system analyzes validated readings and classifies health status into:

- **NORMAL**
- **WARNING**
- **EMERGENCY**

Example rules:

- Heart Rate > 110 → Emergency  
- SpO₂ < 90 → Emergency  
- Temperature > 38°C → Emergency  

This helps detect **health risks early**.

---

## 📈 Monitoring & Logging

The system tracks key monitoring metrics:

- Total health readings processed
- Emergency event count
- Last emergency timestamp
- Health event history

This improves **system transparency and monitoring reliability**.

---

## 🚨 Emergency Simulation

The system allows manual testing of emergency conditions such as:

- High heart rate
- Low oxygen level
- Fever conditions

This helps validate system responses without modifying core logic.

---

# 🏗️ System Architecture

The system follows a modular monitoring pipeline:

```
Lovable Web App
        ↓
Vital Health Data Input
        ↓
Node-RED Processing Pipeline
        ↓
Data Validation Module
        ↓
Decision Engine
(NORMAL / WARNING / EMERGENCY)
        ↓
Monitoring & Logging
        ↓
Future Dashboard Integration
```

This architecture enables **scalability and modular expansion**.

---

# 📸 Screenshots

(Add screenshots here)

Suggested images:

- Lovable UI interface
- Health monitoring dashboard
- Node-RED flow architecture
- Decision engine logic
- System architecture diagram

---

# 📁 Project Structure

```
.
├── frontend/
│   ├── components
│   ├── pages
│   └── app configuration
│
├── flows/
│   └── node-red-flow.json
│
├── docs/
│   └── architecture diagrams
│
├── README.md
└── package.json
```

---

# 🔧 Setup Instructions

## 1 Install Node.js

Download Node.js:

https://nodejs.org

---

## 2 Install Node-RED

```
npm install -g --unsafe-perm node-red
```

---

## 3 Start Node-RED

```
node-red
```

Open in browser:

```
http://localhost:1880
```

---

## 4 Run Lovable App

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

---

# 🤝 Contributors

| Team Member | Role |
|-------------|------|
| **@aadya2901** | Data Simulation & Validation |
| **@ananyamishra13** | Decision Engine & Monitoring |
| **@iam-anish15** | UI Structure, Architecture & Documentation |

---

# 🛠️ How We Built It

The ElderEase platform combines a **user-friendly Lovable interface** with a **Node-RED data processing pipeline**.

Lovable handles the application interface and user interaction, while Node-RED processes incoming health data, validates readings, and performs rule-based risk classification.

This separation allows the system to remain **modular, scalable, and easy to extend**.

---

# ⚡ Challenges Faced

- Designing a modular monitoring pipeline
- Defining realistic physiological validation ranges
- Maintaining consistent data flow between modules
- Integrating UI interaction with backend monitoring logic

---

# 🏆 Accomplishments

- Built a real-time elderly health monitoring system
- Implemented rule-based health risk detection
- Created a scalable monitoring architecture
- Combined Lovable UI with Node-RED backend processing

---

# 🌱 What We Learned

Through this project we learned:

- Flow-based programming using Node-RED
- Designing modular system architectures
- Building health monitoring pipelines
- Creating accessible healthcare technology solutions

---

# 🚀 What's Next for ElderEase

Future improvements include:

- Integration with IoT wearable health devices
- Real-time monitoring dashboards
- Database storage for health history
- Machine learning for predictive health analytics
- Caregiver notification systems

---

# 📝 License

This project is licensed under the **MIT License**.

---

# 💬 Final Note

> *Helping elderly individuals live safer, healthier, and more independent lives through intelligent health monitoring.* 💖
