// Form validation utilities

export const validateBookIssue = (data) => {
  const errors = {};

  if (!data.bookId) {
    errors.bookId = 'Book is required';
  }

  if (!data.memberId) {
    errors.memberId = 'Member is required';
  }

  if (!data.issueDate) {
    errors.issueDate = 'Issue date is required';
  } else {
    const issueDate = new Date(data.issueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (issueDate < today) {
      errors.issueDate = 'Issue date cannot be less than today';
    }
  }

  if (!data.dueDate) {
    errors.dueDate = 'Return date is required';
  } else if (data.issueDate) {
    const issueDate = new Date(data.issueDate);
    const dueDate = new Date(data.dueDate);
    const daysDiff = Math.ceil((dueDate - issueDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 15) {
      errors.dueDate = 'Return date cannot be greater than 15 days from issue date';
    }
    
    if (daysDiff < 0) {
      errors.dueDate = 'Return date cannot be before issue date';
    }
  }

  return errors;
};

export const validateBookReturn = (data) => {
  const errors = {};

  if (!data.serialNo) {
    errors.serialNo = 'Serial number is required';
  }

  if (!data.returnDate) {
    errors.returnDate = 'Return date is required';
  }

  return errors;
};

export const validateFinePayment = (data, hasFine) => {
  const errors = {};

  if (hasFine && !data.finePaid) {
    errors.finePaid = 'Fine must be paid before completing transaction';
  }

  return errors;
};

export const validateMembership = (data) => {
  const errors = {};

  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.phone || data.phone.trim() === '') {
    errors.phone = 'Phone is required';
  }

  if (!data.address || data.address.trim() === '') {
    errors.address = 'Address is required';
  }

  if (!data.membershipType) {
    errors.membershipType = 'Membership duration is required';
  }

  return errors;
};

export const validateBook = (data) => {
  const errors = {};

  if (!data.serialNo || data.serialNo.trim() === '') {
    errors.serialNo = 'Serial number is required';
  }

  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (!data.author || data.author.trim() === '') {
    errors.author = 'Author is required';
  }

  if (!data.category || data.category.trim() === '') {
    errors.category = 'Category is required';
  }

  if (!data.type) {
    errors.type = 'Type is required';
  }

  if (!data.totalCopies || data.totalCopies < 1) {
    errors.totalCopies = 'Total copies must be at least 1';
  }

  return errors;
};

export const validateBookSearch = (data) => {
  const hasValue = Object.values(data).some(value => value && value.trim() !== '');
  
  if (!hasValue) {
    return { general: 'At least one search field must be filled' };
  }

  return {};
};

export const calculateDueDate = (issueDate, days = 15) => {
  const date = new Date(issueDate);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};
