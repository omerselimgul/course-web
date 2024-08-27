import { UserRoles } from "../Helper/helper";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import HworkValidator from "../Layouts/Middleware/HworkMiddleware";
import AddCourse from "../Pages/add-course/add-course";
import AddTeacher from "../Pages/add-teacher/add-teacher";
import Allannounce from "../Pages/all-announce/all-announce";
import AllCourses from "../Pages/all-courses/all-courses";
import ApplicationsPage from "../Pages/applications-page/applications-page";
import Applications from "../Pages/applications/applications";
import CourseDetail from "../Pages/course-detail/course-detail";
import Home from "../Pages/home/Home";
import HWork from "../Pages/hwork/hwork";
import Profile from "../Pages/profile/profile";
import Teachers from "../Pages/teachers/teachers";

const routes = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/teachers",
    element: <Teachers />,
  },
  {
    path: "/applications",
    element: <Applications />,
    auth: true,
  },
  {
    path: "/add-teacher",
    element: <AddTeacher />,
    auth: true,
  },
  {
    path: "/application-page/:courseId",
    element: <ApplicationsPage />,
    auth: true,
  },
  {
    path: "/all-announce",
    element: <Allannounce />,
  },
  {
    path: "/all-courses",
    element: <AllCourses />, // +
  },
  {
    path: "/course-detail/:courseid",
    element: <CourseDetail />, // +
  },
  {
    path: "/profile",
    element: <Profile />,
    auth: true,
  },
  {
    path: "/add-course",
    element: <AddCourse />, // +
    auth: true,
    allowedRoles: [UserRoles.Admin],
  },
  {
    path: "/hwork/:courseid",
    element: (
      <HworkValidator>
        <HWork />
      </HworkValidator>
    ), // +
    auth: true,
  },

  {
    path: "/edit-course/:courseid",
    element: <AddCourse />, // +
    auth: true,
    allowedRoles: [UserRoles.Admin],
  },
  {
    path: "/login",
    element: <Home />,
  },
  {
    layout: false,
    path: "*",
    element: <div>Page Not Found</div>,
  },
];

const authMap = (routes, isChild) =>
  routes.map((route) => {
    if (route?.auth) {
      if (isChild !== true) {
        route.element = (
          <HomeLayout isAuth={true} allowedRoles={route?.allowedRoles}>
            {route.element}
          </HomeLayout>
        );
      }
    } else {
      if (isChild !== true) {
        if (route?.layout !== false) route.element = <HomeLayout>{route.element}</HomeLayout>;
      }
    }
    if (route?.children) {
      route.children = authMap(route.children, true);
    }
    return route;
  });

export default authMap(routes);
