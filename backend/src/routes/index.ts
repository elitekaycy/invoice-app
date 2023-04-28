import express, {Request, Response} from 'express';
import { getLogger } from '@/utils/loggers';
import { InvoiceGetFromClientType } from '@/types';
import { client } from '../db/dbConnnect.'
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
        const newInvoice: InvoiceGetFromClientType  = _req?.body
        console.log("the request body ", _req?.body)

        client.query(`INSERT INTO invoice 
        (clientName, clientEmail, status, paymentDue, paymentTerms, description, total) 
        VALUES($1, $2, $3, $4, $5 ,$6, $7) RETURNING id`, 
        [newInvoice?.clientName, 
         newInvoice?.clientEmail, 
         newInvoice?.status, 
         newInvoice?.paymentDue, 
         newInvoice?.paymentTerms, 
         newInvoice?.projectDescription,
         newInvoice?.total
        ], (err, results) => {
          if(err) {
            throw new Error(`${err?.name}: ${err?.message}`)
          }

          const invoiceId = results?.rows[0]?.id
          console.log("invoice id is ", results)
          // insert both address - if error delete reference
          // insert items - if error delete reference
          const invoiceValues = [
            [newInvoice?.clientAddress?.country, newInvoice?.clientAddress?.city, 
              newInvoice?.clientAddress?.postCode, newInvoice?.clientAddress?.streetAddress, 
              true, invoiceId],
            [
              newInvoice?.senderAddress?.country, newInvoice?.senderAddress?.city, 
                newInvoice?.senderAddress?.postCode, newInvoice?.senderAddress?.streetAddress, 
                false, invoiceId
            ]
          ]

          for (let i = 0; i < invoiceValues?.length; i++){
            client.query(`INSERT INTO address (country, city, postcode, street, client, reference_id) VALUES ($1, $2, $3, $4, $5, $6)`, invoiceValues[i], 
            (err, result) => {
              if(err){
                // delete invoice here...
                throw new Error(`${err?.name}: ${err?.message}`)
              }
            }
            )
          }

          newInvoice?.items?.forEach(item => {
            client.query(`INSERT INTO items (name, quantity, price, reference_id) VALUES ($1, $2, $3, $4)`, [
              item?.itemName, item?.itemQuantity, item?.itemPrice, invoiceId
            ], (err, result) => {
              if(err) {
                // delete invoice here
                throw new Error(`${err?.name}: ${err?.message}`)
              }

              return res.status(201).send('created successfully')
            })
          })

        })

      }
      catch(err){
        res.status(400).send(`error occured ${err}`)
      }

})

export default router;
