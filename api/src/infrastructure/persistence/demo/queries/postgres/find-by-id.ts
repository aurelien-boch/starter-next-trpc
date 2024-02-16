const findByIdQuery = `
    select
        id,
        title,
        created_at,
        updated_at,
        deleted_at
      from
          demo
     where
         id = $1
`;

export default findByIdQuery;
