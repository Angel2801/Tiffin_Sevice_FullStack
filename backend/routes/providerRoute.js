import express from 'express';
import { createProvider, getProviderById, deleteProvider, updateProvider, loginProvider } from '../controllers/providerController.js';
import multer from 'multer';

const providerRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

// Define routes
providerRouter.post('/create', upload.single('logo'), createProvider);
providerRouter.get('/:id', getProviderById);
providerRouter.delete('/:id', deleteProvider);
providerRouter.put('/:id', updateProvider);
providerRouter.post('/login', loginProvider);

export default providerRouter;
