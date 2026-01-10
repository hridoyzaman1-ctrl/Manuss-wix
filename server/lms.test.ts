import { describe, it, expect, vi, beforeEach } from "vitest";
import * as db from "./db";

// Mock the database module
vi.mock("./db", async () => {
  const actual = await vi.importActual("./db");
  return {
    ...actual,
    getDb: vi.fn().mockResolvedValue(null), // Mock DB as unavailable for unit tests
  };
});

describe("LMS Database Helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("User Helpers", () => {
    it("should return empty array when getting all users with no DB", async () => {
      const users = await db.getAllUsers();
      expect(users).toEqual([]);
    });

    it("should return undefined when getting user by ID with no DB", async () => {
      const user = await db.getUserById(1);
      expect(user).toBeUndefined();
    });

    it("should return undefined when getting user by student UID with no DB", async () => {
      const user = await db.getUserByStudentUid("STU-12345678");
      expect(user).toBeUndefined();
    });
  });

  describe("Course Helpers", () => {
    it("should return empty array when getting all courses with no DB", async () => {
      const courses = await db.getAllCourses();
      expect(courses).toEqual([]);
    });

    it("should return empty array when getting published courses with no DB", async () => {
      const courses = await db.getPublishedCourses();
      expect(courses).toEqual([]);
    });

    it("should return undefined when getting course by ID with no DB", async () => {
      const course = await db.getCourseById(1);
      expect(course).toBeUndefined();
    });
  });

  describe("Lesson Helpers", () => {
    it("should return empty array when getting lessons by course with no DB", async () => {
      const lessons = await db.getLessonsByCourse(1);
      expect(lessons).toEqual([]);
    });

    it("should return undefined when getting lesson by ID with no DB", async () => {
      const lesson = await db.getLessonById(1);
      expect(lesson).toBeUndefined();
    });

    it("should return empty array when getting lesson materials with no DB", async () => {
      const materials = await db.getLessonMaterials(1);
      expect(materials).toEqual([]);
    });
  });

  describe("Enrollment Helpers", () => {
    it("should return empty array when getting enrollments by user with no DB", async () => {
      const enrollments = await db.getEnrollmentsByUser(1);
      expect(enrollments).toEqual([]);
    });

    it("should return empty array when getting enrollments by course with no DB", async () => {
      const enrollments = await db.getEnrollmentsByCourse(1);
      expect(enrollments).toEqual([]);
    });

    it("should return undefined when getting active enrollment with no DB", async () => {
      const enrollment = await db.getActiveEnrollment(1, 1);
      expect(enrollment).toBeUndefined();
    });

    it("should return empty array when getting expiring enrollments with no DB", async () => {
      const enrollments = await db.getExpiringEnrollments(30);
      expect(enrollments).toEqual([]);
    });
  });

  describe("Quiz Helpers", () => {
    it("should return undefined when getting quiz by ID with no DB", async () => {
      const quiz = await db.getQuizById(1);
      expect(quiz).toBeUndefined();
    });

    it("should return empty array when getting quizzes by course with no DB", async () => {
      const quizzes = await db.getQuizzesByCourse(1);
      expect(quizzes).toEqual([]);
    });

    it("should return empty array when getting quiz questions with no DB", async () => {
      const questions = await db.getQuizQuestions(1);
      expect(questions).toEqual([]);
    });

    it("should return empty array when getting quiz attempts with no DB", async () => {
      const attempts = await db.getQuizAttempts(1);
      expect(attempts).toEqual([]);
    });
  });

  describe("Assignment Helpers", () => {
    it("should return undefined when getting assignment by ID with no DB", async () => {
      const assignment = await db.getAssignmentById(1);
      expect(assignment).toBeUndefined();
    });

    it("should return empty array when getting assignments by course with no DB", async () => {
      const assignments = await db.getAssignmentsByCourse(1);
      expect(assignments).toEqual([]);
    });

    it("should return empty array when getting assignment submissions with no DB", async () => {
      const submissions = await db.getAssignmentSubmissions(1);
      expect(submissions).toEqual([]);
    });

    it("should return empty array when getting student submissions with no DB", async () => {
      const submissions = await db.getStudentSubmissions(1);
      expect(submissions).toEqual([]);
    });
  });

  describe("Attendance Helpers", () => {
    it("should return empty array when getting attendance by student with no DB", async () => {
      const attendance = await db.getAttendanceByStudent(1);
      expect(attendance).toEqual([]);
    });

    it("should return empty array when getting attendance by course with no DB", async () => {
      const attendance = await db.getAttendanceByCourse(1);
      expect(attendance).toEqual([]);
    });
  });

  describe("Achievement Helpers", () => {
    it("should return empty array when getting all achievements with no DB", async () => {
      const achievements = await db.getAllAchievements();
      expect(achievements).toEqual([]);
    });

    it("should return empty array when getting student achievements with no DB", async () => {
      const achievements = await db.getStudentAchievements(1);
      expect(achievements).toEqual([]);
    });
  });

  describe("Game Score Helpers", () => {
    it("should return empty array when getting game scores with no DB", async () => {
      const scores = await db.getGameScores(1);
      expect(scores).toEqual([]);
    });

    it("should return empty array when getting leaderboard with no DB", async () => {
      const leaderboard = await db.getLeaderboard("test-game");
      expect(leaderboard).toEqual([]);
    });
  });

  describe("Announcement Helpers", () => {
    it("should return empty array when getting announcements with no DB", async () => {
      const announcements = await db.getAnnouncements();
      expect(announcements).toEqual([]);
    });
  });

  describe("Event Helpers", () => {
    it("should return empty array when getting upcoming events with no DB", async () => {
      const events = await db.getUpcomingEvents();
      expect(events).toEqual([]);
    });

    it("should return empty array when getting events by course with no DB", async () => {
      const events = await db.getEventsByCourse(1);
      expect(events).toEqual([]);
    });
  });

  describe("Live Class Helpers", () => {
    it("should return empty array when getting upcoming live classes with no DB", async () => {
      const classes = await db.getUpcomingLiveClasses();
      expect(classes).toEqual([]);
    });
  });

  describe("Message Helpers", () => {
    it("should return empty array when getting inbox with no DB", async () => {
      const messages = await db.getInbox(1);
      expect(messages).toEqual([]);
    });

    it("should return empty array when getting sent messages with no DB", async () => {
      const messages = await db.getSentMessages(1);
      expect(messages).toEqual([]);
    });

    it("should return 0 when getting unread count with no DB", async () => {
      const count = await db.getUnreadCount(1);
      expect(count).toBe(0);
    });
  });

  describe("Notification Helpers", () => {
    it("should return empty array when getting user notifications with no DB", async () => {
      const notifications = await db.getUserNotifications(1);
      expect(notifications).toEqual([]);
    });
  });

  describe("AIMVerse Helpers", () => {
    it("should return empty array when getting episodes with no DB", async () => {
      const episodes = await db.getAimverseEpisodes();
      expect(episodes).toEqual([]);
    });

    it("should return undefined when getting episode by ID with no DB", async () => {
      const episode = await db.getAimverseEpisodeById(1);
      expect(episode).toBeUndefined();
    });

    it("should return empty array when getting cards with no DB", async () => {
      const cards = await db.getAimverseCards();
      expect(cards).toEqual([]);
    });

    it("should return empty array when getting prizes with no DB", async () => {
      const prizes = await db.getAimversePrizes();
      expect(prizes).toEqual([]);
    });
  });

  describe("Dashboard Stats Helpers", () => {
    it("should return stats object with zero values when getting admin dashboard stats with no DB", async () => {
      const stats = await db.getAdminDashboardStats();
      // When DB is unavailable, returns object with zero counts
      expect(stats).toEqual({
        totalStudents: 0,
        totalCourses: 0,
        totalEnrollments: 0,
        activeEnrollments: 0,
      });
    });

    it("should return stats object with zero values when getting student dashboard stats with no DB", async () => {
      const stats = await db.getStudentDashboardStats(1);
      // When DB is unavailable, returns object with zero counts
      expect(stats).toEqual({
        enrolledCourses: 0,
        completedLessons: 0,
        quizzesTaken: 0,
        achievementsEarned: 0,
      });
    });
  });

  describe("Parent-Student Link Helpers", () => {
    it("should return empty array when getting linked students with no DB", async () => {
      const students = await db.getLinkedStudents(1);
      expect(students).toEqual([]);
    });

    it("should return error when verifying link with invalid UID", async () => {
      const result = await db.verifyParentStudentLink(1, "STU-12345678");
      expect(result.success).toBe(false);
      // When student is not found, returns invalid UID message
      expect(result.message).toBe("Invalid student UID");
    });
  });

  describe("Student Notes Helpers", () => {
    it("should return empty array when getting student notes with no DB", async () => {
      const notes = await db.getStudentNotes(1);
      expect(notes).toEqual([]);
    });
  });

  describe("Lesson Progress Helpers", () => {
    it("should return empty array when getting lesson progress by enrollment with no DB", async () => {
      const progress = await db.getLessonProgressByEnrollment(1);
      expect(progress).toEqual([]);
    });
  });

  describe("Teacher Remarks Helpers", () => {
    it("should return empty array when getting remarks by student with no DB", async () => {
      const remarks = await db.getRemarksByStudent(1);
      expect(remarks).toEqual([]);
    });

    it("should return empty array when getting remarks by course with no DB", async () => {
      const remarks = await db.getRemarksByCourse(1);
      expect(remarks).toEqual([]);
    });
  });

  describe("Class Schedule Helpers", () => {
    it("should return empty array when getting class schedule with no DB", async () => {
      const schedule = await db.getClassSchedule(1);
      expect(schedule).toEqual([]);
    });
  });
});
