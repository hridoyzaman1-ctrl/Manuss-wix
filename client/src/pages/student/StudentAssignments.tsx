import StudentDashboardLayout from "@/components/StudentDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function StudentAssignments() {
  return (
    <StudentDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Assignments
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            View and submit your assignments
          </p>
        </div>

        <Card className="bg-white dark:bg-slate-800 border-blue-100 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Pending Assignments
            </CardTitle>
            <CardDescription>
              Complete and submit your assignments before the due date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No assignments yet</p>
              <p className="text-sm">Assignments will appear here when assigned</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentDashboardLayout>
  );
}
