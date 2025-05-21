import React, { useState } from 'react';
import { Search, Car, AlertCircle } from 'lucide-react';
import { carService } from '../services/apiService';
import { Car as CarType } from '../types';
import CarResultCard from '../components/CarResultCard';

const UserPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<CarType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchText.trim()) {
      setError('Please enter at least one letter from your license plate.');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      const cars = await carService.searchCarsByLicensePlate(searchText);
      setResults(cars);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to search for cars. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Car</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Enter a portion of your license plate (Arabic letters) to locate your car
        </p>
      </div>
      
      <div className="card mb-8">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="searchText" className="input-label">
                License Plate Letters (Arabic)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="searchText"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="input-field pl-10"
                  placeholder="أ ب ج"
                  dir="rtl"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="btn-primary w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Find My Car'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Results section */}
      <div className="space-y-6">
        {isLoading ? (
          // Loading skeletons
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card p-0 overflow-hidden">
                <div className="h-48 skeleton"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 w-3/4 skeleton"></div>
                  <div className="h-4 w-1/2 skeleton"></div>
                  <div className="h-4 w-2/3 skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {hasSearched && (
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">
                  {results.length > 0 
                    ? `Found ${results.length} cars matching "${searchText}"` 
                    : 'No cars found'}
                </h2>
              </div>
            )}
            
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map(car => (
                  <CarResultCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              hasSearched && (
                <div className="card text-center py-12">
                  <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No cars found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We couldn't find any cars matching your search. Please try with different letters.
                  </p>
                  <button
                    onClick={() => setSearchText('')}
                    className="btn-secondary"
                  >
                    Try another search
                  </button>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;