// Validation middleware for task creation
const validateTaskInput = (req, res, next) => {
  const { title, description, status } = req.body;
  const errors = [];

  // Trim inputs
  if (title) req.body.title = title.trim();
  if (description) req.body.description = description.trim();

  // Title validation
  if (!req.body.title || req.body.title === '') {
    errors.push('Title is required and cannot be empty');
  } else if (req.body.title.length > 255) {
    errors.push('Title cannot exceed 255 characters');
  }

  // Description validation
  if (!req.body.description || req.body.description === '') {
    errors.push('Description is required');
  } else if (req.body.description.length < 20) {
    errors.push('Description must be at least 20 characters');
  } else if (req.body.description.length > 5000) {
    errors.push('Description cannot exceed 5000 characters');
  }

  // Status validation (optional, only if provided)
  if (status) {
    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      errors.push('Invalid status. Must be: Pending, In Progress, or Completed');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

// Validation middleware for status update
const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;
  const errors = [];

  if (!status || status.trim() === '') {
    errors.push('Status is required');
  } else {
    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status.trim())) {
      errors.push('Invalid status. Must be: Pending, In Progress, or Completed');
    }
  }

  if (!req.params.id || isNaN(req.params.id)) {
    errors.push('Valid task ID is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

// Validation middleware for task ID
const validateTaskId = (req, res, next) => {
  if (!req.params.id || isNaN(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: ['Valid task ID is required']
    });
  }

  next();
};

module.exports = {
  validateTaskInput,
  validateStatusUpdate,
  validateTaskId
};
