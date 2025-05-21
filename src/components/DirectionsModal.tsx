import React from 'react';
import { X, Navigation2, Clock, Route, MapPin } from 'lucide-react';
import { Directions } from '../types';

interface DirectionsModalProps {
  directions: Directions;
  onClose: () => void;
}

const DirectionsModal: React.FC<DirectionsModalProps> = ({ directions, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-400">
                Find Your Car
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Follow these directions to reach your car
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/40 rounded-full">
                  <Navigation2 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Starting Point</div>
                  <div className="font-medium text-primary-700 dark:text-primary-300">
                    {directions.from.name}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Time</div>
                <div className="font-medium text-primary-700 dark:text-primary-300">
                  {directions.totalDuration}
                </div>
              </div>
            </div>

            <div className="space-y-4 relative before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-0.5 before:bg-primary-100 dark:before:bg-primary-900/40">
              {directions.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start pl-2 relative"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-700 flex items-center justify-center z-10">
                    {index === 0 ? (
                      <MapPin className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    ) : (
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <p className="text-gray-900 dark:text-gray-100 font-medium">
                        {step.instruction}
                      </p>
                      <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <Route className="h-4 w-4 mr-1" />
                          {step.distance}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-accent-50 dark:bg-accent-900/20 rounded-lg border border-accent-100 dark:border-accent-800">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-accent-100 dark:bg-accent-900/40 rounded-full">
                  <MapPin className="h-5 w-5 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <div className="font-medium text-accent-700 dark:text-accent-300 mb-1">
                    Navigation Tips
                  </div>
                  <p className="text-sm text-accent-600 dark:text-accent-400">
                    Look for section and spot numbers on walls and floor markings. If you need assistance, our parking staff is available at every level.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectionsModal;