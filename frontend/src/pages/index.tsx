import type { NextPage } from "next";
import { Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useI18nContext } from "@/locales/i18n-react";
import { api } from "@/utils/api/trpc/api";
import useCreateDemoAndUpdateListing from "@/utils/api/trpc/hooks/use-create-demo-and-update-listing";
import useDeleteDemoAndUpdateListing from "@/utils/api/trpc/hooks/use-delete-demo-and-update-listing";

const Showcase: NextPage = () => {
    const [includeDeleted, setIncludeDeleted] = useState(false);
    const { LL } = useI18nContext();
    const { data, isLoading } = api.demo.list.useQuery({ filters: { includeDeleted } });
    const { mutate } = useCreateDemoAndUpdateListing({ filters: { includeDeleted } });
    const { mutate: deleteDemo } = useDeleteDemoAndUpdateListing({ filters: { includeDeleted } });

    return (
        <>
            <Typography>{LL.hello()}</Typography>
            {isLoading && <Typography>Loading...</Typography>}
            {data && data.map((item, index) => (
                <Typography
                    key={item.id}
                    onClick={() => {
                        if (!item.deletedAt)
                            deleteDemo({ demoId: item.id });
                    }}
                >{index}. {JSON.stringify(item)}</Typography>
            ))}
            <FormControlLabel
                control={
                    <Checkbox
                        checked={includeDeleted}
                        onChange={(e) => {
                            setIncludeDeleted(e.target.checked);
                        }}
                        name="includeDeleted"
                        color="primary"
                    />
                }
                label={"Include deleted"}
            />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const name = e.target["name"].value;

                    mutate({ title: name });
                }}
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    id={"name"}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    {LL.actions.create()}
                </Button>
            </form>
        </>
    );
};

export default Showcase;
