import React, { useEffect, useState } from 'react';
import PropertyCard from '../../Dashboards/AddProperty/PropertyCard';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../../../firebaseConfig';
import PropertyDetailsPopup from './PropertyFocusPopup';
import './Recommended.css';

// Define the property interface
interface Property {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  space: string;
  clicks: number;
  wishlist: number;
  cryptoaccepted: boolean;
  daoenabled: false;
  // Add other fields as necessary
}

const Recommendations = () => {
  const [topproperties, setTopProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = collection(firestore, 'topproperties');
        const querySnapshot = await getDocs(q);
        const propertiesArray: Property[] = querySnapshot.docs.map(doc => ({
          idc: doc.id,
          ...doc.data() as Property // Ensure the data is cast to the Property type
        }));
        setTopProperties(propertiesArray);
      } catch (error) {
        console.error("Error fetching properties: ", error);
      }
    };

    fetchProperties();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleCardClick = (property: Property) => {
    // Handle the card click (e.g., navigate to a property details page or open a modal)
    console.log('Card clicked:', property);
    setSelectedProperty(property);
  };

  const closePopup = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="personalized-picks">
      <h2 className="text-2xl font-bold mb-4">Personalized Picks</h2>

      <div className="property-cards">
        {topproperties.map(property => (
          <PropertyCard 
            key={property.id}
            {...property}
            onClick={() => handleCardClick(property)} 
          />
        ))}
      </div>

      {selectedProperty && (
        <PropertyDetailsPopup 
          property={selectedProperty} 
          onClose={closePopup} 
        />
      )}
      
    </div>
  );
}

export default Recommendations;
