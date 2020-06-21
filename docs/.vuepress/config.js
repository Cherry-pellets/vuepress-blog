const path = require("path")
const rootpath = path.dirname(__dirname) //执行一次dirname将目录定位到docs目录
const utils = require('./utils/index.js');
const filehelper = require('./utils/initPage.js');

module.exports = {
    title: 'pellets的博客',
    description: '个人博客',
    dest: './dist',
    port: '8080',
    head: [
        ['link', {rel: 'icon', href: '/pellets.png'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav'),
        // sidebar: require('./sidebar'),
        sidebar: {
            '/blog/vue/': utils.genSidebar('vue相关', filehelper.getFileName(rootpath+"/blog/vue/"), false),
            '/blog/JavaScript/': utils.genSidebar('JavaScript相关', filehelper.getFileName(rootpath+"/blog/JavaScript/"), false),
            '/blog/css/': utils.genSidebar('css相关', filehelper.getFileName(rootpath+"/blog/css/"), false),
            '/blog/Linux/': utils.genSidebar('Linux相关', filehelper.getFileName(rootpath+"/blog/Linux/"), false),
            '/blog/node/': utils.genSidebar('node相关', filehelper.getFileName(rootpath+"/blog/node/"), false),
            '/blog/云计算/': utils.genSidebar('云计算相关', filehelper.getFileName(rootpath+"/blog/云计算/"), false),
            '/blog/interview/': utils.genSidebar('面经', filehelper.getFileName(rootpath+"/blog/interview/"), false),
        },
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: 'Refresh'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    }
}