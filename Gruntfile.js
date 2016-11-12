module.exports = function (grunt) {

// описываем конфигурацию

grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),

	    jshint: {     // описываем как будет проверять наш код - jsHint
	      options: {
	        curly: true,
	        eqeqeq: true,
	        immed: true,
	        latedef: true,
	        newcap: true,
	        noarg: true,
	        sub: true,
	        undef: true,
	        eqnull: true,
	        browser: true,
	        reporter: require('jshint-stylish'),
	        globals: {
	          jQuery: true,
	          $: true,
	          console: true,
	          alert: true
	        }
	      },
	      '<%= pkg.name %>': {  //вставляем название проекта из package.json
	        src: [ 'src/js/**/*.js' ]  //какие файлы надо проверять
	      }
	    },

	    concat: {
	    	dist: {
	    		src: ['src/js/*.js'],
	    		dest: 'dest/build.js'
	    	}
	    },


	   uglify: {  //описываем работу плагина минификации js - uglify.
	    	options: {
	    		stripBanners: true,
	    		banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' //комментарий который будет в минифицированном файле.
	    	},

	    	build: {
	    		src: 'dest/build.clean.js',  // какой файл минифицировать
	    		dest: 'dest/build.min.js' // куда класть файл, который получится после процесса минификации
	    	}
	    },

	    cssmin: {
	    	with_banner: {
	    		options: {
	    			banner: '/* My minified CSS  */'},
	    		
	    			files: {
	    				'dest/style.min.css': ['src/css/style1.css', 'src/css/style2.css']

	    			}
	    		}
	    	},

	    	watch: {

	    	scripts: {
		    	files: ['src/js/*.js'],  //следить за всеми js файлами в папке src
		    	tasks: ['jshint', 'concat', 'removelogging', 'uglify']  //при их изменении запускать следующие задачи
	    	},
	    	css: {
		    	files: ['src/css/*.css'], //следить за всеми css файлами в папке src
		    	tasks: ['cssmin'] //при их изменении запускать следующую задачу
	    	}

	    	},

	    	removelogging: { // удаление логов
	    		dist: {
	    			src: 'dest/build.js',
	    			 dest: 'dest/build.clean.js'
	    		}
	    	}

	 

});

// подгружаем необходимые плагины

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-remove-logging');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-watch');


// регистрируем задачу

grunt.registerTask('default', ['jshint', 'concat', 'removelogging', 'uglify', 'cssmin', 'watch' ]);

};