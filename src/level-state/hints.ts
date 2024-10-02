import type { Edge, Hint, Objective } from "~src/models";

import { levelHelpers } from ".";

type GetHint = {
  objective: Objective;
  edges: Edge[];
};

export const getHint = ({ objective, edges }: GetHint): Hint => {
  const pathLength = objective.path.length;
  const edgeCount = pathLength - 1;
  const edgeIndex = ((objective.value % edgeCount) + edgeCount) % edgeCount;

  const n1 = objective.path[edgeIndex];
  const n2 = objective.path[edgeIndex + 1];

  const highlightedEdge = levelHelpers.getEdgeBetweenCoords({
    edges,
    c1: n1,
    c2: n2,
  });

  return {
    objectiveIndex: objective.index,
    pathLength,
    highlightedEdgeID: highlightedEdge.id,
  };
};
