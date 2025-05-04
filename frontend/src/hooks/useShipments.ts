import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShipmentData } from '../types';

export const useShipments = () => {
  const [data, setData] = useState<ShipmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-shipments`);
      setData(response.data.shipments);
    } catch (error) {
      setError('Failed to fetch shipments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return { data, loading, error, refetchShipments: fetchShipments };
};