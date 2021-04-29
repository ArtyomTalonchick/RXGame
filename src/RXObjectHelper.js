export const isCollision = (_object, object, move) => {
    object.position.x - object.size.x + move.x < _object.position.x - _object.size.x
}