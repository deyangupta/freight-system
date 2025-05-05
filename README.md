# 🚢 Freight Rate Import System

A web-based Freight Rate Import System built using **React + Tailwind CSS (Frontend)**, **Node.js + Express (Backend)**, and **PostgreSQL (Database)**. This app allows users to upload `.csv` or `.xlsx` freight rate files, map the columns dynamically, and store the data in a standardized format.

---

## 📦 Features

- 📁 **File Upload**: Supports `.csv` and `.xlsx` files.
- 🧠 **Dynamic Column Mapping**: Map uploaded columns to standard system columns.
- ✅ **Validation & Processing**: Process and store mapped freight rates to the database.
- 📊 **Data Preview Table**: View processed data directly on the dashboard.
- 🔐 **Modular Architecture**: Clean separation between frontend, backend, and components.

---

## 🛠 Tech Stack

| Layer      | Tech Used                  |
|------------|----------------------------|
| Frontend   | React, TypeScript, Tailwind CSS, Headless UI |
| Backend    | Node.js, Express           |
| Database   | PostgreSQL                 |
| Utilities  | `xlsx`, `multer`, `dotenv`, `axios` |
| Dev Tools  | `nodemon`, `ts-node`, `concurrently` |

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/deyangupta/freight-system.git
cd freight-system
```

### Backend

#### frontend/.env
```
VITE_API_URL=http://localhost:5001/api
```
#### backend/.env
```
DATABASE_URL=postgresql://deyan:deyan@localhost:5432/freight
```

## Database Setup

### 1. Install PostgreSQL
```bash
brew install postgresql@15
brew services start postgresql@15
```
### 2. Create Database
```sh
psql postgres
```

```sql
3. CREATE USER newuser WITH PASSWORD 'your_password';
4. CREATE DATABASE newdb OWNER newuser;
5. GRANT ALL PRIVILEGES ON DATABASE newdb TO newuser;
6. \c fright
7. GRANT ALL PRIVILEGES ON TABLE freight_rates TO newuser;
8. GRANT USAGE, SELECT, UPDATE ON SEQUENCE freight_rates_id_seq TO newuser;
```
### 3. Create Table

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

## start backend server
```bash
cd backend
npm install
npm start
```

## start frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Upload & Map Freight File

```
POST /api/files/upload
FormData: { file: .csv/.xlsx file, mapping: JSON column mapping }
```

### Get All Shipments
```
GET /api/get-shipments
Response: [{ id, origin, destination, rate, ... }]
```

