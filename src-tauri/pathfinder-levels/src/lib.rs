//! Library crate for generating a pathfinder level.

mod board;
pub mod error;
mod operation;
mod wasm;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

pub(crate) type Rng = rand_seeder::SipRng;

pub use board::Board;
pub use operation::{Operation, OperationKind};
pub use wasm::{generate_level, Difficulty};
