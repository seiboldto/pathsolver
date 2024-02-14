use pathfinder_levels::{generate_level, Difficulty};

#[test]
fn it_generates_levels() {
    let difficulty = Difficulty::new(3, Vec::new());
    generate_level("seed", difficulty);
}
