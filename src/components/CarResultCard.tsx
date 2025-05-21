import React, { useState } from 'react';
import { Car as CarType } from '../types';
import { MapPin, Calendar, Hash, Navigation2, ChevronRight } from 'lucide-react';
import { generateFakeDirections } from '../services/directionsService';
import DirectionsModal from './DirectionsModal';

interface CarResultCardProps {
  car: CarType;
}

const CarResultCard: React.FC<CarResultCardProps> = ({ car }) => {
  const [showDirections, setShowDirections] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <>
      <div 
        className="glass-card overflow-hidden animate-slide-up hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="md:flex">
          <div className="md:w-2/5 h-56 md:h-auto relative overflow-hidden">
            <img
              src={car.imageUrl}
              alt={`Car with license plate ${car.licensePlate}`}
              className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="badge badge-primary mb-2">
                {car.nearestGate.name}
              </div>
              <h3 className="text-white text-lg font-semibold shadow-sm">
                {car.licensePlate}
              </h3>
            </div>
          </div>
          
          <div className="p-6 md:w-3/5 relative">
            <div className="flex flex-wrap items-start justify-between mb-6">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">License Plate Match</span>
                <div className="mt-1 text-xl font-semibold text-primary-600 dark:text-primary-400">
                  {car.extractedText}
                </div>
              </div>
              <div className="badge badge-accent">
                {car.id}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-primary-500" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                  <div className="font-medium">{car.location}</div>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Calendar className="h-5 w-5 mr-3 text-primary-500" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Registered</div>
                  <div className="font-medium">{formatDate(car.createdAt)}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                className="btn-primary w-full group flex items-center justify-center"
                onClick={() => setShowDirections(true)}
              >
                <Navigation2 className="h-5 w-5 mr-2 transition-transform group-hover:translate-x-1" />
                Get Directions
                <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDirections && (
        <DirectionsModal
          directions={generateFakeDirections(car.nearestGate, car.location)}
          onClose={() => setShowDirections(false)}
        />
      )}
    </>
  );
};

export default CarResultCard;