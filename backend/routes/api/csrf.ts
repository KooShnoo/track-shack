import express from "express";
const router = express.Router();

const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  // In development, allow developers to access the CSRF token to test the
  // server endpoints in Postman.
  router.get("/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.status(200).json({
      'CSRF-Token': csrfToken
    });
  });
}

export default router;