extends FizzyState

func fizzy_enter(data) -> void:
    target.sprite.animation = "idle"
    target.sprite.playing = true
