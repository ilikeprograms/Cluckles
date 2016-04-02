module.exports = function (grunt) {
	// Setup
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        
        // Example-src folder location
        examplesrc: 'example-src',

        // Concat task to Contatenate all the Cluckles files together
        concat: {
            options: {
                separator: grunt.util.linefeed + grunt.util.linefeed,
                banner: '/*!\n' +
                        ' * <%= pkg.name %> <%= pkg.version %>:' +
                        ' Cluckles Live Theme Editor for CSS Frameworks based on Less such as Twitter Bootstrap.\n' +
                        ' * <%= pkg.website %>\n' +
                        ' * \n' +
                        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                        ' * Released under the <%= pkg.license %> license\n' +
                        ' */\n' +
                        '(function (window) {\n' +
                        '   var docContext = window.parent.document;\n',
                footer: '\n})(window);'
            },
            
            // The Main lib files used to make cluckles.js
            main: {
                src: [
                    'src/<%= pkg.name %>/theme-modifier.js',
                    'src/<%= pkg.name %>/processor.js',
                    'src/<%= pkg.name %>/typography.js',
                    'src/<%= pkg.name %>/misc.js',
                    'src/<%= pkg.name %>/table.js',
                    'src/<%= pkg.name %>/breadcrumb.js',
                    'src/<%= pkg.name %>/panel.base.js',
                    'src/<%= pkg.name %>/navbar.base.js',
                    'src/<%= pkg.name %>/button.base.js',
                    'src/<%= pkg.name %>/label.js',
                    'src/<%= pkg.name %>/nav.js',
                    'src/<%= pkg.name %>/pagination.js',
                    'src/<%= pkg.name %>/pager.js',
                    'src/<%= pkg.name %>/form.js',
                    'src/<%= pkg.name %>/tab.js',
                    'src/<%= pkg.name %>/pill.js',
                    'src/<%= pkg.name %>/branding.js',
                    'src/<%= pkg.name %>/dropdown.js',
                    'src/<%= pkg.name %>/tooltip.js',
                    'src/<%= pkg.name %>/popover.js',
                    'src/<%= pkg.name %>/thumbnail.js',
                    'src/<%= pkg.name %>/badge.js',
                    'src/<%= pkg.name %>/carousel.js',
                    'src/<%= pkg.name %>/code.js',
                    'src/<%= pkg.name %>/blockquote.js',
                    'src/<%= pkg.name %>/modal.js',
                    'src/<%= pkg.name %>/button.js',
                    'src/<%= pkg.name %>/form-state.js',
                    'src/<%= pkg.name %>/gray.base.js',
                    'src/<%= pkg.name %>/jumbotron.js',
                    'src/<%= pkg.name %>/list-group.js',
                    'src/<%= pkg.name %>/navbar.js',
                    'src/<%= pkg.name %>/theme-modifier.js',
                    'src/<%= pkg.name %>/export.js',
                    'src/<%= pkg.name %>/import.js',
                    'src/<%= pkg.name %>/cluckles.editor.js'
                ],
                dest: 'build/<%= pkg.nameLower %>-<%= pkg.version %>.js'
            }
        },

        // Uglify will build the .min version of our Main lib file
		uglify: {
            options: {
                preserveComments: 'some'
            },

			build: {
                // Theme Editor Files
				src: '<%= concat.main.dest %>',
                dest: 'build/<%= pkg.nameLower %>-<%= pkg.version %>.min.js'
			}
		},
        
        // Create a localhost server to host the example demo
        express: {
            all: {
                // Host on localhost:9000
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    bases: [__dirname + '/build'], // Set the docroot to be the ./build folder
                    livereload: true
                }
            }
        },
        
        // Automatically open the path when Grunt is run
        open: {
            all: {
                path: "http://localhost:9000/example" // ./build/example (index.html)
            }
        },
        
        watch: {
            // Run the tasks when any of the example-src files are changed
            "example-src": {
                files: '<%= examplesrc %>/*.*',
                tasks: ["jshint", "uglify", "copy"],

                options: {
                  livereload: true
                }
            },
            
            // Reload the GruntFile.js when it is changed
            // TODO: Look into getting it to rerun the build process and start
            // watching again when this is done
            configFiles: {
                files: "GruntFile.js",
                options: {
                    reload: true
                }
            },
            
            // Run the tasks when the Cluckles JS files change
            scripts: {
                files: "src/<%= pkg.nameLower %>/*",
                tasks: ["js"],
                options: {
                    livereload: true
                }
            }
        },

        // Setup the Copy config to copy all the required files to the build/* folders
		copy: {
			main: {
				files: [
                    // Copy the Example files
                    {expand: true, src: "example-src/css/*", flatten: true, dest: 'build/example/css'},
                    {expand: true, src: "example-src/js/*", flatten: true, dest: 'build/example/js'},

					// JS lib files
					{expand: true, src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/jquery/dist/jquery.min.map'], flatten: true, dest: 'build/js/lib'},
					{expand: true, src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], flatten: true, dest: 'build/js/lib'},
                    {expand: true, src: ['bower_components/less.js/dist/less-2.0.0.min.js'], flatten: true, dest: 'build/js/lib'},
					
					// Bootstrap less files
					{expand: true, src: ['bower_components/bootstrap/less/*'], flatten: true, dest: 'build/less', filter: 'isFile'},
					{expand: true, src: ['bower_components/bootstrap/less/mixins/*'], flatten: true, dest: 'build/less/mixins', filter: 'isFile'},
					{expand: true, src: ['bower_components/bootstrap/fonts/*'], flatten: true, dest: 'build/fonts', filter: 'isFile'},
                    
                    // Custom Bootstrap variables file
					{expand: true, src: 'src/variables-custom.less', flatten: true, dest: 'build/less/'},
					{expand: true, src: 'src/theme.less', flatten: true, dest: 'build/less/'},

                    // Copy the Custom Bootstrap.less file which adds the theme.less as an import
                    {expand: true, src: "src/bootstrap.less", flatten: true, dest: 'build/less/'},
                    
                    {expand: true, src: "build/cluckles-1.1.0.js", flatten: true, dest: 'angular/js/lib/'}
				],
				options: {
                    // Replace "variables.less" with "variables-custom.less"
                    // the variables-custom.less file contains more/altered variables which makes it easier to
                    // cascade theme changes to multiple dependent elements
					process: function (content, srcpath) {
						return content.replace(/variables\.less/g, "variables-custom.less");
					}
				}
			},

            // Copy the Build files required to the Docs folder
            docs: {
                files: [
                    // Main JS File
                    {
                        src: 'build/<%= pkg.nameLower %>-<%= pkg.version %>.min.js',
                        dest: 'docs/assets/js/<%= pkg.nameLower %>.min.js'
                    },
                    
                    // Copy the Example files
                    {src: "<%= examplesrc %>/css/component-example-fix.css", dest: 'docs/assets/css/component-example-fix.css' },
                    {src: "<%= examplesrc %>/js/component-example-fix.js", dest: 'docs/assets/js/component-example-fix.js'},
                    {src: "build/example/component.html", dest: 'docs/_includes/component.html'},
                    {src: "build/example/editor.html", dest: 'docs/_includes/editor.html'},
                    
                    // Font files
                    { src: "build/fonts/*", dest: 'docs/assets/fonts', expand: true, flatten: true },
                    
                    // JS lib files
					{expand: true, src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/jquery/dist/jquery.min.map'], flatten: true, dest: 'docs/assets/js/lib'},
					{src: 'bower_components/bootstrap/dist/js/bootstrap.min.js', dest: 'docs/assets/js/lib/bootstrap.min.js'},
                    {src: 'bower_components/less.js/dist/less-2.0.0.min.js', dest: 'docs/assets/js/lib/less.min.js'},
                    
                    // Build Less Files
                    {expand: true, cwd: 'build/', src: 'less/**', dest: 'docs/assets/'}
//                    {expand: true, src: ['build/less/mixins'], flatten: true, dest: 'docs/assets/less/mixins', filter: 'isFile'}
                ]
            },
            
            dist: {
                files: [
                    // Main JS File
                    {
                        src: 'build/<%= pkg.nameLower %>-<%= pkg.version %>.min.js',
                        dest: 'dist/<%= pkg.nameLower %>.min.js'
                    },
                ]
            }
		},
        
        // Builds the main Example demo pages
        htmlbuild: {
            components: {
                src: '<%= examplesrc %>/templates/component.html',
                dest: 'build/example/',

                options: {
                    beautify: true,

                    sections: {
                        templates: {
                            // Component Examples
                            component: {
                                typography: '<%= examplesrc %>/templates/component/typography.html',
                                jumbotron: '<%= examplesrc %>/templates/component/jumbotron.html',
                                button: '<%= examplesrc %>/templates/component/button.html',
                                table: '<%= examplesrc %>/templates/component/table.html',
                                thumbnail: '<%= examplesrc %>/templates/component/thumbnail.html',
                                label: '<%= examplesrc %>/templates/component/label.html',
                                badge: '<%= examplesrc %>/templates/component/badge.html',
                                dropdown: '<%= examplesrc %>/templates/component/dropdown.html',
                                navbar: '<%= examplesrc %>/templates/component/navbar.html',
                                nav: '<%= examplesrc %>/templates/component/nav.html',
                                pagination: '<%= examplesrc %>/templates/component/pagination.html',
                                form: '<%= examplesrc %>/templates/component/form.html',
                                breadcrumb: '<%= examplesrc %>/templates/component/breadcrumb.html',
                                alert: '<%= examplesrc %>/templates/component/alert.html',
                                tooltip: '<%= examplesrc %>/templates/component/tooltip.html',
                                popover: '<%= examplesrc %>/templates/component/popover.html',
                                modal: '<%= examplesrc %>/templates/component/modal.html',
                                progressbar: '<%= examplesrc %>/templates/component/progressbar.html',
                                listgroup: '<%= examplesrc %>/templates/component/listgroup.html',
                                panel: '<%= examplesrc %>/templates/component/panel.html',
                                well: '<%= examplesrc %>/templates/component/well.html',
                                code: '<%= examplesrc %>/templates/component/code.html',
                                blockquote: '<%= examplesrc %>/templates/component/blockquote.html',
                                carousel: '<%= examplesrc %>/templates/component/carousel.html',
                            }
                        }
                    }
                }
            },
            
            editor: {
                src: '<%= examplesrc %>/templates/editor.html',
                dest: 'build/example/',

                options: {
                    beautify: true,

                    sections: {
                        templates: {
                            // Page Elements
                            page: {
                                downloadpanel: '<%= examplesrc %>/templates/page/downloadpanel.html',
                                toolbar: '<%= examplesrc %>/templates/page/toolbar.html'
                            },

                            editor: {
                                // Color Scheme/Branding Editors
                                branding: {
                                    default: '<%= examplesrc %>/templates/editor/branding/default.html',
                                    primary: '<%= examplesrc %>/templates/editor/branding/primary.html',
                                    success: '<%= examplesrc %>/templates/editor/branding/success.html',
                                    info: '<%= examplesrc %>/templates/editor/branding/info.html',
                                    warning: '<%= examplesrc %>/templates/editor/branding/warning.html',
                                    danger: '<%= examplesrc %>/templates/editor/branding/danger.html',
                                },

                                // Component editors
                                component: {
                                    typography: '<%= examplesrc %>/templates/editor/component/typography.html',
                                    jumbotron: '<%= examplesrc %>/templates/editor/component/jumbotron.html',
                                    listgroup: '<%= examplesrc %>/templates/editor/component/listgroup.html',
                                    dropdown: '<%= examplesrc %>/templates/editor/component/dropdown.html',
                                    tooltip: '<%= examplesrc %>/templates/editor/component/tooltip.html',
                                    popover: '<%= examplesrc %>/templates/editor/component/popover.html',
                                    thumbnail: '<%= examplesrc %>/templates/editor/component/thumbnail.html',
                                    badge: '<%= examplesrc %>/templates/editor/component/badge.html',
                                    carousel: '<%= examplesrc %>/templates/editor/component/carousel.html',
                                    code: '<%= examplesrc %>/templates/editor/component/code.html',
                                    blockquote: '<%= examplesrc %>/templates/editor/component/blockquote.html',
                                    modal: '<%= examplesrc %>/templates/editor/component/modal.html',
                                    label: '<%= examplesrc %>/templates/editor/component/label.html',
                                    nav: '<%= examplesrc %>/templates/editor/component/nav.html',
                                    pagination: '<%= examplesrc %>/templates/editor/component/pagination.html',
                                    form: '<%= examplesrc %>/templates/editor/component/form.html',
                                    breadcrumb: '<%= examplesrc %>/templates/editor/component/breadcrumb.html',
                                    panel: '<%= examplesrc %>/templates/editor/component/panel.html',
                                    navbar: '<%= examplesrc %>/templates/editor/component/navbar.html',
                                    button: '<%= examplesrc %>/templates/editor/component/button.html',
                                    misc: '<%= examplesrc %>/templates/editor/component/misc.html',
                                    table: '<%= examplesrc %>/templates/editor/component/table.html',
                                }
                            }
                        }
                    }
                }
            },

            build: {
                // Build the examplesrc/index.html file
                src: '<%= examplesrc %>/index.html',
                dest: 'build/example/', // Place the build files in build/example/
                options: {
                    beautify: true,
                    
                    styles: {
                        example: [
                            'build/example/css/component-example-fix.css'
                        ]
                    },

                    sections: {
                        templates: {
                            component: 'build/example/component.html',
                            editor: 'build/example/editor.html',
                            
                            // Page Elements
                            page: {
                                navigation: '<%= examplesrc %>/templates/page/navigation.html'
                            }
                        }
                    }
                }
            }
        },

        // Turn on JShint for the build cluckles.js file
		jshint: {
			options: {
				jshintrc: true
			},
			files: ['build/<%= pkg.nameLower %>-<%= pkg.version %>.js']
		}
	});

    // Load the Required Tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-html-build');

    // Register the "default" Task
    grunt.registerTask("js", ["concat", "jshint", "uglify", "copy:main"]);
    grunt.registerTask("html", ["htmlbuild:components", "htmlbuild:editor", "htmlbuild:build"]);
    grunt.registerTask("host", ["express", "open", "watch"]);

    grunt.registerTask("docs", ["js", "html", "copy:docs"]);
    grunt.registerTask("copyDocs", ["copy:docs"]);

    // Dist
    grunt.registerTask("dist", ["docs", "copy:dist"]);

	grunt.registerTask("default", ["js", "html", "host"]);
};