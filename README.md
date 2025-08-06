# 📱 Eduvia – E-Learning App

Eduvia is a modern, cross-platform e-learning mobile application built with **React Native**, allowing students to access video lectures, manage their profiles, and learn on the go. You can access backend from the repo "server" on my github repo.

---

## 🚀 Features

- 🎥 **Video Lectures** by expert faculty
- 🔐 Login/Register for Students, Faculty & Admin
- 👨‍🏫 Role-based navigation and dashboards
- 📱 Clean UI with Bottom Tab Navigation
- 🌈 Tailwind CSS support via NativeWind
- 💾 Persistent storage with AsyncStorage
- 📶 Fetch data via API (e.g. lectures, users)
- 🔍 Responsive design for Android & iOS

---

## 📸 Screens

| Screen           | Description                  |
|------------------|------------------------------|
| `Home`           | Featured videos, categories  |
| `Videos`         | Video lecture list           |
| `Profile`        | User info and logout         |
| `Login/Register` | Auth screens for all roles   |
| `VideoDetails`   | Video player & details       |

---

## 🧱 Tech Stack

- **React Native (Expo)**
- **React Navigation** – Stack & Bottom Tabs
- **NativeWind** – Tailwind for RN
- **AsyncStorage** – Local data persistence
- **Redux Toolkit (optional)** – For state management

---

## 🛠️ Installation

```bash
git clone https://github.com/yourusername/eduvia-app.git
cd eduvia-app
npm install
npx expo start

## Project Structure

`` bash
.
├── assets/            # Images, icons, fonts
├── components/        # Reusable UI components
├── screens/           # App Screens (Home, Videos, etc.)
├── navigation/        # Navigators (Stack, Tabs)
├── redux/             # Store, reducers, slices
├── utils/             # Helpers, constants
└── App.js             # Root of the app

