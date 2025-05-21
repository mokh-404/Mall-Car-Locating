import { supabase, CarTable, GateTable } from '../lib/supabase';
import { Car } from '../types';

export const supabaseService = {
  getAllCars: async (): Promise<Car[]> => {
    const { data: cars, error } = await supabase
      .from('cars')
      .select(`
        id,
        license_plate,
        location,
        image_url,
        extracted_text,
        created_at,
        nearest_gate_id,
        gates(
          id,
          name,
          description,
          coordinates
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }

    return cars.map(car => ({
      id: car.id,
      licensePlate: car.license_plate,
      location: car.location,
      imageUrl: car.image_url,
      extractedText: car.extracted_text,
      createdAt: car.created_at,
      nearestGate: {
        id: car.gates.id,
        name: car.gates.name,
        description: car.gates.description,
        coordinates: car.gates.coordinates
      }
    }));
  },

  searchCarsByLicensePlate: async (searchText: string): Promise<Car[]> => {
    if (!searchText.trim()) {
      return [];
    }

    const { data: cars, error } = await supabase
      .from('cars')
      .select(`
        id,
        license_plate,
        location,
        image_url,
        extracted_text,
        created_at,
        nearest_gate_id,
        gates(
          id,
          name,
          description,
          coordinates
        )
      `)
      .ilike('extracted_text', `%${searchText.trim()}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching cars:', error);
      throw error;
    }

    return cars.map(car => ({
      id: car.id,
      licensePlate: car.license_plate,
      location: car.location,
      imageUrl: car.image_url,
      extractedText: car.extracted_text,
      createdAt: car.created_at,
      nearestGate: {
        id: car.gates.id,
        name: car.gates.name,
        description: car.gates.description,
        coordinates: car.gates.coordinates
      }
    }));
  },

  addCar: async (formData: FormData): Promise<Car> => {
    const licensePlate = formData.get('licensePlate') as string;
    const location = formData.get('location') as string;
    const file = formData.get('image') as File;

    // Upload image to Supabase storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}${Date.now()}.${fileExt}`;
    
    // Skip bucket creation as it's already created in the Supabase dashboard
    // The bucket 'car-images' should already exist and be configured as public
    // with appropriate permissions

    // Upload file to bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    console.log('Upload attempt result:', { uploadData, uploadError });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw new Error('Failed to upload image. Please try again.');
    }

    const { data: { publicUrl: imageUrl } } = supabase.storage
      .from('photos')
      .getPublicUrl(fileName);
      
    console.log('Generated public URL:', imageUrl);
    
    // Extract the Arabic letters part of the license plate
    const extractedText = licensePlate.split(' ').slice(0, 3).join(' ');

    // Get all gates to find the nearest one
    const { data: gates, error: gateError } = await supabase
      .from('gates')
      .select('*');

    if (gateError) {
      console.error('Error fetching gates:', gateError);
      throw new Error('Failed to fetch gate information. Please try again.');
    }

    if (!gates || gates.length === 0) {
      throw new Error('No gates found in the system. Please contact the administrator.');
    }

    // Calculate nearest gate based on location coordinates
    const locationCoords = location.split(',').map(Number);
    let nearestGate = gates[0];
    let minDistance = Number.MAX_VALUE;

    gates.forEach(gate => {
      const distance = Math.sqrt(
        Math.pow(locationCoords[0] - gate.coordinates.lat, 2) +
        Math.pow(locationCoords[1] - gate.coordinates.lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestGate = gate;
      }
    });

    const { data: car, error } = await supabase
      .from('cars')
      .insert({
        license_plate: licensePlate,
        location,
        image_url: imageUrl,
        extracted_text: extractedText,
        nearest_gate_id: nearestGate.id
      })
      .select(`
        id,
        license_plate,
        location,
        image_url,
        extracted_text,
        created_at,
        nearest_gate_id,
        gates(
          id,
          name,
          description,
          coordinates
        )
      `)
      .single();

    if (error) {
      console.error('Error adding car:', error);
      throw error;
    }

    return {
      id: car.id,
      licensePlate: car.license_plate,
      location: car.location,
      imageUrl: car.image_url,
      extractedText: car.extracted_text,
      createdAt: car.created_at,
      nearestGate: {
        id: car.gates.id,
        name: car.gates.name,
        description: car.gates.description,
        coordinates: car.gates.coordinates
      }
    };
  }
};