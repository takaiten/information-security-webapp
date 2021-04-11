const EMAIL_REGEXP = /^\w+@\w+\.\w{2,3}$/;

export const EMAIL_VALIDATION_RULES = [
    { required: true, message: 'This field is required' },
    { pattern: EMAIL_REGEXP, message: 'Please enter valid email' },
];
