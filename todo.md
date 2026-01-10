# AIM Centre 360 - LMS Development TODO

## Phase 1: Core Infrastructure
- [x] Upgrade to full-stack (Database + Auth)
- [x] Fix TypeScript errors from upgrade
- [x] Design comprehensive LMS database schema

## Phase 2: Database Schema
- [x] Users table with roles (admin, student, parent, teacher)
- [x] Courses table (name, description, duration, price, thumbnail)
- [x] Lessons table (course_id, title, order, content_type)
- [x] Lesson materials table (lesson_id, type, url, filename)
- [x] Enrollments table (user_id, course_id, start_date, expiry_date, status)
- [x] Course progress table (enrollment_id, lesson_id, completed, progress_percent)
- [x] Assignments table (course_id, title, description, start_date, due_date)
- [x] Assignment submissions table (assignment_id, student_id, file_url, submitted_at)
- [x] Quizzes table (course_id, title, duration_minutes, passing_score)
- [x] Quiz questions table (quiz_id, question, options, correct_answer)
- [x] Quiz attempts table (quiz_id, student_id, score, started_at, completed_at)
- [x] Attendance table (student_id, course_id, date, status)
- [x] Student notes table (student_id, lesson_id, content, created_at)
- [x] Achievements table (name, description, icon, criteria)
- [x] Student achievements table (student_id, achievement_id, earned_at)
- [x] Teacher remarks table (student_id, course_id, teacher_id, remark, created_at)
- [x] Announcements table (title, content, target_audience, created_at)
- [x] Events table (title, description, event_date, event_type)
- [x] Live classes table (course_id, title, scheduled_at, meeting_link)
- [x] Messages table (from_user_id, to_user_id, content, read_at)
- [x] Parent-student links table (parent_id, student_id, verified)
- [x] Game scores table (student_id, game_name, score, played_at)
- [x] AIMVerse episodes table (title, description, video_url, release_date)
- [x] AIMVerse cards table (episode_id, title, content, media_url)
- [x] AIMVerse prizes table (for competitions and winners)
- [x] Notifications table (user notifications)
- [x] Class schedules table (recurring class schedules)

## Phase 3: Authentication & Roles
- [x] Implement role-based access control (RBAC)
- [x] Admin procedure middleware
- [x] Student procedure middleware
- [x] Parent procedure middleware
- [x] Teacher/Staff procedure middleware
- [x] Student UID generation for parent verification

## Phase 4: Admin Dashboard
- [x] Dashboard layout with sidebar navigation
- [x] Overview/Analytics page (total students, courses, revenue)
- [x] Course management (CRUD operations)
- [x] User management with role changes
- [ ] Lesson management with material uploads
- [ ] Quiz builder with timer settings
- [ ] Assignment creator with date pickers
- [ ] Attendance management
- [x] Announcement system
- [ ] Event calendar management
- [ ] Live class scheduler
- [ ] Teacher remarks interface
- [ ] Achievement creator
- [ ] Manual enrollment option
- [ ] AIMVerse CMS (episodes, cards, countdown timers)

## Phase 5: Student Dashboard
- [x] Dashboard layout with course cards
- [x] Enrolled courses grid
- [ ] Course player page with video/PDF viewer
- [ ] Lesson progress tracker
- [ ] Auto note-taker with save to DOCX
- [ ] Notes section per lesson
- [ ] Quiz taking interface with timer
- [ ] Quiz results and history
- [ ] Assignment submission interface
- [ ] Assignment progress tracker
- [ ] Attendance viewer
- [ ] Marks/grades section
- [ ] Teacher remarks viewer
- [x] Achievements showcase
- [ ] Game high scores
- [ ] Upcoming events calendar
- [ ] Announcements feed
- [ ] Live class join button
- [ ] Class schedule/routine
- [ ] Private messaging
- [ ] Course expiry notifications
- [ ] Next class reminder
- [x] AIMVerse section

## Phase 6: Parent Dashboard
- [x] Dashboard layout with child overview
- [x] Child verification via secret UID
- [x] Child's course progress overview
- [ ] Attendance report
- [ ] Assignment submission status
- [ ] Quiz scores and history
- [ ] Marks/grades viewer
- [ ] Teacher remarks
- [ ] Achievements earned
- [ ] Upcoming events
- [ ] Announcements
- [ ] Private messaging with teachers

## Phase 7: Course Access Control
- [ ] Enrollment with payment integration
- [ ] Course tenure tracking (3/4 months etc)
- [ ] Auto-expire access on tenure end
- [ ] Expiry reminder notifications (1 month, weekly, 3 days)
- [ ] Re-enrollment flow

## Phase 8: AIMVerse CMS
- [ ] Episode management (CRUD)
- [ ] Countdown timer for new releases
- [ ] Trailer management
- [ ] Educational cards with media
- [ ] Quiz integration
- [ ] Prize/winner announcements

## Phase 9: Notifications
- [x] In-app notification system (API)
- [ ] Course expiry reminders
- [ ] Quiz/exam reminders
- [ ] Live class reminders
- [ ] Assignment due reminders
- [ ] New announcement alerts

## Phase 10: Final Polish
- [x] Premium UI/UX refinements (dashboard layouts)
- [x] Mobile responsiveness
- [x] Performance optimization
- [ ] Testing and bug fixes

## Performance & Mobile Optimization
- [x] Image preloading for instant hero display
- [x] Lazy loading with blur placeholders for below-fold images
- [x] Mobile hamburger menu implementation
- [x] Touch-friendly interactions and responses
- [x] Responsive layouts for all sections
- [x] Optimized animations for mobile devices
- [x] Preserve desktop layout exactly as-is

## Bug Fixes
- [x] Fix failing user tests (tests assume empty DB but real user exists)
- [x] Fix Chatbot speech synthesis errors (getVoices, cancel undefined)
- [x] Fix nested anchor tag HTML error

## Authentication System Replacement
- [x] Replace Manus OAuth with email/password auth
- [x] Add password hashing with bcrypt
- [x] Add admin registration code 'Youknowwho1@'
- [x] Add optional phone number field for signup/login
- [x] Create signup page
- [x] Create login page
- [x] Update session management with JWT

## Chatbot Draggable Feature
- [x] Make chatbot draggable with mouse (desktop)
- [x] Make chatbot draggable with touch (mobile)

## Bug Fixes
- [x] Fix signup JSON error - unexpected end of JSON input
