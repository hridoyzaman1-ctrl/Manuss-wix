import StudentDashboardLayout from "@/components/StudentDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

export default function StudentQuizzes() {
  return (
    <StudentDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Quizzes
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Take quizzes and track your scores
          </p>
        </div>

        <Card className="bg-white dark:bg-slate-800 border-blue-100 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-purple-600" />
              Available Quizzes
            </CardTitle>
            <CardDescription>
              Test your knowledge with course quizzes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <ClipboardList className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No quizzes available</p>
              <p className="text-sm">Quizzes will appear here when your courses have them</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentDashboardLayout>
  );
}
