// utils/validation.js

const validateUser = (body) => {
    const requiredFields = ["name", "email", "password"];
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return false; // Invalid if any required field is missing or empty
      }
    }
    return true; // Valid if all required fields are present
  };

  const validateBlog = (body) => {
   
    const requiredFields = ["title", "blogImage", "category", "about"];
    
    
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return {
          isValid: false,
          message: `${field} is required and cannot be empty.`,
        };
      }
    }
  
    // Validate the 'about' field for minimum length
    if (body.about.length < 200) {
      return {
        isValid: false,
        message: "The 'about' field must contain at least 200 characters.",
      };
    }
  
    return { isValid: true };
  };
  

  const loginValidate = (users) => {
    if (!users?.email || !users?.password) {
      return false;
    }
    return true;
  };

module.exports = {
    validateUser,
    loginValidate,
    validateBlog
};
