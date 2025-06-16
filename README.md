# Homeo - Property Rental App

A modern property rental application built with React Native and Expo, featuring a beautiful UI and seamless user experience.

## Features

### 1. Property Listing
- Browse available properties with detailed information
- Search properties by title, address, city, or state
- View property cards with key information:
  - Property title
  - Monthly rent
  - Location
  - Key features
  - Property images
  - Booking status

### 2. Property Details
- Comprehensive property information display:
  - High-quality property images with thumbnail gallery
  - Detailed property description
  - Monthly rent
  - Complete address
  - Interactive map with property location
  - List of property features with icons
  - Booking status indicator

### 3. Booking System
- Date selection for property booking:
  - Check-in date picker
  - Check-out date picker
  - Date validation (check-out must be after check-in)
  - Booking confirmation
  - Booking status tracking

### 4. Booking Management
- View all bookings in a dedicated tab
- Booking details include:
  - Property information
  - Check-in and check-out dates
  - Booking status (confirmed, pending, cancelled)
  - Quick access to property details

### 5. User Interface
- Modern and clean design
- Dark/Light mode support
- Custom fonts (Poppins)
- Responsive layout
- Platform-specific UI elements
- Smooth animations and transitions
- Loading states and error handling

### 6. Navigation
- Tab-based navigation:
  - Home (Property listings)
  - Bookings
  - Profile
- Stack navigation for detailed views
- Back navigation support

## Technical Implementation

### 1. Setup and Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start the development server
npm start

# Start the JSON server
npx json-server db.json
```

### 2. Project Structure
```
├── app/                    # Main application code
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── property-details/  # Property details screen
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable components
├── constants/            # App constants and theme
├── hooks/               # Custom React hooks
├── services/           # API services
├── store/             # State management
└── types/             # TypeScript type definitions
```

### 3. Key Technologies
- React Native with Expo
- TypeScript for type safety
- React Query for data fetching
- Zustand for state management
- React Navigation for routing
- NativeWind for styling
- Expo Router for file-based routing

### 4. State Management
- Zustand for global state
- React Query for server state
- Local state with React hooks

### 5. API Integration
- RESTful API endpoints for:
  - Property listings
  - Property details
  - Booking management
  - User profiles
- Error handling and loading states
- Data caching with React Query

### 6. UI Components
- Custom components:
  - PropertyCard
  - SearchBar
  - DatePicker
  - BookingCard
  - ThemedView
  - PoppinsText
- Platform-specific components
- Responsive layouts
- Loading and error states

### 7. Styling
- Custom theme system
- Dark/Light mode support
- Platform-specific styles
- Responsive design

### 8. Data Flow
1. Property Listing:
   - Fetch properties on app load
   - Filter properties based on search
   - Display in a scrollable list

2. Property Details:
   - Load property details on navigation
   - Display comprehensive information
   - Handle booking process

3. Booking Management:
   - Create new bookings
   - Track booking status
   - View booking history

## Development Guidelines

### 1. Code Style
- Follow TypeScript best practices
- Use functional components
- Implement proper error handling
- Write clean and maintainable code

### 2. Component Structure
- Keep components small and focused
- Use proper prop typing
- Implement proper error boundaries
- Follow React best practices

### 3. State Management
- Use Zustand for global state
- Implement React Query for server state
- Keep local state minimal
- Follow proper state update patterns

### 4. Testing
- Write unit tests for components
- Test API integration
- Implement error scenarios
- Test platform-specific features

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
