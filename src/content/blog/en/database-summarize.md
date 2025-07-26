---
title: The Complete PostgreSQL Database Guide for Developers
slug: en/database-summarize
image:
  src: /covers/database-summarize.webp
  alt: Complete PostgreSQL database guide for developers
author: Cristian Arando
language: en
tags: [sql, database]
publishDate: "2025-07-24"
authorContact: crisarandosyse@gmail.com
readTime: 45 min
excerpt: A comprehensive guide to PostgreSQL database management, covering everything from basic concepts to advanced techniques, including SQL fundamentals, data modeling, normalization, transactions, triggers, and best practices for performance and security.
---

# The Complete PostgreSQL Database Guide for Developers

This comprehensive guide covers essential PostgreSQL database concepts and practices every developer should master, from junior to senior level. You'll learn everything from basic SQL operations to advanced database design patterns and optimization techniques.

## Table of Contents

1. [Database Fundamentals](#database-fundamentals)
2. [PostgreSQL Overview](#postgresql-overview)
3. [SQL Fundamentals](#sql-fundamentals)
4. [Creating and Managing Tables](#creating-and-managing-tables)
5. [Data Types and Constraints](#data-types-and-constraints)
6. [Querying Data - SELECT Statement](#querying-data---select-statement)
7. [Joining Tables](#joining-tables)
8. [Data Modification](#data-modification)
9. [Data Modeling & Design](#data-modeling--design)
10. [Normalization](#normalization)
11. [Advanced SQL Concepts](#advanced-sql-concepts)
12. [Transactions & ACID](#transactions--acid)
13. [Indexes & Performance](#indexes--performance)
14. [Triggers & Stored Procedures](#triggers--stored-procedures)
15. [Views and Materialized Views](#views-and-materialized-views)
16. [Security & Best Practices](#security--best-practices)
17. [Performance Optimization](#performance-optimization)
18. [Monitoring & Maintenance](#monitoring--maintenance)

## Database Fundamentals

### What is a Database?
A database is an organized collection of structured information, or data, typically stored electronically in a computer system. Think of it as a digital filing cabinet where you can store, organize, and retrieve information efficiently.

**Key Components:**
- **Data**: The actual information stored (names, numbers, dates, etc.)
- **DBMS (Database Management System)**: Software that manages the database (PostgreSQL, MySQL, etc.)
- **Schema**: The structure that defines how data is organized
- **Tables**: Collections of related data organized in rows and columns

### Why Use Databases?
1. **Data Integrity**: Ensures data accuracy and consistency
2. **Concurrency**: Multiple users can access data simultaneously
3. **Security**: Control who can access what data
4. **Backup & Recovery**: Protect against data loss
5. **Scalability**: Handle growing amounts of data
6. **ACID Compliance**: Reliable transaction processing

### Types of Database Systems

**Relational Databases (RDBMS)**
- Data stored in tables with predefined relationships
- Use SQL (Structured Query Language) for operations
- ACID compliant for reliable transactions
- Examples: PostgreSQL, MySQL, Oracle, SQL Server

**Key Characteristics:**
- **Structured Data**: Fixed schema with defined columns and data types
- **Relationships**: Tables can be related through foreign keys
- **Consistency**: Strong data integrity guarantees
- **Mature Technology**: Decades of development and optimization

## PostgreSQL Overview

PostgreSQL is an advanced, open-source relational database system known for its reliability, feature robustness, and performance. It's often called "the world's most advanced open source database."

### Why Choose PostgreSQL?

**1. ACID Compliance**
PostgreSQL ensures that all transactions are:
- **Atomic**: All operations in a transaction succeed or all fail
- **Consistent**: Database remains in a valid state
- **Isolated**: Transactions don't interfere with each other
- **Durable**: Committed changes persist even after system failure

**2. Advanced Features**
- **JSON/JSONB Support**: Store and query JSON data natively
- **Arrays**: Column can contain multiple values
- **Custom Data Types**: Create your own data types
- **Full-Text Search**: Built-in search capabilities
- **Window Functions**: Advanced analytical queries
- **Common Table Expressions (CTEs)**: Recursive and non-recursive queries

**3. Extensibility**
- Custom functions in multiple languages (PL/pgSQL, Python, JavaScript)
- Extensions for additional functionality
- Custom operators and aggregates

**4. Concurrency Control**
- **MVCC (Multi-Version Concurrency Control)**: Readers don't block writers
- Multiple isolation levels
- Deadlock detection and resolution

**5. Scalability Options**
- Read replicas for scaling reads
- Partitioning for large tables
- Connection pooling
- Horizontal scaling with tools like Citus

## SQL Fundamentals

SQL (Structured Query Language) is the standard language for interacting with relational databases. It's divided into several categories:

### SQL Command Categories

**1. DDL (Data Definition Language)**
Commands that define database structure:
- `CREATE`: Create database objects (tables, indexes, etc.)
- `ALTER`: Modify existing database objects
- `DROP`: Delete database objects
- `TRUNCATE`: Remove all data from a table

**2. DML (Data Manipulation Language)**
Commands that manipulate data:
- `SELECT`: Retrieve data from tables
- `INSERT`: Add new data to tables
- `UPDATE`: Modify existing data
- `DELETE`: Remove data from tables

**3. DCL (Data Control Language)**
Commands that control access to data:
- `GRANT`: Give privileges to users
- `REVOKE`: Remove privileges from users

**4. TCL (Transaction Control Language)**
Commands that manage transactions:
- `BEGIN`: Start a transaction
- `COMMIT`: Save transaction changes
- `ROLLBACK`: Undo transaction changes
- `SAVEPOINT`: Create a rollback point within a transaction

## Creating and Managing Tables

### Database and Schema Creation

First, let's understand the hierarchy: Database → Schema → Table

```sql
-- Create a new database
CREATE DATABASE company_db;

-- Connect to the database
\c company_db;

-- Create a schema (namespace for organizing objects)
CREATE SCHEMA hr;
CREATE SCHEMA sales;

-- Set search path to include schemas
SET search_path TO hr, sales, public;
```

**Why use schemas?**
- **Organization**: Group related tables together
- **Security**: Different permissions for different schemas
- **Naming**: Same table name can exist in different schemas
- **Multi-tenancy**: Separate data for different clients

### Creating Tables

The `CREATE TABLE` statement defines a new table structure:

```sql
-- Basic table creation
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hire_date DATE DEFAULT CURRENT_DATE,
    salary DECIMAL(10,2),
    department_id INTEGER,
    is_active BOOLEAN DEFAULT true
);
```

**Let's break this down:**
- `SERIAL`: Auto-incrementing integer (equivalent to `INTEGER GENERATED BY DEFAULT AS IDENTITY`)
- `PRIMARY KEY`: Uniquely identifies each row
- `VARCHAR(50)`: Variable-length string up to 50 characters
- `NOT NULL`: Column cannot be empty
- `UNIQUE`: No duplicate values allowed
- `DEFAULT`: Value used when none is provided
- `DECIMAL(10,2)`: Number with 10 total digits, 2 after decimal point

### Table Constraints

Constraints enforce rules on data to maintain integrity:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Table-level constraints
    CONSTRAINT chk_positive_price CHECK (price > 0),
    CONSTRAINT chk_non_negative_stock CHECK (stock_quantity >= 0),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

**Types of constraints:**
- **PRIMARY KEY**: Unique identifier for each row
- **FOREIGN KEY**: Links to another table's primary key
- **UNIQUE**: Ensures no duplicate values
- **CHECK**: Custom validation rules
- **NOT NULL**: Prevents empty values

### Modifying Tables with ALTER

The `ALTER TABLE` statement modifies existing table structure:

```sql
-- Add a new column
ALTER TABLE employees 
ADD COLUMN phone VARCHAR(20);

-- Add column with constraint
ALTER TABLE employees 
ADD COLUMN manager_id INTEGER REFERENCES employees(id);

-- Modify existing column
ALTER TABLE employees 
ALTER COLUMN salary SET NOT NULL;

-- Change column data type
ALTER TABLE employees 
ALTER COLUMN phone TYPE VARCHAR(25);

-- Rename column
ALTER TABLE employees 
RENAME COLUMN phone TO phone_number;

-- Add constraint to existing table
ALTER TABLE employees 
ADD CONSTRAINT chk_positive_salary CHECK (salary > 0);

-- Drop constraint
ALTER TABLE employees 
DROP CONSTRAINT chk_positive_salary;

-- Drop column
ALTER TABLE employees 
DROP COLUMN phone_number;
```

### Dropping Tables

```sql
-- Drop table (fails if referenced by foreign keys)
DROP TABLE employees;

-- Drop with cascade (removes dependent objects)
DROP TABLE employees CASCADE;

-- Drop only if exists (no error if table doesn't exist)
DROP TABLE IF EXISTS employees;
```

## Data Types and Constraints

### Numeric Data Types

PostgreSQL offers various numeric types for different needs:

```sql
CREATE TABLE numeric_examples (
    -- Integer types
    small_int SMALLINT,      -- -32,768 to 32,767
    regular_int INTEGER,     -- -2,147,483,648 to 2,147,483,647
    big_int BIGINT,         -- Very large integers
    
    -- Auto-incrementing integers
    auto_id SERIAL,         -- 1 to 2,147,483,647
    big_auto_id BIGSERIAL,  -- 1 to 9,223,372,036,854,775,807
    
    -- Decimal types
    exact_decimal DECIMAL(10,2),  -- Exact precision
    money_amount NUMERIC(15,2),   -- Same as DECIMAL
    
    -- Floating point
    real_number REAL,            -- 6 decimal digits precision
    double_number DOUBLE PRECISION -- 15 decimal digits precision
);
```

**When to use each:**
- **SERIAL/BIGSERIAL**: Auto-incrementing IDs
- **INTEGER**: Most common for whole numbers
- **DECIMAL/NUMERIC**: Financial calculations (exact precision)
- **REAL/DOUBLE PRECISION**: Scientific calculations (approximate)

### Character Data Types

```sql
CREATE TABLE text_examples (
    -- Fixed length (padded with spaces)
    product_code CHAR(5),        -- Exactly 5 characters
    
    -- Variable length with limit
    name VARCHAR(100),           -- Up to 100 characters
    
    -- Variable length without limit
    description TEXT,            -- Unlimited length
    
    -- Single character
    grade CHAR(1)               -- A, B, C, D, F
);
```

### Date and Time Types

```sql
CREATE TABLE datetime_examples (
    -- Date only
    birth_date DATE,                    -- 'YYYY-MM-DD'
    
    -- Time only
    meeting_time TIME,                  -- 'HH:MM:SS'
    meeting_time_tz TIME WITH TIME ZONE, -- Time with timezone
    
    -- Date and time
    created_at TIMESTAMP,               -- 'YYYY-MM-DD HH:MM:SS'
    updated_at TIMESTAMP WITH TIME ZONE, -- With timezone
    
    -- Intervals
    session_duration INTERVAL           -- '1 day 2 hours 30 minutes'
);

-- Working with dates and times
INSERT INTO datetime_examples (
    birth_date,
    meeting_time,
    created_at,
    session_duration
) VALUES (
    '1990-05-15',
    '14:30:00',
    CURRENT_TIMESTAMP,
    '2 hours 30 minutes'
);
```

### Boolean and Other Types

```sql
CREATE TABLE other_types (
    -- Boolean
    is_active BOOLEAN,              -- TRUE, FALSE, NULL
    
    -- JSON
    metadata JSON,                  -- JSON data (stored as text)
    settings JSONB,                 -- Binary JSON (more efficient)
    
    -- Arrays
    tags TEXT[],                    -- Array of text values
    scores INTEGER[],               -- Array of integers
    
    -- UUID
    unique_id UUID DEFAULT gen_random_uuid(),
    
    -- Network addresses
    ip_address INET,                -- IP address
    mac_address MACADDR            -- MAC address
);

-- Working with arrays
INSERT INTO other_types (tags, scores) 
VALUES (
    ARRAY['postgres', 'database', 'sql'],
    ARRAY[95, 87, 92]
);

-- Working with JSON
INSERT INTO other_types (settings) 
VALUES ('{"theme": "dark", "notifications": true, "language": "en"}');
```

## Querying Data - SELECT Statement

The `SELECT` statement is the most important SQL command for retrieving data. Let's explore it comprehensively:

### Basic SELECT Syntax

```sql
-- Basic syntax
SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column
LIMIT number;
```

### Simple SELECT Examples

```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, email FROM employees;

-- Select with aliases (cleaner column names in output)
SELECT 
    first_name AS "First Name",
    last_name AS "Last Name",
    salary AS "Annual Salary"
FROM employees;

-- Select with calculations
SELECT 
    first_name,
    last_name,
    salary,
    salary * 12 AS annual_salary,
    salary / 12 AS monthly_salary
FROM employees;
```

### WHERE Clause - Filtering Data

The `WHERE` clause filters rows based on conditions:

```sql
-- Comparison operators
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE department_id = 1;
SELECT * FROM employees WHERE hire_date >= '2020-01-01';

-- String comparisons
SELECT * FROM employees WHERE first_name = 'John';
SELECT * FROM employees WHERE last_name LIKE 'Smi%';    -- Starts with 'Smi'
SELECT * FROM employees WHERE email LIKE '%@gmail.com'; -- Ends with '@gmail.com'
SELECT * FROM employees WHERE first_name ILIKE 'JOHN';  -- Case-insensitive

-- Logical operators
SELECT * FROM employees 
WHERE salary > 50000 AND department_id = 1;

SELECT * FROM employees 
WHERE department_id = 1 OR department_id = 2;

SELECT * FROM employees 
WHERE NOT (salary < 30000);

-- Range and list operations
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 80000;
SELECT * FROM employees WHERE department_id IN (1, 2, 3);
SELECT * FROM employees WHERE email IS NOT NULL;
SELECT * FROM employees WHERE manager_id IS NULL;
```

**Pattern Matching with LIKE:**
- `%`: Matches any sequence of characters
- `_`: Matches any single character
- `ILIKE`: Case-insensitive version of LIKE

### ORDER BY - Sorting Results

```sql
-- Single column sorting
SELECT * FROM employees ORDER BY salary;           -- Ascending (default)
SELECT * FROM employees ORDER BY salary DESC;      -- Descending

-- Multiple column sorting
SELECT * FROM employees 
ORDER BY department_id ASC, salary DESC;

-- Sorting by expressions
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary * 12 DESC;  -- Order by annual salary

-- Handling NULL values
SELECT * FROM employees ORDER BY manager_id NULLS FIRST;
SELECT * FROM employees ORDER BY manager_id NULLS LAST;
```

### LIMIT and OFFSET - Pagination

```sql
-- Get first 10 employees
SELECT * FROM employees LIMIT 10;

-- Get employees 11-20 (pagination)
SELECT * FROM employees LIMIT 10 OFFSET 10;

-- Top 5 highest paid employees
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 5;
```

### DISTINCT - Removing Duplicates

```sql
-- Get unique department IDs
SELECT DISTINCT department_id FROM employees;

-- Get unique combinations
SELECT DISTINCT department_id, job_title FROM employees;

-- Count unique values
SELECT COUNT(DISTINCT department_id) AS unique_departments FROM employees;
```

### Aggregate Functions

Aggregate functions perform calculations on groups of rows:

```sql
-- Basic aggregates
SELECT COUNT(*) AS total_employees FROM employees;
SELECT COUNT(manager_id) AS employees_with_managers FROM employees; -- Excludes NULLs
SELECT SUM(salary) AS total_payroll FROM employees;
SELECT AVG(salary) AS average_salary FROM employees;
SELECT MIN(salary) AS lowest_salary FROM employees;
SELECT MAX(salary) AS highest_salary FROM employees;

-- String aggregation
SELECT STRING_AGG(first_name, ', ') AS all_names FROM employees;
```

### GROUP BY - Grouping Data

`GROUP BY` groups rows with the same values and allows aggregate functions to work on each group:

```sql
-- Count employees by department
SELECT 
    department_id,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;

-- Multiple grouping columns
SELECT 
    department_id,
    job_title,
    COUNT(*) AS count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id, job_title;

-- Group by expressions
SELECT 
    EXTRACT(YEAR FROM hire_date) AS hire_year,
    COUNT(*) AS employees_hired
FROM employees
GROUP BY EXTRACT(YEAR FROM hire_date)
ORDER BY hire_year;
```

### HAVING - Filtering Groups

`HAVING` filters groups after `GROUP BY` (whereas `WHERE` filters rows before grouping):

```sql
-- Departments with more than 5 employees
SELECT 
    department_id,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 5;

-- Departments with average salary > 60000
SELECT 
    department_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 60000;

-- Combined WHERE and HAVING
SELECT 
    department_id,
    COUNT(*) AS employee_count
FROM employees
WHERE hire_date >= '2020-01-01'  -- Filter rows first
GROUP BY department_id
HAVING COUNT(*) > 2;             -- Then filter groups
```

### Subqueries

Subqueries are queries within queries:

```sql
-- Scalar subquery (returns single value)
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- IN subquery (returns multiple values)
SELECT first_name, last_name
FROM employees
WHERE department_id IN (
    SELECT id FROM departments WHERE name IN ('Engineering', 'Sales')
);

-- EXISTS subquery (checks for existence)
SELECT first_name, last_name
FROM employees e
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.employee_id = e.id
);

-- Correlated subquery (references outer query)
SELECT 
    first_name, 
    last_name,
    salary,
    (SELECT AVG(salary) 
     FROM employees e2 
     WHERE e2.department_id = e1.department_id) AS dept_avg_salary
FROM employees e1;
```

## Joining Tables

Joins combine data from multiple tables based on relationships. This is one of the most powerful features of relational databases.

### Sample Tables for Join Examples

Let's create some sample tables to demonstrate joins:

```sql
-- Departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    manager_id INTEGER
);

-- Employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department_id INTEGER,
    salary DECIMAL(10,2)
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    department_id INTEGER,
    budget DECIMAL(12,2)
);

-- Employee_projects junction table (many-to-many)
CREATE TABLE employee_projects (
    employee_id INTEGER,
    project_id INTEGER,
    role VARCHAR(100),
    hours_allocated INTEGER,
    PRIMARY KEY (employee_id, project_id)
);
```

### INNER JOIN

`INNER JOIN` returns only rows that have matching values in both tables:

```sql
-- Basic INNER JOIN
SELECT 
    e.first_name,
    e.last_name,
    d.name AS department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- Multiple table INNER JOIN
SELECT 
    e.first_name,
    e.last_name,
    d.name AS department_name,
    p.name AS project_name,
    ep.role
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
INNER JOIN employee_projects ep ON e.id = ep.employee_id
INNER JOIN projects p ON ep.project_id = p.id;
```

**When to use INNER JOIN:**
- When you only want rows that exist in both tables
- Most common type of join
- Example: Get employees and their departments (only for employees assigned to departments)

### LEFT JOIN (LEFT OUTER JOIN)

`LEFT JOIN` returns all rows from the left table and matching rows from the right table. When no match is found, NULL values are returned for right table columns:

```sql
-- Get all employees and their departments (including employees without departments)
SELECT 
    e.first_name,
    e.last_name,
    d.name AS department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;

-- Find employees without departments
SELECT 
    e.first_name,
    e.last_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE d.id IS NULL;
```

**When to use LEFT JOIN:**
- When you want all records from the "main" table (left side)
- Useful for finding missing relationships
- Example: All employees, whether they have departments or not

### RIGHT JOIN (RIGHT OUTER JOIN)

`RIGHT JOIN` returns all rows from the right table and matching rows from the left table:

```sql
-- Get all departments and their employees (including departments without employees)
SELECT 
    d.name AS department_name,
    e.first_name,
    e.last_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

-- Find departments without employees
SELECT 
    d.name AS department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id
WHERE e.id IS NULL;
```

**When to use RIGHT JOIN:**
- Less common than LEFT JOIN
- Can usually be rewritten as LEFT JOIN by swapping table order
- Example: All departments, whether they have employees or not

### FULL OUTER JOIN

`FULL OUTER JOIN` returns all rows when there's a match in either table:

```sql
-- Get all employees and departments, showing mismatches
SELECT 
    e.first_name,
    e.last_name,
    d.name AS department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

-- Find mismatched data (employees without departments OR departments without employees)
SELECT 
    e.first_name,
    e.last_name,
    d.name AS department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id
WHERE e.id IS NULL OR d.id IS NULL;
```

### CROSS JOIN

`CROSS JOIN` returns the Cartesian product of both tables (every row from first table combined with every row from second table):

```sql
-- Get all possible employee-project combinations
SELECT 
    e.first_name,
    e.last_name,
    p.name AS project_name
FROM employees e
CROSS JOIN projects p;

-- Practical example: Create a schedule template
SELECT 
    e.first_name,
    e.last_name,
    d.day_name
FROM employees e
CROSS JOIN (
    VALUES ('Monday'), ('Tuesday'), ('Wednesday'), 
           ('Thursday'), ('Friday')
) AS d(day_name);
```

**When to use CROSS JOIN:**
- Rarely used in practice
- Useful for generating combinations
- Be careful with large tables (can create huge result sets)

### Self JOIN

A self join is when a table is joined with itself, typically used for hierarchical data:

```sql
-- Find employees and their managers
SELECT 
    e.first_name || ' ' || e.last_name AS employee_name,
    m.first_name || ' ' || m.last_name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Find all employees who earn more than their manager
SELECT 
    e.first_name || ' ' || e.last_name AS employee_name,
    e.salary AS employee_salary,
    m.first_name || ' ' || m.last_name AS manager_name,
    m.salary AS manager_salary
FROM employees e
INNER JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;
```

### Advanced Join Techniques

**Using Multiple Join Conditions:**
```sql
-- Join with multiple conditions
SELECT 
    e.first_name,
    e.last_name,
    p.name AS project_name
FROM employees e
INNER JOIN employee_projects ep ON e.id = ep.employee_id
INNER JOIN projects p ON ep.project_id = p.id 
    AND p.budget > 100000  -- Additional condition
    AND ep.hours_allocated > 20;
```

**Join with Aggregations:**
```sql
-- Get department summary with employee count and average salary
SELECT 
    d.name AS department_name,
    COUNT(e.id) AS employee_count,
    COALESCE(AVG(e.salary), 0) AS avg_salary,
    COALESCE(SUM(e.salary), 0) AS total_payroll
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name
ORDER BY employee_count DESC;
```

**Join Performance Tips:**
1. **Use indexes** on join columns
2. **Join on indexed columns** (usually primary/foreign keys)
3. **Filter early** with WHERE clauses
4. **Consider join order** for complex queries
5. **Use EXPLAIN** to analyze join performance

## Data Modification

### INSERT - Adding Data

The `INSERT` statement adds new rows to tables:

#### Basic INSERT

```sql
-- Insert single row with all columns
INSERT INTO employees (first_name, last_name, email, department_id, salary)
VALUES ('John', 'Doe', 'john.doe@company.com', 1, 75000);

-- Insert single row with selected columns (others get default values)
INSERT INTO employees (first_name, last_name, email)
VALUES ('Jane', 'Smith', 'jane.smith@company.com');

-- Insert multiple rows
INSERT INTO employees (first_name, last_name, email, department_id, salary)
VALUES 
    ('Alice', 'Johnson', 'alice.johnson@company.com', 2, 80000),
    ('Bob', 'Wilson', 'bob.wilson@company.com', 1, 70000),
    ('Carol', 'Brown', 'carol.brown@company.com', 3, 85000);
```

#### INSERT with SELECT (Copying Data)

```sql
-- Insert data from another table
INSERT INTO employees_backup
SELECT * FROM employees WHERE department_id = 1;

-- Insert calculated data
INSERT INTO department_stats (department_id, employee_count, avg_salary, total_payroll)
SELECT 
    department_id,
    COUNT(*),
    AVG(salary),
    SUM(salary)
FROM employees
GROUP BY department_id;
```

#### INSERT with RETURNING

```sql
-- Get the inserted data back (useful for auto-generated IDs)
INSERT INTO employees (first_name, last_name, email)
VALUES ('David', 'Miller', 'david.miller@company.com')
RETURNING id, first_name, last_name, hire_date;

-- Insert multiple and return specific columns
INSERT INTO products (name, price, category_id)
VALUES 
    ('Laptop', 999.99, 1),
    ('Mouse', 29.99, 1),
    ('Keyboard', 79.99, 1)
RETURNING id, name, price;
```

#### INSERT with ON CONFLICT (UPSERT)

```sql
-- Insert or update if conflict occurs
INSERT INTO employees (email, first_name, last_name, salary)
VALUES ('john.doe@company.com', 'John', 'Doe', 80000)
ON CONFLICT (email) 
DO UPDATE SET 
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    salary = EXCLUDED.salary,
    updated_at = CURRENT_TIMESTAMP;

-- Insert or do nothing if conflict
INSERT INTO employees (email, first_name, last_name)
VALUES ('existing@company.com', 'Test', 'User')
ON CONFLICT (email) DO NOTHING;
```

### UPDATE - Modifying Data

The `UPDATE` statement modifies existing rows:

#### Basic UPDATE

```sql
-- Update single column
UPDATE employees 
SET salary = 85000 
WHERE id = 1;

-- Update multiple columns
UPDATE employees 
SET 
    salary = salary * 1.1,  -- 10% raise
    updated_at = CURRENT_TIMESTAMP
WHERE department_id = 1;

-- Update with calculations
UPDATE employees 
SET 
    annual_bonus = salary * 0.15,
    performance_rating = CASE 
        WHEN salary > 80000 THEN 'Excellent'
        WHEN salary > 60000 THEN 'Good'
        ELSE 'Average'
    END;
```

#### UPDATE with JOIN (Using FROM clause)

```sql
-- Update employees based on department information
UPDATE employees 
SET salary = salary * 1.05
FROM departments 
WHERE employees.department_id = departments.id
AND departments.name = 'Engineering';

-- Update with aggregated data
UPDATE departments 
SET employee_count = emp_counts.count
FROM (
    SELECT department_id, COUNT(*) as count
    FROM employees
    GROUP BY department_id
) AS emp_counts
WHERE departments.id = emp_counts.department_id;
```

#### UPDATE with Subqueries

```sql
-- Update based on subquery
UPDATE employees 
SET salary = salary * 1.1
WHERE id IN (
    SELECT employee_id 
    FROM employee_projects ep
    JOIN projects p ON ep.project_id = p.id
    WHERE p.name = 'Critical Project'
);

-- Update with correlated subquery
UPDATE employees 
SET performance_rank = (
    SELECT COUNT(*) + 1
    FROM employees e2
    WHERE e2.department_id = employees.department_id
    AND e2.salary > employees.salary
);
```

#### UPDATE with RETURNING

```sql
-- See what was updated
UPDATE employees 
SET salary = salary * 1.1
WHERE department_id = 1
RETURNING id, first_name, last_name, salary;
```

### DELETE - Removing Data

The `DELETE` statement removes rows from tables:

#### Basic DELETE

```sql
-- Delete specific row
DELETE FROM employees WHERE id = 5;

-- Delete multiple rows
DELETE FROM employees WHERE department_id = 3;

-- Delete with conditions
DELETE FROM employees 
WHERE hire_date < '2020-01-01' 
AND salary < 40000;
```

#### DELETE with JOIN (Using USING clause)

```sql
-- Delete employees from inactive departments
DELETE FROM employees 
USING departments 
WHERE employees.department_id = departments.id
AND departments.is_active = false;

-- Delete duplicate records (keep one)
DELETE FROM employees e1
USING employees e2
WHERE e1.id > e2.id
AND e1.email = e2.email;
```

#### DELETE with Subqueries

```sql
-- Delete employees not assigned to any project
DELETE FROM employees 
WHERE id NOT IN (
    SELECT DISTINCT employee_id 
    FROM employee_projects
    WHERE employee_id IS NOT NULL
);

-- Delete old records based on related data
DELETE FROM orders 
WHERE customer_id IN (
    SELECT id FROM customers 
    WHERE last_login < CURRENT_DATE - INTERVAL '2 years'
);
```

#### DELETE with RETURNING

```sql
-- See what was deleted
DELETE FROM employees 
WHERE salary < 30000
RETURNING id, first_name, last_name, salary;
```

### TRUNCATE - Fast Delete All

```sql
-- Remove all rows quickly (faster than DELETE)
TRUNCATE TABLE temp_data;

-- Truncate with restart identity (reset auto-increment)
TRUNCATE TABLE employees RESTART IDENTITY;

-- Truncate multiple tables
TRUNCATE TABLE orders, order_items RESTART IDENTITY;

-- Truncate with cascade (truncate related tables)
TRUNCATE TABLE departments CASCADE;
```

**TRUNCATE vs DELETE:**
- **TRUNCATE**: Faster, resets auto-increment, can't use WHERE clause
- **DELETE**: Slower, can use WHERE clause, doesn't reset auto-increment

### Data Modification Best Practices

1. **Always use WHERE clause** with UPDATE/DELETE (unless you really want to affect all rows)
2. **Test with SELECT first** - convert your UPDATE/DELETE to SELECT to see what will be affected
3. **Use transactions** for important modifications
4. **Use RETURNING** to verify changes
5. **Backup before large modifications**
6. **Consider using LIMIT** for large DELETE operations to avoid locking

```sql
-- Good practice: Test before modifying
-- First, see what would be affected:
SELECT * FROM employees WHERE department_id = 3;

-- Then perform the actual update:
BEGIN;
UPDATE employees SET salary = salary * 1.1 WHERE department_id = 3;
-- Review the changes before committing
SELECT * FROM employees WHERE department_id = 3;
COMMIT;
```

## Data Modeling & Design

Data modeling is the process of creating a conceptual representation of data and its relationships. Good data modeling is crucial for database performance, maintainability, and scalability.

### Entity-Relationship (ER) Modeling

**What is an Entity?**
An entity represents a real-world object or concept that has independent existence. Examples:
- **Customer**: A person who buys products
- **Product**: An item for sale
- **Order**: A purchase transaction
- **Employee**: A person who works for the company

**What are Attributes?**
Attributes are properties or characteristics of entities:
- Customer: name, email, phone, address
- Product: name, price, description, category
- Order: date, total_amount, status

**What are Relationships?**
Relationships describe how entities are connected:
- Customer **places** Order
- Order **contains** Products
- Employee **works in** Department

### Relationship Types and Implementation

**One-to-One (1:1) Relationship**
Each record in Table A relates to exactly one record in Table B, and vice versa.

```sql
-- Example: Person and Passport
CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE
);

CREATE TABLE passports (
    id SERIAL PRIMARY KEY,
    passport_number VARCHAR(20) UNIQUE NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    person_id INTEGER UNIQUE NOT NULL REFERENCES persons(id)
);
```
*Note: UNIQUE constraint on foreign key enforces 1:1 relationship*

**One-to-Many (1:N) Relationship**
One record in Table A can relate to many records in Table B, but each record in Table B relates to only one record in Table A.

```sql
-- Example: Department and Employees
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    budget DECIMAL(12,2)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department_id INTEGER REFERENCES departments(id) -- Foreign key (many side)
);
```
*Note: Foreign key goes on the "many" side*

**Many-to-Many (M:N) Relationship**
Multiple records in Table A can relate to multiple records in Table B.

```sql
-- Example: Students and Courses
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    credits INTEGER NOT NULL,
    description TEXT
);

-- Junction table (also called bridge table or linking table)
CREATE TABLE student_courses (
    student_id INTEGER REFERENCES students(id),
    course_id INTEGER REFERENCES courses(id),
    enrollment_date DATE DEFAULT CURRENT_DATE,
    grade CHAR(2), -- A+, A, B+, B, etc.
    PRIMARY KEY (student_id, course_id) -- Composite primary key
);
```
*Note: Many-to-many relationships require a junction table*

### Design Process Step-by-Step

**Step 1: Identify Entities**
Look for nouns in your business requirements:
- "Customers place orders for products"
- Entities: Customer, Order, Product

**Step 2: Identify Attributes**
What information do you need to store about each entity?
```sql
-- Customer attributes
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Step 3: Determine Relationships**
- Customer places Orders (1:N)
- Order contains Products (M:N)
- Product belongs to Category (N:1)

**Step 4: Choose Primary Keys**
Every table needs a unique identifier:
```sql
-- Natural key (meaningful business data)
CREATE TABLE countries (
    country_code CHAR(2) PRIMARY KEY, -- US, CA, MX
    name VARCHAR(100) NOT NULL
);

-- Surrogate key (artificial identifier)
CREATE TABLE customers (
    id SERIAL PRIMARY KEY, -- Auto-generated number
    email VARCHAR(100) UNIQUE NOT NULL -- Natural candidate key
);
```

**Step 5: Implement Foreign Keys**
Link related tables:
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(10,2)
);
```

### Complete E-Commerce Example

```sql
-- Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id INTEGER REFERENCES categories(id), -- Self-referencing for hierarchy
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    stock_quantity INTEGER DEFAULT 0,
    sku VARCHAR(50) UNIQUE NOT NULL, -- Stock Keeping Unit
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer Addresses (1:N relationship)
CREATE TABLE customer_addresses (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    address_type VARCHAR(20) NOT NULL, -- 'billing', 'shipping'
    street_address VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT false
);

-- Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_address_id INTEGER REFERENCES customer_addresses(id),
    billing_address_id INTEGER REFERENCES customer_addresses(id)
);

-- Order Items (M:N between Orders and Products)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL, -- Price at time of order
    UNIQUE(order_id, product_id) -- Prevent duplicate products in same order
);

-- Product Reviews (customers can review products)
CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, customer_id) -- One review per customer per product
);
```

### Design Best Practices

1. **Use Meaningful Names**
   - Table names: plural nouns (customers, orders, products)
   - Column names: singular, descriptive (first_name, not fname)
   - Be consistent with naming conventions

2. **Choose Appropriate Data Types**
   - Use smallest data type that fits your needs
   - Use DECIMAL for money (not FLOAT)
   - Use appropriate VARCHAR lengths

3. **Define Constraints**
   - NOT NULL for required fields
   - UNIQUE for natural keys
   - CHECK constraints for business rules
   - Foreign keys for referential integrity

4. **Consider Future Requirements**
   - Design for extensibility
   - Avoid over-normalization if it hurts performance
   - Plan for audit trails and soft deletes

```sql
-- Adding audit fields
ALTER TABLE products ADD COLUMN created_by INTEGER REFERENCES users(id);
ALTER TABLE products ADD COLUMN updated_by INTEGER REFERENCES users(id);

-- Soft delete pattern
ALTER TABLE products ADD COLUMN deleted_at TIMESTAMP;
-- Instead of DELETE, use: UPDATE products SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?
```

## Normalization

Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves decomposing tables into smaller, well-structured tables and defining relationships between them.

### Why Normalize?

**Problems with Unnormalized Data:**
```sql
-- Bad: Unnormalized table with redundant data
CREATE TABLE orders_bad (
    order_id INTEGER,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    product_name VARCHAR(200),
    product_price DECIMAL(10,2),
    quantity INTEGER,
    order_date DATE
);

-- Sample data showing problems:
INSERT INTO orders_bad VALUES 
(1, 'John Doe', 'john@email.com', '123-456-7890', 'Laptop', 999.99, 1, '2024-01-15'),
(1, 'John Doe', 'john@email.com', '123-456-7890', 'Mouse', 29.99, 2, '2024-01-15'),
(2, 'John Doe', 'john@email.com', '123-456-7890', 'Keyboard', 79.99, 1, '2024-01-20');
```

**Problems:**
1. **Data Redundancy**: Customer information repeated for each order item
2. **Update Anomalies**: If John changes his email, we need to update multiple rows
3. **Insert Anomalies**: Can't add a customer without an order
4. **Delete Anomalies**: Deleting an order might lose customer information
5. **Storage Waste**: Redundant data takes extra space

### First Normal Form (1NF)

**Rules for 1NF:**
1. Each column contains atomic (indivisible) values
2. Each column contains values of the same data type
3. Each row is unique
4. No repeating groups or arrays

**Before 1NF (Violates atomicity):**
```sql
CREATE TABLE customers_bad (
    id INTEGER,
    name VARCHAR(100),
    phones VARCHAR(200), -- "123-456-7890, 098-765-4321" (multiple values)
    skills VARCHAR(500)  -- "SQL, Python, JavaScript" (multiple values)
);
```

**After 1NF (Atomic values):**
```sql
-- Separate table for phone numbers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE customer_phones (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    phone_type VARCHAR(20), -- 'home', 'work', 'mobile'
    phone_number VARCHAR(20)
);

-- Separate table for skills
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE customer_skills (
    customer_id INTEGER REFERENCES customers(id),
    skill_id INTEGER REFERENCES skills(id),
    proficiency_level VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
    PRIMARY KEY (customer_id, skill_id)
);
```

### Second Normal Form (2NF)

**Rules for 2NF:**
1. Must be in 1NF
2. No partial dependencies (non-key attributes must depend on the entire primary key)

This mainly applies to tables with composite primary keys.

**Before 2NF (Has partial dependency):**
```sql
CREATE TABLE order_items_bad (
    order_id INTEGER,
    product_id INTEGER,
    product_name VARCHAR(200),    -- Depends only on product_id, not on (order_id, product_id)
    product_price DECIMAL(10,2),  -- Depends only on product_id
    quantity INTEGER,             -- Depends on both order_id and product_id
    PRIMARY KEY (order_id, product_id)
);
```

**Problems:**
- Product name and price are repeated for each order
- If product price changes, we need to update multiple order_items
- We can't store product information without an order

**After 2NF (Remove partial dependencies):**
```sql
-- Products table (product info depends only on product_id)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Order items table (only order-specific info)
CREATE TABLE order_items (
    order_id INTEGER,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL, -- Price at time of order (may differ from current price)
    PRIMARY KEY (order_id, product_id)
);
```

### Third Normal Form (3NF)

**Rules for 3NF:**
1. Must be in 2NF
2. No transitive dependencies (non-key attributes must not depend on other non-key attributes)

**Before 3NF (Has transitive dependency):**
```sql
CREATE TABLE employees_bad (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    department_id INTEGER,
    department_name VARCHAR(100),    -- Depends on department_id, not employee id
    department_location VARCHAR(100) -- Depends on department_id, not employee id
);
```

**Problems:**
- Department information is repeated for each employee
- If department name changes, we need to update multiple employee records
- Inconsistent data if department info differs between employees

**After 3NF (Remove transitive dependencies):**
```sql
-- Departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

-- Employees table (only employee-specific info)
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department_id INTEGER REFERENCES departments(id)
);
```

### Higher Normal Forms

**Boyce-Codd Normal Form (BCNF)**
A stronger version of 3NF that handles certain edge cases with functional dependencies.

**Fourth Normal Form (4NF)**
Eliminates multi-valued dependencies.

**Fifth Normal Form (5NF)**
Eliminates join dependencies.

*Most practical database designs only need to reach 3NF.*

### When to Denormalize

Sometimes, breaking normalization rules can improve performance:

**Scenarios for Denormalization:**
1. **Read-heavy applications** where query performance is more important than update performance
2. **Reporting systems** that need fast aggregations
3. **Data warehouses** optimized for analytics
4. **Caching frequently accessed calculated values**

**Example of Controlled Denormalization:**
```sql
-- Normalized tables
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20)
);

CREATE TABLE order_items (
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    unit_price DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id)
);

-- Denormalized: Add calculated total to orders table for performance
ALTER TABLE orders ADD COLUMN total_amount DECIMAL(10,2);

-- Keep it updated with triggers
CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE orders 
    SET total_amount = (
        SELECT COALESCE(SUM(quantity * unit_price), 0)
        FROM order_items 
        WHERE order_id = COALESCE(NEW.order_id, OLD.order_id)
    )
    WHERE id = COALESCE(NEW.order_id, OLD.order_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_order_total_trigger
    AFTER INSERT OR UPDATE OR DELETE ON order_items
    FOR EACH ROW EXECUTE FUNCTION update_order_total();
```

### Normalization Best Practices

1. **Start with 3NF** for most applications
2. **Identify functional dependencies** early in design
3. **Document your design decisions**, especially denormalizations
4. **Use views** to present denormalized data without storing it
5. **Consider read vs write patterns** in your application
6. **Test performance** before and after normalization changes

```sql
-- Use views to present denormalized data
CREATE VIEW order_summary AS
SELECT 
    o.id,
    o.order_date,
    c.first_name || ' ' || c.last_name AS customer_name,
    c.email AS customer_email,
    COUNT(oi.product_id) AS item_count,
    SUM(oi.quantity * oi.unit_price) AS total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.order_date, c.first_name, c.last_name, c.email;
```

## Advanced SQL Concepts

Now that we've covered the fundamentals, let's explore advanced SQL features that will make you a more effective database developer.

### Window Functions

Window functions perform calculations across a set of rows related to the current row, without collapsing the result set like GROUP BY would. They're incredibly powerful for analytics and reporting.

**Basic Window Function Syntax:**
```sql
function_name() OVER (
    [PARTITION BY column(s)]
    [ORDER BY column(s)]
    [ROWS/RANGE window_frame]
)
```

#### Ranking Functions

```sql
-- ROW_NUMBER: Assigns unique sequential numbers
SELECT 
    first_name,
    last_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as salary_rank
FROM employees;

-- RANK: Same values get same rank, with gaps
SELECT 
    first_name,
    last_name,
    salary,
    RANK() OVER (ORDER BY salary DESC) as salary_rank
FROM employees;
-- Result: 1, 2, 2, 4, 5 (note the gap after tied rank 2)

-- DENSE_RANK: Same values get same rank, no gaps  
SELECT 
    first_name,
    last_name,
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) as salary_rank
FROM employees;
-- Result: 1, 2, 2, 3, 4 (no gap after tied rank 2)

-- NTILE: Divides rows into buckets
SELECT 
    first_name,
    last_name,
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) as salary_quartile
FROM employees;
-- Divides employees into 4 salary quartiles
```

#### Partition By (Group within Windows)

```sql
-- Rank employees within each department
SELECT 
    first_name,
    last_name,
    department_id,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department_id 
        ORDER BY salary DESC
    ) as dept_salary_rank
FROM employees;

-- Compare individual salary to department average
SELECT 
    first_name,
    last_name,
    department_id,
    salary,
    AVG(salary) OVER (PARTITION BY department_id) as dept_avg_salary,
    salary - AVG(salary) OVER (PARTITION BY department_id) as salary_diff_from_avg
FROM employees;
```

#### Aggregate Window Functions

```sql
-- Running totals
SELECT 
    order_date,
    total_amount,
    SUM(total_amount) OVER (
        ORDER BY order_date 
        ROWS UNBOUNDED PRECEDING
    ) as running_total
FROM orders
ORDER BY order_date;

-- Moving averages (last 3 orders)
SELECT 
    order_date,
    total_amount,
    AVG(total_amount) OVER (
        ORDER BY order_date 
        ROWS 2 PRECEDING
    ) as moving_avg_3_orders
FROM orders
ORDER BY order_date;

-- Percentage of total
SELECT 
    department_id,
    salary,
    salary / SUM(salary) OVER () * 100 as pct_of_total_payroll,
    salary / SUM(salary) OVER (PARTITION BY department_id) * 100 as pct_of_dept_payroll
FROM employees;
```

#### LAG and LEAD Functions

```sql
-- Compare with previous row
SELECT 
    order_date,
    total_amount,
    LAG(total_amount) OVER (ORDER BY order_date) as previous_order_amount,
    total_amount - LAG(total_amount) OVER (ORDER BY order_date) as amount_difference
FROM orders
ORDER BY order_date;

-- Compare with next row
SELECT 
    employee_id,
    salary,
    hire_date,
    LEAD(salary) OVER (ORDER BY hire_date) as next_hire_salary
FROM employees
ORDER BY hire_date;

-- Multiple periods back/forward
SELECT 
    month,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY month) as prev_month,
    LAG(revenue, 12) OVER (ORDER BY month) as same_month_last_year
FROM monthly_revenue
ORDER BY month;
```

### Common Table Expressions (CTEs)

CTEs are temporary named result sets that exist within the scope of a single SQL statement. They make complex queries more readable and maintainable.

#### Basic CTEs

```sql
-- Simple CTE
WITH high_earners AS (
    SELECT *
    FROM employees
    WHERE salary > 75000
)
SELECT 
    department_id,
    COUNT(*) as high_earner_count,
    AVG(salary) as avg_high_earner_salary
FROM high_earners
GROUP BY department_id;

-- Multiple CTEs
WITH 
    department_stats AS (
        SELECT 
            department_id,
            COUNT(*) as employee_count,
            AVG(salary) as avg_salary,
            MAX(salary) as max_salary
        FROM employees
        GROUP BY department_id
    ),
    department_info AS (
        SELECT 
            d.id,
            d.name,
            d.budget
        FROM departments d
        WHERE d.is_active = true
    )
SELECT 
    di.name as department_name,
    di.budget,
    ds.employee_count,
    ds.avg_salary,
    ds.max_salary,
    di.budget / ds.employee_count as budget_per_employee
FROM department_info di
JOIN department_stats ds ON di.id = ds.department_id;
```

#### Recursive CTEs

Recursive CTEs are perfect for hierarchical data like organizational charts, file systems, or category trees.

```sql
-- Organizational hierarchy
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: Top-level managers (no manager)
    SELECT 
        id,
        first_name,
        last_name,
        manager_id,
        1 as level,
        first_name || ' ' || last_name as path
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: Employees with managers
    SELECT 
        e.id,
        e.first_name,
        e.last_name,
        e.manager_id,
        eh.level + 1,
        eh.path || ' -> ' || e.first_name || ' ' || e.last_name
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.id
    WHERE eh.level < 10  -- Prevent infinite recursion
)
SELECT 
    level,
    REPEAT('  ', level - 1) || first_name || ' ' || last_name as indented_name,
    path
FROM employee_hierarchy
ORDER BY path;

-- Category tree with totals
WITH RECURSIVE category_tree AS (
    -- Root categories
    SELECT 
        id,
        name,
        parent_category_id,
        1 as level
    FROM categories
    WHERE parent_category_id IS NULL
    
    UNION ALL
    
    -- Child categories
    SELECT 
        c.id,
        c.name,
        c.parent_category_id,
        ct.level + 1
    FROM categories c
    JOIN category_tree ct ON c.parent_category_id = ct.id
),
category_with_product_counts AS (
    SELECT 
        ct.*,
        COALESCE(p.product_count, 0) as direct_product_count
    FROM category_tree ct
    LEFT JOIN (
        SELECT category_id, COUNT(*) as product_count
        FROM products
        GROUP BY category_id
    ) p ON ct.id = p.category_id
)
SELECT 
    level,
    REPEAT('  ', level - 1) || name as indented_category,
    direct_product_count
FROM category_with_product_counts
ORDER BY level, name;
```

### Advanced Aggregations

#### GROUPING SETS

`GROUPING SETS` allows you to compute multiple groupings in a single query:

```sql
-- Multiple groupings at once
SELECT 
    department_id,
    job_title,
    COUNT(*) as employee_count,
    AVG(salary) as avg_salary
FROM employees
GROUP BY GROUPING SETS (
    (department_id),           -- Group by department only
    (job_title),              -- Group by job title only
    (department_id, job_title), -- Group by both
    ()                        -- Grand total (no grouping)
);

-- Use GROUPING() function to identify which columns are grouped
SELECT 
    CASE WHEN GROUPING(department_id) = 1 THEN 'ALL DEPARTMENTS' 
         ELSE department_id::TEXT END as department,
    CASE WHEN GROUPING(job_title) = 1 THEN 'ALL TITLES' 
         ELSE job_title END as title,
    COUNT(*) as employee_count
FROM employees
GROUP BY GROUPING SETS (
    (department_id),
    (job_title),
    ()
);
```

#### ROLLUP and CUBE

```sql
-- ROLLUP: Hierarchical totals (department -> job_title -> grand total)
SELECT 
    department_id,
    job_title,
    COUNT(*) as employee_count,
    SUM(salary) as total_salary
FROM employees
GROUP BY ROLLUP (department_id, job_title)
ORDER BY department_id, job_title;

-- CUBE: All possible combinations
SELECT 
    department_id,
    job_title,
    COUNT(*) as employee_count
FROM employees
GROUP BY CUBE (department_id, job_title)
ORDER BY department_id, job_title;
```

### Conditional Logic in SQL

#### CASE Statements

```sql
-- Simple CASE
SELECT 
    first_name,
    last_name,
    salary,
    CASE 
        WHEN salary >= 80000 THEN 'High'
        WHEN salary >= 60000 THEN 'Medium'
        ELSE 'Low'
    END as salary_category
FROM employees;

-- Searched CASE with multiple conditions
SELECT 
    first_name,
    last_name,
    salary,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) as years_experience,
    CASE 
        WHEN salary >= 80000 AND EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) >= 5 
            THEN 'Senior High Performer'
        WHEN salary >= 80000 
            THEN 'High Performer'
        WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) >= 10 
            THEN 'Veteran'
        ELSE 'Standard'
    END as employee_category
FROM employees;

-- CASE in aggregate functions
SELECT 
    department_id,
    COUNT(*) as total_employees,
    COUNT(CASE WHEN salary >= 70000 THEN 1 END) as high_salary_count,
    COUNT(CASE WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) >= 5 THEN 1 END) as veteran_count,
    AVG(CASE WHEN salary >= 70000 THEN salary END) as avg_high_salary
FROM employees
GROUP BY department_id;
```

#### COALESCE and NULLIF

```sql
-- COALESCE: Return first non-null value
SELECT 
    first_name,
    last_name,
    COALESCE(mobile_phone, work_phone, home_phone, 'No phone') as contact_phone
FROM employees;

-- NULLIF: Return NULL if values are equal
SELECT 
    product_name,
    list_price,
    sale_price,
    NULLIF(sale_price, list_price) as discount_price  -- NULL if no discount
FROM products;

-- Practical example: Avoid division by zero
SELECT 
    department_id,
    total_budget,
    employee_count,
    total_budget / NULLIF(employee_count, 0) as budget_per_employee
FROM department_summary;
```

### JSON Operations in PostgreSQL

PostgreSQL has excellent JSON support with JSON and JSONB data types:

```sql
-- Create table with JSON column
CREATE TABLE user_preferences (
    user_id INTEGER PRIMARY KEY,
    preferences JSONB  -- JSONB is more efficient than JSON
);

-- Insert JSON data
INSERT INTO user_preferences VALUES 
(1, '{"theme": "dark", "language": "en", "notifications": {"email": true, "push": false}}'),
(2, '{"theme": "light", "language": "es", "notifications": {"email": false, "push": true}}'),
(3, '{"theme": "dark", "language": "fr", "sidebar_collapsed": true}');

-- JSON operators
SELECT 
    user_id,
    preferences -> 'theme' as theme,                    -- Returns JSON
    preferences ->> 'language' as language,             -- Returns text
    preferences -> 'notifications' ->> 'email' as email_notifications,
    preferences #> '{notifications,push}' as push_notifications
FROM user_preferences;

-- JSON aggregation
SELECT 
    json_object_agg(user_id, preferences ->> 'theme') as user_themes
FROM user_preferences;

-- JSON path queries
SELECT 
    user_id,
    preferences
FROM user_preferences
WHERE preferences @> '{"theme": "dark"}';  -- Contains

-- Update JSON
UPDATE user_preferences 
SET preferences = preferences || '{"last_login": "2024-01-15"}'
WHERE user_id = 1;

-- JSON indexing
CREATE INDEX idx_user_prefs_theme ON user_preferences USING GIN ((preferences -> 'theme'));
```

### Full-Text Search

PostgreSQL includes powerful full-text search capabilities:

```sql
-- Add full-text search to products
ALTER TABLE products ADD COLUMN search_vector tsvector;

-- Update search vector
UPDATE products 
SET search_vector = to_tsvector('english', name || ' ' || COALESCE(description, ''));

-- Create index for fast searching
CREATE INDEX idx_products_search ON products USING GIN(search_vector);

-- Search products
SELECT 
    name,
    description,
    ts_rank(search_vector, query) as rank
FROM products, to_tsquery('english', 'laptop & fast') as query
WHERE search_vector @@ query
ORDER BY rank DESC;

-- Highlight search results
SELECT 
    name,
    ts_headline('english', description, to_tsquery('laptop & fast')) as highlighted_description
FROM products
WHERE search_vector @@ to_tsquery('english', 'laptop & fast');
```

## Transactions & ACID

Transactions are a fundamental concept in database systems that ensure data integrity and consistency. Understanding transactions is crucial for building reliable applications.

### What is a Transaction?

A transaction is a sequence of database operations that are treated as a single unit of work. Either all operations succeed (commit) or all operations fail (rollback).

**Real-world example:** Transferring money between bank accounts
```sql
-- This should be atomic - either both operations succeed or both fail
BEGIN;
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 'A123';
    UPDATE accounts SET balance = balance + 100 WHERE account_id = 'B456';
COMMIT;
```

### ACID Properties

PostgreSQL is ACID compliant, meaning it guarantees four critical properties:

#### Atomicity
**"All or Nothing"** - A transaction is indivisible. Either all operations within the transaction are completed successfully, or none of them are.

```sql
-- Example: Order processing
BEGIN;
    -- Deduct inventory
    UPDATE products SET stock_quantity = stock_quantity - 5 WHERE id = 1;
    
    -- Create order record
    INSERT INTO orders (customer_id, total_amount) VALUES (123, 199.99);
    
    -- Add order items
    INSERT INTO order_items (order_id, product_id, quantity, unit_price) 
    VALUES (currval('orders_id_seq'), 1, 5, 39.99);
    
    -- If any of these fail, ALL changes are rolled back
COMMIT;
```

#### Consistency
**"Valid State to Valid State"** - A transaction brings the database from one valid state to another, maintaining all constraints and rules.

```sql
-- Constraints ensure consistency
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(10,2) NOT NULL,
    CONSTRAINT chk_positive_balance CHECK (balance >= 0)
);

-- This transaction will fail due to constraint violation
BEGIN;
    UPDATE accounts SET balance = balance - 1000 WHERE account_number = 'A123';
    -- If this makes balance negative, the constraint prevents commit
COMMIT;
```

#### Isolation
**"Concurrent transactions don't interfere"** - Transactions appear to run in isolation, even when executed concurrently.

```sql
-- Two users trying to book the last seat simultaneously
-- Transaction 1:
BEGIN;
SELECT available_seats FROM flights WHERE flight_id = 'FL123'; -- Returns 1
UPDATE flights SET available_seats = available_seats - 1 WHERE flight_id = 'FL123';
INSERT INTO bookings (flight_id, passenger_id) VALUES ('FL123', 'P001');
COMMIT;

-- Transaction 2 (concurrent):
BEGIN;
SELECT available_seats FROM flights WHERE flight_id = 'FL123'; -- Should see updated value
-- This will either see 0 seats or wait for Transaction 1 to complete
COMMIT;
```

#### Durability
**"Committed changes persist"** - Once a transaction is committed, the changes are permanent and survive system failures.

```sql
-- After COMMIT, this data survives even if server crashes
BEGIN;
INSERT INTO critical_data (id, value) VALUES (1, 'Important information');
COMMIT; -- Data is now permanently stored
```

### Transaction Control Commands

#### BEGIN/START TRANSACTION
Starts a new transaction:

```sql
-- Both are equivalent
BEGIN;
START TRANSACTION;

-- With specific isolation level
BEGIN ISOLATION LEVEL READ COMMITTED;
```

#### COMMIT
Makes all changes permanent:

```sql
BEGIN;
INSERT INTO customers (name, email) VALUES ('John Doe', 'john@email.com');
UPDATE customers SET last_login = CURRENT_TIMESTAMP WHERE email = 'john@email.com';
COMMIT; -- Changes are now permanent
```

#### ROLLBACK
Undoes all changes in the current transaction:

```sql
BEGIN;
DELETE FROM customers WHERE id = 1;
-- Oops, that was a mistake!
ROLLBACK; -- Customer record is restored
```

#### SAVEPOINT
Creates a point within a transaction to which you can rollback:

```sql
BEGIN;
    INSERT INTO customers (name, email) VALUES ('Alice', 'alice@email.com');
    SAVEPOINT customer_created;
    
    INSERT INTO orders (customer_id, total_amount) VALUES (currval('customers_id_seq'), 100.00);
    SAVEPOINT order_created;
    
    -- Something goes wrong with payment processing
    INSERT INTO payments (order_id, amount, status) VALUES (currval('orders_id_seq'), 100.00, 'failed');
    
    -- Roll back to before payment, but keep customer and order
    ROLLBACK TO SAVEPOINT order_created;
    
    -- Or roll back to before order
    ROLLBACK TO SAVEPOINT customer_created;
    
COMMIT;
```

### Isolation Levels

Different isolation levels provide different guarantees about what a transaction can see:

#### READ UNCOMMITTED (Lowest Isolation)
Allows dirty reads - can see uncommitted changes from other transactions.

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- Can see data that other transactions haven't committed yet
-- Rarely used in practice due to data integrity concerns
```

#### READ COMMITTED (PostgreSQL Default)
Can only see committed changes. Each statement sees a snapshot of committed data at the time the statement started.

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Transaction 1:
BEGIN;
SELECT balance FROM accounts WHERE id = 1; -- Returns 1000

-- Transaction 2 commits a change here

SELECT balance FROM accounts WHERE id = 1; -- Might return 1100 (sees committed change)
COMMIT;
```

#### REPEATABLE READ
Sees a snapshot of the database at the start of the transaction. All reads within the transaction return the same data.

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Transaction 1:
BEGIN;
SELECT balance FROM accounts WHERE id = 1; -- Returns 1000

-- Even if Transaction 2 commits changes, subsequent reads return 1000
SELECT balance FROM accounts WHERE id = 1; -- Still returns 1000
COMMIT;
```

#### SERIALIZABLE (Highest Isolation)
Strongest isolation level. Transactions appear to run one after another, even if they run concurrently.

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- May cause serialization failures that require retry logic in application
```

### Concurrency Problems and Solutions

#### Dirty Read
Reading uncommitted data from another transaction.

**Problem:** Transaction A reads data that Transaction B has modified but not committed.
**Solution:** Use READ COMMITTED or higher isolation level.

#### Non-Repeatable Read
Getting different results when reading the same data twice within a transaction.

```sql
-- Transaction 1:
BEGIN;
SELECT salary FROM employees WHERE id = 1; -- Returns 50000

-- Transaction 2 updates and commits here

SELECT salary FROM employees WHERE id = 1; -- Returns 55000 (different!)
COMMIT;
```
**Solution:** Use REPEATABLE READ or SERIALIZABLE isolation level.

#### Phantom Read
New rows appearing in subsequent reads within the same transaction.

```sql
-- Transaction 1:
BEGIN;
SELECT COUNT(*) FROM employees WHERE department_id = 1; -- Returns 10

-- Transaction 2 inserts new employee and commits

SELECT COUNT(*) FROM employees WHERE department_id = 1; -- Returns 11 (phantom!)
COMMIT;
```
**Solution:** Use SERIALIZABLE isolation level.

#### Lost Update
Two transactions modify the same data, and one overwrites the other's changes.

```sql
-- Both transactions read balance = 1000
-- Transaction 1: UPDATE accounts SET balance = 1000 + 100 WHERE id = 1; (balance = 1100)
-- Transaction 2: UPDATE accounts SET balance = 1000 + 200 WHERE id = 1; (balance = 1200)
-- Result: Only Transaction 2's change persists, Transaction 1's is lost
```

**Solutions:**
1. **Optimistic Locking:** Use version numbers or timestamps
```sql
-- Add version column
ALTER TABLE accounts ADD COLUMN version INTEGER DEFAULT 1;

-- Update with version check
UPDATE accounts 
SET balance = balance + 100, version = version + 1
WHERE id = 1 AND version = @current_version;
-- If 0 rows affected, someone else updated the record
```

2. **Pessimistic Locking:** Use SELECT FOR UPDATE
```sql
BEGIN;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE; -- Locks the row
-- Now safely calculate and update
UPDATE accounts SET balance = balance + 100 WHERE id = 1;
COMMIT;
```

### Advanced Transaction Patterns

#### Transaction with Error Handling

```sql
DO $$
DECLARE
    error_message TEXT;
BEGIN
    BEGIN
        -- Start main transaction logic
        INSERT INTO orders (customer_id, total_amount) VALUES (123, 199.99);
        
        -- This might fail
        INSERT INTO inventory_log (product_id, quantity_change) 
        VALUES (999, -5); -- Product 999 doesn't exist
        
    EXCEPTION WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS error_message = MESSAGE_TEXT;
        RAISE NOTICE 'Transaction failed: %', error_message;
        
        -- Log the error
        INSERT INTO error_log (error_message, occurred_at) 
        VALUES (error_message, CURRENT_TIMESTAMP);
        
        -- Re-raise the exception to rollback
        RAISE;
    END;
END $$;
```

#### Bulk Operations with Periodic Commits

```sql
-- For large data processing, commit periodically to avoid long-running transactions
DO $$
DECLARE
    batch_size INTEGER := 1000;
    processed INTEGER := 0;
    total_records INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_records FROM large_source_table;
    
    WHILE processed < total_records LOOP
        BEGIN;
            INSERT INTO processed_data (id, processed_value)
            SELECT id, expensive_function(data)
            FROM large_source_table
            WHERE id > processed
            ORDER BY id
            LIMIT batch_size;
            
            processed := processed + batch_size;
            COMMIT;
            
            RAISE NOTICE 'Processed % of % records', processed, total_records;
        END;
    END LOOP;
END $$;
```

### Transaction Best Practices

1. **Keep transactions short** - Long transactions hold locks longer
2. **Don't include user interaction** in transactions
3. **Handle deadlocks gracefully** with retry logic
4. **Use appropriate isolation levels** - not always SERIALIZABLE
5. **Avoid nested transactions** - use savepoints instead
6. **Test concurrent scenarios** - race conditions are hard to debug

```sql
-- Good: Short, focused transaction
BEGIN;
UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 123;
INSERT INTO sales (product_id, quantity, sale_date) VALUES (123, 1, CURRENT_DATE);
COMMIT;

-- Bad: Long transaction with user interaction
BEGIN;
SELECT * FROM products WHERE category = 'electronics';
-- User spends 5 minutes deciding what to buy
INSERT INTO orders (...);  -- Other users are blocked during this time
COMMIT;
```

## Indexes & Performance

Indexes are database objects that improve query performance by providing fast access paths to table data. They're like an index in a book - instead of scanning every page, you can jump directly to the information you need.

### How Indexes Work

**Without Index (Full Table Scan):**
```sql
-- This query scans every row
SELECT * FROM employees WHERE email = 'john@company.com';
-- PostgreSQL must check all 100,000 employee records
```

**With Index (Index Scan):**
```sql
-- Create index
CREATE INDEX idx_employees_email ON employees(email);

-- Same query now uses index
SELECT * FROM employees WHERE email = 'john@company.com';
-- PostgreSQL directly finds the row using the index
```

### Index Types in PostgreSQL

#### B-Tree Index (Default and Most Common)

B-Tree indexes are perfect for equality and range queries:

```sql
-- Single column index
CREATE INDEX idx_employees_last_name ON employees(last_name);

-- Multi-column index (column order matters!)
CREATE INDEX idx_employees_dept_salary ON employees(department_id, salary);

-- Partial index (indexes only rows meeting a condition)
CREATE INDEX idx_active_employees_email ON employees(email) 
WHERE is_active = true;

-- Functional index (indexes result of expression)
CREATE INDEX idx_employees_lower_email ON employees(LOWER(email));

-- Examples of when B-Tree indexes are used:
SELECT * FROM employees WHERE last_name = 'Smith';                    -- Equality
SELECT * FROM employees WHERE salary > 50000;                         -- Range
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 80000;         -- Range
SELECT * FROM employees WHERE last_name LIKE 'Smi%';                  -- Prefix match
SELECT * FROM employees WHERE department_id = 1 ORDER BY salary;      -- Order by indexed column
```

**Multi-column Index Column Order:**
```sql
-- Good for queries filtering by department_id, or department_id + salary
CREATE INDEX idx_emp_dept_salary ON employees(department_id, salary);

-- These queries can use the index:
SELECT * FROM employees WHERE department_id = 1;                      -- ✓ Uses index
SELECT * FROM employees WHERE department_id = 1 AND salary > 50000;   -- ✓ Uses index fully
SELECT * FROM employees WHERE department_id = 1 ORDER BY salary;      -- ✓ Uses index

-- This query cannot use the index efficiently:
SELECT * FROM employees WHERE salary > 50000;                         -- ✗ Salary is second column
```

#### Hash Index

Hash indexes are only for equality comparisons, but very fast:

```sql
-- Hash index for exact matches only
CREATE INDEX idx_employees_id_hash ON employees USING HASH(id);

-- Good for:
SELECT * FROM employees WHERE id = 123;                               -- ✓ Equality

-- Cannot be used for:
SELECT * FROM employees WHERE id > 100;                               -- ✗ Range queries
SELECT * FROM employees WHERE id IN (1, 2, 3);                        -- ✗ Not equality
```

#### GIN Index (Generalized Inverted Index)

Perfect for complex data types like arrays, JSONB, and full-text search:

```sql
-- For array columns
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    tags TEXT[]
);

CREATE INDEX idx_posts_tags ON posts USING GIN(tags);

-- Efficient queries:
SELECT * FROM posts WHERE tags @> ARRAY['postgresql'];                 -- Contains
SELECT * FROM posts WHERE tags && ARRAY['database', 'sql'];          -- Overlaps

-- For JSONB columns
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    profile JSONB
);

CREATE INDEX idx_user_profiles_gin ON user_profiles USING GIN(profile);

-- Efficient JSONB queries:
SELECT * FROM user_profiles WHERE profile @> '{"city": "New York"}';
SELECT * FROM user_profiles WHERE profile ? 'phone';                  -- Has key
SELECT * FROM user_profiles WHERE profile #> '{address,city}' = '"NYC"';

-- For full-text search
CREATE INDEX idx_posts_fulltext ON posts USING GIN(to_tsvector('english', title));

SELECT * FROM posts WHERE to_tsvector('english', title) @@ to_tsquery('postgresql & database');
```

#### GiST Index (Generalized Search Tree)

Good for geometric data, full-text search, and range types:

```sql
-- For geometric data
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location POINT
);

CREATE INDEX idx_stores_location ON stores USING GIST(location);

-- Efficient geometric queries:
SELECT * FROM stores WHERE location <-> POINT(0,0) < 10;              -- Distance

-- For range types
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    date_range DATERANGE
);

CREATE INDEX idx_events_daterange ON events USING GIST(date_range);

-- Efficient range queries:
SELECT * FROM events WHERE date_range @> CURRENT_DATE;                -- Contains date
SELECT * FROM events WHERE date_range && '[2024-01-01,2024-12-31)'::daterange; -- Overlaps
```

### Query Performance Analysis

#### EXPLAIN - Understanding Query Plans

```sql
-- Basic explain
EXPLAIN SELECT * FROM employees WHERE department_id = 1;

-- More detailed analysis
EXPLAIN (ANALYZE, BUFFERS, VERBOSE) 
SELECT e.first_name, e.last_name, d.name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > 50000;
```

**Understanding EXPLAIN output:**
- **Seq Scan**: Table scan (slow for large tables)
- **Index Scan**: Using an index to find rows
- **Index Only Scan**: Getting all needed data from index
- **Bitmap Heap Scan**: Using index to find row locations, then fetching rows
- **Nested Loop**: Join algorithm for small result sets
- **Hash Join**: Join algorithm for larger result sets
- **Sort**: Explicit sorting operation

#### Query Optimization Examples

**Before optimization:**
```sql
-- Slow query - no index on salary
EXPLAIN ANALYZE
SELECT * FROM employees WHERE salary > 50000;
-- Result: Seq Scan on employees (cost=0.00..2500.00 rows=5000 width=50) (actual time=25.123..45.678 rows=5000)
```

**After optimization:**
```sql
-- Add index
CREATE INDEX idx_employees_salary ON employees(salary);

-- Same query now faster
EXPLAIN ANALYZE
SELECT * FROM employees WHERE salary > 50000;
-- Result: Index Scan using idx_employees_salary (cost=0.42..156.78 rows=5000 width=50) (actual time=0.123..2.345 rows=5000)
```

### Index Maintenance and Best Practices

#### Monitoring Index Usage

```sql
-- Check index usage statistics
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as times_used,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY schemaname, tablename;

-- Check index sizes
SELECT 
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) as index_size
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexname::regclass) DESC;
```

#### Index Maintenance

```sql
-- Rebuild index (removes bloat)
REINDEX INDEX idx_employees_email;

-- Rebuild all indexes on a table
REINDEX TABLE employees;

-- Create index without blocking writes (PostgreSQL 11+)
CREATE INDEX CONCURRENTLY idx_employees_phone ON employees(phone);

-- Drop unused index
DROP INDEX IF EXISTS idx_employees_unused;
```

### Performance Best Practices

#### 1. Index Strategy

```sql
-- Good: Composite index for common query patterns
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

-- Supports both of these efficiently:
SELECT * FROM orders WHERE customer_id = 123;
SELECT * FROM orders WHERE customer_id = 123 AND order_date >= '2024-01-01';
```

#### 2. Covering Indexes

```sql
-- Include additional columns to avoid table lookups
CREATE INDEX idx_employees_dept_salary_covering 
ON employees(department_id, salary) 
INCLUDE (first_name, last_name);

-- This query can be satisfied entirely from the index:
SELECT first_name, last_name, salary 
FROM employees 
WHERE department_id = 1 AND salary > 50000;
```

#### 3. Partial Indexes for Sparse Data

```sql
-- Only index active employees (saves space if most are inactive)
CREATE INDEX idx_active_employees_email ON employees(email) 
WHERE is_active = true;

-- Only index recent orders
CREATE INDEX idx_recent_orders_customer ON orders(customer_id) 
WHERE order_date >= CURRENT_DATE - INTERVAL '1 year';
```

#### 4. Functional Indexes for Expressions

```sql
-- Index for case-insensitive searches
CREATE INDEX idx_employees_lower_email ON employees(LOWER(email));

-- Query that uses the index:
SELECT * FROM employees WHERE LOWER(email) = LOWER('John@Company.COM');

-- Index for date part queries
CREATE INDEX idx_orders_year ON orders(EXTRACT(YEAR FROM order_date));

-- Query that uses the index:
SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2024;
```

#### 5. Index Maintenance Considerations

- **Too many indexes slow down writes** (INSERT, UPDATE, DELETE)
- **Each index takes storage space**
- **Keep statistics updated** with ANALYZE
- **Monitor for index bloat** and rebuild when necessary
- **Drop unused indexes** regularly

```sql
-- Update table statistics (helps query planner)
ANALYZE employees;

-- Schedule regular maintenance
-- In cron or scheduled job:
-- VACUUM ANALYZE employees;
-- REINDEX TABLE employees;
```

Remember: Indexes are a trade-off between read performance and write performance. Design your indexing strategy based on your application's specific query patterns and performance requirements.

## Triggers & Stored Procedures

Triggers and stored procedures are powerful PostgreSQL features that allow you to implement business logic directly in the database.

### Understanding Triggers

A trigger is a special function that automatically executes (or "fires") in response to certain events in a database table or view. Triggers run automatically - you can't call them directly.

**When do triggers fire?**
- **BEFORE** or **AFTER** an event
- On **INSERT**, **UPDATE**, or **DELETE** operations
- **FOR EACH ROW** or **FOR EACH STATEMENT**

### Trigger Functions

First, you need to create a function that returns `TRIGGER`:

```sql
-- Basic trigger function template
CREATE OR REPLACE FUNCTION function_name()
RETURNS TRIGGER AS $$
BEGIN
    -- Trigger logic here
    
    -- For BEFORE triggers on INSERT/UPDATE, return NEW
    -- For BEFORE triggers on DELETE, return OLD
    -- For AFTER triggers, return value is ignored but use NEW or OLD as appropriate
    RETURN NEW; -- or OLD for DELETE triggers
END;
$$ LANGUAGE plpgsql;
```

### Common Trigger Examples

#### 1. Automatic Timestamp Updates

```sql
-- Function to update 'updated_at' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at column to table
ALTER TABLE employees ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Create trigger
CREATE TRIGGER trigger_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Test it
UPDATE employees SET salary = 80000 WHERE id = 1;
-- The updated_at column will automatically be set to current timestamp
```

#### 2. Audit Trail Trigger

```sql
-- Create audit log table
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    operation VARCHAR(10) NOT NULL,
    row_id INTEGER,
    old_data JSONB,
    new_data JSONB,
    changed_by VARCHAR(100) DEFAULT current_user,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle different operations
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, operation, row_id, old_data)
        VALUES (TG_TABLE_NAME, TG_OP, OLD.id, row_to_json(OLD));
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, operation, row_id, old_data, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, NEW.id, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, operation, row_id, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, NEW.id, row_to_json(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply audit trigger to tables
CREATE TRIGGER audit_employees
    AFTER INSERT OR UPDATE OR DELETE ON employees
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_customers
    AFTER INSERT OR UPDATE OR DELETE ON customers
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```

#### 3. Data Validation Trigger

```sql
-- Validation trigger function
CREATE OR REPLACE FUNCTION validate_employee_data()
RETURNS TRIGGER AS $$
BEGIN
    -- Validate email format
    IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format: %', NEW.email;
    END IF;
    
    -- Validate salary range
    IF NEW.salary < 0 THEN
        RAISE EXCEPTION 'Salary cannot be negative';
    END IF;
    
    IF NEW.salary > 1000000 THEN
        RAISE EXCEPTION 'Salary exceeds maximum allowed amount';
    END IF;
    
    -- Validate phone number format (if provided)
    IF NEW.phone IS NOT NULL AND NEW.phone !~ '^\+?[1-9]\d{1,14}$' THEN
        RAISE EXCEPTION 'Invalid phone number format: %', NEW.phone;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create validation trigger
CREATE TRIGGER validate_employee_trigger
    BEFORE INSERT OR UPDATE ON employees
    FOR EACH ROW EXECUTE FUNCTION validate_employee_data();
```

#### 4. Automatic Counter Updates

```sql
-- Update department employee count when employees are added/removed
CREATE OR REPLACE FUNCTION update_department_employee_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Handle INSERT
    IF TG_OP = 'INSERT' THEN
        UPDATE departments 
        SET employee_count = employee_count + 1 
        WHERE id = NEW.department_id;
        RETURN NEW;
    END IF;
    
    -- Handle DELETE
    IF TG_OP = 'DELETE' THEN
        UPDATE departments 
        SET employee_count = employee_count - 1 
        WHERE id = OLD.department_id;
        RETURN OLD;
    END IF;
    
    -- Handle UPDATE (department change)
    IF TG_OP = 'UPDATE' AND OLD.department_id != NEW.department_id THEN
        -- Decrease count in old department
        UPDATE departments 
        SET employee_count = employee_count - 1 
        WHERE id = OLD.department_id;
        
        -- Increase count in new department
        UPDATE departments 
        SET employee_count = employee_count + 1 
        WHERE id = NEW.department_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add employee_count column to departments
ALTER TABLE departments ADD COLUMN employee_count INTEGER DEFAULT 0;

-- Initialize counts
UPDATE departments 
SET employee_count = (
    SELECT COUNT(*) 
    FROM employees 
    WHERE department_id = departments.id
);

-- Create trigger
CREATE TRIGGER update_dept_employee_count
    AFTER INSERT OR UPDATE OR DELETE ON employees
    FOR EACH ROW EXECUTE FUNCTION update_department_employee_count();
```

### Stored Procedures and Functions

PostgreSQL functions can return values, while procedures (introduced in PostgreSQL 11) cannot return values but can manage transactions.

#### Functions (Return Values)

```sql
-- Simple function that returns a value
CREATE OR REPLACE FUNCTION get_employee_full_name(emp_id INTEGER)
RETURNS TEXT AS $$
DECLARE
    full_name TEXT;
BEGIN
    SELECT first_name || ' ' || last_name
    INTO full_name
    FROM employees
    WHERE id = emp_id;
    
    IF full_name IS NULL THEN
        RETURN 'Employee not found';
    END IF;
    
    RETURN full_name;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT get_employee_full_name(1);
```

#### Functions with Complex Logic

```sql
-- Calculate employee bonus based on performance and tenure
CREATE OR REPLACE FUNCTION calculate_employee_bonus(emp_id INTEGER)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    emp_record RECORD;
    years_employed INTEGER;
    base_bonus DECIMAL(10,2);
    performance_multiplier DECIMAL(3,2);
    final_bonus DECIMAL(10,2);
BEGIN
    -- Get employee information
    SELECT * INTO emp_record
    FROM employees
    WHERE id = emp_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Employee with ID % not found', emp_id;
    END IF;
    
    -- Calculate years employed
    years_employed := EXTRACT(YEAR FROM AGE(CURRENT_DATE, emp_record.hire_date));
    
    -- Base bonus calculation (5% of salary)
    base_bonus := emp_record.salary * 0.05;
    
    -- Performance multiplier based on performance rating
    performance_multiplier := CASE emp_record.performance_rating
        WHEN 'Excellent' THEN 1.5
        WHEN 'Good' THEN 1.2
        WHEN 'Average' THEN 1.0
        WHEN 'Poor' THEN 0.5
        ELSE 1.0
    END;
    
    -- Tenure bonus (additional 2% per year, max 10 years)
    final_bonus := base_bonus * performance_multiplier * (1 + LEAST(years_employed, 10) * 0.02);
    
    -- Log bonus calculation
    INSERT INTO bonus_calculations (employee_id, base_bonus, performance_multiplier, final_bonus, calculated_at)
    VALUES (emp_id, base_bonus, performance_multiplier, final_bonus, CURRENT_TIMESTAMP);
    
    RETURN final_bonus;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT 
    id,
    first_name,
    last_name,
    salary,
    calculate_employee_bonus(id) as bonus
FROM employees
WHERE department_id = 1;
```

#### Table-Valued Functions

```sql
-- Function that returns a table
CREATE OR REPLACE FUNCTION get_department_summary(dept_id INTEGER DEFAULT NULL)
RETURNS TABLE(
    department_name VARCHAR(100),
    employee_count BIGINT,
    avg_salary DECIMAL(10,2),
    min_salary DECIMAL(10,2),
    max_salary DECIMAL(10,2),
    total_payroll DECIMAL(12,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.name,
        COUNT(e.id)::BIGINT,
        COALESCE(AVG(e.salary), 0)::DECIMAL(10,2),
        COALESCE(MIN(e.salary), 0)::DECIMAL(10,2),
        COALESCE(MAX(e.salary), 0)::DECIMAL(10,2),
        COALESCE(SUM(e.salary), 0)::DECIMAL(12,2)
    FROM departments d
    LEFT JOIN employees e ON d.id = e.department_id
    WHERE (dept_id IS NULL OR d.id = dept_id)
    GROUP BY d.id, d.name
    ORDER BY d.name;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT * FROM get_department_summary();        -- All departments
SELECT * FROM get_department_summary(1);       -- Specific department
```

#### Procedures (PostgreSQL 11+)

```sql
-- Procedure for complex business operations
CREATE OR REPLACE PROCEDURE process_monthly_payroll(pay_period_month INTEGER, pay_period_year INTEGER)
LANGUAGE plpgsql AS $$
DECLARE
    emp_record RECORD;
    bonus_amount DECIMAL(10,2);
    tax_amount DECIMAL(10,2);
    net_pay DECIMAL(10,2);
BEGIN
    -- Create payroll batch
    INSERT INTO payroll_batches (month, year, status, created_at)
    VALUES (pay_period_month, pay_period_year, 'PROCESSING', CURRENT_TIMESTAMP);
    
    -- Process each active employee
    FOR emp_record IN 
        SELECT * FROM employees WHERE is_active = true
    LOOP
        -- Calculate bonus
        bonus_amount := calculate_employee_bonus(emp_record.id);
        
        -- Calculate tax (simplified - 25% flat rate)
        tax_amount := (emp_record.salary + bonus_amount) * 0.25;
        
        -- Calculate net pay
        net_pay := emp_record.salary + bonus_amount - tax_amount;
        
        -- Insert payroll record
        INSERT INTO payroll_records (
            employee_id, 
            batch_id, 
            base_salary, 
            bonus_amount, 
            tax_amount, 
            net_pay,
            created_at
        ) VALUES (
            emp_record.id,
            currval('payroll_batches_id_seq'),
            emp_record.salary,
            bonus_amount,
            tax_amount,
            net_pay,
            CURRENT_TIMESTAMP
        );
        
        -- Commit each employee (for long-running process)
        COMMIT;
    END LOOP;
    
    -- Update batch status
    UPDATE payroll_batches 
    SET status = 'COMPLETED', completed_at = CURRENT_TIMESTAMP
    WHERE id = currval('payroll_batches_id_seq');
    
    COMMIT;
    
    RAISE NOTICE 'Payroll processing completed for %-%', pay_period_month, pay_period_year;
END;
$$;

-- Usage
CALL process_monthly_payroll(1, 2024);
```

### Advanced Trigger Concepts

#### Conditional Triggers

```sql
-- Only log changes to sensitive columns
CREATE OR REPLACE FUNCTION selective_audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Only audit if salary or performance_rating changed
    IF TG_OP = 'UPDATE' AND (
        OLD.salary IS DISTINCT FROM NEW.salary OR
        OLD.performance_rating IS DISTINCT FROM NEW.performance_rating
    ) THEN
        INSERT INTO sensitive_audit_log (
            table_name,
            operation,
            row_id,
            column_changed,
            old_value,
            new_value,
            changed_by,
            changed_at
        ) VALUES (
            TG_TABLE_NAME,
            TG_OP,
            NEW.id,
            CASE 
                WHEN OLD.salary IS DISTINCT FROM NEW.salary THEN 'salary'
                WHEN OLD.performance_rating IS DISTINCT FROM NEW.performance_rating THEN 'performance_rating'
            END,
            CASE 
                WHEN OLD.salary IS DISTINCT FROM NEW.salary THEN OLD.salary::TEXT
                WHEN OLD.performance_rating IS DISTINCT FROM NEW.performance_rating THEN OLD.performance_rating
            END,
            CASE 
                WHEN OLD.salary IS DISTINCT FROM NEW.salary THEN NEW.salary::TEXT
                WHEN OLD.performance_rating IS DISTINCT FROM NEW.performance_rating THEN NEW.performance_rating
            END,
            current_user,
            CURRENT_TIMESTAMP
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### Statement-Level Triggers

```sql
-- Trigger that fires once per statement (not per row)
CREATE OR REPLACE FUNCTION log_bulk_operations()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO operation_log (
        table_name,
        operation,
        row_count,
        executed_by,
        executed_at
    ) VALUES (
        TG_TABLE_NAME,
        TG_OP,
        CASE TG_OP
            WHEN 'INSERT' THEN (SELECT COUNT(*) FROM inserted_rows)
            WHEN 'UPDATE' THEN (SELECT COUNT(*) FROM updated_rows)
            WHEN 'DELETE' THEN (SELECT COUNT(*) FROM deleted_rows)
        END,
        current_user,
        CURRENT_TIMESTAMP
    );
    
    RETURN NULL; -- Return value ignored for statement-level triggers
END;
$$ LANGUAGE plpgsql;

-- Create statement-level trigger
CREATE TRIGGER log_bulk_employee_operations
    AFTER INSERT OR UPDATE OR DELETE ON employees
    FOR EACH STATEMENT EXECUTE FUNCTION log_bulk_operations();
```

### Trigger and Function Best Practices

1. **Keep triggers simple and fast** - they run for every affected row
2. **Avoid complex business logic in triggers** - use application code instead
3. **Be careful with recursive triggers** - triggers can fire other triggers
4. **Use BEFORE triggers for validation and data modification**
5. **Use AFTER triggers for logging and notifications**
6. **Handle exceptions properly** to avoid data corruption
7. **Test trigger performance impact** especially on high-volume tables

```sql
-- Example: Prevent infinite recursion
CREATE OR REPLACE FUNCTION safe_update_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if we're already in a trigger to prevent recursion
    IF TG_OP = 'UPDATE' AND OLD.some_column = NEW.some_column THEN
        RETURN NEW; -- No change needed
    END IF;
    
    -- Safe to proceed with trigger logic
    NEW.updated_count := OLD.updated_count + 1;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Views and Materialized Views

Views are virtual tables that provide a way to present data from one or more tables in a specific format. They're incredibly useful for simplifying complex queries, enhancing security, and creating logical data layers.

### Regular Views

Views are stored queries that appear as tables but don't store data themselves:

```sql
-- Simple view
CREATE VIEW active_employees AS
SELECT 
    id,
    first_name,
    last_name,
    email,
    hire_date,
    salary
FROM employees
WHERE is_active = true;

-- Use the view like a table
SELECT * FROM active_employees WHERE salary > 50000;
```

#### Complex Views with Joins

```sql
-- Employee summary view with department information
CREATE VIEW employee_summary AS
SELECT 
    e.id,
    e.first_name || ' ' || e.last_name AS full_name,
    e.email,
    e.salary,
    e.hire_date,
    d.name AS department_name,
    d.budget AS department_budget,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, e.hire_date)) AS years_employed,
    CASE 
        WHEN e.salary >= 80000 THEN 'Senior'
        WHEN e.salary >= 60000 THEN 'Mid-level'
        ELSE 'Junior'
    END AS seniority_level
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE e.is_active = true;

-- Query the view
SELECT 
    department_name,
    seniority_level,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employee_summary
GROUP BY department_name, seniority_level
ORDER BY department_name, seniority_level;
```

#### Views for Security and Data Access Control

```sql
-- Public employee directory (sensitive data hidden)
CREATE VIEW employee_directory AS
SELECT 
    first_name,
    last_name,
    department_id,
    email,
    phone
FROM employees
WHERE is_active = true;

-- Management view (more detailed information)
CREATE VIEW management_employee_view AS
SELECT 
    e.*,
    d.name AS department_name,
    m.first_name || ' ' || m.last_name AS manager_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id;

-- Grant different access levels
GRANT SELECT ON employee_directory TO public_users;
GRANT SELECT ON management_employee_view TO managers;
```

### Materialized Views

Materialized views store the query results physically, providing better performance for complex queries:

```sql
-- Create materialized view for reporting
CREATE MATERIALIZED VIEW department_statistics AS
SELECT 
    d.id AS department_id,
    d.name AS department_name,
    COUNT(e.id) AS employee_count,
    AVG(e.salary) AS avg_salary,
    MIN(e.salary) AS min_salary,
    MAX(e.salary) AS max_salary,
    SUM(e.salary) AS total_payroll,
    COUNT(CASE WHEN e.hire_date >= CURRENT_DATE - INTERVAL '1 year' THEN 1 END) AS new_hires_last_year,
    AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, e.hire_date))) AS avg_years_employed
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id AND e.is_active = true
GROUP BY d.id, d.name;

-- Query the materialized view (fast!)
SELECT * FROM department_statistics ORDER BY total_payroll DESC;
```

#### Refreshing Materialized Views

```sql
-- Refresh the entire materialized view
REFRESH MATERIALIZED VIEW department_statistics;

-- Refresh without blocking concurrent selects (PostgreSQL 9.4+)
REFRESH MATERIALIZED VIEW CONCURRENTLY department_statistics;

-- Note: For CONCURRENTLY, you need a unique index
CREATE UNIQUE INDEX idx_dept_stats_dept_id ON department_statistics(department_id);
```

#### Automatic Refresh with Triggers

```sql
-- Function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_department_statistics()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY department_statistics;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to refresh when employees table changes
CREATE TRIGGER refresh_dept_stats_on_employee_change
    AFTER INSERT OR UPDATE OR DELETE ON employees
    FOR EACH STATEMENT
    EXECUTE FUNCTION refresh_department_statistics();
```

### Advanced View Patterns

#### Updatable Views

Simple views can be updatable if they meet certain criteria:

```sql
-- Simple updatable view
CREATE VIEW current_employees AS
SELECT id, first_name, last_name, email, salary, department_id
FROM employees
WHERE is_active = true;

-- This will work (updates underlying table)
UPDATE current_employees SET salary = 75000 WHERE id = 1;

-- Complex view with INSTEAD OF triggers for updates
CREATE VIEW employee_with_department AS
SELECT 
    e.id,
    e.first_name,
    e.last_name,
    e.email,
    e.salary,
    d.name AS department_name
FROM employees e
JOIN departments d ON e.department_id = d.id;

-- Make it updatable with INSTEAD OF trigger
CREATE OR REPLACE FUNCTION update_employee_with_department()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE employees 
    SET 
        first_name = NEW.first_name,
        last_name = NEW.last_name,
        email = NEW.email,
        salary = NEW.salary
    WHERE id = NEW.id;
    
    -- Handle department name change
    IF OLD.department_name != NEW.department_name THEN
        UPDATE employees 
        SET department_id = (
            SELECT id FROM departments WHERE name = NEW.department_name
        )
        WHERE id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_employee_with_department_trigger
    INSTEAD OF UPDATE ON employee_with_department
    FOR EACH ROW EXECUTE FUNCTION update_employee_with_department();
```

#### Recursive Views (PostgreSQL 14+)

```sql
-- Recursive view for organizational hierarchy
CREATE RECURSIVE VIEW employee_hierarchy (employee_id, employee_name, manager_id, level, path) AS (
    -- Base case: top-level employees
    SELECT 
        id,
        first_name || ' ' || last_name,
        manager_id,
        1,
        ARRAY[id]
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case
    SELECT 
        e.id,
        e.first_name || ' ' || e.last_name,
        e.manager_id,
        eh.level + 1,
        eh.path || e.id
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
);

-- Query the recursive view
SELECT 
    REPEAT('  ', level - 1) || employee_name AS indented_name,
    level,
    array_length(path, 1) AS depth
FROM employee_hierarchy
ORDER BY path;
```

### View Performance Considerations

#### Views with Indexes

```sql
-- You can't create indexes directly on views, but you can:

-- 1. Create indexes on underlying tables to speed up view queries
CREATE INDEX idx_employees_active_salary ON employees(is_active, salary) WHERE is_active = true;

-- 2. Use materialized views with indexes
CREATE MATERIALIZED VIEW expensive_calculation AS
SELECT 
    product_id,
    SUM(quantity * unit_price) AS total_revenue,
    COUNT(*) AS order_count,
    AVG(unit_price) AS avg_price
FROM order_items
GROUP BY product_id;

CREATE INDEX idx_expensive_calc_revenue ON expensive_calculation(total_revenue);
CREATE INDEX idx_expensive_calc_product ON expensive_calculation(product_id);
```

#### View Best Practices

1. **Use views for commonly used queries** to reduce code duplication
2. **Implement security layers** with views instead of exposing tables directly
3. **Keep view logic simple** for better performance
4. **Use materialized views for expensive aggregations**
5. **Document view purposes** and refresh schedules
6. **Monitor view performance** and optimize underlying queries

```sql
-- Example: Layered view approach
-- Base view (simple filter)
CREATE VIEW base_active_employees AS
SELECT * FROM employees WHERE is_active = true;

-- Business logic view (builds on base view)
CREATE VIEW employee_performance_summary AS
SELECT 
    bae.*,
    CASE 
        WHEN salary >= 80000 THEN 'High Performer'
        WHEN salary >= 60000 THEN 'Good Performer'
        ELSE 'Standard Performer'
    END AS performance_category,
    EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) AS tenure_years
FROM base_active_employees bae;

-- Reporting view (builds on business logic view)
CREATE VIEW department_performance_report AS
SELECT 
    d.name AS department,
    eps.performance_category,
    COUNT(*) AS employee_count,
    AVG(eps.salary) AS avg_salary,
    AVG(eps.tenure_years) AS avg_tenure
FROM employee_performance_summary eps
JOIN departments d ON eps.department_id = d.id
GROUP BY d.name, eps.performance_category
ORDER BY d.name, eps.performance_category;
```

## Security & Best Practices

Database security is critical for protecting sensitive data and ensuring system integrity. PostgreSQL provides robust security features that should be properly configured and maintained.

### User Management & Authentication

#### Creating Users and Roles

```sql
-- Create roles (groups of permissions)
CREATE ROLE app_read;
CREATE ROLE app_write; 
CREATE ROLE app_admin;
CREATE ROLE hr_staff;
CREATE ROLE finance_team;

-- Create users with passwords
CREATE USER app_user WITH PASSWORD 'secure_random_password_123!';
CREATE USER readonly_user WITH PASSWORD 'another_secure_password_456!';
CREATE USER jane_hr WITH PASSWORD 'hr_secure_pass_789!';

-- Assign roles to users
GRANT app_write TO app_user;
GRANT app_read TO readonly_user;
GRANT hr_staff TO jane_hr;

-- Users can inherit multiple roles
GRANT app_read, hr_staff TO jane_hr;
```

#### Role-Based Permissions

```sql
-- Schema-level permissions
GRANT USAGE ON SCHEMA public TO app_read;
GRANT USAGE ON SCHEMA hr TO hr_staff;
GRANT CREATE ON SCHEMA public TO app_admin;

-- Table-level permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_read;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_write;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_admin;

-- Column-level permissions (limit access to sensitive data)
GRANT SELECT (id, first_name, last_name, email) ON employees TO hr_staff;
-- hr_staff cannot see salary, ssn, or other sensitive columns

-- Sequence permissions (needed for SERIAL columns)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_write;

-- Function permissions
GRANT EXECUTE ON FUNCTION calculate_employee_bonus(INTEGER) TO hr_staff;
```

#### Default Permissions for Future Objects

```sql
-- Set default permissions for objects created in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT ON TABLES TO app_read;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_write;

ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT USAGE ON SEQUENCES TO app_write;
```

### Row Level Security (RLS)

RLS allows you to control which rows a user can see or modify:

```sql
-- Enable RLS on a table
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see employees in their department
CREATE POLICY department_employees ON employees
    FOR SELECT
    TO app_user
    USING (department_id = (
        SELECT department_id 
        FROM employees 
        WHERE email = current_user || '@company.com'
    ));

-- Policy: HR staff can see all employees
CREATE POLICY hr_full_access ON employees
    FOR ALL
    TO hr_staff
    USING (true);

-- Policy: Employees can only update their own record
CREATE POLICY self_update ON employees
    FOR UPDATE
    TO app_user
    USING (email = current_user || '@company.com')
    WITH CHECK (email = current_user || '@company.com');

-- Policy with time-based restrictions
CREATE POLICY business_hours_update ON employees
    FOR UPDATE
    USING (
        EXTRACT(hour FROM CURRENT_TIME) BETWEEN 9 AND 17
        AND EXTRACT(dow FROM CURRENT_DATE) BETWEEN 1 AND 5
    );
```

#### Advanced RLS Examples

```sql
-- Multi-tenant application: Users only see their organization's data
CREATE POLICY tenant_isolation ON orders
    FOR ALL
    USING (
        organization_id = (
            SELECT organization_id 
            FROM users 
            WHERE username = current_user
        )
    );

-- Hierarchical access: Managers can see subordinates' data
CREATE POLICY manager_access ON performance_reviews
    FOR SELECT
    USING (
        employee_id IN (
            -- Recursive query to find all subordinates
            WITH RECURSIVE subordinates AS (
                SELECT id FROM employees WHERE email = current_user || '@company.com'
                UNION ALL
                SELECT e.id FROM employees e
                JOIN subordinates s ON e.manager_id = s.id
            )
            SELECT id FROM subordinates
        )
    );
```

### Data Encryption

#### Column-Level Encryption

```sql
-- Install pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Encrypt sensitive data
CREATE TABLE customer_sensitive (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    ssn_encrypted BYTEA,  -- Store encrypted data
    credit_card_encrypted BYTEA
);

-- Insert encrypted data
INSERT INTO customer_sensitive (name, email, ssn_encrypted, credit_card_encrypted)
VALUES (
    'John Doe',
    'john@email.com',
    pgp_sym_encrypt('123-45-6789', 'encryption_key_for_ssn'),
    pgp_sym_encrypt('4532-1234-5678-9012', 'encryption_key_for_cc')
);

-- Decrypt data (only for authorized users)
SELECT 
    name,
    email,
    CASE 
        WHEN current_user IN ('hr_manager', 'admin') 
        THEN pgp_sym_decrypt(ssn_encrypted, 'encryption_key_for_ssn')
        ELSE '***-**-****'
    END AS ssn,
    CASE 
        WHEN current_user = 'finance_manager'
        THEN pgp_sym_decrypt(credit_card_encrypted, 'encryption_key_for_cc')
        ELSE '****-****-****-****'
    END AS credit_card
FROM customer_sensitive;
```

#### Transparent Data Encryption (TDE)

For PostgreSQL 11+, you can encrypt entire tablespaces:

```sql
-- Create encrypted tablespace (requires proper setup)
CREATE TABLESPACE encrypted_space 
LOCATION '/encrypted/path' 
WITH (encryption_key_id = 'key1');

-- Create tables in encrypted tablespace
CREATE TABLE sensitive_data (
    id SERIAL PRIMARY KEY,
    confidential_info TEXT
) TABLESPACE encrypted_space;
```

### Connection Security

#### SSL/TLS Configuration

```sql
-- Check SSL status
SHOW ssl;

-- Force SSL connections for specific users
ALTER USER app_user REQUIRE SSL;

-- In postgresql.conf:
-- ssl = on
-- ssl_cert_file = 'server.crt'
-- ssl_key_file = 'server.key'
-- ssl_ca_file = 'ca.crt'
```

#### Connection Limits and Authentication

```sql
-- Set connection limits
ALTER USER app_user CONNECTION LIMIT 50;

-- Set session timeout
ALTER USER app_user SET statement_timeout = '30min';
ALTER USER app_user SET idle_in_transaction_session_timeout = '10min';

-- In pg_hba.conf (PostgreSQL Host-Based Authentication):
-- host    mydb    app_user    192.168.1.0/24    md5
-- host    mydb    admin       127.0.0.1/32      cert
-- local   all     all                           peer
```

### Audit and Monitoring

#### Built-in Logging

```sql
-- In postgresql.conf:
-- log_destination = 'csvlog'
-- logging_collector = on
-- log_directory = 'pg_log'
-- log_statement = 'all'  -- or 'ddl', 'mod', 'none'
-- log_min_duration_statement = 1000  -- Log slow queries (1 second)

-- Log connections and disconnections
-- log_connections = on
-- log_disconnections = on

-- Log lock waits
-- log_lock_waits = on
-- deadlock_timeout = 1s
```

#### Custom Audit Logging

```sql
-- Create comprehensive audit table
CREATE TABLE audit_trail (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL DEFAULT current_user,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    client_ip INET,
    database_name TEXT NOT NULL DEFAULT current_database(),
    schema_name TEXT,
    table_name TEXT,
    operation TEXT NOT NULL,
    object_id TEXT,
    old_values JSONB,
    new_values JSONB,
    query_text TEXT,
    application_name TEXT
);

-- Audit trigger function
CREATE OR REPLACE FUNCTION comprehensive_audit_trigger()
RETURNS TRIGGER AS $$
DECLARE
    client_ip TEXT;
    app_name TEXT;
BEGIN
    -- Get client information
    SELECT inet_client_addr() INTO client_ip;
    SELECT application_name FROM pg_stat_activity 
    WHERE pid = pg_backend_pid() INTO app_name;
    
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_trail (
            schema_name, table_name, operation, object_id,
            old_values, client_ip, application_name
        ) VALUES (
            TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, OLD.id::TEXT,
            row_to_json(OLD)::JSONB, client_ip::INET, app_name
        );
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_trail (
            schema_name, table_name, operation, object_id,
            old_values, new_values, client_ip, application_name
        ) VALUES (
            TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, NEW.id::TEXT,
            row_to_json(OLD)::JSONB, row_to_json(NEW)::JSONB, 
            client_ip::INET, app_name
        );
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_trail (
            schema_name, table_name, operation, object_id,
            new_values, client_ip, application_name
        ) VALUES (
            TG_TABLE_SCHEMA, TG_TABLE_NAME, TG_OP, NEW.id::TEXT,
            row_to_json(NEW)::JSONB, client_ip::INET, app_name
        );
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

### Database Security Best Practices

#### 1. Principle of Least Privilege

```sql
-- Bad: Giving unnecessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO app_user;

-- Good: Only necessary permissions
GRANT SELECT, INSERT, UPDATE ON specific_tables TO app_user;
GRANT SELECT ONLY ON read_only_tables TO app_user;
```

#### 2. Regular Security Maintenance

```sql
-- Regular password rotation
ALTER USER app_user WITH PASSWORD 'new_secure_password';

-- Review and cleanup unused accounts
SELECT usename, valuntil FROM pg_user WHERE valuntil < CURRENT_DATE;
DROP USER IF EXISTS old_unused_user;

-- Monitor failed authentication attempts
SELECT * FROM pg_stat_database WHERE datname = current_database();
```

#### 3. Backup Security

```sql
-- Encrypt backups
-- pg_dump --format=custom --compress=9 --file=backup.dump database_name
-- gpg --cipher-algo AES256 --compress-algo 1 --symmetric backup.dump

-- Test backup restoration regularly in isolated environment
-- pg_restore --clean --create --dbname=postgres backup.dump
```

#### 4. Input Validation and SQL Injection Prevention

```sql
-- Bad: Dynamic SQL vulnerable to injection
-- query = "SELECT * FROM users WHERE email = '" + user_input + "'";

-- Good: Parameterized queries
-- PREPARE get_user (TEXT) AS SELECT * FROM users WHERE email = $1;
-- EXECUTE get_user('user@email.com');

-- Good: Using functions with proper parameter types
CREATE OR REPLACE FUNCTION get_user_by_email(email_param TEXT)
RETURNS TABLE(id INTEGER, name TEXT, email TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.name, u.email
    FROM users u
    WHERE u.email = email_param;  -- Safe parameter binding
END;
$$ LANGUAGE plpgsql;
```

## Performance Optimization

Database performance optimization is an ongoing process that requires understanding your data, queries, and system resources. Here's a comprehensive guide to PostgreSQL performance tuning.

### Query Optimization Strategies

#### Understanding EXPLAIN Output

```sql
-- Basic EXPLAIN
EXPLAIN SELECT * FROM employees WHERE department_id = 1;

-- Detailed analysis with actual execution data
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, COSTS, FORMAT JSON)
SELECT 
    e.first_name, 
    e.last_name, 
    d.name AS department_name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > 50000
ORDER BY e.salary DESC;
```

**Key metrics to watch:**
- **Cost**: PostgreSQL's estimate of query expense
- **Actual Time**: Real execution time
- **Rows**: Estimated vs actual row counts
- **Buffers**: Memory usage (shared hit = good, read = disk I/O)
- **Loops**: How many times each operation repeated

#### Query Rewriting for Performance

```sql
-- Slow: Subquery in SELECT
SELECT 
    e.first_name,
    e.last_name,
    (SELECT COUNT(*) FROM orders WHERE employee_id = e.id) AS order_count
FROM employees e;

-- Fast: JOIN with aggregation
SELECT 
    e.first_name,
    e.last_name,
    COALESCE(o.order_count, 0) AS order_count
FROM employees e
LEFT JOIN (
    SELECT employee_id, COUNT(*) AS order_count
    FROM orders
    GROUP BY employee_id
) o ON e.id = o.employee_id;

-- Slow: OR conditions
SELECT * FROM employees WHERE department_id = 1 OR department_id = 2;

-- Fast: IN clause
SELECT * FROM employees WHERE department_id IN (1, 2);

-- Slow: Function in WHERE clause (not sargable)
SELECT * FROM employees WHERE UPPER(last_name) = 'SMITH';

-- Fast: Functional index + proper query
CREATE INDEX idx_employees_upper_lastname ON employees(UPPER(last_name));
SELECT * FROM employees WHERE UPPER(last_name) = 'SMITH';
```

### PostgreSQL Configuration Tuning

#### Memory Configuration

```sql
-- Check current settings
SHOW shared_buffers;
SHOW work_mem;
SHOW maintenance_work_mem;
SHOW effective_cache_size;

-- In postgresql.conf (restart required for shared_buffers):
-- shared_buffers = 256MB          -- 25% of RAM for dedicated DB server
-- work_mem = 4MB                  -- Per operation per connection
-- maintenance_work_mem = 64MB     -- For maintenance operations
-- effective_cache_size = 1GB      -- OS + PostgreSQL cache estimate
```

#### Checkpoint and WAL Configuration

```sql
-- WAL (Write-Ahead Logging) settings
-- wal_buffers = 16MB
-- checkpoint_completion_target = 0.9
-- checkpoint_timeout = 5min
-- max_wal_size = 1GB
-- min_wal_size = 80MB

-- Check checkpoint frequency
SELECT * FROM pg_stat_bgwriter;
```

#### Connection and Resource Limits

```sql
-- max_connections = 100           -- Adjust based on your needs
-- shared_preload_libraries = 'pg_stat_statements'

-- Enable query statistics collection
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

### Index Optimization Strategies

#### Composite Index Optimization

```sql
-- Analyze query patterns
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
WHERE query LIKE '%employees%'
ORDER BY total_time DESC
LIMIT 10;

-- Create optimal composite indexes
-- For queries filtering by department and salary range:
CREATE INDEX idx_employees_dept_salary_optimized 
ON employees(department_id, salary) 
WHERE is_active = true;

-- For queries ordering by salary within departments:
CREATE INDEX idx_employees_dept_salary_ordered 
ON employees(department_id, salary DESC);
```

#### Index Maintenance

```sql
-- Check index bloat
SELECT 
    schemaname,
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;

-- Rebuild bloated indexes
REINDEX INDEX CONCURRENTLY idx_employees_email;

-- Find duplicate or redundant indexes
SELECT 
    t.tablename,
    array_agg(i.indexname) AS indexes,
    i.indkey
FROM pg_indexes i
JOIN pg_tables t ON i.tablename = t.tablename
GROUP BY t.tablename, i.indkey
HAVING COUNT(*) > 1;
```

### Table Optimization

#### Partitioning for Large Tables

```sql
-- Range partitioning by date
CREATE TABLE orders_partitioned (
    id SERIAL,
    customer_id INTEGER,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10,2)
) PARTITION BY RANGE (order_date);

-- Create partitions
CREATE TABLE orders_2024_q1 PARTITION OF orders_partitioned
    FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE orders_2024_q2 PARTITION OF orders_partitioned
    FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');

-- Automatic partition creation function
CREATE OR REPLACE FUNCTION create_quarterly_partition(table_name TEXT, start_date DATE)
RETURNS VOID AS $$
DECLARE
    end_date DATE;
    partition_name TEXT;
BEGIN
    end_date := start_date + INTERVAL '3 months';
    partition_name := table_name || '_' || to_char(start_date, 'YYYY_Q"Q"');
    
    EXECUTE format('CREATE TABLE %I PARTITION OF %I FOR VALUES FROM (%L) TO (%L)',
                   partition_name, table_name, start_date, end_date);
    
    -- Create indexes on the partition
    EXECUTE format('CREATE INDEX %I ON %I (customer_id)', 
                   'idx_' || partition_name || '_customer', partition_name);
END;
$$ LANGUAGE plpgsql;
```

#### Table Maintenance

```sql
-- Regular VACUUM and ANALYZE
VACUUM ANALYZE employees;

-- Check table bloat
SELECT 
    schemaname,
    tablename,
    n_tup_ins,
    n_tup_upd,
    n_tup_del,
    n_dead_tup,
    last_vacuum,
    last_autovacuum,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- Aggressive cleanup for heavily updated tables
VACUUM FULL employees;  -- Requires exclusive lock, use carefully
```

### Connection Pooling

```javascript
// Application-level connection pooling (Node.js example)
const { Pool } = require('pg');

const pool = new Pool({
    user: 'app_user',
    host: 'localhost',
    database: 'company_db',
    password: 'password',
    port: 5432,
    
    // Pool configuration
    max: 20,                    // Maximum connections
    min: 2,                     // Minimum connections
    idle: 10000,                // Idle timeout (10 seconds)
    acquire: 30000,             // Acquire timeout (30 seconds)
    evict: 1000,                // Eviction check interval
    
    // Connection validation
    validate: (client) => {
        return client.query('SELECT 1');
    }
});

// Using connection from pool
async function getEmployees() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM employees LIMIT 10');
        return result.rows;
    } finally {
        client.release();  // Return connection to pool
    }
}
```

### Monitoring and Maintenance

#### Performance Monitoring Queries

```sql
-- Active queries and their duration
SELECT 
    pid,
    now() - pg_stat_activity.query_start AS duration,
    query,
    state,
    wait_event
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes'
ORDER BY duration DESC;

-- Table sizes and access patterns
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
    seq_scan,
    seq_tup_read,
    idx_scan,
    idx_tup_fetch,
    n_tup_ins,
    n_tup_upd,
    n_tup_del
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Lock monitoring
SELECT 
    t.relname,
    l.locktype,
    l.mode,
    l.granted,
    a.usename,
    a.query,
    a.query_start
FROM pg_locks l
JOIN pg_stat_all_tables t ON l.relation = t.relid
JOIN pg_stat_activity a ON l.pid = a.pid
WHERE NOT l.granted
ORDER BY a.query_start;
```

#### Automated Maintenance

```sql
-- Function for automated table maintenance
CREATE OR REPLACE FUNCTION perform_maintenance()
RETURNS VOID AS $$
DECLARE
    table_record RECORD;
BEGIN
    -- Update statistics for all tables
    FOR table_record IN 
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'ANALYZE ' || quote_ident(table_record.schemaname) || '.' || quote_ident(table_record.tablename);
    END LOOP;
    
    -- Vacuum tables with high dead tuple ratio
    FOR table_record IN 
        SELECT schemaname, tablename
        FROM pg_stat_user_tables
        WHERE n_dead_tup > 1000 
        AND (n_dead_tup::FLOAT / GREATEST(n_live_tup, 1)) > 0.1
    LOOP
        EXECUTE 'VACUUM ' || quote_ident(table_record.schemaname) || '.' || quote_ident(table_record.tablename);
    END LOOP;
    
    RAISE NOTICE 'Maintenance completed at %', CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- Schedule with pg_cron extension (if available)
-- SELECT cron.schedule('maintenance', '0 2 * * *', 'SELECT perform_maintenance();');
```

## Monitoring & Maintenance

Effective database monitoring and maintenance are crucial for ensuring optimal performance, preventing data loss, and maintaining system reliability.

### System Monitoring

#### Key Metrics to Monitor

```sql
-- Database size and growth
SELECT 
    datname,
    pg_size_pretty(pg_database_size(datname)) AS size,
    pg_database_size(datname) AS size_bytes
FROM pg_database
ORDER BY pg_database_size(datname) DESC;

-- Connection statistics
SELECT 
    datname,
    numbackends AS current_connections,
    xact_commit,
    xact_rollback,
    blks_read,
    blks_hit,
    tup_returned,
    tup_fetched,
    tup_inserted,
    tup_updated,
    tup_deleted
FROM pg_stat_database
WHERE datname = current_database();

-- Cache hit ratio (should be > 95%)
SELECT 
    'cache hit ratio' AS metric,
    (blks_hit::FLOAT / (blks_hit + blks_read)) * 100 AS percentage
FROM pg_stat_database
WHERE datname = current_database();
```

#### Performance Monitoring

```sql
-- Slowest queries
SELECT 
    query,
    calls,
    total_time,
    total_time / calls AS avg_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Most frequently called queries
SELECT 
    query,
    calls,
    total_time,
    total_time / calls AS avg_time
FROM pg_stat_statements
ORDER BY calls DESC
LIMIT 10;

-- Index usage efficiency
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE idx_scan < 100  -- Potentially unused indexes
ORDER BY pg_relation_size(indexrelid) DESC;
```

### Backup and Recovery

#### Logical Backups with pg_dump

```bash
# Full database backup
pg_dump -h localhost -U username -d database_name \
  --format=custom \
  --compress=9 \
  --verbose \
  --file=backup_$(date +%Y%m%d_%H%M%S).dump

# Schema-only backup
pg_dump -h localhost -U username -d database_name \
  --schema-only \
  --file=schema_backup.sql

# Data-only backup
pg_dump -h localhost -U username -d database_name \
  --data-only \
  --format=custom \
  --file=data_backup.dump

# Specific tables backup
pg_dump -h localhost -U username -d database_name \
  --table=employees \
  --table=departments \
  --file=critical_tables_backup.sql

# Backup with exclusions
pg_dump -h localhost -U username -d database_name \
  --exclude-table=logs \
  --exclude-table=temp_* \
  --file=backup_without_logs.dump
```

#### Physical Backups with pg_basebackup

```bash
# Base backup for point-in-time recovery
pg_basebackup -h localhost -U replication_user \
  --pgdata=/backup/base \
  --format=tar \
  --compress=9 \
  --progress \
  --verbose

# Streaming backup (for large databases)
pg_basebackup -h localhost -U replication_user \
  --pgdata=/backup/streaming \
  --wal-method=stream \
  --progress
```

#### Point-in-Time Recovery (PITR) Setup

```sql
-- Configure WAL archiving in postgresql.conf:
-- wal_level = replica
-- archive_mode = on
-- archive_command = 'cp %p /archive/wal/%f'
-- max_wal_senders = 3
-- wal_keep_segments = 64

-- Create a recovery scenario
-- 1. Take base backup
-- 2. Archive WAL files continuously
-- 3. If disaster occurs, restore base backup and replay WAL files

-- Recovery command example:
-- restore_command = 'cp /archive/wal/%f %p'
-- recovery_target_time = '2024-01-15 14:30:00'
```

#### Automated Backup Script

```bash
#!/bin/bash
# automated_backup.sh

# Configuration
DB_NAME="company_db"
DB_USER="backup_user"
DB_HOST="localhost"
BACKUP_DIR="/backups"
RETENTION_DAYS=30

# Create backup directory with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/$DB_NAME/$TIMESTAMP"
mkdir -p "$BACKUP_PATH"

# Perform backup
echo "Starting backup of $DB_NAME at $(date)"
pg_dump -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
  --format=custom \
  --compress=9 \
  --verbose \
  --file="$BACKUP_PATH/database.dump" 2>&1 | tee "$BACKUP_PATH/backup.log"

# Check backup success
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "Backup completed successfully"
    
    # Calculate backup size
    BACKUP_SIZE=$(du -h "$BACKUP_PATH/database.dump" | cut -f1)
    echo "Backup size: $BACKUP_SIZE"
    
    # Test backup integrity
    pg_restore --list "$BACKUP_PATH/database.dump" > /dev/null
    if [ $? -eq 0 ]; then
        echo "Backup integrity verified"
    else
        echo "WARNING: Backup integrity check failed"
    fi
else
    echo "ERROR: Backup failed"
    exit 1
fi

# Cleanup old backups
find "$BACKUP_DIR/$DB_NAME" -type d -mtime +$RETENTION_DAYS -exec rm -rf {} +
echo "Cleaned up backups older than $RETENTION_DAYS days"

# Send notification (optional)
echo "Backup completed for $DB_NAME on $(date)" | mail -s "Database Backup Status" admin@company.com
```

### Regular Maintenance Tasks

#### Automated Maintenance Script

```sql
-- Comprehensive maintenance function
CREATE OR REPLACE FUNCTION database_maintenance(
    vacuum_threshold FLOAT DEFAULT 0.1,
    analyze_threshold FLOAT DEFAULT 0.1
)
RETURNS TEXT AS $$
DECLARE
    table_record RECORD;
    maintenance_log TEXT := '';
    start_time TIMESTAMP;
    end_time TIMESTAMP;
BEGIN
    start_time := CURRENT_TIMESTAMP;
    maintenance_log := 'Database maintenance started at ' || start_time || E'\n';
    
    -- Update table statistics
    maintenance_log := maintenance_log || 'Updating statistics...' || E'\n';
    FOR table_record IN 
        SELECT schemaname, tablename, n_live_tup, n_dead_tup
        FROM pg_stat_user_tables
        WHERE (n_dead_tup::FLOAT / GREATEST(n_live_tup + n_dead_tup, 1)) >= analyze_threshold
    LOOP
        EXECUTE 'ANALYZE ' || quote_ident(table_record.schemaname) || '.' || quote_ident(table_record.tablename);
        maintenance_log := maintenance_log || '  Analyzed: ' || table_record.schemaname || '.' || table_record.tablename || E'\n';
    END LOOP;
    
    -- Vacuum tables with high dead tuple ratio
    maintenance_log := maintenance_log || 'Vacuuming tables...' || E'\n';
    FOR table_record IN 
        SELECT schemaname, tablename, n_live_tup, n_dead_tup
        FROM pg_stat_user_tables
        WHERE n_dead_tup > 1000 
        AND (n_dead_tup::FLOAT / GREATEST(n_live_tup, 1)) >= vacuum_threshold
    LOOP
        EXECUTE 'VACUUM ' || quote_ident(table_record.schemaname) || '.' || quote_ident(table_record.tablename);
        maintenance_log := maintenance_log || '  Vacuumed: ' || table_record.schemaname || '.' || table_record.tablename || 
                          ' (dead tuples: ' || table_record.n_dead_tup || ')' || E'\n';
    END LOOP;
    
    -- Reindex fragmented indexes
    maintenance_log := maintenance_log || 'Checking index fragmentation...' || E'\n';
    -- This would require additional logic to detect fragmentation
    
    -- Clean up old statistics
    DELETE FROM pg_stat_statements WHERE calls < 10 AND last_call < CURRENT_TIMESTAMP - INTERVAL '30 days';
    maintenance_log := maintenance_log || 'Cleaned up old query statistics' || E'\n';
    
    end_time := CURRENT_TIMESTAMP;
    maintenance_log := maintenance_log || 'Maintenance completed at ' || end_time || E'\n';
    maintenance_log := maintenance_log || 'Total duration: ' || (end_time - start_time) || E'\n';
    
    -- Log maintenance activity
    INSERT INTO maintenance_log (log_date, log_message) 
    VALUES (CURRENT_TIMESTAMP, maintenance_log);
    
    RETURN maintenance_log;
END;
$$ LANGUAGE plpgsql;

-- Create maintenance log table
CREATE TABLE IF NOT EXISTS maintenance_log (
    id SERIAL PRIMARY KEY,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    log_message TEXT
);

-- Schedule maintenance (example with pg_cron extension)
-- SELECT cron.schedule('weekly-maintenance', '0 2 * * 0', 'SELECT database_maintenance();');
```

#### Health Check Queries

```sql
-- Database health check function
CREATE OR REPLACE FUNCTION database_health_check()
RETURNS TABLE(
    check_name TEXT,
    status TEXT,
    value TEXT,
    recommendation TEXT
) AS $$
BEGIN
    -- Check database size
    RETURN QUERY
    SELECT 
        'Database Size'::TEXT,
        CASE WHEN pg_database_size(current_database()) > 100 * 1024^3 THEN 'WARNING' ELSE 'OK' END,
        pg_size_pretty(pg_database_size(current_database())),
        CASE WHEN pg_database_size(current_database()) > 100 * 1024^3 
             THEN 'Consider partitioning large tables or archiving old data'
             ELSE 'Database size is manageable' END;
    
    -- Check cache hit ratio
    RETURN QUERY
    SELECT 
        'Cache Hit Ratio'::TEXT,
        CASE WHEN (blks_hit::FLOAT / NULLIF(blks_hit + blks_read, 0)) * 100 < 95 THEN 'WARNING' ELSE 'OK' END,
        ROUND((blks_hit::FLOAT / NULLIF(blks_hit + blks_read, 0)) * 100, 2)::TEXT || '%',
        CASE WHEN (blks_hit::FLOAT / NULLIF(blks_hit + blks_read, 0)) * 100 < 95
             THEN 'Consider increasing shared_buffers'
             ELSE 'Cache performance is good' END
    FROM pg_stat_database WHERE datname = current_database();
    
    -- Check for long-running queries
    RETURN QUERY
    SELECT 
        'Long Running Queries'::TEXT,
        CASE WHEN COUNT(*) > 0 THEN 'WARNING' ELSE 'OK' END,
        COUNT(*)::TEXT || ' queries > 30 minutes',
        CASE WHEN COUNT(*) > 0 
             THEN 'Review long-running queries for optimization'
             ELSE 'No problematic long-running queries' END
    FROM pg_stat_activity 
    WHERE state = 'active' 
    AND query_start < CURRENT_TIMESTAMP - INTERVAL '30 minutes'
    AND query NOT LIKE '%pg_stat_activity%';
    
    -- Check for unused indexes
    RETURN QUERY
    SELECT 
        'Unused Indexes'::TEXT,
        CASE WHEN COUNT(*) > 5 THEN 'WARNING' ELSE 'OK' END,
        COUNT(*)::TEXT || ' potentially unused indexes',
        CASE WHEN COUNT(*) > 5
             THEN 'Review and consider dropping unused indexes'
             ELSE 'Index usage looks reasonable' END
    FROM pg_stat_user_indexes 
    WHERE idx_scan < 100;
    
    -- Check table bloat
    RETURN QUERY
    SELECT 
        'Table Bloat'::TEXT,
        CASE WHEN COUNT(*) > 0 THEN 'WARNING' ELSE 'OK' END,
        COUNT(*)::TEXT || ' tables with high dead tuple ratio',
        CASE WHEN COUNT(*) > 0
             THEN 'Run VACUUM on bloated tables'
             ELSE 'Table bloat is under control' END
    FROM pg_stat_user_tables 
    WHERE n_dead_tup > 1000 
    AND (n_dead_tup::FLOAT / GREATEST(n_live_tup, 1)) > 0.1;
END;
$$ LANGUAGE plpgsql;

-- Run health check
SELECT * FROM database_health_check();
```

## Conclusion

This comprehensive PostgreSQL guide covers the essential knowledge every developer needs to work effectively with relational databases. From basic SQL operations to advanced performance optimization, you now have the tools to design, implement, and maintain robust database systems.

### Key Takeaways

**Database Design:**
- Always start with proper data modeling and normalization
- Use appropriate data types and constraints
- Design relationships carefully with foreign keys
- Plan for scalability from the beginning

**SQL Mastery:**
- Master fundamental operations (SELECT, INSERT, UPDATE, DELETE)
- Understand joins and when to use each type
- Use indexes strategically for performance
- Leverage advanced features like window functions and CTEs

**Performance and Security:**
- Monitor query performance with EXPLAIN
- Implement proper indexing strategies
- Use transactions appropriately for data consistency
- Follow security best practices with role-based access

**Operations and Maintenance:**
- Establish regular backup and recovery procedures
- Monitor database health and performance metrics
- Perform routine maintenance tasks
- Plan for disaster recovery scenarios

### Advanced Topics to Explore Further

As you continue your PostgreSQL journey, consider diving deeper into:

- **Replication and High Availability**: Master-slave setups, streaming replication
- **Partitioning Strategies**: Range, hash, and list partitioning for large datasets
- **Extensions**: PostGIS for geographic data, pg_cron for scheduling, TimescaleDB for time-series
- **Performance Tuning**: Advanced configuration, query optimization, hardware considerations
- **Database Administration**: Cluster management, monitoring tools, automation

### Resources for Continued Learning

- **Official PostgreSQL Documentation**: Comprehensive and always up-to-date
- **PostgreSQL Performance Tuning**: Books and online courses on optimization
- **Community Forums**: Stack Overflow, PostgreSQL mailing lists, Reddit communities
- **Monitoring Tools**: pgAdmin, DataDog, New Relic for database monitoring
- **Practice Platforms**: SQLBolt, HackerRank, LeetCode for SQL practice

Remember that database expertise comes with practice and experience. Start with the fundamentals covered in this guide, then gradually tackle more complex scenarios as you encounter them in real-world projects. PostgreSQL's extensive feature set and active community make it an excellent choice for applications of any scale.

Whether you're building a small web application or an enterprise data platform, the concepts and techniques in this guide will serve as a solid foundation for your database development journey.
