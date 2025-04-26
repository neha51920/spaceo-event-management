export interface User {
    name: string;
    email: string;
    password: string;
  }
  
  export interface Event {
    _id?: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    totalGuests: number;
    category: string;
    images?: File[];
  }
  