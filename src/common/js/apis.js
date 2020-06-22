// API接口文件
// 登录接口
const   userlogin = '/api/userlogin',
        register = '/api/register';
// 菜单接口
const   menulist = '/api/menulist',
        menuadd = '/api/menuadd',
        menuinfo = '/api/menuinfo',
        menuedit = '/api/menuedit',
        menudelete = '/api/menudelete';
// 角色接口
const   rolelist ='/api/rolelist',
        roleadd = '/api/roleadd',
        roleinfo = '/api/roleinfo',
        roleedit = '/api/roleedit',
        roledelete = '/api/roledelete';
// 用户接口
const   usercount = '/api/usercount',
        userlist = '/api/userlist',
        useradd = '/api/useradd',
        userinfo = '/api/userinfo',
        useredit = '/api/useredit',
        userdelete = '/api/userdelete';
// 规格接口
const   specscount = '/api/specscount',
        specslist = '/api/specslist',
        specsadd = '/api/specsadd',
        specsinfo = '/api/specsinfo',
        specsedit = '/api/specsedit',
        specsdelete = '/api/specsdelete';
// 分类接口
const   catepage = '/api/catepage',
        catecount = '/api/catecount',
        catelist = '/api/catelist',
        cateadd = '/api/cateadd',
        cateinfo = '/api/cateinfo',
        cateedit = '/api/cateedit',
        catedelete = '/api/catedelete';
// 商品接口
const   goodscount = '/api/goodscount',
        goodslist = '/api/goodslist',
        goodsadd = '/api/goodsadd',
        goodsinfo = '/api/goodsinfo',
        goodsedit = '/api/goodsedit',
        goodsdelete = '/api/goodsdelete';
// 轮播图接口
const   bannerlist = '/api/bannerlist',
        banneradd = '/api/banneradd',
        bannerinfo = '/api/bannerinfo',
        banneredit = '/api/banneredit',
        bannerdelete = '/api/bannerdelete';
// 秒杀接口
const   secklist = '/api/secklist',
        seckadd = '/api/seckadd',
        seckinfo = '/api/seckinfo',
        seckedit = '/api/seckedit',
        seckdelete = '/api/seckdelete',
        seckpage = '/api/seckpage',
        seckcount = '/api/seckcount';
// 会员接口
const   membercount = '/api/membercount',
        memberlist = '/api/memberlist',
        memberinfo = '/api/memberinfo',
        memberedit = '/api/memberedit',
        memberdelete = '/api/memberdelete'; 
export default {
    userlogin,register,
    menulist,menuadd,menuinfo,menuedit,menudelete,
    rolelist,roleadd,roleinfo,roleedit,roledelete,
    usercount,userlist,useradd,userinfo,useredit,userdelete,
    specscount,specslist,specsadd,specsinfo,specsedit,specsdelete,
    catepage,catecount,catelist,cateadd,cateinfo,cateedit,catedelete,
    goodscount,goodslist,goodsadd,goodsinfo,goodsedit,goodsdelete,
    bannerlist,banneradd,bannerinfo,banneredit,bannerdelete,
    secklist,seckadd,seckinfo,seckedit,seckdelete,seckpage,seckcount,
    membercount,memberlist,memberinfo,memberedit,memberdelete
}