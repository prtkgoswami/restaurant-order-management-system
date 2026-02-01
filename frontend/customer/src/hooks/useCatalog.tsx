import { useEffect, useState } from "react";
import type { Pizza } from "../types/catalog";

type HookResponse = {
  items: Pizza[];
  isLoading: boolean;
  error?: Error;
};

const useCatalog = (): HookResponse => {
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const fetchCatalog = async () => {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 5000);
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:4000/catalog", {
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch catalog")
      }

      clearTimeout(timeoutId);
      const data = await response.json();

      setItems(
        data.map((item) => ({
          id: item._id,
          ...item,
        }))
      );
    } catch (err) {
      clearTimeout(timeoutId);
      if ((err as Error).name === "AbortError") {
        console.error("Request Timed Out");
      } else {
        console.error("Failed to fetch catalog", err);
      }
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchCatalog();
  }, []);

  return {
    items,
    isLoading,
    error,
  };
};

export default useCatalog;
