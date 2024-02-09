import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import type { DemoDto } from "api/src/infrastructure/persistence/demo/demo-dto";

import type { RouterInputs, RouterOutput } from "@/utils/api/trpc/api";
import { api } from "@/utils/api/trpc/api";


type ListReturn = RouterOutput["demo"]["list"];
type CreateDemoVariables = RouterInputs["demo"]["list"];

const useCreateDemoAndUpdateListing = (variables: CreateDemoVariables) => {
    const queryClient = useQueryClient();
    const key = getQueryKey(api.demo.list, variables, "query");

    return api.demo.create.useMutation({
        onSuccess: (data, variables) => {
            const queryContent = queryClient.getQueryData<ListReturn>(key);
            const newEntry: DemoDto = {
                id: data,
                title: variables.title,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null
            };

            queryClient.setQueryData(key, [...queryContent ?? [], newEntry]);
        }
    });
};

export default useCreateDemoAndUpdateListing;
