function testsass()
{
    console.log('here');
    var sass = require('node-sass');
    
    sass.render({
        file: './css/app.scss',
        data: JSON.stringify(JSON.parse('"@brand-primary":"#00a1dc","@brand-success":"#088f88","@brand-info":"#4c93f5"')),
        includePaths: ['bower_components/bootstrap-sass/assets/stylesheets/']
    }, function (error, result) {
        var stylesheet = document.createElement('style');
        stylesheet.innerHTML = result.css.toString();
        document.head.appendChild(stylesheet);
        console.log(result);
        console.log(JSON.stringify(result.css));
    });
}