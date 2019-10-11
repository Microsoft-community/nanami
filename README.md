# Nanami

A Discord bot for the [Microsoft Community](https://discord.gg/microsoft) server that does.. a bunch of stuff. Modularly!

# Requesting a feature

Open an issue in the [issues](https://github.com/wisnoi/nanami/issues) tab. 

# Voice Channel Helper

This bot comes with a module named [Voice Channel Helper](src/Modules/VoiceChannelHelper.ts). If you wish to create modules, you can use it as an example! 
It has a [database file](db) with the following schema:

```
CREATE TABLE channels (
    voice_id TEXT PRIMARY KEY,
    channel_id TEXT NOT NULL,
    set_to_purge INTEGER NOT NULL
);
```

As well as configuration options in the [config](config.json.example).

# Creating a Module

It's pretty messy, at the moment.

To create a module you need to:

Create a class that extends [Module](src/Structures/Classes/Module.ts) in [the Modules directory](src/Modules/).  
Then, export an interface with your module configuration options.  
Add this configuration interface to the [Config](src/Structures/Interfaces/Config.ts) structure.  
Update the config.json with a new object containing your module configuration options.  
Push your module to the Module Collection in the [initializeModule](src/Helpers/initializeModule.ts) helper.   

You're done!