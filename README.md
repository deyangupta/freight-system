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

# 📄 Documentation: Added extra Fields in Freight Rate Import System

## 🧩 Overview

To accommodate diverse formats and annotations found in agent-provided freight rate sheets, we have introduced **three flexible remark fields** in the PostgreSQL schema and column-mapping interface: `remark1`, `remark2`, and `remark3`.

These fields are designed to capture important non-standard information that doesn't fit into the predefined schema but is essential for operational accuracy and traceability.

---

## 🎯 Rationale for Adding Remark Fields

Many uploaded freight rate sheets include **miscellaneous notes or comments**, such as:

- Special instructions from the agent
- Temporary surcharges or discounts
- Clarifications about rate validity or conditions
- Internal processing notes or remarks

To ensure this data is **not lost** during import or column mapping, these generic fields have been introduced.

---

## 📝 Field Descriptions

| Field Name | Data Type | Purpose / Usage |
|------------|-----------|------------------|
| `remark1`  | `TEXT`    | Stores the first miscellaneous note or comment from the source file |
| `remark2`  | `TEXT`    | Stores the second miscellaneous note or comment |
| `remark3`  | `TEXT`    | Stores the third miscellaneous note or comment |

---

## 🔗 Mapping Logic

- During the **column mapping** step, users can assign any **non-standard columns** (e.g., `notes`, `remarks`, `extra`) to `remark1`, `remark2`, or `remark3`.
- If more than three remark-like fields exist in the uploaded file:
  - Users are encouraged to **consolidate** or **prioritize** the most relevant information.
- The mapping interface labels these fields as:
  - **"Remark 1"**, **"Remark 2"**, and **"Remark 3"**
  - Includes **tooltips/help text** to explain their purpose.

---

## ✅ Justification

### Why are these fields necessary?

- Real-world freight rate sheets include **contextual or ad-hoc notes** that cannot always be anticipated or standardized.
- Ignoring this information could lead to:
  - **Misinterpretation** of rate terms
  - **Data loss** or **confusion**
- These fields preserve **important metadata** for operations, audits, and analytics.

---

## 🔄 Extensibility

If future data usage reveals a frequent need for more than 3 remark fields:

- The schema can be extended to include more `remarkX` columns.
- Alternatively, a single `remarks` field of type `JSONB` can be introduced for **unlimited and structured remarks**.

This approach offers a balance between **flexibility** and **simplicity**, keeping the database queryable and report-friendly.

---

## 👨‍💼 User Guidance

- Users are prompted in the UI to map any “Other”, “Note”, or “Remark” columns to the available remark fields.
- Clear guidance is provided on:
  - How to consolidate multiple remarks
  - What types of content are suitable for these fields
- Example tooltips:
  - *“Use this field to store special instructions or notes from the agent.”*

---

## 📌 Summary

The addition of `remark1`, `remark2`, and `remark3` ensures:

- All non-standard but valuable data from agent sheets is captured.
- Users have flexibility when mapping diverse file formats.
- The system remains extensible for future data needs.

This feature enhances the **reliability, completeness, and usefulness** of imported freight rate data.

## Screenshots

### Dashboard
<img width="1424" alt="image" src="https://github.com/user-attachments/assets/f9be1f2a-6def-4fcd-824f-8b8cf9cc6f7d" />

### File upload modal
<img width="518" alt="image" src="https://github.com/user-attachments/assets/d406bfde-aecf-4a19-b23d-cdf6867f3095" />

### Mapping screen
<img width="1426" alt="image" src="https://github.com/user-attachments/assets/958f6641-0ffb-4227-8b82-ffe9045db612" />

### Dashboard with data

<img width="1425" alt="image" src="https://github.com/user-attachments/assets/63971d80-e189-4d6b-b960-c4403d5445a2" />

### video sample


https://github.com/user-attachments/assets/e73d10b6-0d05-4f27-b1f4-78a66e856615


---




