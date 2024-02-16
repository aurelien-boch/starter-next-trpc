const saveQuery = `
    insert into
        demo
        (
            id,
            title,
            created_at,
            updated_at,
            deleted_at
        )
    values
        (
            $1,
            $2,
            $3,
            $4,
            $5
        )
        on conflict (id) do update set
            (title, updated_at, deleted_at) = ($2, $4, $5);
`;

export default saveQuery;
