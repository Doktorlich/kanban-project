import TaskDetails from "@/components/task/TaskDetails/TaskDetails";
import classes from "./TaskDetailsPage.module.scss";
import TaskPageSocket from "@/components/task/TaskPageSocket/TaskPageSocket";

export default function TaskDetailsPage() {
    return (
        <div className={classes.container}>
            <TaskPageSocket />
            <TaskDetails isModal={false} />
        </div>
    );
}
