---
layout: blog.njk
title: lua rich function notation
date: 2024-07-28
tags:
    - post
---

```lua
local myButton = new "TextButton" {
    ["Size"] = UDim2.new(0, 250, 0, 100),
    ["Text"] = "Click me to do something cool",
    ["*MouseButton1Click"] = (function()
        print("Left mouse button clicked!")
    end)
}
```

The above script might look a bit odd for a Lua function. After all, there are no parentheses or commas used in the `new` function, yet somehow both a string and table are being passed as arguments to it.

However, this notation only makes use of vanilla Lua features and runs as expected, with no errors... so how does it work?

This has to do with the fact that in Lua you can actually call a function that takes a string or table *without parentheses*.

Under the hood, two functions are actually being ran; `new` and the function that `new` returns. So the following code block produces identical results to the first:

```lua
local newButton = new "TextButton"

local myButton = newButton {
    ["Size"] = UDim2.new(0, 250, 0, 100),
    ["Text"] = "Click me to do something cool",
    ["*MouseButton1Click"] = (function()
        print("Left mouse button clicked!")
    end)
}
```

The source for the `new.lua` ModuleScript looks a little something like this:

```lua
return function(className)
    return function(properties)
        -- ...
    end
end
```

We can see the definition of the initial function that takes in a `ClassName`, which returns a second function with the properties table as a parameter.

This was a technique I made use of in my [Proton UI library](https://github.com/ayvacs/Proton) to allow for easily human-readable generation of UI instances in the Roblox platform. You can view the full source code of the `new` function [here](https://github.com/ayvacs/Proton/blob/main/src/Proton/modules/new.luau)!