import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Input } from "@/components/ui/input";

// components
import WorkoutDetails from "./component/WorkoutDetails";
import WorkoutForm from "./component/WorkoutForm";
import { Button } from "@/components/ui/button";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        count: 0,
    });
    const [count, setCount] = useState(0);

    console.log(pagination);
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_API_URL}/api/workouts?page=${
                    pagination.page
                }&limit=${pagination.limit}`,
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_WORKOUTS", payload: json.workouts });
                setCount(json.count);
            }
        };

        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user, pagination]);
    return (
        <div className="home flex gap-4 justify-between">
            <div className="workouts">
                <div className="pagination">
                    <Input
                        onChange={(e) => {
                            setPagination((p) => {
                                return {
                                    ...p,
                                    limit: e.target.value,
                                };
                            });
                        }}
                    />
                    <Button
                        disabled={pagination.page <= 1}
                        onClick={() =>
                            setPagination((p) => {
                                return {
                                    ...p,
                                    page: p.page - 1,
                                };
                            })
                        }
                    >
                        prev
                    </Button>
                    <Button
                        disabled={pagination.page * pagination.limit >= count}
                        onClick={() =>
                            setPagination((p) => {
                                return {
                                    ...p,
                                    page: p.page + 1,
                                };
                            })
                        }
                    >
                        next
                    </Button>
                </div>
                {workouts && (
                    <div className="flex flex-wrap gap-2">
                        {workouts.map((workout) => (
                            <WorkoutDetails
                                key={workout._id}
                                workout={workout}
                            />
                        ))}
                    </div>
                )}
            </div>
            <WorkoutForm />
        </div>
    );
};

export default Home;
