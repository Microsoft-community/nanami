![1x-badge](https://img.shields.io/github/stars/cutenode/1x.engineer.svg?color=purple&label=1x%20Engineers&logo=image%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADAElEQVRoQ%2B1YPZMNQRQ9RyYiUCVkI0J%2BASUi4xfYzYjsVsmXX2BFZFauigyJ4hcQEtkNVQmoEjvqqh7VM6%2B%2FZ%2BapqXodvtdz%2B56%2B59zT3cTCBxeePzYA%2FncFNxUoqYCkEwC2AbwjeVTyTemctVRA0iUAH11SxwBekLxfmmRq3roA3AHwxEvkLcnrSwJwCOC2l%2FBDkg%2BWBOAzgAtewjdIvlkEAElnAHwDYEK28RvAWZLflwLAuP7aS%2FYLyYtTJG8xZhexJOP6vpfwc5LWUicZ6wDwHsAVL9u7JJ9Okv2YCki6SfJVKhFnYL8AnPTmXSb5yf%2BuJFZsnaYKSHoEYBfAIcmdWPCBgdk0E64J2IT8d0h65lz6gORebWWqAEg6DeAlgKveQjskrc%2BvDElJA5NkWjAA3TC63SL5oxRIMQC3m5b8%2BUHwn%2FZbaFFJUQNzm2HnolODePabgejRbBSF3E4ZbawC%2FrBzjWkhuJikpIG5TTEdnRvEtQrsxSrrz81WwOP7cBM%2BuOSD5S41MFcJA%2BF3qm6trC6iACJ87wI%2FJmkijg5JVQYm6QDAvUDApC6CADJ83y0pbYuBOaoakGJdrACwnuw6QxXfhzsnqcnAMrqwjtfznhCAr4FOk%2BR7IHk7uGUNLMa%2FhC6OSG4lRSzJ2tiwK1T15xIDy%2Bgn5Df2yTHJXhuPUcj6dzEPAxVovoFl9LedpZAlM7Y%2Fpwwss%2FPmzFV%2Bk2ujTf05Z2AhEK1%2BU2JkVf251MA6EGP9JgvAUcpKW9SfawxsCr8pAlCgi63uMFdqYG7nrWWP8ptiAA6ELTbURe84XWNggeN0ld9YTlUAPN52uujdb0tvYL6IvY6VPV%2BFxN8EwFVj5UrZamBrv1ImjgDNBpbyh9R%2FzRWI9PLZnhBjIKYGMNsT4uwAag2slTLD7yarQI2BTZV8cxuN8H%2FWJ8R1UKjpBja2GlNSyMzNrqPdZWjlCXFsspMaWcIL7MZ0zT07%2FntCnCP5STUwV4K5uJNRKLfQXP9vAMy1s6VxF1%2BBPxWSokDSvlDHAAAAAElFTkSuQmCC&style=for-the-badge&link=https://1x.engineer&link=https://github.com/cutenode/1x.engineer/stargazers)

# Nanami

A Discord bot for the [Microsoft Community](https://discord.gg/microsoft) server that does.. a bunch of stuff. Modularly!

# Setup

Use ``sudo`` on the global install commands where necessary.

```
npm install -g typescript@next rimraf npm-run-all
npm install
npm start
```

# Requesting a feature

Open an issue in the [issues](https://github.com/wisnoi/nanami/issues) tab. 

# Voice Channel Helper

This bot comes with a module named [Voice Channel Helper](src/Modules/VoiceChannelHelper.ts). If you wish to create modules, you can use it as an example! 
It has a [database file](db) with the following schema:

```
CREATE TABLE channels (
    voice_id TEXT PRIMARY KEY,
    text_id TEXT NOT NULL,
    set_to_purge INTEGER NOT NULL
);
```

As well as configuration options in the [config](config.json.example).

The given database is currently set up to work with a private development server, so make sure you overwrite the entries with applicable entries for your own servers! :)

# Creating a Module

It's pretty messy, at the moment.

To create a module you need to:

Create a class that extends [Module](src/Structures/Classes/Module.ts) in [the Modules directory](src/Modules/).  
Then, export an interface with your module configuration options.  
Add this configuration interface to the [Config](src/Structures/Interfaces/Config.ts) structure.  
Update the config.json with a new object containing your module configuration options.  
Push your module to the Module Collection in the [initializeModule](src/Helpers/initializeModule.ts) helper.   

You're done!
