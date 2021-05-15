extends StaticBody2D

enum ROCK_STYLE {
	ONE,
	TWO
}

export(ROCK_STYLE) var rock_style = ROCK_STYLE.ONE

func _ready() -> void:
	$Sprite1.visible = rock_style == ROCK_STYLE.ONE
	$Sprite2.visible = rock_style == ROCK_STYLE.TWO
