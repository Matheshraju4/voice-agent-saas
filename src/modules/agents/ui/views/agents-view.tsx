"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import EmptyState from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data, isLoading, error } = useQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  if (isLoading)
    return (
      <LoadingState
        title="Loading Agents"
        description="This may take a few seconds"
      />
    );
  if (error)
    return (
      <ErrorState
        title="Error Loading Agents"
        description="Please try again later"
      />
    );

  return (
    <div className=" pb-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data?.totalPages || 0}
        onPageChange={(page) => setFilters({ page })}
      />
      {data?.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meeting. Each agent will follow your instructions and can Interact with participants in the meeting."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Please try again later"
    />
  );
};
