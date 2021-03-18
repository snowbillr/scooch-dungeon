extends Node

onready var world: Node2D = $World
onready var transition: BaseTransition = $World/FadeTransition
onready var main_menu = preload("res://src/MainMenu.tscn").instance()

var current_level

func _ready() -> void:
    main_menu.connect("level_selected", self, "_on_MainMenu_level_selected")

    world.add_child(main_menu)

func _on_MainMenu_level_selected(level_set_name) -> void:
    current_level = load("res://src/levels/BaseLevel.tscn").instance()
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
