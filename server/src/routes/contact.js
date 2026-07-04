import { Router } from 'express';
import { submitContact, getContacts } from '../controllers/contactController.js';
import { contactValidation } from '../middleware/validate.js';
import { requireAdminKey } from '../middleware/adminAuth.js';

const router = Router();

router.post('/', contactValidation, submitContact);
router.get('/', requireAdminKey, getContacts);

export default router;
