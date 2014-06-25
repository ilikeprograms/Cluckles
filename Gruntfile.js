module.exports = function (grunt) {
	// Setup
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				files: { // Theme Editor Files
					'build/bsThemeEditor-<%= pkg.version %>.min.js': [
						'src/<%= pkg.name %>/theme-modifier.js',
						'src/<%= pkg.name %>/branding.js',
						'src/<%= pkg.name %>/dropdown.js',
						'src/<%= pkg.name %>/form-state.js',
						'src/<%= pkg.name %>/gray-base.js',
						'src/<%= pkg.name %>/jumbotron.js',
						'src/<%= pkg.name %>/list-group.js',
						'src/<%= pkg.name %>/navbar.js',
						'src/<%= pkg.name %>/theme-modifier.js',
						'src/<%= pkg.name %>/theme-editor.js',
					]
				}
			}
		},
		
		copy: {
			main: {
				files: [
					// JS lib files
					{expand: true, src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/jquery/dist/jquery.min.map'], flatten: true, dest: 'build/js/lib'},
					{expand: true, src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], flatten: true, dest: 'build/js/lib'},
					
					// Customised Bootstrap
					{expand: true, src: ['bower_components/bootstrap/less/*'], flatten: true, dest: 'build/less', filter: 'isFile'},
					
					{expand: true, src: ['src/bootstrap.less'], flatten: true, dest: 'build/less'},
					
					{expand: true, src: ['bower_components/less.js/dist/less-1.7.3.min.js'], flatten: true, dest: 'build/js/lib'},

					{expand: true, src: ['src/variables-custom.less'], flatten: true, dest: 'build/less'},
				],
				options: {
					process: function (content, srcpath) {
						return content.replace(/variables\.less/g, "variables-custom.less");
					}
				}
			}
		},

		jshint: {
			options: {
				jshintrc: true,
			},
			files: ['src/<%= pkg.name %>/*.js']
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint', 'uglify', 'copy']);
};