export const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msj: err.message });
  } else res.status(500).json({ msj: "Internal server error" });
};
