import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Search, ShieldCheck } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="py-10 animate-fade-in">
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Mall Car Locator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Find your car easily with our AI-powered license plate recognition system
        </p>
      </section>
      
      <section className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <Link 
          to="/user"
          className="card hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Find My Car</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your partial license plate to locate your car in the parking lot
            </p>
            <button className="btn-primary mt-6">
              Find My Car
            </button>
          </div>
        </Link>
        
        <Link 
          to="/admin"
          className="card hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 mb-4">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Admin Panel</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Register new vehicles and manage the parking database
            </p>
            <button className="btn-accent mt-6">
              Admin Panel
            </button>
          </div>
        </Link>
      </section>
      
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-medium mb-2">Register Cars</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Admin uploads car photos and registers their location
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-medium mb-2">AI Recognition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our AI extracts license plate information from the photos
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-medium mb-2">Find Your Car</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter part of your license plate to quickly locate your car
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;