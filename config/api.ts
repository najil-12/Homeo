// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://192.168.1.240:3000',
  TIMEOUT: 10000, // 10 seconds
};

// API Endpoints
export const ENDPOINTS = {
  BOOKINGS: {
    LIST: '/bookings',
    DETAIL: (id: string) => `/bookings/${id}`,
    USER_BOOKINGS: (userId: string) => `/bookings?userId=${userId}`,
  },
  PROPERTIES: {
    LIST: '/properties',
    DETAIL: (id: string) => `/properties/${id}`,
  },
  PROFILE: {
    DETAIL: (userId: string) => `/profile?id=${userId}`,
  },
} as const;

// API Helper Functions
export const getApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`;

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// API Error Types
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API Request Helper
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API request failed: ${response.statusText}`,
        await response.json().catch(() => null)
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}; 