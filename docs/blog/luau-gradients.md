---
layout: blog.njk
title: gradients in tables, Luau's superpower
date: 2025-12-04
tags:
    - post
---



```lua
local gradient = gradient.new(Color3.new(1, 0, 0), Color3.new(0, 0, 1), 10)

print(gradient:at(1))     -- First step (pure red)
print(gradient:lerp(1/2)) -- Midpoint between red and blue
```

The above code creates a smooth 10-step colour gradient between two `Color3` values. What's interesting isn't *what* this code does, but rather how cleanly the API is designed and how it takes advantage of Luau's strengths as an engine.

So let's take a look at how my code works under the hood.

At the core of the module is a small helper lerp function:

```lua
local function lerp(t, r1, g1, b1, r2, g2, b2)
    return Color3.new(
        r1 + (r2 - r1) * t,
        g1 + (g2 - g1) * t,
        b1 + (b2 - b1) * t
    )
end
```

Nothing fancy at all. Just basic linear interpolation between two sets of RGB values at some interval `0 ≤ t ≤ 1`. But combined with a simple for-loop, we can now generate a whole table of evenly spaced steps:

```lua
local function calculateSteps(from: Color3, to: Color3, steps: number)
    local arr = {}

    local r1, g1, b1 = from.R, from.G, from.B
    local r2, g2, b2 = to.R, to.G, to.B

    for i = 0, (steps - 1) do
        local t = i / (steps - 1)
        arr[i + 1] = lerp(t, r1, g1, b1, r2, g2, b2)
    end
    
    return arr
end
```

This is essentially the "pre-baked" form of the gradient, an array of colours ready to be fetched, animated, iterated over, or applied to UI elements or 3D objects.

Where things really get interesting though is in the constructor.

```lua
gradient.new = function(from: Color3, to: Color3, steps: number)
    -- ...

    local steps = calculateSteps(from, to, steps)

    return {
        at = function(self, t: number)
            return steps[t]
        end,

        lerp = function(self, t: number)
            t = math.clamp(t, 0, 1)
            return lerp(t, from.R, from.G, from.B, to.R, to.G, to.B)
        end,

        all = function(self)
            return table.clone(steps)
        end,

        iter = function(self)
            local i = 0
            return function()
                i += 1
                return steps[i]
            end
        end
    }
end
```

This isn't a traditional "class", just a table containing functions, and this is one of the great things about Luau: you can build extremely lightweight, ergonomic APIs that run exactly like classes but are, at their core, literally just tables with methods attached.

This gradient object offers everything classes could, like:

```lua
local colour = gradient:at(3)
```

Readable and intuitive: give me the colour at step 3.

```lua
local smooth = gradient:lerp(1/3)
```

Instead of being limited to discrete steps, you can request colours at any point between the start and end colours. This is also readable and intuitive: give me the colour a third of the way through the gradient. Perfect for animations and dynamic UI transitions.

```lua
for colour in gradient:iter() do
    print(colour)
end
```

Sometimes all you need is a lightweight iterator. No `ipairs` or indexing, just a clean and sequential walk through the gradient.

This stype of API (small helper functions, wrapped in neat readable interfaces) are what I believe Luau's superpower is. Just like expressive function-call notations from my previous blog post, __a well-designed object can make your code both clear and pleasant to work with__. Everything here is written in plain Luau with no magic involved. Just tables!

If you're interested, the full source code for my gradient library is available [on GitHub](https://github.com/ayvacs/gradient).