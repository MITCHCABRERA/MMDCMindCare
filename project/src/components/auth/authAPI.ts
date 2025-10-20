import type { User } from "./useAuth"; 

const testDoctor: User = {
  email: "clear@gmail.com",
  password: "password123",
  name: "Dr. Maria Santos",
  role: "doctor",
};

const testAdmin: User = {
  email: "admin@mmdc.edu.ph",
  password: "admin123",
  name: "System Administrator",
  role: "admin",
};

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  if (email === testDoctor.email && password === testDoctor.password) {
    return { 
      email: testDoctor.email, 
      name: testDoctor.name, 
      role: "doctor"  
    };
  }

  if (email === testAdmin.email && password === testAdmin.password) {
  
    return { 
      email: testAdmin.email, 
      name: testAdmin.name, 
      role: "admin"  
    };
  }

  throw new Error("Invalid email or password");
};

export const loginWithGoogle = async (): Promise<User> => {
  return { 
    email: "googleuser@example.com", 
    name: "Google User", 
    role: "student"  
  };
};
