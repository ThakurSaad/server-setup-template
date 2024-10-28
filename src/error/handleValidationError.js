const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });

  const combinedMessages = errors.map((e) => e.message).join(", ");

  const statusCode = 400;
  return {
    statusCode,
    message: `Validation Error: ${combinedMessages}`,
    errorMessages: errors,
  };
};

module.exports = handleValidationError;
