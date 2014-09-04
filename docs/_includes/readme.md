
## Theme Editor Options

There are options that can be provided when a ThemeEditor instance is created and are as follows:

### Misc

Miscellaneous Options

| Field   | Type     | Default            | Desc                                       |
| -----   |:--------:| ------------------ | ------------------------------------------ |
| delay   | `number` | 750 (milliseconds) | Milliseconds delay between refresh updates |

### Theme

Location to find the theme file to start editing (If editing existing theme).

| Field | Type     | Default | Desc                         |
| ----- |:--------:| ------- | ---------------------------- |
| url   | `string` |         | URL to locate the theme file |


### Export

An export object can be provided to control the exporting options.

| Field  | Type     | Default | Desc                                                           |
| ------ |:--------:| ------- | -------------------------------------------------------------- |
| target | `string` | 'body'  | Optional General DOM Element target, to append Export links to |

### Export Json

The export.json object can be provided to configure the options for Downloading the theme modifications in JSON format.  
The DOM node to append the export as json link, the id and the text of the link can be customised.

| Field  | Type     | Default              | Desc                                          |
| ------ |:--------:| -------------------- | --------------------------------------------- |
| target | `string` | export.target        | DOM Element target to append json Export link |
| id     | `string` | 'download_json_link' | ID attribute to set on the json Export link   |
| text   | `string` | 'Download Json'      | Text content for the json Export link         |

### Export Css

The export.css object can be provided to configure the options for Downloading the Compiled Theme in Css format. See `ThemeEditor#setupPostProcessor`  
The DOM node to append the export as css link, the id and the text of the link can be customised.

| Field  | Type     | Default             | Desc                                         |
| ------ |:--------:| ------------------- | -------------------------------------------- |
| target | `string` | export.target       | DOM Element target to append css Export link |
| id     | `string` | 'download_css_link' | ID attribute to set on the css Export link   |
| text   | `string` | 'Download Css'      | Text content for the css Export link         |

#### Export Save

The export.save object can be provided to configure the options for Saving the theme
modifications (as JSON) to an external URL.

The DOM node to append the save link, the id and the text of the link can be customised.  

The url and method can be provided to alter the HTTP method and the location the changes are send.  

An optional success callback can also be provided to fire when the changes have been successfully received by the remote URL.

| Field          | Type       | Default           | Desc                                          |
| -------------- |:----------:| ----------------- | --------------------------------------------- |
| format         | `Array`    | `json`            | The formats to include in the export          |
| target         | `string`   | export.target     | DOM Element target to append save Export link |
| url (required) | `string`   |                   | URL to send the modified theme changes        |
| method         | `string`   | `POST`            | HTTP method for the save request              |
| callback       | `function` |                   | Optional success save callback                |
| id             | `string`   | 'save_theme_link' | ID attribute to set on the save Export link   |
| text           | `string`   | 'Save Theme'      | Text content for the save Export link         |

#### Example

```javascript
<!-- Load our Fancy live editing ThemeEditor -->
<script src="../cluckles-0.3.4.js"></script>
<script>
  var themeEditor = new ThemeEditor(less, {
    theme: {
      src: 'theme.json'
    },
    export: {
      target: '#download-panel-footer',   // Fallback/General Target
      json: {
        target: '#download-panel-footer', // Custom Target
        id: 'download-theme-json',        // Custom Id
        text: 'Download Json'             // Custom Text
      },
      css: {}, // Blank Object provided makes the Css download button appear
      save: {
        url: "http://localhost:9000/example/",
        callback: function () {
          alert('Theme modifications have been saved');
        }
      }
    }
  });
</script>
```

## Contributing

I will happily accept contributions in any form, even if its just suggestions and I will have to work on them! Feel free to fork and submit a pull request.

## Licence

This project is licenced under the GPL-3.0+ Licence. The reason being is that I would prefer for people to contribute upstream so everyone can benefit from improvements.</p>