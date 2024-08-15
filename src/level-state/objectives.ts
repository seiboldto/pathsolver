import { type Objective } from "~src/models";

type ObjectivesState = (Objective & {
  state: "active" | "completed" | "pending";
})[];

type GetObjectiveState = {
  objectives: Objective[];
  activeObjectiveIndex: number;
  objectivesCount: number;
};

export const getObjectivesState = ({
  objectives,
  activeObjectiveIndex,
  objectivesCount,
}: GetObjectiveState): ObjectivesState => {
  const states = Array.from({ length: objectivesCount }, (_, i) => {
    if (i === activeObjectiveIndex) return "active";
    if (i < activeObjectiveIndex) return "completed";
    return "pending";
  });

  return objectives.map((o, i) => ({ ...o, state: states[i] }));
};
