import React, { useState, useEffect } from 'react';
import { Upload, Check, AlertCircle, Camera, X } from 'lucide-react';
import { carService } from '../services/apiService';
import { Car } from '../services/mockData';

const AdminPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [licensePlate, setLicensePlate] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  useEffect(() => {
    loadCars();
  }, []);
  
  const loadCars = async () => {
    try {
      setIsLoading(true);
      const data = await carService.getAllCars();
      setCars(data);
    } catch (err) {
      setError('Failed to load cars. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!licensePlate.trim()) {
      setError('License plate is required');
      return;
    }
    
    if (!location.trim()) {
      setError('Location is required');
      return;
    }
    
    if (!imageFile) {
      setError('License plate image is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('licensePlate', licensePlate);
      formData.append('location', location);
      formData.append('image', imageFile);
      
      const newCar = await carService.addCar(formData);
      
      // Update the cars list
      setCars(prevCars => [newCar, ...prevCars]);
      
      // Reset form
      setLicensePlate('');
      setLocation('');
      setImageFile(null);
      setPreviewUrl(null);
      
      // Show success message
      setSuccess('Car registered successfully with AI license plate recognition.');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
      
    } catch (err) {
      setError('Failed to register car. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Register new cars and manage the parking database
        </p>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Register New Car</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="input-group">
                <label htmlFor="licensePlate" className="input-label">
                  License Plate Number
                </label>
                <input
                  type="text"
                  id="licensePlate"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className="input-field"
                  placeholder="أ ب ج 1234"
                  dir="rtl"
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="location" className="input-label">
                  Parking Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-field"
                  placeholder="Level 2, Section B, Spot 15"
                />
              </div>
              
              <div className="input-group">
                <label htmlFor="image" className="input-label">
                  License Plate Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload an image</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              {previewUrl ? (
                <div className="flex-1 relative">
                  <img
                    src={previewUrl}
                    alt="License plate preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setPreviewUrl(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Image preview will appear here
                  </p>
                </div>
              )}
              
              {error && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-300 text-sm flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              {success && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md text-green-700 dark:text-green-300 text-sm flex items-start">
                  <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{success}</span>
                </div>
              )}
              
              <button
                type="submit"
                className="btn-primary mt-4 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Register Car
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Registered Cars</h2>
          <button
            onClick={loadCars}
            className="btn-secondary text-sm flex items-center"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border dark:border-gray-700 rounded-md p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded skeleton"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-1/3 skeleton"></div>
                    <div className="h-4 w-1/2 skeleton"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y dark:divide-gray-700">
            {cars.length > 0 ? (
              cars.map(car => (
                <div key={car.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0 mr-4">
                      <img
                        src={car.imageUrl}
                        alt={`Car ${car.id}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">
                        <span className="text-gray-500 dark:text-gray-400">License:</span> {car.licensePlate}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span>Location:</span> {car.location}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span>OCR Extracted:</span> {car.extractedText}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 py-4 text-center">
                No cars registered yet. Add a new car to get started.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;