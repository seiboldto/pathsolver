use crate::{Operation, OperationKind};
use rand_seeder::Seeder;
use wasm_bindgen::prelude::*;

/// Generate a level with a given seed.
#[wasm_bindgen]
pub fn generate_level(seed: &str, difficulty: Difficulty) {
    let mut _rng: crate::Rng = Seeder::from(seed).make_rng();
}

/// Defines the difficulty of a level.
///
/// To create a custom difficulty, use [Difficulty::new].
/// Otherwise, you can use a predefined preset.
///
/// | ID      | Board Size | Possible Operations |
/// |---------|------------|---------------------|
/// | Normal  | 3          | + -                 |
/// | Hard    | 3          | + - *               |
/// | Extreme | 4          | + - * /             |
#[wasm_bindgen]
pub struct Difficulty {
    pub(crate) board_size: usize,
    pub(crate) possible_operations: Vec<Operation>,
}

#[wasm_bindgen]
impl Difficulty {
    /// Create a difficulty with the given settings.
    #[wasm_bindgen]
    pub fn new(board_size: usize, possible_operations: Vec<OperationKind>) -> Self {
        Self {
            board_size,
            possible_operations: possible_operations
                .iter()
                .map(|op| Operation::new(*op))
                .collect(),
        }
    }

    /// Preset normal difficulty.
    #[wasm_bindgen]
    pub fn normal() -> Self {
        Self::new(3, vec![OperationKind::Addition, OperationKind::Subtraction])
    }

    /// Preset hard difficulty.
    #[wasm_bindgen]
    pub fn hard() -> Self {
        Self::new(
            3,
            vec![
                OperationKind::Addition,
                OperationKind::Subtraction,
                OperationKind::Multiplication,
            ],
        )
    }

    /// Preset extreme difficulty.
    #[wasm_bindgen]
    pub fn extreme() -> Self {
        Self::new(
            4,
            vec![
                OperationKind::Addition,
                OperationKind::Subtraction,
                OperationKind::Multiplication,
                OperationKind::Division,
            ],
        )
    }
}
