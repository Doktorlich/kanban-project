import TaskDetails from "@/components/task/TaskDetails/TaskDetails";
import classes from "./TaskDetailsPage.module.scss";

export default function TaskDetailsPage() {
    return (
        <div className={classes.container}>
            <TaskDetails isModal={false} />
        </div>
    );
}
