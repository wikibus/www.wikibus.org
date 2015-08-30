module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'spec/**/*.js', watched: false }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'spec/**/*.js': ['babel']
        },
        singleRun: true
    });
};