export * from "./authentication";
export * from "./firebase";
export * from "./formatDateTime";

export interface ProgressingResponse {
  onSuccess?: (val?: any) => void;
  onError?: (error: string) => void;
  onComplete?: (val?: any) => void;
}
