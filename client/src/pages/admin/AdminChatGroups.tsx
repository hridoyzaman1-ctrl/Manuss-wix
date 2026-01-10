import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Plus, 
  Search,
  Trash2,
  UserPlus,
  UserMinus,
  MessageSquare,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { trpc } from "@/lib/trpc";

interface ChatGroup {
  id: number;
  name: string;
  type: 'course' | 'section' | 'class' | 'custom';
  courseId?: number;
  createdBy: number;
  memberCount?: number;
}

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
}

export default function AdminChatGroups() {
  const { 
    connected, 
    groups, 
    createGroup, 
    addGroupMembers, 
    removeGroupMembers,
    addCourseStudents,
    onGroupCreated,
  } = useSocket();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);
  
  // Form state for creating group
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupType, setNewGroupType] = useState<'course' | 'section' | 'class' | 'custom'>('custom');
  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>();
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  
  // Fetch data
  const { data: users } = trpc.user.getAll.useQuery();
  const { data: courses } = trpc.course.getAll.useQuery();
  // Note: enrollment.getAll may need to be added to the router
  const enrollments: any[] = [];
  
  const students = (users || []).filter((u: User) => u.role === 'student');
  const teachers = (users || []).filter((u: User) => u.role === 'teacher' || u.role === 'admin');

  // Subscribe to group creation
  useEffect(() => {
    const unsubscribe = onGroupCreated((group: ChatGroup) => {
      setIsCreateDialogOpen(false);
      resetForm();
    });
    
    return unsubscribe;
  }, [onGroupCreated]);

  const resetForm = () => {
    setNewGroupName('');
    setNewGroupType('custom');
    setSelectedCourseId(undefined);
    setSelectedMembers([]);
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    
    createGroup({
      name: newGroupName,
      type: newGroupType,
      courseId: selectedCourseId,
      memberIds: selectedMembers,
    });
  };

  const handleAddAllCourseStudents = () => {
    if (!selectedGroup || !selectedCourseId) return;
    addCourseStudents(selectedGroup.id, selectedCourseId);
  };

  const handleToggleMember = (userId: number) => {
    setSelectedMembers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAllStudents = () => {
    const studentIds = students.map((s: User) => s.id);
    setSelectedMembers(prev => {
      const allSelected = studentIds.every((id: number) => prev.includes(id));
      if (allSelected) {
        return prev.filter((id: number) => !studentIds.includes(id));
      }
      return Array.from(new Set([...prev, ...studentIds]));
    });
  };

  const handleSelectCourseStudents = (courseId: number) => {
    const courseEnrollments = (enrollments || []).filter((e: any) => e.courseId === courseId);
    const enrolledStudentIds = courseEnrollments.map((e: any) => e.userId);
    setSelectedMembers(prev => Array.from(new Set([...prev, ...enrolledStudentIds])));
  };

  const filteredGroups = groups.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminDashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Chat Groups</h1>
            <p className="text-muted-foreground">
              Create and manage group chats for courses, sections, and classes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={connected ? "default" : "destructive"}>
              {connected ? "Connected" : "Disconnected"}
            </Badge>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Chat Group</DialogTitle>
                  <DialogDescription>
                    Create a new group chat for students and teachers
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="groupName">Group Name</Label>
                    <Input
                      id="groupName"
                      placeholder="e.g., Math Class 2026"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="groupType">Group Type</Label>
                    <Select value={newGroupType} onValueChange={(v) => setNewGroupType(v as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course">Course Group</SelectItem>
                        <SelectItem value="section">Section Group</SelectItem>
                        <SelectItem value="class">Class Group</SelectItem>
                        <SelectItem value="custom">Custom Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {(newGroupType === 'course' || newGroupType === 'section') && (
                    <div className="space-y-2">
                      <Label htmlFor="course">Associated Course</Label>
                      <Select 
                        value={selectedCourseId?.toString()} 
                        onValueChange={(v) => setSelectedCourseId(parseInt(v))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {(courses || []).map((course: any) => (
                            <SelectItem key={course.id} value={course.id.toString()}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Select Members</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleSelectAllStudents}
                        >
                          <GraduationCap className="h-4 w-4 mr-1" />
                          All Students
                        </Button>
                        {selectedCourseId && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSelectCourseStudents(selectedCourseId)}
                          >
                            <BookOpen className="h-4 w-4 mr-1" />
                            Course Students
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Teachers & Admins</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {teachers.map((teacher: User) => (
                              <div key={teacher.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`teacher-${teacher.id}`}
                                  checked={selectedMembers.includes(teacher.id)}
                                  onCheckedChange={() => handleToggleMember(teacher.id)}
                                />
                                <label
                                  htmlFor={`teacher-${teacher.id}`}
                                  className="text-sm flex-1 cursor-pointer"
                                >
                                  {teacher.name} <span className="text-muted-foreground">({teacher.role})</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Students ({selectedMembers.filter(id => students.some((s: User) => s.id === id)).length} selected)</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ScrollArea className="h-48">
                          <div className="space-y-2">
                            {students.map((student: User) => (
                              <div key={student.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`student-${student.id}`}
                                  checked={selectedMembers.includes(student.id)}
                                  onCheckedChange={() => handleToggleMember(student.id)}
                                />
                                <label
                                  htmlFor={`student-${student.id}`}
                                  className="text-sm flex-1 cursor-pointer"
                                >
                                  {student.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
                    Create Group
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search groups..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Groups Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Groups ({filteredGroups.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredGroups.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No groups yet</p>
                <p className="text-sm">Create your first group to get started</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {group.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {group.courseId 
                          ? (courses || []).find((c: any) => c.id === group.courseId)?.title || '-'
                          : '-'
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedGroup(group);
                              setIsManageMembersOpen(true);
                            }}
                          >
                            <UserPlus className="h-4 w-4 mr-1" />
                            Members
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Manage Members Dialog */}
        <Dialog open={isManageMembersOpen} onOpenChange={setIsManageMembersOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Manage Members - {selectedGroup?.name}</DialogTitle>
              <DialogDescription>
                Add or remove members from this group
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              {selectedGroup?.courseId && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleAddAllCourseStudents}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Add All Enrolled Students
                </Button>
              )}
              
              <div className="text-sm text-muted-foreground text-center">
                Member management is handled through the WebSocket connection.
                Changes will be reflected in real-time.
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsManageMembersOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminDashboardLayout>
  );
}
