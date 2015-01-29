
- ModuleData
- ModuleFileWatcher
- ModuleService

- EventAggregator

1. file removed -> remove from files list
2. file added -> add to file list
3. file changed

1, 2, 3 => file watcher -> run tests -> emit event module changed

