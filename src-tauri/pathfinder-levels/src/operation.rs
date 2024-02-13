use strum::Display;

use crate::error::{Error, Result};

/// Operation which can be used to combine two numbers and produce a third one.
#[derive(Debug)]
pub struct Operation {
    kind: OperationKind,
}

/// Available operations to apply.
///
/// Note that all operations should have an [arity](https://en.wikipedia.org/wiki/Arity) of two.
#[derive(Debug, Display, Copy, Clone, PartialEq, Eq)]
pub enum OperationKind {
    Addition,
    Subtraction,
    Multiplication,
    Division,
}

impl Operation {
    /// Create a new operation of the given kind.
    pub fn new(kind: OperationKind) -> Self {
        Self { kind }
    }

    /// Apply an operation to two numbers.
    ///
    /// For all non-commutative operations, order matters.
    pub fn apply(&self, n1: i32, n2: i32) -> Result<i32> {
        let result = match self.kind {
            OperationKind::Addition => n1.checked_add(n2),
            OperationKind::Subtraction => n1.checked_sub(n2),
            OperationKind::Multiplication => n1.checked_mul(n2),
            OperationKind::Division => n1.checked_div(n2),
        };

        let Some(result) = result else {
            return Err(Error::InvalidOperation {
                kind: self.kind,
                n1,
                n2,
            });
        };

        if self.kind == OperationKind::Division && (result == 0 || n2 == 1) {
            return Err(Error::InvalidDivisionOperation { n1, n2 });
        }

        Ok(result)
    }
}

#[cfg(test)]
mod tests {
    use test_case::test_case;

    use crate::{error::Error, Operation, OperationKind};

    #[test]
    fn it_errors_on_overflow() {
        let op = Operation::new(OperationKind::Addition);
        let result = op.apply(i32::MAX, 1);
        assert_eq!(
            result,
            Err(Error::InvalidOperation {
                kind: OperationKind::Addition,
                n1: i32::MAX,
                n2: 1
            })
        );
    }

    #[test]
    fn it_errors_on_division_by_1() {
        let op = Operation::new(OperationKind::Division);
        let result = op.apply(5, 1);
        assert_eq!(
            result,
            Err(Error::InvalidDivisionOperation { n1: 5, n2: 1 })
        );
    }

    #[test]
    fn it_errors_on_division_returing_less_than_one() {
        let op = Operation::new(OperationKind::Division);
        let result = op.apply(1, 5);
        assert_eq!(
            result,
            Err(Error::InvalidDivisionOperation { n1: 1, n2: 5 })
        );
    }

    #[test_case(OperationKind::Addition, 5, 1, 6 ; "addition")]
    #[test_case(OperationKind::Subtraction, 5, 1, 4 ; "subtraction")]
    #[test_case(OperationKind::Multiplication, 5, 2, 10 ; "multiplication")]
    #[test_case(OperationKind::Division, 5, 2, 2 ; "division")]
    fn it_applies_operation_correctly(kind: OperationKind, n1: i32, n2: i32, expected: i32) {
        let op = Operation::new(kind);
        let result = op.apply(n1, n2);
        assert_eq!(result, Ok(expected));
    }
}
