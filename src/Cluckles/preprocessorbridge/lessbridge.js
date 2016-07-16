    var LessBridge = function () {
        this.lessLib = window.less;

        // Main Less stylesheet (bootstrap.less)
        this.mainStylesheet             = document.querySelector('link[rel="stylesheet/less"]');
        // The URL path of the href attribute e.g. [0] = assets, [1] = less, [2] = bootstrap.less etc
        this.mainStylesheetPath         = this.mainStylesheet.getAttribute('href').split('/').slice(1);
        this.mainStylesheetHypenated    = this.mainStylesheetPath.slice(0 , -1)
                .concat(
                    this.mainStylesheetPath[this.mainStylesheetPath.length - 1] // Get bootstrap.less etc
                    .slice(0, -5) // Now remove the ".less"
                ).join('-');
                // Join with - to give us "assets-less-bootstrap" for example, which is part of the ID which less
                // assigned to the Stylesheet it outputs after processing client side

        // The path to the less folder e.g. assets/less/
        this.lessPath                   = this.mainStylesheetPath.slice(0, -1).join('/') + '/';
    };

    LessBridge.prototype.apply = function (modifiers, reload) {
        if (reload !== undefined) {
            this.lessLib.refresh(reload, modifiers);
        } else {
            this.lessLib.refresh(false, modifiers);
        }
    };
