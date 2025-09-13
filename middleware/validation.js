// middleware/validation.js
// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Credit card validation function
const isValidCardNumber = (cardNumber) => {
    const cardRegex = /^\d{12}$/;
    return cardRegex.test(cardNumber);
};

// CVV validation function
const isValidCVV = (cvv) => {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
};

// Expiry date validation function
const isValidExpiryDate = (expiryDate) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/;
    if (!expiryRegex.test(expiryDate)) return false;
    
    const [month, year] = expiryDate.split('/');
    const expiry = new Date(
        year.length === 2 ? `20${year}` : year, 
        month - 1
    );
    const currentDate = new Date();
    
    return expiry > currentDate;
};

// Date of birth validation function
const isValidDateOfBirth = (dateOfBirth) => {
    const dateRegex = /^\d{4}[-.\/](0[1-9]|1[0-2])[-.\/](0[1-9]|[12][0-9]|3[01])$/;
    if (!dateRegex.test(dateOfBirth)) return false;
    
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();
    
    return age >= 18 && age <= 100; // Assuming customers must be adults
};

// Main validation middleware
const validateCustomerRegistration = (req, res, next) => {
    const {
        name, address, email, dateOfBirth, gender, age,
        cardHolderName, cardNumber, expirytDate, cvv, timeStamp
    } = req.body;

    // Check for missing required fields
    const requiredFields = [
        'name', 'address', 'email', 'dateOfBirth', 'gender', 
        'age', 'cardHolderName', 'cardNumber', 'expirytDate', 'cvv', 'timeStamp'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    // Validate email
    if (!isValidEmail(email)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Invalid email format'
        });
    }

    // Validate credit card number
    if (!isValidCardNumber(cardNumber)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Credit card number must be exactly 12 digits'
        });
    }

    // Validate CVV
    if (!isValidCVV(cvv)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'CVV must be 3 or 4 digits'
        });
    }

    // Validate expiry date
    if (!isValidExpiryDate(expirytDate)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Invalid or expired card expiry date. Use format MM/YYYY or MM/YY'
        });
    }

    // Validate date of birth
    if (!isValidDateOfBirth(dateOfBirth)) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Invalid date of birth or age must be between 18 and 100'
        });
    }

    // Validate gender
    const validGenders = ['male', 'female', 'other'];
    if (!validGenders.includes(gender.toLowerCase())) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Gender must be one of: male, female, other'
        });
    }

    // If all validations pass, proceed to the next middleware/route handler
    next();
};

module.exports = {
    validateCustomerRegistration,
    isValidEmail,
    isValidCardNumber,
    isValidCVV,
    isValidExpiryDate,
    isValidDateOfBirth
};