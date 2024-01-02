import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { useWorkoutsContext } from "../../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

function EditWorkoutButton({ workout }) {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState(workout.title);
    const [load, setLoad] = useState(workout.load);
    const [reps, setReps] = useState(workout.reps);

    // const [error, setError] = useState(null);
    // const [emptyFields, setEmptyFields] = useState([]);

    const editWorkout = async () => {
        if (!user) {
            return;
        }
        const data = { title, load, reps, _id: workout._id };
        const response = await fetch(
            `${import.meta.env.VITE_REACT_API_URL}/api/workouts/${workout._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(data),
            }
        );
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: "EDIT_WORKOUT", payload: data });
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger className="w-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Workout</DialogTitle>
                        <DialogDescription>
                            Make changes to your workout here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Excersize Title
                            </Label>
                            <Input
                                value={title}
                                id="title"
                                className="col-span-3"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="items-center gap-4 flex">
                            <div>
                                <Label htmlFor="load" className="text-right">
                                    Load (in kg)
                                </Label>
                                <Input
                                    value={load}
                                    id="load"
                                    className="col-span-3"
                                    onChange={(e) => setLoad(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="reps" className="text-right">
                                    Reps
                                </Label>
                                <Input
                                    value={reps}
                                    id="reps"
                                    className="col-span-3"
                                    onChange={(e) => setReps(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose variant="secondary" onClick={editWorkout}>
                            Save changes
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditWorkoutButton;
