const base = '/nyanpass-blog/'
const getPages = require('./utils/pages');

async function getConfig(){
    const config = {
        base,
        title: '喵帕斯',
        themeConfig:{
            logo:'/mps.png',
            nav:[
                {
                    text:'喵',
                    link:'nyan',
                },
                {
                    text:'帕',
                    link:'pa',
                },
                {
                    text:'斯',
                    link:'ss',
                }
            ],
            sidebar: [],
            pages:await getPages(),
            prevLink:true,
            nextLink:true
        }
    }
    return config
}

exports.base = base;
module.exports = getConfig();
