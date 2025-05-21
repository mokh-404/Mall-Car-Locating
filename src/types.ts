export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Gate {
  id: string;
  name: string;
  description: string;
  coordinates: Coordinates;
}

export interface Car {
  id: string;
  licensePlate: string;
  location: string;
  imageUrl: string;
  extractedText: string;
  createdAt: string;
  nearestGate: Gate;
}

export interface DirectionsStep {
  instruction: string;
  distance: string;
  duration: string;
}

export interface Directions {
  from: Gate;
  to: string;
  steps: DirectionsStep[];
  totalDistance: string;
  totalDuration: string;
}