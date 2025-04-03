// src/components/venues/VenueCard.jsx
const VenueCard = ({ venue }) => {
    return (
      <div className="border rounded-lg overflow-hidden shadow-md">
        <div className="p-4">
          <h3 className="text-xl font-semibold">{venue.name}</h3>
          <div className="mt-2 text-gray-600">
            <p>Capacity: {venue.capacity} people</p>
            <p>Price: ${venue.price_per_hour}/hour</p>
            <p>Status: {venue.status}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default VenueCard;