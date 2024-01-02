import { useWorkoutsContext } from "../../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import DeleteWorkoutButton from "./DeleteWorkoutButton";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import EditWorkoutButton from "./EditWorkoutButton";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const deleteWorkout = async () => {
        if (!user) {
            return;
        }

        const response = await fetch(
            `${import.meta.env.VITE_REACT_API_URL}/api/workouts/${workout._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: json });
        }
    };

    return (
        <div className="p-2 bg-white border-2 max-w-[300px] rounded">
            <div className="flex gap-4 items-center justify-between">
                <h4 className="text-xl font-bold text-blue-600">
                    {workout.title}
                </h4>
                <div className="flex gap-4 items-center">
                    <DeleteWorkoutButton deleteWorkout={deleteWorkout} />
                    <EditWorkoutButton workout={workout} user={user} />
                </div>
            </div>
            <p>
                <strong>Load (kg): </strong>
                {workout.load}
            </p>
            <p>
                <strong>Reps: </strong>
                {workout.reps}
            </p>
            <p>
                {formatDistanceToNow(new Date(workout.createdAt), {
                    addSuffix: true,
                })}
            </p>
        </div>
    );
};

export default WorkoutDetails;
