import express from 'express';
import AuthController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', (req, res) => {
  AuthController.loginUser(req, res);
});

router.get('/google', (req, res) => {
  AuthController.getUrlForGoogleUser(req, res);
});

router.get('/google/callback', (req, res) => {
  AuthController.getGoogleUserProfile(req, res);
});

export default router;
