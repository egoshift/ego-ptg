const HTMLMin = require('html-minifier');

module.exports = (eleventyConfig) => {

    // eleventyConfig.addCollection("pages", function(collection) {
    //     return collection.getAllSorted().filter(function(item) {
    //         return item.inputPath.match(/^\.\/pages\//) !== null;
    //     });
    // });

    eleventyConfig.addPassthroughCopy({
        '_includes/assets/css/*.css': 'css',
        '_includes/assets/js/*.js': 'js',
        '_includes/templates/*.njk': 'templates'
    })

    // eleventyConfig.addFilter('cssmin', (code) => {
    //     console.log(code);
    //     return new CleanCSS({}).minify(code).styles
    // })

    // eleventyConfig.addFilter('jsmin', (code) => {
    //     let min = UglifyJS.minify(code)
        
    //     if (min.error) {
    //         console.log('Error (UglifyJS): ', min.error)
    //         return code
    //     }

    //     return min.code
    // })

    eleventyConfig.addTransform('htmlmin', (content, output) => {
        if (output.indexOf('.html') > -1) {
            let min = HTMLMin.minify(content, {
                collapseWhitespace: true,
                useShortDoctype: true,
                removeComments: true
            })

            return min
        }

        return content
    })

    return {

        templateFormats: ["html", "njk", "md"],

        pathPrefix: "/",
        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "njk",
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        }

    }

};