extends FizzyState

var speed = 200
var direction = Vector2.ZERO

func fizzy_enter(data) -> void:
    direction = data
    if direction == Vector2.LEFT:
        target.sprite.flip_h = true
    elif direction == Vector2.RIGHT:
        target.sprite.flip_h = false

    if abs(direction.y) > 0:
        target.movement_collision_shape.shape.extents = Vector2(1, 16)
    if abs(direction.x) > 0:
        target.movement_collision_shape.shape.extents = Vector2(16, 1)

func fizzy_physics_process(delta) -> void:
    target.sprite.animation = "move"
    var collision = target.move_and_collide(direction * speed * delta)
    if collision != null:
        fsm.transition_to("idle", {})

