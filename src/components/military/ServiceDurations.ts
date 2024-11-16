export const SERVICE_DURATIONS = {
  army: 18,
  navy: 20,
  airforce: 21,
} as const;

export type ServiceType = keyof typeof SERVICE_DURATIONS;