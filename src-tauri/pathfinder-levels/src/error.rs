//! Error Handling

use crate::OperationKind;

/// Errors that can occur while generating a level.
#[derive(thiserror::Error, Debug, PartialEq)]
pub enum Error {
    #[error("Unable to apply operation {kind} to {n1} and {n2}.")]
    InvalidOperation {
        kind: OperationKind,
        n1: i32,
        n2: i32,
    },
    #[error("Division by 1 or resulting in 0 is not allowed in {n1} / {n2}.")]
    InvalidDivisionOperation { n1: i32, n2: i32 },
}

/// Type Alias for `Result<T, [Error]>`
pub type Result<T> = std::result::Result<T, Error>;
