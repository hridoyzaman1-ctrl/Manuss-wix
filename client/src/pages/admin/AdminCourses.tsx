import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { BookOpen, Plus, Search, MoreVertical, Edit, Trash2, Eye, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  
  const { data: courses, isLoading, refetch } = trpc.course.getAll.useQuery();
  
  const createMutation = trpc.course.create.useMutation({
    onSuccess: () => {
      toast.success("Course created successfully");
      setIsCreateOpen(false);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to create course: ${error.message}`);
    },
  });

  const updateMutation = trpc.course.update.useMutation({
    onSuccess: () => {
      toast.success("Course updated successfully");
      setEditingCourse(null);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to update course: ${error.message}`);
    },
  });

  const deleteMutation = trpc.course.delete.useMutation({
    onSuccess: () => {
      toast.success("Course deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete course: ${error.message}`);
    },
  });

  const filteredCourses = courses?.filter(course => 
    course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, string> = {
      published: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      draft: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      archived: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    };
    
    return (
      <Badge className={statusConfig[status] || statusConfig.draft}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleCreate = (formData: FormData) => {
    createMutation.mutate({
      title: formData.get('title') as string,
      titleBn: formData.get('titleBn') as string || undefined,
      description: formData.get('description') as string || undefined,
      category: formData.get('category') as string || undefined,
      level: formData.get('level') as 'beginner' | 'intermediate' | 'advanced' || undefined,
      price: formData.get('price') as string || undefined,
      durationMonths: parseInt(formData.get('durationMonths') as string) || 3,
      status: formData.get('status') as 'draft' | 'published' | 'archived' || 'draft',
    });
  };

  const handleUpdate = (formData: FormData) => {
    if (!editingCourse) return;
    updateMutation.mutate({
      id: editingCourse.id,
      title: formData.get('title') as string,
      titleBn: formData.get('titleBn') as string || undefined,
      description: formData.get('description') as string || undefined,
      category: formData.get('category') as string || undefined,
      level: formData.get('level') as 'beginner' | 'intermediate' | 'advanced' || undefined,
      price: formData.get('price') as string || undefined,
      durationMonths: parseInt(formData.get('durationMonths') as string) || 3,
      status: formData.get('status') as 'draft' | 'published' | 'archived' || 'draft',
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Course Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Create and manage courses for your students
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new course
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); handleCreate(new FormData(e.currentTarget)); }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title (English) *</Label>
                      <Input id="title" name="title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="titleBn">Title (Bengali)</Label>
                      <Input id="titleBn" name="titleBn" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" rows={3} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" name="category" placeholder="e.g., Mathematics" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select name="level" defaultValue="beginner">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select name="status" defaultValue="draft">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (BDT)</Label>
                      <Input id="price" name="price" type="number" placeholder="0 for free" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="durationMonths">Duration (Months)</Label>
                      <Input id="durationMonths" name="durationMonths" type="number" defaultValue={3} />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Creating..." : "Create Course"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search courses by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="bg-white dark:bg-slate-800">
                <CardContent className="pt-6">
                  <Skeleton className="h-40 w-full rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Card key={course.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-1">
                        {course.title}
                      </CardTitle>
                      {course.titleBn && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {course.titleBn}
                        </p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingCourse(course)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Lessons
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="h-4 w-4 mr-2" />
                          View Enrollments
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => deleteMutation.mutate({ id: course.id })}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                    {course.description || "No description provided"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(course.status)}
                      {course.level && (
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {course.price ? `৳${course.price}` : 'Free'}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>{course.category || 'Uncategorized'}</span>
                    <span>{course.durationMonths} months</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No courses found</p>
              <p className="text-sm">Create your first course to get started</p>
            </div>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingCourse} onOpenChange={(open) => !open && setEditingCourse(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>
                Update the course details
              </DialogDescription>
            </DialogHeader>
            {editingCourse && (
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(new FormData(e.currentTarget)); }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-title">Title (English) *</Label>
                      <Input id="edit-title" name="title" defaultValue={editingCourse.title} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-titleBn">Title (Bengali)</Label>
                      <Input id="edit-titleBn" name="titleBn" defaultValue={editingCourse.titleBn || ''} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea id="edit-description" name="description" rows={3} defaultValue={editingCourse.description || ''} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-category">Category</Label>
                      <Input id="edit-category" name="category" defaultValue={editingCourse.category || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-level">Level</Label>
                      <Select name="level" defaultValue={editingCourse.level || 'beginner'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-status">Status</Label>
                      <Select name="status" defaultValue={editingCourse.status || 'draft'}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-price">Price (BDT)</Label>
                      <Input id="edit-price" name="price" type="number" defaultValue={editingCourse.price || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-durationMonths">Duration (Months)</Label>
                      <Input id="edit-durationMonths" name="durationMonths" type="number" defaultValue={editingCourse.durationMonths || 3} />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditingCourse(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
