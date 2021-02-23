extends Node

var level_set_runner = LevelSetRunner.new()
onready var main_menu = preload("res://src/MainMenu.tscn").instance()

func _ready() -> void:
    main_menu.connect("level_set_selected", self, "_on_MainMenu_level_set_selected")
    level_set_runner.connect("level_set_completed", self, "_on_LevelSetRunner_level_set_completed")

    add_child(main_menu)

func _on_MainMenu_level_set_selected(level_set_name) -> void:
    var level_set = load("res://data/level_sets/%s.tres" % level_set_name)
    level_set_runner.level_set = level_set

    remove_child(main_menu)

    add_child(level_set_runner)
    level_set_runner.reset()
    level_set_runner.start()

func _on_LevelSetRunner_level_set_completed() -> void:
    remove_child(level_set_runner)
    add_child(main_menu)
