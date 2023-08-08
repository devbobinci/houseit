export type Estate = {
  id: string;
  address: {
    country: string;
    city: string;
    street: string;
    number: number;
  };
  features: string[];
  premises: {
    baths: number;
    beds: number;
    area: number;
  };
  price: number;
  mainImage: string;
  images: string[];
  description: string;
  userId?: string;
  timestamp?: number;
};

export type Listing = {
  id?: string;
  address: {
    country: string | undefined;
    city: string | undefined;
    street: string;
    number: number | undefined;
  };
  features: string[];
  premises: {
    baths: number | undefined;
    beds: number | undefined;
    area: number | undefined;
  };
  description: string;
  price: number | undefined;
  userId?: string;
};
