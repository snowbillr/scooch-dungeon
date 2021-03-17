extends Node

onready var main_menu = preload("res://src/MainMenu.tscn").instance()

var current_level

func _ready() -> void:
    main_menu.connect("level_selected", self, "_on_MainMenu_level_selected")

    add_child(main_menu)

func _on_MainMenu_level_selected(level_set_name) -> void:
    current_level = load("res://src/levels/BaseLevel.tscn").instance()
    current_level.connect("level_completed", self, "_on_Level_completed")

    add_child(current_level)
    remove_child(main_menu)

func _on_Level_completed() -> void:
    current_level.queue_free()
    remove_child(current_level)

    add_child(main_menu)
