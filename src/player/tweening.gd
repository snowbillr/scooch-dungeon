extends FizzyState

onready var tween = $Tween

func fizzy_enter(data) -> void:
	target.sprite.animation = "move"
	
	tween.interpolate_property(target, "global_position", target.global_position, data["global_destination"], data["duration"])
	tween.start()
	
	target.movement_trail.emitting = true

func fizzy_exit(data) -> void:
	target.movement_trail.emitting = false

func _on_Tween_tween_completed(object, key):
	fsm.transition_to("idle", {})
