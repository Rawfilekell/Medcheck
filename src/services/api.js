/**
 * Backend integration point.
 * No backend, database or external API is connected in this project.
 * Each service method rejects with ServiceUnavailableError.
 * When a backend exists, replace the body of a method with a real request
 * (e.g. `return request('/medicines?q=...')`) and keep the same return shape.
 */
export class ServiceUnavailableError extends Error {
  constructor(feature) {
    super(`${feature} is not yet available. MedCheck has no connected data source or backend yet.`);
    this.name = 'ServiceUnavailableError';
    this.feature = feature;
  }
}

export const unavailable = (feature) => Promise.reject(new ServiceUnavailableError(feature));
