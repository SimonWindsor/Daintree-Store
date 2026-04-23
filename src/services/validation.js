export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePasswordMatch = (password, repeatPassword) => {
  return password === repeatPassword;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9+\s()-]{8,15}$/;
  return phoneRegex.test(phone);
};

export const validateSignUp = (formData) => {
  const errors = {};

  if (!validateEmail(formData.email)) errors.email = 'Must be valiid email address';
  if (!validatePassword(formData.password)) errors.password = `Password must be at 
   least 8 characters and 
   include uppercase, lowercase, 
   number, and special character`;
  if (!validatePasswordMatch(formData.password, formData.repeatPassword)) errors.repeatPassword = 'Passwords do not match';
  if (!validatePhone(formData.phoneNumber)) errors.phoneNumber = 'Must be valid phone number';
  
  return errors;
}