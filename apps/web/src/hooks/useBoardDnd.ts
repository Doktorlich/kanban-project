import { ColumnWithTasks, Task } from "@myapp/shared-types";
import {
    closestCorners,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useRef, useState } from "react";
import {
    applyTaskMove,
    buildReorderPayload,
    findColumnByTaskId,
    moveTaskInColumn,
    moveTaskToColumn,
    resolveDropTarget,
} from "@/lib/board-dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { columnKeys } from "@/lib/column";
import { reorderTasks, TaskPayloadReorder } from "@/lib/task";
type ReorderTasksVariables = { payload: TaskPayloadReorder; after: ColumnWithTasks[] };
export default function useBoardDnd(serverColumns: ColumnWithTasks[] | undefined) {
    const [localColumns, setLocalColumns] = useState<ColumnWithTasks[] | null>(null);
    const [prevColumnsData, setPrevColumnsData] = useState<ColumnWithTasks[] | undefined>(undefined);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const columnsBeforeDrag = useRef<ColumnWithTasks[] | null>(null);

    const { workspaceId, boardId } = useParams();
    const columnsKey = columnKeys.list(Number(boardId));
    const queryClient = useQueryClient();

    const reorderTasksMutation = useMutation({
        mutationFn: ({ payload }: ReorderTasksVariables) => reorderTasks(Number(workspaceId), Number(boardId), payload),
        onMutate: async ({ after }: ReorderTasksVariables) => {
            await queryClient.cancelQueries({ queryKey: columnsKey });
            const previous = queryClient.getQueryData<ColumnWithTasks[]>(columnsKey);
            queryClient.setQueryData(columnsKey, after);
            return { previous };
        },
        onError: (_error, _variables, context) => {
            if (context?.previous) {
                queryClient.setQueryData(columnsKey, context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: columnsKey });
        },
    });

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    if (serverColumns !== prevColumnsData) {
        setPrevColumnsData(serverColumns);
        setLocalColumns(serverColumns ?? null);
    }

    function persistReorder(before: ColumnWithTasks[] | null, after: ColumnWithTasks[]) {
        const payload = before ? buildReorderPayload(before, after) : null;
        if (!payload) return;
        reorderTasksMutation.mutate({ payload, after });
    }

    function handleDragEnd({ active, over }: DragEndEvent) {
        setActiveTask(null);
        if (!over || !localColumns) {
            setLocalColumns(columnsBeforeDrag.current);
            return;
        }
        const target = resolveDropTarget(localColumns, over);
        const finalColumns = target ? applyTaskMove(localColumns, Number(active.id), target) : localColumns;
        setLocalColumns(finalColumns);
        persistReorder(columnsBeforeDrag.current, finalColumns);
    }

    function handleDragStart(event: DragStartEvent) {
        const task = localColumns?.flatMap(col => col.tasks).find(t => t.id === event.active.id);
        columnsBeforeDrag.current = localColumns;
        setActiveTask(task ?? null);
    }
    function handleDragCancel() {
        setLocalColumns(columnsBeforeDrag.current);
        setActiveTask(null);
    }
    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over || !localColumns) return;

        const taskId = Number(active.id);
        const source = findColumnByTaskId(localColumns, taskId);
        const target = resolveDropTarget(localColumns, over);
        if (!source || !target || source.id === target.column.id) return;

        setLocalColumns(moveTaskToColumn(localColumns, taskId, target.column.id, target.index));
    }
    const dndContextProps = {
        sensors,
        collisionDetection: closestCorners,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onDragOver: handleDragOver,
        onDragCancel: handleDragCancel,
    };

    return { localColumns, activeTask, dndContextProps, isDragging: activeTask !== null };
}
