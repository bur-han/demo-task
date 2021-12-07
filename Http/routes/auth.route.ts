import express from 'express';
import AuthController from '../controllers/auth.controller';

const router = express.Router();
const authController = new AuthController();

router.post('/login', (req, res) => {
  authController.loginUser(req, res);
});

router.get('/google', (req, res) => {
  authController.getUrlForGoogleUser(req, res);
});

router.get('/google/callback', (req, res) => {
  authController.getGoogleUserProfile(req, res);
});

export default router;
