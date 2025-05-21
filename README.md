# Mall Car Locator System 🚗

## Project Overview

The Mall Car Locator is an AI-powered license plate recognition system that helps mall visitors locate their parked vehicles efficiently. The system uses OCR (Optical Character Recognition) technology to extract Arabic letters from license plates and provides an intuitive interface for both administrators and users.

## Features

- **License Plate Recognition**: Extracts Arabic text from license plate images
- **Car Registration**: Admin interface for registering vehicles with their parking locations
- **Location Search**: Users can find their cars by entering partial license plate information
- **Directions**: Provides step-by-step directions from mall entrances to parked vehicles
- **Responsive Design**: Works on both desktop and mobile devices
- **Dark/Light Mode**: Supports theme preferences

## Technology Stack

### Frontend
- React 18.3.1 with TypeScript
- Vite 5.4.2 as build tool
- TailwindCSS for styling
- React Router for navigation
- Context API for state management

### Backend
- Supabase for database and storage
- PostgreSQL database (via Supabase)

## Database Schema

### Gates Table
```sql
CREATE TABLE gates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  coordinates JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Cars Table
```sql
CREATE TABLE cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  license_plate VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  extracted_text VARCHAR(255) NOT NULL,
  nearest_gate_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_nearest_gate
    FOREIGN KEY (nearest_gate_id)
    REFERENCES gates(id)
    ON DELETE CASCADE
);
```

## Setup and Installation

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   cd project
   npm install
   ```

3. **Set up Supabase**
   - Create a Supabase account at [supabase.com](https://supabase.com)
   - Create a new project
   - Run the SQL scripts in `schema.sql` to create the database tables
   - Run the migration script in `migrations/01_insert_gates.sql` to add initial gate data
   - Update the Supabase URL and key in `src/lib/supabase.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Application Structure

### Core Components

- **App.tsx**: Main application component with routing setup
- **Layout.tsx**: Common layout wrapper with Navbar
- **ThemeContext.tsx**: Dark/light mode management

### Pages

- **HomePage.tsx**: Landing page with links to user and admin interfaces
- **UserPage.tsx**: Interface for users to search for their cars
- **AdminPage.tsx**: Interface for admins to register cars and manage the system

### Services

- **apiService.ts**: API service for car management functionality
- **supabaseService.ts**: Supabase database operations
- **directionsService.ts**: Generates directions from gates to car locations

## How It Works

### Car Registration Process

1. Admin uploads a photo of the car's license plate along with its location
2. The system extracts the Arabic text from the license plate
3. The system determines the nearest gate to the car's location
4. The car information is stored in the database

### Car Search Process

1. User enters a portion of their license plate (Arabic letters)
2. The system searches for matching license plates in the database
3. Matching cars are displayed with their locations
4. User can view directions from the nearest gate to their car

## Common Issues and Solutions

### Image Upload Issues

- **Problem**: Image upload fails
- **Solution**: Ensure the Supabase storage bucket exists and has public access enabled

### OCR Text Extraction

- **Problem**: Arabic text not correctly extracted
- **Solution**: Ensure the license plate image is clear and well-lit

### Database Connection

- **Problem**: Cannot connect to Supabase
- **Solution**: Check that the Supabase URL and key are correct in `src/lib/supabase.ts`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- [Your Name] - Initial work
