-- Where i write out my queries to test 

CREATE TYPE user_role AS enum
('admin', 'customer', 'vendor');

CREATE TYPE pending_status AS enum
('true', 'false');

CREATE TABLE users
(
    id uuid DEFAULT uuid_generate_v4 (),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    role user_role NOT NULL,
    pending pending_status NOT NULL,
    created_at TIMESTAMP
    with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY
    (id)
)

    insert into users
        (name,email,password,phone,role,pending)
    values
        ('segun', 'segun@mail.com', '34gy3', '3629862', 'customer', 'false')