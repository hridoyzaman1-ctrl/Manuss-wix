import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Camera, Loader2, Save, User } from "lucide-react";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: profile, isLoading, refetch } = trpc.user.getProfile.useQuery();
  const updateProfileMutation = trpc.user.updateProfile.useMutation();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dateOfBirth: "",
    grade: "",
    address: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : "",
        grade: profile.grade || "",
        address: profile.address || "",
        avatarUrl: profile.avatarUrl || "",
      });
    }
  }, [profile]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64 for simple storage (in production, use proper file upload)
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData(prev => ({ ...prev, avatarUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    
    try {
      await updateProfileMutation.mutateAsync({
        name: formData.name || undefined,
        phone: formData.phone || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
        grade: formData.grade || undefined,
        address: formData.address || undefined,
        avatarUrl: formData.avatarUrl || undefined,
      });
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      refetch();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-lg border border-stone-200 dark:border-stone-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 text-white">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div 
                onClick={isEditing ? handleAvatarClick : undefined}
                className={`w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden ${isEditing ? 'cursor-pointer hover:bg-white/30 transition-colors' : ''}`}
              >
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white/80" />
                )}
              </div>
              {isEditing && (
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg">
                  <Camera className="w-4 h-4 text-stone-600" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            
            {/* Name & Role */}
            <div>
              <h1 className="text-2xl font-bold">{profile?.name || "Student"}</h1>
              <p className="text-white/80 capitalize">{profile?.role}</p>
              {profile?.studentUid && (
                <p className="text-xs text-white/60 mt-1">Student ID: {profile.studentUid}</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Message */}
          {message && (
            <div className={`mb-6 p-3 rounded-lg text-sm ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
            }`}>
              {message.text}
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="h-11"
              />
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={profile?.email || ""}
                disabled
                className="h-11 bg-stone-50 dark:bg-stone-900"
              />
              <p className="text-xs text-stone-400">Email cannot be changed</p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                className="h-11"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                disabled={!isEditing}
                className="h-11"
              />
            </div>

            {/* Grade */}
            <div className="space-y-2">
              <Label htmlFor="grade">Grade / Class</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                disabled={!isEditing}
                placeholder="e.g., Grade 10, HSC 1st Year"
                className="h-11"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                disabled={!isEditing}
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    if (profile) {
                      setFormData({
                        name: profile.name || "",
                        phone: profile.phone || "",
                        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : "",
                        grade: profile.grade || "",
                        address: profile.address || "",
                        avatarUrl: profile.avatarUrl || "",
                      });
                    }
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
