// Utilidades generales (validadores, formateadores, etc.)
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}; 