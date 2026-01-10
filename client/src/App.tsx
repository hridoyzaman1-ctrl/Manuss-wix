import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { useEffect, lazy, Suspense } from "react";
import Lenis from "@studio-freight/lenis";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import { DashboardLayoutSkeleton } from "./components/DashboardLayoutSkeleton";

import AIVoicePage from "@/pages/AIVoicePage";
import Auth from "@/pages/Auth";
import Chatbot from "./components/Chatbot";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

// Lazy load dashboard pages for better performance
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const StudentDashboard = lazy(() => import("@/pages/student/StudentDashboard"));
const ParentDashboard = lazy(() => import("@/pages/parent/ParentDashboard"));

// Admin pages
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminCourses = lazy(() => import("@/pages/admin/AdminCourses"));
const AdminEnrollments = lazy(() => import("@/pages/admin/AdminEnrollments"));
const AdminQuizzes = lazy(() => import("@/pages/admin/AdminQuizzes"));
const AdminAssignments = lazy(() => import("@/pages/admin/AdminAssignments"));
const AdminAnnouncements = lazy(() => import("@/pages/admin/AdminAnnouncements"));
const AdminEvents = lazy(() => import("@/pages/admin/AdminEvents"));
const AdminAIMVerse = lazy(() => import("@/pages/admin/AdminAIMVerse"));
const AdminLiveClasses = lazy(() => import("@/pages/admin/AdminLiveClasses"));
const AdminAchievements = lazy(() => import("@/pages/admin/AdminAchievements"));

// Student pages
const StudentCourses = lazy(() => import("@/pages/student/StudentCourses"));
const StudentQuizzes = lazy(() => import("@/pages/student/StudentQuizzes"));
const StudentAssignments = lazy(() => import("@/pages/student/StudentAssignments"));
const StudentAchievements = lazy(() => import("@/pages/student/StudentAchievements"));
const StudentAIMVerse = lazy(() => import("@/pages/student/StudentAIMVerse"));

// Parent pages
const ParentLinkChild = lazy(() => import("@/pages/parent/ParentLinkChild"));
const ParentProgress = lazy(() => import("@/pages/parent/ParentProgress"));

function Router() {
  return (
    <Suspense fallback={<DashboardLayoutSkeleton />}>
      <Switch>
        {/* Public routes */}
        <Route path={"/"} component={Home} />
        <Route path={"/ai-voice"} component={AIVoicePage} />
        <Route path={"/auth"} component={Auth} />
        <Route path={"/login"} component={Login} />
        <Route path={"/signup"} component={Signup} />
        
        {/* Admin routes */}
        <Route path={"/admin"} component={AdminDashboard} />
        <Route path={"/admin/users"} component={AdminUsers} />
        <Route path={"/admin/courses"} component={AdminCourses} />
        <Route path={"/admin/enrollments"} component={AdminEnrollments} />
        <Route path={"/admin/quizzes"} component={AdminQuizzes} />
        <Route path={"/admin/assignments"} component={AdminAssignments} />
        <Route path={"/admin/announcements"} component={AdminAnnouncements} />
        <Route path={"/admin/events"} component={AdminEvents} />
        <Route path={"/admin/aimverse"} component={AdminAIMVerse} />
        <Route path={"/admin/live-classes"} component={AdminLiveClasses} />
        <Route path={"/admin/achievements"} component={AdminAchievements} />
        
        {/* Student routes */}
        <Route path={"/student"} component={StudentDashboard} />
        <Route path={"/student/courses"} component={StudentCourses} />
        <Route path={"/student/quizzes"} component={StudentQuizzes} />
        <Route path={"/student/assignments"} component={StudentAssignments} />
        <Route path={"/student/achievements"} component={StudentAchievements} />
        <Route path={"/student/aimverse"} component={StudentAIMVerse} />
        
        {/* Parent routes */}
        <Route path={"/parent"} component={ParentDashboard} />
        <Route path={"/parent/link-child"} component={ParentLinkChild} />
        <Route path={"/parent/progress"} component={ParentProgress} />
        
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function AppContent() {
  const [location] = useLocation();
  
  // Check if we're on a dashboard route
  const isDashboardRoute = location.startsWith('/admin') || location.startsWith('/student') || location.startsWith('/parent');
  const isAuthRoute = location === '/login' || location === '/signup' || location === '/auth';

  useEffect(() => {
    // Skip Lenis smooth scroll on dashboard routes for better UX
    if (isDashboardRoute) return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isDashboardRoute]);

  return (
    <ThemeProvider
      defaultTheme="light"
      switchable
    >
      <TooltipProvider>
        {!isDashboardRoute && <CustomCursor />}
        {location !== '/auth' && !isDashboardRoute && <Chatbot />}
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

export default App;
