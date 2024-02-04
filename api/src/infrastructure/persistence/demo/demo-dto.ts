import { Demo } from "../../../domain/demo/demo";
import { DemoId } from "../../../domain/demo/demo-id";

export type DemoDto = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export const hydrateDemo = (dto: DemoDto): Demo =>
    new Demo(
        dto.title,
        new DemoId(dto.id),
        new Date(dto.createdAt),
        new Date(dto.updatedAt),
        dto.deletedAt ? new Date(dto.deletedAt) : null
    );


export const dehydrateDemo = (demo: Demo): DemoDto => ({
    id: demo.id().value,
    title: demo.title(),
    createdAt: demo.createdAt().toISOString(),
    updatedAt: demo.updatedAt().toISOString(),
    deletedAt: demo.deletedAt()?.toISOString() || null
});
