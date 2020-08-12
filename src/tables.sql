-- Where i write out my queries to test 

CREATE TYPE user_role AS enum
('admin', 'customer', 'vendor');

CREATE TYPE boolean AS enum
('true', 'false');

CREATE TABLE users
(
    id uuid DEFAULT uuid_generate_v4 () primary key,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    pending boolean NOT NULL,
    phone VARCHAR(255),
    role user_role NOT NULL,
    business_name VARCHAR(255) UNIQUE,
    business_name_slug VARCHAR(255) UNIQUE,
    business_address VARCHAR(255),
    business_area VARCHAR(255) default 'everywhere',
    business_image VARCHAR(255),
    business_bio VARCHAR(255),
    customer_address VARCHAR(255),
    created_at TIMESTAMP
    with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,

)

    insert into users
        (name,email,password,phone,role,pending)
    values
        ('segun', 'segun@mail.com', '34gy3', '3629862', 'customer', 'false')


    CREATE TABLE products
    (
        id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        name_slug VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        price int NOT NULL,
        category VARCHAR(255),
        image VARCHAR(255),
        in_stock boolean DEFAULT 'true',
        creator_id references users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
        created_at TIMESTAMP
        with time zone DEFAULT CURRENT_TIMESTAMP, 
)


        CREATE TABLE customer_profile
        (
            id uuid DEFAULT uuid_generate_v4 () NOT NULL,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            creator_id int references users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
            created_at TIMESTAMP
            with time zone DEFAULT CURRENT_TIMESTAMP,
    
)