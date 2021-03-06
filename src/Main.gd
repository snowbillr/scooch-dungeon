extends Node

onready var world: Node2D = $World
onready var transition: BaseTransition = $World/FadeTransition
onready var main_menu = $World/MainMenu

var current_level

func _ready() -> void:
	main_menu.connect("level_selected", self, "_on_MainMenu_level_selected")

func _on_MainMenu_level_selected(level_identifier) -> void:
	current_level = load("res://src/levels/%s.tscn" % level_identifier).instance()
	current_level.connect("level_completed", self, "_on_Level_completed")

	transition.begin()
	yield(transition, "at_midpoint")

	world.add_child(current_level)
	world.remove_child(main_menu)

	transition.finish()

func _on_Level_completed() -> void:
	transition.begin()
	yield(transition, "at_midpoint")

	current_level.queue_free()
	world.remove_child(current_level)

	world.add_child(main_menu)

	transition.finish()
