extends FizzyState

var speed = 200
var direction = Vector2.ZERO

func fizzy_enter(data) -> void:
    direction = data
    target.sprite.flip_h = direction == Vector2.LEFT

func fizzy_physics_process(delta) -> void:
    target.sprite.animation = "move"
    var collision = target.body.move_and_collide(direction * speed * delta)
    if collision != null:
        fsm.transition_to("idle", null)

