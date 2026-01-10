import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { getLoginUrl } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import { 
  LayoutDashboard, 
  LogOut, 
  PanelLeft, 
  BookOpen, 
  FileText, 
  ClipboardList,
  Calendar,
  Trophy,
  Bell,
  MessageSquare,
  Video,
  Sparkles,
  Home,
  GraduationCap,
  StickyNote,
  BarChart3,
  Gamepad2,
  User
} from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { Button } from "./ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
  { icon: BookOpen, label: "My Courses", path: "/student/courses" },
  { icon: BarChart3, label: "Progress", path: "/student/progress" },
  { icon: ClipboardList, label: "Quizzes", path: "/student/quizzes" },
  { icon: FileText, label: "Assignments", path: "/student/assignments" },
  { icon: StickyNote, label: "My Notes", path: "/student/notes" },
  { icon: Calendar, label: "Attendance", path: "/student/attendance" },
  { icon: GraduationCap, label: "Grades", path: "/student/grades" },
  { icon: Video, label: "Live Classes", path: "/student/live-classes" },
  { icon: Trophy, label: "Achievements", path: "/student/achievements" },
  { icon: Gamepad2, label: "Games", path: "/student/games" },
  { icon: Sparkles, label: "AIMVerse", path: "/student/aimverse" },
  { icon: Calendar, label: "Events", path: "/student/events" },
  { icon: Bell, label: "Notifications", path: "/student/notifications" },
  { icon: MessageSquare, label: "Messages", path: "/student/messages" },
  { icon: User, label: "Profile", path: "/student/profile" },
];

const SIDEBAR_WIDTH_KEY = "student-sidebar-width";
const DEFAULT_WIDTH = 260;
const MIN_WIDTH = 200;
const MAX_WIDTH = 400;

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) {
    return <DashboardLayoutSkeleton />
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-950">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Student Portal
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Sign in to access your courses, assignments, and track your learning progress.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            Sign in to Portal
          </Button>
        </div>
      </div>
    );
  }

  // Check if user is student (or admin for testing)
  if (user.role !== 'student' && user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-950">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-center text-amber-600 dark:text-amber-400">
              Student Access Required
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              This portal is for enrolled students only. If you're a student, please contact support to get your account set up.
            </p>
          </div>
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <StudentDashboardLayoutContent setSidebarWidth={setSidebarWidth}>
        {children}
      </StudentDashboardLayoutContent>
    </SidebarProvider>
  );
}

type StudentDashboardLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
};

function StudentDashboardLayoutContent({
  children,
  setSidebarWidth,
}: StudentDashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeMenuItem = menuItems.find(item => location.startsWith(item.path) && item.path !== '/student') || menuItems[0];
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r border-blue-100 dark:border-slate-700 bg-white dark:bg-slate-900"
          disableTransition={isResizing}
        >
          <SidebarHeader className="h-16 justify-center border-b border-blue-100 dark:border-slate-700">
            <div className="flex items-center gap-3 px-2 transition-all w-full">
              <button
                onClick={toggleSidebar}
                className="h-8 w-8 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
                aria-label="Toggle navigation"
              >
                <PanelLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </button>
              {!isCollapsed ? (
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold tracking-tight truncate text-blue-900 dark:text-white">
                    Student Portal
                  </span>
                </div>
              ) : null}
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0 py-2">
            <SidebarMenu className="px-2">
              {menuItems.map(item => {
                const isActive = location === item.path || (item.path !== '/student' && location.startsWith(item.path));
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setLocation(item.path)}
                      tooltip={item.label}
                      className={`h-10 transition-all font-normal ${isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800'}`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`}
                      />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-3 border-t border-blue-100 dark:border-slate-700">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9 border border-blue-200 dark:border-slate-700 shrink-0">
                    <AvatarFallback className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium truncate leading-none text-slate-900 dark:text-white">
                      {user?.name || "-"}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 truncate mt-1">
                      Student
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setLocation("/student/profile")}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLocation("/")}
                  className="cursor-pointer"
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Back to Site</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-400/20 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => {
            if (isCollapsed) return;
            setIsResizing(true);
          }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-slate-950 dark:to-slate-900">
        {isMobile && (
          <div className="flex border-b border-blue-100 dark:border-slate-700 h-14 items-center justify-between bg-white dark:bg-slate-900 px-4 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="h-9 w-9 rounded-lg" />
              <span className="font-medium text-blue-900 dark:text-white">
                {activeMenuItem?.label ?? "Student"}
              </span>
            </div>
          </div>
        )}
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </>
  );
}
