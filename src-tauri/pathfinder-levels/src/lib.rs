//! Library crate for generating a pathfinder level.

pub mod error;
mod operation;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

pub use operation::{Operation, OperationKind};
