//! Code that can be called through wasm.

use rand_seeder::Seeder;
use wasm_bindgen::prelude::*;

/// Generate a level with a given seed.
#[wasm_bindgen]
pub fn generate_level(seed: &str) {
    let mut _rng: crate::Rng = Seeder::from(seed).make_rng();
}
