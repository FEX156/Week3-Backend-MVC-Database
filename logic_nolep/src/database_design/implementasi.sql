-- create database
CREATE DATABASE sistem_perusahaan;


-- create all requirement table
CREATE TABLE position_detail (
    position_id SERIAL PRIMARY KEY,
    position_name VARCHAR(30) UNIQUE NOT NULL,
    daily_salary INT NOT NULL CHECK (daily_salary > 0)
);

CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position_id INT NOT NULL REFERENCES position_detail(position_id)
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(30) UNIQUE NOT NULL,
    budget INT NOT NULL CHECK (budget > 0),
    revenue INT CHECK (revenue >= 0)
);

CREATE TABLE project_member (
    project_member_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES project(project_id),
    employee_id INT NOT NULL REFERENCES employee(employee_id),
    start_date DATE NOT NULL,
    completed_date DATE
);

CREATE TYPE task_status AS ENUM (
    'not_started',
    'on_progress',
    'completed'
);

CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    status task_status NOT NULL DEFAULT 'not_started',
    project_id INT NOT NULL REFERENCES project(project_id),
    employee_id INT NOT NULL REFERENCES employee(employee_id)
);

CREATE TYPE attendance_status AS ENUM (
    'present',
    'leave',
    'absent'
);

CREATE TABLE attendance (
    attendance_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL REFERENCES employee(employee_id),
    project_id INT NOT NULL REFERENCES project(project_id),
    work_date DATE NOT NULL,
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    status attendance_status NOT NULL,

    CHECK (
        (status = 'present' AND check_in IS NOT NULL)
        OR (status != 'present' AND check_in IS NULL)
    )
);

CREATE TABLE project_expense (
    expense_id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES project(project_id),
    expense_date DATE NOT NULL,
    description TEXT,
    amount INT NOT NULL CHECK (amount > 0)
);


-- action for feature implementation

-- GET ABSENSI BY BULANAN

SELECT
    e.name,
    a.work_date,
    a.status,
    a.check_in,
    a.check_out,
    p.project_name
FROM attendance a
JOIN employee e ON a.employee_id = e.employee_id
JOIN project p ON a.project_id = p.project_id
WHERE e.name = 'Andi'
  AND a.work_date BETWEEN '2025-08-01' AND '2025-08-31'
ORDER BY a.work_date;

-- GET EMPLOYEE TASK 

SELECT
    e.name,
    pd.position_name,
    t.task_name,
    t.status,
    p.project_name
FROM task t
JOIN employee e ON t.employee_id = e.employee_id
JOIN position_detail pd ON e.position_id = pd.position_id
JOIN project p ON t.project_id = p.project_id
ORDER BY e.name;

-- GET PROJECT DAN LIST EMPLOYEE DI DALAMNYA

SELECT
    p.project_name,
    e.name,
    pd.position_name,
    pm.start_date,
    pm.completed_date
FROM project_member pm
JOIN project p ON pm.project_id = p.project_id
JOIN employee e ON pm.employee_id = e.employee_id
JOIN position_detail pd ON e.position_id = pd.position_id
WHERE p.project_name = 'Project A';

-- GET PROJECT EXPENSES

SELECT
    p.project_name,
    SUM(pd.daily_salary) AS total_labor_cost
FROM attendance a
JOIN employee e ON a.employee_id = e.employee_id
JOIN position_detail pd ON e.position_id = pd.position_id
JOIN project p ON a.project_id = p.project_id
WHERE a.status = 'present'
  AND p.project_id = 1
GROUP BY p.project_name;

-- GET PROJECT PROFIT

SELECT
    p.project_name,
    p.revenue
    - (
        COALESCE(labor.total_labor_cost, 0)
        + COALESCE(exp.total_expense, 0)
      ) AS profit
FROM project p
LEFT JOIN (
    SELECT
        project_id,
        SUM(pd.daily_salary) AS total_labor_cost
    FROM attendance a
    JOIN employee e ON a.employee_id = e.employee_id
    JOIN position_detail pd ON e.position_id = pd.position_id
    WHERE a.status = 'present'
    GROUP BY project_id
) labor ON p.project_id = labor.project_id
LEFT JOIN (
    SELECT
        project_id,
        SUM(amount) AS total_expense
    FROM project_expense
    GROUP BY project_id
) exp ON p.project_id = exp.project_id
WHERE p.project_id = 1;
