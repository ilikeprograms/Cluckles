module.exports = function (grunt) {
	// Setup
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

        // Concat task to Contatenate all the bsThemeEditor files together
        concat: {
            options: {
                separator: grunt.util.linefeed + grunt.util.linefeed,
                banner: '/**\n' +
                        ' * <%= pkg.name %> <%= pkg.version %>:' +
                        ' Bootstrap Theme Editor allows live modification of Bootstrap themes so that you can customise them easily.\n' +
                        ' * Copyrite <%= grunt.template.today("yyyy") %> <%= pkg.author %> <tom@ilikeprograms.com>\n' +
                        ' * Licence: GPL-3.0+\n' +
                        ' */\n'
            },
            
            // The Main lib files used to make bsThemeEditor.js
            main: {
                src: [
                    'src/<%= pkg.name %>/theme-modifier.js',
                    'src/<%= pkg.name %>/misc.js',
                    'src/<%= pkg.name %>/breadcrumb.js',
                    'src/<%= pkg.name %>/panel.base.js',
                    'src/<%= pkg.name %>/navbar.base.js',
                    'src/<%= pkg.name %>/branding.js',
                    'src/<%= pkg.name %>/dropdown.js',
                    'src/<%= pkg.name %>/form-state.js',
                    'src/<%= pkg.name %>/gray-base.js',
                    'src/<%= pkg.name %>/jumbotron.js',
                    'src/<%= pkg.name %>/list-group.js',
                    'src/<%= pkg.name %>/navbar.js',
                    'src/<%= pkg.name %>/theme-modifier.js',
                    'src/<%= pkg.name %>/export.js',
                    'src/<%= pkg.name %>/theme-editor.js',
                ],
                dest: 'build/bsThemeEditor-<%= pkg.version %>.js'
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
                dest: 'build/bsThemeEditor-<%= pkg.version %>.min.js'
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
                },
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
                files: 'example-src/*.*',
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
            
            // Run the tasks when the ThemeEditor JS files change
            scripts: {
                files: "src/BootstrapThemeEditor/*",
                tasks: ["jshint", "uglify", "copy"],
                options: {
                    livereload: true,
                }
            }
        },

        // Setup the Copy config to copy all the required files to the build/* folders
		copy: {
			main: {
				files: [
                    // Copy the Example files
                    {expand: true, src: "example-src/css/example.css", flatten: true, dest: 'build/example/'},

					// JS lib files
					{expand: true, src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/jquery/dist/jquery.min.map'], flatten: true, dest: 'build/js/lib'},
					{expand: true, src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], flatten: true, dest: 'build/js/lib'},
                    {expand: true, src: ['bower_components/less.js/dist/less-1.7.3.min.js'], flatten: true, dest: 'build/js/lib'},
					
					// Bootstrap less files
					{expand: true, src: ['bower_components/bootstrap/less/*'], flatten: true, dest: 'build/less', filter: 'isFile'},
					{expand: true, src: ['bower_components/bootstrap/less/*'], flatten: true, dest: 'build/less', filter: 'isFile'},
                    
                    // Custom Bootstrap variables file
					{expand: true, src: 'src/variables-custom.less', flatten: true, dest: 'build/less/'},

                    // Copy the Custom Bootstrap.less file which adds the theme.less as an import
                    {expand: true, src: "src/bootstrap.less", flatten: true, dest: 'build/less/'},
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

            docs: {
                files: [
                    // Main JS File
                    {
                        src: 'build/bsThemeEditor-<%= pkg.version %>.min.js',
                        dest: 'docs/assets/js/bsThemeEditor.min.js'
                    },
                    
                    // Copy the example.css file
                    {src: "example-src/example.css", dest: 'docs/assets/css/example.css'},
                    
                    // JS lib files
					{expand: true, src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/jquery/dist/jquery.min.map'], flatten: true, dest: 'docs/assets/js/lib'},
					{src: 'bower_components/bootstrap/dist/js/bootstrap.min.js', dest: 'docs/assets/js/lib/bootstrap.min.js'},
                    {src: 'bower_components/less.js/dist/less-1.7.3.min.js', dest: 'docs/assets/js/lib/less.min.js'},
                    
                    // Bootstrap less files
					{expand: true, src: ['bower_components/bootstrap/less/*'], flatten: true, dest: 'docs/assets/less', filter: 'isFile'},
                    
                    // Custom Bootstrap variables file
					{src: 'src/variables-custom.less', dest: 'docs/assets/less/variables-custom.less'},

                    // Copy the Custom Bootstrap.less file which adds the theme.less as an import
                    {src: "src/bootstrap.less", dest: 'docs/assets/less/bootstrap.less'}
                ]
            }
		},
        
        // Builds the main Example demo pages
        htmlbuild: {
            build: {
                // Build the examplesrc/index.html file
                src: '<%= examplesrc %>/index.html',
                dest: 'build/example/', // Place the build files in build/example/
                options: {
                    beautify: true,
                    
                    styles: {
                        example: [
                            'build/example/example.css'
                        ]
                    },

                    sections: {
                        templates: {
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
                                
                                // Components editors
                                components: {
                                    jumbotron: '<%= examplesrc %>/templates/editor/components/jumbotron.html',
                                    listgroups: '<%= examplesrc %>/templates/editor/components/listgroup.html',
                                    dropdowns: '<%= examplesrc %>/templates/editor/components/dropdowns.html',
                                    breadcrumbs: '<%= examplesrc %>/templates/editor/components/breadcrumbs.html',
                                    panels: '<%= examplesrc %>/templates/editor/components/panels.html',
                                    navbars: '<%= examplesrc %>/templates/editor/components/navbars.html',
                                    misc: '<%= examplesrc %>/templates/editor/components/misc.html',
                                }
                            },
                            
                            // Component Examples
                            components: {
                                jumbotron: '<%= examplesrc %>/templates/components/jumbotron.html',
                                buttons: '<%= examplesrc %>/templates/components/buttons.html',
                                thumbnails: '<%= examplesrc %>/templates/components/thumbnails.html',
                                dropdowns: '<%= examplesrc %>/templates/components/dropdowns.html',
                                navbars: '<%= examplesrc %>/templates/components/navbars.html',
                                navs: '<%= examplesrc %>/templates/components/navs.html',
                                breadcrumbs: '<%= examplesrc %>/templates/components/breadcrumbs.html',
                                alerts: '<%= examplesrc %>/templates/components/alerts.html',
                                progressbars: '<%= examplesrc %>/templates/components/progressbars.html',
                                listgroups: '<%= examplesrc %>/templates/components/listgroups.html',
                                panels: '<%= examplesrc %>/templates/components/panels.html',
                                wells: '<%= examplesrc %>/templates/components/wells.html',
                            },
                            
                            // Page Elements
                            page: {
                                navigation: '<%= examplesrc %>/templates/page/navigation.html',
                                downloadpanel: '<%= examplesrc %>/templates/page/downloadpanel.html',
                            }
                        }
                    }
                }
            }
        },

        // Turn on JShint for the Javascript files in src/BootstrapThemeEditor/
		jshint: {
			options: {
				jshintrc: true,
			},
			files: ['src/<%= pkg.name %>/*.js']
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
	grunt.registerTask("default", ["jshint", "concat", "uglify", "copy", "htmlbuild", "express", "open", "watch"]);

    grunt.registerTask("docs", ["jshint", "concat", "uglify", "copy:docs"]);
};