import { Gate, Directions, DirectionsStep } from '../types';

export const generateFakeDirections = (from: Gate, to: string): Directions => {
  const steps: DirectionsStep[] = [
    {
      instruction: `Start at ${from.name}`,
      distance: '0 m',
      duration: '1 min'
    },
    {
      instruction: 'Walk through the main corridor',
      distance: '50 m',
      duration: '2 mins'
    },
    {
      instruction: 'Take the escalator/elevator to the parking level',
      distance: '20 m',
      duration: '2 mins'
    },
    {
      instruction: `Follow signs to ${to}`,
      distance: '100 m',
      duration: '3 mins'
    }
  ];

  return {
    from,
    to,
    steps,
    totalDistance: '170 m',
    totalDuration: '8 mins'
  };
};