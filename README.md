# 🍽️ RestoHub — Restaurant Management System

A full-stack web application for managing restaurant operations including reservations,
table management, staff scheduling, and role-based access control.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12 |
| Frontend | React 18 + TypeScript |
| Bridge | Inertia.js |
| Styling | Tailwind CSS |
| Auth & Roles | Laravel Sanctum + Spatie Permissions |
| Database | MySQL |
| Build Tool | Vite |

---

## ✨ Features

- 🔐 Role-based access control (Super Admin, Manager, Cashier, Waiter, Chef, etc.)
- 🪑 Dining table management with real-time availability
- 📅 Calendar-based reservation and scheduling system
- 👤 User profile management with avatar support
- 📊 Role-specific dashboards
- 🔒 Secure authentication with email verification

---

## 📸 Screenshots

> _Add screenshots here once UI is polished_

---

## ⚙️ Local Setup

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL

### Installation

````bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rms.git
cd rms

# Install PHP dependencies
composer install

# Install JS dependencies
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Configure your database in .env then run:
php artisan migrate --seed

# Start development servers
composer run dev
````
