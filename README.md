# Guava HubSpot Theme


## Utilities

### Carousel
The carousel utility can be used to provide a module a consistent.

*Usage*
1. Within `meta.json`, include `css/carousel.css` & `js/carousel.js`
2. Within `module.html`, include the following code. 
```
{% from "../../macros/carousel.html" import carousel %}
```
3. Where you wish the carousel to appear, call the macro with the items array & an additional macro that renders an individual slide. 
```
{{ carousel(items, render) }}
```