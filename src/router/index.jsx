import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
const WelCome= lazy(()=>import('../pages/Welcome/Welcome'))
const PersonCenter=lazy(()=>import('../pages/PersonCenter/PersonCenter'))
const MyDetail=lazy(()=>import('../pages/PersonCenter/component/MyDetail'))
const AddArticle=lazy(()=>import('../pages/addarticle/AddArticle'))
const Index=lazy(()=>import('../pages/index/Index'))
const Homepage=lazy(()=>import('../components/HomePage'))
const Register=lazy(()=>import('../components/Register'))
const Login=lazy(()=>import('../components/Login'))
const ArticleContent=lazy(()=>import('../components/articleContent/articleContent'))
const About=lazy(()=>import('../pages/about/About'))

//使用useRoutes注册路由必须在最外侧包裹一层hashroute或者browerroute
const AppRouter = () => {
  let route = useRoutes([
    {
      path: "/",
      element: (<Suspense><WelCome/></Suspense>),
    },
    {
      path: "/person/center",
      element: <Suspense><PersonCenter/></Suspense>,
      children: [
        {
          path: "profile",
          element: <Suspense><MyDetail/></Suspense>,
        },
      ],
    },
    {
      path: "/article/add",
      element: <Suspense><AddArticle/></Suspense>,
    },
    {
      path: "/index",
      element: <Suspense><Index/></Suspense>,
      children: [
        {
          path: "register",
          element: <Suspense><Register/></Suspense>,
        },
        {
          path: "login",
          element: <Suspense><Login/></Suspense>,
        },
        {
          path: "homepage",
          element: <Suspense><Homepage/></Suspense>,
        },
        {
          path: "article/detail",
          element: <Suspense><ArticleContent/></Suspense>,
        },
        {
          path: "about",
          element: <Suspense><About/></Suspense>,
        },
      ],
    },
  ]);
  return route;
};

export default AppRouter;
