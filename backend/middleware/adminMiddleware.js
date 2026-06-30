// Admin Only
export const admin = (req, res, next) => {
  if (
    req.user &&
    req.user.role === "admin"
  ) {
    return next();
  }

  return res.status(403).json({
    message: "Admin access only",
  });
};

// Admin + Sub Admin
export const adminOrSubAdmin = (
  req,
  res,
  next
) => {
  if (
    req.user &&
    (
      req.user.role === "admin" ||
      req.user.role === "subadmin"
    )
  ) {
    return next();
  }

  return res.status(403).json({
    message:
      "Admin or Sub Admin access only",
  });
};

export default admin;