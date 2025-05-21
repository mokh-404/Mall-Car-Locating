-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create gates table
CREATE TABLE gates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  coordinates JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create cars table with foreign key constraint
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

-- Create index for faster license plate searches
CREATE INDEX idx_cars_license_plate ON cars(license_plate);
CREATE INDEX idx_cars_extracted_text ON cars(extracted_text);

-- Create index for gate lookups
CREATE INDEX idx_cars_nearest_gate ON cars(nearest_gate_id);