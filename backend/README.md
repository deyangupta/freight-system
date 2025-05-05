# Freight Backend

This backend API allows users to upload CSV/XLSX rate sheets and map them to standard freight fields.

## Setup

1. Create a PostgreSQL DB named `freightdb`
2. Run the following SQL:

```sql
CREATE TABLE freight_rates (
  id SERIAL PRIMARY KEY,
  origin TEXT,
  destination TEXT,
  shipper TEXT,
  agent TEXT,
  pod TEXT,
  gp20 TEXT,
  gp40 TEXT,
  rate NUMERIC,
  carrier TEXT,
  "type" TEXT,
  remark1 TEXT,
  remark2 TEXT,
  remark3 TEXT,
  transit_time TEXT
);
```

## access db
```sql
1. brew services start postgresql
2. psql postgres
3. CREATE USER newuser WITH PASSWORD 'your_password';
4. CREATE DATABASE newdb OWNER newuser;
5. GRANT ALL PRIVILEGES ON DATABASE newdb TO newuser;
6. \c fright
7. GRANT ALL PRIVILEGES ON TABLE freight_rates TO newuser;
8. GRANT USAGE, SELECT, UPDATE ON SEQUENCE freight_rates_id_seq TO newuser;
```