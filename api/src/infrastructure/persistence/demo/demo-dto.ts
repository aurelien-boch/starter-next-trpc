import { Demo } from "../../../domain/demo/demo";
import { DemoId } from "../../../domain/demo/demo-id";

export type DemoDto = {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export const hydrateDemo = (dto: DemoDto): Demo =>
    new Demo(
        dto.title,
        new DemoId(dto.id),
        new Date(dto.created_at),
        new Date(dto.updated_at),
        dto.deleted_at ? new Date(dto.deleted_at) : null
    );

export const dehydrateDemo = (demo: Demo): DemoDto => ({
    id: demo.id().value,
    title: demo.title(),
    created_at: demo.createdAt().toISOString(),
    updated_at: demo.updatedAt().toISOString(),
    deleted_at: demo.deletedAt()?.toISOString() || null
});
