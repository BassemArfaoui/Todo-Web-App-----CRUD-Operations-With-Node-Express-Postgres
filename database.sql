create table items
(
    id serial not null primary key ,
    title varchar(255) ,
    unique (title)

);

insert into items (title) 
values  ('item1'),
        ('item2'), 
        ('item3');