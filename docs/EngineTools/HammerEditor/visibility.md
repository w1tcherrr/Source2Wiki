# Visibility

Also known as "VIS", visibility is a vital part of map optimization as it determines what should and shouldn't be rendered.
:::note
Precomputed visibility costs map compile time. For rapid iteration and development, you can turn off VIS compilation by setting the "Precomputed Visibility" property in "Map Properties" to "Disabled."
:::
In Source 2, the resource compiler uses an inside/outside algorithm to calculate VIS and determine what's "inside" the map. This means that anything inside will render, and anything outside won't.


## Leaks
Although Source 2 doesn't leak in the same way that Source 1 did, VIS can still leak through "holes" in your map. This means that the VIS calculation will spill out into the void, creating unnecessary VIS clusters and LOS. Typically, this means forgetting to place a skybox material or solid blocklight, leaving a gap in world geometry.


## VIS Contributors
By default, all meshes are VIS contributors, which can be disabled by selecting "Exclude from VIS". Static props are the inverse, and you can set them as VIS contributors by marking the "Vis Occluder" property.

### Tool textures that contribute to VIS
Some tools materials contribute to your map's VIS. These include:
* visblocker
* toolsskybox
* toolsnodraw (all variations)
* toolssolidblocklight

## Debugging VIS
There are a few console commands that can help debug the compiled VIS in your map.
* vis_enable 0/1		|		Toggle the visibility system.
* vis_debug_show		|		This will show the compiled VIS clusters in your map; it's an in-game representation of "Load Compiled Vis Data" in Hammer
* vis_debug_lock		|		Locks the VIS to the current state when you sent the command.


## VIS in Hammer
Use the Visibility contributors view to toggle geometry that doesn't contribute to VIS. This view is very helpful for spotting leaks, alongside the "Load Compiled Vis Data" option.


:::todo
* Best practices/common mistakes
* note any disparity between VIS2 and VIS3
* add accompanying pictures.
* VIS entities like visibility_hint and info_cull_triangles
:::
