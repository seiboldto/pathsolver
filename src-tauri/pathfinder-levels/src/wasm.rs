use crate::{Operation, OperationKind};
use rand_seeder::Seeder;
use wasm_bindgen::prelude::*;

/// Generate a level with a given seed.
#[wasm_bindgen]
pub fn generate_level(seed: &str, difficulty: Difficulty) {
    let mut _rng: crate::Rng = Seeder::from(seed).make_rng();
}

/// Defines the difficulty of a level.
#[wasm_bindgen]
pub struct Difficulty {
    board_size: u8,
    possible_operations: Vec<Operation>,
}

#[wasm_bindgen]
impl Difficulty {
    /// Create a difficulty with the given settings.
    #[wasm_bindgen(constructor)]
    pub fn new(board_size: u8, possible_operations: Vec<OperationKind>) -> Self {
        Self {
            board_size,
            possible_operations: possible_operations
                .iter()
                .map(|op| Operation::new(*op))
                .collect(),
        }
    }
}
