import Router from 'vue-router'


Vue.use(Router)

const Recommend = (resolve) => {
  import('cpnts/recommend/recommend').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('cpnts/login/login').then((module)=>{
    resolve(module)
  })
}

const Register = (resolve) =>{
  import('cpnts/register/register').then((module)=>{
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('cpnts/singer/singer').then((module) => {
    resolve(module)
  })
}

const Rank = (resolve) => {
  import('cpnts/rank/rank').then((module) => {
    resolve(module)
  })
}

const Search = (resolve) => {
  import('cpnts/search/search').then((module) => {
    resolve(module)
  })
}

const SongSheet = (resolve) =>{
  import('cpnts/songsheet/songsheet').then((module) =>{
    resolve(module);
  })
}

const SingerDetail = (resolve) => {
  import('cpnts/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}

const MusicList = (resolve) => {
  import('cpnts/music-list/music-list').then((module) => {
    resolve(module)
  })
}

const RankDetail = (resolve) => {
  import('cpnts/rank-detail/rank-detail').then((module) => {
    resolve(module)
  })
}

const User = (resolve) => {
  import('cpnts/user/user').then((module) => {
    resolve(module)
  })
}

const FeedDetail = (resolve) => {
  import('cpnts/feed-detail/feed-detail').then((module) => {
    resolve(module);
  })
}

const FeedPost = (resolve) => {
  import('cpnts/feed-post/feed-post').then((module) =>{
    resolve(module);
  })
}

const ProfileEdit = (resolve) => {
  import('cpnts/profile-edit/profile-edit').then((module) =>{
    resolve(module);
  })
}


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    /*
    {
      // 默认跳转到 recommend
      path: '/',
      redirect: '/recommend'
    },
    */
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: MusicList
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/songsheet/:id',
      component: SongSheet,
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: 'singer/:id',
          component: SingerDetail
        },
        {
          path: 'list/:id',
          component: MusicList
        }
      ]
    },
    {
      path: '/user',
      component: User,
      meta:{
        requireAuth:true
      }
    },
    {
      path: '/user/profile',
      component: ProfileEdit,
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/login',
      component: Login,
    },
    {
      path:'/register',
      component: Register,
    },
    {
      path:'/feed',
      component: FeedDetail,
      meta:{
        requireAuth:true
      }
  
    },
    {
      path: '/feed/post',
      component: FeedPost,
      meta:{
        requireAuth:true
      }
    }
  ]
})
