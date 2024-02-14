use wasm_bindgen::prelude::*;

use crate::{Difficulty, OperationKind};

///
#[wasm_bindgen(getter_with_clone)]
pub struct Board {
    /// Size of the board.
    pub size: usize,
    /// Nodes of the board, arranged from top left to bottom right.
    pub nodes: Vec<i32>,
    /// Edges of the board.
    ///
    /// To get the index of an edge between two nodes, use [Board::index_of_edge].
    pub edges: Vec<OperationKind>,
}

#[wasm_bindgen]
impl Board {
    pub(crate) fn new(difficulty: Difficulty, rng: crate::Rng) -> Self {
        Board {
            size: difficulty.board_size,
            nodes: Vec::new(),
            edges: Vec::new(),
        }
    }

    pub(crate) fn index_of_edge(&self, n1: usize, n2: usize) -> usize {
        let lower = n1.min(n2);
        if n1.abs_diff(n2) == 1 {
            let row = n1 / self.size;
            return row * (self.size - 1) + (lower - row * self.size);
        }

        let vertical_difference = self.size.pow(2) - self.size;
        lower + vertical_difference
    }
}

#[cfg(test)]
mod test {
    use test_case::test_case;

    use crate::{Board, Difficulty};
    use rand_seeder::Seeder;

    #[test_case((0, 1), 0)]
    #[test_case((1, 2), 1)]
    #[test_case((3, 4), 2)]
    #[test_case((4, 5), 3)]
    #[test_case((6, 7), 4)]
    #[test_case((7, 8), 5)]
    fn horizontal_edge((n1, n2): (usize, usize), expected_edge: usize) {
        let board = Board::new(Difficulty::normal(), Seeder::from("").make_rng());

        assert_eq!(board.index_of_edge(n1, n2), expected_edge);
        assert_eq!(board.index_of_edge(n2, n1), expected_edge);
    }

    #[test_case((0, 3), 6)]
    #[test_case((1, 4), 7)]
    #[test_case((2, 5), 8)]
    #[test_case((3, 6), 9)]
    #[test_case((4, 7), 10)]
    #[test_case((5, 8), 11)]
    fn vertical_edge((n1, n2): (usize, usize), expected_edge: usize) {
        let board = Board::new(Difficulty::normal(), Seeder::from("").make_rng());
        assert_eq!(board.index_of_edge(n1, n2), expected_edge);
        assert_eq!(board.index_of_edge(n2, n1), expected_edge);
    }
}
