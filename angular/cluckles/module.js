angular.module('clucklesmodule', [])
    .factory('cluckleseditor', ['$window', function ($window) {

    return {
        'init': function () {
            var clucklesInstance = new $window.ClucklesEditor({
                target: '#download-panel-footer',   // Fallback/General Target
//                export: {
//                    json: {
//                    target: '#download-panel-footer', // Custom Target
//                    id: 'download-theme-json',        // Custom Id
//                    text: 'Download Json'             // Custom Text
//                  },
//                  css: {},
//                },
                theme: {
                    src: 'cluckles/theme.json'
                }
            });

            Window.clucklesEditor = clucklesInstance;

            return clucklesInstance;
        }
    };
}]);