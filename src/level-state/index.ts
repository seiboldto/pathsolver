import {
  getEdgeBetweenCoords,
  getEdgeNodeCoords,
  getEdgeState,
  removeTrailingEdges,
} from "./edges";
import { getGameState } from "./game";
import { getHint } from "./hints";
import { canNodeBeSelected, getNodeState, removeSelectedNodes } from "./nodes";
import { getObjectivesState } from "./objectives";
import {
  applySelectedNode,
  applySelectedNodes,
  canSelectionBeApplied,
  getSelectionState,
} from "./selection";
import { getStreakState, updateStats } from "./stats";
import { getTutorialState } from "./tutorial";

export function createLevelFunc<
  F extends (params: Parameters<F>[0]) => ReturnType<F>,
  K extends keyof Parameters<F>[0],
  P extends Omit<Parameters<F>[0], K>
>(
  func: F,
  staticParams: Pick<Parameters<F>[0], K>
): (params: P) => ReturnType<F> {
  return (params: P) => func({ ...staticParams, ...params });
}

export const levelState = {
  getObjectivesState,
  getGameState,
  getEdgeState,
  getNodeState,
  getSelectionState,
  getTutorialState,
};

export const levelHelpers = {
  canNodeBeSelected,
  canSelectionBeApplied,
  getEdgeNodeCoords,
  getEdgeBetweenCoords,
  removeTrailingEdges,
  removeSelectedNodes,
};

export const levelAppliers = {
  applySelectedNode,
  applySelectedNodes,
};

export const statsHelpers = {
  getStreakState,
  updateStats,
};

export const hintHelpers = {
  getHint,
};
