import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";

import type { RouterOutput, RouterInputs } from "@/utils/api/trpc/api";
import { api } from "@/utils/api/trpc/api";

type ListReturn = RouterOutput["demo"]["list"];
type CreateDemoVariables = RouterInputs["demo"]["list"];

const useDeleteDemoAndUpdateListing = (queryVariables: CreateDemoVariables) => {
    const queryClient = useQueryClient();
    const key = getQueryKey(api.demo.list, queryVariables, "query");

    return api.demo.delete.useMutation({
        onSuccess: (_, variables) => {
            const queryContent =
                queryClient.getQueryData<ListReturn>(key) ?? [];

            if (queryVariables.filters.includeDeleted === true) {
                const entry = queryContent.find(
                    ({ id }) => id === variables.demoId
                );

                if (entry) {
                    entry.deleted_at = new Date().toISOString();
                    queryClient.setQueryData(
                        key,
                        queryContent
                            .filter(({ id }) => id !== variables.demoId)
                            .concat(entry)
                    );
                }
            } else
                queryClient.setQueryData(
                    key,
                    queryContent.filter(({ id }) => id !== variables.demoId)
                );
        }
    });
};

export default useDeleteDemoAndUpdateListing;
