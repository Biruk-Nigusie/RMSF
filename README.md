# RMS Frontend (RMSF)

A modern React frontend for the Residential Management System, built with Vite, React Router DOM, Redux Toolkit, and Tailwind CSS.

## Features

- **Authentication**: Login/Register with JWT token management
- **Dashboard**: Personalized dashboard with key metrics
- **Complaints Management**: Submit and track complaints
- **Announcements**: View community announcements
- **Parking Management**: View parking slots and pay fees
- **Utilities**: Manage utility bills and report issues
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library

## Color Scheme

- Light Green: `#DDF4E7`
- Medium Green: `#67C090`
- Teal: `#26667F`
- Dark Blue: `#124170`

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Integration

The frontend integrates with the RMSB backend API running on `https://rmsb-2wjb.onrender.com/api`. Key endpoints include:

- Authentication: `/auth/login`, `/auth/register`
- Dashboard: `/dashboard/resident`, `/dashboard/admin`
- Complaints: `/complaints`, `/complaints/my`
- Announcements: `/announcements`
- Parking: `/parking/slots`, `/parking/pay`
- Utilities: `/utilities`, `/utilities/pay`

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── services/           # API services
├── store/              # Redux store and slices
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## Authentication Flow

1. User logs in through `/login`
2. JWT token stored in localStorage
3. Token automatically included in API requests
4. Protected routes check authentication status
5. Automatic logout on token expiration

## State Management

Redux Toolkit is used for global state management:

- **Auth Slice**: User authentication state
- **API Integration**: Async thunks for API calls
- **Error Handling**: Centralized error management

## Responsive Design

The UI is fully responsive with:

- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface elements
- Optimized for tablets and desktops
