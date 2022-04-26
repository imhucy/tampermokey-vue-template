class MetadataBlock {
    constructor() {
        this.name = 'Example'
        this.version = '1.0.0'
        this.description = 'This is a example script base Jquery and Vue'
        this.author = 'hucy'
        this.include = ['*']
        this.require = [
            'https://cdn.staticfile.org/lodash.js/4.17.21/lodash.min.js',
            'https://cdn.staticfile.org/jquery/2.2.4/jquery.min.js',
            'https://cdn.staticfile.org/vue/2.6.9/vue.runtime.min.js'
        ]
        this.grant = [
            'GM_addStyle'
        ]
    }
}

module.exports = new MetadataBlock()