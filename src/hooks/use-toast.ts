// src/hooks/use-toast.ts
export function useToast() {
  return {
    toast: (message: string) => {
      alert(message) // simple fallback
    }
  }
}