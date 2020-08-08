CREATE TYPE user_role AS enum
('admin', 'customer', 'vendor');

CREATE TABLE users
(
    id uuid DEFAULT uuid_generate_v4 (),
    name VARCHAR NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL,
    pending VARCHAR(5),
    created_at TIMESTAMP
    with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY
    (id)
)

    insert into users
        (name,email,password,phone,role,pending)
    values
        ('segun', 'segun@mail.com', '34gy3', '3629862', 'admin', 'true')