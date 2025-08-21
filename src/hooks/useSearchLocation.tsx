import { useState } from 'react';

// Address structure from Nominatim
type NominatimAddress = {
  road?: string;
  suburb?: string;
  city_district?: string;
  city?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
};

// Main Nominatim result
export type TSearchResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string; // e.g., "service", "residential", "city", "house"
  place_rank: number;
  importance: number;
  addresstype: string;
  name?: string;
  display_name: string;
  address: NominatimAddress;
  boundingbox: [string, string, string, string];
};

export const useSearchLocation = () => {
  const [results, setResults] = useState<TSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = async (search: string) => {
    if (!search) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&addressdetails=1`,
      );

      if (!res.ok) throw new Error('Failed to fetch');

      const data: TSearchResult[] = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchLocation };
};
