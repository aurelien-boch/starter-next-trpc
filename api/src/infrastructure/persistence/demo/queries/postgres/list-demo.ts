const listDemoQuery = `
    select
        id,
        title,
        created_at,
        updated_at,
        deleted_at
      from
          demo
     where
         deleted_at is null
`;

export default listDemoQuery;
