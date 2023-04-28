import { Client, Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const client = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'invoicedb',
    user: 'postgres',
    password: 'root',
})

const createTableQueries = [
    `
      CREATE TABLE IF NOT EXISTS invoice (
        id SERIAL PRIMARY KEY NOT NULL,
        clientName varchar(100) NOT NULL,
        clientEmail varchar(200) NOT NULL,
        status varchar(50) NOT NULL,
        paymentDue varchar(50) NOT NULL,
        paymentTerms varchar(100) NOT NULL,
        description text NOT NULL,
        created_at date,
        total money NOT NULL
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS address (
        id SERIAL PRIMARY KEY UNIQUE,
        street varchar(100) NOT NULL,
        city varchar(60) NOT NULL,
        client boolean NOT NULL,
        postcode varchar(100),
        country varchar(60),
        reference_id SERIAL REFERENCES invoice(id) ON DELETE CASCADE
      )
    `,
    `
     CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY UNIQUE,
      name varchar(100) NOT NULL,
      quantity integer NOT NULL,
      price integer NOT NULL,
      reference_id SERIAL REFERENCES invoice(id) ON DELETE CASCADE
    )
  `
  ];
  

// Connect to the PostgreSQL server using the pool
client.connect((err, client, release) => {
    if (err) {
      console.error('Failed to connect to the database', err);
      return;
    }
    console.log('Connected to the database', process.env.DB_PORT);
  
    // Iterate over the array of SQL queries and execute each one
    createTableQueries.forEach((query) => {
      client.query(query, (err, result) => {
        if (err) {
          console.error('Failed to create table', err);
          return;
        }
        console.log('Table created successfully');
      });
    });
  
    // Release the client back to the pool
    release();
  });

// address table - street, city, postcode, country, reference_id, client|sender - boolean
// client table -  clientName, clientEmail, reference_id,
// reference table - created at, payment due, descriptions, paymentTerms, status, total, clientName, clientEmail id 
// items table - name, quantity, price, total, reference_id 