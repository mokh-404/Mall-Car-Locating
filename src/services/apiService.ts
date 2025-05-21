import { Car } from '../types';
import { supabaseService } from './supabaseService';

/**
 * API service for car management functionality
 */
export const carService = {
  /**
   * Fetches all cars from the database
   */
  getAllCars: async (): Promise<Car[]> => {
    return supabaseService.getAllCars();
  },

  /**
   * Searches for cars by partial license plate match
   */
  searchCarsByLicensePlate: async (searchText: string): Promise<Car[]> => {
    return supabaseService.searchCarsByLicensePlate(searchText);
  },

  /**
   * Adds a new car with OCR processing
   */
  addCar: async (formData: FormData): Promise<Car> => {
    return supabaseService.addCar(formData);
  },
};