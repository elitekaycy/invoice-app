import express, {Request, Response} from 'express';
import { getLogger } from '@/utils/loggers';
import { InvoiceGetFromClientType } from '@/types';
const router = express.Router();
const logger = getLogger('INDEX_ROUTE');

/* GET home page. */
router.get('/', function (_req, res, _next) {
  res.json({ data: 'invoice router '})
});

const InvoiceDB = []

// create invoice router
/* 
  1. takes the invoice from the frontend
  2. validates all the input
  3. creates an invoice and return a list of invoice created sorted by time created
  4. sends back 201 message with created to be true
*/

router.post ('/create', function(_req: Request, res: Response, _next){
      try {
        const newInvoice: InvoiceGetFromClientType  = _req?.body?.invoice

        InvoiceDB.push(newInvoice) // siginfy push to database
        return res.status(201).json({ created: true, data: newInvoice})
      }
      catch(err){
        res.status(400).send('error occured')
      }

})

export default router;
